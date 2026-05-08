import { createContext, useContext, useReducer, useCallback, useEffect } from 'react'
import { LEVELS } from '../data/levels'
import { MODULES } from '../data/modules'
import { LEVEL_ORDER } from '../data/placementTest'

// ── Initial state ──────────────────────────────────────────
const buildProgress = () => {
  const p = {}
  LEVELS.forEach(lv => {
    p[lv.id] = {}
    MODULES.forEach(m => { p[lv.id][m.id] = [] })
  })
  return p
}

// Read persisted theme; default to dark
const getInitialTheme = () => {
  try { return localStorage.getItem('theme') || 'dark' } catch { return 'dark' }
}

// Read persisted user session
const getInitialUser = () => {
  try {
    const raw = localStorage.getItem('gl_user')
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

const initialState = {
  // Auth
  user:            getInitialUser(),  // { id, email, username, displayName } | null

  // Interface language
  uiLang:          'es',          // 'es' | 'en' | 'it' | 'pt'

  // Theme
  theme:           getInitialTheme(),  // 'dark' | 'light'

  // Language learning
  language:        null,         // { id, name, flag, color, ... }
  placementLevel:  null,         // 'A1' | 'A2' | ... | 'C2' — result of test
  testCompleted:   false,

  // Progress
  progress:      buildProgress(),
  xp:            0,
  streak:        3,

  // UI
  currentLevel:  null,
  currentModule: null,
  toast:         null,
  sidebarOpen:   true,
}

// ── Reducer ─────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case 'COMPLETE_ACTIVITY': {
      const { levelId, moduleId, activityId, xp } = action.payload
      const prev = state.progress[levelId]?.[moduleId] ?? []
      if (prev.includes(activityId)) return state
      return {
        ...state,
        xp: state.xp + xp,
        progress: {
          ...state.progress,
          [levelId]: {
            ...state.progress[levelId],
            [moduleId]: [...prev, activityId],
          },
        },
      }
    }
    case 'SET_CURRENT_LEVEL':   return { ...state, currentLevel: action.payload }
    case 'SET_CURRENT_MODULE':  return { ...state, currentModule: action.payload }
    case 'SHOW_TOAST':          return { ...state, toast: action.payload }
    case 'HIDE_TOAST':          return { ...state, toast: null }
    case 'TOGGLE_SIDEBAR':      return { ...state, sidebarOpen: !state.sidebarOpen }
    case 'TOGGLE_THEME':        return { ...state, theme: state.theme === 'dark' ? 'light' : 'dark' }
    case 'SET_UI_LANG':         return { ...state, uiLang: action.payload }
    case 'SET_LANGUAGE':        return { ...state, language: action.payload, placementLevel: null, testCompleted: false }
    case 'COMPLETE_PLACEMENT':  return { ...state, placementLevel: action.payload, testCompleted: true }
    case 'RESET_TEST':          return { ...state, placementLevel: null, testCompleted: false }
    case 'AUTH_LOGIN':           return { ...state, user: action.payload }
    case 'AUTH_LOGOUT':          return { ...state, user: null, language: null, placementLevel: null, testCompleted: false, progress: buildProgress(), xp: 0 }
    case 'RESET_PROGRESS':       return { ...state, progress: buildProgress(), xp: 0, streak: 0 }
    default: return state
  }
}

// ── Context ─────────────────────────────────────────────────
const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Persist user session
  useEffect(() => {
    try {
      if (state.user) localStorage.setItem('gl_user', JSON.stringify(state.user))
      else localStorage.removeItem('gl_user')
    } catch {}
  }, [state.user])

  // Persist theme and apply class to <html>
  useEffect(() => {
    const html = document.documentElement
    html.classList.toggle('dark', state.theme === 'dark')
    try { localStorage.setItem('theme', state.theme) } catch {}
  }, [state.theme])

  const completeActivity = useCallback((levelId, moduleId, activityId, xp) =>
    dispatch({ type: 'COMPLETE_ACTIVITY', payload: { levelId, moduleId, activityId, xp } }), [])

  const showToast = useCallback((msg, type = 'success') => {
    dispatch({ type: 'SHOW_TOAST', payload: { msg, type } })
    setTimeout(() => dispatch({ type: 'HIDE_TOAST' }), 3000)
  }, [])

  const getLevelProgress = useCallback((levelId) => {
    const lvProgress = state.progress[levelId] ?? {}
    const lvl = LEVELS.find(l => l.id === levelId)
    if (!lvl) return 0
    const total = MODULES.reduce((s, m) => s + m.activities.length, 0)
    const done  = Object.values(lvProgress).reduce((s, arr) => s + arr.length, 0)
    return total ? Math.round((done / total) * 100) : 0
  }, [state.progress])

  const getModuleProgress = useCallback((levelId, moduleId) => {
    const done  = state.progress[levelId]?.[moduleId]?.length ?? 0
    const total = MODULES.find(m => m.id === moduleId)?.activities.length ?? 1
    return Math.round((done / total) * 100)
  }, [state.progress])

  const isActivityDone = useCallback((levelId, moduleId, activityId) =>
    state.progress[levelId]?.[moduleId]?.includes(activityId) ?? false, [state.progress])

  // Returns true if the given levelId is accessible based on placement result
  const isLevelUnlocked = useCallback((levelId) => {
    if (!state.testCompleted || !state.placementLevel) return false
    const placementIdx = LEVEL_ORDER.indexOf(state.placementLevel)
    const levelIdx     = LEVEL_ORDER.indexOf(levelId)
    return levelIdx <= placementIdx
  }, [state.testCompleted, state.placementLevel])

  return (
    <AppContext.Provider value={{
      ...state,
      dispatch,
      completeActivity,
      showToast,
      getLevelProgress,
      getModuleProgress,
      isActivityDone,
      isLevelUnlocked,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

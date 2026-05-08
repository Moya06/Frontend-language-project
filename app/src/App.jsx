import { Suspense, lazy } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useApp } from './store/AppContext'
import Layout from './components/layout/Layout'

// ── Lazy-loaded pages (code splitting per route) ─────────────────
const Dashboard      = lazy(() => import('./pages/Dashboard'))
const Levels         = lazy(() => import('./pages/Levels'))
const LevelDetail    = lazy(() => import('./pages/LevelDetail'))
const ModuleDetail   = lazy(() => import('./pages/ModuleDetail'))
const ModulePage     = lazy(() => import('./pages/ModulePage'))
const Progress       = lazy(() => import('./pages/Progress'))
const LanguageSelect = lazy(() => import('./pages/LanguageSelect'))
const PlacementTest  = lazy(() => import('./pages/PlacementTest'))
const PlacementResult = lazy(() => import('./pages/PlacementResult'))
const ActivityPlayer = lazy(() => import('./pages/ActivityPlayer'))
const Login          = lazy(() => import('./pages/Login'))
const Register       = lazy(() => import('./pages/Register'))
const Profile        = lazy(() => import('./pages/Profile'))
const Settings       = lazy(() => import('./pages/Settings'))
const Help           = lazy(() => import('./pages/Help'))

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

// Guard: redirect to /login if not authenticated
function AuthGuard({ children }) {
  const { user } = useApp()
  if (!user) return <Navigate to="/login" replace />
  return children
}

// Guard: redirect to / if already logged in
function GuestGuard({ children }) {
  const { user } = useApp()
  if (user) return <Navigate to="/" replace />
  return children
}

// Guard: redirect to onboarding if language/test not set
function HomeGuard() {
  const { language, testCompleted } = useApp()
  if (!language) return <Navigate to="/select" replace />
  if (!testCompleted) return <Navigate to="/placement" replace />
  return <Dashboard />
}

// Guard: block re-taking placement test if already completed
function PlacementGuard() {
  const { testCompleted } = useApp()
  if (testCompleted) return <Navigate to="/" replace />
  return <PlacementTest />
}

function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Auth routes (guest only) */}
            <Route path="login"    element={<GuestGuard><Login /></GuestGuard>} />
            <Route path="register" element={<GuestGuard><Register /></GuestGuard>} />

            {/* Full-screen onboarding routes (no Sidebar/TopBar) */}
            <Route path="select"           element={<AuthGuard><LanguageSelect /></AuthGuard>} />
            <Route path="placement"        element={<AuthGuard><PlacementGuard /></AuthGuard>} />
            <Route path="placement/result" element={<AuthGuard><PlacementResult /></AuthGuard>} />

            {/* Main app with Layout */}
            <Route element={<AuthGuard><Layout /></AuthGuard>}>
              <Route index         element={<HomeGuard />} />
              <Route path="levels" element={<Levels />} />
              <Route path="levels/:levelId"            element={<LevelDetail />} />
              <Route path="levels/:levelId/:moduleId"  element={<ModuleDetail />} />
              <Route path="module/:moduleId"           element={<ModulePage />} />
              <Route path="progress"                   element={<Progress />} />
              <Route path="profile"                    element={<Profile />} />
              <Route path="settings"                   element={<Settings />} />
              <Route path="help"                       element={<Help />} />
              <Route path="play/:levelId/:moduleId/:activityId" element={<ActivityPlayer />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Suspense>
      </HashRouter>
    </AppProvider>
  )
}

export default App

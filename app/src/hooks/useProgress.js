import { useMemo } from 'react'
import { useApp } from '../store/AppContext'
import { LEVELS } from '../data/levels'
import { MODULES } from '../data/modules'

export function useProgress() {
  const { progress, xp, streak, getLevelProgress, getModuleProgress } = useApp()

  const totalActivities = useMemo(() =>
    LEVELS.length * MODULES.reduce((s, m) => s + m.activities.length, 0), [])

  const completedActivities = useMemo(() =>
    Object.values(progress).reduce((sum, lvl) =>
      sum + Object.values(lvl).reduce((s, arr) => s + arr.length, 0), 0), [progress])

  const overallProgress = useMemo(() =>
    totalActivities ? Math.round((completedActivities / totalActivities) * 100) : 0,
    [completedActivities, totalActivities])

  const level = useMemo(() => {
    if (xp < 500)  return { label: 'Rookie',   next: 500 }
    if (xp < 1500) return { label: 'Explorer', next: 1500 }
    if (xp < 3000) return { label: 'Scholar',  next: 3000 }
    if (xp < 6000) return { label: 'Expert',   next: 6000 }
    return             { label: 'Master',    next: 10000 }
  }, [xp])

  return {
    xp, streak,
    totalActivities, completedActivities, overallProgress,
    level,
    getLevelProgress, getModuleProgress,
  }
}

const fs = require('fs')

let content = fs.readFileSync('Grammar-languages/app/src/components/layout/TopBar.jsx', 'utf8')

content = "import { useApp } from '../../store/AppContext'\nimport { T } from '../../data/i18n'\n" + content

content = content.replace('export default function TopBar() {', `export default function TopBar() {\n  const { uiLang } = useApp()\n  const t = T[uiLang] || T['es']`)

content = content.replace(/const CRUMB_LABELS = \{[\s\S]+?\}/m, '')

content = content.replace('const crumbs = pathname.split(\'/\').filter(Boolean)', `
  const CRUMB_LABELS = {
    '':         t.dashboard || 'Dashboard',
    'levels':   t.levels || 'Levels',
    'progress': t.progress || 'Progress',
    'module':   t.modules || 'Module',
    'games':    t.games || 'Games',
    'grammar':  t.grammar || 'Grammar',
    'listening':t.listening || 'Listening',
    'reading':  t.reading || 'Reading',
    'vocab':    t.vocabulary || 'Vocabulary',
  }
  const crumbs = pathname.split('/').filter(Boolean)
`)

content = content.replace('Home</Link>', '{t.dashboard || "Home"}</Link>')
content = content.replace('placeholder="Search anything..."', '{...{placeholder: t.searchPlaceholder || "Search anything..."}}')
content = content.replace('{xp} XP', '{xp} {t.xpLabel || "XP"}')

fs.writeFileSync('Grammar-languages/app/src/components/layout/TopBar.jsx', content)

const fs = require('fs')

let content = fs.readFileSync('Grammar-languages/app/src/data/i18n.js', 'utf8')

// Add keys for ES
content = content.replace(
  /recentLevels:\s+'Niveles recientes',/,
  `recentLevels:   'Niveles recientes',\n    readyToContinue: '¿Listo para continuar tu aprendizaje?',\n    totalXp: 'XP Total',\n    streak: 'Racha',\n    keepItUp: '¡Sigue así!',\n    completed: 'Completado',\n    of: 'de',\n    allCombined: 'Todos los niveles',\n    seeAll: 'Ver todo',\n    moreLevels: 'niveles más',\n    exercises: 'ejercicios',\n    estimated: 'estimadas',`
)

content = content.replace(
  /recentLevels:\s+'Recent levels',/,
  `recentLevels:   'Recent levels',\n    readyToContinue: 'Ready to continue your language journey?',\n    totalXp: 'Total XP',\n    streak: 'Day Streak',\n    keepItUp: 'Keep it up!',\n    completed: 'Completed',\n    of: 'of',\n    allCombined: 'All levels combined',\n    seeAll: 'See all',\n    moreLevels: 'more levels',\n    exercises: 'exercises',\n    estimated: 'estimated',`
)

content = content.replace(
  /recentLevels:\s+'Livelli recenti',/,
  `recentLevels:   'Livelli recenti',\n    readyToContinue: 'Pronto a continuare il tuo apprendimento?',\n    totalXp: 'XP Totali',\n    streak: 'Serie',\n    keepItUp: 'Continua così!',\n    completed: 'Completato',\n    of: 'di',\n    allCombined: 'Tutti i livelli combinati',\n    seeAll: 'Vedi tutti',\n    moreLevels: 'altri livelli',\n    exercises: 'esercizi',\n    estimated: 'stimate',`
)

content = content.replace(
  /recentLevels:\s+'Níveis recentes',/,
  `recentLevels:   'Níveis recentes',\n    readyToContinue: 'Pronto para continuar a sua aprendizagem?',\n    totalXp: 'XP Total',\n    streak: 'Dias seguidos',\n    keepItUp: 'Continue assim!',\n    completed: 'Concluído',\n    of: 'de',\n    allCombined: 'Todos os níveis',\n    seeAll: 'Ver todos',\n    moreLevels: 'mais níveis',\n    exercises: 'exercícios',\n    estimated: 'estimadas',`
)

fs.writeFileSync('Grammar-languages/app/src/data/i18n.js', content)

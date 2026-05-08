const fs = require('fs')

let content = fs.readFileSync('Grammar-languages/app/src/data/i18n.js', 'utf8')

function updateKeys(langMatch, newKeys) {
  content = content.replace(
    new RegExp(`(estimated:\\s+'.*?',)`),
    `$1\n${newKeys}`
  )
}

updateKeys(/estimated:\s+'estimadas',/, `    myProgress: 'Mi progreso',
    detailedView: 'Vista detallada de todos los niveles',
    done: 'Hecho',
    completion: 'Completado',
    currentRank: 'Rango actual',
    toNextRank: 'XP para el siguiente rango',
    byLevel: 'Por Nivel',
    byModuleA1: 'Por Módulo (A1)',`)

// Note: I will just use run_in_terminal for this and simple replacements

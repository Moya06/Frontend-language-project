// 18 questions per language, 3 per CEFR level (A1→C2)
// score 0-2 = A1, 3-5 = A2, 6-8 = B1, 9-11 = B2, 12-14 = C1, 15-18 = C2

export const PLACEMENT_TESTS = {
  en: {
    lang: 'English',
    flag: '🇬🇧',
    questions: [
      // A1
      {
        level: 'A1', id: 'en-a1-1',
        text: 'What is the correct greeting in the morning?',
        options: ['Good night', 'Good morning', 'Good evening', 'Goodbye'],
        correct: 1,
      },
      {
        level: 'A1', id: 'en-a1-2',
        text: 'Complete: "I ___ a student."',
        options: ['am', 'is', 'are', 'be'],
        correct: 0,
      },
      {
        level: 'A1', id: 'en-a1-3',
        text: 'What is the plural of "child"?',
        options: ['childs', 'childrens', 'children', 'child'],
        correct: 2,
      },
      // A2
      {
        level: 'A2', id: 'en-a2-1',
        text: 'Complete: "She ___ to school every day."',
        options: ['go', 'goes', 'going', 'went'],
        correct: 1,
      },
      {
        level: 'A2', id: 'en-a2-2',
        text: 'Which sentence is correct?',
        options: [
          'I have 25 years old.',
          'I am 25 years old.',
          'I got 25 years old.',
          'I be 25 years old.',
        ],
        correct: 1,
      },
      {
        level: 'A2', id: 'en-a2-3',
        text: 'Choose the correct past tense: "Yesterday I ___ to the cinema."',
        options: ['go', 'goes', 'went', 'gone'],
        correct: 2,
      },
      // B1
      {
        level: 'B1', id: 'en-b1-1',
        text: 'Choose the correct form: "By the time she arrived, he ___ already left."',
        options: ['has', 'had', 'have', 'was'],
        correct: 1,
      },
      {
        level: 'B1', id: 'en-b1-2',
        text: 'What does "thrilled" mean?',
        options: ['Terrified', 'Bored', 'Very excited', 'Confused'],
        correct: 2,
      },
      {
        level: 'B1', id: 'en-b1-3',
        text: '"I wish I ___ more time to study."',
        options: ['have', 'had', 'has', 'having'],
        correct: 1,
      },
      // B2
      {
        level: 'B2', id: 'en-b2-1',
        text: '"If I ___ harder, I would have passed the exam."',
        options: ['studied', 'had studied', 'would study', 'study'],
        correct: 1,
      },
      {
        level: 'B2', id: 'en-b2-2',
        text: 'Which word is a synonym for "meticulous"?',
        options: ['Careless', 'Precise', 'Generous', 'Curious'],
        correct: 1,
      },
      {
        level: 'B2', id: 'en-b2-3',
        text: '"Although he ___ tired, he continued working until midnight."',
        options: ['is', 'was', 'were', 'been'],
        correct: 1,
      },
      // C1
      {
        level: 'C1', id: 'en-c1-1',
        text: 'Choose the best word: "The committee ___ the proposal after lengthy deliberation."',
        options: ['ratified', 'did', 'made', 'said'],
        correct: 0,
      },
      {
        level: 'C1', id: 'en-c1-2',
        text: 'What is the correct passive voice: "They will announce the results tomorrow."',
        options: [
          'The results will be announced tomorrow.',
          'The results are announced tomorrow.',
          'The results were announced tomorrow.',
          'The results had been announced tomorrow.',
        ],
        correct: 0,
      },
      {
        level: 'C1', id: 'en-c1-3',
        text: '"Had she known about the delay, she ___ earlier."',
        options: ['would leave', 'would have left', 'left', 'has left'],
        correct: 1,
      },
      // C2
      {
        level: 'C2', id: 'en-c2-1',
        text: '"He was ___ by the sheer complexity of the philosophical argument."',
        options: ['nonplussed', 'pleased', 'bored', 'motivated'],
        correct: 0,
      },
      {
        level: 'C2', id: 'en-c2-2',
        text: 'Identify the figure of speech: "The wind whispered secrets to the trees."',
        options: ['Simile', 'Metaphor', 'Personification', 'Hyperbole'],
        correct: 2,
      },
      {
        level: 'C2', id: 'en-c2-3',
        text: '"The politician\'s speech was replete with ___ — saying one thing while meaning another."',
        options: ['irony', 'alliteration', 'onomatopoeia', 'euphemism'],
        correct: 0,
      },
    ],
  },

  it: {
    lang: 'Italiano',
    flag: '🇮🇹',
    questions: [
      // A1
      {
        level: 'A1', id: 'it-a1-1',
        text: 'Come si dice "Hello" in italiano?',
        options: ['Arrivederci', 'Ciao', 'Grazie', 'Prego'],
        correct: 1,
      },
      {
        level: 'A1', id: 'it-a1-2',
        text: 'Completa: "Io ___ Marco."',
        options: ['sei', 'sono', 'siamo', 'è'],
        correct: 1,
      },
      {
        level: 'A1', id: 'it-a1-3',
        text: 'Qual è il femminile di "ragazzo"?',
        options: ['ragazza', 'ragazi', 'ragazze', 'ragazzo'],
        correct: 0,
      },
      // A2
      {
        level: 'A2', id: 'it-a2-1',
        text: 'Scegli la forma corretta: "Lei ___ a scuola ogni giorno."',
        options: ['va', 'vai', 'vado', 'vanno'],
        correct: 0,
      },
      {
        level: 'A2', id: 'it-a2-2',
        text: 'Quale frase è corretta?',
        options: [
          'Ho venticinque anni.',
          'Sono venticinque anni.',
          'Ho venticinque anno.',
          'Faccio venticinque anni.',
        ],
        correct: 0,
      },
      {
        level: 'A2', id: 'it-a2-3',
        text: 'Il passato prossimo di "mangiare" per "noi":',
        options: ['abbiamo mangiato', 'mangiamo', 'avevamo mangiato', 'mangiassimo'],
        correct: 0,
      },
      // B1
      {
        level: 'B1', id: 'it-b1-1',
        text: 'Scegli il tempo corretto: "Quando ___ arrivato, lei era già partita."',
        options: ['sono', 'ero', 'ho', 'era'],
        correct: 0,
      },
      {
        level: 'B1', id: 'it-b1-2',
        text: 'Cosa significa "emozionato"?',
        options: ['Stanco', 'Arrabbiato', 'Eccitato / commosso', 'Confuso'],
        correct: 2,
      },
      {
        level: 'B1', id: 'it-b1-3',
        text: '"Spero che tu ___ bene."',
        options: ['stai', 'stia', 'stavi', 'stessi'],
        correct: 1,
      },
      // B2
      {
        level: 'B2', id: 'it-b2-1',
        text: '"Se ___ di più, avrei superato l\'esame."',
        options: ['studiassi', 'avessi studiato', 'studiai', 'studiavo'],
        correct: 1,
      },
      {
        level: 'B2', id: 'it-b2-2',
        text: 'Sinonimo di "meticoloso":',
        options: ['Distratto', 'Preciso', 'Generoso', 'Curioso'],
        correct: 1,
      },
      {
        level: 'B2', id: 'it-b2-3',
        text: '"Nonostante ___ stanco, continuò a lavorare fino a mezzanotte."',
        options: ['è', 'fosse', 'era', 'sia'],
        correct: 1,
      },
      // C1
      {
        level: 'C1', id: 'it-c1-1',
        text: '"Il comitato ___ la proposta dopo lunga deliberazione."',
        options: ['ha ratificato', 'ha detto', 'ha fatto', 'ha visto'],
        correct: 0,
      },
      {
        level: 'C1', id: 'it-c1-2',
        text: 'Voce passiva: "Annunceranno i risultati domani."',
        options: [
          'I risultati saranno annunciati domani.',
          'I risultati sono annunciati domani.',
          'I risultati erano annunciati domani.',
          'I risultati venivano annunciati domani.',
        ],
        correct: 0,
      },
      {
        level: 'C1', id: 'it-c1-3',
        text: '"Se avesse saputo del ritardo, ___ partita prima."',
        options: ['è', 'sarebbe', 'aveva', 'ha'],
        correct: 1,
      },
      // C2
      {
        level: 'C2', id: 'it-c2-1',
        text: '"Era ___ dalla complessità dell\'argomento filosofico."',
        options: ['sconcertato', 'felice', 'annoiato', 'motivato'],
        correct: 0,
      },
      {
        level: 'C2', id: 'it-c2-2',
        text: 'Figura retorica: "Il vento sussurrava segreti agli alberi."',
        options: ['Similitudine', 'Metafora', 'Personificazione', 'Iperbole'],
        correct: 2,
      },
      {
        level: 'C2', id: 'it-c2-3',
        text: '"Il suo discorso era colmo di ___ — diceva una cosa intendendo l\'opposto."',
        options: ['ironia', 'allitterazione', 'onomatopea', 'eufemismo'],
        correct: 0,
      },
    ],
  },

  es: {
    lang: 'Español',
    flag: '🇪🇸',
    questions: [
      { level: 'A1', id: 'es-a1-1', text: '¿Cómo se dice "Hello" en español?', options: ['Adiós', 'Hola', 'Gracias', 'Por favor'], correct: 1 },
      { level: 'A1', id: 'es-a1-2', text: 'Completa: "Yo ___ estudiante."', options: ['eres', 'soy', 'somos', 'es'], correct: 1 },
      { level: 'A1', id: 'es-a1-3', text: '¿Cuál es el plural de "perro"?', options: ['perros', 'perroes', 'perras', 'perro'], correct: 0 },
      { level: 'A2', id: 'es-a2-1', text: 'Elige la forma correcta: "Ella ___ a la escuela todos los días."', options: ['va', 'vas', 'voy', 'van'], correct: 0 },
      { level: 'A2', id: 'es-a2-2', text: '¿Qué frase es correcta?', options: ['Tengo veinticinco años.', 'Soy veinticinco años.', 'Tengo veinticinco año.', 'Hago veinticinco años.'], correct: 0 },
      { level: 'A2', id: 'es-a2-3', text: 'El pretérito perfecto de "hablar" para "ellos":', options: ['hablaron', 'hablarán', 'hablaban', 'hablasen'], correct: 0 },
      { level: 'B1', id: 'es-b1-1', text: 'Elige el tiempo correcto: "Cuando ___ llegado, ella ya había salido."', options: ['tengo', 'había', 'hube', 'hay'], correct: 2 },
      { level: 'B1', id: 'es-b1-2', text: '¿Qué significa "emocionado"?', options: ['Cansado', 'Enojado', 'Muy animado', 'Confundido'], correct: 2 },
      { level: 'B1', id: 'es-b1-3', text: '"Espero que tú ___ bien."', options: ['estás', 'estés', 'estabas', 'estuviste'], correct: 1 },
      { level: 'B2', id: 'es-b2-1', text: '"Si yo ___ más, habría aprobado el examen."', options: ['estudiara', 'hubiera estudiado', 'estudié', 'estudiaba'], correct: 1 },
      { level: 'B2', id: 'es-b2-2', text: 'Sinónimo de "meticuloso":', options: ['Descuidado', 'Preciso', 'Generoso', 'Curioso'], correct: 1 },
      { level: 'B2', id: 'es-b2-3', text: '"Aunque ___ lloviendo, salió a correr."', options: ['está', 'esté', 'estuviera', 'estuvo'], correct: 1 },
      { level: 'C1', id: 'es-c1-1', text: '"El comité ___ la propuesta tras una larga deliberación."', options: ['ratificó', 'dijo', 'hizo', 'vio'], correct: 0 },
      { level: 'C1', id: 'es-c1-2', text: 'Voz pasiva: "Ellos anunciarán los resultados mañana."', options: ['Los resultados serán anunciados mañana.', 'Los resultados son anunciados mañana.', 'Los resultados fueron anunciados mañana.', 'Los resultados venían siendo anunciados mañana.'], correct: 0 },
      { level: 'C1', id: 'es-c1-3', text: '"¿Te ___ bien que nos veamos a las cinco?"', options: ['viene', 'hace', 'parece', 'da'], correct: 2 },
      { level: 'C2', id: 'es-c2-1', text: '"Quedó ___ por la complejidad del argumento filosófico."', options: ['perplejo', 'feliz', 'aburrido', 'motivado'], correct: 0 },
      { level: 'C2', id: 'es-c2-2', text: 'Figura literaria: "El viento susurraba secretos a los árboles."', options: ['Símil', 'Metáfora', 'Personificación', 'Hipérbole'], correct: 2 },
      { level: 'C2', id: 'es-c2-3', text: '"No intervino en la discusión, ___ lo hiciera."', options: ['aunque', 'por más que', 'aun cuando', 'todas las anteriores'], correct: 3 },
    ],
  },
  pt: {
    lang: 'Português',
    flag: '🇧🇷',
    questions: [
      // A1
      {
        level: 'A1', id: 'pt-a1-1',
        text: 'Como se diz "Hello" em português?',
        options: ['Tchau', 'Olá', 'Obrigado', 'Por favor'],
        correct: 1,
      },
      {
        level: 'A1', id: 'pt-a1-2',
        text: 'Complete: "Eu ___ estudante."',
        options: ['és', 'sou', 'somos', 'é'],
        correct: 1,
      },
      {
        level: 'A1', id: 'pt-a1-3',
        text: 'Qual é o plural de "cão"?',
        options: ['cãos', 'cães', 'cãoes', 'cão'],
        correct: 1,
      },
      // A2
      {
        level: 'A2', id: 'pt-a2-1',
        text: 'Escolha a forma correta: "Ela ___ à escola todos os dias."',
        options: ['vai', 'vais', 'vou', 'vão'],
        correct: 0,
      },
      {
        level: 'A2', id: 'pt-a2-2',
        text: 'Qual frase está correta?',
        options: [
          'Eu tenho vinte e cinco anos.',
          'Eu sou vinte e cinco anos.',
          'Eu tenho vinte e cinco ano.',
          'Eu faço vinte e cinco anos.',
        ],
        correct: 0,
      },
      {
        level: 'A2', id: 'pt-a2-3',
        text: 'O pretérito perfeito de "falar" para "nós":',
        options: ['falamos', 'falaremos', 'falávamos', 'falássemos'],
        correct: 0,
      },
      // B1
      {
        level: 'B1', id: 'pt-b1-1',
        text: 'Escolha o tempo correto: "Quando ___ chegado, ela já tinha saído."',
        options: ['tenho', 'tinha', 'tive', 'há'],
        correct: 1,
      },
      {
        level: 'B1', id: 'pt-b1-2',
        text: 'O que significa "empolgado"?',
        options: ['Cansado', 'Irritado', 'Muito animado', 'Confuso'],
        correct: 2,
      },
      {
        level: 'B1', id: 'pt-b1-3',
        text: '"Espero que tu ___ bem."',
        options: ['estás', 'estejas', 'estavas', 'estiveste'],
        correct: 1,
      },
      // B2
      {
        level: 'B2', id: 'pt-b2-1',
        text: '"Se eu ___ mais, teria passado no exame."',
        options: ['estudasse', 'tivesse estudado', 'estudei', 'estudava'],
        correct: 1,
      },
      {
        level: 'B2', id: 'pt-b2-2',
        text: 'Sinônimo de "meticuloso":',
        options: ['Descuidado', 'Preciso', 'Generoso', 'Curioso'],
        correct: 1,
      },
      {
        level: 'B2', id: 'pt-b2-3',
        text: '"Embora ___ cansado, continuou a trabalhar até à meia-noite."',
        options: ['está', 'estivesse', 'estava', 'esteja'],
        correct: 1,
      },
      // C1
      {
        level: 'C1', id: 'pt-c1-1',
        text: '"O comitê ___ a proposta após longa deliberação."',
        options: ['ratificou', 'disse', 'fez', 'viu'],
        correct: 0,
      },
      {
        level: 'C1', id: 'pt-c1-2',
        text: 'Voz passiva: "Eles anunciarão os resultados amanhã."',
        options: [
          'Os resultados serão anunciados amanhã.',
          'Os resultados são anunciados amanhã.',
          'Os resultados foram anunciados amanhã.',
          'Os resultados vinham sendo anunciados amanhã.',
        ],
        correct: 0,
      },
      {
        level: 'C1', id: 'pt-c1-3',
        text: '"Se ela soubesse do atraso, ___ mais cedo."',
        options: ['partiu', 'teria partido', 'partia', 'parte'],
        correct: 1,
      },
      // C2
      {
        level: 'C2', id: 'pt-c2-1',
        text: '"Ele ficou ___ pela complexidade do argumento filosófico."',
        options: ['perplexo', 'feliz', 'entediado', 'motivado'],
        correct: 0,
      },
      {
        level: 'C2', id: 'pt-c2-2',
        text: 'Figura de linguagem: "O vento sussurrava segredos às árvores."',
        options: ['Símile', 'Metáfora', 'Personificação', 'Hipérbole'],
        correct: 2,
      },
      {
        level: 'C2', id: 'pt-c2-3',
        text: '"O discurso do político estava repleto de ___ — dizia uma coisa querendo dizer outra."',
        options: ['ironia', 'aliteração', 'onomatopeia', 'eufemismo'],
        correct: 0,
      },
    ],
  },
}

// Score → level mapping (out of 18 questions, 3 per level)
export function scoreToLevel(correct) {
  if (correct <= 2) return 'A1'
  if (correct <= 5) return 'A2'
  if (correct <= 8) return 'B1'
  if (correct <= 11) return 'B2'
  if (correct <= 14) return 'C1'
  return 'C2'
}

// Level → index mapping
export const LEVEL_ORDER = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

// Self-assessment options shown before the test
export const SELF_LEVELS = [
  {
    id: 'beginner',
    label: 'Beginner',
    labelEs: 'Principiante',
    subtitle: 'I know very little or nothing yet',
    range: ['A1', 'A2'],
    emoji: '🌱',
    color: '#10b981',
    questions: ['A1', 'A1', 'A2', 'A2', 'B1'], // levels to include
  },
  {
    id: 'elementary',
    label: 'Elementary',
    labelEs: 'Básico',
    subtitle: 'I know the basics and simple sentences',
    range: ['A2', 'B1'],
    emoji: '📖',
    color: '#3b82f6',
    questions: ['A1', 'A2', 'A2', 'B1', 'B1', 'B2'],
  },
  {
    id: 'intermediate',
    label: 'Intermediate',
    labelEs: 'Intermedio',
    subtitle: 'I handle everyday conversations',
    range: ['B1', 'B2'],
    emoji: '🚀',
    color: '#f59e0b',
    questions: ['A2', 'B1', 'B1', 'B2', 'B2', 'C1'],
  },
  {
    id: 'advanced',
    label: 'Advanced',
    labelEs: 'Avanzado',
    subtitle: 'I speak fluently with complex topics',
    range: ['C1', 'C2'],
    emoji: '🏆',
    color: '#a78bfa',
    questions: ['B2', 'C1', 'C1', 'C2', 'C2'],
  },
]

// Returns an adaptive subset of questions based on self-assessed level
export function getAdaptiveQuestions(languageId, selfLevelId) {
  const all = PLACEMENT_TESTS[languageId]?.questions ?? []
  const selfLevel = SELF_LEVELS.find(l => l.id === selfLevelId)
  if (!selfLevel) return all

  const byLevel = {}
  all.forEach(q => {
    if (!byLevel[q.level]) byLevel[q.level] = []
    byLevel[q.level].push(q)
  })

  const used = {}
  return selfLevel.questions
    .map(lvl => {
      const pool = byLevel[lvl] ?? []
      const idx = used[lvl] ?? 0
      used[lvl] = idx + 1
      return pool[idx] ?? pool[0] ?? null
    })
    .filter(Boolean)
}

// Score → level when using adaptive subset
export function scoreToLevelAdaptive(correct, total, selfLevelId) {
  if (total === 0) return 'A1'
  const pct = correct / total
  const map = {
    beginner:     pct <= 0.2 ? 'A1' : pct <= 0.6 ? 'A2' : 'B1',
    elementary:   pct <= 0.2 ? 'A1' : pct <= 0.4 ? 'A2' : pct <= 0.7 ? 'B1' : 'B2',
    intermediate: pct <= 0.2 ? 'A2' : pct <= 0.5 ? 'B1' : pct <= 0.85 ? 'B2' : 'C1',
    advanced:     pct <= 0.2 ? 'B2' : pct <= 0.6 ? 'C1' : 'C2',
  }
  return map[selfLevelId] ?? scoreToLevel(correct)
}

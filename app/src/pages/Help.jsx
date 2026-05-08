import { useState } from 'react'
import { ChevronDown, BookOpen, Zap, Globe, Trophy, MessageCircle } from 'lucide-react'
import { useApp } from '../store/AppContext'
import clsx from 'clsx'

const FAQ = {
  es: [
    {
      section: 'Primeros pasos',
      icon: Globe,
      items: [
        { q: '¿Cómo funciona la app?', a: 'Elige un idioma, haz el test de nivel y empieza a practicar con actividades organizadas por nivel (A1–C2) y módulo (gramática, vocabulario, escucha, lectura, juegos).' },
        { q: '¿Qué es el test de nivel?', a: 'Un test de ~10 preguntas que detecta tu nivel inicial (A1–C2). Lo puedes repetir en cualquier momento desde el menú de niveles.' },
        { q: '¿Puedo cambiar de idioma?', a: 'Sí. Haz clic en el selector de idioma en la barra lateral o en el botón de idioma en la barra superior.' },
      ],
    },
    {
      section: 'XP y progreso',
      icon: Zap,
      items: [
        { q: '¿Cómo gano XP?', a: 'Completando actividades. Cada actividad otorga XP según su dificultad.' },
        { q: '¿Qué son los rangos?', a: 'A medida que acumulas XP subes de rango: Rookie → Explorer → Scholar → Expert → Master.' },
        { q: '¿Qué es la racha?', a: 'El número de días consecutivos que has practicado. ¡Intenta mantenerla!' },
      ],
    },
    {
      section: 'Niveles y módulos',
      icon: BookOpen,
      items: [
        { q: '¿Por qué algunos niveles están bloqueados?', a: 'Los niveles se desbloquean según tu resultado del test de nivel. Los niveles iguales o inferiores al tuyo se abren automáticamente.' },
        { q: '¿Cuáles son los módulos?', a: 'Cada nivel tiene 5 módulos: Juegos, Gramática, Escucha, Lectura y Vocabulario. Cada uno tiene actividades independientes.' },
      ],
    },
  ],
  en: [
    {
      section: 'Getting started',
      icon: Globe,
      items: [
        { q: 'How does the app work?', a: 'Choose a language, take the placement test and start practising with activities organised by level (A1–C2) and module (grammar, vocabulary, listening, reading, games).' },
        { q: 'What is the placement test?', a: 'A ~10-question test that detects your starting level (A1–C2). You can retake it at any time from the levels menu.' },
        { q: 'Can I change the learning language?', a: 'Yes. Click the language selector in the sidebar or the language button in the top bar.' },
      ],
    },
    {
      section: 'XP & progress',
      icon: Zap,
      items: [
        { q: 'How do I earn XP?', a: 'By completing activities. Each activity awards XP based on its difficulty.' },
        { q: 'What are ranks?', a: 'As you accumulate XP you advance through ranks: Rookie → Explorer → Scholar → Expert → Master.' },
        { q: 'What is the streak?', a: 'The number of consecutive days you have practised. Try to keep it going!' },
      ],
    },
    {
      section: 'Levels & modules',
      icon: BookOpen,
      items: [
        { q: 'Why are some levels locked?', a: 'Levels unlock based on your placement test result. Levels at or below your result open automatically.' },
        { q: 'What are the modules?', a: 'Each level has 5 modules: Games, Grammar, Listening, Reading and Vocabulary. Each has independent activities.' },
      ],
    },
  ],
  it: [
    {
      section: 'Per iniziare',
      icon: Globe,
      items: [
        { q: 'Come funziona l\'app?', a: 'Scegli una lingua, fai il test di livello e inizia a esercitarti con attività organizzate per livello (A1–C2) e modulo.' },
        { q: 'Cos\'è il test di livello?', a: 'Un test di ~10 domande che rileva il tuo livello iniziale (A1–C2). Puoi rifarlo in qualsiasi momento.' },
        { q: 'Posso cambiare lingua?', a: 'Sì. Clicca sul selettore di lingua nella barra laterale o sul pulsante in alto.' },
      ],
    },
    {
      section: 'XP e progressi',
      icon: Zap,
      items: [
        { q: 'Come guadagno XP?', a: 'Completando attività. Ogni attività assegna XP in base alla difficoltà.' },
        { q: 'Cosa sono i gradi?', a: 'Man mano che accumuli XP avanzi di grado: Rookie → Explorer → Scholar → Expert → Master.' },
      ],
    },
  ],
  pt: [
    {
      section: 'Primeiros passos',
      icon: Globe,
      items: [
        { q: 'Como funciona o app?', a: 'Escolha um idioma, faça o teste de nivelamento e comece a praticar com atividades organizadas por nível (A1–C2) e módulo.' },
        { q: 'O que é o teste de nivelamento?', a: 'Um teste de ~10 perguntas que detecta seu nível inicial (A1–C2). Você pode refazê-lo a qualquer momento.' },
        { q: 'Posso mudar o idioma?', a: 'Sim. Clique no seletor de idioma na barra lateral ou no botão na barra superior.' },
      ],
    },
    {
      section: 'XP e progresso',
      icon: Zap,
      items: [
        { q: 'Como ganho XP?', a: 'Completando atividades. Cada atividade concede XP com base na dificuldade.' },
        { q: 'O que são as classificações?', a: 'Conforme acumula XP você avança nas classificações: Rookie → Explorer → Scholar → Expert → Master.' },
      ],
    },
  ],
}

const TITLES = {
  es: 'Ayuda',
  en: 'Help',
  it: 'Aiuto',
  pt: 'Ajuda',
}

function AccordionItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b last:border-0" style={{ borderColor: 'var(--border-subtle)' }}>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-3 py-4 text-left text-sm font-medium transition-colors hover:opacity-80"
        style={{ color: 'var(--text-base)' }}
      >
        <span>{q}</span>
        <ChevronDown size={15} className={clsx('flex-shrink-0 transition-transform', open && 'rotate-180')} style={{ color: 'var(--text-muted)' }} />
      </button>
      {open && (
        <p className="pb-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{a}</p>
      )}
    </div>
  )
}

export default function Help() {
  const { uiLang } = useApp()
  const sections = FAQ[uiLang] || FAQ['es']
  const title = TITLES[uiLang] || TITLES['es']

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-black" style={{ color: 'var(--text-base)' }}>{title}</h1>

      {sections.map(({ section, icon: Icon, items }) => (
        <div key={section} className="glass p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-brand-500/15 border border-brand-500/25 flex items-center justify-center">
              <Icon size={14} className="text-brand-400" />
            </div>
            <h2 className="text-sm font-bold" style={{ color: 'var(--text-base)' }}>{section}</h2>
          </div>
          <div>
            {items.map(item => (
              <AccordionItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

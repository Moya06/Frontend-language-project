/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: {
          900: '#080814',
          800: '#0d0d22',
          700: '#12122d',
          600: '#181838',
          500: '#202050',
          400: '#2a2a6a',
        },
        brand: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        },
        level: {
          a1: '#10b981',
          a2: '#34d399',
          b1: '#3b82f6',
          b2: '#6366f1',
          c1: '#a78bfa',
          c2: '#ec4899',
        },
        module: {
          games:     '#f59e0b',
          grammar:   '#3b82f6',
          listening: '#10b981',
          reading:   '#8b5cf6',
          vocab:     '#ec4899',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glass:       '0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
        'glass-lg':  '0 25px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
        neo:         '6px 6px 16px rgba(0,0,0,0.65), -3px -3px 10px rgba(255,255,255,0.025)',
        'neo-inset': 'inset 5px 5px 14px rgba(0,0,0,0.6), inset -3px -3px 8px rgba(255,255,255,0.025)',
        'neo-sm':    '3px 3px 8px rgba(0,0,0,0.5), -2px -2px 5px rgba(255,255,255,0.02)',
        'glow-brand':'0 0 25px rgba(99,102,241,0.4)',
        'glow-green':'0 0 20px rgba(16,185,129,0.4)',
        'glow-pink': '0 0 20px rgba(236,72,153,0.4)',
      },
      animation: {
        'orb':      'orbFloat 12s ease-in-out infinite',
        'fade-in':  'fadeIn 0.3s ease forwards',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'shimmer':  'shimmer 1.8s linear infinite',
        'pulse-glow':'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        orbFloat: {
          '0%,100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-45px) scale(1.08)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(18px) scale(0.97)' },
          to:   { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%,100%': { opacity: '0.6' },
          '50%':     { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}


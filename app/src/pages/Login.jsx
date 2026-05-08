import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Globe, Eye, EyeOff, LogIn, Loader2 } from 'lucide-react'
import { useApp } from '../store/AppContext'
import { T } from '../data/i18n'
import clsx from 'clsx'

const Orbs = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    <div
      className="absolute w-[700px] h-[700px] rounded-full -top-56 -left-56 animate-orb"
      style={{
        background: 'radial-gradient(circle, #4f46e5, #7c3aed)',
        filter: 'blur(120px)',
        opacity: 'var(--orb-opacity)',
      }}
    />
    <div
      className="absolute w-[500px] h-[500px] rounded-full -bottom-40 -right-40 animate-orb"
      style={{
        background: 'radial-gradient(circle, #0891b2, #0369a1)',
        filter: 'blur(100px)',
        opacity: 'var(--orb-opacity)',
        animationDelay: '-6s',
      }}
    />
    <div
      className="absolute w-[400px] h-[400px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-orb"
      style={{
        background: 'radial-gradient(circle, #6d28d9, #4f46e5)',
        filter: 'blur(140px)',
        opacity: 'calc(var(--orb-opacity) * 0.6)',
        animationDelay: '-3s',
      }}
    />
  </div>
)

export default function Login() {
  const { dispatch, uiLang } = useApp()
  const navigate = useNavigate()
  const t = T[uiLang] || T['es']

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd]   = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)

  const labels = {
    es: {
      title:       'Bienvenido de nuevo',
      subtitle:    'Inicia sesión para continuar tu aprendizaje',
      emailLabel:  'Correo electrónico',
      pwdLabel:    'Contraseña',
      btn:         'Iniciar sesión',
      noAccount:   '¿No tienes cuenta?',
      register:    'Regístrate',
      errorBad:    'Correo o contraseña incorrectos',
      errorEmpty:  'Completa todos los campos',
      forgotPwd:   '¿Olvidaste tu contraseña?',
    },
    en: {
      title:       'Welcome back',
      subtitle:    'Sign in to continue your learning',
      emailLabel:  'Email address',
      pwdLabel:    'Password',
      btn:         'Sign in',
      noAccount:   "Don't have an account?",
      register:    'Sign up',
      errorBad:    'Incorrect email or password',
      errorEmpty:  'Please fill in all fields',
      forgotPwd:   'Forgot password?',
    },
    it: {
      title:       'Bentornato',
      subtitle:    'Accedi per continuare il tuo apprendimento',
      emailLabel:  'Indirizzo email',
      pwdLabel:    'Password',
      btn:         'Accedi',
      noAccount:   'Non hai un account?',
      register:    'Registrati',
      errorBad:    'Email o password errati',
      errorEmpty:  'Compila tutti i campi',
      forgotPwd:   'Password dimenticata?',
    },
    pt: {
      title:       'Bem-vindo de volta',
      subtitle:    'Entre para continuar seu aprendizado',
      emailLabel:  'Endereço de email',
      pwdLabel:    'Senha',
      btn:         'Entrar',
      noAccount:   'Não tem uma conta?',
      register:    'Cadastre-se',
      errorBad:    'Email ou senha incorretos',
      errorEmpty:  'Preencha todos os campos',
      forgotPwd:   'Esqueceu a senha?',
    },
  }

  const l = labels[uiLang] || labels['es']

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    if (!email.trim() || !password.trim()) {
      setError(l.errorEmpty)
      return
    }

    setLoading(true)
    try {
      // ── Replace this block with your real API call ─────────────────────
      // Example:
      //   const { user, accessToken, refreshToken } = await authService.login({ email, password })
      //   localStorage.setItem('gl_access',  accessToken)
      //   localStorage.setItem('gl_refresh', refreshToken)
      //   dispatch({ type: 'AUTH_LOGIN', payload: user })
      //   navigate('/')
      // ───────────────────────────────────────────────────────────────────

      // ── Demo / placeholder ─────────────────────────────────────────────
      await new Promise(r => setTimeout(r, 900))
      const demoUser = {
        id:          '1',
        email:       email.trim().toLowerCase(),
        username:    email.split('@')[0],
        displayName: email.split('@')[0],
        xp:          0,
        level:       1,
        role:        'USER',
      }
      dispatch({ type: 'AUTH_LOGIN', payload: demoUser })
      navigate('/', { replace: true })
      // ───────────────────────────────────────────────────────────────────
    } catch (err) {
      setError(err?.message || l.errorBad)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative">
      <Orbs />

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2.5 mb-6 px-4 py-2 rounded-2xl glass">
            <Globe size={16} className="text-brand-400" />
            <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
              GrammarLanguages
            </span>
          </div>
          <h1 className="text-3xl font-black mb-2" style={{ color: 'var(--text-base)' }}>
            {l.title}
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {l.subtitle}
          </p>
        </div>

        {/* Card */}
        <div className="glass p-7 space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-wide uppercase" style={{ color: 'var(--text-muted)' }}>
                {l.emailLabel}
              </label>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                disabled={loading}
                className={clsx(
                  'w-full px-4 py-3 rounded-xl text-sm font-medium outline-none transition-all duration-200',
                  'placeholder:opacity-30 disabled:opacity-50',
                )}
                style={{
                  background:  'var(--bg-input)',
                  color:       'var(--text-base)',
                  border:      '1px solid var(--border-subtle)',
                }}
                onFocus={e => e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'}
                onBlur={e  => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold tracking-wide uppercase" style={{ color: 'var(--text-muted)' }}>
                  {l.pwdLabel}
                </label>
                <button
                  type="button"
                  className="text-xs font-medium transition-colors hover:opacity-70"
                  style={{ color: '#818cf8' }}
                >
                  {l.forgotPwd}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  className={clsx(
                    'w-full px-4 py-3 pr-11 rounded-xl text-sm font-medium outline-none transition-all duration-200',
                    'placeholder:opacity-30 disabled:opacity-50',
                  )}
                  style={{
                    background: 'var(--bg-input)',
                    color:      'var(--text-base)',
                    border:     '1px solid var(--border-subtle)',
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'}
                  onBlur={e  => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg transition-opacity hover:opacity-70"
                  style={{ color: 'var(--text-muted)' }}
                  tabIndex={-1}
                >
                  {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                className="px-4 py-3 rounded-xl text-sm font-medium"
                style={{
                  background: 'rgba(239,68,68,0.10)',
                  border:     '1px solid rgba(239,68,68,0.25)',
                  color:      '#fca5a5',
                }}
              >
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background:  loading ? 'rgba(99,102,241,0.5)' : '#6366f1',
                boxShadow:   loading ? 'none' : '0 4px 24px rgba(99,102,241,0.45)',
              }}
            >
              {loading
                ? <Loader2 size={16} className="animate-spin" />
                : <LogIn size={15} />
              }
              {l.btn}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: 'var(--border-subtle)' }} />
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>or</span>
            <div className="flex-1 h-px" style={{ background: 'var(--border-subtle)' }} />
          </div>

          {/* Register link */}
          <p className="text-center text-sm" style={{ color: 'var(--text-muted)' }}>
            {l.noAccount}{' '}
            <Link
              to="/register"
              className="font-semibold transition-colors hover:opacity-80"
              style={{ color: '#a5b4fc' }}
            >
              {l.register}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

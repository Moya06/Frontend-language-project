import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Globe, Eye, EyeOff, UserPlus, Loader2, Check } from 'lucide-react'
import { useApp } from '../store/AppContext'
import { registerWithApi, persistTokens } from '../services/authApi'
import clsx from 'clsx'

const Orbs = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    <div
      className="absolute w-[700px] h-[700px] rounded-full -top-56 -right-56 animate-orb"
      style={{
        background: 'radial-gradient(circle, #7c3aed, #4f46e5)',
        filter: 'blur(120px)',
        opacity: 'var(--orb-opacity)',
      }}
    />
    <div
      className="absolute w-[500px] h-[500px] rounded-full -bottom-40 -left-40 animate-orb"
      style={{
        background: 'radial-gradient(circle, #0891b2, #0369a1)',
        filter: 'blur(100px)',
        opacity: 'var(--orb-opacity)',
        animationDelay: '-4s',
      }}
    />
  </div>
)

const LABELS = {
  es: {
    title:          'Crea tu cuenta',
    subtitle:       'Comienza tu aventura de aprendizaje',
    nameLabel:      'Nombre de usuario',
    namePlaceholder:'tu_nombre',
    emailLabel:     'Correo electrónico',
    pwdLabel:       'Contraseña',
    confirmLabel:   'Confirmar contraseña',
    btn:            'Crear cuenta',
    hasAccount:     '¿Ya tienes cuenta?',
    login:          'Inicia sesión',
    errorEmpty:     'Completa todos los campos',
    errorPwdMatch:  'Las contraseñas no coinciden',
    errorPwdLen:    'La contraseña debe tener al menos 8 caracteres',
    errorUsername:  'El nombre solo puede contener letras, números y _',
    pwdStrength:    ['Muy débil', 'Débil', 'Regular', 'Fuerte', 'Muy fuerte'],
  },
  en: {
    title:          'Create your account',
    subtitle:       'Start your learning adventure',
    nameLabel:      'Username',
    namePlaceholder:'your_name',
    emailLabel:     'Email address',
    pwdLabel:       'Password',
    confirmLabel:   'Confirm password',
    btn:            'Create account',
    hasAccount:     'Already have an account?',
    login:          'Sign in',
    errorEmpty:     'Please fill in all fields',
    errorPwdMatch:  'Passwords do not match',
    errorPwdLen:    'Password must be at least 8 characters',
    errorUsername:  'Username can only contain letters, numbers and _',
    pwdStrength:    ['Very weak', 'Weak', 'Fair', 'Strong', 'Very strong'],
  },
  it: {
    title:          'Crea il tuo account',
    subtitle:       'Inizia la tua avventura di apprendimento',
    nameLabel:      'Nome utente',
    namePlaceholder:'tuo_nome',
    emailLabel:     'Indirizzo email',
    pwdLabel:       'Password',
    confirmLabel:   'Conferma password',
    btn:            'Crea account',
    hasAccount:     'Hai già un account?',
    login:          'Accedi',
    errorEmpty:     'Compila tutti i campi',
    errorPwdMatch:  'Le password non corrispondono',
    errorPwdLen:    'La password deve avere almeno 8 caratteri',
    errorUsername:  'Il nome può contenere solo lettere, numeri e _',
    pwdStrength:    ['Molto debole', 'Debole', 'Discreta', 'Forte', 'Molto forte'],
  },
  pt: {
    title:          'Crie sua conta',
    subtitle:       'Comece sua aventura de aprendizado',
    nameLabel:      'Nome de usuário',
    namePlaceholder:'seu_nome',
    emailLabel:     'Endereço de email',
    pwdLabel:       'Senha',
    confirmLabel:   'Confirmar senha',
    btn:            'Criar conta',
    hasAccount:     'Já tem uma conta?',
    login:          'Entrar',
    errorEmpty:     'Preencha todos os campos',
    errorPwdMatch:  'As senhas não coincidem',
    errorPwdLen:    'A senha deve ter pelo menos 8 caracteres',
    errorUsername:  'O nome só pode conter letras, números e _',
    pwdStrength:    ['Muito fraca', 'Fraca', 'Regular', 'Forte', 'Muito forte'],
  },
}

function getPasswordStrength(pwd) {
  if (!pwd) return 0
  let score = 0
  if (pwd.length >= 8)  score++
  if (pwd.length >= 12) score++
  if (/[A-Z]/.test(pwd)) score++
  if (/[0-9]/.test(pwd)) score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++
  return score
}

const STRENGTH_COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#10b981']

export default function Register() {
  const { dispatch, uiLang } = useApp()
  const navigate = useNavigate()
  const l = LABELS[uiLang] || LABELS['es']

  const [username, setUsername] = useState('')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [confirm,  setConfirm]  = useState('')
  const [showPwd,  setShowPwd]  = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState(null)

  const strength = getPasswordStrength(password)

  function validate() {
    if (!username.trim() || !email.trim() || !password || !confirm) return l.errorEmpty
    if (!/^[a-zA-Z0-9_]+$/.test(username.trim())) return l.errorUsername
    if (password.length < 8)              return l.errorPwdLen
    if (password !== confirm)             return l.errorPwdMatch
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    const err = validate()
    if (err) { setError(err); return }

    setLoading(true)
    try {
      const session = await registerWithApi({
        email: email.trim().toLowerCase(),
        username: username.trim(),
        password,
        displayName: username.trim(),
      })

      persistTokens(session.tokens)
      dispatch({ type: 'AUTH_LOGIN', payload: session.user })
      navigate('/select', { replace: true })
    } catch (err) {
      setError(err?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    background: 'var(--bg-input)',
    color:      'var(--text-base)',
    border:     '1px solid var(--border-subtle)',
  }
  const inputClass = clsx(
    'w-full px-4 py-3 rounded-xl text-sm font-medium outline-none transition-all duration-200',
    'placeholder:opacity-30 disabled:opacity-50',
  )

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative">
      <Orbs />

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5 mb-5 px-4 py-2 rounded-2xl glass">
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
            {/* Username */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-wide uppercase" style={{ color: 'var(--text-muted)' }}>
                {l.nameLabel}
              </label>
              <input
                type="text"
                autoComplete="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder={l.namePlaceholder}
                disabled={loading}
                className={inputClass}
                style={inputStyle}
                onFocus={e => e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'}
                onBlur={e  => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
              />
            </div>

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
                className={inputClass}
                style={inputStyle}
                onFocus={e => e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'}
                onBlur={e  => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-wide uppercase" style={{ color: 'var(--text-muted)' }}>
                {l.pwdLabel}
              </label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  className={clsx(inputClass, 'pr-11')}
                  style={inputStyle}
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

              {/* Password strength bar */}
              {password.length > 0 && (
                <div className="space-y-1 pt-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div
                        key={i}
                        className="flex-1 h-1 rounded-full transition-all duration-300"
                        style={{
                          background: i <= strength ? STRENGTH_COLORS[strength - 1] : 'var(--border-subtle)',
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-xs font-medium" style={{ color: strength > 0 ? STRENGTH_COLORS[strength - 1] : 'var(--text-muted)' }}>
                    {l.pwdStrength[strength - 1] ?? ''}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-wide uppercase" style={{ color: 'var(--text-muted)' }}>
                {l.confirmLabel}
              </label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  className={clsx(inputClass, 'pr-11')}
                  style={inputStyle}
                  onFocus={e => e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'}
                  onBlur={e  => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
                />
                {confirm.length > 0 && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2">
                    {confirm === password
                      ? <Check size={15} style={{ color: '#22c55e' }} />
                      : <span style={{ color: '#ef4444', fontSize: 15, fontWeight: 'bold' }}>✕</span>
                    }
                  </span>
                )}
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
                background: loading ? 'rgba(99,102,241,0.5)' : '#6366f1',
                boxShadow:  loading ? 'none' : '0 4px 24px rgba(99,102,241,0.45)',
              }}
            >
              {loading
                ? <Loader2 size={16} className="animate-spin" />
                : <UserPlus size={15} />
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

          {/* Login link */}
          <p className="text-center text-sm" style={{ color: 'var(--text-muted)' }}>
            {l.hasAccount}{' '}
            <Link
              to="/login"
              className="font-semibold transition-colors hover:opacity-80"
              style={{ color: '#a5b4fc' }}
            >
              {l.login}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

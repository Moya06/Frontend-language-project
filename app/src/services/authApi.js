const RAW_API_URL = import.meta.env.VITE_API_URL || '/api/v1'
const API_BASE = RAW_API_URL.replace(/\/+$/, '')

function resolveAuthPayload(json) {
  const data = json?.data ?? json
  const user = data?.user ?? data?.profile ?? null
  const accessToken = data?.accessToken ?? data?.tokens?.accessToken ?? null
  const refreshToken = data?.refreshToken ?? data?.tokens?.refreshToken ?? null

  if (!user) {
    throw new Error('Respuesta de autenticacion invalida: falta user')
  }

  return {
    user,
    tokens: {
      accessToken,
      refreshToken,
    },
  }
}

async function request(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  let json = null
  try {
    json = await res.json()
  } catch {
    // ignore JSON parse failures and use fallback message below
  }

  if (!res.ok) {
    const msg = json?.message || json?.error || `HTTP ${res.status}`
    throw new Error(msg)
  }

  return json
}

export async function loginWithApi({ email, password }) {
  const json = await request('/auth/login', { email, password })
  return resolveAuthPayload(json)
}

export async function registerWithApi({ email, username, password, displayName }) {
  const json = await request('/auth/register', { email, username, password, displayName })
  return resolveAuthPayload(json)
}

export function persistTokens(tokens) {
  try {
    if (tokens?.accessToken) {
      localStorage.setItem('gl_access', tokens.accessToken)
    }
    if (tokens?.refreshToken) {
      localStorage.setItem('gl_refresh', tokens.refreshToken)
    }
  } catch {
    // localStorage may be unavailable
  }
}

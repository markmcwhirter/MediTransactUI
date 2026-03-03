import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)
const AUTH_STORAGE_KEY = 'meditransact.auth.claims'

function loadStoredClaims() {
  if (typeof window === 'undefined') {
    return null
  }

  const serializedClaims = window.sessionStorage.getItem(AUTH_STORAGE_KEY)
  if (!serializedClaims) {
    return null
  }

  try {
    const parsedClaims = JSON.parse(serializedClaims)
    if (parsedClaims?.exp && parsedClaims.exp * 1000 <= Date.now()) {
      window.sessionStorage.removeItem(AUTH_STORAGE_KEY)
      return null
    }

    return parsedClaims
  } catch {
    window.sessionStorage.removeItem(AUTH_STORAGE_KEY)
    return null
  }
}

function saveClaims(claims) {
  if (typeof window === 'undefined') {
    return
  }

  if (!claims) {
    window.sessionStorage.removeItem(AUTH_STORAGE_KEY)
    return
  }

  window.sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(claims))
}

function mockOidcAuthenticate({ username, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!username || !password) {
        reject(new Error('Username and password are required'))
        return
      }

      resolve({
        sub: '9bf0dc35-21f3-4f96-842c-7f9b9f1f18b8',
        preferred_username: username,
        name: 'Dr. Priya Patel',
        email: `${username}@meditransact.example`,
        role: 'provider',
        department: 'Family Medicine',
        groups: ['clinician', 'billing-reviewer'],
        iss: 'https://mock-oidc.meditransact.local',
        aud: 'meditransact-ui',
        exp: Math.floor(Date.now() / 1000) + 3600
      })
    }, 700)
  })
}

export function AuthProvider({ children }) {
  const [claims, setClaims] = useState(() => loadStoredClaims())

  const value = useMemo(
    () => ({
      claims,
      isAuthenticated: Boolean(claims),
      login: async (credentials) => {
        const nextClaims = await mockOidcAuthenticate(credentials)
        setClaims(nextClaims)
        saveClaims(nextClaims)
        return nextClaims
      },
      logout: () => {
        setClaims(null)
        saveClaims(null)
      }
    }),
    [claims]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}

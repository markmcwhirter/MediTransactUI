import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useState } from 'react'
import { AuthProvider, useAuth } from './AuthContext'

function AuthProbe() {
  const { isAuthenticated, claims, login, logout } = useAuth()
  const [error, setError] = useState('')

  return (
    <div>
      <p data-testid="auth-state">{isAuthenticated ? 'yes' : 'no'}</p>
      <p data-testid="claim-name">{claims?.name ?? ''}</p>
      <p data-testid="claim-username">{claims?.preferred_username ?? ''}</p>
      <p data-testid="error">{error}</p>
      <button
        type="button"
        onClick={async () => {
          try {
            await login({ username: 'jane.doe', password: 'secret' })
          } catch (nextError) {
            setError(nextError.message)
          }
        }}
      >
        login
      </button>
      <button
        type="button"
        onClick={async () => {
          try {
            await login({ username: '', password: '' })
          } catch (nextError) {
            setError(nextError.message)
          }
        }}
      >
        bad-login
      </button>
      <button type="button" onClick={logout}>logout</button>
    </div>
  )
}

describe('AuthProvider', () => {
  beforeEach(() => {
    window.sessionStorage.clear()
  })

  it('starts unauthenticated and logs in successfully', async () => {
    render(
      <AuthProvider>
        <AuthProbe />
      </AuthProvider>
    )

    expect(screen.getByTestId('auth-state')).toHaveTextContent('no')

    fireEvent.click(screen.getByRole('button', { name: 'login' }))

    await waitFor(() => {
      expect(screen.getByTestId('auth-state')).toHaveTextContent('yes')
    })

    expect(screen.getByTestId('claim-name')).toHaveTextContent('Dr. Priya Patel')
    expect(screen.getByTestId('claim-username')).toHaveTextContent('jane.doe')
  })

  it('rejects missing credentials', async () => {
    render(
      <AuthProvider>
        <AuthProbe />
      </AuthProvider>
    )

    fireEvent.click(screen.getByRole('button', { name: 'bad-login' }))

    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('Username and password are required')
    })
  })

  it('hydrates from sessionStorage and clears on logout', async () => {
    window.sessionStorage.setItem(
      'meditransact.auth.claims',
      JSON.stringify({
        name: 'Persisted User',
        preferred_username: 'persisted.user',
        exp: Math.floor(Date.now() / 1000) + 3600
      })
    )

    render(
      <AuthProvider>
        <AuthProbe />
      </AuthProvider>
    )

    expect(screen.getByTestId('auth-state')).toHaveTextContent('yes')
    expect(screen.getByTestId('claim-name')).toHaveTextContent('Persisted User')

    fireEvent.click(screen.getByRole('button', { name: 'logout' }))

    await waitFor(() => {
      expect(screen.getByTestId('auth-state')).toHaveTextContent('no')
    })
    expect(window.sessionStorage.getItem('meditransact.auth.claims')).toBeNull()
  })
})

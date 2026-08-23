import { useState } from 'react'
import { AuthContext } from './AuthContext'

const API_URL = import.meta.env.VITE_API_URL

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [token, setToken] = useState(() => localStorage.getItem('token'))

  async function login(email, password) {
    const res = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error || 'Error al iniciar sesión')
    }

    const receivedToken = data.sessionToken
    const receivedUser = data.user

    localStorage.setItem('token', receivedToken)
    localStorage.setItem('user', JSON.stringify(receivedUser))
    setToken(receivedToken)
    setUser(receivedUser)

    return receivedUser
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  function updateUser(newUserData) {
    const merged = { ...user, ...newUserData }
    localStorage.setItem('user', JSON.stringify(merged))
    setUser(merged)
  }

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isPremium: !!user?.premiumAccount,
    login,
    logout,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [userId, setUserId] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const storedRole = localStorage.getItem('role')
    const storedUserId = localStorage.getItem('userId')

    if (storedUser && storedRole) {
      setUser(JSON.parse(storedUser))
      setRole(storedRole)
      setUserId(storedUserId ? Number(storedUserId) : null)
    }

    setLoading(false)
  }, [])

  const login = (userData, userRole, id) => {
    setUser(userData)
    setRole(userRole)
    setUserId(id)
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('role', userRole)
    localStorage.setItem('userId', String(id))
  }

  const logout = () => {
    setUser(null)
    setRole(null)
    setUserId(null)
    localStorage.removeItem('user')
    localStorage.removeItem('role')
    localStorage.removeItem('userId')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        userId,
        login,
        logout,
        isAuthenticated: !!user,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { authApi } from '../../services/api'
import './Auth.css'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.role) {
      setError('Please select a role')
      return
    }

    if (!formData.email || !formData.password) {
      setError('Please enter email and password')
      return
    }

    setIsLoading(true)
    try {
      const response = await authApi.login(formData.email, formData.password)
      
      // Map backend role to frontend role
      const roleMap = {
        'ADMIN': 'admin',
        'STUDENT': 'student',
        'ACCOUNTS': 'accounts',
        'TCADMIN': 'tcadmin'
      }
      const frontendRole = roleMap[response.role] || formData.role

      login(
        { name: response.name, email: formData.email },
        frontendRole,
        response.userId
      )
      navigate(`/${frontendRole}/dashboard`)
    } catch (err) {
      setError(err.message || 'Invalid credentials')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-logo">🎓 Andaman College</h1>
          <p className="auth-subtitle">Academic Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <h2 className="auth-title">Login to Your Account</h2>

          {error && <div className="auth-error">{error}</div>}

          <div className="form-group">
            <label className="form-label">Select Role *</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select your role</option>
              <option value="student">Student</option>
              <option value="accounts">Accounts Staff</option>
              <option value="tcadmin">TC Admin</option>
              <option value="admin">System Admin</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Email *</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input type="checkbox" /> Remember me
            </label>
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          <div className="auth-footer">
            <a href="/forgot-password" className="auth-link">Forgot Password?</a>
          </div>
        </form>

        <div className="auth-demo">
          <p className="demo-title">Demo Users (create in DB first):</p>
          <ul className="demo-list">
            <li>Student: email: <strong>student@andaman.edu</strong>, pass: <strong>student123</strong></li>
            <li>Accounts: email: <strong>accounts@andaman.edu</strong>, pass: <strong>accounts123</strong></li>
            <li>TC Admin: email: <strong>tcadmin@andaman.edu</strong>, pass: <strong>tcadmin123</strong></li>
            <li>Admin: email: <strong>admin@andaman.edu</strong>, pass: <strong>admin123</strong></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Login

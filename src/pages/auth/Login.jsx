import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { mockUsers } from '../../data/mockData'
import './Auth.css'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.role) {
      setError('Please select a role')
      return
    }

    if (!formData.username || !formData.password) {
      setError('Please enter username and password')
      return
    }

    // Dummy authentication logic
    const userCredentials = mockUsers[formData.role]
    
    if (formData.username === userCredentials.username && formData.password === userCredentials.password) {
      login(userCredentials.data, formData.role)
      navigate(`/${formData.role}/dashboard`)
    } else {
      setError('Invalid credentials')
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
            <label className="form-label">Username *</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your username"
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

          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>

          <div className="auth-footer">
            <a href="/forgot-password" className="auth-link">Forgot Password?</a>
          </div>
        </form>

        <div className="auth-demo">
          <p className="demo-title">Demo Credentials:</p>
          <ul className="demo-list">
            <li>Student: username: <strong>student</strong>, password: <strong>student123</strong></li>
            <li>Accounts: username: <strong>accounts</strong>, password: <strong>accounts123</strong></li>
            <li>TC Admin: username: <strong>tcadmin</strong>, password: <strong>tcadmin123</strong></li>
            <li>Admin: username: <strong>admin</strong>, password: <strong>admin123</strong></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Login

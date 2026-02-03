import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Auth.css'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (email) {
      setMessage('Password reset link has been sent to your email address.')
      setEmail('')
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
          <h2 className="auth-title">Reset Password</h2>
          <p className="auth-description">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          {message && <div className="auth-success">{message}</div>}

          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="Enter your email address"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Send Reset Link
          </button>

          <div className="auth-footer">
            <Link to="/" className="auth-link">← Back to Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword

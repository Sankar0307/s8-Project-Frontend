import { useState, useEffect } from 'react'
import Card from '../../components/Card'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { dashboardApi } from '../../services/api'
import '../student/Student.css'

const StudentDashboard = () => {
  const { user, userId } = useAuth()
  const [dashData, setDashData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (userId) {
      dashboardApi.student(userId)
        .then(data => setDashData(data))
        .catch(err => console.error('Dashboard error:', err))
        .finally(() => setLoading(false))
    }
  }, [userId])

  if (loading) return <div className="page-container"><p>Loading dashboard...</p></div>
  if (!dashData) return <div className="page-container"><p>Unable to load dashboard data.</p></div>

  const profile = dashData.studentInfo || {}
  const payments = dashData.recentPayments || []
  const tcRequests = dashData.tcRequests || []

  const totalPaid = payments.filter(p => p.status === 'SUCCESS').reduce((s, p) => s + p.amount, 0)
  const pendingPayments = payments.filter(p => p.status === 'PENDING').length

  const latestTC = tcRequests.length > 0 ? tcRequests[tcRequests.length - 1] : null

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Welcome, {user?.name || profile.name}!</h2>
        <p className="page-subtitle">Here's your academic overview</p>
      </div>

      <div className="grid grid-cols-3">
        <Card title="Fees Paid" value={`₹${totalPaid.toLocaleString()}`} icon="✅" color="green" />
        <Card title="Pending Payments" value={pendingPayments} icon="⏰" color="orange" />
        <Card title="TC Requests" value={tcRequests.length} icon="📝" color="blue" />
      </div>

      <div className="grid grid-cols-2 mt-lg">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Profile Summary</h3>
          </div>
          <div className="profile-summary">
            <div className="profile-item">
              <span className="profile-label">Register Number:</span>
              <span className="profile-value">{profile.registerNumber}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">Department:</span>
              <span className="profile-value">{profile.department}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">Year:</span>
              <span className="profile-value">{profile.year}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">Email:</span>
              <span className="profile-value">{profile.email}</span>
            </div>
          </div>
          <Link to="/student/profile" className="btn btn-primary btn-sm mt-md">
            View Full Profile
          </Link>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Transfer Certificate Status</h3>
          </div>
          {latestTC ? (
            <div className="tc-status-card">
              <div className="status-badge-container">
                <span className={`badge badge-${latestTC.status === 'APPROVED' ? 'success' : latestTC.status === 'PENDING' ? 'warning' : 'danger'}`}>
                  {latestTC.status}
                </span>
              </div>
              <p className="tc-reason">{latestTC.reason}</p>
              <div className="tc-dates">
                <small className="text-gray">Applied: {latestTC.appliedDate}</small>
              </div>
            </div>
          ) : (
            <p className="text-gray" style={{padding: '20px'}}>No TC requests yet.</p>
          )}
          <Link to="/student/tc-status" className="btn btn-primary btn-sm mt-md">
            View TC Status
          </Link>
        </div>
      </div>

      <div className="card mt-lg">
        <div className="card-header">
          <h3 className="card-title">Quick Actions</h3>
        </div>
        <div className="quick-actions">
          <Link to="/student/payment" className="action-btn">
            <span className="action-icon">💳</span>
            <span>Pay Fees</span>
          </Link>
          <Link to="/student/fee-details" className="action-btn">
            <span className="action-icon">📊</span>
            <span>Fee Details</span>
          </Link>
          <Link to="/student/payment-history" className="action-btn">
            <span className="action-icon">📜</span>
            <span>Payment History</span>
          </Link>
          <Link to="/student/apply-tc" className="action-btn">
            <span className="action-icon">📝</span>
            <span>Apply TC</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard

import Card from '../../components/Card'
import { studentData } from '../../data/mockData'
import { Link } from 'react-router-dom'
import '../student/Student.css'

const StudentDashboard = () => {
  const { profile, feeDetails, tcRequest } = studentData

  // Calculate fee stats
  const totalFees = feeDetails.reduce((sum, fee) => sum + fee.amount, 0)
  const totalPaid = feeDetails.reduce((sum, fee) => sum + fee.paid, 0)
  const totalDue = feeDetails.reduce((sum, fee) => sum + fee.due, 0)

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Welcome, {profile.name}!</h2>
        <p className="page-subtitle">Here's your academic overview</p>
      </div>

      <div className="grid grid-cols-3">
        <Card
          title="Total Fees"
          value={`₹${totalFees.toLocaleString()}`}
          icon="💰"
          color="blue"
        />
        <Card
          title="Fees Paid"
          value={`₹${totalPaid.toLocaleString()}`}
          icon="✅"
          color="green"
        />
        <Card
          title="Fees Due"
          value={`₹${totalDue.toLocaleString()}`}
          icon="⏰"
          color="orange"
        />
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
          <div className="tc-status-card">
            <div className="status-badge-container">
              <span className={`badge badge-${tcRequest.status === 'Approved' ? 'success' : tcRequest.status === 'Pending' ? 'warning' : 'danger'}`}>
                {tcRequest.status}
              </span>
            </div>
            <p className="tc-reason">{tcRequest.reason}</p>
            <div className="tc-dates">
              <small className="text-gray">Applied: {tcRequest.appliedDate}</small>
              {tcRequest.status === 'Approved' && (
                <small className="text-gray">Approved: {tcRequest.approvedDate}</small>
              )}
            </div>
          </div>
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

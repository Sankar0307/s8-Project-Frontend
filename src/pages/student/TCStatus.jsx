import { studentData } from '../../data/mockData'
import './Student.css'

const TCStatus = () => {
  const { tcRequest, profile } = studentData

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Transfer Certificate Status</h2>
        <p className="page-subtitle">Track your TC request status</p>
      </div>

      <div className="card" style={{ maxWidth: '700px' }}>
        <div className="card-header">
          <h3 className="card-title">TC Request Details</h3>
        </div>
        
        <div className="tc-status-details">
          <div className="status-row">
            <span className="status-label">Status:</span>
            <span className={`badge badge-${tcRequest.status === 'Approved' ? 'success' : tcRequest.status === 'Pending' ? 'warning' : 'danger'}`}>
              {tcRequest.status}
            </span>
          </div>

          <div className="status-row">
            <span className="status-label">Student Name:</span>
            <span>{profile.name}</span>
          </div>

          <div className="status-row">
            <span className="status-label">Register Number:</span>
            <span>{profile.registerNumber}</span>
          </div>

          <div className="status-row">
            <span className="status-label">Department:</span>
            <span>{profile.department}</span>
          </div>

          <div className="status-row">
            <span className="status-label">Applied Date:</span>
            <span>{tcRequest.appliedDate}</span>
          </div>

          <div className="status-row">
            <span className="status-label">Reason:</span>
            <span>{tcRequest.reason}</span>
          </div>

          {tcRequest.status === 'Approved' && (
            <>
              <div className="status-row">
                <span className="status-label">Approved Date:</span>
                <span>{tcRequest.approvedDate}</span>
              </div>
              <div className="status-row">
                <span className="status-label">Remarks:</span>
                <span>{tcRequest.remarks}</span>
              </div>
            </>
          )}
        </div>

        {tcRequest.status === 'Approved' && (
          <div className="mt-lg">
            <a href="/student/download-tc" className="btn btn-success btn-block">
              Download Transfer Certificate
            </a>
          </div>
        )}

        {tcRequest.status === 'Pending' && (
          <div className="alert alert-info mt-lg">
            ℹ️ Your TC request is being processed. You will be notified once it's approved.
          </div>
        )}
      </div>
    </div>
  )
}

export default TCStatus

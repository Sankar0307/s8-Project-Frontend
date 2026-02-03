import { useState } from 'react'
import FormInput from '../../components/FormInput'
import { tcData } from '../../data/mockData'
import './TCAdmin.css'

const ApproveTCRequest = () => {
  const pendingRequest = tcData.tcRequests.find(r => r.status === 'Pending')
  const [remarks, setRemarks] = useState('')
  const [success, setSuccess] = useState('')

  const handleApprove = () => {
    if (confirm(`Approve TC request for ${pendingRequest?.name}?`)) {
      setSuccess('approved')
      setTimeout(() => setSuccess(''), 3000)
    }
  }

  const handleReject = () => {
    if (!remarks) {
      alert('Please provide remarks for rejection')
      return
    }
    if (confirm(`Reject TC request for ${pendingRequest?.name}?`)) {
      setSuccess('rejected')
      setTimeout(() => setSuccess(''), 3000)
    }
  }

  if (!pendingRequest) {
    return (
      <div className="page-container">
        <div className="page-header">
          <h2 className="page-title">Approve/Reject TC Request</h2>
        </div>
        <div className="alert alert-info">
          ℹ️ No pending TC requests to review.
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Approve/Reject TC Request</h2>
        <p className="page-subtitle">Review and take action on TC requests</p>
      </div>

      {success && (
        <div className={`alert alert-${success === 'approved' ? 'success' : 'danger'}`}>
          {success === 'approved' 
            ? `✅ TC request approved for ${pendingRequest.name}!`
            : `❌ TC request rejected for ${pendingRequest.name}!`
          }
        </div>
      )}

      <div className="grid grid-cols-2">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Student Details</h3>
          </div>
          
          <div className="tc-status-details">
            <div className="status-row">
              <span className="status-label">Name:</span>
              <span>{pendingRequest.name}</span>
            </div>
            <div className="status-row">
              <span className="status-label">Register No:</span>
              <span>{pendingRequest.registerNo}</span>
            </div>
            <div className="status-row">
              <span className="status-label">Department:</span>
              <span>{pendingRequest.department}</span>
            </div>
            <div className="status-row">
              <span className="status-label">Year:</span>
              <span>{pendingRequest.year}</span>
            </div>
            <div className="status-row">
              <span className="status-label">Applied Date:</span>
              <span>{pendingRequest.appliedDate}</span>
            </div>
            <div className="status-row">
              <span className="status-label">Status:</span>
              <span className="badge badge-warning">{pendingRequest.status}</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Request Details</h3>
          </div>
          
          <div className="request-details">
            <div className="detail-section">
              <label className="field-label">Reason for TC:</label>
              <p className="detail-text">{pendingRequest.reason}</p>
            </div>

            <FormInput
              label="Remarks (Required for Rejection)"
              type="textarea"
              name="remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter remarks..."
              rows={4}
            />

            <div className="action-buttons">
              <button onClick={handleApprove} className="btn btn-success flex-1">
                ✅ Approve Request
              </button>
              <button onClick={handleReject} className="btn btn-danger flex-1">
                ❌ Reject Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApproveTCRequest

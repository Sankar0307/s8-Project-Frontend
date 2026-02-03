import { useState } from 'react'
import { tcData } from '../../data/mockData'
import FormInput from '../../components/FormInput'
import './TCAdmin.css'

const ApproveBonafide = () => {
  // Get a pending request as example
  const pendingRequest = tcData.bonafideRequests.find(req => req.status === 'Pending') || tcData.bonafideRequests[0]
  
  const [remarks, setRemarks] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [actionType, setActionType] = useState('')

  const handleApprove = () => {
    setActionType('approved')
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      setRemarks('')
    }, 3000)
  }

  const handleReject = () => {
    if (!remarks.trim()) {
      alert('Please provide remarks for rejection')
      return
    }
    setActionType('rejected')
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      setRemarks('')
    }, 3000)
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Approve / Reject Bonafide Request</h2>
        <p className="page-subtitle">Review and process bonafide certificate request</p>
      </div>

      {showSuccess && (
        <div className={`alert alert-${actionType === 'approved' ? 'success' : 'danger'}`}>
          {actionType === 'approved' 
            ? '✅ Bonafide request approved successfully!' 
            : '❌ Bonafide request rejected.'}
        </div>
      )}

      <div className="grid grid-cols-2" style={{ gap: 'var(--spacing-lg)' }}>
        {/* Student Details Section */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Student Details</h3>
          </div>
          
          <div className="profile-summary">
            <div className="profile-item">
              <span className="profile-label">Name:</span>
              <span className="profile-value">{pendingRequest.name}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">Register No:</span>
              <span className="profile-value">{pendingRequest.registerNo}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">Department:</span>
              <span className="profile-value">{pendingRequest.department}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">Year:</span>
              <span className="profile-value">{pendingRequest.year}</span>
            </div>
          </div>
        </div>

        {/* Request Details Section */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Request Details</h3>
          </div>
          
          <div className="profile-summary">
            <div className="profile-item">
              <span className="profile-label">Applied Date:</span>
              <span className="profile-value">{pendingRequest.appliedDate}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">Bonafide Type:</span>
              <span className="profile-value">{pendingRequest.bonafideType}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">Reason:</span>
              <span className="profile-value">{pendingRequest.reason}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">Current Status:</span>
              <span className={`badge badge-${pendingRequest.status === 'Approved' ? 'success' : pendingRequest.status === 'Pending' ? 'warning' : 'danger'}`}>
                {pendingRequest.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Section */}
      <div className="card mt-lg">
        <div className="card-header">
          <h3 className="card-title">Action</h3>
        </div>

        <FormInput
          label="Remarks (Required for rejection)"
          type="textarea"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="Enter remarks or reason for your decision..."
          rows={4}
        />

        <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-lg)' }}>
          <button onClick={handleApprove} className="btn btn-success" style={{ flex: 1 }}>
            ✅ Approve
          </button>
          <button onClick={handleReject} className="btn btn-danger" style={{ flex: 1 }}>
            ❌ Reject
          </button>
        </div>
      </div>
    </div>
  )
}

export default ApproveBonafide

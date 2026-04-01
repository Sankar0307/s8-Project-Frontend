import { useState, useEffect } from 'react'
import FormInput from '../../components/FormInput'
import { tcApi } from '../../services/api'
import './TCAdmin.css'

const ApproveTCRequest = () => {
  const [pendingRequests, setPendingRequests] = useState([])
  const [currentRequest, setCurrentRequest] = useState(null)
  const [remarks, setRemarks] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(true)

  const loadRequests = () => {
    tcApi.getAllRequests()
      .then(data => {
        const pending = data.filter(r => r.status === 'PENDING')
        setPendingRequests(pending)
        setCurrentRequest(pending.length > 0 ? pending[0] : null)
      })
      .catch(err => console.error('Load error:', err))
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadRequests() }, [])

  const handleApprove = async () => {
    if (!currentRequest) return
    if (confirm(`Approve TC request #${currentRequest.id}?`)) {
      try {
        await tcApi.approve(currentRequest.id)
        setSuccess('approved')
        setTimeout(() => { setSuccess(''); loadRequests() }, 2000)
      } catch (err) {
        alert('Failed to approve: ' + err.message)
      }
    }
  }

  const handleReject = async () => {
    if (!currentRequest) return
    if (!remarks) {
      alert('Please provide remarks for rejection')
      return
    }
    if (confirm(`Reject TC request #${currentRequest.id}?`)) {
      try {
        await tcApi.reject(currentRequest.id, remarks)
        setSuccess('rejected')
        setRemarks('')
        setTimeout(() => { setSuccess(''); loadRequests() }, 2000)
      } catch (err) {
        alert('Failed to reject: ' + err.message)
      }
    }
  }

  if (loading) return <div className="page-container"><p>Loading requests...</p></div>

  if (!currentRequest) {
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
        <p className="page-subtitle">Review and take action on TC requests ({pendingRequests.length} pending)</p>
      </div>

      {success && (
        <div className={`alert alert-${success === 'approved' ? 'success' : 'danger'}`}>
          {success === 'approved' 
            ? `✅ TC request #${currentRequest.id} approved!`
            : `❌ TC request #${currentRequest.id} rejected!`
          }
        </div>
      )}

      <div className="grid grid-cols-2">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Request Details</h3>
          </div>
          <div className="tc-status-details">
            <div className="status-row">
              <span className="status-label">Request ID:</span>
              <span>{currentRequest.id}</span>
            </div>
            <div className="status-row">
              <span className="status-label">Student ID:</span>
              <span>{currentRequest.studentId}</span>
            </div>
            <div className="status-row">
              <span className="status-label">Applied Date:</span>
              <span>{currentRequest.appliedDate}</span>
            </div>
            <div className="status-row">
              <span className="status-label">Status:</span>
              <span className="badge badge-warning">{currentRequest.status}</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Take Action</h3>
          </div>
          <div className="request-details">
            <div className="detail-section">
              <label className="field-label">Reason for TC:</label>
              <p className="detail-text">{currentRequest.reason}</p>
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

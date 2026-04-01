import { useState, useEffect } from 'react'
import { bonafideApi } from '../../services/api'
import './TCAdmin.css'

const ApproveBonafide = () => {
  const [pendingRequests, setPendingRequests] = useState([])
  const [currentRequest, setCurrentRequest] = useState(null)
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(true)

  const loadRequests = () => {
    bonafideApi.getAll()
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
    if (confirm(`Approve bonafide request #${currentRequest.id}?`)) {
      try {
        await bonafideApi.approve(currentRequest.id)
        setSuccess('approved')
        setTimeout(() => { setSuccess(''); loadRequests() }, 2000)
      } catch (err) {
        alert('Failed to approve: ' + err.message)
      }
    }
  }

  if (loading) return <div className="page-container"><p>Loading requests...</p></div>

  if (!currentRequest) {
    return (
      <div className="page-container">
        <div className="page-header">
          <h2 className="page-title">Approve Bonafide Request</h2>
        </div>
        <div className="alert alert-info">
          ℹ️ No pending bonafide requests to review.
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Approve Bonafide Request</h2>
        <p className="page-subtitle">{pendingRequests.length} pending requests</p>
      </div>

      {success && (
        <div className="alert alert-success">
          ✅ Bonafide request #{currentRequest.id} approved!
        </div>
      )}

      <div className="card" style={{ maxWidth: '600px' }}>
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
            <span className="status-label">Reason:</span>
            <span>{currentRequest.reason}</span>
          </div>
          <div className="status-row">
            <span className="status-label">Status:</span>
            <span className="badge badge-warning">{currentRequest.status}</span>
          </div>
        </div>

        <div className="action-buttons" style={{marginTop: '20px'}}>
          <button onClick={handleApprove} className="btn btn-success flex-1">
            ✅ Approve Bonafide
          </button>
        </div>
      </div>
    </div>
  )
}

export default ApproveBonafide

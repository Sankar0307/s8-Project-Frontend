import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { tcApi } from '../../services/api'
import './Student.css'

const TCStatus = () => {
  const { userId, user } = useAuth()
  const [tcRequests, setTcRequests] = useState([])
  const [issued, setIssued] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return
    Promise.all([
      tcApi.getStatus(userId).then(data => (Array.isArray(data) ? data : [])),
      tcApi.getIssuedTc(userId).catch(() => null)
    ])
      .then(([reqs, issuedCert]) => {
        setTcRequests(reqs)
        setIssued(issuedCert)
      })
      .catch(err => console.error('TC status error:', err))
      .finally(() => setLoading(false))
  }, [userId])

  if (loading) return <div className="page-container"><p>Loading TC status...</p></div>

  const badgeClass = (status) => {
    if (status === 'APPROVED') return 'badge-success'
    if (status === 'PENDING')  return 'badge-warning'
    return 'badge-danger'
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Transfer Certificate Status</h2>
        <p className="page-subtitle">Track your TC request status</p>
      </div>

      {tcRequests.length === 0 ? (
        <div className="alert alert-info">No TC requests found. Apply for a TC first.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
          {tcRequests.map((req, idx) => (
            <div className="card" key={req.id} style={{ maxWidth: '700px' }}>
              <div className="card-header">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 className="card-title">
                    {idx === 0 ? 'Latest Request' : `Request #${idx + 1}`}
                  </h3>
                  <span className={`badge ${badgeClass(req.status)}`}>{req.status}</span>
                </div>
              </div>

              <div className="tc-status-details">
                <div className="status-row">
                  <span className="status-label">Student Name:</span>
                  <span>{user?.name}</span>
                </div>
                <div className="status-row">
                  <span className="status-label">Applied Date:</span>
                  <span>{req.appliedDate}</span>
                </div>
                <div className="status-row">
                  <span className="status-label">Reason:</span>
                  <span>{req.reason}</span>
                </div>
                {req.remarks && (
                  <div className="status-row">
                    <span className="status-label">Remarks:</span>
                    <span>{req.remarks}</span>
                  </div>
                )}
              </div>

              {req.status === 'APPROVED' && issued && (
                <div className="mt-lg" style={{ padding: '0 0 8px 0' }}>
                  <p className="text-gray" style={{ fontSize: '13px', marginBottom: '8px' }}>
                    TC issued: <strong>{issued.tcNumber}</strong>
                    {issued.issueDate && <> · {issued.issueDate}</>}
                  </p>
                  <a href="/student/download-tc" className="btn btn-success btn-block">
                    Download Transfer Certificate
                  </a>
                </div>
              )}

              {req.status === 'APPROVED' && !issued && (
                <div className="alert alert-info mt-lg">
                  Approved — waiting for the TC office to generate and issue your certificate. Download will appear here after issue.
                </div>
              )}

              {req.status === 'PENDING' && (
                <div className="alert alert-info mt-lg">
                  Your TC request is being processed.
                </div>
              )}

              {req.status === 'REJECTED' && (
                <div className="alert alert-danger mt-lg">
                  This request was rejected. You may <a href="/student/apply-tc">apply again</a>.
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TCStatus

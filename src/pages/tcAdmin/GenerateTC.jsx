import { useState, useEffect } from 'react'
import { tcApi, studentApi } from '../../services/api'
import './TCAdmin.css'

const GenerateTC = () => {
  const [approvedRequests, setApprovedRequests] = useState([])
  const [students, setStudents] = useState({}) // id → student map
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(null) // requestId being generated
  const [generated, setGenerated] = useState({})  // requestId → tcNumber (already issued)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState(null)  // selected request for preview

  const loadRequests = async () => {
    setLoading(true)
    setError('')
    try {
      const [all, allStudents] = await Promise.all([
        tcApi.getAllRequests(),
        studentApi.getAll()
      ])
      const approved = all.filter(r => r.status === 'APPROVED')
      setApprovedRequests(approved)

      // Build student lookup map
      const map = {}
      allStudents.forEach(s => { map[s.id] = s })
      setStudents(map)

      // Auto-select first if none selected
      if (approved.length > 0 && !selected) {
        setSelected(approved[0])
      }
    } catch (err) {
      setError('Failed to load TC requests: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadRequests() }, [])

  const handleGenerate = async (request) => {
    setGenerating(request.id)
    setError('')
    try {
      const tc = await tcApi.generate(request.id)
      setGenerated(prev => ({ ...prev, [request.id]: tc.tcNumber }))
      // Refresh list
      await loadRequests()
    } catch (err) {
      setError('Failed to generate TC: ' + err.message)
    } finally {
      setGenerating(null)
    }
  }

  if (loading) return <div className="page-container"><p>Loading approved requests...</p></div>

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Generate Transfer Certificate</h2>
        <p className="page-subtitle">Select an approved request to preview and issue TC</p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {approvedRequests.length === 0 ? (
        <div className="alert alert-info">ℹ️ No approved TC requests to generate.</div>
      ) : (
        <div className="grid grid-cols-2" style={{ gap: 'var(--spacing-lg)', alignItems: 'flex-start' }}>

          {/* LEFT: List of approved requests */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Approved Requests ({approvedRequests.length})</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '12px' }}>
              {approvedRequests.map(req => {
                const student = students[req.studentId]
                const isGenerated = !!generated[req.id]
                const isActive = selected?.id === req.id
                return (
                  <div
                    key={req.id}
                    onClick={() => setSelected(req)}
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      border: `2px solid ${isActive ? 'var(--primary-500, #3b82f6)' : 'var(--gray-200, #e5e7eb)'}`,
                      background: isActive ? 'var(--primary-50, #eff6ff)' : 'white',
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <strong>{student?.name || `Student #${req.studentId}`}</strong>
                        <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '2px' }}>
                          {student?.department} · {student?.registerNumber || `ID: ${req.studentId}`}
                        </div>
                        <div style={{ fontSize: '12px', color: '#9ca3af' }}>Applied: {req.appliedDate}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        {isGenerated ? (
                          <span className="badge badge-success">✓ Issued</span>
                        ) : (
                          <button
                            className="btn btn-success btn-sm"
                            disabled={generating === req.id}
                            onClick={(e) => { e.stopPropagation(); handleGenerate(req) }}
                          >
                            {generating === req.id ? '⏳' : '✅ Generate'}
                          </button>
                        )}
                      </div>
                    </div>
                    {isGenerated && (
                      <div style={{ marginTop: '6px', fontSize: '12px', color: '#059669' }}>
                        TC#: {generated[req.id]}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* RIGHT: Preview of selected request */}
          {selected && (
            <div className="card" style={{ maxWidth: '600px' }}>
              <div className="card-header">
                <h3 className="card-title">TC Preview</h3>
              </div>

              <div className="tc-preview">
                <div className="tc-header">
                  <h2>🎓 ANDAMAN COLLEGE</h2>
                  <p>Port Blair, Andaman &amp; Nicobar Islands</p>
                  <h3 style={{ marginTop: '20px' }}>TRANSFER CERTIFICATE</h3>
                </div>

                <div className="tc-content">
                  <p>This is to certify that{' '}
                    <strong>{students[selected.studentId]?.name || `Student #${selected.studentId}`}</strong>{' '}
                    was a bonafide student of this institution.
                  </p>

                  <div className="tc-details">
                    <div className="tc-detail-row">
                      <span>Student Name:</span>
                      <span>{students[selected.studentId]?.name || '—'}</span>
                    </div>
                    <div className="tc-detail-row">
                      <span>Register Number:</span>
                      <span>{students[selected.studentId]?.registerNumber || `ID: ${selected.studentId}`}</span>
                    </div>
                    <div className="tc-detail-row">
                      <span>Department:</span>
                      <span>{students[selected.studentId]?.department || '—'}</span>
                    </div>
                    <div className="tc-detail-row">
                      <span>Request ID:</span>
                      <span>{selected.id}</span>
                    </div>
                    <div className="tc-detail-row">
                      <span>Applied Date:</span>
                      <span>{selected.appliedDate}</span>
                    </div>
                    <div className="tc-detail-row">
                      <span>Reason for Leaving:</span>
                      <span>{selected.reason}</span>
                    </div>
                    <div className="tc-detail-row">
                      <span>Date of Issue:</span>
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="tc-detail-row">
                      <span>Conduct:</span>
                      <span>Good</span>
                    </div>
                    <div className="tc-detail-row">
                      <span>Fee Status:</span>
                      <span>All Dues Cleared</span>
                    </div>
                  </div>

                  <p style={{ marginTop: '30px' }}>
                    The student has fulfilled all academic requirements and is free to seek admission elsewhere.
                  </p>

                  <div className="tc-footer">
                    <div className="flex justify-between" style={{ marginTop: '40px' }}>
                      <div>
                        <p>___________________</p>
                        <p>HOD Signature</p>
                      </div>
                      <div>
                        <p>___________________</p>
                        <p>Principal's Signature</p>
                        <p><small>Date: {new Date().toLocaleDateString()}</small></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-md mt-lg" style={{ padding: '0 0 12px 0' }}>
                {generated[selected.id] ? (
                  <div className="alert alert-success" style={{ flex: 1 }}>
                    ✅ TC issued! TC Number: <strong>{generated[selected.id]}</strong>
                  </div>
                ) : (
                  <button
                    onClick={() => handleGenerate(selected)}
                    className="btn btn-success flex-1"
                    disabled={generating === selected.id}
                  >
                    {generating === selected.id ? '⏳ Generating...' : '✅ Generate & Issue TC'}
                  </button>
                )}
                <button onClick={() => window.print()} className="btn btn-secondary flex-1">
                  🖨️ Print Preview
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default GenerateTC

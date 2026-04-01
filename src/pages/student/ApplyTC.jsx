import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { tcApi } from '../../services/api'
import FormInput from '../../components/FormInput'
import './Student.css'

const ApplyTC = () => {
  const { userId } = useAuth()
  const [student, setStudent] = useState(null)
  const [existingRequests, setExistingRequests] = useState([])
  const [formData, setFormData] = useState({ reason: '', preferredDate: '' })
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return
    Promise.all([
      tcApi.getStudentProfile(userId).catch(() => null),
      tcApi.getStatus(userId).catch(() => [])
    ]).then(([s, reqs]) => {
      setStudent(s)
      setExistingRequests(Array.isArray(reqs) ? reqs : [])
    }).finally(() => setLoading(false))
  }, [userId])

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await tcApi.apply({
        studentId: student?.id,
        reason: formData.reason,
        appliedDate: formData.preferredDate || new Date().toISOString().split('T')[0]
      })
      setSuccess(true)
      // Refresh existing requests
      const reqs = await tcApi.getStatus(userId).catch(() => [])
      setExistingRequests(Array.isArray(reqs) ? reqs : [])
      setTimeout(() => {
        setSuccess(false)
        setFormData({ reason: '', preferredDate: '' })
      }, 3000)
    } catch (err) {
      setError(err.message || 'Failed to submit TC request')
    }
  }

  if (loading) return <div className="page-container"><p>Loading...</p></div>

  const isFinalYear = student?.year === 4
  const activeRequest = existingRequests.find(r => r.status === 'PENDING' || r.status === 'APPROVED')
  const canApply = !!student && isFinalYear && !activeRequest

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Apply for Transfer Certificate</h2>
        <p className="page-subtitle">Submit your TC request with reason</p>
      </div>

      {success && (
        <div className="alert alert-success">
          ✅ TC request submitted successfully! You will be notified once it's processed.
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {!student && (
        <div className="alert alert-warning">
          Unable to load your student profile. Please contact admin to link your login and student record.
        </div>
      )}

      {/* Block: not final year */}
      {!isFinalYear && (
        <div className="alert alert-danger">
          ❌ TC applications are only for <strong>4th year (final year)</strong> students.
          Your current year: <strong>{student?.year ?? 'Unknown'}</strong>.
        </div>
      )}

      {/* Block: active request */}
      {isFinalYear && activeRequest && (
        <div className={`alert ${activeRequest.status === 'APPROVED' ? 'alert-success' : 'alert-info'}`}>
          {activeRequest.status === 'APPROVED'
            ? <>✅ Your TC request is <strong>APPROVED</strong>. After the TC office <strong>issues</strong> your certificate, <a href="/student/download-tc">download your TC</a>.</>
            : <>⏳ You already have a <strong>PENDING</strong> TC request (submitted {activeRequest.appliedDate}). Please wait for the admin to process it.</>
          }
        </div>
      )}

      {/* Application form — only shown if eligible */}
      {canApply && !success && (
        <div className="card" style={{ maxWidth: '600px' }}>
          <div className="card-header">
            <h3 className="card-title">TC Application Form</h3>
          </div>

          <form onSubmit={handleSubmit}>
            <FormInput
              label="Reason for TC"
              type="textarea"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Enter reason for requesting transfer certificate..."
              rows={5}
              required
            />
            <FormInput
              label="Preferred Date"
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              required
            />
            <div className="alert alert-info mt-md">
              ℹ️ Please ensure all your fees are cleared before applying for TC.
            </div>
            <button type="submit" className="btn btn-primary btn-block mt-lg">
              Submit Request
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default ApplyTC

import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { bonafideApi } from '../../services/api'
import FormInput from '../../components/FormInput'
import './Student.css'

const ApplyBonafide = () => {
  const { user, userId } = useAuth()
  const [formData, setFormData] = useState({
    reason: '',
    bonafideType: 'With Fee Structure'
  })
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await bonafideApi.apply({
        studentId: userId,
        reason: formData.reason + ' (' + formData.bonafideType + ')',
        appliedDate: new Date().toISOString().split('T')[0]
      })
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        setFormData({ reason: '', bonafideType: 'With Fee Structure' })
      }, 3000)
    } catch (err) {
      setError(err.message || 'Failed to submit bonafide request')
    }
  }

  const handleReset = () => {
    setFormData({ reason: '', bonafideType: 'With Fee Structure' })
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Apply for Bonafide Certificate</h2>
        <p className="page-subtitle">Submit your bonafide request</p>
      </div>

      {success && (
        <div className="alert alert-success">
          ✅ Bonafide request submitted successfully!
        </div>
      )}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card" style={{ maxWidth: '700px' }}>
        <div className="card-header">
          <h3 className="card-title">Bonafide Application Form</h3>
        </div>
        
        <form onSubmit={handleSubmit}>
          <FormInput label="Student Name" type="text" value={user?.name || ''} disabled readOnly />

          <FormInput
            label="Reason for Bonafide"
            type="textarea"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Enter reason for requesting bonafide certificate..."
            rows={5}
            required
          />

          <div className="form-group">
            <label className="form-label">Bonafide Type</label>
            <div style={{ display: 'flex', gap: 'var(--spacing-lg)', marginTop: 'var(--spacing-sm)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="bonafideType"
                  value="With Fee Structure"
                  checked={formData.bonafideType === 'With Fee Structure'}
                  onChange={handleChange}
                  style={{ cursor: 'pointer' }}
                />
                <span>Bonafide with Fee Structure</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="bonafideType"
                  value="Without Fee Structure"
                  checked={formData.bonafideType === 'Without Fee Structure'}
                  onChange={handleChange}
                  style={{ cursor: 'pointer' }}
                />
                <span>Bonafide without Fee Structure</span>
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-lg)' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              Submit Request
            </button>
            <button type="button" onClick={handleReset} className="btn btn-secondary" style={{ flex: 1 }}>
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ApplyBonafide

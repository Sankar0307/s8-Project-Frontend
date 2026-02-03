import { useState } from 'react'
import FormInput from '../../components/FormInput'
import './Student.css'

const ApplyTC = () => {
  const [formData, setFormData] = useState({
    reason: '',
    preferredDate: ''
  })
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
      setFormData({ reason: '', preferredDate: '' })
    }, 3000)
  }

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
    </div>
  )
}

export default ApplyTC

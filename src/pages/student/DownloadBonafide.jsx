import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { studentApi, bonafideApi } from '../../services/api'
import './Student.css'

const DownloadBonafide = () => {
  const { userId } = useAuth()
  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (userId) {
      studentApi.getById(userId)
        .then(data => setStudent(data))
        .catch(() => setError('Failed to load student profile'))
        .finally(() => setLoading(false))
    }
  }, [userId])

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = async () => {
    if (!student) return
    setDownloading(true)
    setError('')
    try {
      const url = bonafideApi.download(student.id)
      const response = await fetch(url)
      if (!response.ok) {
        const msg = await response.text().catch(() => 'Download failed')
        throw new Error(msg || `Server returned ${response.status}`)
      }
      const blob = await response.blob()
      const objectUrl = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = objectUrl
      a.download = `bonafide_${student.name || student.id}.pdf`
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(objectUrl)
    } catch (err) {
      setError(err.message || 'Failed to download PDF')
    } finally {
      setDownloading(false)
    }
  }

  if (loading) return <div className="page-container"><p>Loading...</p></div>

  const profile = student || {}
  const academicYear = `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Download Bonafide Certificate</h2>
        <p className="page-subtitle">Print or download your bonafide certificate</p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div style={{ marginBottom: 'var(--spacing-lg)', display: 'flex', gap: 'var(--spacing-md)' }}>
        <button onClick={handlePrint} className="btn btn-primary">
          🖨️ Print Preview
        </button>
        <button onClick={handleDownload} className="btn btn-success" disabled={downloading || !student}>
          {downloading ? '⏳ Generating PDF...' : '📥 Download PDF'}
        </button>
      </div>

      <div className="card tc-preview">
        <div className="tc-header">
          <h2>🎓 ANDAMAN COLLEGE</h2>
          <p>Port Blair, Andaman and Nicobar Islands</p>
          <p style={{ fontSize: 'var(--font-size-sm)' }}>Affiliated to Andaman University</p>
          <h3 style={{ marginTop: 'var(--spacing-lg)' }}>BONAFIDE CERTIFICATE</h3>
        </div>

        <div className="tc-content">
          <p style={{ marginBottom: 'var(--spacing-lg)', lineHeight: 1.8 }}>
            This is to certify that <strong>{profile.name || 'N/A'}</strong>, bearing Register Number{' '}
            <strong>{profile.registerNumber || String(profile.id || '')}</strong>, is a bonafide student of this institution,
            currently pursuing <strong>{profile.year ? `${profile.year}${['st','nd','rd'][profile.year - 1] || 'th'} Year` : 'N/A'}</strong> in the Department of{' '}
            <strong>{profile.department || 'N/A'}</strong> for the Academic Year{' '}
            <strong>{academicYear}</strong>.
          </p>

          <div className="tc-details">
            <div className="tc-detail-row">
              <strong>Student Name:</strong>
              <span>{profile.name || 'N/A'}</span>
            </div>
            <div className="tc-detail-row">
              <strong>Register Number:</strong>
              <span>{profile.registerNumber || String(profile.id || '')}</span>
            </div>
            <div className="tc-detail-row">
              <strong>Department:</strong>
              <span>{profile.department || 'N/A'}</span>
            </div>
            <div className="tc-detail-row">
              <strong>Academic Year:</strong>
              <span>{academicYear}</span>
            </div>
            <div className="tc-detail-row">
              <strong>Current Year:</strong>
              <span>{profile.year ? `Year ${profile.year}` : 'N/A'}</span>
            </div>
          </div>

          <div className="tc-footer">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <p style={{ marginBottom: 'var(--spacing-sm)' }}>
                  <strong>Date:</strong> {new Date().toLocaleDateString('en-IN')}
                </p>
              </div>
              <div className="signature-section">
                <p style={{ marginBottom: 'var(--spacing-xl)' }}></p>
                <p style={{ borderTop: '2px solid var(--gray-900)', paddingTop: 'var(--spacing-xs)', minWidth: '200px' }}>
                  <strong>Principal</strong>
                </p>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-600)' }}>
                  Andaman College
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DownloadBonafide

import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { tcApi } from '../../services/api'
import './Student.css'

const DownloadTC = () => {
  const { userId } = useAuth()
  const [tcRecord, setTcRecord] = useState(null)
  const [issued, setIssued] = useState(null)
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTC = async () => {
      try {
        if (!userId) return
        const [requests, issuedCert] = await Promise.all([
          tcApi.getStatus(userId),
          tcApi.getIssuedTc(userId)
        ])
        const approved = Array.isArray(requests) ? requests.find(r => r.status === 'APPROVED') : null
        setTcRecord(approved || null)
        setIssued(issuedCert)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchTC()
    } else {
      setLoading(false)
    }
  }, [userId])

  const downloadTC = async () => {
    setDownloading(true)
    try {
      if (!issued?.studentId) {
        throw new Error('Certificate not issued yet')
      }
      const studentId = issued.studentId
      const response = await fetch(tcApi.downloadByStudent(studentId))
      if (!response.ok) throw new Error('Download failed')

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `TC_${issued.tcNumber || studentId}.pdf`
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      alert('Download failed: ' + err.message)
    } finally {
      setDownloading(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  if (loading) {
    return (
      <div className="page-container">
        <div className="page-header">
          <h2 className="page-title">Download Transfer Certificate</h2>
        </div>
        <div className="card">
          <p style={{ padding: '20px', color: '#6b7280' }}>Loading TC details…</p>
        </div>
      </div>
    )
  }

  if (!tcRecord) {
    return (
      <div className="page-container">
        <div className="page-header">
          <h2 className="page-title">Download Transfer Certificate</h2>
          <p className="page-subtitle">View and download your TC</p>
        </div>
        <div className="alert alert-warning">
          Your TC request is not approved yet. Please wait for approval.
        </div>
        {error && <div className="alert alert-danger mt-lg">{error}</div>}
      </div>
    )
  }

  if (tcRecord.status === 'APPROVED' && !issued) {
    return (
      <div className="page-container">
        <div className="page-header">
          <h2 className="page-title">Download Transfer Certificate</h2>
          <p className="page-subtitle">View and download your TC</p>
        </div>
        <div className="alert alert-info">
          Your TC request is approved. The TC office must generate and issue the certificate before you can download it.
        </div>
        {error && <div className="alert alert-danger mt-lg">{error}</div>}
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Download Transfer Certificate</h2>
        <p className="page-subtitle">View and download your TC</p>
      </div>

      <div className="card" style={{ maxWidth: '800px' }}>
        <div className="card-header">
          <h3 className="card-title">Transfer Certificate Preview</h3>
        </div>

        <div className="tc-preview">
          <div className="tc-header">
            <h2>Andaman College</h2>
            <p>Port Blair, Andaman &amp; Nicobar Islands</p>
            <h3 style={{ marginTop: '20px' }}>TRANSFER CERTIFICATE</h3>
          </div>

          <div className="tc-content">
            <p>
              Issued certificate: <strong>{issued?.tcNumber}</strong>
              {issued?.issueDate && (
                <> · Issue date: <strong>{issued.issueDate}</strong></>
              )}
            </p>

            <div className="tc-details">
              <div className="tc-detail-row">
                <span>TC Number:</span>
                <span>{issued?.tcNumber}</span>
              </div>
              <div className="tc-detail-row">
                <span>Request ID:</span>
                <span>{tcRecord.id}</span>
              </div>
              <div className="tc-detail-row">
                <span>Reason:</span>
                <span>{tcRecord.reason}</span>
              </div>
              <div className="tc-detail-row">
                <span>Applied Date:</span>
                <span>{tcRecord.appliedDate}</span>
              </div>
              <div className="tc-detail-row">
                <span>Status:</span>
                <span style={{ color: '#065f46', fontWeight: '600' }}>Issued</span>
              </div>
            </div>

            <p style={{ marginTop: '30px' }}>
              Download the PDF below for the official document including QR verification.
            </p>
          </div>

          <div className="tc-footer">
            <div className="signature-section">
              <p>___________________</p>
              <p>Principal&apos;s Signature</p>
              <p><small>Date: {new Date().toLocaleDateString()}</small></p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-md mt-lg" style={{ maxWidth: '800px' }}>
        <button
          onClick={downloadTC}
          className="btn btn-success flex-1"
          disabled={downloading || !issued?.studentId}
        >
          {downloading ? 'Downloading…' : 'Download TC (PDF)'}
        </button>
        <button onClick={handlePrint} className="btn btn-secondary flex-1">
          Print preview
        </button>
      </div>
      {error && <div className="alert alert-danger mt-lg">{error}</div>}
    </div>
  )
}

export default DownloadTC

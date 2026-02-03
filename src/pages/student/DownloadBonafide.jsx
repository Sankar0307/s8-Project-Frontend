import { studentData } from '../../data/mockData'
import './Student.css'

const DownloadBonafide = () => {
  const { profile, bonafideRequests, feeStructure } = studentData
  
  // Get the first approved bonafide request
  const approvedRequest = bonafideRequests.find(req => req.status === 'Approved')
  const showFeeStructure = approvedRequest?.bonafideType === 'With Fee Structure'

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    alert('Download PDF feature - UI only (backend integration pending)')
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Download Bonafide Certificate</h2>
        <p className="page-subtitle">Print or download your bonafide certificate</p>
      </div>

      <div style={{ marginBottom: 'var(--spacing-lg)', display: 'flex', gap: 'var(--spacing-md)' }}>
        <button onClick={handlePrint} className="btn btn-primary">
          🖨️ Print Preview
        </button>
        <button onClick={handleDownload} className="btn btn-success">
          📥 Download PDF
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
            This is to certify that <strong>{profile.name}</strong>, bearing Register Number{' '}
            <strong>{profile.registerNumber}</strong>, is a bonafide student of this institution,
            currently pursuing <strong>{profile.year}</strong> in the Department of{' '}
            <strong>{profile.department}</strong> for the Academic Year{' '}
            <strong>{feeStructure.academicYear}</strong>.
          </p>

          {approvedRequest && (
            <p style={{ marginBottom: 'var(--spacing-lg)', lineHeight: 1.8 }}>
              This certificate is issued for the purpose of <strong>{approvedRequest.reason}</strong>.
            </p>
          )}

          <div className="tc-details">
            <div className="tc-detail-row">
              <strong>Student Name:</strong>
              <span>{profile.name}</span>
            </div>
            <div className="tc-detail-row">
              <strong>Register Number:</strong>
              <span>{profile.registerNumber}</span>
            </div>
            <div className="tc-detail-row">
              <strong>Department:</strong>
              <span>{profile.department}</span>
            </div>
            <div className="tc-detail-row">
              <strong>Academic Year:</strong>
              <span>{feeStructure.academicYear}</span>
            </div>
            <div className="tc-detail-row">
              <strong>Current Year:</strong>
              <span>{profile.year}</span>
            </div>
          </div>

          {showFeeStructure && (
            <>
              <h4 style={{ marginTop: 'var(--spacing-xl)', marginBottom: 'var(--spacing-md)', color: 'var(--gray-900)' }}>
                Fee Structure for Academic Year {feeStructure.academicYear}
              </h4>
              <div className="tc-details">
                {feeStructure.fees.map((fee, index) => (
                  <div className="tc-detail-row" key={index}>
                    <strong>{fee.type}:</strong>
                    <span>₹ {fee.amount.toLocaleString('en-IN')}</span>
                  </div>
                ))}
                <div className="tc-detail-row" style={{ borderTop: '2px solid var(--gray-900)', paddingTop: 'var(--spacing-sm)', marginTop: 'var(--spacing-sm)' }}>
                  <strong>Total Amount:</strong>
                  <strong>₹ {feeStructure.total.toLocaleString('en-IN')}</strong>
                </div>
              </div>
            </>
          )}

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

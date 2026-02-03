import { studentData } from '../../data/mockData'
import './Student.css'

const DownloadTC = () => {
  const { profile, tcRequest } = studentData

  const handleDownload = () => {
    alert('TC download initiated!')
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Download Transfer Certificate</h2>
        <p className="page-subtitle">View and download your TC</p>
      </div>

      {tcRequest.status !== 'Approved' ? (
        <div className="alert alert-warning">
          ⚠️ Your TC request is not approved yet. Please wait for approval to download the certificate.
        </div>
      ) : (
        <>
          <div className="card" style={{ maxWidth: '800px' }}>
            <div className="card-header">
              <h3 className="card-title">Transfer Certificate Preview</h3>
            </div>
            
            <div className="tc-preview">
              <div className="tc-header">
                <h2>🎓 ANDAMAN COLLEGE</h2>
                <p>Port Blair, Andaman & Nicobar Islands</p>
                <h3 style={{ marginTop: '20px' }}>TRANSFER CERTIFICATE</h3>
              </div>

              <div className="tc-content">
                <p>This is to certify that <strong>{profile.name}</strong>, Register No. <strong>{profile.registerNumber}</strong>, was a bonafide student of this institution.</p>
                
                <div className="tc-details">
                  <div className="tc-detail-row">
                    <span>Department:</span>
                    <span>{profile.department}</span>
                  </div>
                  <div className="tc-detail-row">
                    <span>Date of Admission:</span>
                    <span>{profile.admissionDate}</span>
                  </div>
                  <div className="tc-detail-row">
                    <span>Date of Leaving:</span>
                    <span>{tcRequest.approvedDate}</span>
                  </div>
                  <div className="tc-detail-row">
                    <span>Reason for Leaving:</span>
                    <span>{tcRequest.reason}</span>
                  </div>
                  <div className="tc-detail-row">
                    <span>Conduct:</span>
                    <span>Good</span>
                  </div>
                </div>

                <p style={{ marginTop: '30px' }}>The student has cleared all dues and is free to seek admission elsewhere.</p>
              </div>

              <div className="tc-footer">
                <div className="signature-section">
                  <p>___________________</p>
                  <p>Principal's Signature</p>
                  <p><small>Date: {new Date().toLocaleDateString()}</small></p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-md mt-lg" style={{ maxWidth: '800px' }}>
            <button onClick={handleDownload} className="btn btn-success flex-1">
              ⬇️ Download TC
            </button>
            <button onClick={handlePrint} className="btn btn-secondary flex-1">
              🖨️ Print TC
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default DownloadTC

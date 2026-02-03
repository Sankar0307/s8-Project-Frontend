import { tcData } from '../../data/mockData'
import './TCAdmin.css'

const GenerateTC = () => {
  const approvedRequest = tcData.tcRequests.find(r => r.status === 'Approved')

  const handleGenerate = () => {
    alert('TC generated successfully!')
  }

  if (!approvedRequest) {
    return (
      <div className="page-container">
        <div className="page-header">
          <h2 className="page-title">Generate Transfer Certificate</h2>
        </div>
        <div className="alert alert-info">
          ℹ️ No approved TC requests to generate.
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Generate Transfer Certificate</h2>
        <p className="page-subtitle">Preview and generate TC for approved requests</p>
      </div>

      <div className="card" style={{ maxWidth: '800px' }}>
        <div className="card-header">
          <h3 className="card-title">Transfer Certificate Preview</h3>
        </div>
        
        <div className="tc-preview">
          <div className="tc-header">
            <h2>🎓 ANDAMAN COLLEGE</h2>
            <p>Port Blair, Andaman & Nicobar Islands</p>
            <h3 style={{ marginTop: '20px' }}>TRANSFER CERTIFICATE</h3>
            <p style={{ fontWeight: 'normal' }}>TC Number: TC2024{String(tcData.tcHistory.length + 1).padStart(3, '0')}</p>
          </div>

          <div className="tc-content">
            <p>This is to certify that <strong>{approvedRequest.name}</strong>, Register No. <strong>{approvedRequest.registerNo}</strong>, was a bonafide student of this institution.</p>
            
            <div className="tc-details">
              <div className="tc-detail-row">
                <span>Department:</span>
                <span>{approvedRequest.department}</span>
              </div>
              <div className="tc-detail-row">
                <span>Year/Semester:</span>
                <span>{approvedRequest.year}</span>
              </div>
              <div className="tc-detail-row">
                <span>Date of Admission:</span>
                <span>2021-07-15</span>
              </div>
              <div className="tc-detail-row">
                <span>Date of Leaving:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="tc-detail-row">
                <span>Reason for Leaving:</span>
                <span>{approvedRequest.reason}</span>
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

            <p style={{ marginTop: '30px' }}>The student has fulfilled all academic requirements and is free to seek admission elsewhere.</p>
          </div>

          <div className="tc-footer">
            <div className="flex justify-between" style={{marginTop: '40px'}}>
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

      <div className="flex gap-md mt-lg" style={{ maxWidth: '800px' }}>
        <button onClick={handleGenerate} className="btn btn-success flex-1">
          ✅ Generate & Issue TC
        </button>
        <button onClick={() => window.print()} className="btn btn-secondary flex-1">
          🖨️ Print Preview
        </button>
      </div>
    </div>
  )
}

export default GenerateTC

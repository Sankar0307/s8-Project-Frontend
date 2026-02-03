import { studentData } from '../../data/mockData'
import './Student.css'

const FeeStructureDetails = () => {
  const { feeStructure } = studentData

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Detailed Fee Structure</h2>
        <p className="page-subtitle">Academic Year: {feeStructure.academicYear}</p>
      </div>

      <div className="card" style={{ maxWidth: '800px' }}>
        <div className="card-header">
          <h3 className="card-title">Fee Breakdown</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
          {feeStructure.fees.map((fee, index) => (
            <div 
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: 'var(--spacing-md)',
                background: 'var(--gray-50)',
                borderRadius: 'var(--radius-md)',
                borderLeft: '3px solid var(--primary-blue)'
              }}
            >
              <span style={{ fontWeight: 500, color: 'var(--gray-700)' }}>{fee.type}</span>
              <span style={{ fontWeight: 600, color: 'var(--gray-900)', fontSize: 'var(--font-size-lg)' }}>
                ₹ {fee.amount.toLocaleString('en-IN')}
              </span>
            </div>
          ))}

          <div 
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: 'var(--spacing-lg)',
              background: 'var(--primary-blue)',
              color: 'var(--white)',
              borderRadius: 'var(--radius-md)',
              marginTop: 'var(--spacing-md)'
            }}
          >
            <span style={{ fontWeight: 700, fontSize: 'var(--font-size-lg)' }}>Total Amount</span>
            <span style={{ fontWeight: 700, fontSize: 'var(--font-size-2xl)' }}>
              ₹ {feeStructure.total.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <div className="alert alert-info mt-lg">
          ℹ️ Fee structure is defined by Accounts Department.
        </div>
      </div>
    </div>
  )
}

export default FeeStructureDetails

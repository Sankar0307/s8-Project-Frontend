import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const statusStyles = {
  VALID: {
    badge: { background: '#d1fae5', color: '#065f46', border: '1px solid #6ee7b7' },
    icon: '✅',
    label: 'VALID',
  },
  INVALID: {
    badge: { background: '#fee2e2', color: '#991b1b', border: '1px solid #fca5a5' },
    icon: '❌',
    label: 'REVOKED',
  },
  NOT_FOUND: {
    badge: { background: '#fef3c7', color: '#92400e', border: '1px solid #fcd34d' },
    icon: '⚠️',
    label: 'NOT FOUND',
  },
}

const VerifyTC = () => {
  const { tcNumber } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTC = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/tc/verify/${tcNumber}`)
        const json = await res.json()
        setData(json)
      } catch (err) {
        setError('Could not connect to server. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchTC()
  }, [tcNumber])

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #e8f0fe 0%, #f0f4ff 50%, #e3eeff 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Segoe UI', sans-serif",
    padding: '24px',
  }

  const cardStyle = {
    background: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 10px 40px rgba(30,64,120,0.12)',
    padding: '40px',
    maxWidth: '480px',
    width: '100%',
  }

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '28px',
  }

  const collegeTitle = {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1e4078',
    marginBottom: '4px',
  }

  const subtitle = {
    fontSize: '12px',
    color: '#6b7280',
    marginBottom: '16px',
  }

  const tcTitle = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#374151',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  }

  const divider = {
    border: 'none',
    borderTop: '2px solid #e5e7eb',
    margin: '20px 0',
  }

  const rowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #f3f4f6',
  }

  const labelStyle = {
    fontSize: '13px',
    color: '#6b7280',
    fontWeight: '500',
  }

  const valueStyle = {
    fontSize: '13px',
    color: '#111827',
    fontWeight: '600',
    textAlign: 'right',
  }

  const badgeStyle = (status) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 16px',
    borderRadius: '999px',
    fontSize: '13px',
    fontWeight: '700',
    letterSpacing: '0.5px',
    ...(statusStyles[status]?.badge || statusStyles.NOT_FOUND.badge),
  })

  const footerStyle = {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '11px',
    color: '#9ca3af',
  }

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#6b7280' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>⏳</div>
            <p>Verifying certificate…</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#991b1b' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>⚠️</div>
            <p>{error}</p>
          </div>
        </div>
      </div>
    )
  }

  const status = data?.status || 'NOT_FOUND'
  const statusInfo = statusStyles[status] || statusStyles.NOT_FOUND

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* College Header */}
        <div style={headerStyle}>
          <div style={collegeTitle}>🎓 ANDAMAN COLLEGE</div>
          <div style={subtitle}>Port Blair, Andaman & Nicobar Islands</div>
          <div style={tcTitle}>Transfer Certificate Verification</div>
        </div>

        <hr style={divider} />

        {/* Status Badge */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span style={badgeStyle(status)}>
            {statusInfo.icon} {statusInfo.label}
          </span>
        </div>

        {status === 'NOT_FOUND' && (
          <div style={{ textAlign: 'center', color: '#92400e' }}>
            <p style={{ fontSize: '14px' }}>TC Number <strong>{tcNumber}</strong> was not found in our records.</p>
            <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '8px' }}>Please contact the college office.</p>
          </div>
        )}

        {status === 'INVALID' && (
          <div style={{ textAlign: 'center', color: '#991b1b' }}>
            <p style={{ fontSize: '14px' }}>This Transfer Certificate has been <strong>revoked or invalidated</strong>.</p>
            <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '8px' }}>Please contact the college office for more information.</p>
          </div>
        )}

        {status === 'VALID' && (
          <div>
            <div style={rowStyle}>
              <span style={labelStyle}>TC Number</span>
              <span style={valueStyle}>{data.tcNumber}</span>
            </div>
            {data.name && (
              <div style={rowStyle}>
                <span style={labelStyle}>Student Name</span>
                <span style={valueStyle}>{data.name}</span>
              </div>
            )}
            {data.department && (
              <div style={rowStyle}>
                <span style={labelStyle}>Department</span>
                <span style={valueStyle}>{data.department}</span>
              </div>
            )}
            {data.year && (
              <div style={rowStyle}>
                <span style={labelStyle}>Year</span>
                <span style={valueStyle}>{data.year}</span>
              </div>
            )}
            <div style={rowStyle}>
              <span style={labelStyle}>Student ID</span>
              <span style={valueStyle}>{data.studentId}</span>
            </div>
            <div style={{ ...rowStyle, borderBottom: 'none' }}>
              <span style={labelStyle}>Issue Date</span>
              <span style={valueStyle}>{data.issueDate}</span>
            </div>
          </div>
        )}

        <hr style={divider} />

        <div style={footerStyle}>
          Verified by Andaman College Academic Management System<br />
          TC Number: {tcNumber}
        </div>
      </div>
    </div>
  )
}

export default VerifyTC

import { useState, useEffect } from 'react'
import Table from '../../components/Table'
import { tcApi } from '../../services/api'
import './TCAdmin.css'

const TCHistory = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    tcApi.getAllRequests()
      .then(data => {
        // Show approved/rejected (processed) requests as history
        setRequests(data.filter(r => r.status !== 'PENDING'))
      })
      .catch(err => console.error('TC history error:', err))
      .finally(() => setLoading(false))
  }, [])

  const columns = [
    { header: 'ID', field: 'id' },
    { header: 'Student ID', field: 'studentId' },
    { header: 'Applied Date', field: 'appliedDate' },
    { header: 'Reason', field: 'reason' },
    { 
      header: 'Status', 
      render: (row) => (
        <span className={`badge badge-${row.status === 'APPROVED' ? 'success' : 'danger'}`}>
          {row.status}
        </span>
      )
    },
    { header: 'Remarks', field: 'remarks' }
  ]

  if (loading) return <div className="page-container"><p>Loading TC history...</p></div>

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">TC History</h2>
        <p className="page-subtitle">View all processed transfer certificate requests</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Processed TC Requests</h3>
        </div>
        <Table columns={columns} data={requests} />
      </div>
    </div>
  )
}

export default TCHistory

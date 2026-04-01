import { useState, useEffect } from 'react'
import Table from '../../components/Table'
import { tcApi } from '../../services/api'
import './TCAdmin.css'

const TCRequestList = () => {
  const [filter, setFilter] = useState('All')
  const [tcRequests, setTcRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    tcApi.getAllRequests()
      .then(data => setTcRequests(data))
      .catch(err => console.error('TC requests error:', err))
      .finally(() => setLoading(false))
  }, [])

  const filteredRequests = filter === 'All' 
    ? tcRequests 
    : tcRequests.filter(r => r.status === filter.toUpperCase())

  const columns = [
    { header: 'ID', field: 'id' },
    { header: 'Student ID', field: 'studentId' },
    { header: 'Applied Date', field: 'appliedDate' },
    { header: 'Reason', field: 'reason' },
    { 
      header: 'Status', 
      render: (row) => (
        <span className={`badge badge-${row.status === 'APPROVED' ? 'success' : row.status === 'PENDING' ? 'warning' : 'danger'}`}>
          {row.status}
        </span>
      )
    }
  ]

  if (loading) return <div className="page-container"><p>Loading TC requests...</p></div>

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">TC Request List</h2>
        <p className="page-subtitle">View all transfer certificate requests</p>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="flex justify-between items-center">
            <h3 className="card-title">All TC Requests</h3>
            <div className="filter-buttons">
              {['All', 'Pending', 'Approved', 'Rejected'].map(f => (
                <button 
                  key={f}
                  className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
        <Table columns={columns} data={filteredRequests} />
      </div>
    </div>
  )
}

export default TCRequestList

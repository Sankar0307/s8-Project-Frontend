import { useState, useEffect } from 'react'
import Table from '../../components/Table'
import { bonafideApi } from '../../services/api'
import './TCAdmin.css'

const BonafideRequestList = () => {
  const [filter, setFilter] = useState('All')
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    bonafideApi.getAll()
      .then(data => setRequests(data))
      .catch(err => console.error('Bonafide load error:', err))
      .finally(() => setLoading(false))
  }, [])

  const filteredRequests = filter === 'All' 
    ? requests 
    : requests.filter(r => r.status === filter.toUpperCase())

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

  if (loading) return <div className="page-container"><p>Loading bonafide requests...</p></div>

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Bonafide Certificate Requests</h2>
        <p className="page-subtitle">Manage student bonafide certificate requests</p>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="flex justify-between items-center">
            <h3 className="card-title">All Bonafide Requests</h3>
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

export default BonafideRequestList

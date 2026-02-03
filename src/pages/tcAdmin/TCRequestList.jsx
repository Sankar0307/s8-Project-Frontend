import { useState } from 'react'
import Table from '../../components/Table'
import { tcData } from '../../data/mockData'
import './TCAdmin.css'

const TCRequestList = () => {
  const [filter, setFilter] = useState('All')
  const { tcRequests } = tcData

  const filteredRequests = filter === 'All' 
    ? tcRequests 
    : tcRequests.filter(r => r.status === filter)

  const columns = [
    { header: 'Register No', field: 'registerNo' },
    { header: 'Name', field: 'name' },
    { header: 'Department', field: 'department' },
    { header: 'Year', field: 'year' },
    { header: 'Applied Date', field: 'appliedDate' },
    { header: 'Reason', field: 'reason' },
    { 
      header: 'Status', 
      render: (row) => (
        <span className={`badge badge-${row.status === 'Approved' ? 'success' : row.status === 'Pending' ? 'warning' : 'danger'}`}>
          {row.status}
        </span>
      )
    }
  ]

  const actions = [
    {
      label: 'View Details',
      className: 'btn-primary',
      onClick: (row) => alert(`Viewing details for ${row.name}`)
    }
  ]

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
              <button 
                className={`btn btn-sm ${filter === 'All' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilter('All')}
              >
                All
              </button>
              <button 
                className={`btn btn-sm ${filter === 'Pending' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilter('Pending')}
              >
                Pending
              </button>
              <button 
                className={`btn btn-sm ${filter === 'Approved' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilter('Approved')}
              >
                Approved
              </button>
              <button 
                className={`btn btn-sm ${filter === 'Rejected' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilter('Rejected')}
              >
                Rejected
              </button>
            </div>
          </div>
        </div>
        <Table columns={columns} data={filteredRequests} actions={actions} />
      </div>
    </div>
  )
}

export default TCRequestList

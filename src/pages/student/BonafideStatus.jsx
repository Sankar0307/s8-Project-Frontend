import { useState, useEffect } from 'react'
import Table from '../../components/Table'
import { Link } from 'react-router-dom'
import { bonafideApi } from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import './Student.css'

const BonafideStatus = () => {
  const { userId } = useAuth()
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    bonafideApi.getAll()
      .then(data => {
        const myRequests = userId ? data.filter(r => r.studentId === userId) : data
        setRequests(myRequests)
      })
      .catch(err => console.error('Bonafide status error:', err))
      .finally(() => setLoading(false))
  }, [userId])

  const columns = [
    { header: 'ID', field: 'id' },
    { header: 'Applied Date', field: 'appliedDate' },
    { header: 'Reason', field: 'reason' },
    { 
      header: 'Status', 
      render: (row) => (
        <span className={`badge badge-${row.status === 'APPROVED' ? 'success' : row.status === 'PENDING' ? 'warning' : 'danger'}`}>
          {row.status}
        </span>
      )
    },
    {
      header: 'Action',
      render: (row) => {
        if (row.status === 'APPROVED') {
          return (
            <Link to="/student/download-bonafide" className="btn btn-success btn-sm">
              Download Bonafide
            </Link>
          )
        } else if (row.status === 'REJECTED') {
          return <span className="text-sm text-gray">Rejected</span>
        } else {
          return <span className="text-sm text-gray">Processing...</span>
        }
      }
    }
  ]

  if (loading) return <div className="page-container"><p>Loading bonafide status...</p></div>

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Bonafide Certificate Status</h2>
        <p className="page-subtitle">Track your bonafide certificate requests</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">My Bonafide Requests</h3>
        </div>
        <Table columns={columns} data={requests} />
      </div>
    </div>
  )
}

export default BonafideStatus

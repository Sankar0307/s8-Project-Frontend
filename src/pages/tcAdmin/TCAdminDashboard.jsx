import { useState, useEffect } from 'react'
import Card from '../../components/Card'
import Table from '../../components/Table'
import { dashboardApi, tcApi } from '../../services/api'
import './TCAdmin.css'

const TCAdminDashboard = () => {
  const [tcRequests, setTcRequests] = useState([])
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      dashboardApi.admin(),
      tcApi.getAllRequests()
    ])
      .then(([dashData, requests]) => {
        setDashboard(dashData)
        setTcRequests(requests)
      })
      .catch(err => console.error('Dashboard error:', err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="page-container"><p>Loading dashboard...</p></div>

  const pendingRequests = tcRequests.filter(r => r.status === 'PENDING')
  const approvedCount = tcRequests.filter(r => r.status === 'APPROVED').length
  const rejectedCount = tcRequests.filter(r => r.status === 'REJECTED').length

  const columns = [
    { header: 'ID', field: 'id' },
    { header: 'Student ID', field: 'studentId' },
    { header: 'Applied Date', field: 'appliedDate' },
    { 
      header: 'Status', 
      render: (row) => (
        <span className={`badge badge-${row.status === 'APPROVED' ? 'success' : row.status === 'PENDING' ? 'warning' : 'danger'}`}>
          {row.status}
        </span>
      )
    }
  ]

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">TC Admin Dashboard</h2>
        <p className="page-subtitle">Overview of transfer certificate requests</p>
      </div>

      <div className="grid grid-cols-4">
        <Card title="Pending Requests" value={pendingRequests.length} icon="⏰" color="orange" />
        <Card title="Approved TCs" value={approvedCount} icon="✅" color="green" />
        <Card title="Rejected" value={rejectedCount} icon="❌" color="red" />
        <Card title="Total Requests" value={tcRequests.length} icon="📨" color="blue" />
      </div>

      <div className="card mt-lg">
        <div className="card-header">
          <h3 className="card-title">Recent Pending Requests</h3>
        </div>
        <Table columns={columns} data={pendingRequests.slice(0, 5)} />
        {pendingRequests.length === 0 && (
          <p className="text-center text-gray" style={{padding: '20px'}}>No pending requests</p>
        )}
      </div>
    </div>
  )
}

export default TCAdminDashboard

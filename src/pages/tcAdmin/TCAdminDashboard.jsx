import Card from '../../components/Card'
import Table from '../../components/Table'
import { tcData } from '../../data/mockData'
import './TCAdmin.css'

const TCAdminDashboard = () => {
  const { dashboard, tcRequests } = tcData

  const recentRequests = tcRequests.filter(r => r.status === 'Pending').slice(0, 3)

  const columns = [
    { header: 'Register No', field: 'registerNo' },
    { header: 'Name', field: 'name' },
    { header: 'Department', field: 'department' },
    { header: 'Applied Date', field: 'appliedDate' },
    { 
      header: 'Status', 
      render: (row) => (
        <span className={`badge badge-${row.status === 'Approved' ? 'success' : row.status === 'Pending' ? 'warning' : 'danger'}`}>
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
        <Card
          title="Pending Requests"
          value={dashboard.pendingRequests}
          icon="⏰"
          color="orange"
        />
        <Card
          title="Approved TCs"
          value={dashboard.approvedCount}
          icon="✅"
          color="green"
        />
        <Card
          title="Rejected"
          value={dashboard.rejectedCount}
          icon="❌"
          color="red"
        />
        <Card
          title="Total Requests"
          value={dashboard.totalRequests}
          icon="📨"
          color="blue"
        />
      </div>

      <div className="card mt-lg">
        <div className="card-header">
          <h3 className="card-title">Recent Pending Requests</h3>
        </div>
        <Table columns={columns} data={recentRequests} />
        {recentRequests.length === 0 && (
          <p className="text-center text-gray" style={{padding: '20px'}}>No pending requests</p>
        )}
      </div>
    </div>
  )
}

export default TCAdminDashboard

import { useState, useEffect } from 'react'
import Card from '../../components/Card'
import Table from '../../components/Table'
import { dashboardApi, paymentApi } from '../../services/api'
import './Accounts.css'

const AccountsDashboard = () => {
  const [dashboard, setDashboard] = useState(null)
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      dashboardApi.accounts(),
      paymentApi.getAll()
    ])
      .then(([dashData, payData]) => {
        setDashboard(dashData)
        setPayments(payData)
      })
      .catch(err => console.error('Dashboard error:', err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="page-container"><p>Loading dashboard...</p></div>
  if (!dashboard) return <div className="page-container"><p>Unable to load dashboard.</p></div>

  const pendingPayments = payments.filter(p => p.status === 'PENDING')

  const columns = [
    { header: 'ID', field: 'id' },
    { header: 'Student ID', field: 'studentId' },
    { header: 'Amount', render: (row) => `₹${row.amount?.toLocaleString()}` },
    { header: 'Method', field: 'paymentMethod' },
    { header: 'Date', field: 'date' },
    { 
      header: 'Status', 
      render: (row) => (
        <span className={`badge badge-${row.status === 'SUCCESS' ? 'success' : 'warning'}`}>
          {row.status}
        </span>
      )
    }
  ]

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Accounts Dashboard</h2>
        <p className="page-subtitle">Overview of fee collection and transactions</p>
      </div>

      <div className="grid grid-cols-4">
        <Card
          title="Total Collected"
          value={`₹${(dashboard.totalFeesCollected || 0).toLocaleString()}`}
          icon="💰"
          color="green"
        />
        <Card
          title="Pending Payments"
          value={dashboard.pendingPayments || 0}
          icon="⏰"
          color="orange"
        />
        <Card
          title="Success Payments"
          value={dashboard.successPayments || 0}
          icon="✅"
          color="blue"
        />
        <Card
          title="Total Students"
          value={dashboard.totalStudents || 0}
          icon="👥"
          color="blue"
        />
      </div>

      <div className="card mt-lg">
        <div className="card-header">
          <h3 className="card-title">Pending Payment Verifications</h3>
          <span className="badge badge-warning">{pendingPayments.length} Pending</span>
        </div>
        <Table columns={columns} data={pendingPayments.slice(0, 10)} />
      </div>
    </div>
  )
}

export default AccountsDashboard

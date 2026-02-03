import { useState } from 'react'
import Table from '../../components/Table'
import { accountsData } from '../../data/mockData'
import './Accounts.css'

const VerifyPayments = () => {
  const [payments, setPayments] = useState(accountsData.pendingPayments)

  const handleApprove = (row) => {
    if (confirm(`Approve payment from ${row.name}?`)) {
      setPayments(payments.filter(p => p.id !== row.id))
      alert('Payment approved successfully!')
    }
  }

  const handleReject = (row) => {
    if (confirm(`Reject payment from ${row.name}?`)) {
      setPayments(payments.filter(p => p.id !== row.id))
      alert('Payment rejected!')
    }
  }

  const columns = [
    { header: 'Date', field: 'date' },
    { header: 'Register No', field: 'registerNo' },
    { header: 'Name', field: 'name' },
    { header: 'Amount', render: (row) => `₹${row.amount.toLocaleString()}` },
    { header: 'Method', field: 'method' },
    { header: 'Transaction ID', field: 'transactionId' },
    { 
      header: 'Status', 
      render: (row) => (
        <span className="badge badge-warning">{row.status}</span>
      )
    }
  ]

  const actions = [
    {
      label: 'Approve',
      className: 'btn-success',
      onClick: handleApprove
    },
    {
      label: 'Reject',
      className: 'btn-danger',
      onClick: handleReject
    }
  ]

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Verify Payments</h2>
        <p className="page-subtitle">Review and verify pending payment transactions</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Pending Payment Verifications</h3>
          <span className="badge badge-warning">{payments.length} Pending</span>
        </div>
        <Table columns={columns} data={payments} actions={actions} />
      </div>

      {payments.length === 0 && (
        <div className="alert alert-success mt-lg">
          ✅ All payments have been verified!
        </div>
      )}
    </div>
  )
}

export default VerifyPayments

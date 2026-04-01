import { useState, useEffect } from 'react'
import Table from '../../components/Table'
import { paymentApi } from '../../services/api'
import './Accounts.css'

const VerifyPayments = () => {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)

  const loadPayments = () => {
    paymentApi.getAll()
      .then(data => {
        setPayments(data.filter(p => p.status === 'PENDING'))
      })
      .catch(err => console.error('Payment load error:', err))
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadPayments() }, [])

  const handleApprove = async (row) => {
    if (confirm(`Approve payment #${row.id}?`)) {
      try {
        await paymentApi.verify(row.id)
        alert('Payment approved successfully!')
        loadPayments()
      } catch (err) {
        alert('Failed to approve: ' + err.message)
      }
    }
  }

  const columns = [
    { header: 'Date', field: 'date' },
    { header: 'Student ID', field: 'studentId' },
    { header: 'Fee Type', field: 'feeType' },
    { header: 'Amount', render: (row) => `₹${row.amount?.toLocaleString()}` },
    { header: 'Method', field: 'paymentMethod' },
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
    }
  ]

  if (loading) return <div className="page-container"><p>Loading payments...</p></div>

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

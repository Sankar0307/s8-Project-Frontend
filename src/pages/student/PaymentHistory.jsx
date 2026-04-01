import { useState, useEffect } from 'react'
import Table from '../../components/Table'
import { useAuth } from '../../context/AuthContext'
import { paymentApi, tcApi } from '../../services/api'
import './Student.css'

const PaymentHistory = () => {
  const { userId } = useAuth()
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        if (!userId) return
        let resolvedStudentId = userId
        try {
          const student = await tcApi.getStudentProfile(userId)
          resolvedStudentId = student?.id || userId
        } catch (_) {
          // Fallback when user-student profile link is missing.
        }
        const data = await paymentApi.getAll()
        const myPayments = Array.isArray(data) ? data.filter(p => p.studentId === resolvedStudentId) : []
        setPayments(myPayments)
      } catch (err) {
        console.error('Payment history error:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [userId])

  const columns = [
    { header: 'Date', field: 'date' },
    { header: 'Fee Type', field: 'feeType' },
    { header: 'Amount', render: (row) => `₹${row.amount?.toLocaleString()}` },
    { header: 'Payment Method', field: 'paymentMethod' },
    { header: 'Transaction ID', field: 'transactionId' },
    { 
      header: 'Status', 
      render: (row) => (
        <span className={`badge badge-${row.status === 'SUCCESS' ? 'success' : 'warning'}`}>
          {row.status}
        </span>
      )
    }
  ]

  if (loading) return <div className="page-container"><p>Loading payment history...</p></div>

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Payment History</h2>
        <p className="page-subtitle">View all your past payment transactions</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Transaction History</h3>
        </div>
        <Table columns={columns} data={payments} />
      </div>
    </div>
  )
}

export default PaymentHistory

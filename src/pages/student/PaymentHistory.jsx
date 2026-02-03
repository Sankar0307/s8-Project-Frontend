import Table from '../../components/Table'
import { studentData } from '../../data/mockData'
import './Student.css'

const PaymentHistory = () => {
  const { paymentHistory } = studentData

  const columns = [
    { header: 'Date', field: 'date' },
    { header: 'Fee Type', field: 'feeType' },
    { header: 'Amount', render: (row) => `₹${row.amount.toLocaleString()}` },
    { header: 'Payment Method', field: 'method' },
    { header: 'Transaction ID', field: 'transactionId' },
    { 
      header: 'Status', 
      render: (row) => (
        <span className={`badge badge-${row.status === 'Success' ? 'success' : 'danger'}`}>
          {row.status}
        </span>
      )
    }
  ]

  const actions = [
    {
      label: 'Download Receipt',
      className: 'btn-primary',
      onClick: (row) => alert(`Downloading receipt for transaction ${row.transactionId}`)
    }
  ]

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
        <Table columns={columns} data={paymentHistory} actions={actions} />
      </div>
    </div>
  )
}

export default PaymentHistory

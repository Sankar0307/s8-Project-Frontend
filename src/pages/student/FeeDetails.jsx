import Table from '../../components/Table'
import Card from '../../components/Card'
import { studentData } from '../../data/mockData'
import './Student.css'

const FeeDetails = () => {
  const { feeDetails } = studentData

  const totalAmount = feeDetails.reduce((sum, fee) => sum + fee.amount, 0)
  const totalPaid = feeDetails.reduce((sum, fee) => sum + fee.paid, 0)
  const totalDue = feeDetails.reduce((sum, fee) => sum + fee.due, 0)

  const columns = [
    { header: 'Fee Type', field: 'feeType' },
    { header: 'Amount', render: (row) => `₹${row.amount.toLocaleString()}` },
    { header: 'Paid', render: (row) => `₹${row.paid.toLocaleString()}` },
    { header: 'Due', render: (row) => `₹${row.due.toLocaleString()}` },
    { header: 'Due Date', field: 'dueDate' },
    { 
      header: 'Status', 
      render: (row) => (
        <span className={`badge badge-${row.status === 'Paid' ? 'success' : 'warning'}`}>
          {row.status}
        </span>
      )
    }
  ]

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Fee Details</h2>
        <p className="page-subtitle">View your fee structure and payment status</p>
      </div>

      <div className="grid grid-cols-3">
        <Card
          title="Total Amount"
          value={`₹${totalAmount.toLocaleString()}`}
          icon="💰"
          color="blue"
        />
        <Card
          title="Amount Paid"
          value={`₹${totalPaid.toLocaleString()}`}
          icon="✅"
          color="green"
        />
        <Card
          title="Amount Due"
          value={`₹${totalDue.toLocaleString()}`}
          icon="⏰"
          color="orange"
        />
      </div>

      <div className="card mt-lg">
        <div className="card-header">
          <h3 className="card-title">Fee Breakdown</h3>
        </div>
        <Table columns={columns} data={feeDetails} />
      </div>
    </div>
  )
}

export default FeeDetails

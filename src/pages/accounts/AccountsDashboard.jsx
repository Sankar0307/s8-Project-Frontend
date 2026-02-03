import Card from '../../components/Card'
import Table from '../../components/Table'
import { accountsData } from '../../data/mockData'
import './Accounts.css'

const AccountsDashboard = () => {
  const { dashboard, studentFeeRecords, pendingPayments } = accountsData

  const recentTransactions = studentFeeRecords.slice(0, 5)

  const columns = [
    { header: 'Register No', field: 'registerNo' },
    { header: 'Name', field: 'name' },
    { header: 'Department', field: 'department' },
    { header: 'Total Fee', render: (row) => `₹${row.totalFee.toLocaleString()}` },
    { header: 'Paid', render: (row) => `₹${row.paid.toLocaleString()}` },
    { header: 'Pending', render: (row) => `₹${row.pending.toLocaleString()}` }
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
          value={`₹${(dashboard.totalCollected / 100000).toFixed(1)}L`}
          icon="💰"
          color="green"
        />
        <Card
          title="Pending Fees"
          value={`₹${(dashboard.pendingFees / 100000).toFixed(1)}L`}
          icon="⏰"
          color="orange"
        />
        <Card
          title="Today's Collection"
          value={`₹${dashboard.todayCollection.toLocaleString()}`}
          icon="📈"
          color="blue"
        />
        <Card
          title="Total Students"
          value={dashboard.totalStudents}
          icon="👥"
          color="blue"
        />
      </div>

      <div className="grid grid-cols-2 mt-lg">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Recent Student Fee Records</h3>
          </div>
          <Table columns={columns} data={recentTransactions} />
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Pending Payments Verification</h3>
          </div>
          <div className="pending-verifications">
            {pendingPayments.map(payment => (
              <div key={payment.id} className="verification-item">
                <div className="flex justify-between">
                  <div>
                    <strong>{payment.name}</strong>
                    <small className="text-gray" style={{display: 'block'}}>{payment.registerNo}</small>
                  </div>
                  <span className="font-bold">₹{payment.amount.toLocaleString()}</span>
                </div>
                <small className="text-gray">Transaction: {payment.transactionId}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountsDashboard

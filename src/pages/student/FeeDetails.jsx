import { useState, useEffect } from 'react'
import Table from '../../components/Table'
import Card from '../../components/Card'
import { feeApi } from '../../services/api'
import './Student.css'

const FeeDetails = () => {
  const [fees, setFees] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    feeApi.getAll()
      .then(data => setFees(data))
      .catch(err => console.error('Fee details error:', err))
      .finally(() => setLoading(false))
  }, [])

  const totalAmount = fees.reduce((sum, fee) => sum + (fee.amount || 0), 0)

  const columns = [
    { header: 'Fee Type', field: 'feeType' },
    { header: 'Amount', render: (row) => `₹${row.amount?.toLocaleString()}` },
    { header: 'Department', field: 'department' },
    { header: 'Year', render: (row) => row.year || 'All' }
  ]

  if (loading) return <div className="page-container"><p>Loading fee details...</p></div>

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Fee Details</h2>
        <p className="page-subtitle">View your fee structure and payment status</p>
      </div>

      <div className="grid grid-cols-3">
        <Card title="Total Fee Types" value={fees.length} icon="📋" color="blue" />
        <Card title="Total Amount" value={`₹${totalAmount.toLocaleString()}`} icon="💰" color="green" />
      </div>

      <div className="card mt-lg">
        <div className="card-header">
          <h3 className="card-title">Fee Breakdown</h3>
        </div>
        <Table columns={columns} data={fees} />
      </div>
    </div>
  )
}

export default FeeDetails

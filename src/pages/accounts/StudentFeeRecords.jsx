import { useState } from 'react'
import Table from '../../components/Table'
import { accountsData } from '../../data/mockData'
import './Accounts.css'

const StudentFeeRecords = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const { studentFeeRecords } = accountsData

  const filteredRecords = studentFeeRecords.filter(record =>
    record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.registerNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const columns = [
    { header: 'Register No', field: 'registerNo' },
    { header: 'Name', field: 'name' },
    { header: 'Department', field: 'department' },
    { header: 'Year', field: 'year' },
    { header: 'Total Fee', render: (row) => `₹${row.totalFee.toLocaleString()}` },
    { header: 'Paid', render: (row) => `₹${row.paid.toLocaleString()}` },
    { 
      header: 'Pending', 
      render: (row) => (
        <span className={row.pending > 0 ? 'text-danger font-bold' : 'text-success font-bold'}>
          ₹{row.pending.toLocaleString()}
        </span>
      )
    }
  ]

  const actions = [
    {
      label: 'View Details',
      className: 'btn-primary',
      onClick: (row) => alert(`Viewing fee details for ${row.name}`)
    }
  ]

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Student Fee Records</h2>
        <p className="page-subtitle">Search and view student fee details</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">All Student Records</h3>
        </div>
        <Table
          columns={columns}
          data={filteredRecords}
          actions={actions}
          searchPlaceholder="Search by name, register number, or department..."
          onSearch={setSearchTerm}
        />
      </div>
    </div>
  )
}

export default StudentFeeRecords

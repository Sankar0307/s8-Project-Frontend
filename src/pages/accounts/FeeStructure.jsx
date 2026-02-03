import { useState } from 'react'
import Table from '../../components/Table'
import FormInput from '../../components/FormInput'
import { accountsData } from '../../data/mockData'
import './Accounts.css'

const FeeStructure = () => {
  const [feeStructures, setFeeStructures] = useState(accountsData.feeStructures)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    feeType: '',
    amount: '',
    year: '',
    department: '',
    semester: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newFee = {
      id: feeStructures.length + 1,
      ...formData
    }
    setFeeStructures([...feeStructures, newFee])
    setFormData({ feeType: '', amount: '', year: '', department: '', semester: '' })
    setShowForm(false)
    alert('Fee structure added successfully!')
  }

  const handleDelete = (row) => {
    if (confirm(`Delete ${row.feeType}?`)) {
      setFeeStructures(feeStructures.filter(f => f.id !== row.id))
      alert('Fee structure deleted!')
    }
  }

  const columns = [
    { header: 'Fee Type', field: 'feeType' },
    { header: 'Amount', render: (row) => `₹${row.amount.toLocaleString()}` },
    { header: 'Year', field: 'year' },
    { header: 'Department', field: 'department' },
    { header: 'Semester', field: 'semester' }
  ]

  const actions = [
    {
      label: 'Edit',
      className: 'btn-secondary',
      onClick: (row) => alert(`Edit ${row.feeType}`)
    },
    {
      label: 'Delete',
      className: 'btn-danger',
      onClick: handleDelete
    }
  ]

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="page-title">Fee Structure Management</h2>
            <p className="page-subtitle">Manage fee types and amounts</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn btn-primary"
          >
            {showForm ? 'Cancel' : '+ Add Fee Structure'}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="card mb-lg">
          <div className="card-header">
            <h3 className="card-title">Add New Fee Structure</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2">
              <FormInput
                label="Fee Type"
                type="text"
                name="feeType"
                value={formData.feeType}
                onChange={handleChange}
                required
              />
              <FormInput
                label="Amount"
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />
              <FormInput
                label="Year"
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="e.g. 1st Year or All"
                required
              />
              <FormInput
                label="Department"
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="e.g. CSE or All"
                required
              />
              <FormInput
                label="Semester"
                type="text"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                placeholder="e.g. 1st Semester or Both"
                required
              />
            </div>
            <button type="submit" className="btn btn-success mt-md">
              Add Fee Structure
            </button>
          </form>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Fee Structures</h3>
        </div>
        <Table columns={columns} data={feeStructures} actions={actions} />
      </div>
    </div>
  )
}

export default FeeStructure

import { useState, useEffect } from 'react'
import Table from '../../components/Table'
import FormInput from '../../components/FormInput'
import { feeApi } from '../../services/api'
import './Accounts.css'

const FeeStructure = () => {
  const [feeStructures, setFeeStructures] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    feeType: '',
    amount: '',
    year: '',
    department: ''
  })

  const loadFees = () => {
    feeApi.getAll()
      .then(data => setFeeStructures(data))
      .catch(err => console.error('Fee load error:', err))
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadFees() }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await feeApi.create({
        feeType: formData.feeType,
        amount: Number(formData.amount),
        year: Number(formData.year) || 1,
        department: formData.department
      })
      setFormData({ feeType: '', amount: '', year: '', department: '' })
      setShowForm(false)
      alert('Fee structure added successfully!')
      loadFees()
    } catch (err) {
      alert('Failed to add fee structure: ' + err.message)
    }
  }

  const columns = [
    { header: 'Fee Type', field: 'feeType' },
    { header: 'Amount', render: (row) => `₹${row.amount?.toLocaleString()}` },
    { header: 'Year', field: 'year' },
    { header: 'Department', field: 'department' }
  ]

  if (loading) return <div className="page-container"><p>Loading fee structures...</p></div>

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
                placeholder="e.g. 1 or 2"
                required
              />
              <FormInput
                label="Department"
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="e.g. Computer Science"
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
        <Table columns={columns} data={feeStructures} />
      </div>
    </div>
  )
}

export default FeeStructure

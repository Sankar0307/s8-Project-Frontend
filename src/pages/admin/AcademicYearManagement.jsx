import { useState } from 'react'
import Table from '../../components/Table'
import FormInput from '../../components/FormInput'
import { adminData } from '../../data/mockData'
import './Admin.css'

const AcademicYearManagement = () => {
  const [academicYears, setAcademicYears] = useState(adminData.academicYears)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    year: '',
    startDate: '',
    endDate: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newYear = {
      id: academicYears.length + 1,
      ...formData,
      isActive: false
    }
    setAcademicYears([...academicYears, newYear])
    setFormData({ year: '', startDate: '', endDate: '' })
    setShowForm(false)
    alert('Academic year added successfully!')
  }

  const handleSetActive = (row) => {
    setAcademicYears(academicYears.map(year => ({
      ...year,
      isActive: year.id === row.id
    })))
    alert(`${row.year} set as active academic year!`)
  }

  const handleDelete = (row) => {
    if (row.isActive) {
      alert('Cannot delete active academic year!')
      return
    }
    if (confirm(`Delete academic year ${row.year}?`)) {
      setAcademicYears(academicYears.filter(y => y.id !== row.id))
      alert('Academic year deleted!')
    }
  }

  const columns = [
    { header: 'Academic Year', field: 'year' },
    { header: 'Start Date', field: 'startDate' },
    { header: 'End Date', field: 'endDate' },
    { 
      header: 'Status', 
      render: (row) => (
        <span className={`badge badge-${row.isActive ? 'success' : 'info'}`}>
          {row.isActive ? 'Active' : 'Inactive'}
        </span>
      )
    }
  ]

  const actions = [
    {
      label: 'Set Active',
      className: 'btn-success',
      onClick: handleSetActive
    },
    {
      label: 'Edit',
      className: 'btn-secondary',
      onClick: (row) => alert(`Edit ${row.year}`)
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
            <h2 className="page-title">Academic Year Management</h2>
            <p className="page-subtitle">Manage academic years and set active year</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn btn-primary"
          >
            {showForm ? 'Cancel' : '+ Add Academic Year'}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="card mb-lg">
          <div className="card-header">
            <h3 className="card-title">Add New Academic Year</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3">
              <FormInput
                label="Academic Year"
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="e.g., 2024-2025"
                required
              />
              <FormInput
                label="Start Date"
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
              <FormInput
                label="End Date"
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-success mt-md">
              Add Academic Year
            </button>
          </form>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">All Academic Years</h3>
        </div>
        <Table columns={columns} data={academicYears} actions={actions} />
      </div>
    </div>
  )
}

export default AcademicYearManagement

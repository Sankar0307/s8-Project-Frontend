import { useState } from 'react'
import Table from '../../components/Table'
import FormInput from '../../components/FormInput'
import { adminData } from '../../data/mockData'
import './Admin.css'

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState(adminData.departments)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    hod: '',
    established: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newDept = {
      id: departments.length + 1,
      ...formData,
      totalStudents: 0
    }
    setDepartments([...departments, newDept])
    setFormData({ code: '', name: '', hod: '', established: '' })
    setShowForm(false)
    alert('Department added successfully!')
  }

  const handleDelete = (row) => {
    if (confirm(`Delete department ${row.name}?`)) {
      setDepartments(departments.filter(d => d.id !== row.id))
      alert('Department deleted!')
    }
  }

  const columns = [
    { header: 'Code', field: 'code' },
    { header: 'Department Name', field: 'name' },
    { header: 'HOD', field: 'hod' },
    { header: 'Total Students', field: 'totalStudents' },
    { header: 'Established', field: 'established' }
  ]

  const actions = [
    {
      label: 'Edit',
      className: 'btn-secondary',
      onClick: (row) => alert(`Edit ${row.name}`)
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
            <h2 className="page-title">Department Management</h2>
            <p className="page-subtitle">Manage college departments</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn btn-primary"
          >
            {showForm ? 'Cancel' : '+ Add Department'}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="card mb-lg">
          <div className="card-header">
            <h3 className="card-title">Add New Department</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2">
              <FormInput
                label="Department Code"
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="e.g., CSE, ECE"
                required
              />
              <FormInput
                label="Department Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <FormInput
                label="Head of Department"
                type="text"
                name="hod"
                value={formData.hod}
                onChange={handleChange}
                required
              />
              <FormInput
                label="Established Year"
                type="text"
                name="established"
                value={formData.established}
                onChange={handleChange}
                placeholder="e.g., 2010"
                required
              />
            </div>
            <button type="submit" className="btn btn-success mt-md">
              Add Department
            </button>
          </form>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">All Departments</h3>
        </div>
        <Table columns={columns} data={departments} actions={actions} />
      </div>
    </div>
  )
}

export default DepartmentManagement

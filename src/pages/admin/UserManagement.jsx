import { useState } from 'react'
import Table from '../../components/Table'
import FormInput from '../../components/FormInput'
import { adminData } from '../../data/mockData'
import './Admin.css'

const UserManagement = () => {
  const [users, setUsers] = useState(adminData.users)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    registerNo: '',
    role: '',
    department: '',
    email: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newUser = {
      id: users.length + 1,
      ...formData,
      status: 'Active'
    }
    setUsers([...users, newUser])
    setFormData({ name: '', registerNo: '', role: '', department: '', email: '' })
    setShowForm(false)
    alert('User added successfully!')
  }

  const handleDelete = (row) => {
    if (confirm(`Delete user ${row.name}?`)) {
      setUsers(users.filter(u => u.id !== row.id))
      alert('User deleted!')
    }
  }

  const columns = [
    { header: 'Name', field: 'name' },
    { header: 'Register/Staff No', field: 'registerNo' },
    { header: 'Role', field: 'role' },
    { header: 'Department', field: 'department' },
    { header: 'Email', field: 'email' },
    { 
      header: 'Status', 
      render: (row) => (
        <span className={`badge badge-${row.status === 'Active' ? 'success' : 'danger'}`}>
          {row.status}
        </span>
      )
    }
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

  const roleOptions = [
    { value: 'Student', label: 'Student' },
    { value: 'Accounts Staff', label: 'Accounts Staff' },
    { value: 'TC Admin', label: 'TC Admin' },
    { value: 'System Admin', label: 'System Admin' }
  ]

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="page-title">User Management</h2>
            <p className="page-subtitle">Manage system users and roles</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn btn-primary"
          >
            {showForm ? 'Cancel' : '+ Add User'}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="card mb-lg">
          <div className="card-header">
            <h3 className="card-title">Add New User</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2">
              <FormInput
                label="Full Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <FormInput
                label="Register/Staff Number"
                type="text"
                name="registerNo"
                value={formData.registerNo}
                onChange={handleChange}
                required
              />
              <FormInput
                label="Role"
                type="select"
                name="role"
                value={formData.role}
                onChange={handleChange}
                options={roleOptions}
                required
              />
              <FormInput
                label="Department"
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              />
              <FormInput
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-success mt-md">
              Add User
            </button>
          </form>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">All Users</h3>
        </div>
        <Table 
          columns={columns} 
          data={users} 
          actions={actions}
          searchPlaceholder="Search users..."
        />
      </div>
    </div>
  )
}

export default UserManagement

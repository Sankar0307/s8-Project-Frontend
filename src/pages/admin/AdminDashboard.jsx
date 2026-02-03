import Card from '../../components/Card'
import { adminData } from '../../data/mockData'
import './Admin.css'

const AdminDashboard = () => {
  const { dashboard, users, departments } = adminData

  const recentUsers = users.slice(0, 5)

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">System Admin Dashboard</h2>
        <p className="page-subtitle">System overview and management</p>
      </div>

      <div className="grid grid-cols-4">
        <Card
          title="Total Users"
          value={dashboard.totalUsers}
          icon="👥"
          color="blue"
        />
        <Card
          title="Active Students"
          value={dashboard.activeStudents}
          icon="🎓"
          color="green"
        />
        <Card
          title="Staff Members"
          value={dashboard.staffCount}
          icon="👨‍💼"
          color="orange"
        />
        <Card
          title="Transactions"
          value={dashboard.totalTransactions}
          icon="💳"
          color="blue"
        />
      </div>

      <div className="grid grid-cols-2 mt-lg">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Recent Users</h3>
          </div>
          <div className="user-list">
            {recentUsers.map(user => (
              <div key={user.id} className="user-item">
                <div className="user-avatar-small">
                  {user.name.charAt(0)}
                </div>
                <div className="user-info-small">
                  <strong>{user.name}</strong>
                  <small className="text-gray">{user.role} - {user.department}</small>
                </div>
                <span className={`badge badge-${user.status === 'Active' ? 'success' : 'danger'}`}>
                  {user.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Departments Overview</h3>
          </div>
          <div className="dept-list">
            {departments.map(dept => (
              <div key={dept.id} className="dept-item">
                <div className="flex justify-between">
                  <strong>{dept.name}</strong>
                  <span className="badge badge-info">{dept.totalStudents} Students</span>
                </div>
                <small className="text-gray">HOD: {dept.hod}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

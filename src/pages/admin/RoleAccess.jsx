import Table from '../../components/Table'
import { adminData } from '../../data/mockData'
import './Admin.css'

const RoleAccess = () => {
  const { rolePermissions } = adminData

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Roles & Access Control</h2>
        <p className="page-subtitle">View role-based permissions</p>
      </div>

      <div className="permissions-grid">
        {rolePermissions.map((roleData, index) => (
          <div key={index} className="card">
            <div className="card-header">
              <h3 className="card-title">{roleData.role}</h3>
            </div>
            <div className="permissions-list">
              {roleData.permissions.map((permission, pIndex) => (
                <div key={pIndex} className="permission-item">
                  <span className="permission-icon">✓</span>
                  <span>{permission}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="alert alert-info mt-lg">
        ℹ️ Role permissions are view-only. Contact system administrator to modify permissions.
      </div>
    </div>
  )
}

export default RoleAccess

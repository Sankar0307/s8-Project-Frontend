import { useAuth } from '../context/AuthContext'
import './Topbar.css'

const Topbar = ({ title }) => {
  const { user, role } = useAuth()

  const roleLabels = {
    student: 'Student',
    accounts: 'Accounts Staff',
    tcadmin: 'TC Admin',
    admin: 'System Admin'
  }

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1 className="topbar-title">{title}</h1>
      </div>
      
      <div className="topbar-right">
        <div className="topbar-notifications">
          <span className="notification-icon"></span>
        </div>
        
        <div className="topbar-user">
          <div className="user-info">
            <span className="user-name">{user?.name || 'User'}</span>
            <span className="user-role badge badge-info">{roleLabels[role]}</span>
          </div>
          <div className="user-avatar">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Topbar

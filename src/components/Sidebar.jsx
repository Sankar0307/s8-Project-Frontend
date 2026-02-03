import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Sidebar.css'

const Sidebar = () => {
  const { role, logout } = useAuth()
  const location = useLocation()

  const menuItems = {
    student: [
      { path: '/student/dashboard', label: 'Dashboard', icon: '📊' },
      { path: '/student/profile', label: 'Profile', icon: '👤' },
      { path: '/student/fee-details', label: 'Fee Details', icon: '💰' },
      { path: '/student/payment', label: 'Pay Fees', icon: '💳' },
      { path: '/student/payment-history', label: 'Payment History', icon: '📜' },
      { path: '/student/apply-tc', label: 'Apply TC', icon: '📝' },
      { path: '/student/tc-status', label: 'TC Status', icon: '🔍' },
      { path: '/student/download-tc', label: 'Download TC', icon: '⬇️' },
      { path: '/student/apply-bonafide', label: 'Apply Bonafide', icon: '📄' },
      { path: '/student/bonafide-status', label: 'Bonafide Status', icon: '🔎' },
      { path: '/student/download-bonafide', label: 'Download Bonafide', icon: '📥' },
      { path: '/student/fee-structure', label: 'Detailed Fee Structure', icon: '💵' }
    ],
    accounts: [
      { path: '/accounts/dashboard', label: 'Dashboard', icon: '📊' },
      { path: '/accounts/fee-structure', label: 'Fee Structure', icon: '🏗️' },
      { path: '/accounts/student-records', label: 'Student Records', icon: '📋' },
      { path: '/accounts/verify-payments', label: 'Verify Payments', icon: '✅' },
      { path: '/accounts/reports', label: 'Reports', icon: '📈' }
    ],
    tcadmin: [
      { path: '/tcadmin/dashboard', label: 'Dashboard', icon: '📊' },
      { path: '/tcadmin/requests', label: 'TC Requests', icon: '📨' },
      { path: '/tcadmin/approve', label: 'Approve/Reject', icon: '⚖️' },
      { path: '/tcadmin/generate', label: 'Generate TC', icon: '📄' },
      { path: '/tcadmin/history', label: 'TC History', icon: '📚' },
      { path: '/tcadmin/bonafide-requests', label: 'Bonafide Requests', icon: '📋' }
    ],
    admin: [
      { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
      { path: '/admin/users', label: 'User Management', icon: '👥' },
      { path: '/admin/departments', label: 'Departments', icon: '🏢' },
      { path: '/admin/academic-years', label: 'Academic Years', icon: '📅' },
      { path: '/admin/roles', label: 'Roles & Access', icon: '🔐' }
    ]
  }

  const handleLogout = () => {
    logout()
    window.location.href = '/'
  }

  const currentMenu = menuItems[role] || []

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-logo">🎓 Andaman College</h2>
        <p className="sidebar-subtitle">Academic Management</p>
      </div>

      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {currentMenu.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="sidebar-icon">{item.icon}</span>
                <span className="sidebar-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="btn-logout">
          <span className="sidebar-icon">🚪</span>
          <span className="sidebar-label">Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar

import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import './DashboardLayout.css'

const DashboardLayout = ({ title }) => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Topbar title={title} />
        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout

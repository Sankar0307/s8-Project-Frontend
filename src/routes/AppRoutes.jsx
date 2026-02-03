import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Auth Pages
import Login from '../pages/auth/Login'
import ForgotPassword from '../pages/auth/ForgotPassword'

// Student Pages
import StudentDashboard from '../pages/student/StudentDashboard'
import StudentProfile from '../pages/student/StudentProfile'
import FeeDetails from '../pages/student/FeeDetails'
import FeePayment from '../pages/student/FeePayment'
import PaymentHistory from '../pages/student/PaymentHistory'
import ApplyTC from '../pages/student/ApplyTC'
import TCStatus from '../pages/student/TCStatus'
import DownloadTC from '../pages/student/DownloadTC'
import ApplyBonafide from '../pages/student/ApplyBonafide'
import BonafideStatus from '../pages/student/BonafideStatus'
import DownloadBonafide from '../pages/student/DownloadBonafide'
import FeeStructureDetails from '../pages/student/FeeStructureDetails'

// Accounts Pages
import AccountsDashboard from '../pages/accounts/AccountsDashboard'
import FeeStructure from '../pages/accounts/FeeStructure'
import StudentFeeRecords from '../pages/accounts/StudentFeeRecords'
import VerifyPayments from '../pages/accounts/VerifyPayments'
import Reports from '../pages/accounts/Reports'

// TC Admin Pages
import TCAdminDashboard from '../pages/tcAdmin/TCAdminDashboard'
import TCRequestList from '../pages/tcAdmin/TCRequestList'
import ApproveTCRequest from '../pages/tcAdmin/ApproveTCRequest'
import GenerateTC from '../pages/tcAdmin/GenerateTC'
import TCHistory from '../pages/tcAdmin/TCHistory'
import BonafideRequestList from '../pages/tcAdmin/BonafideRequestList'
import ApproveBonafide from '../pages/tcAdmin/ApproveBonafide'

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard'
import UserManagement from '../pages/admin/UserManagement'
import DepartmentManagement from '../pages/admin/DepartmentManagement'
import AcademicYearManagement from '../pages/admin/AcademicYearManagement'
import RoleAccess from '../pages/admin/RoleAccess'

import DashboardLayout from '../layouts/DashboardLayout'

/* ------------------ Protected Route ------------------ */

const ProtectedRoute = ({ children, allowedRole }) => {
  const { isAuthenticated, role, loading } = useAuth()

  if (loading) {
    return <div style={{ padding: 40 }}>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to={`/${role}/dashboard`} replace />
  }

  return children
}


/* ------------------ App Routes ------------------ */

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* ================= STUDENT ================= */}
      <Route
        path="/student/*"
        element={
          <ProtectedRoute allowedRole="student">
            <DashboardLayout title="Student Portal" />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="fee-details" element={<FeeDetails />} />
        <Route path="payment" element={<FeePayment />} />
        <Route path="payment-history" element={<PaymentHistory />} />
        <Route path="apply-tc" element={<ApplyTC />} />
        <Route path="tc-status" element={<TCStatus />} />
        <Route path="download-tc" element={<DownloadTC />} />
        <Route path="apply-bonafide" element={<ApplyBonafide />} />
        <Route path="bonafide-status" element={<BonafideStatus />} />
        <Route path="download-bonafide" element={<DownloadBonafide />} />
        <Route path="fee-structure" element={<FeeStructureDetails />} />
      </Route>

      {/* ================= ACCOUNTS ================= */}
      <Route
        path="/accounts/*"
        element={
          <ProtectedRoute allowedRole="accounts">
            <DashboardLayout title="Accounts Portal" />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AccountsDashboard />} />
        <Route path="fee-structure" element={<FeeStructure />} />
        <Route path="student-records" element={<StudentFeeRecords />} />
        <Route path="verify-payments" element={<VerifyPayments />} />
        <Route path="reports" element={<Reports />} />
      </Route>

      {/* ================= TC ADMIN ================= */}
      <Route
        path="/tcadmin/*"
        element={
          <ProtectedRoute allowedRole="tcadmin">
            <DashboardLayout title="TC Admin Portal" />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<TCAdminDashboard />} />
        <Route path="requests" element={<TCRequestList />} />
        <Route path="approve" element={<ApproveTCRequest />} />
        <Route path="generate" element={<GenerateTC />} />
        <Route path="history" element={<TCHistory />} />
        <Route path="bonafide-requests" element={<BonafideRequestList />} />
        <Route path="approve-bonafide" element={<ApproveBonafide />} />
      </Route>

      {/* ================= SYSTEM ADMIN ================= */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRole="admin">
            <DashboardLayout title="System Admin Portal" />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="departments" element={<DepartmentManagement />} />
        <Route path="academic-years" element={<AcademicYearManagement />} />
        <Route path="roles" element={<RoleAccess />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes

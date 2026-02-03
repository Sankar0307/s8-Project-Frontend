// Mock data for the entire application

// Student Mock Data
export const studentData = {
  profile: {
    name: 'Rajesh Kumar',
    registerNumber: 'AC2021001',
    department: 'Computer Science',
    year: '3rd Year',
    email: 'rajesh.kumar@andaman.edu',
    phone: '+91 9876543210',
    admissionDate: '2021-07-15',
    bloodGroup: 'O+'
  },

  feeDetails: [
    { id: 1, feeType: 'Tuition Fee', amount: 45000, paid: 45000, due: 0, dueDate: '2024-07-15', status: 'Paid' },
    { id: 2, feeType: 'Lab Fee', amount: 5000, paid: 5000, due: 0, dueDate: '2024-07-15', status: 'Paid' },
    { id: 3, feeType: 'Library Fee', amount: 2000, paid: 2000, due: 0, dueDate: '2024-07-15', status: 'Paid' },
    { id: 4, feeType: 'Sports Fee', amount: 1500, paid: 0, due: 1500, dueDate: '2024-12-15', status: 'Pending' },
    { id: 5, feeType: 'Exam Fee', amount: 3000, paid: 0, due: 3000, dueDate: '2024-12-30', status: 'Pending' }
  ],

  paymentHistory: [
    { id: 1, date: '2024-07-10', feeType: 'Tuition Fee', amount: 45000, method: 'Net Banking', transactionId: 'TXN123456789', status: 'Success' },
    { id: 2, date: '2024-07-10', feeType: 'Lab Fee', amount: 5000, method: 'UPI', transactionId: 'TXN123456790', status: 'Success' },
    { id: 3, date: '2024-07-12', feeType: 'Library Fee', amount: 2000, method: 'Credit Card', transactionId: 'TXN123456791', status: 'Success' }
  ],

  tcRequest: {
    id: 1,
    status: 'Approved',
    reason: 'Higher studies abroad',
    appliedDate: '2024-11-20',
    approvedDate: '2024-11-25',
    remarks: 'All dues cleared. TC approved.'
  },

  bonafideRequests: [
    { id: 1, requestId: 'BF2024001', appliedDate: '2024-11-15', bonafideType: 'With Fee Structure', reason: 'Bank loan application', status: 'Approved', approvedDate: '2024-11-18' },
    { id: 2, requestId: 'BF2024002', appliedDate: '2024-12-01', bonafideType: 'Without Fee Structure', reason: 'Passport application', status: 'Pending' },
    { id: 3, requestId: 'BF2024003', appliedDate: '2024-10-20', bonafideType: 'With Fee Structure', reason: 'Scholarship verification', status: 'Rejected', rejectionRemark: 'Incomplete documents' }
  ],

  feeStructure: {
    academicYear: '2024-2025',
    fees: [
      { type: 'Tuition Fee', amount: 45000 },
      { type: 'Exam Fee', amount: 3000 },
      { type: 'Library Fee', amount: 2000 },
      { type: 'Lab Fee', amount: 5000 },
      { type: 'Sports Fee', amount: 1500 },
      { type: 'Other Charges', amount: 1000 }
    ],
    total: 57500
  }
}

// Accounts Staff Mock Data
export const accountsData = {
  dashboard: {
    totalCollected: 2450000,
    pendingFees: 175000,
    todayCollection: 15000,
    totalStudents: 150
  },

  feeStructures: [
    { id: 1, feeType: 'Tuition Fee', amount: 45000, year: '1st Year', department: 'Computer Science', semester: 'Both' },
    { id: 2, feeType: 'Tuition Fee', amount: 42000, year: '1st Year', department: 'Electronics', semester: 'Both' },
    { id: 3, feeType: 'Lab Fee', amount: 5000, year: 'All', department: 'Computer Science', semester: 'Both' },
    { id: 4, feeType: 'Library Fee', amount: 2000, year: 'All', department: 'All', semester: 'Both' },
    { id: 5, feeType: 'Sports Fee', amount: 1500, year: 'All', department: 'All', semester: 'Both' },
    { id: 6, feeType: 'Exam Fee', amount: 3000, year: 'All', department: 'All', semester: 'Both' }
  ],

  studentFeeRecords: [
    { id: 1, registerNo: 'AC2021001', name: 'Rajesh Kumar', department: 'CSE', year: '3rd', totalFee: 56500, paid: 52000, pending: 4500 },
    { id: 2, registerNo: 'AC2021002', name: 'Priya Sharma', department: 'ECE', year: '3rd', totalFee: 53500, paid: 53500, pending: 0 },
    { id: 3, registerNo: 'AC2022010', name: 'Amit Patel', department: 'CSE', year: '2nd', totalFee: 56500, paid: 40000, pending: 16500 },
    { id: 4, registerNo: 'AC2022015', name: 'Sneha Reddy', department: 'MECH', year: '2nd', totalFee: 48500, paid: 48500, pending: 0 },
    { id: 5, registerNo: 'AC2023001', name: 'Karthik Iyer', department: 'CSE', year: '1st', totalFee: 56500, paid: 30000, pending: 26500 }
  ],

  pendingPayments: [
    { id: 1, registerNo: 'AC2021001', name: 'Rajesh Kumar', amount: 4500, date: '2024-11-28', method: 'UPI', transactionId: 'TXN789012', status: 'Pending' },
    { id: 2, registerNo: 'AC2022010', name: 'Amit Patel', amount: 16500, date: '2024-11-29', method: 'Net Banking', transactionId: 'TXN789013', status: 'Pending' },
    { id: 3, registerNo: 'AC2023001', name: 'Karthik Iyer', amount: 26500, date: '2024-11-30', method: 'Credit Card', transactionId: 'TXN789014', status: 'Pending' }
  ],

  departmentReports: [
    { department: 'Computer Science', totalStudents: 60, totalFee: 3390000, collected: 2600000, pending: 790000 },
    { department: 'Electronics', totalStudents: 45, totalFee: 2407500, collected: 1950000, pending: 457500 },
    { department: 'Mechanical', totalStudents: 30, totalFee: 1455000, collected: 1200000, pending: 255000 },
    { department: 'Civil', totalStudents: 15, totalFee: 697500, collected: 600000, pending: 97500 }
  ],

  yearReports: [
    { year: '1st Year', totalStudents: 50, totalFee: 2825000, collected: 1800000, pending: 1025000 },
    { year: '2nd Year', totalStudents: 50, totalFee: 2825000, collected: 2300000, pending: 525000 },
    { year: '3rd Year', totalStudents: 40, totalFee: 2260000, collected: 2100000, pending: 160000 },
    { year: '4th Year', totalStudents: 10, totalFee: 565000, collected: 565000, pending: 0 }
  ]
}

// TC Admin Mock Data
export const tcData = {
  dashboard: {
    pendingRequests: 3,
    approvedCount: 12,
    rejectedCount: 2,
    totalRequests: 17
  },

  tcRequests: [
    { id: 1, registerNo: 'AC2021001', name: 'Rajesh Kumar', department: 'CSE', year: '3rd', appliedDate: '2024-11-20', status: 'Approved', reason: 'Higher studies abroad' },
    { id: 2, registerNo: 'AC2022015', name: 'Sneha Reddy', department: 'MECH', year: '2nd', appliedDate: '2024-11-25', status: 'Pending', reason: 'Family relocation' },
    { id: 3, registerNo: 'AC2021050', name: 'Vikram Singh', department: 'ECE', year: '3rd', appliedDate: '2024-11-28', status: 'Pending', reason: 'Personal reasons' },
    { id: 4, registerNo: 'AC2020010', name: 'Anjali Nair', department: 'CSE', year: '4th', appliedDate: '2024-10-15', status: 'Rejected', reason: 'Invalid reason provided' },
    { id: 5, registerNo: 'AC2023025', name: 'Rohan Gupta', department: 'CIVIL', year: '1st', appliedDate: '2024-11-30', status: 'Pending', reason: 'College transfer' }
  ],

  tcHistory: [
    { id: 1, registerNo: 'AC2021001', name: 'Rajesh Kumar', department: 'CSE', issuedDate: '2024-11-25', tcNumber: 'TC2024001' },
    { id: 2, registerNo: 'AC2020005', name: 'Meera Krishnan', department: 'ECE', issuedDate: '2024-10-10', tcNumber: 'TC2024002' },
    { id: 3, registerNo: 'AC2020012', name: 'Suresh Babu', department: 'MECH', issuedDate: '2024-09-15', tcNumber: 'TC2024003' }
  ],
  
  bonafideRequests: [
    { id: 1, registerNo: 'AC2021001', name: 'Rajesh Kumar', department: 'CSE', year: '3rd', appliedDate: '2024-11-15', bonafideType: 'With Fee Structure', reason: 'Bank loan application', status: 'Approved', approvedDate: '2024-11-18' },
    { id: 2, registerNo: 'AC2022015', name: 'Sneha Reddy', department: 'MECH', year: '2nd', appliedDate: '2024-12-01', bonafideType: 'Without Fee Structure', reason: 'Passport application', status: 'Pending' },
    { id: 3, registerNo: 'AC2021050', name: 'Vikram Singh', department: 'ECE', year: '3rd', appliedDate: '2024-11-28', bonafideType: 'With Fee Structure', reason: 'Scholarship verification', status: 'Pending' },
    { id: 4, registerNo: 'AC2023025', name: 'Rohan Gupta', department: 'CIVIL', year: '1st', appliedDate: '2024-10-20', bonafideType: 'Without Fee Structure', reason: 'Visa application', status: 'Rejected', rejectionRemark: 'Incomplete documents' },
    { id: 5, registerNo: 'AC2022010', name: 'Amit Patel', department: 'CSE', year: '2nd', appliedDate: '2024-12-05', bonafideType: 'With Fee Structure', reason: 'Education loan', status: 'Pending' }
  ]
}

// System Admin Mock Data
export const adminData = {
  dashboard: {
    totalUsers: 165,
    activeStudents: 150,
    staffCount: 15,
    totalTransactions: 450
  },

  users: [
    { id: 1, name: 'Rajesh Kumar', registerNo: 'AC2021001', role: 'Student', department: 'CSE', email: 'rajesh@andaman.edu', status: 'Active' },
    { id: 2, name: 'Dr. Sunita Verma', registerNo: 'STAFF001', role: 'Accounts Staff', department: 'Accounts', email: 'sunita@andaman.edu', status: 'Active' },
    { id: 3, name: 'Mr. Prakash Rao', registerNo: 'STAFF002', role: 'TC Admin', department: 'Administration', email: 'prakash@andaman.edu', status: 'Active' },
    { id: 4, name: 'Priya Sharma', registerNo: 'AC2021002', role: 'Student', department: 'ECE', email: 'priya@andaman.edu', status: 'Active' },
    { id: 5, name: 'Dr. Admin User', registerNo: 'ADMIN001', role: 'System Admin', department: 'IT', email: 'admin@andaman.edu', status: 'Active' }
  ],

  departments: [
    { id: 1, code: 'CSE', name: 'Computer Science & Engineering', hod: 'Dr. Ramesh Kumar', totalStudents: 60, established: '2010' },
    { id: 2, code: 'ECE', name: 'Electronics & Communication Engineering', hod: 'Dr. Lakshmi Devi', totalStudents: 45, established: '2010' },
    { id: 3, code: 'MECH', name: 'Mechanical Engineering', hod: 'Dr. Sunil Patil', totalStudents: 30, established: '2012' },
    { id: 4, code: 'CIVIL', name: 'Civil Engineering', hod: 'Dr. Arun Joshi', totalStudents: 15, established: '2015' }
  ],

  academicYears: [
    { id: 1, year: '2024-2025', startDate: '2024-07-01', endDate: '2025-06-30', isActive: true },
    { id: 2, year: '2023-2024', startDate: '2023-07-01', endDate: '2024-06-30', isActive: false },
    { id: 3, year: '2022-2023', startDate: '2022-07-01', endDate: '2023-06-30', isActive: false }
  ],

  rolePermissions: [
    { role: 'Student', permissions: ['View Profile', 'Pay Fees', 'Apply TC', 'View Payment History'] },
    { role: 'Accounts Staff', permissions: ['Manage Fee Structure', 'Verify Payments', 'View Reports', 'Manage Student Fees'] },
    { role: 'TC Admin', permissions: ['View TC Requests', 'Approve/Reject TC', 'Generate TC', 'View TC History'] },
    { role: 'System Admin', permissions: ['Manage Users', 'Manage Departments', 'Manage Academic Years', 'View All Reports', 'System Configuration'] }
  ]
}

// Mock users for login
export const mockUsers = {
  student: { username: 'student', password: 'student123', role: 'student', data: studentData.profile },
  accounts: { username: 'accounts', password: 'accounts123', role: 'accounts', data: { name: 'Dr. Sunita Verma' } },
  tcadmin: { username: 'tcadmin', password: 'tcadmin123', role: 'tcadmin', data: { name: 'Mr. Prakash Rao' } },
  admin: { username: 'admin', password: 'admin123', role: 'admin', data: { name: 'Dr. Admin User' } }
}

// Helper function to get data by role
export const getDataByRole = (role) => {
  switch (role) {
    case 'student':
      return studentData
    case 'accounts':
      return accountsData
    case 'tcadmin':
      return tcData
    case 'admin':
      return adminData
    default:
      return null
  }
}

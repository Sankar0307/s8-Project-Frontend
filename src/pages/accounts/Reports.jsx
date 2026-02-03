import Table from '../../components/Table'
import { accountsData } from '../../data/mockData'
import './Accounts.css'

const Reports = () => {
  const { departmentReports, yearReports } = accountsData

  const deptColumns = [
    { header: 'Department', field: 'department' },
    { header: 'Total Students', field: 'totalStudents' },
    { header: 'Total Fee', render: (row) => `₹${(row.totalFee / 100000).toFixed(1)}L` },
    { header: 'Collected', render: (row) => `₹${(row.collected / 100000).toFixed(1)}L` },
    { 
      header: 'Pending', 
      render: (row) => (
        <span className="text-danger font-bold">₹{(row.pending / 100000).toFixed(1)}L</span>
      )
    },
    { 
      header: 'Collection %', 
      render: (row) => (
        <span className={row.collected / row.totalFee >= 0.8 ? 'text-success font-bold' : 'text-warning font-bold'}>
          {((row.collected / row.totalFee) * 100).toFixed(1)}%
        </span>
      )
    }
  ]

  const yearColumns = [
    { header: 'Year', field: 'year' },
    { header: 'Total Students', field: 'totalStudents' },
    { header: 'Total Fee', render: (row) => `₹${(row.totalFee / 100000).toFixed(1)}L` },
    { header: 'Collected', render: (row) => `₹${(row.collected / 100000).toFixed(1)}L` },
    { 
      header: 'Pending', 
      render: (row) => (
        <span className="text-danger font-bold">₹${(row.pending / 100000).toFixed(1)}L</span>
      )
    },
    { 
      header: 'Collection %', 
      render: (row) => (
        <span className={row.collected / row.totalFee >= 0.8 ? 'text-success font-bold' : 'text-warning font-bold'}>
          {((row.collected / row.totalFee) * 100).toFixed(1)}%
        </span>
      )
    }
  ]

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="page-title">Fee Collection Reports</h2>
            <p className="page-subtitle">Department-wise and year-wise fee collection summary</p>
          </div>
          <button className="btn btn-primary" onClick={() => alert('Exporting report...')}>
            📊 Export Report
          </button>
        </div>
      </div>

      <div className="card mb-lg">
        <div className="card-header">
          <h3 className="card-title">Department-wise Collection Report</h3>
        </div>
        <Table columns={deptColumns} data={departmentReports} />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Year-wise Collection Report</h3>
        </div>
        <Table columns={yearColumns} data={yearReports} />
      </div>
    </div>
  )
}

export default Reports

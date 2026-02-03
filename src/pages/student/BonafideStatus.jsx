import { Link } from 'react-router-dom'
import Table from '../../components/Table'
import { studentData } from '../../data/mockData'
import './Student.css'

const BonafideStatus = () => {
  const { bonafideRequests } = studentData

  const columns = [
    { header: 'Request ID', field: 'requestId' },
    { header: 'Applied Date', field: 'appliedDate' },
    { header: 'Bonafide Type', field: 'bonafideType' },
    { header: 'Reason', field: 'reason' },
    { 
      header: 'Status', 
      render: (row) => (
        <span className={`badge badge-${row.status === 'Approved' ? 'success' : row.status === 'Pending' ? 'warning' : 'danger'}`}>
          {row.status}
        </span>
      )
    },
    {
      header: 'Action',
      render: (row) => {
        if (row.status === 'Approved') {
          return (
            <Link to="/student/download-bonafide" className="btn btn-success btn-sm">
              Download Bonafide
            </Link>
          )
        } else if (row.status === 'Rejected') {
          return (
            <span className="text-sm text-gray" title={row.rejectionRemark}>
              {row.rejectionRemark}
            </span>
          )
        } else {
          return <span className="text-sm text-gray">Processing...</span>
        }
      }
    }
  ]

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Bonafide Certificate Status</h2>
        <p className="page-subtitle">Track your bonafide certificate requests</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">My Bonafide Requests</h3>
        </div>
        <Table columns={columns} data={bonafideRequests} />
      </div>
    </div>
  )
}

export default BonafideStatus

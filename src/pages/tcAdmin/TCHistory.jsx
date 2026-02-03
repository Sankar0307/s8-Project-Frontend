import Table from '../../components/Table'
import { tcData } from '../../data/mockData'
import './TCAdmin.css'

const TCHistory = () => {
  const { tcHistory } = tcData

  const columns = [
    { header: 'TC Number', field: 'tcNumber' },
    { header: 'Register No', field: 'registerNo' },
    { header: 'Name', field: 'name' },
    { header: 'Department', field: 'department' },
    { header: 'Issued Date', field: 'issuedDate' }
  ]

  const actions = [
    {
      label: 'View TC',
      className: 'btn-primary',
      onClick: (row) => alert(`Viewing TC for ${row.name}`)
    },
    {
      label: 'Download',
      className: 'btn-secondary',
      onClick: (row) => alert(`Downloading TC ${row.tcNumber}`)
    },
    {
      label: 'Print',
      className: 'btn-secondary',
      onClick: (row) => alert(`Printing TC ${row.tcNumber}`)
    }
  ]

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">TC History</h2>
        <p className="page-subtitle">View all issued transfer certificates</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Issued Transfer Certificates</h3>
        </div>
        <Table 
          columns={columns} 
          data={tcHistory} 
          actions={actions}
          searchPlaceholder="Search by TC number, register number, or name..."
        />
      </div>
    </div>
  )
}

export default TCHistory

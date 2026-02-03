import { studentData } from '../../data/mockData'
import './Student.css'

const StudentProfile = () => {
  const { profile } = studentData

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">My Profile</h2>
        <p className="page-subtitle">View your personal and academic information</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Personal Information</h3>
        </div>
        
        <div className="profile-grid">
          <div className="profile-field">
            <label className="field-label">Full Name</label>
            <p className="field-value">{profile.name}</p>
          </div>
          
          <div className="profile-field">
            <label className="field-label">Register Number</label>
            <p className="field-value">{profile.registerNumber}</p>
          </div>
          
          <div className="profile-field">
            <label className="field-label">Department</label>
            <p className="field-value">{profile.department}</p>
          </div>
          
          <div className="profile-field">
            <label className="field-label">Year</label>
            <p className="field-value">{profile.year}</p>
          </div>
          
          <div className="profile-field">
            <label className="field-label">Email Address</label>
            <p className="field-value">{profile.email}</p>
          </div>
          
          <div className="profile-field">
            <label className="field-label">Phone Number</label>
            <p className="field-value">{profile.phone}</p>
          </div>
          
          <div className="profile-field">
            <label className="field-label">Admission Date</label>
            <p className="field-value">{profile.admissionDate}</p>
          </div>
          
          <div className="profile-field">
            <label className="field-label">Blood Group</label>
            <p className="field-value">{profile.bloodGroup}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentProfile

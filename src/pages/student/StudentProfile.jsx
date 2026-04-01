import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { studentApi } from '../../services/api'
import './Student.css'

const StudentProfile = () => {
  const { userId, user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (userId) {
      studentApi.getById(userId)
        .then(data => setProfile(data))
        .catch(err => console.error('Profile error:', err))
        .finally(() => setLoading(false))
    }
  }, [userId])

  if (loading) return <div className="page-container"><p>Loading profile...</p></div>
  if (!profile) return <div className="page-container"><p>Unable to load profile.</p></div>

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
            <p className="field-value">{user?.name || profile.name}</p>
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
        </div>
      </div>
    </div>
  )
}

export default StudentProfile

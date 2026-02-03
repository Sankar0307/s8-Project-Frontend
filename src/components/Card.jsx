import './Card.css'

const Card = ({ title, value, icon, color = 'blue', subtitle }) => {
  return (
    <div className={`dashboard-card card-${color}`}>
      <div className="card-content">
        <div className="card-header-info">
          {icon && <div className="card-icon">{icon}</div>}
          <div className="card-text">
            <h4 className="card-title">{title}</h4>
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
        </div>
        <div className="card-value">{value}</div>
      </div>
    </div>
  )
}

export default Card

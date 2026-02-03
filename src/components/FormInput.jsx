import './FormInput.css'

const FormInput = ({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  error, 
  placeholder,
  required,
  options, // For select inputs
  rows = 4 // For textarea
}) => {
  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            rows={rows}
            className={`form-textarea ${error ? 'form-input-error' : ''}`}
          />
        )
      case 'select':
        return (
          <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className={`form-select ${error ? 'form-input-error' : ''}`}
          >
            <option value="">Select {label}</option>
            {options && options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )
      default:
        return (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={`form-input ${error ? 'form-input-error' : ''}`}
          />
        )
    }
  }

  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label} {required && <span className="form-required">*</span>}
        </label>
      )}
      {renderInput()}
      {error && <span className="form-error">{error}</span>}
    </div>
  )
}

export default FormInput

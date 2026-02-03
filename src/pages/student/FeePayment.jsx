import { useState } from 'react'
import FormInput from '../../components/FormInput'
import { studentData } from '../../data/mockData'
import './Student.css'

const FeePayment = () => {
  const { feeDetails } = studentData
  const [formData, setFormData] = useState({
    feeType: '',
    amount: '',
    paymentMethod: ''
  })
  const [success, setSuccess] = useState(false)

  const pendingFees = feeDetails.filter(fee => fee.due > 0)

  const paymentMethods = [
    { value: 'credit', label: 'Credit Card' },
    { value: 'debit', label: 'Debit Card' },
    { value: 'upi', label: 'UPI' },
    { value: 'netbanking', label: 'Net Banking' }
  ]

  const handleFeeTypeChange = (e) => {
    const selectedFee = pendingFees.find(fee => fee.feeType === e.target.value)
    setFormData({
      ...formData,
      feeType: e.target.value,
      amount: selectedFee ? selectedFee.due.toString() : ''
    })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
      setFormData({ feeType: '', amount: '', paymentMethod: '' })
    }, 3000)
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Pay Fees</h2>
        <p className="page-subtitle">Make a fee payment</p>
      </div>

      {success && (
        <div className="alert alert-success">
          ✅ Payment successful! Transaction ID: TXN{Math.random().toString().slice(2, 11)}
        </div>
      )}

      <div className="grid grid-cols-2">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Payment Form</h3>
          </div>
          
          <form onSubmit={handleSubmit}>
            <FormInput
              label="Select Fee Type"
              type="select"
              name="feeType"
              value={formData.feeType}
              onChange={handleFeeTypeChange}
              options={pendingFees.map(fee => ({ value: fee.feeType, label: fee.feeType }))}
              required
            />

            <FormInput
              label="Amount"
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              required
            />

            <FormInput
              label="Payment Method"
              type="select"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              options={paymentMethods}
              required
            />

            <button type="submit" className="btn btn-primary btn-block mt-lg">
              Pay Now
            </button>
          </form>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Pending Fees</h3>
          </div>
          
          <div className="pending-fees-list">
            {pendingFees.map(fee => (
              <div key={fee.id} className="pending-fee-item">
                <div className="flex justify-between">
                  <span className="font-semibold">{fee.feeType}</span>
                  <span className="text-danger font-bold">₹{fee.due.toLocaleString()}</span>
                </div>
                <small className="text-gray">Due Date: {fee.dueDate}</small>
              </div>
            ))}
            
            {pendingFees.length === 0 && (
              <p className="text-center text-gray">No pending fees</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeePayment

import { useState, useEffect } from 'react'
import FormInput from '../../components/FormInput'
import { useAuth } from '../../context/AuthContext'
import { feeApi, paymentApi, tcApi } from '../../services/api'
import './Student.css'

const FeePayment = () => {
  const { userId } = useAuth()
  const [fees, setFees] = useState([])
  const [studentId, setStudentId] = useState(null)
  const [payments, setPayments] = useState([])
  const [studentMeta, setStudentMeta] = useState(null)
  const [razorpayReady, setRazorpayReady] = useState(false)
  const [formData, setFormData] = useState({
    feeType: '',
    amount: '',
    paymentMethod: ''
  })
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      if (window.Razorpay) return resolve(true)

      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.async = true
      script.onload = () => resolve(true)
      script.onerror = () => reject(new Error('Failed to load Razorpay Checkout script'))
      document.body.appendChild(script)
    })
  }

  const loadPaymentContext = async () => {
    try {
      const [allFees, allPayments] = await Promise.all([
        feeApi.getAll(),
        paymentApi.getAll()
      ])
      let resolvedStudentId = userId
      let profile = null
      try {
        profile = await tcApi.getStudentProfile(userId)
        resolvedStudentId = profile?.id || userId
      } catch (_) {
        // Fallback when user-student profile link is missing.
      }
      setStudentId(resolvedStudentId || null)
      setStudentMeta(profile ? { department: profile.department, year: profile.year } : null)
      setFees(Array.isArray(allFees) ? allFees : [])
      const mine = Array.isArray(allPayments) ? allPayments.filter(p => p.studentId === resolvedStudentId) : []
      setPayments(mine)
    } catch (err) {
      setError(err.message || 'Failed to load fee details')
    }
  }

  useEffect(() => {
    if (!userId) return
    loadPaymentContext()
  }, [userId])

  useEffect(() => {
    loadRazorpayScript()
      .then(() => setRazorpayReady(true))
      .catch((e) => {
        setError(e.message || 'Razorpay failed to load')
        setRazorpayReady(false)
      })
  }, [])

  const paymentMethods = [
    { value: 'Credit Card', label: 'Credit Card' },
    { value: 'Debit Card', label: 'Debit Card' },
    { value: 'UPI', label: 'UPI' },
    { value: 'Net Banking', label: 'Net Banking' }
  ]

  const handleFeeTypeChange = (e) => {
    const selectedFee = fees.find(fee => fee.feeType === e.target.value)
    setFormData({
      ...formData,
      feeType: e.target.value,
      amount: selectedFee ? selectedFee.amount.toString() : ''
    })
  }

  const handleChange = (e) => {
    // Keep amount tied to the selected fee type to prevent client-side tampering.
    if (e?.target?.name === 'amount') return
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!razorpayReady) {
      setError('Payment gateway is not ready. Please try again in a moment.')
      return
    }

    const amountInr = Number(formData.amount)
    if (!Number.isFinite(amountInr) || amountInr <= 0) {
      setError('Please enter a valid fee amount.')
      return
    }

    // Create order on backend, then open Razorpay Checkout
    try {
      const order = await paymentApi.createOrder({
        studentId,
        amount: amountInr,
        feeType: formData.feeType
      })

      const options = {
        key: order.key,
        amount: order.amount, // paise (string)
        currency: 'INR',
        name: 'Andaman College',
        description: 'Fee Payment',
        order_id: order.orderId,
        handler: async function (response) {
          try {
            await paymentApi.verifyRazorpay({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              studentId,
              amount: amountInr,
              feeType: formData.feeType
            })

            setSuccess(true)
            await loadPaymentContext()
            setTimeout(() => {
              setSuccess(false)
              setFormData({ feeType: '', amount: '', paymentMethod: '' })
            }, 3000)
          } catch (err) {
            setError(err.message || 'Payment verification failed')
          }
        },
        prefill: {
          // Optional, keeps checkout UI clean even if profile fetch is missing.
          name: '',
          email: '',
          contact: ''
        },
        theme: { color: '#3399cc' }
      }

      const rzp = new window.Razorpay(options)
      rzp.on('payment.failed', async function (response) {
        const failedOrderId = response?.error?.metadata?.order_id
        const failedPaymentId = response?.error?.metadata?.payment_id

        try {
          if (failedOrderId && failedPaymentId) {
            await paymentApi.markFailed({
              razorpay_order_id: failedOrderId,
              razorpay_payment_id: failedPaymentId,
              studentId,
              amount: amountInr,
              feeType: formData.feeType
            })
          }
        } catch (_) {
          // Ignore backend failure here; we mainly want to show a useful message.
        }

        setError(response?.error?.description || 'Payment failed')
      })

      rzp.open()
    } catch (err) {
      setError(err.message || 'Failed to initiate payment')
    }
  }

  const blockedFeeTypes = new Set(
    payments
      .filter(p => p.status === 'PENDING' || p.status === 'SUCCESS')
      .map(p => p.feeType)
      .filter(Boolean)
  )

  const departmentFees = fees.filter((f) => !studentMeta?.department || f.department === studentMeta.department || f.department === 'All')
  const hasYearSpecificFees = studentMeta?.year
    ? departmentFees.some((f) => Number(f.year) === Number(studentMeta.year))
    : false

  // Keep frontend fee scope aligned with backend fallback:
  // prefer same-year rows, otherwise fallback to department/common rows across years.
  const relevantFees = hasYearSpecificFees
    ? departmentFees.filter((f) => Number(f.year) === Number(studentMeta.year))
    : departmentFees

  const totalFee = relevantFees.reduce((s, f) => s + (f.amount || 0), 0)

  // Treat PENDING as allocated so users can't overpay while checkout is in progress.
  const totalAllocated = payments
    .filter(p => p.status === 'PENDING' || p.status === 'SUCCESS')
    .reduce((s, p) => s + (p.amount || 0), 0)

  const remaining = totalFee - totalAllocated
  const selectedAmount = Number(formData.amount)
  const fullyPaid = remaining <= 0.000001

  const availableFees = relevantFees.filter((fee) => {
    if (blockedFeeTypes.has(fee.feeType)) return false
    const feeAmount = fee.amount || 0
    if (fullyPaid) return false
    return remaining >= feeAmount
  })

  const canPay = !!studentId && !!formData.feeType && razorpayReady && !fullyPaid && Number.isFinite(selectedAmount) && selectedAmount > 0 && selectedAmount <= remaining

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Pay Fees</h2>
        <p className="page-subtitle">Make a fee payment</p>
      </div>

      {success && (
        <div className="alert alert-success">
          ✅ Payment successful! Your receipt has been recorded.
        </div>
      )}
      {error && <div className="alert alert-danger">{error}</div>}

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
              options={availableFees.map(fee => ({ value: fee.feeType, label: `${fee.feeType} - ₹${fee.amount}` }))}
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

            <button
              type="submit"
              className="btn btn-primary btn-block mt-lg"
              disabled={!canPay}
              title={fullyPaid ? 'No remaining fees' : (!razorpayReady ? 'Loading payment gateway...' : '')}
            >
              Pay Now
            </button>
          </form>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Available Fee Types</h3>
          </div>
          <div className="pending-fees-list">
            {availableFees.map(fee => (
              <div key={fee.id} className="pending-fee-item">
                <div className="flex justify-between">
                  <span className="font-semibold">{fee.feeType}</span>
                  <span className="text-danger font-bold">₹{fee.amount?.toLocaleString()}</span>
                </div>
                <small className="text-gray">{fee.department} | Year {fee.year}</small>
              </div>
            ))}
            {availableFees.length === 0 && (
              <p className="text-center text-gray">All available fee types are already paid/submitted.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeePayment

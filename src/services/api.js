const API_BASE = 'http://localhost:8080/api'

// ──────────── Generic helpers ────────────
const get = async (path) => {
  const res = await fetch(`${API_BASE}${path}`)
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }))
    throw new Error(err.message || 'Request failed')
  }
  return res.json()
}

const post = async (path, body) => {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }))
    throw new Error(err.message || 'Request failed')
  }
  return res.json()
}

const put = async (path, body) => {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }))
    throw new Error(err.message || 'Request failed')
  }
  return res.json()
}

const del = async (path) => {
  const res = await fetch(`${API_BASE}${path}`, { method: 'DELETE' })
  if (!res.ok && res.status !== 204) {
    const err = await res.json().catch(() => ({ message: res.statusText }))
    throw new Error(err.message || 'Request failed')
  }
}

// ──────────── Auth ────────────
export const authApi = {
  login: (email, password) => post('/auth/login', { email, password })
}

// ──────────── Students ────────────
export const studentApi = {
  getAll:    ()          => get('/students'),
  getById:   (id)        => get(`/students/${id}`),
  create:    (data)      => post('/students', data),
  update:    (id, data)  => put(`/students/${id}`, data),
  delete:    (id)        => del(`/students/${id}`)
}

// ──────────── Fee Structures ────────────
export const feeApi = {
  getAll:  ()     => get('/fees'),
  create:  (data) => post('/fees', data)
}

// ──────────── Payments ────────────
export const paymentApi = {
  getAll:  ()   => get('/payments'),
  create:  (data) => post('/payments', data),
  verify:  (id)   => put(`/payments/verify/${id}`),
  // Razorpay integration endpoints
  createOrder: (data) => post('/payment/create-order', data),
  verifyRazorpay: (data) => post('/payment/verify', data),
  markFailed: (data) => post('/payment/mark-failed', data)
}

// ──────────── TC (Transfer Certificate) ────────────
export const tcApi = {
  apply:            (data)        => post('/tc/apply', data),
  getStatus:        (userId)      => get(`/tc/status/user/${userId}`),   // uses userId→studentId resolution
  getStatusDirect:  (studentId)   => get(`/tc/status/${studentId}`),     // direct studentId
  getStudentProfile:(userId)      => get(`/tc/student/user/${userId}`),
  /** Latest issued TC for logged-in user; null if not generated yet */
  getIssuedTc:      async (userId) => {
    const res = await fetch(`${API_BASE}/tc/issued/user/${userId}`)
    if (res.status === 404) return null
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: res.statusText }))
      throw new Error(err.message || 'Request failed')
    }
    return res.json()
  },
  getAllRequests:    ()            => get('/tc/requests'),
  approve:          (id)          => put(`/tc/approve/${id}`),
  reject:           (id, remarks) => put(`/tc/reject/${id}`, { remarks }),
  generate:         (requestId)   => post(`/tc/generate/${requestId}`),
  verify:           (tcNumber)    => get(`/tc/verify/${tcNumber}`),
  downloadByStudent:(studentId)   => `${API_BASE}/certificate/tc/download/${studentId}`
}

// ──────────── Bonafide ────────────
export const bonafideApi = {
  apply:           (data) => post('/bonafide/apply', data),
  getAll:          ()     => get('/bonafide'),
  approve:         (id)   => put(`/bonafide/approve/${id}`),
  download:        (studentId) => `${API_BASE}/bonafide/download/${studentId}`
}

// ──────────── Dashboard ────────────
export const dashboardApi = {
  admin:    ()   => get('/dashboard/admin'),
  student:  (id) => get(`/dashboard/student/${id}`),
  accounts: ()   => get('/dashboard/accounts')
}

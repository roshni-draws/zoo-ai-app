import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Phone, MessageSquare, Check } from 'lucide-react'
import { BackHeader, PageTransition } from '../../../components'

export default function SafariPersonalInfo() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [requests, setRequests] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)

  const isValid = email.includes('@') && phone.length >= 10 && termsAccepted

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title="Personal Information" />

        <div style={{ padding: '0 24px 120px' }}>
          {/* Progress indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ marginBottom: 20 }}
          >
            <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
              {[1, 2, 3, 4].map(step => (
                <div key={step} style={{
                  flex: 1, height: 4, borderRadius: 2,
                  background: step <= 3 ? 'var(--green-rich)' : 'var(--border-light)',
                  transition: 'all 0.3s ease',
                }} />
              ))}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Step 3 of 4</div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
            style={{ padding: 16, marginBottom: 16 }}
          >
            <h3 className="t-display-sm" style={{ marginBottom: 16 }}>Contact Details</h3>

            {/* Email */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
                <Mail size={14} style={{ display: 'inline', marginRight: 6 }} />
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="input"
              />
            </div>

            {/* Phone */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
                <Phone size={14} style={{ display: 'inline', marginRight: 6 }} />
                Phone Number
              </label>
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{
                  padding: '14px 12px',
                  border: '1.5px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-primary)',
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}>
                  🇮🇳 +91
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="9876543210"
                  className="input"
                  style={{ flex: 1 }}
                />
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
                <MessageSquare size={14} style={{ display: 'inline', marginRight: 6 }} />
                Special Requests
                <span style={{ fontWeight: 400, color: 'var(--text-tertiary)', marginLeft: 4 }}>(Optional)</span>
              </label>
              <textarea
                value={requests}
                onChange={e => setRequests(e.target.value)}
                placeholder="Any dietary requirements, accessibility needs, or special requests..."
                className="input"
                rows={4}
                style={{
                  resize: 'vertical',
                  minHeight: 80,
                  fontFamily: 'var(--font-body)',
                }}
              />
            </div>
          </motion.div>

          {/* Terms Checkbox */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ marginBottom: 24 }}
          >
            <button
              onClick={() => setTermsAccepted(!termsAccepted)}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                width: '100%',
                padding: '14px 16px',
                background: termsAccepted ? 'var(--green-pale)' : 'var(--bg-card)',
                border: termsAccepted ? '1.5px solid var(--green-rich)' : '1.5px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                textAlign: 'left',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{
                width: 22, height: 22, borderRadius: 6,
                border: termsAccepted ? 'none' : '2px solid var(--border)',
                background: termsAccepted ? 'var(--green-rich)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, transition: 'all 0.2s ease', marginTop: 1,
              }}>
                {termsAccepted && <Check size={14} color="white" />}
              </div>
              <div>
                <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--text-secondary)' }}>
                  I agree to the{' '}
                  <span style={{ color: 'var(--green-rich)', fontWeight: 600 }}>Terms & Conditions</span>
                  {' '}and{' '}
                  <span style={{ color: 'var(--green-rich)', fontWeight: 600 }}>Cancellation Policy</span>
                  {' '}for safari tours.
                </div>
              </div>
            </button>
          </motion.div>

          {/* Important Notes */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="card"
            style={{
              padding: 14,
              marginBottom: 24,
              background: 'var(--orange-pale)',
              border: '1px solid var(--amber-light)',
            }}
          >
            <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--amber)', marginBottom: 8 }}>Important Notes</h4>
            <ul style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6, paddingLeft: 16, margin: 0 }}>
              <li>Arrive 15 minutes before the scheduled tour time</li>
              <li>Wear comfortable shoes suitable for walking</li>
              <li>Cameras and binoculars are encouraged</li>
              <li>Children under 3 ride free but must be accompanied</li>
            </ul>
          </motion.div>

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={() => isValid && navigate(`/transport/safari/${id}/summary`)}
              className={`btn btn-full ${isValid ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                padding: 16, fontSize: 15, fontWeight: 700,
                letterSpacing: '0.05em', opacity: isValid ? 1 : 0.5,
              }}
            >
              CONTINUE TO PAYMENT
            </button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}

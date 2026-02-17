import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CreditCard, ChevronRight, Lock, Smartphone, Building2, Wallet } from 'lucide-react'
import { BackHeader, PageTransition } from '../../../components'

type PayMethod = 'gpay' | 'upi' | 'card' | 'netbanking' | null

export default function BuggyPayment() {
  const navigate = useNavigate()
  const [method, setMethod] = useState<PayMethod>(null)
  const [upiId, setUpiId] = useState('')
  const total = 204

  const paymentMethods: { id: PayMethod; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: 'gpay',
      label: 'Google Pay',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      ),
      desc: 'Pay with Google Pay',
    },
    {
      id: 'upi',
      label: 'UPI',
      icon: <Smartphone size={20} color="var(--green-rich)" />,
      desc: 'Pay via UPI ID',
    },
    {
      id: 'card',
      label: 'Credit / Debit Card',
      icon: <CreditCard size={20} color="var(--sky)" />,
      desc: 'Visa, Mastercard, RuPay',
    },
    {
      id: 'netbanking',
      label: 'Net Banking',
      icon: <Building2 size={20} color="var(--amber)" />,
      desc: 'All major banks supported',
    },
  ]

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title="Buggy Tour" />

        <div style={{ padding: '0 24px 120px' }}>
          {/* Amount */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: 'center',
              padding: '16px 0 24px',
            }}
          >
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>Amount to pay</div>
            <div style={{
              fontSize: 36,
              fontWeight: 800,
              fontFamily: 'var(--font-display)',
              color: 'var(--green-deep)',
            }}>
              ₹{total}
            </div>
          </motion.div>

          {/* Payment Methods */}
          <div style={{ marginBottom: 20 }}>
            <h3 className="t-heading" style={{ marginBottom: 12 }}>Select Payment Method</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {paymentMethods.map((pm, i) => (
                <motion.button
                  key={pm.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setMethod(pm.id)}
                  className="card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: 14,
                    textAlign: 'left',
                    cursor: 'pointer',
                    border: method === pm.id ? '2px solid var(--green-rich)' : '1px solid var(--border-light)',
                    background: method === pm.id ? 'var(--green-pale)' : 'var(--bg-card)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 'var(--radius-md)',
                    background: method === pm.id ? 'white' : 'var(--bg-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {pm.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{pm.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{pm.desc}</div>
                  </div>
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%',
                    border: method === pm.id ? 'none' : '2px solid var(--border)',
                    background: method === pm.id ? 'var(--green-rich)' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s ease',
                  }}>
                    {method === pm.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        style={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }}
                      />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* UPI Input (shown when UPI selected) */}
          {method === 'upi' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              style={{ marginBottom: 20, overflow: 'hidden' }}
            >
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>UPI ID</label>
              <input
                value={upiId}
                onChange={e => setUpiId(e.target.value)}
                placeholder="yourname@upi"
                className="input"
              />
            </motion.div>
          )}

          {/* Card Input (shown when Card selected) */}
          {method === 'card' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              style={{ marginBottom: 20, overflow: 'hidden' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Card Number</label>
                  <input className="input" placeholder="1234 5678 9012 3456" />
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Expiry</label>
                    <input className="input" placeholder="MM/YY" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>CVV</label>
                    <input className="input" placeholder="123" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Pay Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={() => method && navigate('/transport/buggy/driver')}
              className={`btn btn-full ${method ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                padding: 16,
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: '0.05em',
                opacity: method ? 1 : 0.5,
              }}
            >
              <Wallet size={18} />
              PAY ₹{total}
            </button>
          </motion.div>

          {/* Security Note */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 6, marginTop: 14, fontSize: 12, color: 'var(--text-tertiary)',
          }}>
            <Lock size={12} />
            Secured with 256-bit encryption. Your payment is safe.
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

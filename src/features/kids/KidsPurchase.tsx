import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, CreditCard, Lock, Download, ChevronRight, Star, Sparkles } from 'lucide-react'
import { BackHeader, PageTransition } from '../../components'

const packFeatures = [
  'All worksheets & coloring pages',
  'Interactive games & quizzes',
  'Story time audio collection',
  'Digital badge collection',
  'Monthly new content updates',
  'Printable certificates',
]

const paymentMethods = ['google_pay', 'upi', 'card'] as const

export default function KidsPurchase() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [selectedPayment, setSelectedPayment] = useState<typeof paymentMethods[number]>('google_pay')

  const orderId = 'KP-' + Math.random().toString(36).substring(2, 8).toUpperCase()
  const price = 299

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title="Kids Pack" />

        {/* Progress */}
        <div style={{ padding: '0 24px 12px' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {[1, 2, 3].map(s => (
              <div key={s} style={{
                flex: 1,
                height: 3,
                borderRadius: 2,
                background: s <= step ? 'var(--green-rich)' : 'var(--border-light)',
                transition: 'background 0.3s ease',
              }} />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* ========== STEP 1: Pack Overview ========== */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              style={{ padding: '16px 24px 120px' }}
            >
              {/* Pack Card */}
              <div className="card card-elevated" style={{
                padding: 0,
                overflow: 'hidden',
                marginBottom: 24,
              }}>
                {/* Header */}
                <div style={{
                  background: 'linear-gradient(135deg, var(--green-deep), var(--green-rich))',
                  padding: '28px 24px',
                  textAlign: 'center',
                  position: 'relative',
                }}>
                  <motion.div
                    initial={{ scale: 0, rotate: -15 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    style={{ fontSize: 48, marginBottom: 12 }}
                  >
                    \uD83C\uDF1F
                  </motion.div>
                  <h2 className="t-display-lg" style={{ color: 'white', marginBottom: 4 }}>Kids Explorer Pack</h2>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>The complete learning adventure</p>
                  <div style={{ marginTop: 16 }}>
                    <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'line-through' }}>{'\u20B9'}499</span>
                    <span style={{ fontSize: 36, fontWeight: 800, color: 'var(--gold)', fontFamily: 'var(--font-display)', marginLeft: 8 }}>
                      {'\u20B9'}{price}
                    </span>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}> one-time</span>
                  </div>
                  <span className="badge" style={{
                    background: 'rgba(232,104,160,0.2)',
                    color: 'var(--coral-light)',
                    marginTop: 10,
                    display: 'inline-flex',
                    border: '1px solid rgba(232,104,160,0.3)',
                  }}>
                    <Star size={10} /> 40% OFF - Limited Time
                  </span>
                </div>

                {/* Features */}
                <div style={{ padding: 24 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>What's Included</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {packFeatures.map(feature => (
                      <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 20,
                          height: 20,
                          borderRadius: 'var(--radius-full)',
                          background: 'var(--green-pale)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}>
                          <Check size={12} color="var(--green-rich)" strokeWidth={3} />
                        </div>
                        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                className="btn btn-primary btn-full btn-lg"
                onClick={() => setStep(2)}
              >
                <Sparkles size={18} /> BUY NOW - {'\u20B9'}{price}
              </motion.button>
            </motion.div>
          )}

          {/* ========== STEP 2: Payment ========== */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              style={{ padding: '16px 24px 120px' }}
            >
              <h2 className="t-display-md" style={{ marginBottom: 4 }}>Choose Payment Method</h2>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 24 }}>
                Select your preferred way to pay
              </p>

              {/* Order Summary */}
              <div className="card" style={{ padding: 16, marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>Kids Explorer Pack</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>One-time purchase</div>
                  </div>
                  <span style={{ fontSize: 20, fontWeight: 800, fontFamily: 'var(--font-display)' }}>
                    {'\u20B9'}{price}
                  </span>
                </div>
              </div>

              {/* Payment Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                {/* Google Pay */}
                <button
                  onClick={() => setSelectedPayment('google_pay')}
                  className="card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: 16,
                    border: selectedPayment === 'google_pay' ? '2px solid var(--green-rich)' : '1px solid var(--border-light)',
                    background: selectedPayment === 'google_pay' ? 'var(--green-pale)' : 'var(--bg-card)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 'var(--radius-md)',
                    background: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                    boxShadow: 'var(--shadow-sm)',
                    flexShrink: 0,
                  }}>
                    G
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>Google Pay</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Fast & secure</div>
                  </div>
                  <div style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    border: selectedPayment === 'google_pay' ? '6px solid var(--green-rich)' : '2px solid var(--border)',
                    transition: 'all 0.2s ease',
                  }} />
                </button>

                {/* UPI */}
                <button
                  onClick={() => setSelectedPayment('upi')}
                  className="card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: 16,
                    border: selectedPayment === 'upi' ? '2px solid var(--green-rich)' : '1px solid var(--border-light)',
                    background: selectedPayment === 'upi' ? 'var(--green-pale)' : 'var(--bg-card)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 'var(--radius-md)',
                    background: '#5F259F',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 13,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}>
                    UPI
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>UPI</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>PhonePe, Paytm, etc.</div>
                  </div>
                  <div style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    border: selectedPayment === 'upi' ? '6px solid var(--green-rich)' : '2px solid var(--border)',
                    transition: 'all 0.2s ease',
                  }} />
                </button>

                {/* Card */}
                <button
                  onClick={() => setSelectedPayment('card')}
                  className="card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: 16,
                    border: selectedPayment === 'card' ? '2px solid var(--green-rich)' : '1px solid var(--border-light)',
                    background: selectedPayment === 'card' ? 'var(--green-pale)' : 'var(--bg-card)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <CreditCard size={20} color="white" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>Debit / Credit Card</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Visa, Mastercard, RuPay</div>
                  </div>
                  <div style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    border: selectedPayment === 'card' ? '6px solid var(--green-rich)' : '2px solid var(--border)',
                    transition: 'all 0.2s ease',
                  }} />
                </button>
              </div>

              {/* Card Details (shown when card selected) */}
              <AnimatePresence>
                {selectedPayment === 'card' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    style={{ overflow: 'hidden', marginBottom: 20 }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 4 }}>
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
              </AnimatePresence>

              <motion.button
                whileTap={{ scale: 0.97 }}
                className="btn btn-primary btn-full btn-lg"
                onClick={() => setStep(3)}
              >
                PAY {'\u20B9'}{price}
              </motion.button>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                marginTop: 12,
                fontSize: 12,
                color: 'var(--text-tertiary)',
              }}>
                <Lock size={12} />
                Secured & encrypted payment
              </div>
            </motion.div>
          )}

          {/* ========== STEP 3: Payment Successful ========== */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              style={{ padding: '32px 24px 120px', textAlign: 'center' }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'var(--green-rich)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                }}
              >
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring' }}>
                  <Check size={40} color="white" strokeWidth={3} />
                </motion.div>
              </motion.div>

              <h1 className="t-display-lg" style={{ marginBottom: 6 }}>Payment Successful!</h1>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 28 }}>
                Your Kids Explorer Pack is ready to use.
              </p>

              {/* Receipt Card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="card"
                style={{ padding: 20, textAlign: 'left', marginBottom: 24 }}
              >
                <h3 className="t-display-sm" style={{ marginBottom: 16 }}>Receipt</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { label: 'Order ID', value: orderId },
                    { label: 'Date', value: 'February 17, 2026' },
                    { label: 'Pack', value: 'Kids Explorer Pack' },
                    { label: 'Payment', value: selectedPayment === 'google_pay' ? 'Google Pay' : selectedPayment === 'upi' ? 'UPI' : 'Card' },
                  ].map(item => (
                    <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{item.label}</span>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{item.value}</span>
                    </div>
                  ))}
                  <div style={{
                    borderTop: '2px solid var(--border)',
                    paddingTop: 10,
                    marginTop: 4,
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}>
                    <span style={{ fontWeight: 800, fontSize: 15 }}>Total</span>
                    <span style={{ fontWeight: 800, fontSize: 20, fontFamily: 'var(--font-display)', color: 'var(--green-rich)' }}>
                      {'\u20B9'}{price}
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                className="btn btn-primary btn-full"
                style={{ marginBottom: 10 }}
              >
                <Download size={16} /> DOWNLOAD RECEIPT
              </motion.button>
              <button
                onClick={() => navigate('/kids/worksheets')}
                className="btn btn-ghost btn-full"
              >
                VIEW MORE WORKSHEETS <ChevronRight size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}

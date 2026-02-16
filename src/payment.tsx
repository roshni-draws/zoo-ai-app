import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, Calendar, Share2, CreditCard, Lock } from 'lucide-react'
import { BackHeader, PageTransition } from './components'

/* ============================================
   Booking Summary (P.1)
   ============================================ */

export function BookingSummary() {
  const navigate = useNavigate()
  const [promoCode, setPromoCode] = useState('')

  const lines = [
    { item: '2x Adult General Admission', price: 64.00 },
    { item: '2x Child (ages 3-11)', price: 48.00 },
    { item: '1x Single Stroller', price: 12.00 },
  ]

  const addOns = [
    { item: 'Parking Pass', price: 20.00, selected: false },
    { item: 'Guided Tour Upgrade', price: 35.00, selected: false },
    { item: 'Family Meal Deal', price: 42.00, selected: false },
  ]

  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const subtotal = lines.reduce((sum, l) => sum + l.price, 0) + addOns.filter(a => selectedAddOns.includes(a.item)).reduce((sum, a) => sum + a.price, 0)
  const tax = subtotal * 0.0775
  const total = subtotal + tax

  return (
    <PageTransition>
      <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)' }}>
        <BackHeader title="Booking Summary" />
        <div style={{ padding: '0 20px 120px' }}>
          {/* Zoo + Date */}
          <div className="card" style={{ padding: 16, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: 'var(--green-pale)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 26,
            }}>🦁</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>San Diego Zoo</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Saturday, Feb 21, 2025</div>
            </div>
          </div>

          {/* Line Items */}
          <div className="card" style={{ padding: 16, marginBottom: 16 }}>
            <div className="t-heading" style={{ marginBottom: 12 }}>Tickets & Equipment</div>
            {lines.map(line => (
              <div key={line.item} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-light)' }}>
                <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{line.item}</span>
                <span style={{ fontWeight: 600, fontSize: 14 }}>${line.price.toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Add-Ons */}
          <div className="card" style={{ padding: 16, marginBottom: 16 }}>
            <div className="t-heading" style={{ marginBottom: 12 }}>Add-Ons</div>
            {addOns.map(addon => (
              <button
                key={addon.item}
                onClick={() => setSelectedAddOns(prev =>
                  prev.includes(addon.item) ? prev.filter(a => a !== addon.item) : [...prev, addon.item]
                )}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 0',
                  borderBottom: '1px solid var(--border-light)',
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                <div style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  border: selectedAddOns.includes(addon.item) ? 'none' : '2px solid var(--border)',
                  background: selectedAddOns.includes(addon.item) ? 'var(--green-rich)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.2s ease',
                }}>
                  {selectedAddOns.includes(addon.item) && <Check size={14} color="white" />}
                </div>
                <span style={{ flex: 1, fontSize: 14 }}>{addon.item}</span>
                <span style={{ fontWeight: 600, fontSize: 14 }}>+${addon.price.toFixed(2)}</span>
              </button>
            ))}
          </div>

          {/* Promo Code */}
          <div className="card" style={{ padding: 16, marginBottom: 16 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                value={promoCode}
                onChange={e => setPromoCode(e.target.value)}
                placeholder="Promo code"
                className="input"
                style={{ flex: 1 }}
              />
              <button className="btn btn-secondary">Apply</button>
            </div>
          </div>

          {/* Totals */}
          <div className="card" style={{ padding: 16, marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Subtotal</span>
              <span style={{ fontSize: 14 }}>${subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Tax</span>
              <span style={{ fontSize: 14 }}>${tax.toFixed(2)}</span>
            </div>
            <div style={{ borderTop: '2px solid var(--border)', paddingTop: 8, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 800, fontSize: 16 }}>Total</span>
              <span style={{ fontWeight: 800, fontSize: 22, fontFamily: 'var(--font-display)' }}>${total.toFixed(2)}</span>
            </div>
          </div>

          <button onClick={() => navigate('/payment/pay')} className="btn btn-primary btn-full btn-lg">
            Continue to Payment
          </button>
        </div>
      </div>
    </PageTransition>
  )
}

/* ============================================
   Payment Screen (P.2)
   ============================================ */

export function PaymentScreen() {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)' }}>
        <BackHeader title="Payment" />
        <div style={{ padding: '0 20px 120px' }}>
          {/* Apple/Google Pay */}
          <button
            onClick={() => navigate('/payment/confirm')}
            className="btn btn-full"
            style={{
              background: '#000',
              color: '#fff',
              padding: 16,
              fontSize: 16,
              marginBottom: 8,
            }}
          >
             Pay
          </button>

          <button
            onClick={() => navigate('/payment/confirm')}
            className="btn btn-full btn-secondary"
            style={{ padding: 16, fontSize: 16, marginBottom: 16 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google Pay
          </button>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            margin: '8px 0 20px',
          }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{ fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 500 }}>or pay with card</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          {/* Card Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Card number</label>
              <div style={{ position: 'relative' }}>
                <input className="input" placeholder="1234 5678 9012 3456" style={{ paddingRight: 44 }} />
                <CreditCard size={18} color="var(--text-tertiary)" style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)' }} />
              </div>
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
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Name on card</label>
              <input className="input" placeholder="Alex Johnson" />
            </div>
          </div>

          <button onClick={() => navigate('/payment/confirm')} className="btn btn-primary btn-full btn-lg">
            Pay $133.92
          </button>

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
            Secured by Stripe. Your payment details are encrypted.
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

/* ============================================
   Confirmation (P.3)
   ============================================ */

export function Confirmation() {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <div style={{
        minHeight: '100dvh',
        background: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
        textAlign: 'center',
      }}>
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
            marginBottom: 24,
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
          >
            <Check size={40} color="white" strokeWidth={3} />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="t-display-lg"
          style={{ marginBottom: 8 }}
        >
          Booking Confirmed!
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.5, marginBottom: 32 }}
        >
          <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>San Diego Zoo</div>
          <div>Saturday, Feb 21 · Family</div>
          <div style={{ marginTop: 8, fontSize: 13 }}>
            Tickets + stroller added to your Wallet.<br />
            Your AI plan is ready.
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 300 }}
        >
          <button onClick={() => navigate('/plan/itinerary')} className="btn btn-primary btn-full">
            View Plan
          </button>
          <button className="btn btn-secondary btn-full">
            <Calendar size={16} /> Add to Calendar
          </button>
          <button className="btn btn-ghost btn-full">
            <Share2 size={16} /> Share with Family
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 24 }}
        >
          Confirmation email sent. Tickets in Profile → Wallet.
        </motion.p>
      </div>
    </PageTransition>
  )
}

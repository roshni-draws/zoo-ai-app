import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Ticket, Calendar, Users, MapPin, Crown, Camera, Shield, Tag } from 'lucide-react'
import { BackHeader, PageTransition } from '../../components'

export default function TicketReview() {
  const navigate = useNavigate()
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  // Mock order data
  const orderDate = 'Saturday, 22 Feb 2026'
  const ticketType = 'General Entry Ticket'

  const lineItems = [
    { label: 'Adult x 2', price: 1000 },
    { label: 'Child x 1', price: 300 },
  ]

  const addOnItems = [
    { label: 'Premier Access x 3', price: 1500 },
    { label: 'Photo Package x 3', price: 900 },
  ]

  const subtotal = lineItems.reduce((s, l) => s + l.price, 0) + addOnItems.reduce((s, l) => s + l.price, 0)
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0
  const convenienceFee = 49
  const gst = Math.round((subtotal - discount) * 0.18)
  const total = subtotal - discount + convenienceFee + gst

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title="Review Ticket" />

        <div style={{ padding: '0 24px 140px' }}>
          {/* Visit Summary */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
            style={{
              padding: 16,
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <div style={{
              width: 56,
              height: 56,
              borderRadius: 'var(--radius-lg)',
              background: 'var(--green-pale)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Ticket size={26} color="var(--green-rich)" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{ticketType}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
                <Calendar size={13} />
                {orderDate}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
                <Users size={13} />
                2 Adults, 1 Child
              </div>
            </div>
          </motion.div>

          {/* Ticket Line Items */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
            style={{ padding: 20, marginBottom: 12 }}
          >
            <div className="t-heading" style={{ marginBottom: 14 }}>Tickets</div>
            {lineItems.map(item => (
              <div key={item.label} style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: '1px solid var(--border-light)',
              }}>
                <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{item.label}</span>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{'\u20B9'}{item.price.toLocaleString()}</span>
              </div>
            ))}
          </motion.div>

          {/* Add-On Line Items */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="card"
            style={{ padding: 20, marginBottom: 12 }}
          >
            <div className="t-heading" style={{ marginBottom: 14 }}>Add-Ons</div>
            {addOnItems.map(item => (
              <div key={item.label} style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: '1px solid var(--border-light)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {item.label.includes('Premier') ? (
                    <Crown size={14} color="var(--yellow-medium)" />
                  ) : (
                    <Camera size={14} color="var(--green-rich)" />
                  )}
                  <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{item.label}</span>
                </div>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{'\u20B9'}{item.price.toLocaleString()}</span>
              </div>
            ))}
          </motion.div>

          {/* Promo Code */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
            style={{ padding: 16, marginBottom: 12 }}
          >
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <Tag size={16} color="var(--text-tertiary)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  value={promoCode}
                  onChange={e => setPromoCode(e.target.value.toUpperCase())}
                  placeholder="Promo code"
                  className="input"
                  style={{ paddingLeft: 40 }}
                />
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="btn btn-secondary"
                onClick={() => promoCode.length > 0 && setPromoApplied(true)}
                style={{ opacity: promoCode.length > 0 ? 1 : 0.5 }}
              >
                Apply
              </motion.button>
            </div>
            {promoApplied && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                style={{
                  marginTop: 10,
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--green-pale)',
                  fontSize: 13,
                  color: 'var(--green-rich)',
                  fontWeight: 600,
                }}
              >
                10% discount applied! You save {'\u20B9'}{discount}
              </motion.div>
            )}
          </motion.div>

          {/* Totals */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="card"
            style={{ padding: 20, marginBottom: 24 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Subtotal</span>
              <span style={{ fontSize: 14 }}>{'\u20B9'}{subtotal.toLocaleString()}</span>
            </div>
            {promoApplied && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 14, color: 'var(--green-rich)' }}>Promo Discount</span>
                <span style={{ fontSize: 14, color: 'var(--green-rich)', fontWeight: 600 }}>-{'\u20B9'}{discount}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Convenience Fee</span>
              <span style={{ fontSize: 14 }}>{'\u20B9'}{convenienceFee}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>GST (18%)</span>
              <span style={{ fontSize: 14 }}>{'\u20B9'}{gst.toLocaleString()}</span>
            </div>
            <div style={{
              borderTop: '2px solid var(--border)',
              paddingTop: 12,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span style={{ fontWeight: 800, fontSize: 17 }}>Total</span>
              <span style={{
                fontWeight: 800,
                fontSize: 24,
                fontFamily: 'var(--font-display)',
                color: 'var(--green-deep)',
              }}>
                {'\u20B9'}{total.toLocaleString()}
              </span>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="btn btn-primary btn-full btn-lg"
            onClick={() => navigate('/tickets/payment')}
          >
            CONFIRM AND PAY &middot; {'\u20B9'}{total.toLocaleString()}
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
            <Shield size={12} />
            Secured checkout with encrypted payment
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

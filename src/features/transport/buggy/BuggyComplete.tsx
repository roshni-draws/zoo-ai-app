import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, MapPin, Star, ChevronDown, ChevronUp } from 'lucide-react'
import { BackHeader, PageTransition } from '../../../components'

export default function BuggyComplete() {
  const navigate = useNavigate()
  const [rating, setRating] = useState(0)
  const [hoveredStar, setHoveredStar] = useState(0)
  const [fareOpen, setFareOpen] = useState(false)

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title="Transport" />

        <div style={{ padding: '0 24px 120px' }}>
          {/* Success */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center', padding: '24px 0 20px' }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
              style={{
                width: 72, height: 72, borderRadius: '50%',
                background: 'var(--green-rich)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px',
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.35, type: 'spring' }}
              >
                <Check size={36} color="white" strokeWidth={3} />
              </motion.div>
            </motion.div>
            <h2 className="t-display-lg" style={{ marginBottom: 4 }}>Ride Completed!</h2>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Thank you for using our service
            </p>
          </motion.div>

          {/* Ride Details */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
            style={{ padding: 16, marginBottom: 14 }}
          >
            <h3 className="t-heading" style={{ marginBottom: 12 }}>Ride Details</h3>
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { label: 'Buggy', value: 'BUG4444' },
                { label: 'Duration', value: '12 min' },
                { label: 'Guests', value: '02' },
              ].map(item => (
                <div key={item.label} style={{
                  flex: 1, padding: '10px 8px', background: 'var(--bg-primary)',
                  borderRadius: 'var(--radius-sm)', textAlign: 'center',
                }}>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{item.value}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="card"
            style={{ padding: 16, marginBottom: 14 }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '10px 12px',
              background: 'var(--bg-primary)',
              borderRadius: 'var(--radius-md)',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--green-rich)' }} />
                <div style={{ width: 1, height: 16, borderLeft: '2px dashed var(--border)' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--coral)' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 1 }}>Pickup</div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>Main Entrance Gate</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 1 }}>Current Location</div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>Africa Rocks</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Rate Your Ride */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
            style={{ padding: 20, marginBottom: 14, textAlign: 'center' }}
          >
            <h3 className="t-display-sm" style={{ marginBottom: 4 }}>Rate Your Ride</h3>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 16 }}>
              How was your experience?
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
              {[1, 2, 3, 4, 5].map(star => (
                <motion.button
                  key={star}
                  whileTap={{ scale: 0.85 }}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  onClick={() => setRating(star)}
                  style={{ padding: 4, cursor: 'pointer' }}
                >
                  <Star
                    size={36}
                    fill={(hoveredStar || rating) >= star ? 'var(--gold)' : 'none'}
                    color={(hoveredStar || rating) >= star ? 'var(--gold)' : 'var(--border)'}
                    strokeWidth={1.5}
                    style={{ transition: 'all 0.15s ease' }}
                  />
                </motion.button>
              ))}
            </div>

            {rating > 0 && (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ fontSize: 13, color: 'var(--green-rich)', fontWeight: 600, marginTop: 10 }}
              >
                {rating <= 2 ? 'We\'ll do better next time!' : rating <= 4 ? 'Thanks for the feedback!' : 'Glad you enjoyed it!'}
              </motion.p>
            )}
          </motion.div>

          {/* Fare Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            style={{ marginBottom: 24 }}
          >
            <button
              onClick={() => setFareOpen(!fareOpen)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                background: 'var(--bg-card)',
                borderRadius: fareOpen ? 'var(--radius-md) var(--radius-md) 0 0' : 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                borderBottom: fareOpen ? 'none' : '1px solid var(--border-light)',
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 600 }}>View Fare Breakdown</span>
              {fareOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            <AnimatePresence>
              {fareOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{
                    overflow: 'hidden',
                    background: 'var(--bg-card)',
                    borderRadius: '0 0 var(--radius-md) var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    borderTop: 'none',
                  }}
                >
                  <div style={{ padding: '0 16px 16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-light)' }}>
                      <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Buggy Fare</span>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>₹199</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-light)' }}>
                      <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Service Fee</span>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>₹5</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0 0' }}>
                      <span style={{ fontSize: 14, fontWeight: 700 }}>Total Paid</span>
                      <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--green-deep)' }}>₹204</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={() => navigate('/home')}
              className="btn btn-primary btn-full"
              style={{ padding: 16, fontSize: 15, fontWeight: 700, letterSpacing: '0.05em' }}
            >
              BACK TO HOME
            </button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}

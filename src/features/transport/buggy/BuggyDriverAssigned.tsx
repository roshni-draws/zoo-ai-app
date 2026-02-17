import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, MapPin, Clock, ChevronDown, ChevronUp, X, QrCode } from 'lucide-react'
import { BackHeader, PageTransition } from '../../../components'

export default function BuggyDriverAssigned() {
  const navigate = useNavigate()
  const [stage, setStage] = useState<'assigned' | 'arrived'>('assigned')
  const [fareOpen, setFareOpen] = useState(false)

  // Simulate buggy arriving after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setStage('arrived'), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title="Buggy Tour" />

        <div style={{ padding: '0 24px 120px' }}>
          {/* Payment Success */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center', padding: '16px 0 20px' }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
              style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'var(--green-rich)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px',
              }}
            >
              <Check size={28} color="white" strokeWidth={3} />
            </motion.div>
            <h2 className="t-display-md" style={{ marginBottom: 2 }}>Payment Successful</h2>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Your driver has been assigned</p>
          </motion.div>

          {/* Ride Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
            style={{ padding: 16, marginBottom: 14 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <h3 className="t-heading">Ride Details</h3>
              <AnimatePresence mode="wait">
                {stage === 'assigned' ? (
                  <motion.span
                    key="arriving"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="badge"
                    style={{
                      background: 'var(--gold-pale)',
                      color: 'var(--yellow-medium)',
                      fontSize: 10,
                    }}
                  >
                    <Clock size={10} /> Arriving in 2 min
                  </motion.span>
                ) : (
                  <motion.span
                    key="arrived"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="badge badge-active"
                    style={{ fontSize: 10 }}
                  >
                    <Check size={10} /> Arrived!
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{
                flex: 1,
                padding: '12px',
                background: 'var(--bg-primary)',
                borderRadius: 'var(--radius-md)',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 4 }}>Buggy Number</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--green-deep)' }}>BUG4444</div>
              </div>
              <div style={{
                flex: 1,
                padding: '12px',
                background: 'var(--bg-primary)',
                borderRadius: 'var(--radius-md)',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 4 }}>Guests</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--green-deep)' }}>02</div>
              </div>
            </div>
          </motion.div>

          {/* Location Card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
            style={{ padding: 16, marginBottom: 14 }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px',
              background: 'var(--bg-primary)',
              borderRadius: 'var(--radius-md)',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--green-rich)' }} />
                <div style={{ width: 1, height: 20, borderLeft: '2px dashed var(--border)' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--coral)' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Pickup</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>Main Entrance Gate</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Drop</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>Africa Rocks</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Fare Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            style={{ marginBottom: 14 }}
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
                      <span style={{ fontSize: 14, fontWeight: 700 }}>Total</span>
                      <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--green-deep)' }}>₹204</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Buggy Arrived State */}
          <AnimatePresence>
            {stage === 'arrived' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="card card-gradient"
                style={{ padding: 20, marginBottom: 14, textAlign: 'center' }}
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ fontSize: 40, marginBottom: 8 }}
                >
                  🚗
                </motion.div>
                <h3 className="t-display-md" style={{ color: 'white', marginBottom: 4 }}>Your Buggy has arrived!</h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', marginBottom: 16 }}>
                  Show this QR code or verification code to the driver
                </p>

                {/* QR Code placeholder */}
                <div style={{
                  width: 140, height: 140,
                  background: 'white', borderRadius: 'var(--radius-md)',
                  margin: '0 auto 12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: 12,
                }}>
                  <div style={{
                    width: '100%', height: '100%',
                    background: `repeating-conic-gradient(var(--green-deep) 0% 25%, white 0% 50%) 50% / 14px 14px`,
                    borderRadius: 4,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <QrCode size={40} color="var(--green-deep)" />
                  </div>
                </div>

                {/* Verification Code */}
                <div style={{
                  padding: '10px 20px',
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: 'var(--radius-full)',
                  display: 'inline-block',
                }}>
                  <span style={{ fontSize: 12, opacity: 0.7, color: 'white' }}>Verification Code: </span>
                  <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: '0.15em', color: 'var(--gold)' }}>
                    1718
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cancel Ride */}
          {stage === 'assigned' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ textAlign: 'center', marginTop: 8 }}
            >
              <button
                onClick={() => navigate('/transport')}
                style={{ fontSize: 14, color: 'var(--coral)', fontWeight: 600 }}
              >
                Cancel ride
              </button>
            </motion.div>
          )}

          {/* Track button (when arrived) */}
          {stage === 'arrived' && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <button
                onClick={() => navigate('/transport/buggy/tracking')}
                className="btn btn-primary btn-full"
                style={{ padding: 16, fontWeight: 700 }}
              >
                Start Ride & Track
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}

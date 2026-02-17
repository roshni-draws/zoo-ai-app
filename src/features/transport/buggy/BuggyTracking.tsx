import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Clock, Navigation, Car, Users } from 'lucide-react'
import { BackHeader, PageTransition } from '../../../components'

export default function BuggyTracking() {
  const navigate = useNavigate()
  const [dropEta, setDropEta] = useState(7)

  useEffect(() => {
    const interval = setInterval(() => {
      setDropEta(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          setTimeout(() => navigate('/transport/buggy/complete'), 2000)
          return 0
        }
        return prev - 1
      })
    }, 30000)
    return () => clearInterval(interval)
  }, [navigate])

  const routeProgress = 45 // percentage

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title="Buggy Tour" />

        <div style={{ padding: '0 24px 120px' }}>
          {/* Live Badge + ETA */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card card-dark"
            style={{ padding: 20, marginBottom: 20, textAlign: 'center', position: 'relative', overflow: 'hidden' }}
          >
            <div style={{ position: 'absolute', top: 12, right: 14 }}>
              <span className="badge badge-live" style={{ fontSize: 10, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%', background: 'white',
                  animation: 'breathe 2s ease-in-out infinite',
                }} />
                LIVE
              </span>
            </div>

            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>Drop in</div>
            <div style={{
              fontSize: 44, fontWeight: 800, fontFamily: 'var(--font-display)',
              color: 'var(--gold)', lineHeight: 1,
            }}>
              {dropEta} min
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>
              to Africa Rocks
            </div>
          </motion.div>

          {/* Route Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="card"
            style={{ padding: 16, marginBottom: 16 }}
          >
            <h3 className="t-display-sm" style={{ marginBottom: 16 }}>Ride Progress</h3>

            <div style={{ position: 'relative', padding: '0 12px', marginBottom: 20 }}>
              {/* Track */}
              <div style={{
                height: 6, background: 'var(--border-light)', borderRadius: 3,
                position: 'relative', overflow: 'hidden',
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${routeProgress}%` }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, var(--green-rich), var(--gold))',
                    borderRadius: 3,
                  }}
                />
              </div>

              {/* Pickup dot */}
              <div style={{ position: 'absolute', left: 0, top: -5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: 16, height: 16, borderRadius: '50%', background: 'var(--green-rich)',
                  border: '3px solid white', boxShadow: 'var(--shadow-sm)',
                }} />
                <span style={{ fontSize: 10, color: 'var(--text-tertiary)', marginTop: 6, whiteSpace: 'nowrap' }}>Pickup</span>
              </div>

              {/* Current position */}
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  position: 'absolute',
                  left: `calc(${routeProgress}% - 12px)`,
                  top: -9,
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                }}
              >
                <div style={{
                  width: 24, height: 24, borderRadius: '50%',
                  background: 'var(--gold)', border: '3px solid white',
                  boxShadow: '0 0 0 4px var(--gold-light), var(--shadow-md)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Car size={11} color="white" />
                </div>
              </motion.div>

              {/* Drop dot */}
              <div style={{ position: 'absolute', right: 0, top: -5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: 16, height: 16, borderRadius: '50%', background: 'var(--border-light)',
                  border: '3px solid white', boxShadow: 'var(--shadow-sm)',
                }} />
                <span style={{ fontSize: 10, color: 'var(--text-tertiary)', marginTop: 6, whiteSpace: 'nowrap' }}>Drop</span>
              </div>
            </div>
          </motion.div>

          {/* Ride Details */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="card"
            style={{ padding: 16, marginBottom: 16 }}
          >
            <h3 className="t-heading" style={{ marginBottom: 14 }}>Ride Details</h3>

            <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
              <div style={{
                flex: 1, padding: '10px 12px', background: 'var(--bg-primary)',
                borderRadius: 'var(--radius-sm)', textAlign: 'center',
              }}>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Buggy</div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>BUG4444</div>
              </div>
              <div style={{
                flex: 1, padding: '10px 12px', background: 'var(--bg-primary)',
                borderRadius: 'var(--radius-sm)', textAlign: 'center',
              }}>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Guests</div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>02</div>
              </div>
              <div style={{
                flex: 1, padding: '10px 12px', background: 'var(--gold-pale)',
                borderRadius: 'var(--radius-sm)', textAlign: 'center',
              }}>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Drop in</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--green-deep)' }}>{dropEta} min</div>
              </div>
            </div>

            {/* Location */}
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
                <div style={{ width: 1, height: 16, borderLeft: '2px dashed var(--border)' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--coral)' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 1 }}>Pickup</div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>Main Entrance Gate</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 1 }}>Drop</div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>Africa Rocks</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* SOS Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            style={{ textAlign: 'center' }}
          >
            <button style={{
              fontSize: 13,
              color: 'var(--coral)',
              fontWeight: 600,
              padding: '10px 20px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--coral-light)',
            }}>
              Need Help?
            </button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}

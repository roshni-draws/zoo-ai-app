import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Clock, Navigation, Bus, ChevronRight } from 'lucide-react'
import { BackHeader, PageTransition } from '../../../components'

const stops = [
  { name: 'Main Entrance Gate', time: '10:15 AM', status: 'completed' as const },
  { name: 'Elephant Odyssey', time: '10:20 AM', status: 'completed' as const },
  { name: 'Lost Forest', time: '10:25 AM', status: 'current' as const },
  { name: 'Panda Canyon', time: '10:28 AM', status: 'upcoming' as const },
  { name: 'Africa Rocks', time: '10:32 AM', status: 'upcoming' as const },
]

export default function ShuttleTracking() {
  const navigate = useNavigate()
  const [eta, setEta] = useState(7)

  useEffect(() => {
    const interval = setInterval(() => {
      setEta(prev => (prev > 1 ? prev - 1 : prev))
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const currentIndex = stops.findIndex(s => s.status === 'current')
  const progress = ((currentIndex + 0.5) / (stops.length - 1)) * 100

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title="Live Tracking" />

        <div style={{ padding: '0 24px 120px' }}>
          {/* ETA Banner */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card card-gradient"
            style={{
              padding: 20,
              marginBottom: 20,
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 4, color: 'white' }}>Estimated Arrival</div>
            <div style={{ fontSize: 40, fontWeight: 800, fontFamily: 'var(--font-display)', color: 'white', lineHeight: 1 }}>
              {eta} min
            </div>
            <div style={{ fontSize: 13, opacity: 0.7, marginTop: 4, color: 'white' }}>
              to Africa Rocks
            </div>
          </motion.div>

          {/* Route Progress Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="card"
            style={{ padding: 16, marginBottom: 20 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <h3 className="t-display-sm">Route Progress</h3>
              <span className="badge badge-live" style={{ fontSize: 10, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'white',
                  animation: 'breathe 2s ease-in-out infinite',
                }} />
                LIVE
              </span>
            </div>

            {/* Progress Bar */}
            <div style={{ position: 'relative', padding: '0 6px', marginBottom: 8 }}>
              <div style={{
                height: 4,
                background: 'var(--border-light)',
                borderRadius: 2,
                position: 'relative',
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, var(--green-rich), var(--green-mid))',
                    borderRadius: 2,
                  }}
                />
              </div>

              {/* Stop dots on progress bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: -8, position: 'relative' }}>
                {stops.map((stop, i) => (
                  <div
                    key={stop.name}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      position: 'relative',
                    }}
                  >
                    {stop.status === 'current' ? (
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: '50%',
                          background: 'var(--green-rich)',
                          border: '3px solid white',
                          boxShadow: '0 0 0 3px var(--green-light), var(--shadow-md)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Bus size={8} color="white" />
                      </motion.div>
                    ) : (
                      <div style={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        background: stop.status === 'completed' ? 'var(--green-rich)' : 'var(--border-light)',
                        border: stop.status === 'completed' ? '2px solid var(--green-light)' : '2px solid var(--border)',
                      }} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Stop labels */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
              {stops.map(stop => (
                <div key={stop.name} style={{
                  fontSize: 9,
                  color: stop.status === 'current' ? 'var(--green-rich)' : 'var(--text-tertiary)',
                  fontWeight: stop.status === 'current' ? 700 : 400,
                  textAlign: 'center',
                  maxWidth: 60,
                  lineHeight: 1.2,
                }}>
                  {stop.name.split(' ').slice(0, 2).join(' ')}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Current Location */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            style={{
              padding: '12px 14px',
              background: 'var(--green-pale)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--green-light)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 20,
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Navigation size={18} color="var(--green-rich)" />
            </motion.div>
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Current location</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--green-deep)' }}>Near Lost Forest</div>
            </div>
          </motion.div>

          {/* Stop List */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
            style={{ padding: 16 }}
          >
            <h3 className="t-display-sm" style={{ marginBottom: 14 }}>All Stops</h3>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {stops.map((stop, i) => (
                <div key={stop.name} style={{ display: 'flex', gap: 14 }}>
                  {/* Timeline */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 24 }}>
                    <div style={{
                      width: stop.status === 'current' ? 18 : 14,
                      height: stop.status === 'current' ? 18 : 14,
                      borderRadius: '50%',
                      background: stop.status === 'completed'
                        ? 'var(--green-rich)'
                        : stop.status === 'current'
                          ? 'var(--green-mid)'
                          : 'var(--bg-card)',
                      border: stop.status === 'upcoming' ? '2px solid var(--border)' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: stop.status === 'current' ? '0 0 0 4px var(--green-light)' : 'none',
                    }}>
                      {stop.status === 'completed' && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          style={{ color: 'white', display: 'flex' }}
                        >
                          <MapPin size={8} color="white" />
                        </motion.div>
                      )}
                      {stop.status === 'current' && (
                        <motion.div
                          animate={{ scale: [0.8, 1, 0.8] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Bus size={9} color="white" />
                        </motion.div>
                      )}
                    </div>
                    {i < stops.length - 1 && (
                      <div style={{
                        width: 2,
                        flex: 1,
                        minHeight: 28,
                        background: stop.status === 'completed' ? 'var(--green-rich)' : 'var(--border-light)',
                      }} />
                    )}
                  </div>

                  {/* Stop info */}
                  <div style={{
                    flex: 1,
                    paddingBottom: i < stops.length - 1 ? 14 : 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    <div>
                      <div style={{
                        fontSize: 14,
                        fontWeight: stop.status === 'current' ? 700 : 500,
                        color: stop.status === 'upcoming' ? 'var(--text-tertiary)' : 'var(--text-primary)',
                      }}>
                        {stop.name}
                      </div>
                      {stop.status === 'current' && (
                        <span style={{ fontSize: 11, color: 'var(--green-rich)', fontWeight: 600 }}>
                          Currently here
                        </span>
                      )}
                      {stop.status === 'completed' && (
                        <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Passed</span>
                      )}
                    </div>
                    <span style={{
                      fontSize: 12,
                      color: stop.status === 'upcoming' ? 'var(--text-tertiary)' : 'var(--text-secondary)',
                      fontWeight: stop.status === 'current' ? 600 : 400,
                    }}>
                      {stop.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}

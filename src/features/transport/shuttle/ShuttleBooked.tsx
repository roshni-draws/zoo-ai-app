import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Clock, Bus, Check, Navigation } from 'lucide-react'
import { BackHeader, PageTransition } from '../../../components'

const routeStops = [
  { name: 'Main Entrance Gate', time: '10:15 AM', status: 'start' },
  { name: 'Elephant Odyssey', time: '10:20 AM', status: 'stop' },
  { name: 'Lost Forest', time: '10:25 AM', status: 'stop' },
  { name: 'Panda Canyon', time: '10:28 AM', status: 'stop' },
  { name: 'Africa Rocks', time: '10:32 AM', status: 'end' },
]

export default function ShuttleBooked() {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title="Main Entrance → Africa Rocks" />

        <div style={{ padding: '0 24px 120px' }}>
          {/* Success Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            style={{
              textAlign: 'center',
              padding: '24px 0 20px',
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'var(--green-rich)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px',
              }}
            >
              <Check size={32} color="white" strokeWidth={3} />
            </motion.div>
            <h2 className="t-display-md" style={{ marginBottom: 4 }}>Shuttle Founded!</h2>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Your shuttle is on its way</p>
          </motion.div>

          {/* Bus Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
            style={{ padding: 16, marginBottom: 16 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
              <div style={{
                width: 52,
                height: 52,
                borderRadius: 'var(--radius-lg)',
                background: 'var(--green-pale)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Bus size={26} color="var(--green-rich)" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 700 }}>BUS0001</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Main Loop Route</div>
              </div>
              <div style={{
                padding: '6px 12px',
                background: 'var(--green-pale)',
                borderRadius: 'var(--radius-full)',
                fontSize: 12,
                fontWeight: 700,
                color: 'var(--green-rich)',
              }}>
                Arriving in 3 min
              </div>
            </div>

            <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--text-secondary)' }}>
              <span><strong>Departure:</strong> 10:15 AM</span>
              <span><strong>Arrival:</strong> 10:32 AM</span>
              <span><strong>Duration:</strong> ~17 min</span>
            </div>
          </motion.div>

          {/* Route Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card"
            style={{ padding: 16, marginBottom: 16 }}
          >
            <h3 className="t-display-sm" style={{ marginBottom: 16 }}>Route Timeline</h3>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {routeStops.map((stop, i) => (
                <div key={stop.name} style={{ display: 'flex', gap: 14 }}>
                  {/* Timeline connector */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 24 }}>
                    <div style={{
                      width: stop.status === 'start' || stop.status === 'end' ? 16 : 12,
                      height: stop.status === 'start' || stop.status === 'end' ? 16 : 12,
                      borderRadius: '50%',
                      background: stop.status === 'start'
                        ? 'var(--green-rich)'
                        : stop.status === 'end'
                          ? 'var(--coral)'
                          : 'var(--bg-card)',
                      border: stop.status === 'start' || stop.status === 'end'
                        ? 'none'
                        : '2px solid var(--green-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {stop.status === 'start' && <Navigation size={8} color="white" />}
                      {stop.status === 'end' && <MapPin size={8} color="white" />}
                    </div>
                    {i < routeStops.length - 1 && (
                      <div style={{
                        width: 2,
                        flex: 1,
                        minHeight: 32,
                        background: stop.status === 'start' ? 'var(--green-rich)' : 'var(--green-light)',
                      }} />
                    )}
                  </div>

                  {/* Stop info */}
                  <div style={{
                    flex: 1,
                    paddingBottom: i < routeStops.length - 1 ? 16 : 0,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{
                        fontSize: 14,
                        fontWeight: stop.status === 'start' || stop.status === 'end' ? 700 : 500,
                      }}>
                        {stop.name}
                      </span>
                      <span style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: stop.status === 'start' ? 'var(--green-rich)' : 'var(--text-secondary)',
                      }}>
                        {stop.time}
                      </span>
                    </div>
                    {stop.status === 'start' && (
                      <span style={{ fontSize: 11, color: 'var(--green-rich)' }}>Boarding Point</span>
                    )}
                    {stop.status === 'end' && (
                      <span style={{ fontSize: 11, color: 'var(--coral)' }}>Your Destination</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Track Shuttle */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={() => navigate('/transport/shuttle/tracking')}
              className="btn btn-secondary btn-full"
              style={{ marginBottom: 12 }}
            >
              <Clock size={18} />
              Track Shuttle Live
            </button>
          </motion.div>

          {/* Return Home */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <button
              onClick={() => navigate('/home')}
              className="btn btn-primary btn-full"
              style={{ padding: 16, fontSize: 15, fontWeight: 700, letterSpacing: '0.05em' }}
            >
              RETURN TO HOME
            </button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}

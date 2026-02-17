import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Clock, CloudRain, AlertTriangle, ChevronRight, Bus } from 'lucide-react'
import { BackHeader, PageTransition } from '../../../components'

const shuttles = [
  { id: 'BUS0001', departure: '10:15 AM', arrival: '10:32 AM', stops: 4, seats: 12 },
  { id: 'BUS0124', departure: '10:30 AM', arrival: '10:47 AM', stops: 4, seats: 8 },
  { id: 'BUS0037', departure: '10:45 AM', arrival: '11:02 AM', stops: 4, seats: 22 },
  { id: 'BUS0089', departure: '11:00 AM', arrival: '11:17 AM', stops: 4, seats: 35 },
  { id: 'BUS0142', departure: '11:15 AM', arrival: '11:32 AM', stops: 4, seats: 18 },
]

export default function ShuttleListing() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string | null>(null)
  const [showWeather, setShowWeather] = useState(true)

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title="Transport" />

        <div style={{ padding: '0 24px 120px' }}>
          {/* Selected Route Info */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
            style={{ padding: 14, marginBottom: 16 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 'var(--radius-md)',
                background: 'var(--green-pale)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Bus size={20} color="var(--green-rich)" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700 }}>Shuttle Bus</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Free Service</div>
              </div>
              <span className="badge badge-active" style={{ fontSize: 10 }}>FREE</span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 12px',
              background: 'var(--bg-primary)',
              borderRadius: 'var(--radius-sm)',
              marginBottom: 8,
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green-rich)' }} />
                <div style={{ width: 1, height: 16, background: 'var(--border)', borderLeft: '1px dashed var(--text-tertiary)' }} />
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--coral)' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>
                  <MapPin size={12} color="var(--green-rich)" style={{ display: 'inline', marginRight: 4 }} />
                  Main Entrance Gate
                </div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>
                  <MapPin size={12} color="var(--coral)" style={{ display: 'inline', marginRight: 4 }} />
                  Africa Rocks
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--text-secondary)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Clock size={12} /> Today, 10:00 AM
              </span>
              <span>4 stops</span>
              <span>~17 min ride</span>
            </div>
          </motion.div>

          {/* Weather Alert */}
          <AnimatePresence>
            {showWeather && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ marginBottom: 16, overflow: 'hidden' }}
              >
                <div style={{
                  padding: '12px 14px',
                  background: 'var(--orange-pale)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--amber-light)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                }}>
                  <CloudRain size={18} color="var(--amber)" style={{ flexShrink: 0, marginTop: 1 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--amber)', marginBottom: 2 }}>
                      <AlertTriangle size={12} style={{ display: 'inline', marginRight: 4 }} />
                      Weather Advisory
                    </div>
                    <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      Light rain expected around 11:30 AM. Shuttles may experience slight delays. Covered waiting areas available at all stops.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowWeather(false)}
                    style={{ fontSize: 11, color: 'var(--text-tertiary)', flexShrink: 0 }}
                  >
                    Dismiss
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Available Shuttles */}
          <div style={{ marginBottom: 8 }}>
            <h3 className="t-display-sm" style={{ marginBottom: 14 }}>Available Shuttles</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {shuttles.map((shuttle, i) => (
              <motion.button
                key={shuttle.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelected(shuttle.id)}
                className="card"
                style={{
                  padding: 14,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  textAlign: 'left',
                  cursor: 'pointer',
                  border: selected === shuttle.id
                    ? '2px solid var(--green-rich)'
                    : '1px solid var(--border-light)',
                  background: selected === shuttle.id ? 'var(--green-pale)' : 'var(--bg-card)',
                  transition: 'all 0.2s ease',
                }}
              >
                {/* Bus icon */}
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-md)',
                  background: selected === shuttle.id ? 'var(--green-rich)' : 'var(--bg-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.2s ease',
                }}>
                  <Bus size={20} color={selected === shuttle.id ? 'white' : 'var(--green-rich)'} />
                </div>

                {/* Info */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 700 }}>{shuttle.id}</span>
                    <span className="badge" style={{
                      background: shuttle.seats <= 10 ? 'var(--coral-pale)' : 'var(--green-pale)',
                      color: shuttle.seats <= 10 ? 'var(--coral)' : 'var(--green-rich)',
                      fontSize: 10,
                    }}>
                      {shuttle.seats} seats
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                    Departs {shuttle.departure} · Arrives {shuttle.arrival}
                  </div>
                </div>

                <ChevronRight size={18} color="var(--text-tertiary)" />
              </motion.button>
            ))}
          </div>

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ marginTop: 24 }}
          >
            <button
              onClick={() => selected && navigate('/transport/shuttle/booked')}
              className={`btn btn-full ${selected ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                padding: 16,
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: '0.05em',
                opacity: selected ? 1 : 0.5,
              }}
            >
              CONTINUE
            </button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}

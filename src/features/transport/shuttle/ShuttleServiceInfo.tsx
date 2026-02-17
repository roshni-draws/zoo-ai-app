import { motion } from 'framer-motion'
import { Clock, MapPin, Accessibility, AlertCircle } from 'lucide-react'
import { BackHeader, PageTransition } from '../../../components'

const scheduleData = [
  { route: 'Main Loop', first: '8:00 AM', last: '6:00 PM', frequency: '15 min' },
  { route: 'Express (North)', first: '9:00 AM', last: '5:30 PM', frequency: '20 min' },
  { route: 'Express (South)', first: '9:00 AM', last: '5:30 PM', frequency: '20 min' },
  { route: 'Evening Loop', first: '5:00 PM', last: '9:00 PM', frequency: '10 min' },
]

const stopsData = [
  'Main Entrance Gate',
  'Elephant Odyssey',
  'Africa Rocks',
  'Lost Forest',
  'Panda Canyon',
  'Polar Bear Plunge',
  'Penguin Beach',
  'Discovery Outpost',
  'Gorilla Forest',
  'Exit Gate',
]

export default function ShuttleServiceInfo() {
  return (
    <PageTransition>
      <div className="page">
        <BackHeader title="Shuttle Service" />

        <div style={{ padding: '0 24px 120px' }}>
          {/* Bus Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            style={{
              width: '100%',
              height: 180,
              borderRadius: 'var(--radius-lg)',
              background: 'linear-gradient(135deg, var(--green-pale) 0%, var(--green-light) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 40,
              background: 'var(--green-rich)',
              opacity: 0.15,
              borderRadius: '50% 50% 0 0',
            }} />
            <motion.span
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{ fontSize: 80, position: 'relative', zIndex: 1 }}
            >
              🚌
            </motion.span>
          </motion.div>

          {/* About the Service */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
            style={{ padding: 16, marginBottom: 16 }}
          >
            <h3 className="t-display-sm" style={{ marginBottom: 12 }}>About the Service</h3>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>
              Our free shuttle bus service makes getting around the zoo easy and comfortable. Buses run on a continuous loop, stopping at all major zones and attractions. Simply wait at any marked bus stop and hop on the next available shuttle.
            </p>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Each shuttle can accommodate up to 40 passengers with dedicated wheelchair accessibility. Real-time tracking is available so you always know when the next bus is arriving.
            </p>
          </motion.div>

          {/* Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
            style={{ padding: 16, marginBottom: 16 }}
          >
            <h3 className="t-display-sm" style={{ marginBottom: 14 }}>Bus Schedule</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {scheduleData.map((route, i) => (
                <div
                  key={route.route}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    background: i % 2 === 0 ? 'var(--green-pale)' : 'var(--bg-primary)',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{route.route}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{route.first} - {route.last}</div>
                  </div>
                  <span className="badge badge-active" style={{ fontSize: 10 }}>
                    <Clock size={10} /> Every {route.frequency}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Fare Info */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card card-gradient"
            style={{ padding: 20, marginBottom: 16, textAlign: 'center' }}
          >
            <div style={{ fontSize: 40, marginBottom: 8 }}>🎟️</div>
            <h3 className="t-display-md" style={{ color: 'white', marginBottom: 4 }}>Completely Free!</h3>
            <p style={{ fontSize: 13, opacity: 0.8, color: 'white' }}>
              Shuttle buses are included with your zoo admission. No extra tickets needed.
            </p>
          </motion.div>

          {/* Stops */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card"
            style={{ padding: 16, marginBottom: 16 }}
          >
            <h3 className="t-display-sm" style={{ marginBottom: 14 }}>All Stops</h3>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {stopsData.map((stop, i) => (
                <div key={stop} style={{ display: 'flex', alignItems: 'center', gap: 12, paddingLeft: 8 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: i === 0 || i === stopsData.length - 1 ? 'var(--green-rich)' : 'var(--green-light)',
                      border: '2px solid var(--green-rich)',
                    }} />
                    {i < stopsData.length - 1 && (
                      <div style={{ width: 2, height: 24, background: 'var(--green-light)' }} />
                    )}
                  </div>
                  <div style={{
                    fontSize: 14,
                    fontWeight: i === 0 || i === stopsData.length - 1 ? 600 : 400,
                    padding: '6px 0',
                  }}>
                    <MapPin size={12} color="var(--text-secondary)" style={{ display: 'inline', marginRight: 6 }} />
                    {stop}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Wheelchair Accessibility */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="card"
            style={{
              padding: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              background: 'var(--sky-pale)',
              border: '1px solid var(--sky-light)',
            }}
          >
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 'var(--radius-md)',
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Accessibility size={24} color="var(--sky)" />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>Wheelchair Friendly</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                All shuttles are equipped with wheelchair ramps and designated seating areas. Priority boarding available.
              </div>
            </div>
          </motion.div>

          {/* Note */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 8,
            marginTop: 16,
            padding: '12px 14px',
            background: 'var(--orange-pale)',
            borderRadius: 'var(--radius-sm)',
          }}>
            <AlertCircle size={16} color="var(--amber)" style={{ flexShrink: 0, marginTop: 1 }} />
            <span style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              Schedule may vary on holidays and special event days. Check the app for real-time updates.
            </span>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronDown, Clock, Accessibility, Info, MapPin } from 'lucide-react'
import { BackHeader, PageTransition } from '../../../components'

const pickupLocations = [
  'Main Entrance Gate',
  'Elephant Odyssey',
  'Lost Forest',
  'Polar Bear Plunge',
  'Africa Rocks',
  'Panda Canyon',
]

const dropLocations = [
  'Africa Rocks',
  'Penguin Beach',
  'Gorilla Forest',
  'Discovery Outpost',
  'Reptile House',
  'Exit Gate',
]

export default function ShuttleLanding({ embedded }: { embedded?: boolean }) {
  const navigate = useNavigate()
  const [pickup, setPickup] = useState('')
  const [drop, setDrop] = useState('')
  const [pickupOpen, setPickupOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)

  const content = (
    <div style={{ padding: '20px 24px 120px' }}>
      {/* About the Service */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
        style={{ padding: 16, marginBottom: 16 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h3 className="t-display-sm">About the Service</h3>
          <button
            onClick={() => navigate('/transport/shuttle/info')}
            style={{ color: 'var(--green-rich)', display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600 }}
          >
            <Info size={14} /> More Info
          </button>
        </div>

        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 16 }}>
          Free shuttle buses run throughout the zoo connecting all major zones. Hop on at any stop and enjoy a comfortable ride to your destination.
        </p>

        {/* Info badges */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 14px',
            background: 'var(--green-pale)',
            borderRadius: 'var(--radius-md)',
            flex: 1,
            minWidth: 140,
          }}>
            <Clock size={18} color="var(--green-rich)" />
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--green-deep)' }}>Every 15 mins</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Frequency</div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 14px',
            background: 'var(--gold-pale)',
            borderRadius: 'var(--radius-md)',
            flex: 1,
            minWidth: 100,
          }}>
            <span style={{ fontSize: 20 }}>🎟️</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--green-deep)' }}>Free</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Fare</div>
            </div>
          </div>
        </div>

        {/* Wheelchair Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginTop: 12,
          padding: '8px 12px',
          background: 'var(--sky-pale)',
          borderRadius: 'var(--radius-sm)',
        }}>
          <Accessibility size={16} color="var(--sky)" />
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--sky)' }}>Wheelchair Accessible</span>
        </div>
      </motion.div>

      {/* Pick up Location */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{ marginBottom: 12 }}
      >
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6, color: 'var(--text-secondary)' }}>
          Pick up Location
        </label>
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => { setPickupOpen(!pickupOpen); setDropOpen(false) }}
            className="input"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              textAlign: 'left',
              cursor: 'pointer',
              color: pickup ? 'var(--text-primary)' : 'var(--text-tertiary)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <MapPin size={16} color="var(--green-rich)" />
              {pickup || 'Select pickup location'}
            </div>
            <ChevronDown size={18} style={{ transform: pickupOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
          </button>
          {pickupOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--border-light)',
                zIndex: 20,
                marginTop: 4,
                overflow: 'hidden',
              }}
            >
              {pickupLocations.map(loc => (
                <button
                  key={loc}
                  onClick={() => { setPickup(loc); setPickupOpen(false) }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    width: '100%',
                    padding: '12px 14px',
                    fontSize: 14,
                    textAlign: 'left',
                    background: pickup === loc ? 'var(--green-pale)' : 'transparent',
                    borderBottom: '1px solid var(--border-light)',
                  }}
                >
                  <MapPin size={14} color="var(--green-rich)" />
                  {loc}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Drop Location */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ marginBottom: 20 }}
      >
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6, color: 'var(--text-secondary)' }}>
          Drop Location
        </label>
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => { setDropOpen(!dropOpen); setPickupOpen(false) }}
            className="input"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              textAlign: 'left',
              cursor: 'pointer',
              color: drop ? 'var(--text-primary)' : 'var(--text-tertiary)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <MapPin size={16} color="var(--coral)" />
              {drop || 'Select drop location'}
            </div>
            <ChevronDown size={18} style={{ transform: dropOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
          </button>
          {dropOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--border-light)',
                zIndex: 20,
                marginTop: 4,
                overflow: 'hidden',
              }}
            >
              {dropLocations.map(loc => (
                <button
                  key={loc}
                  onClick={() => { setDrop(loc); setDropOpen(false) }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    width: '100%',
                    padding: '12px 14px',
                    fontSize: 14,
                    textAlign: 'left',
                    background: drop === loc ? 'var(--green-pale)' : 'transparent',
                    borderBottom: '1px solid var(--border-light)',
                  }}
                >
                  <MapPin size={14} color="var(--coral)" />
                  {loc}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Set Time & Date Button */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <button
          onClick={() => {
            if (pickup && drop) navigate('/transport/shuttle/date')
          }}
          className={`btn btn-full ${pickup && drop ? 'btn-primary' : 'btn-secondary'}`}
          style={{
            padding: 16,
            fontSize: 15,
            opacity: pickup && drop ? 1 : 0.5,
          }}
        >
          <Clock size={18} />
          Set Time & Date
        </button>
      </motion.div>

      {/* Note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          fontSize: 12,
          color: 'var(--text-tertiary)',
          textAlign: 'center',
          marginTop: 12,
          lineHeight: 1.4,
        }}
      >
        Please select locations to see available transports
      </motion.p>
    </div>
  )

  if (embedded) return content

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title="Transport" />
        {content}
      </div>
    </PageTransition>
  )
}

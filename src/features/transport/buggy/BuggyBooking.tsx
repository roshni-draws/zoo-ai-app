import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Users, Minus, Plus, ChevronDown, Accessibility, Car } from 'lucide-react'
import { BackHeader, PageTransition } from '../../../components'

const locations = [
  'Main Entrance Gate',
  'Elephant Odyssey',
  'Lost Forest',
  'Africa Rocks',
  'Panda Canyon',
  'Polar Bear Plunge',
  'Penguin Beach',
  'Discovery Outpost',
  'Gorilla Forest',
  'Reptile House',
]

const PRICE_PER_BUGGY = 199

export default function BuggyBooking() {
  const navigate = useNavigate()
  const [buggyCount, setBuggyCount] = useState(1)
  const [pickup, setPickup] = useState('')
  const [drop, setDrop] = useState('')
  const [pickupOpen, setPickupOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [wheelchair, setWheelchair] = useState(false)

  const total = buggyCount * PRICE_PER_BUGGY

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title="Transport" />

        <div style={{ padding: '0 24px 120px' }}>
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginBottom: 20 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 'var(--radius-md)',
                background: 'var(--gold-pale)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Car size={22} color="var(--gold)" />
              </div>
              <div>
                <h2 className="t-display-sm">Private Buggy</h2>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>₹{PRICE_PER_BUGGY} per ride</p>
              </div>
            </div>
          </motion.div>

          {/* Number of Buggy */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
            style={{ padding: 16, marginBottom: 16 }}
          >
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 10, color: 'var(--text-secondary)' }}>
              Number of Buggy
            </label>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setBuggyCount(c => Math.max(1, c - 1))}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 'var(--radius-full)',
                  border: '1.5px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--bg-card)',
                }}
              >
                <Minus size={18} color="var(--text-secondary)" />
              </motion.button>
              <span style={{
                fontSize: 28,
                fontWeight: 800,
                fontFamily: 'var(--font-display)',
                minWidth: 40,
                textAlign: 'center',
              }}>
                {buggyCount}
              </span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setBuggyCount(c => Math.min(5, c + 1))}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--green-deep)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Plus size={18} color="white" />
              </motion.button>
            </div>
          </motion.div>

          {/* Select Location */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
            style={{ padding: 16, marginBottom: 16 }}
          >
            <h3 className="t-heading" style={{ marginBottom: 14 }}>Select Location</h3>

            {/* Pickup */}
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Pickup Location
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
                    {pickup || 'Select pickup'}
                  </div>
                  <ChevronDown size={16} style={{ transform: pickupOpen ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
                </button>
                {pickupOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      position: 'absolute', top: '100%', left: 0, right: 0,
                      background: 'var(--bg-card)', borderRadius: 'var(--radius-md)',
                      boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-light)',
                      zIndex: 20, marginTop: 4, maxHeight: 200, overflow: 'auto',
                    }}
                  >
                    {locations.map(loc => (
                      <button
                        key={loc}
                        onClick={() => { setPickup(loc); setPickupOpen(false) }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 8,
                          width: '100%', padding: '10px 14px', fontSize: 13,
                          textAlign: 'left', background: pickup === loc ? 'var(--green-pale)' : 'transparent',
                          borderBottom: '1px solid var(--border-light)',
                        }}
                      >
                        <MapPin size={12} color="var(--green-rich)" /> {loc}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Drop */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
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
                  <ChevronDown size={16} style={{ transform: dropOpen ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
                </button>
                {dropOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      position: 'absolute', top: '100%', left: 0, right: 0,
                      background: 'var(--bg-card)', borderRadius: 'var(--radius-md)',
                      boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-light)',
                      zIndex: 20, marginTop: 4, maxHeight: 200, overflow: 'auto',
                    }}
                  >
                    {locations.map(loc => (
                      <button
                        key={loc}
                        onClick={() => { setDrop(loc); setDropOpen(false) }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 8,
                          width: '100%', padding: '10px 14px', fontSize: 13,
                          textAlign: 'left', background: drop === loc ? 'var(--green-pale)' : 'transparent',
                          borderBottom: '1px solid var(--border-light)',
                        }}
                      >
                        <MapPin size={12} color="var(--coral)" /> {loc}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* How many people? */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
            style={{ padding: 16, marginBottom: 16 }}
          >
            <h3 className="t-heading" style={{ marginBottom: 14 }}>
              <Users size={16} style={{ display: 'inline', marginRight: 6 }} />
              How many people?
            </h3>

            {/* Adults */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-light)' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>Adult</div>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Age 12+</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setAdults(a => Math.max(1, a - 1))}
                  style={{
                    width: 32, height: 32, borderRadius: 'var(--radius-full)',
                    border: '1.5px solid var(--border)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', background: 'var(--bg-card)',
                  }}
                >
                  <Minus size={14} />
                </motion.button>
                <span style={{ fontWeight: 700, fontSize: 16, minWidth: 20, textAlign: 'center' }}>{adults}</span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setAdults(a => Math.min(10, a + 1))}
                  style={{
                    width: 32, height: 32, borderRadius: 'var(--radius-full)',
                    background: 'var(--green-deep)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <Plus size={14} color="white" />
                </motion.button>
              </div>
            </div>

            {/* Children */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>Children</div>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Age 3-11</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setChildren(c => Math.max(0, c - 1))}
                  style={{
                    width: 32, height: 32, borderRadius: 'var(--radius-full)',
                    border: '1.5px solid var(--border)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', background: 'var(--bg-card)',
                  }}
                >
                  <Minus size={14} />
                </motion.button>
                <span style={{ fontWeight: 700, fontSize: 16, minWidth: 20, textAlign: 'center' }}>{children}</span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setChildren(c => Math.min(8, c + 1))}
                  style={{
                    width: 32, height: 32, borderRadius: 'var(--radius-full)',
                    background: 'var(--green-deep)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <Plus size={14} color="white" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Wheelchair */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            style={{ marginBottom: 24 }}
          >
            <button
              onClick={() => setWheelchair(!wheelchair)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                width: '100%',
                padding: '14px 16px',
                background: wheelchair ? 'var(--sky-pale)' : 'var(--bg-card)',
                border: wheelchair ? '1.5px solid var(--sky)' : '1.5px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                textAlign: 'left',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{
                width: 22, height: 22, borderRadius: 6,
                border: wheelchair ? 'none' : '2px solid var(--border)',
                background: wheelchair ? 'var(--sky)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, transition: 'all 0.2s ease',
              }}>
                {wheelchair && <Accessibility size={14} color="white" />}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>Wheelchair Accessible Buggy</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Request a buggy with wheelchair support</div>
              </div>
            </button>
          </motion.div>

          {/* Book Button */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={() => pickup && drop ? navigate('/transport/buggy/confirmation') : null}
              className={`btn btn-full ${pickup && drop ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                padding: 16,
                fontSize: 15,
                fontWeight: 700,
                opacity: pickup && drop ? 1 : 0.5,
              }}
            >
              <span>BOOK A BUGGY</span>
              <span style={{
                marginLeft: 8,
                padding: '4px 10px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: 'var(--radius-full)',
                fontSize: 13,
              }}>
                ₹{total}
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}

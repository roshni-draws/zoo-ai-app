import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Check, MapPin, RotateCcw } from 'lucide-react'
import { BackHeader, PageTransition } from '../../components'

const dateRangeOptions = ['Today', 'Tomorrow', 'This Weekend', 'This Week', 'Next Week', 'Custom']

const eventTypes = [
  { id: 'talks', label: 'Keeper Talks', icon: '🎤' },
  { id: 'feedings', label: 'Animal Feedings', icon: '🐟' },
  { id: 'shows', label: 'Live Shows', icon: '🎪' },
  { id: 'workshops', label: 'Workshops', icon: '🎨' },
  { id: 'tours', label: 'Guided Tours', icon: '🚶' },
  { id: 'special', label: 'Special Events', icon: '🌟' },
]

const zoneOptions = [
  'All Zones',
  'Africa Rocks',
  'Elephant Odyssey',
  'Lost Forest',
  'Polar Rim',
  'Urban Jungle',
  'Australian Outback',
  'Penguin Beach',
  'Sea Lion Point',
  'Discovery Outpost',
]

const timeSlots = ['Morning (9-12)', 'Afternoon (12-3)', 'Evening (3-6)']

export default function EventFilter() {
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState('Today')
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedZone, setSelectedZone] = useState('All Zones')
  const [selectedTimes, setSelectedTimes] = useState<string[]>([])
  const [familyFriendly, setFamilyFriendly] = useState(false)
  const [freeOnly, setFreeOnly] = useState(false)

  const toggleType = (id: string) => {
    setSelectedTypes(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    )
  }

  const toggleTime = (slot: string) => {
    setSelectedTimes(prev =>
      prev.includes(slot) ? prev.filter(t => t !== slot) : [...prev, slot]
    )
  }

  const clearAll = () => {
    setSelectedDate('Today')
    setSelectedTypes([])
    setSelectedZone('All Zones')
    setSelectedTimes([])
    setFamilyFriendly(false)
    setFreeOnly(false)
  }

  const activeCount = [
    selectedDate !== 'Today' ? 1 : 0,
    selectedTypes.length,
    selectedZone !== 'All Zones' ? 1 : 0,
    selectedTimes.length,
    familyFriendly ? 1 : 0,
    freeOnly ? 1 : 0,
  ].reduce((a, b) => a + b, 0)

  return (
    <PageTransition>
      <div className="page">
        <BackHeader
          title="Filter Events"
          right={
            activeCount > 0 ? (
              <button onClick={clearAll} style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--coral)', fontSize: 13, fontWeight: 600 }}>
                <RotateCcw size={14} /> Clear
              </button>
            ) : undefined
          }
        />

        <div style={{ padding: '0 24px 140px' }}>
          {/* Date Range */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Calendar size={18} color="var(--green-rich)" />
              <span className="t-display-sm">Date</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
              {dateRangeOptions.map(opt => (
                <motion.button
                  key={opt}
                  whileTap={{ scale: 0.95 }}
                  className={`chip ${selectedDate === opt ? 'chip-active' : ''}`}
                  onClick={() => setSelectedDate(opt)}
                >
                  {opt}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Event Type */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span className="t-display-sm" style={{ display: 'block', marginBottom: 12 }}>Event Type</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
              {eventTypes.map(type => {
                const isSelected = selectedTypes.includes(type.id)
                return (
                  <motion.button
                    key={type.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleType(type.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '14px 16px',
                      borderRadius: 'var(--radius-md)',
                      background: isSelected ? 'var(--green-pale)' : 'var(--bg-card)',
                      border: `1.5px solid ${isSelected ? 'var(--green-rich)' : 'var(--border)'}`,
                      transition: 'all 0.2s ease',
                      textAlign: 'left',
                    }}
                  >
                    <span style={{ fontSize: 22 }}>{type.icon}</span>
                    <span style={{ flex: 1, fontSize: 15, fontWeight: isSelected ? 600 : 500 }}>{type.label}</span>
                    <div style={{
                      width: 22,
                      height: 22,
                      borderRadius: 6,
                      border: `2px solid ${isSelected ? 'var(--green-rich)' : 'var(--border)'}`,
                      background: isSelected ? 'var(--green-rich)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                    }}>
                      {isSelected && <Check size={14} color="white" strokeWidth={3} />}
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>

          {/* Time of Day */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <span className="t-display-sm" style={{ display: 'block', marginBottom: 12 }}>Time of Day</span>
            <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
              {timeSlots.map(slot => (
                <motion.button
                  key={slot}
                  whileTap={{ scale: 0.95 }}
                  className={`chip ${selectedTimes.includes(slot) ? 'chip-active' : ''}`}
                  onClick={() => toggleTime(slot)}
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  {slot}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Zone Selector */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <MapPin size={18} color="var(--green-rich)" />
              <span className="t-display-sm">Zone</span>
            </div>
            <select
              value={selectedZone}
              onChange={e => setSelectedZone(e.target.value)}
              className="input"
              style={{ marginBottom: 28, appearance: 'auto' }}
            >
              {zoneOptions.map(z => (
                <option key={z} value={z}>{z}</option>
              ))}
            </select>
          </motion.div>

          {/* Toggles */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-light)',
              }}
            >
              <span style={{ fontSize: 15, fontWeight: 500 }}>Family Friendly Only</span>
              <button
                onClick={() => setFamilyFriendly(!familyFriendly)}
                style={{
                  width: 48,
                  height: 28,
                  borderRadius: 14,
                  background: familyFriendly ? 'var(--green-rich)' : 'var(--border)',
                  position: 'relative',
                  transition: 'background 0.2s ease',
                }}
              >
                <motion.div
                  animate={{ x: familyFriendly ? 22 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: 'white',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                    position: 'absolute',
                    top: 2,
                  }}
                />
              </button>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-light)',
              }}
            >
              <span style={{ fontSize: 15, fontWeight: 500 }}>Free Events Only</span>
              <button
                onClick={() => setFreeOnly(!freeOnly)}
                style={{
                  width: 48,
                  height: 28,
                  borderRadius: 14,
                  background: freeOnly ? 'var(--green-rich)' : 'var(--border)',
                  position: 'relative',
                  transition: 'background 0.2s ease',
                }}
              >
                <motion.div
                  animate={{ x: freeOnly ? 22 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: 'white',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                    position: 'absolute',
                    top: 2,
                  }}
                />
              </button>
            </div>
          </motion.div>

          {/* Apply / Clear */}
          <div style={{ display: 'flex', gap: 12 }}>
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="btn btn-secondary"
              onClick={clearAll}
              style={{ flex: 1 }}
            >
              Clear All
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="btn btn-primary"
              onClick={() => navigate(-1)}
              style={{ flex: 2 }}
            >
              Apply Filters {activeCount > 0 && `(${activeCount})`}
            </motion.button>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

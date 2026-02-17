import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Clock, MapPin, Users, X, SlidersHorizontal, Sparkles, CalendarDays } from 'lucide-react'
import { BackHeader, PageTransition } from '../../components'

const quickFilters = [
  { label: 'Weekdays', icon: '📅' },
  { label: 'Today', icon: '🌟' },
  { label: 'For You', icon: '✨' },
  { label: 'Free', icon: '🎟️' },
  { label: 'Family', icon: '👨‍👩‍👧' },
]

const allEvents = [
  { id: 'ev1', name: 'Elephant Keeper Talk', type: 'Talk', time: '10:15 AM', zone: 'Elephant Odyssey', spotsLeft: 12, image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=400&h=300&fit=crop', tags: ['Weekdays', 'Today', 'For You', 'Free', 'Family'] },
  { id: 'ev2', name: 'Sea Lion Feeding', type: 'Feeding', time: '11:00 AM', zone: 'Sea Lion Point', spotsLeft: 28, image: 'https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=400&h=300&fit=crop', tags: ['Weekdays', 'Today', 'Free', 'Family'] },
  { id: 'ev3', name: 'Birds of Prey Show', type: 'Show', time: '1:30 PM', zone: 'Wegeforth Bowl', spotsLeft: 74, image: 'https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=400&h=300&fit=crop', tags: ['Weekdays', 'Today', 'Free'] },
  { id: 'ev4', name: 'Penguin Feeding', type: 'Feeding', time: '2:00 PM', zone: 'Penguin Beach', spotsLeft: 8, image: 'https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?w=400&h=300&fit=crop', tags: ['Weekdays', 'Today', 'For You', 'Free', 'Family'] },
  { id: 'ev5', name: 'Gorilla Keeper Talk', type: 'Talk', time: '3:00 PM', zone: 'Lost Forest', spotsLeft: 22, image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=300&fit=crop', tags: ['Weekdays', 'Today', 'Free'] },
  { id: 'ev6', name: 'Wildlife Art Workshop', type: 'Workshop', time: '11:30 AM', zone: 'Education Center', spotsLeft: 5, image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=300&fit=crop', tags: ['Weekdays', 'Today', 'For You'] },
  { id: 'ev7', name: 'Night Safari Experience', type: 'Show', time: '5:00 PM', zone: 'Main Stage', spotsLeft: 142, image: 'https://images.unsplash.com/photo-1504173010664-32509aeebb62?w=400&h=300&fit=crop', tags: ['Weekdays', 'For You'] },
  { id: 'ev8', name: 'Junior Zookeeper Workshop', type: 'Workshop', time: '10:00 AM', zone: 'Discovery Outpost', spotsLeft: 3, image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop', tags: ['Weekdays', 'Today', 'Family'] },
  { id: 'ev9', name: 'Flamingo Photo Walk', type: 'Talk', time: '9:30 AM', zone: 'Flamingo Lagoon', spotsLeft: 18, image: 'https://images.unsplash.com/photo-1497206365907-f5e630693df0?w=400&h=300&fit=crop', tags: ['Today', 'For You', 'Free'] },
  { id: 'ev10', name: 'Tiger Conservation Talk', type: 'Talk', time: '4:00 PM', zone: 'Tiger Trail', spotsLeft: 30, image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=400&h=300&fit=crop', tags: ['Weekdays', 'Free'] },
]

export default function EventSearch() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const toggleFilter = (label: string) => {
    setActiveFilters(prev =>
      prev.includes(label) ? prev.filter(f => f !== label) : [...prev, label]
    )
  }

  const results = useMemo(() => {
    let filtered = allEvents

    if (query.trim()) {
      const q = query.toLowerCase()
      filtered = filtered.filter(e =>
        e.name.toLowerCase().includes(q) ||
        e.zone.toLowerCase().includes(q) ||
        e.type.toLowerCase().includes(q)
      )
    }

    if (activeFilters.length > 0) {
      filtered = filtered.filter(e =>
        activeFilters.every(f => e.tags.includes(f))
      )
    }

    return filtered
  }, [query, activeFilters])

  return (
    <PageTransition>
      <div className="page">
        <BackHeader
          title="Shows & Events"
          right={
            <button
              onClick={() => navigate('/events/filter')}
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'var(--bg-card)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--border-light)',
              }}
            >
              <SlidersHorizontal size={16} color="var(--green-rich)" />
            </button>
          }
        />

        <div style={{ padding: '0 24px' }}>
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="search-bar"
            style={{ marginBottom: 16 }}
          >
            <Search size={18} color="var(--text-tertiary)" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search events, shows, workshops..."
              style={{ flex: 1, fontSize: 15 }}
            />
            {query && (
              <button onClick={() => setQuery('')}>
                <X size={16} color="var(--text-tertiary)" />
              </button>
            )}
          </motion.div>

          {/* Filter Chips */}
          <div style={{
            display: 'flex',
            gap: 8,
            marginBottom: 20,
            overflowX: 'auto',
            scrollbarWidth: 'none',
            paddingBottom: 2,
          }}>
            {quickFilters.map(f => (
              <motion.button
                key={f.label}
                whileTap={{ scale: 0.95 }}
                className={`chip ${activeFilters.includes(f.label) ? 'chip-active' : ''}`}
                onClick={() => toggleFilter(f.label)}
              >
                {f.icon} {f.label}
              </motion.button>
            ))}
          </div>

          {/* Results Count */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <span className="t-body-sm" style={{ color: 'var(--text-secondary)' }}>
              {results.length} {results.length === 1 ? 'event' : 'events'} found
            </span>
            {activeFilters.length > 0 && (
              <button
                onClick={() => setActiveFilters([])}
                style={{ fontSize: 12, color: 'var(--coral)', fontWeight: 600 }}
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Search Results */}
        <div style={{ padding: '0 24px 120px' }}>
          <AnimatePresence mode="popLayout">
            {results.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  textAlign: 'center',
                  padding: '48px 24px',
                }}
              >
                <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
                <h3 className="t-display-sm" style={{ marginBottom: 6 }}>No events found</h3>
                <p className="t-body-sm" style={{ color: 'var(--text-secondary)' }}>
                  Try adjusting your search or filters
                </p>
              </motion.div>
            ) : (
              results.map((event, i) => (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="card"
                  onClick={() => navigate(`/events/${event.id}`)}
                  style={{
                    display: 'flex',
                    gap: 14,
                    padding: 12,
                    marginBottom: 10,
                    cursor: 'pointer',
                  }}
                >
                  {/* Thumbnail */}
                  <div style={{
                    width: 80,
                    height: 80,
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}>
                    <img src={event.image} alt={event.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 3 }}>{event.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Clock size={11} /> {event.time}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <MapPin size={11} /> {event.zone}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="badge" style={{
                        background: 'var(--green-pale)',
                        color: 'var(--green-rich)',
                        fontSize: 10,
                      }}>
                        {event.type}
                      </span>
                      <span style={{
                        fontSize: 11,
                        color: event.spotsLeft <= 10 ? 'var(--coral)' : 'var(--text-tertiary)',
                        fontWeight: event.spotsLeft <= 10 ? 600 : 400,
                      }}>
                        <Users size={11} style={{ verticalAlign: 'middle', marginRight: 3 }} />
                        {event.spotsLeft} spots
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  )
}

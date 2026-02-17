import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, MapPin, Users, ChevronRight, Ticket, Star } from 'lucide-react'
import { BackHeader, PageTransition } from '../../components'

const filterChips = ['All', 'Talks', 'Feedings', 'Shows', 'Workshops']

const eventsData = [
  {
    id: 'ev1',
    name: 'Elephant Keeper Talk',
    type: 'Talks',
    time: '10:15 AM',
    duration: '20 min',
    zone: 'Elephant Odyssey',
    capacity: 45,
    spotsLeft: 12,
    image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=600&h=400&fit=crop',
    icon: '🎤',
    featured: true,
  },
  {
    id: 'ev2',
    name: 'Sea Lion Feeding',
    type: 'Feedings',
    time: '11:00 AM',
    duration: '15 min',
    zone: 'Sea Lion Point',
    capacity: 60,
    spotsLeft: 28,
    image: 'https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=600&h=400&fit=crop',
    icon: '🐟',
    featured: false,
  },
  {
    id: 'ev3',
    name: 'Birds of Prey Show',
    type: 'Shows',
    time: '1:30 PM',
    duration: '30 min',
    zone: 'Wegeforth Bowl',
    capacity: 200,
    spotsLeft: 74,
    image: 'https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=600&h=400&fit=crop',
    icon: '🦅',
    featured: true,
  },
  {
    id: 'ev4',
    name: 'Penguin Feeding',
    type: 'Feedings',
    time: '2:00 PM',
    duration: '15 min',
    zone: 'Penguin Beach',
    capacity: 50,
    spotsLeft: 8,
    image: 'https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?w=600&h=400&fit=crop',
    icon: '🐧',
    featured: false,
  },
  {
    id: 'ev5',
    name: 'Gorilla Keeper Talk',
    type: 'Talks',
    time: '3:00 PM',
    duration: '20 min',
    zone: 'Lost Forest',
    capacity: 40,
    spotsLeft: 22,
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&h=400&fit=crop',
    icon: '🦍',
    featured: false,
  },
  {
    id: 'ev6',
    name: 'Wildlife Art Workshop',
    type: 'Workshops',
    time: '11:30 AM',
    duration: '45 min',
    zone: 'Education Center',
    capacity: 20,
    spotsLeft: 5,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop',
    icon: '🎨',
    featured: false,
  },
  {
    id: 'ev7',
    name: 'Night Safari Show',
    type: 'Shows',
    time: '5:00 PM',
    duration: '40 min',
    zone: 'Main Stage',
    capacity: 300,
    spotsLeft: 142,
    image: 'https://images.unsplash.com/photo-1504173010664-32509aeebb62?w=600&h=400&fit=crop',
    icon: '🌙',
    featured: true,
  },
  {
    id: 'ev8',
    name: 'Junior Zookeeper Workshop',
    type: 'Workshops',
    time: '10:00 AM',
    duration: '60 min',
    zone: 'Discovery Outpost',
    capacity: 15,
    spotsLeft: 3,
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop',
    icon: '🧑‍🔬',
    featured: false,
  },
]

export default function EventsListing() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? eventsData
    : eventsData.filter(e => e.type === activeFilter)

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title="Events & Shows" />

        {/* Filter Chips */}
        <div style={{
          display: 'flex',
          gap: 8,
          padding: '0 24px 16px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}>
          {filterChips.map(chip => (
            <motion.button
              key={chip}
              whileTap={{ scale: 0.95 }}
              className={`chip ${activeFilter === chip ? 'chip-active' : ''}`}
              onClick={() => setActiveFilter(chip)}
            >
              {chip}
            </motion.button>
          ))}
        </div>

        {/* Events List */}
        <div style={{ padding: '0 24px 120px' }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((event, i) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.04 }}
                whileTap={{ scale: 0.98 }}
                className="card"
                onClick={() => navigate(`/events/${event.id}`)}
                style={{
                  display: 'flex',
                  gap: 14,
                  padding: 12,
                  marginBottom: 12,
                  cursor: 'pointer',
                  overflow: 'hidden',
                }}
              >
                {/* Image */}
                <div style={{
                  width: 100,
                  height: 90,
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  flexShrink: 0,
                  position: 'relative',
                }}>
                  <img
                    src={event.image}
                    alt={event.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                  {event.featured && (
                    <div style={{
                      position: 'absolute',
                      top: 6,
                      left: 6,
                    }}>
                      <span className="badge" style={{
                        background: 'var(--gold)',
                        color: 'white',
                        fontSize: 9,
                      }}>
                        <Star size={9} /> Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>
                      {event.icon} {event.name}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: 'var(--text-secondary)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Clock size={12} /> {event.time}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <MapPin size={12} /> {event.zone}
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                    <span className="badge" style={{
                      background: event.spotsLeft <= 10 ? 'var(--coral-pale)' : 'var(--green-pale)',
                      color: event.spotsLeft <= 10 ? 'var(--coral)' : 'var(--green-rich)',
                      fontSize: 10,
                    }}>
                      <Users size={10} />
                      {event.spotsLeft <= 10 ? `Only ${event.spotsLeft} left!` : `${event.spotsLeft} spots left`}
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{event.duration}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Browse More CTA */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="btn btn-primary btn-full"
            onClick={() => navigate('/events/search')}
            style={{ marginTop: 8 }}
          >
            <Ticket size={18} /> Browse More Events
            <ChevronRight size={16} />
          </motion.button>
        </div>
      </div>
    </PageTransition>
  )
}

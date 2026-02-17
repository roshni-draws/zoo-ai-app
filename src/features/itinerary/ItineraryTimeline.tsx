import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Edit3,
  Bookmark,
  Clock,
  MapPin,
  Footprints,
  Play,
} from 'lucide-react'
import { PageTransition, BackHeader } from '../../components'

/* ============================================
   Timeline Stop Data
   ============================================ */

type StopType = 'exhibit' | 'show' | 'break'

interface TimelineStop {
  id: number
  time: string
  name: string
  zone: string
  duration: string
  walkTime: string
  type: StopType
  emoji: string
}

const timelineStops: TimelineStop[] = [
  {
    id: 1,
    time: '10:00 AM',
    name: 'Entry Gate',
    zone: 'Main Entrance',
    duration: '10 min',
    walkTime: '—',
    type: 'exhibit',
    emoji: '🚪',
  },
  {
    id: 2,
    time: '10:15 AM',
    name: 'Lion Safari',
    zone: 'Savanna Zone',
    duration: '25 min',
    walkTime: '5 min walk',
    type: 'exhibit',
    emoji: '🦁',
  },
  {
    id: 3,
    time: '10:45 AM',
    name: 'Elephant Bathing Show',
    zone: 'Elephant Valley',
    duration: '30 min',
    walkTime: '8 min walk',
    type: 'show',
    emoji: '🐘',
  },
  {
    id: 4,
    time: '11:20 AM',
    name: 'Cafe Break',
    zone: 'Jungle Cafe',
    duration: '20 min',
    walkTime: '3 min walk',
    type: 'break',
    emoji: '☕',
  },
  {
    id: 5,
    time: '11:45 AM',
    name: 'Aviary Trail',
    zone: 'Bird Paradise',
    duration: '35 min',
    walkTime: '6 min walk',
    type: 'exhibit',
    emoji: '🦜',
  },
  {
    id: 6,
    time: '12:25 PM',
    name: 'Penguin Cove',
    zone: 'Arctic Zone',
    duration: '20 min',
    walkTime: '7 min walk',
    type: 'exhibit',
    emoji: '🐧',
  },
  {
    id: 7,
    time: '12:50 PM',
    name: 'Sea Lion Show',
    zone: 'Ocean Theater',
    duration: '25 min',
    walkTime: '4 min walk',
    type: 'show',
    emoji: '🦭',
  },
  {
    id: 8,
    time: '1:20 PM',
    name: 'Cafe Break',
    zone: 'Lakeside Bistro',
    duration: '15 min',
    walkTime: '5 min walk',
    type: 'break',
    emoji: '🍽️',
  },
]

/* ============================================
   Color Map
   ============================================ */

const typeColors: Record<StopType, { border: string; dot: string; bg: string; badge: string; badgeText: string }> = {
  exhibit: {
    border: 'var(--green-rich)',
    dot: 'var(--green-rich)',
    bg: 'var(--green-pale)',
    badge: 'var(--green-light)',
    badgeText: 'var(--green-deep)',
  },
  show: {
    border: 'var(--coral)',
    dot: 'var(--coral)',
    bg: 'var(--coral-pale)',
    badge: 'var(--coral-light)',
    badgeText: 'var(--pink-dark)',
  },
  break: {
    border: 'var(--amber)',
    dot: 'var(--amber)',
    bg: 'var(--orange-pale)',
    badge: 'var(--amber-light)',
    badgeText: 'var(--text-warning)',
  },
}

/* ============================================
   Filter Chips
   ============================================ */

const filters = [
  { label: '12 Animals', color: 'var(--green-rich)', bg: 'var(--green-pale)' },
  { label: '2 Shows', color: 'var(--coral)', bg: 'var(--coral-pale)' },
  { label: '1 Break', color: 'var(--amber)', bg: 'var(--orange-pale)' },
]

/* ============================================
   ItineraryTimeline
   ============================================ */

export default function ItineraryTimeline() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const filteredStops = activeFilter
    ? timelineStops.filter(s => {
        if (activeFilter === '12 Animals') return s.type === 'exhibit'
        if (activeFilter === '2 Shows') return s.type === 'show'
        if (activeFilter === '1 Break') return s.type === 'break'
        return true
      })
    : timelineStops

  return (
    <PageTransition>
      <div className="page" style={{ background: 'var(--bg-primary)' }}>
        {/* Header */}
        <BackHeader
          title="Your itinerary"
          right={
            <div style={{ display: 'flex', gap: 12 }}>
              <button style={{ color: 'var(--text-primary)' }}>
                <Edit3 size={20} />
              </button>
              <button style={{ color: 'var(--text-primary)' }}>
                <Bookmark size={20} />
              </button>
            </div>
          }
        />

        <div className="page-scroll" style={{ paddingTop: 0 }}>
          {/* Plan Title & Stats */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ marginBottom: 20 }}
          >
            <h1 className="t-display-lg" style={{ marginBottom: 4 }}>Perfect Day</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <MapPin size={14} color="var(--text-secondary)" />
                <span className="t-body-sm" style={{ color: 'var(--text-secondary)' }}>8 stops</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Clock size={14} color="var(--text-secondary)" />
                <span className="t-body-sm" style={{ color: 'var(--text-secondary)' }}>3.5 hours total</span>
              </div>
            </div>
          </motion.div>

          {/* Filter Chips */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            style={{ display: 'flex', gap: 8, marginBottom: 24 }}
          >
            {filters.map(f => {
              const isActive = activeFilter === f.label
              return (
                <button
                  key={f.label}
                  onClick={() => setActiveFilter(isActive ? null : f.label)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 13,
                    fontWeight: 600,
                    background: isActive ? f.color : f.bg,
                    color: isActive ? 'white' : f.color,
                    border: 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: isActive ? 'white' : f.color,
                  }} />
                  {f.label}
                </button>
              )
            })}
          </motion.div>

          {/* Timeline */}
          <div style={{ position: 'relative' }}>
            {filteredStops.map((stop, index) => {
              const colors = typeColors[stop.type]
              const isLast = index === filteredStops.length - 1

              return (
                <motion.div
                  key={stop.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.06 }}
                  style={{
                    display: 'flex',
                    gap: 16,
                    marginBottom: isLast ? 0 : 4,
                  }}
                >
                  {/* Time Column */}
                  <div style={{
                    width: 70,
                    flexShrink: 0,
                    paddingTop: 16,
                    textAlign: 'right',
                  }}>
                    <span className="t-body-sm" style={{
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      fontSize: 12,
                    }}>
                      {stop.time}
                    </span>
                  </div>

                  {/* Dot & Line */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flexShrink: 0,
                    width: 20,
                  }}>
                    <div style={{
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      background: colors.dot,
                      marginTop: 18,
                      flexShrink: 0,
                      border: '3px solid var(--bg-primary)',
                      boxShadow: `0 0 0 2px ${colors.dot}`,
                    }} />
                    {!isLast && (
                      <div style={{
                        width: 2,
                        flex: 1,
                        background: `linear-gradient(to bottom, ${colors.dot}, var(--border-light))`,
                        marginTop: 4,
                        marginBottom: 4,
                        borderRadius: 1,
                      }} />
                    )}
                  </div>

                  {/* Card */}
                  <div style={{
                    flex: 1,
                    background: 'var(--bg-card)',
                    borderRadius: 'var(--radius-md)',
                    padding: 16,
                    borderLeft: `3px solid ${colors.border}`,
                    boxShadow: 'var(--shadow-sm)',
                    marginBottom: 12,
                    border: `1px solid var(--border-light)`,
                    borderLeftWidth: 3,
                    borderLeftColor: colors.border,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 24 }}>{stop.emoji}</span>
                        <div>
                          <div style={{
                            fontWeight: 600,
                            fontSize: 15,
                            color: 'var(--text-primary)',
                          }}>
                            {stop.name}
                          </div>
                          <div className="t-caption" style={{ color: 'var(--text-secondary)', marginTop: 2 }}>
                            {stop.zone}
                          </div>
                        </div>
                      </div>
                      {stop.type === 'show' && (
                        <span style={{
                          padding: '3px 10px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: 11,
                          fontWeight: 600,
                          background: colors.badge,
                          color: colors.badgeText,
                        }}>
                          Show
                        </span>
                      )}
                      {stop.type === 'break' && (
                        <span style={{
                          padding: '3px 10px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: 11,
                          fontWeight: 600,
                          background: colors.badge,
                          color: colors.badgeText,
                        }}>
                          Break
                        </span>
                      )}
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      marginTop: 12,
                      paddingTop: 10,
                      borderTop: '1px solid var(--border-light)',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Clock size={13} color="var(--text-secondary)" />
                        <span className="t-caption" style={{ color: 'var(--text-secondary)' }}>
                          {stop.duration}
                        </span>
                      </div>
                      {stop.walkTime !== '—' && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Footprints size={13} color="var(--text-secondary)" />
                          <span className="t-caption" style={{ color: 'var(--text-secondary)' }}>
                            {stop.walkTime}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Start Button */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            style={{ marginTop: 28, paddingBottom: 16 }}
          >
            <motion.button
              className="btn btn-primary btn-full"
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/plan/live-tour')}
              style={{
                padding: '16px 28px',
                fontSize: 16,
                gap: 8,
              }}
            >
              <Play size={18} fill="white" />
              START VISIT NOW
            </motion.button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}

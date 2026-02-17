import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Clock, MapPin, Users, Calendar } from 'lucide-react'
import { BackHeader, PageTransition } from '../../components'

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Mock event data keyed by "YYYY-MM-DD"
const calendarEvents: Record<string, Array<{
  id: string
  name: string
  time: string
  zone: string
  type: string
  icon: string
  spotsLeft: number
}>> = {
  '2026-02-17': [
    { id: 'c1', name: 'Elephant Keeper Talk', time: '10:15 AM', zone: 'Elephant Odyssey', type: 'Talk', icon: '🐘', spotsLeft: 12 },
    { id: 'c2', name: 'Sea Lion Feeding', time: '11:00 AM', zone: 'Sea Lion Point', type: 'Feeding', icon: '🦭', spotsLeft: 28 },
    { id: 'c3', name: 'Birds of Prey Show', time: '1:30 PM', zone: 'Wegeforth Bowl', type: 'Show', icon: '🦅', spotsLeft: 74 },
  ],
  '2026-02-18': [
    { id: 'c4', name: 'Penguin Feeding', time: '2:00 PM', zone: 'Penguin Beach', type: 'Feeding', icon: '🐧', spotsLeft: 8 },
    { id: 'c5', name: 'Wildlife Art Workshop', time: '3:00 PM', zone: 'Education Center', type: 'Workshop', icon: '🎨', spotsLeft: 5 },
  ],
  '2026-02-20': [
    { id: 'c6', name: 'Night Safari Experience', time: '5:00 PM', zone: 'Main Stage', type: 'Show', icon: '🌙', spotsLeft: 142 },
  ],
  '2026-02-21': [
    { id: 'c7', name: 'Gorilla Keeper Talk', time: '10:00 AM', zone: 'Lost Forest', type: 'Talk', icon: '🦍', spotsLeft: 22 },
    { id: 'c8', name: 'Tiger Conservation Talk', time: '2:00 PM', zone: 'Tiger Trail', type: 'Talk', icon: '🐅', spotsLeft: 30 },
    { id: 'c9', name: 'Flamingo Photo Walk', time: '4:00 PM', zone: 'Flamingo Lagoon', type: 'Talk', icon: '🦩', spotsLeft: 18 },
  ],
  '2026-02-22': [
    { id: 'c10', name: 'Junior Zookeeper Day', time: '9:00 AM', zone: 'Discovery Outpost', type: 'Workshop', icon: '🧑‍🔬', spotsLeft: 3 },
    { id: 'c11', name: 'Panda Feeding', time: '11:30 AM', zone: 'Panda Ridge', type: 'Feeding', icon: '🐼', spotsLeft: 15 },
  ],
  '2026-02-25': [
    { id: 'c12', name: 'Koala Meet & Greet', time: '10:00 AM', zone: 'Australian Outback', type: 'Talk', icon: '🐨', spotsLeft: 10 },
  ],
  '2026-02-28': [
    { id: 'c13', name: 'Conservation Gala', time: '6:00 PM', zone: 'Grand Pavilion', type: 'Show', icon: '🌿', spotsLeft: 200 },
    { id: 'c14', name: 'Polar Bear Enrichment', time: '10:30 AM', zone: 'Polar Rim', type: 'Talk', icon: '🐻‍❄️', spotsLeft: 40 },
  ],
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

function formatDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export default function EventCalendar() {
  const navigate = useNavigate()
  const [currentYear, setCurrentYear] = useState(2026)
  const [currentMonth, setCurrentMonth] = useState(1) // February (0-indexed)
  const [selectedDay, setSelectedDay] = useState<number | null>(17)

  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth)

  const days = useMemo(() => {
    const arr: (number | null)[] = []
    for (let i = 0; i < firstDay; i++) arr.push(null)
    for (let d = 1; d <= daysInMonth; d++) arr.push(d)
    return arr
  }, [daysInMonth, firstDay])

  const selectedDateKey = selectedDay
    ? formatDateKey(currentYear, currentMonth, selectedDay)
    : null

  const selectedEvents = selectedDateKey ? (calendarEvents[selectedDateKey] || []) : []

  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(y => y - 1)
    } else {
      setCurrentMonth(m => m - 1)
    }
    setSelectedDay(null)
  }

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(y => y + 1)
    } else {
      setCurrentMonth(m => m + 1)
    }
    setSelectedDay(null)
  }

  const isToday = (day: number) => {
    const now = new Date()
    return day === now.getDate() && currentMonth === now.getMonth() && currentYear === now.getFullYear()
  }

  const hasEvents = (day: number) => {
    const key = formatDateKey(currentYear, currentMonth, day)
    return !!calendarEvents[key]
  }

  const typeBadgeColor: Record<string, { bg: string; color: string }> = {
    Talk: { bg: 'var(--green-pale)', color: 'var(--green-rich)' },
    Feeding: { bg: 'var(--coral-pale)', color: 'var(--coral)' },
    Show: { bg: 'var(--gold-pale)', color: 'var(--yellow-medium)' },
    Workshop: { bg: 'var(--sky-pale)', color: 'var(--sky)' },
  }

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title="Events Calendar" />

        <div style={{ padding: '0 24px 120px' }}>
          {/* Month Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}
          >
            <button
              onClick={goToPrevMonth}
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'var(--bg-card)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--border-light)',
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="t-display-md">{months[currentMonth]} {currentYear}</h2>
            <button
              onClick={goToNextMonth}
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'var(--bg-card)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--border-light)',
              }}
            >
              <ChevronRight size={20} />
            </button>
          </motion.div>

          {/* Calendar Grid */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="card"
            style={{ padding: 16, marginBottom: 24 }}
          >
            {/* Weekday Headers */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 8 }}>
              {weekdays.map(wd => (
                <div key={wd} style={{
                  textAlign: 'center',
                  fontSize: 11,
                  fontWeight: 600,
                  color: 'var(--text-tertiary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  padding: '4px 0',
                }}>
                  {wd}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
              {days.map((day, i) => {
                if (day === null) return <div key={`empty-${i}`} />

                const selected = day === selectedDay
                const today = isToday(day)
                const hasEvt = hasEvents(day)

                return (
                  <motion.button
                    key={day}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedDay(selected ? null : day)}
                    style={{
                      width: '100%',
                      aspectRatio: '1',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 2,
                      background: selected
                        ? 'var(--green-deep)'
                        : today
                        ? 'var(--green-pale)'
                        : 'transparent',
                      color: selected
                        ? 'white'
                        : today
                        ? 'var(--green-rich)'
                        : 'var(--text-primary)',
                      fontWeight: today || selected ? 700 : 400,
                      fontSize: 14,
                      transition: 'all 0.15s ease',
                      position: 'relative',
                    }}
                  >
                    {day}
                    {hasEvt && (
                      <div style={{
                        display: 'flex',
                        gap: 2,
                        position: 'absolute',
                        bottom: 4,
                      }}>
                        <div style={{
                          width: 5,
                          height: 5,
                          borderRadius: '50%',
                          background: selected ? 'var(--gold)' : 'var(--green-rich)',
                        }} />
                      </div>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>

          {/* Legend */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 24, justifyContent: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-secondary)' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green-rich)' }} />
              Has Events
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-secondary)' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green-pale)', border: '1px solid var(--green-light)' }} />
              Today
            </span>
          </div>

          {/* Selected Day Events */}
          <AnimatePresence mode="wait">
            {selectedDay && (
              <motion.div
                key={selectedDay}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <Calendar size={18} color="var(--green-rich)" />
                  <h3 className="t-display-sm">
                    {months[currentMonth]} {selectedDay}, {currentYear}
                  </h3>
                </div>

                {selectedEvents.length === 0 ? (
                  <div className="card" style={{ textAlign: 'center', padding: '32px 20px' }}>
                    <div style={{ fontSize: 36, marginBottom: 8 }}>🌿</div>
                    <p className="t-body-sm" style={{ color: 'var(--text-secondary)' }}>
                      No events scheduled for this day
                    </p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {selectedEvents.map((event, i) => {
                      const badge = typeBadgeColor[event.type] || typeBadgeColor.Talk
                      return (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06 }}
                          whileTap={{ scale: 0.98 }}
                          className="card"
                          onClick={() => navigate(`/events/${event.id}`)}
                          style={{
                            display: 'flex',
                            gap: 14,
                            padding: 14,
                            cursor: 'pointer',
                          }}
                        >
                          <div style={{
                            width: 48,
                            height: 48,
                            borderRadius: 'var(--radius-md)',
                            background: badge.bg,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 24,
                            flexShrink: 0,
                          }}>
                            {event.icon}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{event.name}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: 'var(--text-secondary)' }}>
                              <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                <Clock size={11} /> {event.time}
                              </span>
                              <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                <MapPin size={11} /> {event.zone}
                              </span>
                            </div>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                            <span className="badge" style={{
                              background: badge.bg,
                              color: badge.color,
                              fontSize: 10,
                            }}>
                              {event.type}
                            </span>
                            <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>
                              <Users size={10} style={{ verticalAlign: 'middle', marginRight: 2 }} />
                              {event.spotsLeft}
                            </span>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  )
}

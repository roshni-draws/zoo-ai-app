import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, MapPin, Navigation, Bell, BellOff, Calendar, Ticket, ChevronRight, QrCode } from 'lucide-react'
import { BackHeader, PageTransition } from '../../components'

const todayDate = 'Monday, February 17, 2026'

const bookedEvents = [
  {
    id: 'bk1',
    bookingId: 'ZOO-2026-4821',
    name: 'Elephant Keeper Talk',
    icon: '🐘',
    time: '10:15 AM - 10:35 AM',
    location: 'Elephant Odyssey',
    status: 'upcoming',
    seats: 2,
    reminderSet: true,
  },
  {
    id: 'bk2',
    bookingId: 'ZOO-2026-4822',
    name: 'Sea Lion Feeding',
    icon: '🦭',
    time: '11:00 AM - 11:15 AM',
    location: 'Sea Lion Point',
    status: 'upcoming',
    seats: 2,
    reminderSet: false,
  },
  {
    id: 'bk3',
    bookingId: 'ZOO-2026-4823',
    name: 'Birds of Prey Show',
    icon: '🦅',
    time: '1:30 PM - 2:00 PM',
    location: 'Wegeforth Bowl',
    status: 'upcoming',
    seats: 4,
    reminderSet: true,
  },
  {
    id: 'bk4',
    bookingId: 'ZOO-2026-4824',
    name: 'Wildlife Art Workshop',
    icon: '🎨',
    time: '3:00 PM - 3:45 PM',
    location: 'Education Center',
    status: 'upcoming',
    seats: 1,
    reminderSet: false,
  },
]

export default function MyEvents() {
  const navigate = useNavigate()
  const [reminders, setReminders] = useState<Record<string, boolean>>(
    Object.fromEntries(bookedEvents.map(e => [e.id, e.reminderSet]))
  )

  const toggleReminder = (id: string) => {
    setReminders(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title="My Events" />

        <div style={{ padding: '0 24px 120px' }}>
          {/* Date Header */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 20,
              padding: '14px 16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--green-pale)',
              border: '1px solid var(--green-light)',
            }}
          >
            <Calendar size={20} color="var(--green-rich)" />
            <div>
              <div className="t-label" style={{ color: 'var(--green-rich)', marginBottom: 2 }}>TODAY</div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>{todayDate}</div>
            </div>
          </motion.div>

          {/* Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="card card-gradient"
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              padding: '20px 16px',
              marginBottom: 24,
              textAlign: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: 28, fontWeight: 700, color: 'white' }}>{bookedEvents.length}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>Events Today</div>
            </div>
            <div style={{ width: 1, background: 'rgba(255,255,255,0.2)' }} />
            <div>
              <div style={{ fontSize: 28, fontWeight: 700, color: 'white' }}>
                {bookedEvents.reduce((sum, e) => sum + e.seats, 0)}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>Total Seats</div>
            </div>
            <div style={{ width: 1, background: 'rgba(255,255,255,0.2)' }} />
            <div>
              <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--gold)' }}>
                {Object.values(reminders).filter(Boolean).length}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>Reminders</div>
            </div>
          </motion.div>

          {/* Timeline */}
          <div style={{ position: 'relative' }}>
            {/* Timeline line */}
            <div style={{
              position: 'absolute',
              left: 19,
              top: 24,
              bottom: 24,
              width: 2,
              background: 'var(--green-light)',
              zIndex: 0,
            }} />

            {bookedEvents.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                style={{
                  display: 'flex',
                  gap: 16,
                  marginBottom: 16,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {/* Timeline dot */}
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'var(--green-rich)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: 18,
                  boxShadow: 'var(--shadow-sm)',
                  border: '3px solid var(--bg-primary)',
                }}>
                  {event.icon}
                </div>

                {/* Event Card */}
                <div className="card" style={{ flex: 1, padding: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>{event.name}</div>
                      <div className="t-caption" style={{ color: 'var(--text-tertiary)' }}>
                        Booking: {event.bookingId}
                      </div>
                    </div>
                    <button
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: 'var(--bg-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <QrCode size={16} color="var(--green-rich)" />
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 12 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)' }}>
                      <Clock size={13} color="var(--green-rich)" /> {event.time}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)' }}>
                      <MapPin size={13} color="var(--green-rich)" /> {event.location}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)' }}>
                      <Ticket size={13} color="var(--green-rich)" /> {event.seats} {event.seats === 1 ? 'seat' : 'seats'} booked
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <button
                      className="btn btn-sm"
                      style={{
                        background: 'var(--green-pale)',
                        color: 'var(--green-rich)',
                        fontSize: 12,
                        padding: '6px 12px',
                      }}
                    >
                      <Navigation size={12} /> Get Directions
                    </button>

                    <button
                      onClick={() => toggleReminder(event.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        fontSize: 12,
                        fontWeight: 600,
                        color: reminders[event.id] ? 'var(--green-rich)' : 'var(--text-tertiary)',
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-full)',
                        background: reminders[event.id] ? 'var(--gold-pale)' : 'transparent',
                        border: `1px solid ${reminders[event.id] ? 'var(--gold-light)' : 'var(--border)'}`,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {reminders[event.id] ? <Bell size={12} /> : <BellOff size={12} />}
                      {reminders[event.id] ? 'Reminder On' : 'Add Reminder'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Browse More CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              marginTop: 16,
              textAlign: 'center',
              padding: '32px 20px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--gold-pale)',
              border: '1px solid var(--gold-light)',
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 8 }}>🎪</div>
            <h3 className="t-display-sm" style={{ marginBottom: 6 }}>Want to see more?</h3>
            <p className="t-body-sm" style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>
              Discover more exciting events happening today
            </p>
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="btn btn-primary"
              onClick={() => navigate('/events')}
            >
              Browse More Events <ChevronRight size={16} />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}

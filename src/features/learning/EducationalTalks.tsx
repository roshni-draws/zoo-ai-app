import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, MapPin, Users, User, Check, ArrowRight, Calendar, ChevronRight } from 'lucide-react'
import { BackHeader, PageTransition } from '../../components'

const sessions = [
  {
    id: 's1',
    title: 'Amazing Elephants',
    date: 'Saturday, March 15, 2026',
    time: '10:00 AM - 11:00 AM',
    speaker: 'Dr. Sarah Mitchell',
    location: 'Discovery Amphitheatre',
    capacity: 40,
    spotsLeft: 12,
    image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=600&h=400&fit=crop',
    description: 'Learn about elephant intelligence, social bonds, and conservation efforts.',
  },
  {
    id: 's2',
    title: 'Ocean Wonders',
    date: 'Saturday, March 15, 2026',
    time: '11:30 AM - 12:30 PM',
    speaker: 'Prof. James Rivera',
    location: 'Marine Hall',
    capacity: 35,
    spotsLeft: 8,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop',
    description: 'Dive into the world of marine life and coral reef ecosystems.',
  },
  {
    id: 's3',
    title: 'Rainforest Explorers',
    date: 'Sunday, March 16, 2026',
    time: '10:00 AM - 11:00 AM',
    speaker: 'Dr. Maya Patel',
    location: 'Tropical Pavilion',
    capacity: 30,
    spotsLeft: 18,
    image: 'https://images.unsplash.com/photo-1440342359743-84fcb8c21c67?w=600&h=400&fit=crop',
    description: 'Explore the fascinating world of rainforest animals and plants.',
  },
  {
    id: 's4',
    title: 'Big Cats Safari',
    date: 'Sunday, March 16, 2026',
    time: '2:00 PM - 3:00 PM',
    speaker: 'Dr. Raj Kumar',
    location: 'Safari Stage',
    capacity: 45,
    spotsLeft: 5,
    image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600&h=400&fit=crop',
    description: 'Meet the big cats and learn about their habitats and hunting skills.',
  },
]

export default function EducationalTalks() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [selectedSession, setSelectedSession] = useState(sessions[0])

  // Form state
  const [parentName, setParentName] = useState('')
  const [parentPhone, setParentPhone] = useState('')
  const [parentEmail, setParentEmail] = useState('')
  const [childName, setChildName] = useState('')
  const [childAge, setChildAge] = useState('')
  const [numChildren, setNumChildren] = useState('1')

  const bookingRef = 'EDU-' + Math.random().toString(36).substring(2, 8).toUpperCase()

  const handleReserve = (session: typeof sessions[0]) => {
    setSelectedSession(session)
    setStep(2)
  }

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title={step === 1 ? 'Educational Talks' : step === 2 ? 'Reserve Talk' : 'Confirmed'} />

        {/* Progress */}
        <div style={{ padding: '0 24px 12px' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {[1, 2, 3].map(s => (
              <div key={s} style={{
                flex: 1,
                height: 3,
                borderRadius: 2,
                background: s <= step ? 'var(--green-rich)' : 'var(--border-light)',
                transition: 'background 0.3s ease',
              }} />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* ========== STEP 1: Session Listing ========== */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {/* Hero Image */}
              <div style={{
                margin: '0 24px 24px',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                position: 'relative',
                height: 160,
                background: 'linear-gradient(135deg, var(--amber), var(--coral))',
              }}>
                <img
                  src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop"
                  alt="Educational talks"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '24px 20px',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                }}>
                  <h2 className="t-display-md" style={{ color: 'white' }}>Educational Talks for Kids</h2>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>Inspiring young minds through wildlife education</p>
                </div>
              </div>

              {/* Sessions */}
              <div style={{ padding: '0 24px 120px' }}>
                <h3 className="t-display-sm" style={{ marginBottom: 16 }}>All Sessions</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {sessions.map((session, i) => (
                    <motion.div
                      key={session.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="card card-elevated"
                      style={{ padding: 0, overflow: 'hidden' }}
                    >
                      {/* Session Image */}
                      <div style={{ position: 'relative', height: 140 }}>
                        <img
                          src={session.image}
                          alt={session.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          loading="lazy"
                        />
                        <div style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: 50,
                          background: 'linear-gradient(transparent, rgba(0,0,0,0.4))',
                        }} />
                      </div>

                      {/* Session Details */}
                      <div style={{ padding: 16 }}>
                        <h4 style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{session.title}</h4>
                        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: 12 }}>
                          {session.description}
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
                            <Calendar size={14} color="var(--green-rich)" />
                            {session.date}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
                            <Clock size={14} color="var(--green-rich)" />
                            {session.time}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
                            <User size={14} color="var(--green-rich)" />
                            {session.speaker}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
                            <MapPin size={14} color="var(--green-rich)" />
                            {session.location}
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span className="badge" style={{
                            background: session.spotsLeft <= 8 ? 'var(--coral-pale)' : 'var(--green-pale)',
                            color: session.spotsLeft <= 8 ? 'var(--coral)' : 'var(--green-rich)',
                          }}>
                            <Users size={11} />
                            {session.spotsLeft <= 8 ? `Only ${session.spotsLeft} spots left!` : `${session.spotsLeft} spots left`}
                          </span>
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="btn btn-primary btn-sm"
                            onClick={() => handleReserve(session)}
                          >
                            RESERVE <ArrowRight size={14} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ========== STEP 2: Reserve Talk Form ========== */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              style={{ padding: '16px 24px 120px' }}
            >
              {/* Selected Session Info */}
              <div className="card" style={{ display: 'flex', gap: 14, padding: 14, marginBottom: 24, alignItems: 'center' }}>
                <div style={{
                  width: 70,
                  height: 60,
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}>
                  <img src={selectedSession.image} alt={selectedSession.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{selectedSession.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{selectedSession.date}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{selectedSession.time}</div>
                </div>
              </div>

              {/* Parent/Guardian Info */}
              <h3 className="t-display-sm" style={{ marginBottom: 14 }}>Parent/Guardian Information</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Full Name *</label>
                  <input className="input" placeholder="Parent/Guardian name" value={parentName} onChange={e => setParentName(e.target.value)} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Phone Number *</label>
                  <input className="input" placeholder="+91 98765 43210" value={parentPhone} onChange={e => setParentPhone(e.target.value)} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Email *</label>
                  <input className="input" placeholder="email@example.com" value={parentEmail} onChange={e => setParentEmail(e.target.value)} />
                </div>
              </div>

              {/* Child Info */}
              <h3 className="t-display-sm" style={{ marginBottom: 14 }}>Child Information</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Child's Name *</label>
                  <input className="input" placeholder="Child's name" value={childName} onChange={e => setChildName(e.target.value)} />
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Age *</label>
                    <input className="input" placeholder="8" value={childAge} onChange={e => setChildAge(e.target.value)} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>No. of Children *</label>
                    <input className="input" placeholder="1" value={numChildren} onChange={e => setNumChildren(e.target.value)} />
                  </div>
                </div>
              </div>

              {/* Important Info */}
              <div style={{
                padding: 16,
                borderRadius: 'var(--radius-md)',
                background: 'var(--gold-pale)',
                border: '1px solid var(--gold-light)',
                marginBottom: 28,
              }}>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 6, color: 'var(--yellow-medium)' }}>Important Information</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Please arrive 15 minutes before the session starts. Children must be accompanied by an adult. Seating is on a first-come, first-served basis. Cancellations must be made at least 24 hours in advance.
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                className="btn btn-primary btn-full btn-lg"
                onClick={() => setStep(3)}
              >
                CONFIRM RESERVATION
              </motion.button>
            </motion.div>
          )}

          {/* ========== STEP 3: Reservation Confirmed ========== */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              style={{ padding: '32px 24px 120px', textAlign: 'center' }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'var(--green-rich)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                }}
              >
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring' }}>
                  <Check size={40} color="white" strokeWidth={3} />
                </motion.div>
              </motion.div>

              <h1 className="t-display-lg" style={{ marginBottom: 6 }}>Reservation Confirmed!</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 28 }}>
                Your seat has been reserved successfully.
              </p>

              {/* Event Details Card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="card"
                style={{ padding: 20, textAlign: 'left', marginBottom: 16 }}
              >
                <h3 className="t-display-sm" style={{ marginBottom: 14 }}>Event Details</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { label: 'Session', value: selectedSession.title },
                    { label: 'Date', value: selectedSession.date },
                    { label: 'Time', value: selectedSession.time },
                    { label: 'Speaker', value: selectedSession.speaker },
                    { label: 'Location', value: selectedSession.location },
                  ].map(item => (
                    <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{item.label}</span>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Booking Info */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="card"
                style={{ padding: 20, textAlign: 'left', marginBottom: 16 }}
              >
                <h3 className="t-display-sm" style={{ marginBottom: 14 }}>Booking Information</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Booking Ref</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--green-rich)' }}>{bookingRef}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Children</span>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{numChildren}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Guardian</span>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{parentName || 'Not provided'}</span>
                  </div>
                </div>
              </motion.div>

              {/* Important Info */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                style={{
                  padding: 16,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--green-pale)',
                  textAlign: 'left',
                  marginBottom: 28,
                  fontSize: 13,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                }}
              >
                <strong style={{ color: 'var(--green-rich)' }}>Important:</strong> A confirmation email has been sent. Please arrive 15 minutes early. Show this booking reference at the entrance.
              </motion.div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                className="btn btn-primary btn-full"
                onClick={() => { setStep(1) }}
              >
                BROWSE MORE SESSIONS <ChevronRight size={16} />
              </motion.button>
              <button
                onClick={() => navigate('/learning')}
                className="btn btn-ghost btn-full"
                style={{ marginTop: 8 }}
              >
                Back to Learning Hub
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}

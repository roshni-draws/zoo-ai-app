import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, MapPin, Users, Calendar, ChevronDown, ChevronUp, Star, Share2, Heart, Navigation, Zap, Camera, Info, HelpCircle } from 'lucide-react'
import { BackHeader, PageTransition } from '../../components'

const eventsDetailData: Record<string, any> = {
  ev1: {
    name: 'Elephant Keeper Talk',
    tagline: 'Get up close with our gentle giants',
    type: 'Keeper Talk',
    time: '10:15 AM - 10:35 AM',
    date: 'Daily',
    zone: 'Elephant Odyssey',
    capacity: 45,
    spotsLeft: 12,
    duration: '20 min',
    price: 'Free with admission',
    ageRecommendation: 'All ages',
    accessibility: 'Wheelchair accessible',
    heroImage: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=800&h=500&fit=crop',
    description: 'Join our expert keepers for an unforgettable 20-minute talk about our African elephant family. Learn about their daily routines, personalities, and the conservation efforts protecting elephants in the wild. Watch as the keepers demonstrate training techniques and the special bond they share with these incredible animals.',
    gallery: [
      'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1551316679-9c6ae9dec224?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1603483080228-04f2213b0a38?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1585970480901-90d6bb2a48b5?w=400&h=300&fit=crop',
    ],
    quickFacts: [
      { label: 'Duration', value: '20 min', icon: '🕐' },
      { label: 'Best For', value: 'Families', icon: '👨‍👩‍👧' },
      { label: 'Crowd Level', value: 'Moderate', icon: '👥' },
      { label: 'Photo Ops', value: 'Excellent', icon: '📸' },
    ],
    faqs: [
      { q: 'Do I need to arrive early?', a: 'We recommend arriving 10 minutes before the scheduled time to get a good viewing spot. The front rows fill up quickly, especially on weekends.' },
      { q: 'Can I bring a stroller?', a: 'Yes! The viewing area is fully accessible with space for strollers and wheelchairs. There is a designated stroller parking area nearby if you prefer.' },
      { q: 'Will there be a Q&A session?', a: 'Absolutely! The last 5 minutes are reserved for audience questions. Our keepers love sharing their knowledge and experience with visitors.' },
      { q: 'Is this event weather-dependent?', a: 'The talk happens rain or shine. The viewing area has a covered section, but we recommend bringing a hat or sunscreen for sunny days.' },
    ],
    schedule: [
      { day: 'Mon - Fri', times: ['10:15 AM', '2:30 PM'] },
      { day: 'Saturday', times: ['10:15 AM', '1:00 PM', '3:30 PM'] },
      { day: 'Sunday', times: ['11:00 AM', '2:30 PM'] },
    ],
  },
  ev3: {
    name: 'Birds of Prey Show',
    tagline: 'Witness nature\'s most skilled hunters',
    type: 'Live Show',
    time: '1:30 PM - 2:00 PM',
    date: 'Daily',
    zone: 'Wegeforth Bowl',
    capacity: 200,
    spotsLeft: 74,
    duration: '30 min',
    price: 'Free with admission',
    ageRecommendation: 'Ages 4+',
    accessibility: 'Wheelchair accessible, ASL available',
    heroImage: 'https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=800&h=500&fit=crop',
    description: 'Experience the thrill of seeing majestic raptors soar overhead in our award-winning Birds of Prey show. Watch hawks, eagles, and owls demonstrate their incredible hunting skills as they swoop just feet above the audience. Our trainers share fascinating facts about each species and the critical role they play in our ecosystem.',
    gallery: [
      'https://images.unsplash.com/photo-1557401622-09723c127471?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1480044965905-02098d419e96?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1621874963815-3daf28953f78?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&h=300&fit=crop',
    ],
    quickFacts: [
      { label: 'Duration', value: '30 min', icon: '🕐' },
      { label: 'Best For', value: 'Everyone', icon: '🌟' },
      { label: 'Seating', value: 'Stadium', icon: '🏟️' },
      { label: 'Photo Ops', value: 'Amazing', icon: '📸' },
    ],
    faqs: [
      { q: 'Will birds fly close to the audience?', a: 'Yes! Some birds may fly just a few feet above your head. It is a truly thrilling experience, and completely safe.' },
      { q: 'Is reserved seating available?', a: 'Seating is first-come, first-served. VIP front-row passes can be purchased at the amphitheater entrance for $5.' },
      { q: 'What if it rains?', a: 'The show may be modified or cancelled in heavy rain for the safety of the birds. Check the app for real-time updates on show status.' },
    ],
    schedule: [
      { day: 'Mon - Fri', times: ['1:30 PM'] },
      { day: 'Sat - Sun', times: ['11:30 AM', '1:30 PM', '4:00 PM'] },
    ],
  },
}

// Fallback for any event ID
const fallbackEvent = {
  name: 'Zoo Event',
  tagline: 'A wonderful zoo experience',
  type: 'Event',
  time: '10:00 AM - 11:00 AM',
  date: 'Daily',
  zone: 'Main Plaza',
  capacity: 50,
  spotsLeft: 20,
  duration: '30 min',
  price: 'Free with admission',
  ageRecommendation: 'All ages',
  accessibility: 'Wheelchair accessible',
  heroImage: 'https://images.unsplash.com/photo-1504173010664-32509aeebb62?w=800&h=500&fit=crop',
  description: 'Join us for an exciting event at the zoo! Learn about the amazing animals in our care and the conservation work that protects wildlife around the world.',
  gallery: [
    'https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=300&fit=crop',
  ],
  quickFacts: [
    { label: 'Duration', value: '30 min', icon: '🕐' },
    { label: 'Best For', value: 'Families', icon: '👨‍👩‍👧' },
    { label: 'Crowd Level', value: 'Moderate', icon: '👥' },
    { label: 'Photo Ops', value: 'Good', icon: '📸' },
  ],
  faqs: [
    { q: 'Do I need to book in advance?', a: 'Walk-ins are welcome, but booking via the app guarantees your spot.' },
    { q: 'Is this accessible?', a: 'Yes, the venue is fully wheelchair accessible with designated viewing areas.' },
  ],
  schedule: [
    { day: 'Daily', times: ['10:00 AM', '2:00 PM'] },
  ],
}

export default function EventDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [liked, setLiked] = useState(false)

  const event = eventsDetailData[id || ''] || fallbackEvent

  return (
    <PageTransition>
      <div className="page">
        <BackHeader
          title=""
          right={
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => setLiked(!liked)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'var(--bg-card)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <Heart size={18} fill={liked ? 'var(--coral)' : 'none'} color={liked ? 'var(--coral)' : 'var(--text-secondary)'} />
              </button>
              <button
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'var(--bg-card)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <Share2 size={18} color="var(--text-secondary)" />
              </button>
            </div>
          }
        />

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            width: '100%',
            height: 240,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <img
            src={event.heroImage}
            alt={event.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 80,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.5))',
          }} />
          <div style={{ position: 'absolute', bottom: 12, left: 16 }}>
            <span className="badge" style={{ background: 'var(--green-rich)', color: 'white', fontSize: 11 }}>
              {event.type}
            </span>
          </div>
        </motion.div>

        <div style={{ padding: '20px 24px 160px' }}>
          {/* Title & Info */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="t-display-lg" style={{ marginBottom: 4 }}>{event.name}</h1>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 16 }}>{event.tagline}</p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)' }}>
                <Clock size={15} color="var(--green-rich)" /> {event.time}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)' }}>
                <MapPin size={15} color="var(--green-rich)" /> {event.zone}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)' }}>
                <Users size={15} color="var(--green-rich)" /> {event.spotsLeft} spots left
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)' }}>
                <Calendar size={15} color="var(--green-rich)" /> {event.date}
              </span>
            </div>

            {/* Info Pills */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
              <span className="badge badge-active" style={{ fontSize: 11 }}>{event.price}</span>
              <span className="badge badge-quiet" style={{ fontSize: 11 }}>{event.ageRecommendation}</span>
              <span className="badge badge-gold" style={{ fontSize: 11 }}>{event.accessibility}</span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            style={{ marginBottom: 28 }}
          >
            <h3 className="t-display-sm" style={{ marginBottom: 10 }}>About This Event</h3>
            <p className="t-body" style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}>
              {event.description}
            </p>
          </motion.div>

          {/* Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ marginBottom: 28 }}
          >
            <h3 className="t-display-sm" style={{ marginBottom: 12 }}>Schedule</h3>
            <div className="card" style={{ padding: 16 }}>
              {event.schedule.map((s: any, i: number) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 0',
                    borderBottom: i < event.schedule.length - 1 ? '1px solid var(--border-light)' : 'none',
                  }}
                >
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{s.day}</span>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {s.times.map((t: string) => (
                      <span key={t} className="badge badge-active" style={{ fontSize: 11 }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Photo Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            style={{ marginBottom: 28 }}
          >
            <h3 className="t-display-sm" style={{ marginBottom: 12 }}>
              <Camera size={18} style={{ verticalAlign: 'middle', marginRight: 6 }} />
              Photo Gallery
            </h3>
            <div className="scroll-x" style={{ paddingLeft: 0, paddingRight: 0 }}>
              {event.gallery.map((img: string, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  style={{
                    width: 200,
                    height: 140,
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  <img src={img} alt={`Gallery ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Facts Grid */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ marginBottom: 28 }}
          >
            <h3 className="t-display-sm" style={{ marginBottom: 12 }}>Quick Facts</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {event.quickFacts.map((fact: any, i: number) => (
                <div key={i} className="card" style={{
                  padding: 14,
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: 26, marginBottom: 6 }}>{fact.icon}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>
                    {fact.label}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{fact.value}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            style={{ marginBottom: 28 }}
          >
            <h3 className="t-display-sm" style={{ marginBottom: 12 }}>
              <HelpCircle size={18} style={{ verticalAlign: 'middle', marginRight: 6 }} />
              Frequently Asked Questions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {event.faqs.map((faq: any, i: number) => (
                <motion.div
                  key={i}
                  className="card"
                  style={{ padding: 0, overflow: 'hidden' }}
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      background: expandedFaq === i ? 'var(--green-pale)' : 'transparent',
                      transition: 'background 0.2s ease',
                    }}
                  >
                    <span style={{ fontSize: 14, fontWeight: 600, flex: 1, paddingRight: 12 }}>{faq.q}</span>
                    {expandedFaq === i ? <ChevronUp size={18} color="var(--green-rich)" /> : <ChevronDown size={18} color="var(--text-tertiary)" />}
                  </button>
                  <AnimatePresence>
                    {expandedFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p style={{
                          padding: '0 16px 14px',
                          fontSize: 13,
                          color: 'var(--text-secondary)',
                          lineHeight: 1.55,
                        }}>
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Map Location */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{ marginBottom: 28 }}
          >
            <h3 className="t-display-sm" style={{ marginBottom: 12 }}>Location</h3>
            <div className="card" style={{
              padding: 0,
              overflow: 'hidden',
            }}>
              <div style={{
                height: 160,
                background: 'linear-gradient(135deg, var(--green-pale), var(--sky-pale))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: 'var(--green-rich)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-md)',
                }}>
                  <MapPin size={22} color="white" />
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                }}>
                  <button className="btn btn-sm" style={{ background: 'white', color: 'var(--green-rich)', fontSize: 12, boxShadow: 'var(--shadow-sm)' }}>
                    <Navigation size={13} /> Get Directions
                  </button>
                </div>
              </div>
              <div style={{ padding: '12px 16px' }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{event.zone}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Tap for walking directions from your location</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sticky CTA */}
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 430,
          padding: '12px 24px',
          paddingBottom: 'calc(12px + env(safe-area-inset-bottom, 0px))',
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid var(--border-light)',
          zIndex: 50,
          display: 'flex',
          gap: 10,
        }}>
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="btn btn-secondary"
            style={{ flex: 1 }}
          >
            <Zap size={16} /> Quick Spot
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="btn btn-primary"
            onClick={() => navigate('/events/my-events')}
            style={{ flex: 2 }}
          >
            <Calendar size={16} /> Book This Event
          </motion.button>
        </div>
      </div>
    </PageTransition>
  )
}

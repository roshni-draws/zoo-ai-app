import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, Heart, BookOpen, Award, Users } from 'lucide-react'
import { BackHeader, PageTransition } from '../../components'

const features = [
  {
    id: 'volunteer',
    title: 'Volunteer with the Zoo',
    description: 'Join our conservation mission and make a real difference for wildlife.',
    emoji: '🤝',
    icon: Heart,
    color: 'var(--coral)',
    bgColor: 'var(--coral-pale)',
    route: '/learning/volunteer',
  },
  {
    id: 'talks',
    title: 'Educational Talks for Kids',
    description: 'Engaging presentations that bring wildlife science to life.',
    emoji: '🎓',
    icon: BookOpen,
    color: 'var(--amber)',
    bgColor: 'var(--orange-pale)',
    route: '/learning/talks',
  },
  {
    id: 'kids',
    title: 'Kids Pack',
    description: 'Fun learning materials, worksheets, and activities for young explorers.',
    emoji: '🎒',
    icon: Award,
    color: 'var(--green-rich)',
    bgColor: 'var(--green-pale)',
    route: '/kids',
  },
  {
    id: 'badges',
    title: 'QR Scannable Badges',
    description: 'Collect digital badges as you explore the zoo — scan, earn, and show off!',
    emoji: '🏅',
    icon: Award,
    color: 'var(--gold)',
    bgColor: 'var(--gold-pale)',
    route: '/kids/badges',
  },
]

const recommendedPrograms = [
  {
    id: 'p1',
    title: 'Junior Zookeeper',
    age: 'Ages 8-12',
    duration: '3 hours',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop',
    tag: 'Popular',
  },
  {
    id: 'p2',
    title: 'Wildlife Photography',
    age: 'Ages 10+',
    duration: '2 hours',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=400&h=300&fit=crop',
    tag: 'New',
  },
  {
    id: 'p3',
    title: 'Conservation Camp',
    age: 'Ages 6-14',
    duration: '5 days',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    tag: 'Weekends',
  },
  {
    id: 'p4',
    title: 'Night Safari Experience',
    age: 'All ages',
    duration: '2.5 hours',
    image: 'https://images.unsplash.com/photo-1504173010664-32509aeebb62?w=400&h=300&fit=crop',
    tag: 'Limited',
  },
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] } },
}

export default function LearningHub() {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title="Learning & Engagement" />

        {/* Dark Hero Banner */}
        <div style={{
          margin: '0 24px 24px',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          position: 'relative',
          height: 200,
          background: 'linear-gradient(135deg, var(--green-deep) 0%, #0D1A0D 100%)',
        }}>
          <img
            src="https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=800&h=400&fit=crop"
            alt="Nature learning"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
          />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '32px 24px',
            background: 'linear-gradient(transparent, rgba(13,26,13,0.9))',
          }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span style={{
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(197,214,58,0.2)',
                color: 'var(--gold)',
                fontSize: 11,
                fontWeight: 600,
                marginBottom: 10,
                border: '1px solid rgba(197,214,58,0.3)',
              }}>
                🌿 Learning Hub
              </span>
              <h1 className="t-display-lg" style={{ color: 'white', marginBottom: 4 }}>
                Discover, Learn & Explore
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>
                Programs and experiences for every curious mind
              </p>
            </motion.div>
          </div>
        </div>

        <div style={{ padding: '0 24px 120px' }}>
          {/* Feature Cards */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36 }}
          >
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.id}
                  variants={fadeUp}
                  whileTap={{ scale: 0.98 }}
                  className="card card-elevated"
                  onClick={() => navigate(feature.route)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: 18,
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    width: 56,
                    height: 56,
                    borderRadius: 'var(--radius-lg)',
                    background: feature.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 28,
                    flexShrink: 0,
                  }}>
                    {feature.emoji}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 3 }}>
                      {feature.title}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      {feature.description}
                    </div>
                  </div>
                  <ChevronRight size={18} color="var(--text-tertiary)" style={{ flexShrink: 0 }} />
                </motion.div>
              )
            })}
          </motion.div>

          {/* Recommended Programs */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 className="t-display-md">Recommended Programs</h2>
              <button style={{ color: 'var(--green-rich)', fontSize: 13, fontWeight: 600 }}>See All</button>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Cards (outside padding for edge-to-edge scroll) */}
        <div style={{
          display: 'flex',
          gap: 14,
          overflowX: 'auto',
          scrollbarWidth: 'none',
          padding: '0 24px 120px',
          marginTop: -96,
        }}>
          {recommendedPrograms.map((program, i) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              whileTap={{ scale: 0.97 }}
              style={{
                width: 220,
                flexShrink: 0,
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                background: 'var(--bg-card)',
                boxShadow: 'var(--shadow-md)',
                cursor: 'pointer',
              }}
            >
              <div style={{ position: 'relative', height: 130 }}>
                <img
                  src={program.image}
                  alt={program.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
                <span style={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  padding: '3px 10px',
                  borderRadius: 'var(--radius-full)',
                  background: program.tag === 'Popular' ? 'var(--coral)' :
                    program.tag === 'New' ? 'var(--green-rich)' :
                    program.tag === 'Limited' ? 'var(--amber)' : 'var(--sky)',
                  color: 'white',
                  fontSize: 10,
                  fontWeight: 700,
                }}>
                  {program.tag}
                </span>
              </div>
              <div style={{ padding: 14 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{program.title}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
                  <span>
                    <Users size={12} style={{ marginRight: 3, verticalAlign: -1 }} />
                    {program.age}
                  </span>
                  <span style={{ color: 'var(--border)' }}>|</span>
                  <span>{program.duration}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}

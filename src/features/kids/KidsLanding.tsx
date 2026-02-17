import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, Download, Gamepad2, BookOpen, Award } from 'lucide-react'
import { BackHeader, PageTransition } from '../../components'

const features = [
  {
    id: 'worksheets',
    title: 'Worksheets',
    emoji: '\uD83D\uDCDD',
    icon: Download,
    description: 'Fun printable activities',
    color: 'var(--green-rich)',
    bgColor: 'var(--green-pale)',
    route: '/kids/worksheets',
  },
  {
    id: 'games',
    title: 'Games & Quizzes',
    emoji: '\uD83C\uDFAE',
    icon: Gamepad2,
    description: 'Test your knowledge',
    color: 'var(--coral)',
    bgColor: 'var(--coral-pale)',
    route: '/kids/games',
  },
  {
    id: 'stories',
    title: 'Story Time',
    emoji: '\uD83D\uDCD6',
    icon: BookOpen,
    description: 'Animal adventure tales',
    color: 'var(--amber)',
    bgColor: 'var(--orange-pale)',
    route: '/kids/stories',
  },
  {
    id: 'badges',
    title: 'Collect Badges',
    emoji: '\uD83C\uDFC5',
    icon: Award,
    description: 'Earn digital rewards',
    color: 'var(--gold)',
    bgColor: 'var(--gold-pale)',
    route: '/kids/badges',
  },
]

const recommendedActivities = [
  {
    id: 'a1',
    title: 'Animal Coloring',
    type: 'Worksheet',
    emoji: '\uD83C\uDFA8',
    difficulty: 'Easy',
    duration: '15 min',
  },
  {
    id: 'a2',
    title: 'Zoo Quiz Challenge',
    type: 'Game',
    emoji: '\uD83E\uDDE9',
    difficulty: 'Medium',
    duration: '10 min',
  },
  {
    id: 'a3',
    title: 'The Lost Penguin',
    type: 'Story',
    emoji: '\uD83D\uDC27',
    difficulty: 'All Ages',
    duration: '8 min',
  },
  {
    id: 'a4',
    title: 'Spot the Difference',
    type: 'Game',
    emoji: '\uD83D\uDD0D',
    difficulty: 'Easy',
    duration: '5 min',
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

export default function KidsLanding() {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title="Kids Pack" />

        {/* Warm Hero Area */}
        <div style={{
          margin: '0 24px 24px',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          position: 'relative',
          padding: '28px 24px',
          background: 'linear-gradient(135deg, var(--green-pale) 0%, var(--gold-pale) 50%, var(--coral-pale) 100%)',
          textAlign: 'center',
        }}>
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            style={{
              width: 72,
              height: 72,
              borderRadius: 'var(--radius-full)',
              background: 'var(--gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 14px',
              fontSize: 32,
              boxShadow: '0 4px 16px rgba(197,214,58,0.3)',
            }}
          >
            \uD83E\uDDD2
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="badge" style={{
              background: 'rgba(197,214,58,0.25)',
              color: 'var(--yellow-medium)',
              marginBottom: 8,
              display: 'inline-flex',
            }}>
              Young Explorer
            </span>
            <h2 className="t-display-md" style={{ marginTop: 8, marginBottom: 4 }}>
              Welcome, Little Explorer!
            </h2>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              Fun activities, games, and stories just for you
            </p>
          </motion.div>
        </div>

        <div style={{ padding: '0 24px 120px' }}>
          {/* Feature Cards Grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 14,
              marginBottom: 32,
            }}
          >
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                variants={fadeUp}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(feature.route)}
                className="card card-elevated"
                style={{
                  padding: 20,
                  textAlign: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
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
                  margin: '0 auto 12px',
                }}>
                  {feature.emoji}
                </div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{feature.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{feature.description}</div>
                {feature.id === 'worksheets' && (
                  <Download size={14} color="var(--text-tertiary)" style={{ position: 'absolute', top: 12, right: 12 }} />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Recommended Activities */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h3 className="t-display-sm">Recommended Activities</h3>
              <button style={{ color: 'var(--green-rich)', fontSize: 13, fontWeight: 600 }}>See All</button>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Activities */}
        <div style={{
          display: 'flex',
          gap: 12,
          overflowX: 'auto',
          scrollbarWidth: 'none',
          padding: '0 24px 120px',
          marginTop: -96,
        }}>
          {recommendedActivities.map((activity, i) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              whileTap={{ scale: 0.96 }}
              style={{
                width: 160,
                flexShrink: 0,
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                background: 'var(--bg-card)',
                boxShadow: 'var(--shadow-md)',
                cursor: 'pointer',
                padding: 16,
                textAlign: 'center',
              }}
            >
              <div style={{
                width: 50,
                height: 50,
                borderRadius: 'var(--radius-md)',
                background: 'var(--green-pale)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 26,
                margin: '0 auto 10px',
              }}>
                {activity.emoji}
              </div>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{activity.title}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 11, color: 'var(--text-secondary)' }}>
                <span className="badge" style={{ background: 'var(--green-pale)', color: 'var(--green-rich)', fontSize: 10 }}>
                  {activity.type}
                </span>
                <span>{activity.duration}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}

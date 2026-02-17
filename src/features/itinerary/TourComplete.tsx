import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ChevronLeft,
  Share2,
  Download,
  Home,
  Clock,
  Award,
  Star,
} from 'lucide-react'
import { PageTransition } from '../../components'

/* ============================================
   Highlight Data
   ============================================ */

interface Highlight {
  name: string
  time: string
  duration: string
  emoji: string
}

const highlights: Highlight[] = [
  { name: 'Lion Safari', time: '10:15', duration: '18 min', emoji: '🦁' },
  { name: 'Elephant Show', time: '10:45', duration: '25 min', emoji: '🐘' },
  { name: 'Aviary Trail', time: '11:45', duration: '32 min', emoji: '🦜' },
]

/* ============================================
   Stagger Animation Helpers
   ============================================ */

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20, stiffness: 200 } },
}

/* ============================================
   Confetti Particle
   ============================================ */

function ConfettiParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 2,
    size: 4 + Math.random() * 6,
    color: [
      'var(--green-rich)',
      'var(--gold)',
      'var(--coral)',
      'var(--amber)',
      'var(--green-mid)',
      'var(--sky)',
    ][Math.floor(Math.random() * 6)],
    rotation: Math.random() * 360,
  }))

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 0,
    }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}%`, opacity: 1, rotate: 0 }}
          animate={{
            y: '120%',
            opacity: [1, 1, 0],
            rotate: p.rotation + 360,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'easeIn',
            repeat: 0,
          }}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            borderRadius: p.size > 7 ? 2 : '50%',
            background: p.color,
          }}
        />
      ))}
    </div>
  )
}

/* ============================================
   TourComplete
   ============================================ */

export default function TourComplete() {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <div className="page" style={{
        background: 'var(--bg-primary)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Confetti */}
        <ConfettiParticles />

        {/* Minimal back header */}
        <div className="page-header" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          position: 'relative',
          zIndex: 2,
        }}>
          <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center' }}>
            <ChevronLeft size={22} />
          </button>
        </div>

        <motion.div
          className="page-scroll"
          style={{ paddingTop: 0, position: 'relative', zIndex: 1 }}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Party Popper */}
          <motion.div
            variants={itemVariants}
            style={{ textAlign: 'center', marginBottom: 4 }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
              style={{ fontSize: 72, lineHeight: 1 }}
            >
              🎉
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.div
            variants={itemVariants}
            style={{ textAlign: 'center', marginBottom: 8 }}
          >
            <h1 className="t-display-xl">Tour complete!</h1>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="t-body"
            style={{
              textAlign: 'center',
              color: 'var(--text-secondary)',
              marginBottom: 28,
            }}
          >
            You explored <strong style={{ color: 'var(--green-rich)' }}>90%</strong> of your plan
          </motion.p>

          {/* Journey Stats Card */}
          <motion.div
            variants={itemVariants}
            className="card card-elevated"
            style={{ padding: 0, overflow: 'hidden', marginBottom: 20 }}
          >
            {/* Card header */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div>
                <div className="t-display-sm">Your journey today</div>
                <div className="t-caption" style={{ color: 'var(--text-secondary)', marginTop: 2 }}>
                  <Clock size={12} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 4 }} />
                  3 hours 24 minutes
                </div>
              </div>
            </div>

            {/* 3 Stats */}
            <div style={{
              display: 'flex',
              padding: '20px 0',
            }}>
              {[
                { emoji: '🦁', value: '22', label: 'Animals' },
                { emoji: '🎪', value: '3', label: 'Shows' },
                { emoji: '☕', value: '2', label: 'Breaks' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.12, type: 'spring', stiffness: 300, damping: 20 }}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    borderRight: i < 2 ? '1px solid var(--border-light)' : 'none',
                  }}
                >
                  <div style={{ fontSize: 24, marginBottom: 4 }}>{stat.emoji}</div>
                  <div className="t-display-md" style={{ lineHeight: 1 }}>{stat.value}</div>
                  <div className="t-caption" style={{ color: 'var(--text-secondary)', marginTop: 4 }}>{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Badge Earned */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 20 }}
              style={{
                margin: '0 16px 16px',
                padding: '14px 16px',
                background: 'var(--green-pale)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                border: '1px solid var(--green-light)',
              }}
            >
              <motion.div
                initial={{ rotate: -20, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ delay: 1.15, type: 'spring', stiffness: 260, damping: 15 }}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--green-rich), var(--green-mid))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Award size={22} color="white" />
              </motion.div>
              <div>
                <div className="t-label" style={{ color: 'var(--green-rich)', marginBottom: 2 }}>
                  Badge Earned
                </div>
                <div className="t-body" style={{ fontWeight: 600, color: 'var(--green-deep)' }}>
                  Savanna Explorer
                </div>
              </div>
              <Star size={18} color="var(--gold)" fill="var(--gold)" style={{ marginLeft: 'auto' }} />
            </motion.div>
          </motion.div>

          {/* Today's Highlights */}
          <motion.div variants={itemVariants}>
            <h3 className="t-display-sm" style={{ marginBottom: 12 }}>Today's highlights</h3>
          </motion.div>

          <motion.div variants={itemVariants} style={{ marginBottom: 28 }}>
            {highlights.map((h, i) => (
              <motion.div
                key={h.name}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '14px 16px',
                  background: 'var(--bg-card)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: 8,
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid var(--border-light)',
                }}
              >
                <span style={{ fontSize: 28 }}>{h.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{h.name}</div>
                  <div className="t-caption" style={{ color: 'var(--text-secondary)', marginTop: 2 }}>
                    {h.time} &bull; {h.duration}
                  </div>
                </div>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'var(--green-pale)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Star size={14} color="var(--green-rich)" fill="var(--green-rich)" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Share Button */}
          <motion.div variants={itemVariants}>
            <motion.button
              className="btn btn-primary btn-full"
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '16px 28px',
                fontSize: 16,
                gap: 8,
                marginBottom: 12,
              }}
            >
              <Share2 size={18} />
              Share your visit
            </motion.button>
          </motion.div>

          {/* Download & Home buttons */}
          <motion.div
            variants={itemVariants}
            style={{
              display: 'flex',
              gap: 12,
              marginBottom: 28,
            }}
          >
            <motion.button
              className="btn btn-secondary"
              whileTap={{ scale: 0.97 }}
              style={{ flex: 1, gap: 6 }}
            >
              <Download size={16} />
              Download
            </motion.button>
            <motion.button
              className="btn btn-secondary"
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/home')}
              style={{ flex: 1, gap: 6 }}
            >
              <Home size={16} />
              Home
            </motion.button>
          </motion.div>

          {/* Footer text */}
          <motion.p
            variants={itemVariants}
            className="t-body-sm"
            style={{
              textAlign: 'center',
              color: 'var(--text-tertiary)',
              paddingBottom: 16,
            }}
          >
            Thank you for visiting Wildlife Sanctuary
          </motion.p>
        </motion.div>
      </div>
    </PageTransition>
  )
}

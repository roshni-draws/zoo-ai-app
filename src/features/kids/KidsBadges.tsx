import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Lock, ChevronDown, Trophy, Star } from 'lucide-react'
import { BackHeader, PageTransition } from '../../components'

const badges = [
  {
    id: 'b1',
    name: 'Zoo Explorer',
    description: 'Visit 5 different zones',
    emoji: '\uD83E\uDDED',
    earned: true,
    progress: 100,
    color: 'var(--green-rich)',
    bgColor: 'var(--green-pale)',
  },
  {
    id: 'b2',
    name: 'Animal Friend',
    description: 'Learn about 10 animals',
    emoji: '\uD83E\uDD81',
    earned: true,
    progress: 100,
    color: 'var(--amber)',
    bgColor: 'var(--orange-pale)',
  },
  {
    id: 'b3',
    name: 'Brave Heart',
    description: 'Pet 3 animals at the touch zoo',
    emoji: '\uD83D\uDCAA',
    earned: false,
    progress: 33,
    color: 'var(--coral)',
    bgColor: 'var(--coral-pale)',
  },
  {
    id: 'b4',
    name: 'Star Student',
    description: 'Complete 5 educational quizzes',
    emoji: '\u2B50',
    earned: false,
    progress: 40,
    color: 'var(--gold)',
    bgColor: 'var(--gold-pale)',
  },
  {
    id: 'b5',
    name: 'Eco Warrior',
    description: 'Attend a conservation talk',
    emoji: '\uD83C\uDF0D',
    earned: false,
    progress: 60,
    color: 'var(--green-mid)',
    bgColor: 'var(--green-pale)',
  },
  {
    id: 'b6',
    name: 'Story Champion',
    description: 'Read all story time books',
    emoji: '\uD83D\uDCD6',
    earned: true,
    progress: 100,
    color: 'var(--sky)',
    bgColor: 'var(--sky-pale)',
  },
]

const howToEarn = [
  {
    title: 'Explore Zones',
    content: 'Visit different zones around the zoo. Each zone you enter gets tracked automatically via QR scan.',
  },
  {
    title: 'Complete Activities',
    content: 'Finish worksheets, quizzes, and games in the Kids Pack. Each completed activity earns progress towards badges.',
  },
  {
    title: 'Attend Events',
    content: 'Participate in educational talks, feeding sessions, and special events to unlock unique badges.',
  },
  {
    title: 'Scan QR Codes',
    content: 'Find hidden QR codes around the zoo! Each scan gives you points and badge progress.',
  },
]

export default function KidsBadges() {
  const [expandedHow, setExpandedHow] = useState(false)
  const earnedCount = badges.filter(b => b.earned).length
  const totalCount = badges.length
  const allEarned = earnedCount === totalCount

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title="Collect Badges" />

        <div style={{ padding: '0 24px 120px' }}>
          {/* Progress Header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="card card-gradient"
            style={{ padding: 24, marginBottom: 24, textAlign: 'center' }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              style={{ fontSize: 40, marginBottom: 12 }}
            >
              <Trophy size={40} color="var(--gold)" />
            </motion.div>
            <h2 className="t-display-md" style={{ color: 'white', marginBottom: 6 }}>Your Progress</h2>
            <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--gold)', marginBottom: 14 }}>
              {earnedCount} of {totalCount} Badges
            </div>
            <div className="progress-bar" style={{ height: 8, background: 'rgba(255,255,255,0.2)', marginBottom: 8 }}>
              <motion.div
                className="progress-bar-fill"
                initial={{ width: 0 }}
                animate={{ width: `${(earnedCount / totalCount) * 100}%` }}
                transition={{ duration: 1, delay: 0.4 }}
                style={{ background: 'var(--gold)' }}
              />
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
              {totalCount - earnedCount} more to complete your collection!
            </div>
          </motion.div>

          {/* Badge Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 12,
            marginBottom: 28,
          }}>
            {badges.map((badge, i) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.08, type: 'spring', stiffness: 200 }}
                className="card"
                style={{
                  padding: 16,
                  textAlign: 'center',
                  position: 'relative',
                  background: badge.earned ? 'var(--bg-card)' : 'var(--bg-primary)',
                  opacity: badge.earned ? 1 : 0.75,
                  overflow: 'hidden',
                }}
              >
                {/* Badge Icon */}
                <div style={{
                  width: 60,
                  height: 60,
                  borderRadius: 'var(--radius-full)',
                  background: badge.earned ? badge.bgColor : 'var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: badge.earned ? 28 : 20,
                  margin: '0 auto 10px',
                  position: 'relative',
                  boxShadow: badge.earned ? `0 4px 12px ${badge.bgColor}` : 'none',
                }}>
                  {badge.earned ? (
                    badge.emoji
                  ) : (
                    <Lock size={20} color="var(--text-tertiary)" />
                  )}

                  {/* Checkmark for earned */}
                  {badge.earned && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
                      style={{
                        position: 'absolute',
                        bottom: -2,
                        right: -2,
                        width: 22,
                        height: 22,
                        borderRadius: '50%',
                        background: 'var(--green-rich)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid white',
                      }}
                    >
                      <Check size={12} color="white" strokeWidth={3} />
                    </motion.div>
                  )}
                </div>

                <div style={{
                  fontWeight: 700,
                  fontSize: 12,
                  marginBottom: 4,
                  color: badge.earned ? 'var(--text-primary)' : 'var(--text-tertiary)',
                }}>
                  {badge.name}
                </div>

                {/* Progress for locked badges */}
                {!badge.earned && badge.progress > 0 && (
                  <div style={{ marginTop: 6 }}>
                    <div className="progress-bar" style={{ height: 4, marginBottom: 4 }}>
                      <div className="progress-bar-fill" style={{ width: `${badge.progress}%` }} />
                    </div>
                    <span style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>{badge.progress}%</span>
                  </div>
                )}

                {badge.earned && (
                  <span style={{ fontSize: 10, color: 'var(--green-rich)', fontWeight: 600 }}>Earned!</span>
                )}
              </motion.div>
            ))}
          </div>

          {/* All Badges Celebration */}
          <AnimatePresence>
            {allEarned && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="card"
                style={{
                  padding: 24,
                  textAlign: 'center',
                  marginBottom: 24,
                  background: 'linear-gradient(135deg, var(--gold-pale), var(--green-pale))',
                  border: '2px solid var(--gold-light)',
                }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  style={{ fontSize: 48, marginBottom: 12 }}
                >
                  \uD83C\uDF89
                </motion.div>
                <h3 className="t-display-md" style={{ marginBottom: 6, color: 'var(--yellow-medium)' }}>
                  Congratulations!
                </h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                  You have collected all badges! You are a true Zoo Champion!
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* How to Earn Badges */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <button
              onClick={() => setExpandedHow(!expandedHow)}
              style={{
                width: '100%',
                padding: '18px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                textAlign: 'left',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Star size={18} color="var(--gold)" />
                <span style={{ fontWeight: 700, fontSize: 15 }}>HOW TO EARN BADGES</span>
              </div>
              <motion.div
                animate={{ rotate: expandedHow ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={18} color="var(--text-tertiary)" />
              </motion.div>
            </button>
            <AnimatePresence>
              {expandedHow && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {howToEarn.map((item, i) => (
                      <div key={item.title} style={{ display: 'flex', gap: 12 }}>
                        <div style={{
                          width: 28,
                          height: 28,
                          borderRadius: 'var(--radius-full)',
                          background: 'var(--green-pale)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 12,
                          fontWeight: 700,
                          color: 'var(--green-rich)',
                          flexShrink: 0,
                        }}>
                          {i + 1}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{item.title}</div>
                          <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                            {item.content}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

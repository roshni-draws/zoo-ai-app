import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, RotateCcw, Star, Clock } from 'lucide-react'
import { BackHeader, PageTransition } from '../../components'

const colors = [
  { id: 'green', value: '#2E6B34', label: 'Green' },
  { id: 'brown', value: '#8B6914', label: 'Brown' },
  { id: 'orange', value: '#E88030', label: 'Orange' },
  { id: 'yellow', value: '#C5D63A', label: 'Yellow' },
  { id: 'blue', value: '#4A90D9', label: 'Blue' },
  { id: 'red', value: '#E86868', label: 'Red' },
  { id: 'pink', value: '#E868A0', label: 'Pink' },
  { id: 'purple', value: '#9B59B6', label: 'Purple' },
]

// Simple SVG elephant outline for coloring
const animalPaths = [
  // Body
  'M120,200 Q100,160 130,130 Q160,100 200,100 Q260,100 290,130 Q320,160 300,200 Q290,230 260,240 L160,240 Q130,230 120,200 Z',
  // Head
  'M80,170 Q60,140 80,110 Q100,80 130,90 Q140,95 130,130 Q120,160 80,170 Z',
  // Trunk
  'M60,140 Q40,160 30,190 Q25,210 35,220 Q45,225 50,210 Q55,190 65,170',
  // Ear
  'M85,120 Q55,90 60,60 Q65,40 85,50 Q95,55 100,80 Q105,100 85,120 Z',
  // Legs
  'M160,240 L155,300 L175,300 L180,240',
  'M220,240 L215,300 L235,300 L240,240',
  'M260,240 L255,300 L275,300 L280,240',
  // Tail
  'M300,200 Q320,190 330,180 Q340,170 335,175',
  // Eye
  'M95,115 Q97,112 100,115 Q97,118 95,115 Z',
  // Tusk
  'M55,165 Q45,175 50,185 Q55,180 55,165 Z',
]

export default function KidsActivity() {
  const navigate = useNavigate()
  const [selectedColor, setSelectedColor] = useState(colors[0].value)
  const [coloredPaths, setColoredPaths] = useState<Record<number, string>>({})
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [isComplete, setIsComplete] = useState(false)
  const [pointsEarned, setPointsEarned] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60)
    const sec = s % 60
    return `${min}:${sec.toString().padStart(2, '0')}`
  }

  const handlePathClick = (index: number) => {
    if (isComplete) return
    setColoredPaths(prev => ({ ...prev, [index]: selectedColor }))
  }

  const handleReset = () => {
    setColoredPaths({})
    setIsComplete(false)
    setPointsEarned(0)
    setTimeLeft(300)
  }

  const handleComplete = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    const colorsUsed = new Set(Object.values(coloredPaths)).size
    const pathsColored = Object.keys(coloredPaths).length
    const points = pathsColored * 10 + colorsUsed * 5 + Math.floor(timeLeft / 10)
    setPointsEarned(points)
    setIsComplete(true)
  }

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title="Activity" />

        <AnimatePresence mode="wait">
          {!isComplete ? (
            <motion.div
              key="activity"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ padding: '0 24px 120px' }}
            >
              {/* Timer & Info Bar */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16,
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-card)',
                boxShadow: 'var(--shadow-sm)',
              }}>
                <div>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Coloring Activity</span>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>Color the Elephant</div>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  background: timeLeft < 60 ? 'var(--coral-pale)' : 'var(--green-pale)',
                  color: timeLeft < 60 ? 'var(--coral)' : 'var(--green-rich)',
                  fontWeight: 700,
                  fontSize: 14,
                  fontFamily: 'var(--font-display)',
                }}>
                  <Clock size={14} />
                  {formatTime(timeLeft)}
                </div>
              </div>

              {/* Canvas Area */}
              <div style={{
                width: '100%',
                height: 340,
                borderRadius: 'var(--radius-xl)',
                background: 'var(--bg-card)',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                position: 'relative',
                overflow: 'hidden',
                border: '2px solid var(--border-light)',
              }}>
                {/* Grid pattern background */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'radial-gradient(circle, var(--border-light) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                  opacity: 0.5,
                }} />

                <svg
                  viewBox="0 0 380 320"
                  style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}
                >
                  {animalPaths.map((path, i) => (
                    <motion.path
                      key={i}
                      d={path}
                      fill={coloredPaths[i] || 'transparent'}
                      stroke="var(--text-primary)"
                      strokeWidth={2}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      onClick={() => handlePathClick(i)}
                      style={{ cursor: 'pointer' }}
                      whileHover={{ opacity: 0.8 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                    />
                  ))}
                </svg>
              </div>

              {/* Color Palette */}
              <div style={{
                padding: 16,
                borderRadius: 'var(--radius-lg)',
                background: 'var(--bg-card)',
                boxShadow: 'var(--shadow-sm)',
                marginBottom: 20,
              }}>
                <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 10, color: 'var(--text-secondary)' }}>
                  Choose a Color
                </div>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                  {colors.map(color => (
                    <motion.button
                      key={color.id}
                      whileTap={{ scale: 0.85 }}
                      onClick={() => setSelectedColor(color.value)}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: color.value,
                        border: selectedColor === color.value ? '3px solid var(--text-primary)' : '2px solid var(--border)',
                        boxShadow: selectedColor === color.value ? '0 0 0 2px white, 0 0 0 4px ' + color.value : 'none',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: 10 }}>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-secondary"
                  onClick={handleReset}
                  style={{ flex: 1 }}
                >
                  <RotateCcw size={16} /> Reset
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary"
                  onClick={handleComplete}
                  style={{ flex: 2 }}
                >
                  <Check size={16} /> COMPLETE
                </motion.button>
              </div>
            </motion.div>
          ) : (
            /* ========== Completion Screen ========== */
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              style={{ padding: '40px 24px 120px', textAlign: 'center' }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--gold), var(--yellow-medium))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  boxShadow: '0 8px 24px rgba(197,214,58,0.3)',
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                >
                  <Star size={44} color="white" fill="white" />
                </motion.div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="t-display-lg"
                style={{ marginBottom: 6 }}
              >
                Well Done!
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 28 }}
              >
                You completed the coloring activity!
              </motion.p>

              {/* Points Display */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="card"
                style={{
                  padding: 24,
                  marginBottom: 24,
                  background: 'linear-gradient(135deg, var(--gold-pale), var(--green-pale))',
                  border: '2px solid var(--gold-light)',
                }}
              >
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>Points Earned</div>
                <div style={{
                  fontSize: 48,
                  fontWeight: 800,
                  fontFamily: 'var(--font-display)',
                  color: 'var(--green-rich)',
                  lineHeight: 1,
                  marginBottom: 8,
                }}>
                  +{pointsEarned}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                    >
                      <Star size={20} color="var(--gold)" fill={i < 3 ? 'var(--gold)' : 'none'} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 28 }}
              >
                {[
                  { label: 'Colors Used', value: new Set(Object.values(coloredPaths)).size.toString() },
                  { label: 'Parts Colored', value: Object.keys(coloredPaths).length.toString() },
                  { label: 'Time Left', value: formatTime(timeLeft) },
                ].map(stat => (
                  <div key={stat.label} className="card" style={{ padding: 14, textAlign: 'center' }}>
                    <div style={{ fontSize: 20, fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--green-rich)' }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              <button onClick={handleReset} className="btn btn-primary btn-full" style={{ marginBottom: 10 }}>
                Try Again
              </button>
              <button onClick={() => navigate('/kids')} className="btn btn-ghost btn-full">
                Back to Kids Pack
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}

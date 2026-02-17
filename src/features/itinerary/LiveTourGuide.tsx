import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Navigation,
  Clock,
  MapPin,
  Footprints,
  X,
  Zap,
} from 'lucide-react'
import { PageTransition, BackHeader } from '../../components'

/* ============================================
   Tour Stops
   ============================================ */

interface TourStop {
  id: number
  name: string
  zone: string
  duration: string
  type: 'exhibit' | 'show' | 'break'
  emoji: string
  x: number
  y: number
}

const tourStops: TourStop[] = [
  { id: 1, name: 'Entry Gate', zone: 'Main Entrance', duration: '10 min', type: 'exhibit', emoji: '🚪', x: 50, y: 85 },
  { id: 2, name: 'Lion Safari', zone: 'Savanna Zone', duration: '25 min', type: 'exhibit', emoji: '🦁', x: 25, y: 65 },
  { id: 3, name: 'Elephant Bathing Show', zone: 'Elephant Valley', duration: '30 min', type: 'show', emoji: '🐘', x: 70, y: 55 },
  { id: 4, name: 'Cafe Break', zone: 'Jungle Cafe', duration: '20 min', type: 'break', emoji: '☕', x: 45, y: 45 },
  { id: 5, name: 'Aviary Trail', zone: 'Bird Paradise', duration: '35 min', type: 'exhibit', emoji: '🦜', x: 20, y: 30 },
  { id: 6, name: 'Penguin Cove', zone: 'Arctic Zone', duration: '20 min', type: 'exhibit', emoji: '🐧', x: 75, y: 25 },
  { id: 7, name: 'Sea Lion Show', zone: 'Ocean Theater', duration: '25 min', type: 'show', emoji: '🦭', x: 55, y: 15 },
  { id: 8, name: 'Cafe Break', zone: 'Lakeside Bistro', duration: '15 min', type: 'break', emoji: '🍽️', x: 35, y: 10 },
]

const typeColors: Record<string, string> = {
  exhibit: 'var(--green-rich)',
  show: 'var(--coral)',
  break: 'var(--amber)',
}

/* ============================================
   Decorative Map SVG
   ============================================ */

function DecorativeMap({ currentStop, started }: { currentStop: number; started: boolean }) {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(160deg, #D4E8D0 0%, #E8F0DC 30%, #C8DEC4 60%, #B8D4B4 100%)',
      overflow: 'hidden',
    }}>
      {/* Map zones */}
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
        {/* Paths between stops */}
        <path
          d="M50,85 C40,75 25,70 25,65"
          fill="none"
          stroke="rgba(46,107,52,0.25)"
          strokeWidth="0.8"
          strokeDasharray="2,2"
        />
        <path
          d="M25,65 C40,60 60,58 70,55"
          fill="none"
          stroke="rgba(46,107,52,0.25)"
          strokeWidth="0.8"
          strokeDasharray="2,2"
        />
        <path
          d="M70,55 C58,50 48,47 45,45"
          fill="none"
          stroke="rgba(46,107,52,0.25)"
          strokeWidth="0.8"
          strokeDasharray="2,2"
        />
        <path
          d="M45,45 C35,38 22,33 20,30"
          fill="none"
          stroke="rgba(46,107,52,0.25)"
          strokeWidth="0.8"
          strokeDasharray="2,2"
        />
        <path
          d="M20,30 C40,28 65,26 75,25"
          fill="none"
          stroke="rgba(46,107,52,0.25)"
          strokeWidth="0.8"
          strokeDasharray="2,2"
        />
        <path
          d="M75,25 C68,20 60,17 55,15"
          fill="none"
          stroke="rgba(46,107,52,0.25)"
          strokeWidth="0.8"
          strokeDasharray="2,2"
        />
        <path
          d="M55,15 C48,12 40,11 35,10"
          fill="none"
          stroke="rgba(46,107,52,0.25)"
          strokeWidth="0.8"
          strokeDasharray="2,2"
        />

        {/* Decorative zone regions */}
        <ellipse cx="25" cy="65" rx="18" ry="12" fill="rgba(197,166,58,0.08)" />
        <ellipse cx="70" cy="55" rx="16" ry="10" fill="rgba(232,104,160,0.06)" />
        <ellipse cx="20" cy="30" rx="14" ry="10" fill="rgba(46,107,52,0.06)" />
        <ellipse cx="75" cy="25" rx="14" ry="10" fill="rgba(74,144,217,0.08)" />
        <ellipse cx="55" cy="15" rx="14" ry="8" fill="rgba(232,104,160,0.06)" />

        {/* Water features */}
        <ellipse cx="60" cy="40" rx="8" ry="4" fill="rgba(74,144,217,0.15)" rx="2" />
        <ellipse cx="80" cy="70" rx="6" ry="3" fill="rgba(74,144,217,0.12)" />

        {/* Tree clusters */}
        {[
          [10, 50], [15, 20], [85, 40], [90, 65], [5, 80],
          [40, 70], [65, 35], [30, 55], [80, 15], [50, 25],
        ].map(([cx, cy], i) => (
          <circle key={`tree-${i}`} cx={cx} cy={cy} r="2.5" fill="rgba(46,107,52,0.15)" />
        ))}
      </svg>

      {/* Zone labels */}
      <div style={{
        position: 'absolute',
        left: '12%',
        top: '58%',
        fontSize: 9,
        fontWeight: 600,
        color: 'rgba(26,61,31,0.35)',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
      }}>
        Savanna
      </div>
      <div style={{
        position: 'absolute',
        left: '60%',
        top: '48%',
        fontSize: 9,
        fontWeight: 600,
        color: 'rgba(26,61,31,0.35)',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
      }}>
        Valley
      </div>
      <div style={{
        position: 'absolute',
        left: '8%',
        top: '24%',
        fontSize: 9,
        fontWeight: 600,
        color: 'rgba(26,61,31,0.35)',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
      }}>
        Bird Paradise
      </div>
      <div style={{
        position: 'absolute',
        left: '66%',
        top: '18%',
        fontSize: 9,
        fontWeight: 600,
        color: 'rgba(26,61,31,0.35)',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
      }}>
        Arctic
      </div>

      {/* Stop markers */}
      {tourStops.map((stop, index) => {
        const isCurrentStop = started && index + 1 === currentStop
        const isPast = started && index + 1 < currentStop
        const color = typeColors[stop.type]

        return (
          <motion.div
            key={stop.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.08, type: 'spring', stiffness: 300, damping: 20 }}
            style={{
              position: 'absolute',
              left: `${stop.x}%`,
              top: `${stop.y}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: isCurrentStop ? 10 : 5,
            }}
          >
            {isCurrentStop && (
              <motion.div
                animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  inset: -6,
                  borderRadius: '50%',
                  border: `2px solid ${color}`,
                }}
              />
            )}
            <div style={{
              width: isCurrentStop ? 32 : 26,
              height: isCurrentStop ? 32 : 26,
              borderRadius: '50%',
              background: isPast ? 'var(--border)' : color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: isCurrentStop ? 14 : 11,
              fontWeight: 700,
              color: 'white',
              boxShadow: isCurrentStop ? `0 2px 12px rgba(0,0,0,0.2)` : 'var(--shadow-sm)',
              border: '2px solid white',
              transition: 'all 0.3s ease',
            }}>
              {stop.emoji}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

/* ============================================
   LiveTourGuide
   ============================================ */

export default function LiveTourGuide() {
  const navigate = useNavigate()
  const [started, setStarted] = useState(false)
  const [currentStop, setCurrentStop] = useState(1)
  const [showNearbyAlert, setShowNearbyAlert] = useState(true)

  const stop = tourStops[currentStop - 1]

  const handleStartTour = () => {
    setStarted(true)
    setCurrentStop(2)
  }

  const handleNavigate = () => {
    if (currentStop < tourStops.length) {
      setCurrentStop(prev => prev + 1)
    } else {
      navigate('/plan/tour-complete')
    }
  }

  return (
    <PageTransition>
      <div className="page" style={{
        background: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <BackHeader title="Location" />

        {/* Map Area */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <DecorativeMap currentStop={currentStop} started={started} />

          {/* Upcoming event alert (only when started) */}
          <AnimatePresence>
            {started && currentStop < 6 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{
                  position: 'absolute',
                  top: 12,
                  left: 16,
                  right: 16,
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  boxShadow: 'var(--shadow-md)',
                  border: '1px solid var(--coral-light)',
                }}
              >
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'var(--coral-pale)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Zap size={16} color="var(--coral)" />
                </div>
                <div style={{ flex: 1 }}>
                  <span className="t-caption" style={{ fontWeight: 600, color: 'var(--coral)' }}>
                    Penguin Show starts in 10 min
                  </span>
                  <span className="t-caption" style={{ color: 'var(--text-secondary)' }}>
                    {' '} &bull; 400m away
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Card */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: 'spring', damping: 25 }}
          style={{
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
            boxShadow: 'var(--shadow-lg)',
            padding: '20px var(--space-xl)',
            paddingBottom: 'calc(var(--space-xl) + env(safe-area-inset-bottom, 0px))',
          }}
        >
          {!started ? (
            /* ---- Pre-start state ---- */
            <>
              <div style={{
                width: 36,
                height: 4,
                borderRadius: 2,
                background: 'var(--border)',
                margin: '0 auto 16px',
              }} />

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 16,
              }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--green-pale)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                }}>
                  👋
                </div>
                <div style={{ flex: 1 }}>
                  <p className="t-body" style={{ fontWeight: 500 }}>
                    Welcome! You're at <strong>Entry Gate A</strong>.
                  </p>
                  <p className="t-caption" style={{ color: 'var(--text-secondary)', marginTop: 2 }}>
                    Ready to start exploring?
                  </p>
                </div>
              </div>

              {/* Stats Row */}
              <div style={{
                display: 'flex',
                gap: 0,
                marginBottom: 20,
                background: 'var(--bg-primary)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 0',
              }}>
                {[
                  { icon: <MapPin size={16} color="var(--green-rich)" />, value: '8', label: 'Stops' },
                  { icon: <Clock size={16} color="var(--coral)" />, value: '10:00', label: 'First stop' },
                  { icon: <Footprints size={16} color="var(--amber)" />, value: '2.4 km', label: 'Walk time' },
                ].map((stat, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      borderRight: i < 2 ? '1px solid var(--border-light)' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginBottom: 4 }}>
                      {stat.icon}
                      <span className="t-display-sm">{stat.value}</span>
                    </div>
                    <span className="t-caption" style={{ color: 'var(--text-secondary)' }}>{stat.label}</span>
                  </div>
                ))}
              </div>

              <motion.button
                className="btn btn-primary btn-full"
                whileTap={{ scale: 0.97 }}
                onClick={handleStartTour}
                style={{ padding: '16px 28px', fontSize: 16, gap: 8 }}
              >
                <Navigation size={18} />
                START TOUR
              </motion.button>
            </>
          ) : (
            /* ---- Active tour state ---- */
            <>
              <div style={{
                width: 36,
                height: 4,
                borderRadius: 2,
                background: 'var(--border)',
                margin: '0 auto 14px',
              }} />

              {/* Current stop label */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 12,
              }}>
                <span className="t-label" style={{ color: 'var(--green-rich)' }}>
                  STOP {currentStop} OF {tourStops.length}
                </span>
                <span className="badge badge-active" style={{ fontSize: 10 }}>
                  {stop.type === 'show' ? 'Live Show' : stop.type === 'break' ? 'Break' : 'Exhibit'}
                </span>
              </div>

              {/* Stop info card */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                marginBottom: 16,
                padding: '14px 16px',
                background: 'var(--bg-primary)',
                borderRadius: 'var(--radius-md)',
                borderLeft: `3px solid ${typeColors[stop.type]}`,
              }}>
                <span style={{ fontSize: 32 }}>{stop.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div className="t-display-sm">{stop.name}</div>
                  <div className="t-caption" style={{ color: 'var(--text-secondary)', marginTop: 2 }}>
                    {stop.zone}
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  padding: '4px 10px',
                  background: 'var(--bg-card)',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-light)',
                }}>
                  <Clock size={12} color="var(--text-secondary)" />
                  <span className="t-caption" style={{ fontWeight: 600 }}>{stop.duration}</span>
                </div>
              </div>

              {/* Navigate button */}
              <motion.button
                className="btn btn-primary btn-full"
                whileTap={{ scale: 0.97 }}
                onClick={handleNavigate}
                style={{ padding: '14px 28px', fontSize: 15, gap: 8, marginBottom: 12 }}
              >
                <Navigation size={18} />
                {currentStop < tourStops.length ? 'NAVIGATE' : 'FINISH TOUR'}
              </motion.button>

              {/* Nearby alert */}
              <AnimatePresence>
                {showNearbyAlert && currentStop < 5 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{
                      background: 'var(--coral-pale)',
                      borderRadius: 'var(--radius-md)',
                      padding: 14,
                      border: '1px solid var(--coral-light)',
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                      <span style={{ fontSize: 20 }}>🐘</span>
                      <div style={{ flex: 1 }}>
                        <div className="t-body-sm" style={{ fontWeight: 600 }}>
                          Elephant Show nearby
                        </div>
                        <div className="t-caption" style={{ color: 'var(--text-secondary)' }}>
                          Starting in 8 minutes
                        </div>
                      </div>
                      <button onClick={() => setShowNearbyAlert(false)}>
                        <X size={16} color="var(--text-secondary)" />
                      </button>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <motion.button
                        className="btn btn-sm"
                        whileTap={{ scale: 0.97 }}
                        style={{
                          flex: 1,
                          background: 'var(--coral)',
                          color: 'white',
                          fontSize: 12,
                          padding: '8px 12px',
                        }}
                        onClick={() => {
                          setCurrentStop(3)
                          setShowNearbyAlert(false)
                        }}
                      >
                        TAKE ME THERE
                      </motion.button>
                      <motion.button
                        className="btn btn-sm btn-secondary"
                        whileTap={{ scale: 0.97 }}
                        style={{
                          flex: 1,
                          fontSize: 12,
                          padding: '8px 12px',
                        }}
                        onClick={() => setShowNearbyAlert(false)}
                      >
                        STAY ON ROUTE
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </motion.div>
      </div>
    </PageTransition>
  )
}

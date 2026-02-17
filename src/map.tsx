import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Mic, Locate, Layers, Navigation, Bookmark, Headphones, Plus, X, ChevronDown, Users, Thermometer, Route, Zap, Compass, Clock, TrendingUp, Eye, BarChart3, Sparkles } from 'lucide-react'
import { useApp } from './context'
import { animals, facilities, events } from './data'
import { PageTransition, StatusDot } from './components'

type MapLayer = 'default' | 'right-now' | 'my-plan' | 'comfort' | 'family'

/* ============================================
   Crowd Forecast Data
   ============================================ */

const crowdHours = [
  { hour: '8am', level: 15 }, { hour: '9am', level: 30 }, { hour: '10am', level: 55 },
  { hour: '11am', level: 80 }, { hour: '12pm', level: 95 }, { hour: '1pm', level: 85 },
  { hour: '2pm', level: 70 }, { hour: '3pm', level: 55 }, { hour: '4pm', level: 35 },
  { hour: '5pm', level: 20 },
]

const zoneTraffic = [
  { name: 'Africa Rocks', level: 'high' as const, wait: '15 min' },
  { name: 'Elephant Odyssey', level: 'medium' as const, wait: '5 min' },
  { name: 'Lost Forest', level: 'low' as const, wait: 'No wait' },
  { name: 'Polar Rim', level: 'medium' as const, wait: '8 min' },
  { name: 'Penguin Beach', level: 'high' as const, wait: '12 min' },
  { name: 'Urban Jungle', level: 'low' as const, wait: 'No wait' },
]

const trafficColor = { high: 'var(--coral)', medium: 'var(--amber)', low: 'var(--green-rich)' }

/* ============================================
   Map Tab
   ============================================ */

export function MapTab() {
  const navigate = useNavigate()
  const { setAudioPlaying, setSelectedExhibit, savedAnimals, toggleSavedAnimal, wanderMode, setWanderMode, visitedExhibits, markExhibitVisited, sensorySensitivity } = useApp()

  // Noise levels per exhibit for sensory sensitivity mode
  const noiseMap: Record<string, 'quiet' | 'moderate' | 'loud'> = {
    lion: 'moderate', elephant: 'quiet', penguin: 'loud', gorilla: 'quiet',
    giraffe: 'quiet', 'polar-bear': 'moderate', 'red-panda': 'quiet',
    flamingo: 'moderate', koala: 'quiet', orangutan: 'quiet',
    hippo: 'moderate', cheetah: 'quiet',
  }
  const [activeLayer, setActiveLayer] = useState<MapLayer>('default')
  const [selectedAnimal, setSelectedAnimal] = useState<typeof animals[0] | null>(null)
  const [showSearch, setShowSearch] = useState(false)
  const [sheetExpanded, setSheetExpanded] = useState(false)
  const [spotlightVisible, setSpotlightVisible] = useState(true)
  const [showCrowdForecast, setShowCrowdForecast] = useState(false)
  const [wanderIndex, setWanderIndex] = useState(0)
  const [wanderDiscoveries, setWanderDiscoveries] = useState(0)
  const [wanderCelebrate, setWanderCelebrate] = useState(false)

  const wanderQueue = animals.filter(a => !visitedExhibits.some(v => v.id === a.id))
  const wanderTarget = wanderQueue[wanderIndex % wanderQueue.length] || animals[0]

  const layers: { id: MapLayer; label: string; icon: string }[] = [
    { id: 'default', label: 'Default', icon: '🗺️' },
    { id: 'right-now', label: 'Right Now', icon: '⚡' },
    { id: 'my-plan', label: 'My Plan', icon: '📋' },
    { id: 'comfort', label: 'Comfort', icon: '🚻' },
    { id: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
  ]

  return (
    <PageTransition>
      <div style={{ height: '100dvh', position: 'relative', overflow: 'hidden' }}>
        {/* Map Canvas */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse at 30% 30%, #D4E8D1 0%, transparent 50%),
            radial-gradient(ellipse at 70% 60%, #E8F1E5 0%, transparent 40%),
            radial-gradient(ellipse at 50% 80%, #F0EBE4 0%, transparent 50%),
            #EDE8E0
          `,
        }}>
          {/* Paths / trails (decorative) */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.3 }}>
            <path d="M 80 200 Q 150 180 200 250 T 320 300 T 380 420" stroke="var(--gold)" strokeWidth="2" fill="none" strokeDasharray="6 4" />
            <path d="M 120 100 Q 180 150 220 120 T 340 180 T 360 260" stroke="var(--green-sage)" strokeWidth="2" fill="none" strokeDasharray="6 4" />
            <path d="M 50 350 Q 120 320 180 360 T 300 340 T 400 380" stroke="var(--gold)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
          </svg>

          {/* Zone labels */}
          {[
            { name: 'Africa Rocks', x: '15%', y: '18%', rotation: -5 },
            { name: 'Elephant Odyssey', x: '55%', y: '22%', rotation: 3 },
            { name: 'Lost Forest', x: '20%', y: '45%', rotation: -2 },
            { name: 'Polar Rim', x: '65%', y: '48%', rotation: 4 },
            { name: 'Urban Jungle', x: '35%', y: '68%', rotation: -3 },
            { name: 'Penguin Beach', x: '70%', y: '72%', rotation: 2 },
          ].map(zone => (
            <div
              key={zone.name}
              style={{
                position: 'absolute',
                left: zone.x,
                top: zone.y,
                transform: `rotate(${zone.rotation}deg)`,
                fontSize: 10,
                fontWeight: 600,
                color: 'var(--green-rich)',
                opacity: 0.4,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-body)',
                pointerEvents: 'none',
              }}
            >
              {zone.name}
            </div>
          ))}

          {/* Animal pins (hidden in wander mode) */}
          {activeLayer !== 'comfort' && !wanderMode && animals.map((animal, i) => {
            const positions = [
              { x: 22, y: 25 }, { x: 60, y: 28 }, { x: 75, y: 38 },
              { x: 35, y: 40 }, { x: 50, y: 55 }, { x: 25, y: 58 },
              { x: 68, y: 62 }, { x: 15, y: 72 }, { x: 45, y: 75 },
              { x: 78, y: 78 }, { x: 55, y: 42 }, { x: 38, y: 85 },
            ]
            const pos = positions[i % positions.length]
            const isActive = animal.status === 'active' || animal.status === 'feeding'
            const isRightNow = activeLayer === 'right-now'
            const isPlan = activeLayer === 'my-plan'
            const dimmed = isPlan && !['lion', 'giraffe', 'elephant', 'penguin', 'gorilla'].includes(animal.id)
            const visited = visitedExhibits.find(v => v.id === animal.id)

            return (
              <motion.button
                key={animal.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: dimmed ? 0.25 : 1 }}
                transition={{ delay: i * 0.04, type: 'spring', stiffness: 300 }}
                onClick={() => setSelectedAnimal(animal)}
                style={{
                  position: 'absolute',
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: 'translate(-50%, -50%)',
                  width: isRightNow && isActive ? 52 : 44,
                  height: isRightNow && isActive ? 52 : 44,
                  borderRadius: '50%',
                  background: 'white',
                  boxShadow: visited
                    ? '0 2px 12px rgba(46, 107, 52, 0.3)'
                    : isActive
                      ? '0 2px 12px rgba(26, 86, 50, 0.2)'
                      : '0 1px 6px rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: isRightNow && isActive ? 26 : 22,
                  zIndex: 10,
                  border: visited
                    ? '3px solid var(--green-rich)'
                    : `2px solid ${isActive ? 'var(--green-rich)' : 'var(--border)'}`,
                  transition: 'all 0.3s ease',
                }}
              >
                <span>{animal.emoji}</span>
                {/* Memory Pin: visited ring glow */}
                {visited && (
                  <span style={{
                    position: 'absolute',
                    inset: -5,
                    borderRadius: '50%',
                    border: '2px solid var(--green-sage)',
                    opacity: 0.5,
                  }} />
                )}
                {/* Memory Pin: dwell badge */}
                {visited && (
                  <span style={{
                    position: 'absolute',
                    top: -6,
                    right: -6,
                    background: 'var(--green-deep)',
                    color: 'white',
                    fontSize: 8,
                    fontWeight: 700,
                    padding: '1px 4px',
                    borderRadius: 6,
                    border: '1.5px solid white',
                  }}>
                    {visited.dwellMinutes}m
                  </span>
                )}
                {isActive && !visited && (
                  <span style={{
                    position: 'absolute',
                    top: -2,
                    right: -2,
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: animal.status === 'feeding' ? 'var(--coral)' : 'var(--green-active)',
                    border: '2px solid white',
                    animation: 'breathe 2s ease-in-out infinite',
                  }} />
                )}
                {isPlan && ['lion', 'giraffe', 'elephant', 'penguin', 'gorilla'].includes(animal.id) && (
                  <span style={{
                    position: 'absolute',
                    bottom: -4,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--green-deep)',
                    color: 'white',
                    fontSize: 9,
                    fontWeight: 700,
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {['lion', 'giraffe', 'elephant', 'penguin', 'gorilla'].indexOf(animal.id) + 1}
                  </span>
                )}

                {/* Noise indicator for sensory sensitivity */}
                {sensorySensitivity && noiseMap[animal.id] && (
                  <span className={`noise-indicator noise-${noiseMap[animal.id]}`} style={{
                    position: 'absolute',
                    top: -4,
                    right: -4,
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    border: '2px solid white',
                    fontSize: 7,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {noiseMap[animal.id] === 'quiet' ? '🤫' : noiseMap[animal.id] === 'loud' ? '🔊' : ''}
                  </span>
                )}
              </motion.button>
            )
          })}

          {/* Wander Mode: single glowing pin */}
          {wanderMode && (() => {
            const positions = [
              { x: 22, y: 25 }, { x: 60, y: 28 }, { x: 75, y: 38 },
              { x: 35, y: 40 }, { x: 50, y: 55 }, { x: 25, y: 58 },
              { x: 68, y: 62 }, { x: 15, y: 72 }, { x: 45, y: 75 },
              { x: 78, y: 78 }, { x: 55, y: 42 }, { x: 38, y: 85 },
            ]
            const idx = animals.indexOf(wanderTarget)
            const pos = positions[idx % positions.length]
            return (
              <motion.div
                key={`wander-${wanderTarget.id}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                style={{
                  position: 'absolute',
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 15,
                }}
              >
                {/* Glow ring */}
                <div style={{
                  position: 'absolute',
                  inset: -12,
                  borderRadius: '50%',
                  border: '2px solid var(--gold)',
                  opacity: 0.4,
                  animation: 'pulse-ring 2s ease-out infinite',
                }} />
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: 'white',
                  border: '3px solid var(--gold)',
                  boxShadow: '0 4px 20px rgba(197, 214, 58, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 28,
                }}>
                  {wanderTarget.emoji}
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: -8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'var(--gold)',
                  color: 'white',
                  fontSize: 9,
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: 8,
                  whiteSpace: 'nowrap',
                }}>
                  {wanderTarget.walkTime} away
                </div>
              </motion.div>
            )
          })()}

          {/* Wander Mode: dashed path from user to target */}
          {wanderMode && (
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 12, pointerEvents: 'none' }}>
              <path
                d={`M 42% 52% Q 50% 45% ${(() => {
                  const positions = [
                    { x: 22, y: 25 }, { x: 60, y: 28 }, { x: 75, y: 38 },
                    { x: 35, y: 40 }, { x: 50, y: 55 }, { x: 25, y: 58 },
                    { x: 68, y: 62 }, { x: 15, y: 72 }, { x: 45, y: 75 },
                    { x: 78, y: 78 }, { x: 55, y: 42 }, { x: 38, y: 85 },
                  ]
                  const idx = animals.indexOf(wanderTarget)
                  const p = positions[idx % positions.length]
                  return `${p.x}% ${p.y}%`
                })()}`}
                stroke="var(--gold)"
                strokeWidth="2.5"
                fill="none"
                strokeDasharray="8 6"
                opacity="0.6"
              />
            </svg>
          )}

          {/* Comfort layer: facilities */}
          {activeLayer === 'comfort' && facilities.map((fac, i) => {
            const positions = [
              { x: 30, y: 30 }, { x: 55, y: 35 }, { x: 20, y: 50 },
              { x: 65, y: 55 }, { x: 40, y: 65 }, { x: 75, y: 45 },
              { x: 25, y: 75 }, { x: 60, y: 80 },
            ]
            const pos = positions[i % positions.length]
            return (
              <motion.div
                key={fac.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.05 }}
                style={{
                  position: 'absolute',
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: 'translate(-50%, -50%)',
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: 'white',
                  boxShadow: 'var(--shadow-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  zIndex: 10,
                }}
              >
                {fac.icon}
              </motion.div>
            )
          })}

          {/* User location */}
          <div style={{
            position: 'absolute',
            left: '42%',
            top: '52%',
            transform: 'translate(-50%, -50%)',
            zIndex: 20,
          }}>
            <div style={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              background: 'var(--sky)',
              border: '3px solid white',
              boxShadow: '0 2px 8px rgba(74, 144, 217, 0.4)',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                inset: -8,
                borderRadius: '50%',
                border: '2px solid var(--sky)',
                opacity: 0.3,
                animation: 'pulse-ring 2s ease-out infinite',
              }} />
            </div>
          </div>

          {/* Family layer: member avatars */}
          {activeLayer === 'family' && (
            <>
              {[
                { name: 'Jordan', emoji: '🧑', x: '60%', y: '40%' },
                { name: 'You + Kids', emoji: '👧', x: '42%', y: '52%' },
              ].map(member => (
                <motion.div
                  key={member.name}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{
                    position: 'absolute',
                    left: member.x,
                    top: member.y,
                    transform: 'translate(-50%, -100%)',
                    zIndex: 25,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'var(--sky)',
                    border: '3px solid white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                    boxShadow: 'var(--shadow-md)',
                  }}>{member.emoji}</div>
                  <span style={{
                    fontSize: 10,
                    fontWeight: 600,
                    background: 'white',
                    padding: '2px 6px',
                    borderRadius: 4,
                    marginTop: 2,
                    boxShadow: 'var(--shadow-sm)',
                  }}>{member.name}</span>
                </motion.div>
              ))}
            </>
          )}
        </div>

        {/* Sensory: Quiet Route Alert */}
        {sensorySensitivity && !wanderMode && activeLayer === 'default' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              position: 'absolute',
              bottom: 160,
              left: 16,
              right: 16,
              background: 'linear-gradient(135deg, #E8F5E9, #FFF8E1)',
              borderRadius: 'var(--radius-lg)',
              padding: 14,
              boxShadow: 'var(--shadow-md)',
              zIndex: 30,
              border: '1px solid var(--green-light)',
              display: 'flex',
              gap: 12,
              alignItems: 'center',
            }}
          >
            <div style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'var(--green-rich)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              flexShrink: 0,
            }}>🤫</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--green-deep)', marginBottom: 2 }}>
                Quiet Route Available
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Avoid Penguin Beach & Flamingo Cove for a calmer path through Elephant Odyssey
              </div>
            </div>
          </motion.div>
        )}

        {/* AI Spotlight */}
        {spotlightVisible && activeLayer === 'default' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              position: 'absolute',
              top: 130,
              right: 16,
              width: 220,
              background: 'white',
              borderRadius: 'var(--radius-lg)',
              padding: 14,
              boxShadow: 'var(--shadow-lg)',
              zIndex: 30,
              border: '2px solid var(--green-light)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 6 }}>
              <span className="badge badge-live" style={{ fontSize: 10 }}>
                <Zap size={10} /> AI SPOTLIGHT
              </span>
              <button onClick={() => setSpotlightVisible(false)} style={{ color: 'var(--text-tertiary)' }}>
                <X size={14} />
              </button>
            </div>
            <p style={{ fontSize: 12, lineHeight: 1.4, marginBottom: 10, fontWeight: 500 }}>
              Baby elephant is playing in the water — first time this month!
            </p>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => setSpotlightVisible(false)} className="btn btn-sm btn-ghost" style={{ fontSize: 11 }}>Dismiss</button>
              <button onClick={() => { setSpotlightVisible(false); setSelectedAnimal(animals[1]) }} className="btn btn-sm btn-primary" style={{ fontSize: 11 }}>
                <Navigation size={12} /> Go
              </button>
            </div>
          </motion.div>
        )}

        {/* Top Bar */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: '48px 16px 8px',
          zIndex: 35,
        }}>
          <div
            onClick={() => setShowSearch(true)}
            className="search-bar"
            style={{ boxShadow: 'var(--shadow-md)', cursor: 'pointer' }}
          >
            <Search size={18} color="var(--text-tertiary)" />
            <span style={{ color: 'var(--text-tertiary)', fontSize: 15, flex: 1 }}>Search animals, places...</span>
            <Mic size={18} color="var(--text-tertiary)" />
          </div>

          {/* Layer switcher */}
          <div style={{
            display: 'flex',
            gap: 6,
            marginTop: 10,
            overflowX: 'auto',
            scrollbarWidth: 'none',
            paddingBottom: 4,
          }}>
            {layers.map(layer => (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                className={`chip ${activeLayer === layer.id ? 'chip-active' : ''}`}
                style={{
                  fontSize: 12,
                  padding: '7px 14px',
                  boxShadow: 'var(--shadow-sm)',
                  backdropFilter: activeLayer !== layer.id ? 'blur(8px)' : undefined,
                  background: activeLayer === layer.id ? 'var(--green-deep)' : 'rgba(255,255,255,0.9)',
                }}
              >
                {layer.icon} {layer.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right controls */}
        <div style={{
          position: 'absolute',
          right: 16,
          bottom: wanderMode ? 260 : 200,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          zIndex: 30,
        }}>
          <button
            onClick={() => setShowCrowdForecast(true)}
            className="btn-icon"
            style={{
              background: 'white',
              boxShadow: 'var(--shadow-md)',
              width: 40,
              height: 40,
            }}
          >
            <BarChart3 size={18} color="var(--amber)" />
          </button>
          <button className="btn-icon" style={{
            background: 'white',
            boxShadow: 'var(--shadow-md)',
            width: 40,
            height: 40,
          }}>
            <Layers size={18} color="var(--text-secondary)" />
          </button>
          <button className="btn-icon" style={{
            background: 'white',
            boxShadow: 'var(--shadow-md)',
            width: 40,
            height: 40,
          }}>
            <Locate size={18} color="var(--sky)" />
          </button>
        </div>

        {/* Wander Mode Stats Bar */}
        {wanderMode && (
          <div style={{
            position: 'absolute',
            top: 130,
            left: 16,
            right: 16,
            zIndex: 30,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <div style={{
              flex: 1,
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: 'var(--radius-full)',
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              boxShadow: 'var(--shadow-md)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Compass size={14} color="var(--gold)" />
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--gold)' }}>WANDER</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                <Eye size={12} style={{ display: 'inline', verticalAlign: -2, marginRight: 4 }} />
                {wanderDiscoveries} found
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                <Clock size={12} style={{ display: 'inline', verticalAlign: -2, marginRight: 4 }} />
                {visitedExhibits.length} visited
              </div>
            </div>
            <button
              onClick={() => setWanderMode(false)}
              style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(255,255,255,0.95)', boxShadow: 'var(--shadow-md)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <X size={16} color="var(--text-secondary)" />
            </button>
          </div>
        )}

        {/* Wander Mode: Discovery Card */}
        <AnimatePresence>
          {wanderMode && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              style={{
                position: 'absolute',
                bottom: 88,
                left: 16,
                right: 16,
                zIndex: 36,
              }}
            >
              {/* Celebration overlay */}
              <AnimatePresence>
                {wanderCelebrate && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    style={{
                      position: 'absolute',
                      top: -60,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'var(--green-deep)',
                      color: 'white',
                      padding: '8px 20px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: 14,
                      fontWeight: 700,
                      boxShadow: 'var(--shadow-lg)',
                      whiteSpace: 'nowrap',
                      zIndex: 40,
                    }}
                  >
                    Discovery #{wanderDiscoveries}!
                  </motion.div>
                )}
              </AnimatePresence>

              <div style={{
                background: 'white',
                borderRadius: 'var(--radius-xl)',
                padding: 18,
                boxShadow: 'var(--shadow-lg)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 10 }}>
                  <Sparkles size={14} color="var(--gold)" />
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.05em' }}>NEXT DISCOVERY</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 14,
                    background: 'var(--gold-pale)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 30, flexShrink: 0,
                  }}>
                    {wanderTarget.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{wanderTarget.individual || wanderTarget.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{wanderTarget.zone} · {wanderTarget.walkTime} walk</div>
                    <div style={{ fontSize: 12, color: 'var(--green-rich)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Sparkles size={11} /> {wanderTarget.fact}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                  <button
                    onClick={() => {
                      setWanderCelebrate(true)
                      setWanderDiscoveries(d => d + 1)
                      markExhibitVisited(wanderTarget.id, Math.floor(Math.random() * 15) + 3)
                      setTimeout(() => {
                        setWanderCelebrate(false)
                        setWanderIndex(i => i + 1)
                      }, 1500)
                    }}
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1, fontSize: 13 }}
                  >
                    <Navigation size={14} /> I'm Here!
                  </button>
                  <button
                    onClick={() => setWanderIndex(i => i + 1)}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: 13 }}
                  >
                    Skip
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Sheet — Peek */}
        {!wanderMode && <motion.div
          style={{
            position: 'absolute',
            bottom: 72,
            left: 0,
            right: 0,
            background: 'white',
            borderRadius: '20px 20px 0 0',
            boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
            zIndex: 35,
            maxHeight: sheetExpanded ? '50vh' : 'auto',
            overflow: sheetExpanded ? 'auto' : 'hidden',
          }}
        >
          <div
            onClick={() => setSheetExpanded(!sheetExpanded)}
            style={{ padding: '12px 20px', cursor: 'pointer' }}
          >
            <div style={{ width: 36, height: 4, background: 'var(--border)', borderRadius: 2, margin: '0 auto 8px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>
                {activeLayer === 'comfort'
                  ? `${facilities.length} facilities nearby`
                  : activeLayer === 'family'
                  ? 'Family Members'
                  : `${animals.length} exhibits · ${events.length} shows today`
                }
              </span>
              <ChevronDown
                size={18}
                color="var(--text-tertiary)"
                style={{
                  transform: sheetExpanded ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s ease',
                }}
              />
            </div>
          </div>

          {sheetExpanded && (
            <div style={{ padding: '0 20px 20px', maxHeight: 300, overflow: 'auto' }}>
              {activeLayer === 'comfort' ? (
                facilities.map(fac => (
                  <div key={fac.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '10px 0',
                    borderBottom: '1px solid var(--border-light)',
                  }}>
                    <span style={{ fontSize: 22 }}>{fac.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{fac.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{fac.zone}</div>
                    </div>
                    <span style={{ fontSize: 12, color: 'var(--green-rich)', fontWeight: 600 }}>{fac.distance}</span>
                  </div>
                ))
              ) : activeLayer === 'family' ? (
                <div>
                  {[
                    { name: 'Jordan', loc: 'Lost Forest', dist: '200ft', emoji: '🧑' },
                    { name: 'You + Ella + Kai', loc: 'Elephant Odyssey', dist: '—', emoji: '👧' },
                  ].map(m => (
                    <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border-light)' }}>
                      <span style={{ fontSize: 22, width: 32, textAlign: 'center' }}>{m.emoji}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{m.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{m.loc}</div>
                      </div>
                      <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{m.dist}</span>
                    </div>
                  ))}
                  <div style={{
                    marginTop: 12,
                    padding: 12,
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--green-pale)',
                  }}>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>AI Meetup Point</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>
                      Treehouse Cafe is between all of you — 4 min for everyone
                    </div>
                    <button className="btn btn-sm btn-primary" style={{ fontSize: 12 }}>
                      <Navigation size={12} /> Navigate to Meetup
                    </button>
                  </div>
                </div>
              ) : (
                animals.map(animal => (
                  <button
                    key={animal.id}
                    onClick={() => { setSelectedAnimal(animal); setSheetExpanded(false) }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '10px 0',
                      borderBottom: '1px solid var(--border-light)',
                      width: '100%',
                      textAlign: 'left',
                    }}
                  >
                    <span style={{ fontSize: 22 }}>{animal.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{animal.individual || animal.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{animal.zone}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <StatusDot status={animal.status} />
                      <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{animal.walkTime}</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          )}
        </motion.div>}

        {/* Crowd Forecast Bottom Sheet */}
        <AnimatePresence>
          {showCrowdForecast && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bottom-sheet-overlay"
                onClick={() => setShowCrowdForecast(false)}
              />
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="bottom-sheet"
              >
                <div className="bottom-sheet-handle" />
                <div className="bottom-sheet-content">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <div>
                      <h3 className="t-display-sm">Crowd Forecast</h3>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>Today's predicted traffic</div>
                    </div>
                    <button onClick={() => setShowCrowdForecast(false)}>
                      <X size={22} color="var(--text-tertiary)" />
                    </button>
                  </div>

                  {/* Overall Status */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: 14, borderRadius: 'var(--radius-md)',
                    background: 'var(--amber-light)', marginBottom: 20,
                  }}>
                    <TrendingUp size={20} color="var(--amber)" />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--amber)' }}>Moderate — Building</div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Peak expected around 12pm. Consider going to quieter zones now.</div>
                    </div>
                  </div>

                  {/* Time Chart */}
                  <div style={{ marginBottom: 20 }}>
                    <div className="t-heading" style={{ marginBottom: 12 }}>Today's Traffic</div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 100 }}>
                      {crowdHours.map((h, i) => {
                        const now = new Date().getHours()
                        const hourNum = parseInt(h.hour)
                        const isPast = hourNum < now
                        const isCurrent = hourNum === now || (hourNum === now - 12)
                        return (
                          <div key={h.hour} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                            <div style={{
                              width: '100%',
                              height: h.level,
                              borderRadius: '4px 4px 0 0',
                              background: isCurrent
                                ? 'var(--green-rich)'
                                : h.level > 75
                                  ? 'var(--coral-light)'
                                  : h.level > 45
                                    ? 'var(--amber-light)'
                                    : 'var(--green-light)',
                              opacity: isPast ? 0.4 : 1,
                              transition: 'height 0.5s ease',
                              position: 'relative',
                            }}>
                              {h.level > 75 && (
                                <div style={{
                                  position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                                  fontSize: 9, fontWeight: 700, color: 'var(--coral)', whiteSpace: 'nowrap',
                                }}>
                                  Peak
                                </div>
                              )}
                            </div>
                            <span style={{ fontSize: 8, color: 'var(--text-tertiary)', transform: 'rotate(-45deg)', whiteSpace: 'nowrap' }}>
                              {h.hour}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Zone Breakdown */}
                  <div>
                    <div className="t-heading" style={{ marginBottom: 10 }}>By Zone</div>
                    {zoneTraffic.map(zone => (
                      <div key={zone.name} style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '10px 0',
                        borderBottom: '1px solid var(--border-light)',
                      }}>
                        <div style={{
                          width: 10, height: 10, borderRadius: '50%',
                          background: trafficColor[zone.level],
                        }} />
                        <div style={{ flex: 1, fontWeight: 500, fontSize: 14 }}>{zone.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{zone.wait}</div>
                        <span className="badge" style={{
                          background: zone.level === 'high' ? 'var(--coral-pale)' : zone.level === 'medium' ? 'var(--gold-pale)' : 'var(--green-pale)',
                          color: trafficColor[zone.level],
                          fontSize: 10,
                          textTransform: 'capitalize',
                        }}>
                          {zone.level}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* AI Recommendation */}
                  <div style={{
                    background: 'var(--green-pale)',
                    borderRadius: 'var(--radius-md)',
                    padding: 14,
                    marginTop: 16,
                    display: 'flex',
                    gap: 10,
                  }}>
                    <Sparkles size={18} color="var(--green-rich)" style={{ flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>AI Suggestion</div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        Lost Forest and Urban Jungle are quiet right now. Head there before 11am for the best experience, then visit Africa Rocks after 2pm when crowds thin out.
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Exhibit Detail Sheet */}
        <AnimatePresence>
          {selectedAnimal && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bottom-sheet-overlay"
                onClick={() => setSelectedAnimal(null)}
              />
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="bottom-sheet"
              >
                <div className="bottom-sheet-handle" />
                <div className="bottom-sheet-content">
                  {/* Hero */}
                  <div style={{
                    height: 180,
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    marginBottom: 16,
                    background: 'var(--bg-placeholder)',
                  }}>
                    <img src={selectedAnimal.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                      <h3 className="t-display-sm">{selectedAnimal.name}</h3>
                      {selectedAnimal.individual && (
                        <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 2 }}>{selectedAnimal.individual}</div>
                      )}
                    </div>
                    <button onClick={() => setSelectedAnimal(null)}>
                      <X size={22} color="var(--text-tertiary)" />
                    </button>
                  </div>

                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
                    {selectedAnimal.zone} · Open Now
                  </div>

                  {/* Status chips */}
                  <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
                    <span className="badge badge-active">{selectedAnimal.status === 'active' ? 'Active' : selectedAnimal.status === 'feeding' ? 'Feeding' : selectedAnimal.status === 'sleeping' ? 'Sleeping' : 'Quiet'}</span>
                    <span className="badge" style={{ background: 'var(--green-pale)', color: 'var(--green-rich)' }}>{selectedAnimal.crowd} crowds</span>
                    <span className="badge" style={{ background: 'var(--sky-pale)', color: 'var(--sky)' }}>Avg {selectedAnimal.dwell}</span>
                    <span className="badge" style={{ background: 'var(--gold-pale)', color: 'var(--gold)' }}>{selectedAnimal.walkTime} walk</span>
                  </div>

                  {/* Memory Pin: Your Visit Data */}
                  {(() => {
                    const visit = visitedExhibits.find(v => v.id === selectedAnimal.id)
                    if (!visit) return null
                    return (
                      <div style={{
                        background: 'var(--gold-pale)',
                        borderRadius: 'var(--radius-md)',
                        padding: 12,
                        marginTop: 12,
                        border: '1px solid var(--gold-light)',
                      }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.05em', marginBottom: 6 }}>YOUR VISIT</div>
                        <div style={{ display: 'flex', gap: 16 }}>
                          <div>
                            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Visited at</div>
                            <div style={{ fontSize: 14, fontWeight: 600 }}>{visit.visitedAt}</div>
                          </div>
                          <div>
                            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Time spent</div>
                            <div style={{ fontSize: 14, fontWeight: 600 }}>{visit.dwellMinutes} min</div>
                          </div>
                        </div>
                      </div>
                    )
                  })()}

                  {/* AI Insight */}
                  <div style={{
                    background: 'var(--green-pale)',
                    borderRadius: 'var(--radius-md)',
                    padding: 12,
                    marginTop: 16,
                    fontSize: 13,
                    lineHeight: 1.5,
                    display: 'flex',
                    gap: 8,
                  }}>
                    <Zap size={16} color="var(--green-rich)" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span>
                      {selectedAnimal.id === 'lion'
                        ? "Izu is in his prime morning activity window. Best viewing from the left platform."
                        : `${selectedAnimal.individual || 'This animal'} is ${selectedAnimal.status} right now. ${selectedAnimal.fact}`
                      }
                    </span>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 16 }}>
                    <button
                      onClick={() => { setAudioPlaying(true, `${selectedAnimal.name} — ${selectedAnimal.individual}`); setSelectedAnimal(null) }}
                      className="btn btn-secondary btn-sm"
                    >
                      <Headphones size={14} /> Audio Guide
                    </button>
                    <button className="btn btn-primary btn-sm">
                      <Navigation size={14} /> Navigate
                    </button>
                    <button className="btn btn-secondary btn-sm">
                      <Plus size={14} /> Add to Plan
                    </button>
                    <button
                      onClick={() => toggleSavedAnimal(selectedAnimal.id)}
                      className="btn btn-secondary btn-sm"
                      style={{
                        color: savedAnimals.includes(selectedAnimal.id) ? 'var(--coral)' : undefined,
                        borderColor: savedAnimals.includes(selectedAnimal.id) ? 'var(--coral-light)' : undefined,
                      }}
                    >
                      <Bookmark size={14} fill={savedAnimals.includes(selectedAnimal.id) ? 'currentColor' : 'none'} /> {savedAnimals.includes(selectedAnimal.id) ? 'Saved' : 'Save'}
                    </button>
                  </div>

                  {/* Conservation */}
                  <div style={{ marginTop: 20, padding: '16px 0', borderTop: '1px solid var(--border-light)' }}>
                    <div className="t-heading" style={{ marginBottom: 6 }}>Conservation</div>
                    <p style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--text-secondary)' }}>
                      {selectedAnimal.conservation}
                    </p>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Search Overlay */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'var(--bg-primary)',
                zIndex: 45,
                padding: '48px 20px',
              }}
            >
              <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                <div className="search-bar" style={{ flex: 1 }}>
                  <Search size={18} color="var(--text-tertiary)" />
                  <input autoFocus placeholder="Try: 'quiet shaded spots'" style={{ border: 'none', outline: 'none', flex: 1, fontSize: 15, background: 'transparent' }} />
                </div>
                <button onClick={() => setShowSearch(false)} style={{ fontSize: 14, fontWeight: 600, color: 'var(--green-rich)' }}>Cancel</button>
              </div>

              <div className="t-label text-secondary" style={{ marginBottom: 12 }}>SUGGESTED</div>
              {[
                "Where can I sit in the shade near animals?",
                "What's good for a 3-year-old near me?",
                "Show me animals I haven't seen yet",
                "Nearest bathroom",
                "Quiet spots",
              ].map(q => (
                <button
                  key={q}
                  onClick={() => setShowSearch(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '14px 0',
                    borderBottom: '1px solid var(--border-light)',
                    width: '100%',
                    textAlign: 'left',
                    fontSize: 14,
                    color: 'var(--text-primary)',
                  }}
                >
                  <Search size={16} color="var(--text-tertiary)" />
                  {q}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}

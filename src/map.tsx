import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Mic, Locate, Layers, Navigation, Bookmark, Headphones, Plus, X, ChevronDown, Users, Thermometer, Route, Zap } from 'lucide-react'
import { useApp } from './context'
import { animals, facilities, events } from './data'
import { PageTransition, StatusDot } from './components'

type MapLayer = 'default' | 'right-now' | 'my-plan' | 'comfort' | 'family'

/* ============================================
   Map Tab
   ============================================ */

export function MapTab() {
  const navigate = useNavigate()
  const { setAudioPlaying, setSelectedExhibit, savedAnimals, toggleSavedAnimal } = useApp()
  const [activeLayer, setActiveLayer] = useState<MapLayer>('default')
  const [selectedAnimal, setSelectedAnimal] = useState<typeof animals[0] | null>(null)
  const [showSearch, setShowSearch] = useState(false)
  const [sheetExpanded, setSheetExpanded] = useState(false)
  const [spotlightVisible, setSpotlightVisible] = useState(true)

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

          {/* Animal pins */}
          {activeLayer !== 'comfort' && animals.map((animal, i) => {
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
                  boxShadow: isActive
                    ? '0 2px 12px rgba(26, 86, 50, 0.2)'
                    : '0 1px 6px rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: isRightNow && isActive ? 26 : 22,
                  zIndex: 10,
                  border: `2px solid ${isActive ? 'var(--green-rich)' : 'var(--border)'}`,
                  transition: 'all 0.3s ease',
                }}
              >
                <span>{animal.emoji}</span>
                {isActive && (
                  <span style={{
                    position: 'absolute',
                    top: -2,
                    right: -2,
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: animal.status === 'feeding' ? 'var(--coral)' : '#22C55E',
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
              </motion.button>
            )
          })}

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
          bottom: 200,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          zIndex: 30,
        }}>
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

        {/* Bottom Sheet — Peek */}
        <motion.div
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
        </motion.div>

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
                    background: '#e8e2da',
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

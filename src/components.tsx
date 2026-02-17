import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, MapPin, Camera, CalendarDays, User, MessageCircle, X, Send, ChevronLeft, Pause, Play, SkipForward, SkipBack, Volume2, ChevronDown, Settings, Radio, BookOpen, Sparkles } from 'lucide-react'
import { useApp } from './context'

/* ============================================
   Bottom Navigation
   ============================================ */

const tabs = [
  { path: '/home', icon: Home, label: 'Home' },
  { path: '/map', icon: MapPin, label: 'Map' },
  { path: '/scan', icon: Camera, label: 'Scan' },
  { path: '/plan', icon: CalendarDays, label: 'Plan' },
  { path: '/profile', icon: User, label: 'Profile' },
]

function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path: string) => {
    if (path === '/home') return location.pathname === '/' || location.pathname.startsWith('/home')
    return location.pathname.startsWith(path)
  }

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: 430,
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderTop: '1px solid var(--border-light)',
      zIndex: 100,
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '6px 0 8px' }}>
        {tabs.map(tab => {
          const active = isActive(tab.path)
          const isScan = tab.path === '/scan'
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                padding: '4px 12px',
                position: 'relative',
              }}
            >
              {isScan ? (
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: active ? 'var(--green-deep)' : 'var(--green-rich)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: -16,
                  boxShadow: '0 4px 12px rgba(26, 86, 50, 0.3)',
                  transition: 'all 0.2s ease',
                }}>
                  <tab.icon size={22} color="white" strokeWidth={2} />
                </div>
              ) : (
                <tab.icon
                  size={22}
                  strokeWidth={active ? 2.5 : 1.8}
                  color={active ? 'var(--green-deep)' : 'var(--text-tertiary)'}
                  style={{ transition: 'all 0.2s ease' }}
                />
              )}
              <span style={{
                fontSize: 10,
                fontWeight: active ? 700 : 500,
                color: active ? 'var(--green-deep)' : 'var(--text-tertiary)',
                transition: 'all 0.2s ease',
                marginTop: isScan ? -2 : 0,
              }}>
                {tab.label}
              </span>
              {active && !isScan && (
                <motion.div
                  layoutId="nav-indicator"
                  style={{
                    position: 'absolute',
                    top: -1,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 20,
                    height: 2,
                    borderRadius: 1,
                    background: 'var(--green-deep)',
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

/* ============================================
   Floating AI Assistant
   ============================================ */

const suggestionsByContext: Record<string, string[]> = {
  home: [
    "What should we see today?",
    "What's happening right now?",
    "Best time to arrive?",
    "Plan my visit",
  ],
  map: [
    "What's near me?",
    "Find a quiet spot",
    "How do I get to the penguins?",
    "Where are the crowds?",
  ],
  scan: [
    "What animal is this?",
    "Tell me more about this exhibit",
    "Is there a feeding time?",
    "Play audio guide",
  ],
  plan: [
    "Suggest a plan for my family",
    "Add a lunch break",
    "What should we skip?",
    "Change my itinerary",
  ],
  profile: [
    "Show my visit stats",
    "What badges can I earn?",
    "Update my preferences",
    "Share my visit card",
  ],
  default: [
    "What should we see next?",
    "Where's somewhere quiet?",
    "Best restaurant for kids?",
    "How do I get to the penguins?",
  ],
}

function getContextKey(pathname: string): string {
  if (pathname === '/' || pathname.startsWith('/home')) return 'home'
  if (pathname.startsWith('/map')) return 'map'
  if (pathname.startsWith('/scan')) return 'scan'
  if (pathname.startsWith('/plan') || pathname.startsWith('/itinerary')) return 'plan'
  if (pathname.startsWith('/profile')) return 'profile'
  return 'default'
}

function FloatingAssistant() {
  const { assistantOpen, setAssistantOpen } = useApp()
  const location = useLocation()
  const contextKey = getContextKey(location.pathname)
  const suggestions = suggestionsByContext[contextKey] || suggestionsByContext.default
  const [messages, setMessages] = useState<Array<{role: string, text: string}>>([
    { role: 'ai', text: "Hi! I'm your zoo companion. Ask me anything about the zoo, animals, or what to do next." }
  ])
  const [input, setInput] = useState('')

  const handleSend = (text: string) => {
    if (!text.trim()) return
    setMessages(prev => [...prev, { role: 'user', text }])
    setInput('')
    setTimeout(() => {
      const responses = [
        "The penguins are right around the corner from you — about a 3 minute walk. They just got fed so they're being extra playful right now!",
        "Based on your pace, I'd suggest heading to the Gorilla Forest next. Koga has been really social this morning.",
        "Albert's Restaurant has a great kids menu and outdoor seating. It's about a 5 minute walk and there's no wait right now.",
        "The Discovery Playground is a perfect quiet spot — it's shaded and there are benches nearby. About 2 minutes from you.",
      ]
      setMessages(prev => [...prev, { role: 'ai', text: responses[Math.floor(Math.random() * responses.length)] }])
    }, 800)
  }

  return (
    <>
      <AnimatePresence>
        {assistantOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              position: 'fixed',
              bottom: 90,
              right: 'calc(50% - 199px)',
              width: 340,
              maxHeight: 440,
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-xl)',
              zIndex: 90,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              border: '1px solid var(--border-light)',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '14px 16px',
              background: 'var(--green-deep)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 20 }}>🌿</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>Zoo AI</div>
                  <div style={{ fontSize: 11, opacity: 0.7 }}>Your zoo companion</div>
                </div>
              </div>
              <button onClick={() => setAssistantOpen(false)} style={{ color: 'white', opacity: 0.7 }}>
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1,
              overflow: 'auto',
              padding: 12,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              minHeight: 200,
              maxHeight: 280,
            }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    background: msg.role === 'user' ? 'var(--green-deep)' : 'var(--green-pale)',
                    color: msg.role === 'user' ? 'white' : 'var(--text-primary)',
                    padding: '10px 14px',
                    borderRadius: 16,
                    borderBottomRightRadius: msg.role === 'user' ? 4 : 16,
                    borderBottomLeftRadius: msg.role === 'ai' ? 4 : 16,
                    maxWidth: '85%',
                    fontSize: 13,
                    lineHeight: 1.45,
                  }}
                >
                  {msg.text}
                </motion.div>
              ))}
            </div>

            {/* Suggestions */}
            <div style={{
              padding: '4px 12px 8px',
              display: 'flex',
              gap: 6,
              overflowX: 'auto',
              scrollbarWidth: 'none',
            }}>
              {suggestions.map(s => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 20,
                    border: '1px solid var(--border)',
                    fontSize: 11,
                    whiteSpace: 'nowrap',
                    color: 'var(--green-rich)',
                    background: 'white',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Input */}
            <div style={{
              padding: '8px 12px 12px',
              borderTop: '1px solid var(--border-light)',
              display: 'flex',
              gap: 8,
              alignItems: 'center',
            }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend(input)}
                placeholder="Ask me anything..."
                style={{
                  flex: 1,
                  border: '1.5px solid var(--border)',
                  borderRadius: 24,
                  padding: '10px 16px',
                  fontSize: 14,
                  outline: 'none',
                  background: 'var(--bg-primary)',
                }}
              />
              <button
                onClick={() => handleSend(input)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'var(--green-deep)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Send size={16} color="white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setAssistantOpen(!assistantOpen)}
        style={{
          position: 'fixed',
          bottom: 88,
          right: 'calc(50% - 199px)',
          width: 52,
          height: 52,
          borderRadius: '50%',
          background: assistantOpen ? 'var(--text-secondary)' : 'var(--green-deep)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 89,
          transition: 'background 0.2s ease',
        }}
      >
        {assistantOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </motion.button>
    </>
  )
}

/* ============================================
   Audio Mini Player
   ============================================ */

function AudioMiniPlayer() {
  const { audioPlaying, audioPaused, audioTitle, setAudioPlaying, setAudioPaused, setAudioExpanded } = useApp()

  if (!audioPlaying) return null

  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 60, opacity: 0 }}
      style={{
        position: 'fixed',
        bottom: 74,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 32px)',
        maxWidth: 398,
        background: 'var(--green-deep)',
        borderRadius: 'var(--radius-md)',
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        zIndex: 95,
        color: 'white',
        boxShadow: 'var(--shadow-lg)',
        cursor: 'pointer',
      }}
      onClick={() => setAudioExpanded(true)}
    >
      <Volume2 size={18} style={{ opacity: 0.7, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {audioTitle}
        </div>
        <div style={{ height: 3, background: 'rgba(255,255,255,0.2)', borderRadius: 2, marginTop: 4 }}>
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: audioPaused ? '45%' : '45%' }}
            transition={{ duration: audioPaused ? 0 : 30, ease: 'linear' }}
            style={{ height: '100%', background: 'var(--gold)', borderRadius: 2 }}
          />
        </div>
      </div>
      <button onClick={e => { e.stopPropagation(); setAudioPaused(!audioPaused) }} style={{ color: 'white', opacity: 0.8 }}>
        {audioPaused ? <Play size={18} /> : <Pause size={18} />}
      </button>
      <button onClick={e => e.stopPropagation()} style={{ color: 'white', opacity: 0.8 }}>
        <SkipForward size={18} />
      </button>
      <button onClick={e => { e.stopPropagation(); setAudioPlaying(false) }} style={{ color: 'white', opacity: 0.5 }}>
        <X size={16} />
      </button>
    </motion.div>
  )
}

/* ============================================
   Expanded Audio Player
   ============================================ */

const audioQueue = [
  { title: 'African Elephant — Tembo', emoji: '🐘', duration: '3:45', zone: 'Elephant Odyssey' },
  { title: 'Polar Bear — Chinook', emoji: '🐻‍❄️', duration: '2:30', zone: 'Polar Rim' },
  { title: 'Gorilla — Koga', emoji: '🦍', duration: '4:10', zone: 'Lost Forest' },
]

const sampleTranscript = [
  { time: '0:00', text: 'Welcome to one of the most remarkable exhibits at the San Diego Zoo.' },
  { time: '0:12', text: 'This species has been part of our conservation program since 1982.' },
  { time: '0:28', text: 'Notice the distinctive markings — each individual has a unique pattern, much like human fingerprints.' },
  { time: '0:45', text: 'Our keepers have built strong bonds with these animals through positive reinforcement training.' },
  { time: '1:02', text: 'The habitat you see was designed to mimic their natural environment, with temperature and humidity carefully controlled.' },
  { time: '1:20', text: 'Conservation efforts have helped increase wild populations by 30% over the past decade.' },
]

function ExpandedAudioPlayer() {
  const {
    audioPlaying, audioPaused, audioTitle, audioExpanded, audioDepth, audioAutoPlay,
    setAudioPlaying, setAudioPaused, setAudioExpanded, setAudioDepth, setAudioAutoPlay,
  } = useApp()
  const [showSettings, setShowSettings] = useState(false)
  const [activeTranscriptIdx, setActiveTranscriptIdx] = useState(2)

  if (!audioPlaying || !audioExpanded) return null

  const titleParts = audioTitle.split(' — ')
  const animalName = titleParts[0] || 'Audio Guide'
  const individual = titleParts[1] || ''

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--bg-primary)',
        zIndex: 110,
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 430,
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <div style={{
        padding: 'calc(env(safe-area-inset-top, 12px) + 12px) 20px 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <button onClick={() => setAudioExpanded(false)}>
          <ChevronDown size={24} />
        </button>
        <span className="t-heading">Now Playing</span>
        <button onClick={() => setShowSettings(!showSettings)}>
          <Settings size={20} color={showSettings ? 'var(--green-rich)' : 'var(--text-tertiary)'} />
        </button>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 20px 16px' }}>
              <div className="card" style={{ padding: 16 }}>
                {/* Auto-play toggle */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Radio size={16} color="var(--text-secondary)" />
                    <span style={{ fontSize: 14, fontWeight: 500 }}>Auto-play nearby</span>
                  </div>
                  <button
                    onClick={() => setAudioAutoPlay(!audioAutoPlay)}
                    style={{
                      width: 44, height: 24, borderRadius: 12,
                      background: audioAutoPlay ? 'var(--green-rich)' : 'var(--border)',
                      position: 'relative', transition: 'background 0.2s ease',
                    }}
                  >
                    <motion.div
                      animate={{ x: audioAutoPlay ? 22 : 2 }}
                      style={{
                        width: 20, height: 20, borderRadius: '50%',
                        background: 'white', position: 'absolute', top: 2,
                        boxShadow: 'var(--shadow-sm)',
                      }}
                    />
                  </button>
                </div>

                {/* Content Depth */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <BookOpen size={16} color="var(--text-secondary)" />
                    <span style={{ fontSize: 14, fontWeight: 500 }}>Content Depth</span>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {(['quick', 'standard', 'deep'] as const).map(d => (
                      <button
                        key={d}
                        onClick={() => setAudioDepth(d)}
                        className={`chip ${audioDepth === d ? 'chip-active' : ''}`}
                        style={{ flex: 1, justifyContent: 'center', fontSize: 12 }}
                      >
                        {d === 'quick' ? '⚡ Quick' : d === 'standard' ? '📖 Standard' : '🔬 Deep'}
                      </button>
                    ))}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 6 }}>
                    {audioDepth === 'quick' ? '~1 min · Key facts only' : audioDepth === 'standard' ? '~3 min · Facts + stories' : '~5 min · Full deep dive with conservation details'}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Now Playing Card */}
      <div style={{ padding: '0 20px', marginBottom: 20 }}>
        <div style={{
          height: 200,
          borderRadius: 'var(--radius-xl)',
          background: 'linear-gradient(135deg, var(--green-deep), var(--green-rich))',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.05 }}>
            <div style={{ position: 'absolute', top: '20%', left: '10%', fontSize: 100 }}>🌿</div>
            <div style={{ position: 'absolute', bottom: '10%', right: '10%', fontSize: 80 }}>🍃</div>
          </div>
          <motion.div
            animate={!audioPaused ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ fontSize: 64, marginBottom: 8 }}
          >
            🎧
          </motion.div>
          <div style={{ color: 'white', fontWeight: 700, fontSize: 18, textAlign: 'center' }}>{animalName}</div>
          {individual && <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, marginTop: 2 }}>{individual}</div>}
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ padding: '0 20px', marginBottom: 8 }}>
        <div style={{ height: 6, background: 'var(--border-light)', borderRadius: 3, cursor: 'pointer', position: 'relative' }}>
          <div style={{ width: '45%', height: '100%', background: 'var(--green-rich)', borderRadius: 3 }} />
          <div style={{
            position: 'absolute', top: -5, left: '45%', transform: 'translateX(-50%)',
            width: 16, height: 16, borderRadius: '50%',
            background: 'var(--green-rich)', border: '3px solid white',
            boxShadow: 'var(--shadow-sm)',
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
          <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>1:20</span>
          <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>3:12</span>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28, padding: '8px 20px 16px' }}>
        <button style={{ color: 'var(--text-secondary)' }}>
          <SkipBack size={24} />
        </button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setAudioPaused(!audioPaused)}
          style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'var(--green-deep)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          {audioPaused ? <Play size={28} color="white" style={{ marginLeft: 3 }} /> : <Pause size={28} color="white" />}
        </motion.button>
        <button style={{ color: 'var(--text-secondary)' }}>
          <SkipForward size={24} />
        </button>
      </div>

      {/* Transcript + Queue (scrollable) */}
      <div style={{ flex: 1, overflow: 'auto', padding: '0 20px 100px' }}>
        {/* Transcript */}
        <div style={{ marginBottom: 24 }}>
          <div className="t-heading" style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
            <BookOpen size={16} /> Transcript
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {sampleTranscript.map((line, i) => (
              <button
                key={i}
                onClick={() => setActiveTranscriptIdx(i)}
                style={{
                  display: 'flex',
                  gap: 10,
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-sm)',
                  background: i === activeTranscriptIdx ? 'var(--green-pale)' : 'transparent',
                  textAlign: 'left',
                  transition: 'background 0.2s ease',
                }}
              >
                <span style={{
                  fontSize: 11,
                  color: i === activeTranscriptIdx ? 'var(--green-rich)' : 'var(--text-tertiary)',
                  fontWeight: 600,
                  flexShrink: 0,
                  width: 32,
                }}>
                  {line.time}
                </span>
                <span style={{
                  fontSize: 13,
                  lineHeight: 1.5,
                  color: i <= activeTranscriptIdx ? 'var(--text-primary)' : 'var(--text-tertiary)',
                  fontWeight: i === activeTranscriptIdx ? 500 : 400,
                }}>
                  {line.text}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Up Next Queue */}
        <div>
          <div className="t-heading" style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Sparkles size={16} /> Up Next
            {audioAutoPlay && <span className="badge badge-active" style={{ fontSize: 9, marginLeft: 4 }}>Auto</span>}
          </div>
          {audioQueue.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: 12,
                marginBottom: 8,
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: 'var(--green-pale)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, flexShrink: 0,
              }}>
                {item.emoji}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{item.zone} · {item.duration}</div>
              </div>
              <button style={{ color: 'var(--text-tertiary)' }}>
                <Play size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ============================================
   Layout (Shell)
   ============================================ */

export function Layout({ children }: { children: React.ReactNode }) {
  const { sensorySensitivity, simplifiedMode } = useApp()
  const classes = [
    sensorySensitivity && 'sensory-mode',
    simplifiedMode && 'simplified-mode',
  ].filter(Boolean).join(' ')

  return (
    <div className={classes || undefined} style={{ position: 'relative' }}>
      {children}
      <AudioMiniPlayer />
      <FloatingAssistant />
      <BottomNav />
      <AnimatePresence>
        <ExpandedAudioPlayer />
      </AnimatePresence>
    </div>
  )
}

/* ============================================
   Shared Sub-Components
   ============================================ */

export function BackHeader({ title, right }: { title: string, right?: React.ReactNode }) {
  const navigate = useNavigate()
  return (
    <div className="page-header" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <ChevronLeft size={22} />
      </button>
      <span className="t-heading" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>{title}</span>
      {right || <div style={{ width: 22 }} />}
    </div>
  )
}

export function SectionHeader({ title, action, onAction }: { title: string, action?: string, onAction?: () => void }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
      <h3 className="t-display-sm">{title}</h3>
      {action && (
        <button onClick={onAction} style={{ color: 'var(--green-rich)', fontSize: 13, fontWeight: 600 }}>
          {action}
        </button>
      )}
    </div>
  )
}

export function AnimalCard({ animal, onClick, small }: { animal: any, onClick?: () => void, small?: boolean }) {
  const statusColors: Record<string, string> = {
    active: 'var(--green-light)',
    feeding: 'var(--coral-pale)',
    sleeping: 'var(--sky-pale)',
    quiet: 'var(--gold-pale)',
  }
  const statusText: Record<string, string> = {
    active: 'Active',
    feeding: 'Feeding',
    sleeping: 'Sleeping',
    quiet: 'Quiet',
  }

  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      style={{
        width: small ? 140 : 170,
        flexShrink: 0,
        cursor: 'pointer',
      }}
    >
      <div style={{
        width: '100%',
        height: small ? 100 : 120,
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        position: 'relative',
        background: 'var(--bg-placeholder)',
      }}>
        <img
          src={animal.image}
          alt={animal.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />
        <div style={{
          position: 'absolute',
          top: 8,
          right: 8,
          ...( animal.status === 'feeding' ? { animation: 'breathe 2s ease-in-out infinite' } : {}),
        }}>
          <span className="badge" style={{
            background: statusColors[animal.status] || 'var(--green-light)',
            color: animal.status === 'feeding' ? 'var(--coral)' : 'var(--green-rich)',
            fontSize: 10,
          }}>
            {statusText[animal.status] || 'Active'}
          </span>
        </div>
      </div>
      <div style={{ marginTop: 8 }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{animal.emoji} {animal.individual || animal.name}</div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{animal.name}</div>
      </div>
    </motion.div>
  )
}

export function EventCard({ event }: { event: any }) {
  return (
    <div className="card" style={{ display: 'flex', gap: 14, alignItems: 'center', padding: 14, marginBottom: 8 }}>
      <div style={{
        width: 44,
        height: 44,
        borderRadius: 'var(--radius-md)',
        background: 'var(--green-pale)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 22,
        flexShrink: 0,
      }}>
        {event.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{event.name}</div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{event.time} · {event.location}</div>
      </div>
      <span className="badge badge-active" style={{ fontSize: 10 }}>{event.duration}</span>
    </div>
  )
}

export function StatusDot({ status }: { status: string }) {
  const colors: Record<string, string> = {
    active: 'var(--green-active)',
    feeding: '#EF4444',
    sleeping: '#60A5FA',
    quiet: '#D4A574',
    busy: '#EF4444',
    moderate: '#F59E0B',
  }
  return (
    <span style={{
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: colors[status] || '#9CA3AF',
      display: 'inline-block',
      ...(status === 'feeding' ? { animation: 'breathe 2s ease-in-out infinite' } : {}),
    }} />
  )
}

export function SkeletonCard({ height = 120, style }: { height?: number, style?: React.CSSProperties }) {
  return (
    <div className="skeleton skeleton-card" style={{ height, ...style }} />
  )
}

export function SkeletonList({ count = 3 }: { count?: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card" style={{ display: 'flex', gap: 12, padding: 14, alignItems: 'center' }}>
          <div className="skeleton skeleton-circle" style={{ width: 44, height: 44, flexShrink: 0 }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div className="skeleton skeleton-text" style={{ width: `${70 + Math.random() * 30}%` }} />
            <div className="skeleton skeleton-text-sm" style={{ width: `${40 + Math.random() * 30}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

export function EmptyState({ icon, title, message, action, onAction }: {
  icon: string
  title: string
  message: string
  action?: string
  onAction?: () => void
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <div className="empty-state-title">{title}</div>
      <div className="empty-state-text">{message}</div>
      {action && onAction && (
        <button onClick={onAction} className="btn btn-primary btn-sm">{action}</button>
      )}
    </div>
  )
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
    >
      {children}
    </motion.div>
  )
}
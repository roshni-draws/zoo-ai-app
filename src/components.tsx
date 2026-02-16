import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, MapPin, Camera, CalendarDays, User, MessageCircle, X, Send, ChevronLeft, Pause, Play, SkipForward, Volume2 } from 'lucide-react'
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

const assistantSuggestions = [
  "What should we see next?",
  "Where's somewhere quiet?",
  "Best restaurant for kids?",
  "How do I get to the penguins?",
]

function FloatingAssistant() {
  const { assistantOpen, setAssistantOpen } = useApp()
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
              {assistantSuggestions.map(s => (
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
  const { audioPlaying, audioTitle, setAudioPlaying } = useApp()

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
      }}
    >
      <Volume2 size={18} style={{ opacity: 0.7, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {audioTitle}
        </div>
        <div style={{ height: 3, background: 'rgba(255,255,255,0.2)', borderRadius: 2, marginTop: 4 }}>
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '45%' }}
            transition={{ duration: 30, ease: 'linear' }}
            style={{ height: '100%', background: 'var(--gold)', borderRadius: 2 }}
          />
        </div>
      </div>
      <button onClick={() => setAudioPlaying(true)} style={{ color: 'white', opacity: 0.8 }}>
        <Pause size={18} />
      </button>
      <button style={{ color: 'white', opacity: 0.8 }}>
        <SkipForward size={18} />
      </button>
      <button onClick={() => setAudioPlaying(false)} style={{ color: 'white', opacity: 0.5 }}>
        <X size={16} />
      </button>
    </motion.div>
  )
}

/* ============================================
   Layout (Shell)
   ============================================ */

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: 'relative' }}>
      {children}
      <AudioMiniPlayer />
      <FloatingAssistant />
      <BottomNav />
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
        background: '#e8e2da',
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
    active: '#22C55E',
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
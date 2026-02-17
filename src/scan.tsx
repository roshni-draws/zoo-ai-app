import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, QrCode, Sparkles, ImageIcon, Headphones, Navigation, Bookmark, Share2, X, Zap, MapPin, Clock, Bell, Star, Gift, Utensils, TreePine, GraduationCap, Play, AlertCircle } from 'lucide-react'
import { useApp } from './context'
import { animals } from './data'
import { PageTransition } from './components'

type ScanMode = 'qr' | 'ai-identify' | 'smart-photo'
type QRResultType = 'animal' | 'location' | 'experience'

interface ExperienceResult {
  type: 'show' | 'feeding' | 'educational' | 'playground' | 'gift-shop'
  title: string
  subtitle: string
  detail: string
  emoji: string
  actionLabel: string
  actionSecondary?: string
  time?: string
  badge?: string
}

const experienceResults: ExperienceResult[] = [
  {
    type: 'show',
    title: 'Elephant Care Talk',
    subtitle: 'Elephant Odyssey Amphitheater',
    detail: 'Learn how our keepers care for these gentle giants. Interactive Q&A after the talk.',
    emoji: '🎭',
    actionLabel: 'Set Reminder',
    actionSecondary: 'Add to Plan',
    time: 'Next show: 11:30 AM (25 min)',
    badge: 'Starting Soon',
  },
  {
    type: 'feeding',
    title: 'Giraffe Feeding Experience',
    subtitle: 'Africa Rocks · Platform 2',
    detail: 'Feed the giraffes from the elevated platform. Each session is 10 minutes.',
    emoji: '🦒',
    actionLabel: 'Join Queue',
    time: 'Current wait: ~8 min',
    badge: '3 spots left',
  },
  {
    type: 'educational',
    title: 'Coral Reef Ecosystem',
    subtitle: 'Marine Discovery Center',
    detail: 'Explore how coral reef ecosystems support thousands of species. Touch tanks available.',
    emoji: '🪸',
    actionLabel: 'AI Deep Dive',
    actionSecondary: 'Audio Guide',
  },
  {
    type: 'playground',
    title: 'Rainforest Climber',
    subtitle: "Kids' Adventure Zone",
    detail: 'Multi-level climbing structure with slides. Recommended ages 3-10. Shaded seating for parents nearby.',
    emoji: '🌴',
    actionLabel: 'Navigate Here',
    badge: 'Great for Ella & Kai',
  },
  {
    type: 'gift-shop',
    title: 'Safari Outpost',
    subtitle: 'Africa Rocks Zone',
    detail: 'Plush animals, conservation gear, and exclusive zoo merchandise. Members get 10% off.',
    emoji: '🛍️',
    actionLabel: 'View Popular Items',
    actionSecondary: 'Navigate',
    badge: 'Member Discount',
  },
]

const zoneStamps = [
  { zone: 'Africa Rocks', collected: 4, total: 7, emoji: '🌍' },
  { zone: 'Elephant Odyssey', collected: 2, total: 5, emoji: '🐘' },
  { zone: 'Lost Forest', collected: 1, total: 6, emoji: '🌿' },
  { zone: 'Polar Rim', collected: 0, total: 4, emoji: '❄️' },
]

/* ============================================
   Scan Tab
   ============================================ */

export function ScanTab() {
  const navigate = useNavigate()
  const { setAudioPlaying, markExhibitVisited } = useApp()
  const [mode, setMode] = useState<ScanMode>('qr')
  const [scanResult, setScanResult] = useState<typeof animals[0] | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [photoTaken, setPhotoTaken] = useState(false)
  const [identifyResult, setIdentifyResult] = useState(false)
  const [qrType, setQrType] = useState<QRResultType>('animal')
  const [experienceResult, setExperienceResult] = useState<ExperienceResult | null>(null)
  const [locationZone, setLocationZone] = useState(zoneStamps[0])
  const [scanFlash, setScanFlash] = useState(false)

  const handleScan = () => {
    // Flash effect
    setScanFlash(true)
    setTimeout(() => setScanFlash(false), 300)

    // Randomly pick a QR result type
    const types: QRResultType[] = ['animal', 'location', 'experience']
    const type = types[Math.floor(Math.random() * types.length)]
    setQrType(type)

    if (type === 'animal') {
      const randomAnimal = animals[Math.floor(Math.random() * animals.length)]
      setScanResult(randomAnimal)
      markExhibitVisited(randomAnimal.id, Math.floor(Math.random() * 12) + 3)
    } else if (type === 'location') {
      setLocationZone(zoneStamps[Math.floor(Math.random() * zoneStamps.length)])
    } else {
      setExperienceResult(experienceResults[Math.floor(Math.random() * experienceResults.length)])
    }
    setShowResult(true)
  }

  const handleIdentify = () => {
    setIdentifyResult(true)
    setScanResult(animals[0])
  }

  const handlePhoto = () => {
    setPhotoTaken(true)
    setTimeout(() => setPhotoTaken(false), 3000)
  }

  const modes: { id: ScanMode; label: string; icon: React.ReactNode }[] = [
    { id: 'qr', label: 'QR Code', icon: <QrCode size={16} /> },
    { id: 'ai-identify', label: 'AI Identify', icon: <Sparkles size={16} /> },
    { id: 'smart-photo', label: 'Smart Photo', icon: <ImageIcon size={16} /> },
  ]

  return (
    <PageTransition>
      <div style={{ height: '100dvh', position: 'relative', overflow: 'hidden', background: '#000' }}>
        {/* Camera Feed (simulated) */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Simulated camera view with gradient */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(circle at 35% 40%, rgba(26, 86, 50, 0.15) 0%, transparent 60%),
              radial-gradient(circle at 65% 55%, rgba(200, 149, 108, 0.1) 0%, transparent 50%),
              linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0.5) 100%)
            `,
          }} />

          {/* Scan frame */}
          {mode === 'qr' && (
            <motion.div
              animate={{
                boxShadow: ['0 0 0 2px rgba(123, 168, 137, 0.5)', '0 0 0 4px rgba(123, 168, 137, 0.2)', '0 0 0 2px rgba(123, 168, 137, 0.5)'],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                width: 240,
                height: 240,
                borderRadius: 24,
                position: 'relative',
              }}
            >
              {/* Corner brackets */}
              {[
                { top: 0, left: 0, br: '24px 0 0 0' },
                { top: 0, right: 0, br: '0 24px 0 0' },
                { bottom: 0, left: 0, br: '0 0 0 24px' },
                { bottom: 0, right: 0, br: '0 0 24px 0' },
              ].map((pos, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: 40,
                    height: 40,
                    borderRadius: pos.br,
                    ...pos,
                    borderTop: pos.top !== undefined ? '3px solid var(--green-sage)' : undefined,
                    borderBottom: pos.bottom !== undefined ? '3px solid var(--green-sage)' : undefined,
                    borderLeft: pos.left !== undefined ? '3px solid var(--green-sage)' : undefined,
                    borderRight: pos.right !== undefined ? '3px solid var(--green-sage)' : undefined,
                  } as any}
                />
              ))}

              {/* Scan line */}
              <motion.div
                animate={{ y: [0, 200, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  left: 20,
                  right: 20,
                  top: 20,
                  height: 2,
                  background: 'linear-gradient(90deg, transparent, var(--green-sage), transparent)',
                  opacity: 0.6,
                }}
              />
            </motion.div>
          )}

          {/* AI Identify frame */}
          {mode === 'ai-identify' && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              style={{
                width: 200,
                height: 200,
                borderRadius: '50%',
                border: '2px dashed var(--green-sage)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ fontSize: 48 }}
              >
                🔍
              </motion.div>
            </motion.div>
          )}

          {/* Smart Photo frame */}
          {mode === 'smart-photo' && (
            <div style={{
              width: 280,
              height: 350,
              border: '2px solid rgba(255,255,255,0.3)',
              borderRadius: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}>
              {!photoTaken ? (
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)' }}
                >
                  <div style={{ fontSize: 40, marginBottom: 8 }}>📸</div>
                  <div style={{ fontSize: 13 }}>Hold steady... waiting for a good moment</div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  style={{ textAlign: 'center', color: 'white' }}
                >
                  <div style={{ fontSize: 48, marginBottom: 8 }}>✅</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>Great shot!</div>
                </motion.div>
              )}

              {/* Grid lines */}
              <div style={{ position: 'absolute', left: '33%', top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.1)' }} />
              <div style={{ position: 'absolute', left: '66%', top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.1)' }} />
              <div style={{ position: 'absolute', top: '33%', left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.1)' }} />
              <div style={{ position: 'absolute', top: '66%', left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.1)' }} />
            </div>
          )}
        </div>

        {/* Scan flash effect */}
        <AnimatePresence>
          {scanFlash && (
            <motion.div
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'white',
                zIndex: 25,
                pointerEvents: 'none',
              }}
            />
          )}
        </AnimatePresence>

        {/* Top helper text */}
        <div style={{
          position: 'absolute',
          top: 60,
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 10,
        }}>
          <span style={{
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: 20,
            fontSize: 13,
            fontWeight: 500,
          }}>
            {mode === 'qr' && 'Point at a QR code or tap below to demo'}
            {mode === 'ai-identify' && 'Point your camera at any animal or plant'}
            {mode === 'smart-photo' && 'AI detects the best moment to capture'}
          </span>
        </div>

        {/* Mode Toggle */}
        <div style={{
          position: 'absolute',
          bottom: 180,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 4,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(20px)',
          borderRadius: 'var(--radius-full)',
          padding: 4,
          zIndex: 10,
        }}>
          {modes.map(m => (
            <button
              key={m.id}
              onClick={() => { setMode(m.id); setShowResult(false); setIdentifyResult(false) }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '10px 16px',
                borderRadius: 'var(--radius-full)',
                fontSize: 13,
                fontWeight: 600,
                color: mode === m.id ? 'var(--green-deep)' : 'rgba(255,255,255,0.7)',
                background: mode === m.id ? 'white' : 'transparent',
                transition: 'all 0.2s ease',
              }}
            >
              {m.icon} {m.label}
            </button>
          ))}
        </div>

        {/* Capture / Scan Button */}
        <div style={{
          position: 'absolute',
          bottom: 100,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
        }}>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              if (mode === 'qr') handleScan()
              else if (mode === 'ai-identify') handleIdentify()
              else handlePhoto()
            }}
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: mode === 'smart-photo' ? 'white' : 'var(--green-rich)',
              border: '4px solid rgba(255,255,255,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            }}
          >
            {mode === 'smart-photo' ? (
              <Camera size={28} color="var(--text-primary)" />
            ) : mode === 'ai-identify' ? (
              <Sparkles size={24} color="white" />
            ) : (
              <QrCode size={24} color="white" />
            )}
          </motion.button>
        </div>

        {/* QR Scan Result — Overlay */}
        <AnimatePresence>
          {showResult && mode === 'qr' && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0.5)',
                  zIndex: 30,
                }}
                onClick={() => setShowResult(false)}
              />
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'white',
                  borderRadius: '24px 24px 0 0',
                  maxHeight: '80vh',
                  overflow: 'auto',
                  zIndex: 35,
                }}
              >
                <div style={{ width: 36, height: 4, background: 'var(--border)', borderRadius: 2, margin: '10px auto 4px' }} />

                {/* ===== ANIMAL QR RESULT ===== */}
                {qrType === 'animal' && scanResult && (
                  <>
                    {/* Check-in banner */}
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        margin: '12px 20px',
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--green-pale)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                      }}
                    >
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                        style={{ fontSize: 24 }}
                      >✅</motion.span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--green-rich)' }}>Checked In!</div>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{scanResult.zone} · {new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</div>
                      </div>
                    </motion.div>

                    {/* Animal Photo */}
                    <div style={{
                      height: 200,
                      margin: '0 20px',
                      borderRadius: 'var(--radius-lg)',
                      overflow: 'hidden',
                      background: 'var(--bg-placeholder)',
                    }}>
                      <img src={scanResult.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    <div style={{ padding: '16px 20px 32px' }}>
                      <h3 className="t-display-sm">{scanResult.name}</h3>
                      {scanResult.individual && (
                        <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 4 }}>{scanResult.individual}</div>
                      )}

                      {/* AI Content */}
                      <div style={{
                        background: 'var(--gold-pale)',
                        borderRadius: 'var(--radius-md)',
                        padding: 14,
                        marginTop: 12,
                        marginBottom: 16,
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                          <Zap size={14} color="var(--gold)" />
                          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--gold)' }}>AI INSIGHT</span>
                        </div>
                        <p style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--text-primary)' }}>
                          {scanResult.fact}
                        </p>
                      </div>

                      {/* Actions */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                        <button
                          onClick={() => { setAudioPlaying(true, `${scanResult.name} — Audio Guide`); setShowResult(false) }}
                          className="btn btn-secondary btn-sm"
                        >
                          <Headphones size={14} /> Audio Guide
                        </button>
                        <button className="btn btn-secondary btn-sm">
                          <Camera size={14} /> Smart Photo
                        </button>
                        <button className="btn btn-secondary btn-sm">
                          <Bookmark size={14} /> Save
                        </button>
                        <button className="btn btn-secondary btn-sm">
                          <Share2 size={14} /> Share
                        </button>
                      </div>

                      {/* Next stop */}
                      <div style={{
                        marginTop: 16,
                        padding: 14,
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--green-pale)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                      }}>
                        <span style={{ fontSize: 20 }}>🍽️</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 600 }}>Next: Lunch at Albert's</div>
                          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>5 min walk · No wait</div>
                        </div>
                        <button className="btn btn-sm btn-primary" style={{ fontSize: 12 }}>
                          <Navigation size={12} /> Go
                        </button>
                      </div>

                      {/* Feedback */}
                      <button
                        onClick={() => setShowResult(false)}
                        style={{ width: '100%', textAlign: 'center', marginTop: 12, fontSize: 12, color: 'var(--text-tertiary)', padding: 8 }}
                      >
                        <AlertCircle size={12} style={{ display: 'inline', verticalAlign: -2, marginRight: 4 }} />
                        This isn't right
                      </button>
                    </div>
                  </>
                )}

                {/* ===== LOCATION CHECK-IN QR RESULT ===== */}
                {qrType === 'location' && (
                  <div style={{ padding: '12px 20px 32px' }}>
                    {/* Stamp Animation */}
                    <motion.div
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
                      style={{
                        textAlign: 'center',
                        marginBottom: 16,
                        padding: 24,
                      }}
                    >
                      <div style={{ fontSize: 56, marginBottom: 8 }}>{locationZone.emoji}</div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <div style={{
                          display: 'inline-block',
                          padding: '6px 20px',
                          borderRadius: 'var(--radius-full)',
                          background: 'var(--green-deep)',
                          color: 'white',
                          fontWeight: 700,
                          fontSize: 14,
                        }}>
                          Stamp Collected!
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Zone Info */}
                    <h3 className="t-display-sm" style={{ textAlign: 'center' }}>{locationZone.zone}</h3>
                    <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-secondary)', marginTop: 4, marginBottom: 16 }}>
                      Stamp {locationZone.collected + 1} of {locationZone.total} collected
                    </div>

                    {/* Progress Bar */}
                    <div style={{ marginBottom: 20 }}>
                      <div style={{
                        height: 8, borderRadius: 4,
                        background: 'var(--border-light)',
                        overflow: 'hidden',
                      }}>
                        <motion.div
                          initial={{ width: `${(locationZone.collected / locationZone.total) * 100}%` }}
                          animate={{ width: `${((locationZone.collected + 1) / locationZone.total) * 100}%` }}
                          transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
                          style={{
                            height: '100%',
                            borderRadius: 4,
                            background: 'linear-gradient(90deg, var(--green-rich), var(--green-mid))',
                          }}
                        />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                        <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>
                          {locationZone.total - locationZone.collected - 1} more for the {locationZone.zone} badge
                        </span>
                        <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--green-rich)' }}>
                          {Math.round(((locationZone.collected + 1) / locationZone.total) * 100)}%
                        </span>
                      </div>
                    </div>

                    {/* Zone Context Card */}
                    <div className="card" style={{ padding: 16, marginBottom: 12 }}>
                      <div className="t-heading" style={{ marginBottom: 10 }}>Zone Highlights</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {[
                          { icon: '🦁', label: '8 animals in this zone', sub: '3 currently active' },
                          { icon: '🎭', label: 'Keeper Talk at 11:30 AM', sub: 'Amphitheater · 15 min' },
                          { icon: '☕', label: 'Treehouse Cafe nearby', sub: '2 min walk · No wait' },
                        ].map(item => (
                          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{ fontSize: 18 }}>{item.icon}</span>
                            <div>
                              <div style={{ fontSize: 13, fontWeight: 600 }}>{item.label}</div>
                              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{item.sub}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Crowd Level */}
                    <div style={{
                      padding: 12, borderRadius: 'var(--radius-md)',
                      background: 'var(--green-pale)',
                      display: 'flex', alignItems: 'center', gap: 10,
                      marginBottom: 16,
                    }}>
                      <Zap size={16} color="var(--green-rich)" />
                      <div style={{ fontSize: 12, color: 'var(--green-rich)' }}>
                        <strong>Low crowds</strong> right now — great time to explore this zone
                      </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => navigate('/map')} className="btn btn-primary" style={{ flex: 1, fontSize: 13 }}>
                        <MapPin size={14} /> View on Map
                      </button>
                      <button onClick={() => navigate('/profile/passport')} className="btn btn-secondary" style={{ flex: 1, fontSize: 13 }}>
                        <Star size={14} /> My Stamps
                      </button>
                    </div>

                    <button
                      onClick={() => setShowResult(false)}
                      style={{ width: '100%', textAlign: 'center', marginTop: 12, fontSize: 12, color: 'var(--text-tertiary)', padding: 8 }}
                    >
                      <AlertCircle size={12} style={{ display: 'inline', verticalAlign: -2, marginRight: 4 }} />
                      This isn't right
                    </button>
                  </div>
                )}

                {/* ===== EXPERIENCE QR RESULT ===== */}
                {qrType === 'experience' && experienceResult && (
                  <div style={{ padding: '12px 20px 32px' }}>
                    {/* Experience Type Badge */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                      <span style={{
                        width: 48, height: 48, borderRadius: 14,
                        background: experienceResult.type === 'show' ? 'var(--coral-pale)'
                          : experienceResult.type === 'feeding' ? 'var(--gold-pale)'
                          : experienceResult.type === 'educational' ? 'var(--green-pale)'
                          : experienceResult.type === 'playground' ? 'var(--sky-pale)'
                          : 'var(--coral-pale)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 24,
                      }}>
                        {experienceResult.emoji}
                      </span>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <h3 style={{ fontWeight: 700, fontSize: 17 }}>{experienceResult.title}</h3>
                        </div>
                        <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{experienceResult.subtitle}</div>
                      </div>
                    </div>

                    {/* Badge */}
                    {experienceResult.badge && (
                      <span className="badge" style={{
                        background: experienceResult.type === 'show' ? 'var(--coral-pale)' :
                          experienceResult.type === 'feeding' ? 'var(--gold-pale)' :
                          experienceResult.type === 'playground' ? 'var(--sky-pale)' :
                          experienceResult.type === 'gift-shop' ? 'var(--coral-pale)' : 'var(--green-pale)',
                        color: experienceResult.type === 'show' ? 'var(--coral)' :
                          experienceResult.type === 'feeding' ? 'var(--gold)' :
                          experienceResult.type === 'playground' ? 'var(--sky)' :
                          experienceResult.type === 'gift-shop' ? 'var(--coral)' : 'var(--green-rich)',
                        fontSize: 11,
                        marginBottom: 12,
                        display: 'inline-block',
                      }}>
                        {experienceResult.badge}
                      </span>
                    )}

                    {/* Detail */}
                    <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: 16 }}>
                      {experienceResult.detail}
                    </p>

                    {/* Time / Status */}
                    {experienceResult.time && (
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        padding: 12, borderRadius: 'var(--radius-md)',
                        background: 'var(--bg-primary)', marginBottom: 16,
                      }}>
                        <Clock size={16} color="var(--text-secondary)" />
                        <span style={{ fontSize: 13, fontWeight: 500 }}>{experienceResult.time}</span>
                      </div>
                    )}

                    {/* AI Tip */}
                    <div style={{
                      padding: 12, borderRadius: 'var(--radius-md)',
                      background: 'var(--gold-pale)',
                      display: 'flex', gap: 8, marginBottom: 16,
                    }}>
                      <Sparkles size={16} color="var(--gold)" style={{ flexShrink: 0, marginTop: 1 }} />
                      <span style={{ fontSize: 12, lineHeight: 1.5 }}>
                        {experienceResult.type === 'show' ? 'Arrive 5 minutes early for front-row seats. Ella will love the Q&A portion!'
                          : experienceResult.type === 'feeding' ? 'Kai loved giraffes last visit. This is a great hands-on experience for young ones.'
                          : experienceResult.type === 'educational' ? 'Based on your interests in Marine Life, you\'ll enjoy the deep-ocean section.'
                          : experienceResult.type === 'playground' ? 'Perfect timing — the kids have been walking for 45 minutes. A play break recharges everyone.'
                          : 'Members save 10% on all purchases. Your membership card is in your wallet.'
                        }
                      </span>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => setShowResult(false)} className="btn btn-primary" style={{ flex: 1, fontSize: 13 }}>
                        {experienceResult.type === 'show' ? <><Bell size={14} /> {experienceResult.actionLabel}</> :
                         experienceResult.type === 'feeding' ? <><Play size={14} /> {experienceResult.actionLabel}</> :
                         experienceResult.type === 'educational' ? <><Sparkles size={14} /> {experienceResult.actionLabel}</> :
                         experienceResult.type === 'playground' ? <><Navigation size={14} /> {experienceResult.actionLabel}</> :
                         <><Gift size={14} /> {experienceResult.actionLabel}</>
                        }
                      </button>
                      {experienceResult.actionSecondary && (
                        <button onClick={() => setShowResult(false)} className="btn btn-secondary" style={{ fontSize: 13 }}>
                          {experienceResult.actionSecondary}
                        </button>
                      )}
                    </div>

                    <button
                      onClick={() => setShowResult(false)}
                      style={{ width: '100%', textAlign: 'center', marginTop: 12, fontSize: 12, color: 'var(--text-tertiary)', padding: 8 }}
                    >
                      <AlertCircle size={12} style={{ display: 'inline', verticalAlign: -2, marginRight: 4 }} />
                      This isn't right
                    </button>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* AI Identify Result */}
        <AnimatePresence>
          {identifyResult && mode === 'ai-identify' && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              style={{
                position: 'absolute',
                bottom: 220,
                left: 20,
                right: 20,
                background: 'white',
                borderRadius: 'var(--radius-xl)',
                padding: 16,
                zIndex: 20,
                boxShadow: 'var(--shadow-xl)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <span className="badge badge-active" style={{ marginBottom: 6 }}>Match: 96% confidence</span>
                  <h4 style={{ fontWeight: 700, fontSize: 16, marginTop: 6 }}>🦁 African Lion</h4>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>This is likely Izu — Male, 8 years</div>
                </div>
                <button onClick={() => setIdentifyResult(false)} style={{ color: 'var(--text-tertiary)' }}>
                  <X size={18} />
                </button>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--text-secondary)', marginTop: 8 }}>
                {animals[0].fact}
              </p>
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <button onClick={() => { setAudioPlaying(true, 'African Lion — Izu'); setIdentifyResult(false) }} className="btn btn-sm btn-primary">
                  <Headphones size={14} /> Audio Guide
                </button>
                <button className="btn btn-sm btn-ghost" style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
                  This isn't right
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}

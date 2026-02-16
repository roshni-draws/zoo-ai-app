import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, QrCode, Sparkles, ImageIcon, Headphones, Navigation, Bookmark, Share2, X, Zap } from 'lucide-react'
import { useApp } from './context'
import { animals } from './data'
import { PageTransition } from './components'

type ScanMode = 'qr' | 'ai-identify' | 'smart-photo'

/* ============================================
   Scan Tab
   ============================================ */

export function ScanTab() {
  const navigate = useNavigate()
  const { setAudioPlaying } = useApp()
  const [mode, setMode] = useState<ScanMode>('qr')
  const [scanResult, setScanResult] = useState<typeof animals[0] | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [photoTaken, setPhotoTaken] = useState(false)
  const [identifyResult, setIdentifyResult] = useState(false)

  const handleScan = () => {
    // Simulate QR scan
    const randomAnimal = animals[Math.floor(Math.random() * animals.length)]
    setScanResult(randomAnimal)
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

        {/* QR Scan Result — Animal Profile */}
        <AnimatePresence>
          {showResult && scanResult && mode === 'qr' && (
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
                  background: '#e8e2da',
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
                </div>
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

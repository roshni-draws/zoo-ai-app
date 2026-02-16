import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, ChevronRight, Check } from 'lucide-react'
import { useApp } from './context'
import { zooList, interests } from './data'

/* ============================================
   Splash Screen
   ============================================ */

export function Splash() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => navigate('/carousel'), 2000)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(165deg, #0D2818 0%, #1A5632 40%, #2D7A4F 70%, #7BA889 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative circles */}
      <div style={{
        position: 'absolute',
        width: 600,
        height: 600,
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.05)',
        top: '-200px',
        right: '-200px',
      }} />
      <div style={{
        position: 'absolute',
        width: 400,
        height: 400,
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.08)',
        bottom: '-150px',
        left: '-100px',
      }} />

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}
      >
        <div style={{
          width: 100,
          height: 100,
          borderRadius: 28,
          background: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          fontSize: 52,
          border: '1px solid rgba(255,255,255,0.15)',
        }}>
          🦁
        </div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 36,
            fontWeight: 600,
            color: 'white',
            letterSpacing: '-0.02em',
            fontVariationSettings: "'opsz' 72",
          }}
        >
          Zoo AI
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: 15,
            marginTop: 8,
            fontWeight: 400,
          }}
        >
          San Diego Zoo
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          position: 'absolute',
          bottom: 60,
          display: 'flex',
          gap: 6,
        }}
      >
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.5)',
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

/* ============================================
   Welcome Carousel
   ============================================ */

const slides = [
  {
    emoji: '🗺️',
    title: 'Your AI Zoo Companion',
    subtitle: 'Smart maps, live updates, and personalized routes',
    bg: 'linear-gradient(165deg, #0D2818 0%, #1A5632 60%, #2D7A4F 100%)',
  },
  {
    emoji: '📸',
    title: 'Scan. Discover. Learn.',
    subtitle: 'Point your camera at any animal or QR code',
    bg: 'linear-gradient(165deg, #3D1F0B 0%, #8B5E3C 60%, #C8956C 100%)',
  },
  {
    emoji: '✨',
    title: 'Plan The Perfect Day',
    subtitle: 'AI builds your ideal zoo day in seconds',
    bg: 'linear-gradient(165deg, #1B3A5C 0%, #4A90D9 60%, #7BB3E8 100%)',
  },
]

export function Carousel() {
  const [current, setCurrent] = useState(0)
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ height: '100dvh', position: 'relative', overflow: 'hidden' }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.35 }}
          style={{
            height: '100%',
            background: slides[current].bg,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 40,
            textAlign: 'center',
          }}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring' }}
            style={{
              width: 140,
              height: 140,
              borderRadius: 40,
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 64,
              marginBottom: 48,
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            {slides[current].emoji}
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 30,
              fontWeight: 600,
              color: 'white',
              marginBottom: 12,
              lineHeight: 1.15,
              fontVariationSettings: "'opsz' 60",
            }}
          >
            {slides[current].title}
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: 16,
              lineHeight: 1.5,
              maxWidth: 280,
            }}
          >
            {slides[current].subtitle}
          </motion.p>
        </motion.div>
      </AnimatePresence>

      {/* Dots + CTA */}
      <div style={{
        position: 'absolute',
        bottom: 60,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 32,
      }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: i === current ? 'white' : 'rgba(255,255,255,0.3)',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>

        {current === slides.length - 1 ? (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="btn btn-full"
            onClick={() => navigate('/zoo-select')}
            style={{
              background: 'white',
              color: 'var(--green-deep)',
              maxWidth: 300,
              fontSize: 16,
              fontWeight: 700,
              padding: '16px 32px',
            }}
          >
            Get Started
          </motion.button>
        ) : (
          <button
            onClick={() => setCurrent(c => c + 1)}
            style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: 15,
              fontWeight: 600,
              padding: '16px 32px',
            }}
          >
            Next →
          </button>
        )}
      </div>
    </motion.div>
  )
}

/* ============================================
   Zoo Selector
   ============================================ */

export function ZooSelector() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const filtered = zooList.filter(z =>
    z.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      style={{
        minHeight: '100dvh',
        background: 'var(--bg-primary)',
        padding: '60px 24px 40px',
      }}
    >
      <h1 className="t-display-lg" style={{ marginBottom: 4 }}>Which zoo are<br />you visiting?</h1>
      <p className="t-body text-secondary" style={{ marginBottom: 24 }}>Select your zoo to get started</p>

      <div className="search-bar" style={{ marginBottom: 28 }}>
        <Search size={18} color="var(--text-tertiary)" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search zoos..."
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <span className="t-label text-secondary" style={{ display: 'block', marginBottom: 12 }}>NEARBY</span>
        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/account')}
          className="card card-elevated"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: 16,
            marginBottom: 8,
            cursor: 'pointer',
            border: '2px solid var(--green-rich)',
          }}
        >
          <div style={{
            width: 50,
            height: 50,
            borderRadius: 14,
            background: 'var(--green-pale)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 28,
          }}>🦁</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 15 }}>San Diego Zoo</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <MapPin size={12} /> San Diego, CA · 2.4 mi
            </div>
          </div>
          <ChevronRight size={18} color="var(--text-tertiary)" />
        </motion.div>
      </div>

      <div>
        <span className="t-label text-secondary" style={{ display: 'block', marginBottom: 12, marginTop: 20 }}>POPULAR ZOOS</span>
        {filtered.slice(1).map((zoo, i) => (
          <motion.div
            key={zoo.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/account')}
            className="card"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: 14,
              marginBottom: 8,
              cursor: 'pointer',
            }}
          >
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: 'var(--green-pale)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
            }}>{zoo.image}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{zoo.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{zoo.city}</div>
            </div>
            <ChevronRight size={16} color="var(--text-tertiary)" />
          </motion.div>
        ))}
      </div>

      <button
        onClick={() => navigate('/account')}
        style={{
          display: 'block',
          margin: '24px auto 0',
          color: 'var(--green-rich)',
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        Just browsing →
      </button>
    </motion.div>
  )
}

/* ============================================
   Account Creation
   ============================================ */

export function AccountCreation() {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      style={{
        minHeight: '100dvh',
        background: 'var(--bg-primary)',
        padding: '60px 24px 40px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h1 className="t-display-lg" style={{ marginBottom: 4 }}>Create your<br />account</h1>
      <p className="t-body text-secondary" style={{ marginBottom: 36 }}>To unlock planning, wallet, and personalized AI</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button
          onClick={() => navigate('/profile-setup')}
          className="btn btn-full"
          style={{
            background: '#000',
            color: '#fff',
            padding: '16px',
            fontSize: 15,
          }}
        >
           Continue with Apple
        </button>

        <button
          onClick={() => navigate('/profile-setup')}
          className="btn btn-full btn-secondary"
          style={{ padding: '16px', fontSize: 15 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" style={{ marginRight: 4 }}>
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <button
          onClick={() => navigate('/profile-setup')}
          className="btn btn-full btn-secondary"
          style={{ padding: '16px', fontSize: 15 }}
        >
          ✉️ Continue with Email
        </button>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        margin: '28px 0',
      }}>
        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        <span style={{ fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 500 }}>or</span>
        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>

      <button
        onClick={() => navigate('/profile-setup')}
        style={{
          color: 'var(--text-secondary)',
          fontSize: 14,
          fontWeight: 500,
          textAlign: 'center',
          width: '100%',
        }}
      >
        Skip for now
      </button>

      <p style={{
        marginTop: 'auto',
        fontSize: 12,
        color: 'var(--text-tertiary)',
        textAlign: 'center',
        lineHeight: 1.5,
        paddingTop: 32,
      }}>
        Skipping still allows browsing, map, and basic scan.<br />
        Planning and wallet require an account.
      </p>
    </motion.div>
  )
}

/* ============================================
   Profile Setup (Multi-step)
   ============================================ */

export function ProfileSetup() {
  const [step, setStep] = useState(0)
  const [groupType, setGroupType] = useState<string | null>(null)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const { setOnboarded, setUser } = useApp()
  const navigate = useNavigate()

  const groupOptions = [
    { id: 'solo', label: 'Solo', emoji: '🧑' },
    { id: 'couple', label: 'Couple', emoji: '💑' },
    { id: 'family', label: 'Family', emoji: '👨‍👩‍👧‍👦' },
    { id: 'group', label: 'Group / Friends', emoji: '👥' },
  ]

  const accessibilityOptions = [
    'Wheelchair access',
    'Stroller required',
    'Mobility buggy for seniors',
    'Sensory sensitivities',
  ]

  const [accessibility, setAccessibility] = useState<string[]>([])

  const handleFinish = () => {
    setUser({
      groupType: (groupType as any) || 'family',
      interests: selectedInterests,
      accessibility,
    })
    setOnboarded(true)
    navigate('/')
  }

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      style={{
        minHeight: '100dvh',
        background: 'var(--bg-primary)',
        padding: '48px 24px 40px',
      }}
    >
      {/* Progress */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 32 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            flex: 1,
            height: 3,
            borderRadius: 2,
            background: i <= step ? 'var(--green-rich)' : 'var(--border)',
            transition: 'background 0.3s ease',
          }} />
        ))}
      </div>

      <button
        onClick={() => { setOnboarded(true); navigate('/') }}
        style={{
          color: 'var(--text-secondary)',
          fontSize: 13,
          fontWeight: 500,
          display: 'block',
          marginBottom: 24,
        }}
      >
        Set up later →
      </button>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="t-display-md" style={{ marginBottom: 4 }}>Who are you<br />visiting with?</h2>
            <p className="t-body text-secondary" style={{ marginBottom: 28 }}>Helps us personalize your experience</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {groupOptions.map(opt => (
                <motion.button
                  key={opt.id}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => { setGroupType(opt.id); setTimeout(() => setStep(1), 200) }}
                  className="card"
                  style={{
                    padding: 20,
                    textAlign: 'center',
                    cursor: 'pointer',
                    border: groupType === opt.id ? '2px solid var(--green-rich)' : '1.5px solid var(--border)',
                    background: groupType === opt.id ? 'var(--green-pale)' : 'var(--bg-card)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ fontSize: 36, marginBottom: 8 }}>{opt.emoji}</div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{opt.label}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="t-display-md" style={{ marginBottom: 4 }}>Accessibility<br />needs?</h2>
            <p className="t-body text-secondary" style={{ marginBottom: 28 }}>We'll optimize routes and suggestions</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {accessibilityOptions.map(opt => (
                <motion.button
                  key={opt}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setAccessibility(prev =>
                    prev.includes(opt) ? prev.filter(a => a !== opt) : [...prev, opt]
                  )}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '14px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: accessibility.includes(opt) ? '2px solid var(--green-rich)' : '1.5px solid var(--border)',
                    background: accessibility.includes(opt) ? 'var(--green-pale)' : 'var(--bg-card)',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{
                    width: 22,
                    height: 22,
                    borderRadius: 6,
                    border: accessibility.includes(opt) ? 'none' : '2px solid var(--border)',
                    background: accessibility.includes(opt) ? 'var(--green-rich)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.2s ease',
                  }}>
                    {accessibility.includes(opt) && <Check size={14} color="white" />}
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{opt}</span>
                </motion.button>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              className="btn btn-primary btn-full"
              style={{ marginTop: 28 }}
            >
              Continue
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="t-display-md" style={{ marginBottom: 4 }}>What excites<br />you most?</h2>
            <p className="t-body text-secondary" style={{ marginBottom: 28 }}>Select all that apply</p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {interests.map(interest => (
                <motion.button
                  key={interest}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleInterest(interest)}
                  className={`chip ${selectedInterests.includes(interest) ? 'chip-active' : ''}`}
                  style={{ padding: '10px 18px', fontSize: 14 }}
                >
                  {interest}
                </motion.button>
              ))}
            </div>

            <button
              onClick={handleFinish}
              className="btn btn-primary btn-full btn-lg"
              style={{ marginTop: 32 }}
            >
              Let's Go 🎉
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

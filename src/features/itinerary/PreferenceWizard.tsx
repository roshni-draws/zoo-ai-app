import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Calendar,
  Star,
  Bell,
} from 'lucide-react'
import { PageTransition, BackHeader } from '../../components'

/* ============================================
   Step Data
   ============================================ */

interface StepOption {
  id: string
  label: string
  emoji: string
  description?: string
}

const steps: Array<{
  title: string
  subtitle: string
  multiSelect: boolean
  options: StepOption[]
}> = [
  {
    title: "Who are you visiting with?",
    subtitle: "This helps us plan the right pace and activities",
    multiSelect: false,
    options: [
      { id: 'solo', label: 'Solo', emoji: '🧑' },
      { id: 'family', label: 'Family', emoji: '👨‍👩‍👧‍👦' },
      { id: 'kids', label: 'Kids', emoji: '👶' },
      { id: 'friends', label: 'Friends', emoji: '👯' },
      { id: 'partner', label: 'Partner', emoji: '💑' },
    ],
  },
  {
    title: "How much time do you have?",
    subtitle: "We'll adjust the number of stops to fit your schedule",
    multiSelect: false,
    options: [
      { id: '1-2hrs', label: '1-2 hours', emoji: '⏱️', description: 'Quick highlights tour' },
      { id: '3-5hrs', label: '3-5 hours', emoji: '🕐', description: 'Most popular option' },
      { id: 'full-day', label: 'Full Day', emoji: '☀️', description: 'See everything!' },
    ],
  },
  {
    title: "What are you most excited about?",
    subtitle: "Pick as many as you like",
    multiSelect: true,
    options: [
      { id: 'big-cats', label: 'Big Cats', emoji: '🦁' },
      { id: 'birds', label: 'Birds', emoji: '🦜' },
      { id: 'reptiles', label: 'Reptiles', emoji: '🐊' },
      { id: 'safari', label: 'Safari Rides', emoji: '🚐' },
      { id: 'shows', label: 'Animal Shows', emoji: '🎪' },
      { id: 'feeding', label: 'Feeding Sessions', emoji: '🍖' },
    ],
  },
  {
    title: "How do you prefer to explore?",
    subtitle: "Choose your travel style",
    multiSelect: false,
    options: [
      { id: 'walking', label: 'Walking', emoji: '🚶', description: 'At your own pace' },
      { id: 'shuttle', label: 'Shuttle', emoji: '🚌', description: 'Hop on, hop off' },
      { id: 'mixed', label: 'Mixed with rest stops', emoji: '🛋️', description: 'Best of both worlds' },
    ],
  },
  {
    title: "Any preferences?",
    subtitle: "We'll tailor your experience",
    multiSelect: true,
    options: [
      { id: 'accessible', label: 'Accessibility Friendly', emoji: '♿' },
      { id: 'cafes', label: 'Include Cafes & Souvenir Shops', emoji: '☕' },
      { id: 'quiet', label: 'Avoid Crowded Zones', emoji: '🌿' },
    ],
  },
]

/* ============================================
   Slide Variants
   ============================================ */

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
}

/* ============================================
   PreferenceWizard
   ============================================ */

export default function PreferenceWizard() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [direction, setDirection] = useState(0)
  const [selections, setSelections] = useState<Record<number, string[]>>({
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
  })
  const [showSummary, setShowSummary] = useState(false)
  const [showReminders, setShowReminders] = useState(true)

  const totalSteps = steps.length
  const step = steps[currentStep]

  const handleSelect = (optionId: string) => {
    setSelections(prev => {
      const current = prev[currentStep] || []
      if (step.multiSelect) {
        const exists = current.includes(optionId)
        return {
          ...prev,
          [currentStep]: exists
            ? current.filter(id => id !== optionId)
            : [...current, optionId],
        }
      }
      return { ...prev, [currentStep]: [optionId] }
    })
  }

  const isSelected = (optionId: string) =>
    (selections[currentStep] || []).includes(optionId)

  const canProceed = (selections[currentStep] || []).length > 0

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setDirection(1)
      setCurrentStep(prev => prev + 1)
    } else {
      setShowSummary(true)
    }
  }

  const handleBack = () => {
    if (showSummary) {
      setShowSummary(false)
      return
    }
    if (currentStep > 0) {
      setDirection(-1)
      setCurrentStep(prev => prev - 1)
    } else {
      navigate(-1)
    }
  }

  const handleSkip = () => {
    navigate('/plan')
  }

  /* ---------- Summary helpers ---------- */

  const getDurationLabel = () => {
    const sel = selections[1]?.[0]
    if (sel === '1-2hrs') return '1-2 hours'
    if (sel === '3-5hrs') return '3-5 hours'
    return 'Full Day'
  }

  const getTotalStops = () => {
    const sel = selections[1]?.[0]
    if (sel === '1-2hrs') return 4
    if (sel === '3-5hrs') return 6
    return 8
  }

  const getShowCount = () => {
    const excited = selections[2] || []
    return excited.includes('shows') ? 2 : excited.includes('feeding') ? 1 : 0
  }

  /* ---------- Summary Screen ---------- */

  if (showSummary) {
    return (
      <PageTransition>
        <div className="page" style={{ background: 'var(--bg-primary)' }}>
          <div className="page-header" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <button onClick={handleBack} style={{ display: 'flex', alignItems: 'center' }}>
              <ChevronLeft size={22} />
            </button>
            <div style={{ width: 22 }} />
          </div>

          <div style={{ padding: '0 var(--space-xl)', textAlign: 'center' }}>
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
              style={{ fontSize: 64, marginBottom: 8 }}
            >
              🎯
            </motion.div>

            <motion.h1
              className="t-display-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              All Set!
            </motion.h1>

            <motion.p
              className="t-body"
              style={{ color: 'var(--text-secondary)', marginTop: 8 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              Here's what we've planned for you
            </motion.p>

            {/* Plan Summary Card */}
            <motion.div
              className="card card-elevated"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              style={{
                marginTop: 24,
                textAlign: 'left',
                padding: 20,
              }}
            >
              <div className="t-display-sm" style={{ marginBottom: 16 }}>Your Plan Summary</div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--green-pale)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Clock size={18} color="var(--green-rich)" />
                  </div>
                  <div>
                    <div className="t-caption" style={{ color: 'var(--text-secondary)' }}>Duration</div>
                    <div className="t-body" style={{ fontWeight: 600 }}>{getDurationLabel()}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--coral-pale)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <MapPin size={18} color="var(--coral)" />
                  </div>
                  <div>
                    <div className="t-caption" style={{ color: 'var(--text-secondary)' }}>Total stops</div>
                    <div className="t-body" style={{ fontWeight: 600 }}>{getTotalStops()} stops</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--gold-pale)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Star size={18} color="var(--amber)" />
                  </div>
                  <div>
                    <div className="t-caption" style={{ color: 'var(--text-secondary)' }}>Shows included</div>
                    <div className="t-body" style={{ fontWeight: 600 }}>{getShowCount()} shows</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--sky-pale)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Calendar size={18} color="var(--sky)" />
                  </div>
                  <div>
                    <div className="t-caption" style={{ color: 'var(--text-secondary)' }}>First stop</div>
                    <div className="t-body" style={{ fontWeight: 600 }}>Entry Gate A</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Reminders Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              style={{
                marginTop: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-light)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Bell size={18} color="var(--green-rich)" />
                <span className="t-body" style={{ fontWeight: 500 }}>Show reminders</span>
              </div>
              <button
                onClick={() => setShowReminders(!showReminders)}
                style={{
                  width: 48,
                  height: 28,
                  borderRadius: 14,
                  background: showReminders ? 'var(--green-rich)' : 'var(--border)',
                  position: 'relative',
                  transition: 'background 0.25s ease',
                }}
              >
                <motion.div
                  animate={{ x: showReminders ? 22 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    background: 'white',
                    position: 'absolute',
                    top: 2,
                    boxShadow: 'var(--shadow-sm)',
                  }}
                />
              </button>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              style={{ marginTop: 28, paddingBottom: 32 }}
            >
              <motion.button
                className="btn btn-primary btn-full"
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/plan/itinerary')}
                style={{ padding: '16px 28px', fontSize: 16 }}
              >
                START VISIT NOW
              </motion.button>

              <button
                onClick={() => navigate('/plan')}
                style={{
                  marginTop: 16,
                  color: 'var(--green-rich)',
                  fontWeight: 600,
                  fontSize: 15,
                  padding: '8px 0',
                }}
              >
                Save for later
              </button>
            </motion.div>
          </div>
        </div>
      </PageTransition>
    )
  }

  /* ---------- Wizard Steps ---------- */

  return (
    <PageTransition>
      <div className="page" style={{ background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
        {/* Header with progress */}
        <div className="page-header" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <button onClick={handleBack} style={{ display: 'flex', alignItems: 'center' }}>
            <ChevronLeft size={22} />
          </button>
          <span className="t-body-sm" style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
            Step {currentStep + 1} of {totalSteps}
          </span>
          <button
            onClick={handleSkip}
            style={{ color: 'var(--green-rich)', fontWeight: 600, fontSize: 14 }}
          >
            Skip
          </button>
        </div>

        {/* Progress Bar */}
        <div style={{ padding: '0 var(--space-xl)', marginBottom: 24 }}>
          <div className="progress-bar">
            <motion.div
              className="progress-bar-fill"
              animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              style={{ padding: '0 var(--space-xl)' }}
            >
              <h2 className="t-display-lg" style={{ marginBottom: 8 }}>
                {step.title}
              </h2>
              <p className="t-body" style={{ color: 'var(--text-secondary)', marginBottom: 28 }}>
                {step.subtitle}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {step.options.map((option, i) => {
                  const selected = isSelected(option.id)
                  return (
                    <motion.button
                      key={option.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelect(option.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16,
                        padding: '16px 20px',
                        borderRadius: 'var(--radius-lg)',
                        background: selected ? 'var(--green-pale)' : 'var(--bg-card)',
                        border: `2px solid ${selected ? 'var(--green-rich)' : 'var(--border-light)'}`,
                        transition: 'all 0.2s ease',
                        textAlign: 'left',
                        width: '100%',
                      }}
                    >
                      <span style={{ fontSize: 28, lineHeight: 1 }}>{option.emoji}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontWeight: 600,
                          fontSize: 15,
                          color: selected ? 'var(--green-deep)' : 'var(--text-primary)',
                        }}>
                          {option.label}
                        </div>
                        {option.description && (
                          <div className="t-caption" style={{
                            color: 'var(--text-secondary)',
                            marginTop: 2,
                          }}>
                            {option.description}
                          </div>
                        )}
                      </div>
                      <div style={{
                        width: 24,
                        height: 24,
                        borderRadius: step.multiSelect ? 6 : 12,
                        border: `2px solid ${selected ? 'var(--green-rich)' : 'var(--border)'}`,
                        background: selected ? 'var(--green-rich)' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease',
                        flexShrink: 0,
                      }}>
                        {selected && (
                          <motion.svg
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M3 7L6 10L11 4"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </motion.svg>
                        )}
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Navigation */}
        <div style={{
          padding: 'var(--space-lg) var(--space-xl)',
          paddingBottom: 'calc(var(--space-xl) + env(safe-area-inset-bottom, 0px))',
          display: 'flex',
          gap: 12,
        }}>
          {currentStep > 0 && (
            <motion.button
              className="btn btn-secondary"
              whileTap={{ scale: 0.97 }}
              onClick={handleBack}
              style={{ flex: 1, gap: 6 }}
            >
              <ChevronLeft size={18} />
              BACK
            </motion.button>
          )}
          <motion.button
            className="btn btn-primary"
            whileTap={{ scale: 0.97 }}
            onClick={handleNext}
            style={{
              flex: currentStep === 0 ? 1 : 1.5,
              opacity: canProceed ? 1 : 0.5,
              gap: 6,
            }}
            disabled={!canProceed}
          >
            {currentStep === totalSteps - 1 ? 'FINISH' : 'NEXT'}
            <ChevronRight size={18} />
          </motion.button>
        </div>
      </div>
    </PageTransition>
  )
}

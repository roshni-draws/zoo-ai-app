import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check, Upload, Heart, Calendar, ClipboardList, Users, ArrowRight, Copy } from 'lucide-react'
import { BackHeader, PageTransition } from '../../components'

const expandableSections = [
  {
    id: 'signup',
    title: 'Sign Up Information',
    icon: ClipboardList,
    content: 'Volunteers must be at least 16 years old (14 with guardian consent). A background check is required for all adult volunteers. Training sessions are held every first Saturday of the month. Initial commitment is a minimum of 3 months, 4 hours per week.',
  },
  {
    id: 'eligibility',
    title: 'Eligibility Requirements',
    icon: Users,
    content: 'Must be physically able to stand and walk for extended periods. No prior experience with animals required — we provide full training. Must be comfortable working outdoors in various weather conditions. First aid certification is a plus but not mandatory.',
  },
  {
    id: 'overview',
    title: 'Program Overview',
    icon: Calendar,
    content: 'Our volunteer program covers animal care assistance, visitor education, habitat maintenance, and conservation outreach. Volunteers rotate through different zones every 4 weeks. You will work alongside experienced zookeepers and educators. Perks include free zoo entry, exclusive behind-the-scenes tours, and volunteer appreciation events.',
  },
]

const availabilityOptions = ['Weekdays', 'Evenings', 'Weekends', 'Flexible']

const interestAreas = [
  'Animal Care',
  'Education & Tours',
  'Conservation Research',
  'Event Coordination',
  'Habitat Maintenance',
  'Visitor Services',
]

const nextSteps = [
  { step: 1, text: 'Application review (2-3 business days)' },
  { step: 2, text: 'Background check & verification' },
  { step: 3, text: 'Orientation session invitation' },
  { step: 4, text: 'Training program (2 weekends)' },
  { step: 5, text: 'Welcome to the team!' },
]

export default function VolunteerApplication() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [expanded, setExpanded] = useState<string | null>(null)

  // Form state
  const [fullName, setFullName] = useState('')
  const [dob, setDob] = useState('')
  const [phone, setPhone] = useState('')
  const [availability, setAvailability] = useState<string[]>([])
  const [interest, setInterest] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)

  const refNumber = 'VOL-2026-' + Math.random().toString(36).substring(2, 8).toUpperCase()

  const handleSubmit = () => {
    setStep(3)
  }

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title="Volunteer Application" />

        {/* Progress indicator */}
        <div style={{ padding: '0 24px 8px' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {[1, 2, 3].map(s => (
              <div
                key={s}
                style={{
                  flex: 1,
                  height: 3,
                  borderRadius: 2,
                  background: s <= step ? 'var(--green-rich)' : 'var(--border-light)',
                  transition: 'background 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* ========== PAGE 1: Program Info ========== */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              style={{ padding: '16px 24px 120px' }}
            >
              {/* Hero */}
              <div style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                position: 'relative',
                height: 180,
                marginBottom: 24,
                background: 'linear-gradient(135deg, var(--green-deep), var(--green-rich))',
              }}>
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&h=400&fit=crop"
                  alt="Volunteers"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '32px 20px 20px',
                  background: 'linear-gradient(transparent, rgba(13,26,13,0.9))',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: 'var(--radius-full)',
                      background: 'rgba(232,104,160,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <Heart size={20} color="var(--coral)" />
                    </div>
                    <div>
                      <h1 className="t-display-md" style={{ color: 'white' }}>Make a Difference</h1>
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>
                    Join our dedicated team of volunteers and help protect wildlife while inspiring visitors of all ages.
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 24 }}>
                {[
                  { value: '200+', label: 'Active Volunteers' },
                  { value: '15k', label: 'Hours/Year' },
                  { value: '4.9', label: 'Satisfaction' },
                ].map(stat => (
                  <div key={stat.label} className="card" style={{ textAlign: 'center', padding: 14 }}>
                    <div style={{ fontSize: 22, fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--green-rich)' }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Expandable Sections */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                {expandableSections.map(section => {
                  const Icon = section.icon
                  return (
                    <div key={section.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                      <button
                        onClick={() => setExpanded(expanded === section.id ? null : section.id)}
                        style={{
                          width: '100%',
                          padding: '16px 20px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          textAlign: 'left',
                        }}
                      >
                        <div style={{
                          width: 36,
                          height: 36,
                          borderRadius: 'var(--radius-md)',
                          background: 'var(--green-pale)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}>
                          <Icon size={18} color="var(--green-rich)" />
                        </div>
                        <span style={{ flex: 1, fontWeight: 600, fontSize: 14 }}>{section.title}</span>
                        <motion.div
                          animate={{ rotate: expanded === section.id ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown size={18} color="var(--text-tertiary)" />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {expanded === section.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ overflow: 'hidden' }}
                          >
                            <div style={{
                              padding: '0 20px 16px',
                              fontSize: 13,
                              color: 'var(--text-secondary)',
                              lineHeight: 1.6,
                            }}>
                              {section.content}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                className="btn btn-primary btn-full btn-lg"
                onClick={() => setStep(2)}
              >
                APPLY TO VOLUNTEER <ArrowRight size={18} />
              </motion.button>
            </motion.div>
          )}

          {/* ========== PAGE 2: Application Form ========== */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              style={{ padding: '16px 24px 120px' }}
            >
              <h2 className="t-display-md" style={{ marginBottom: 4 }}>Application Form</h2>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 24 }}>
                Fill in your details to apply for our volunteer program.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {/* Full Name */}
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Full Name *</label>
                  <input
                    className="input"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Date of Birth *</label>
                  <input
                    className="input"
                    placeholder="DD/MM/YYYY"
                    value={dob}
                    onChange={e => setDob(e.target.value)}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Phone Number *</label>
                  <input
                    className="input"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </div>

                {/* Availability */}
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 10 }}>Availability *</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {availabilityOptions.map(opt => (
                      <button
                        key={opt}
                        onClick={() => setAvailability(prev =>
                          prev.includes(opt) ? prev.filter(a => a !== opt) : [...prev, opt]
                        )}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          padding: '10px 16px',
                          borderRadius: 'var(--radius-md)',
                          border: availability.includes(opt) ? '2px solid var(--green-rich)' : '1.5px solid var(--border)',
                          background: availability.includes(opt) ? 'var(--green-pale)' : 'var(--bg-card)',
                          fontSize: 13,
                          fontWeight: 500,
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <div style={{
                          width: 20,
                          height: 20,
                          borderRadius: 4,
                          border: availability.includes(opt) ? 'none' : '2px solid var(--border)',
                          background: availability.includes(opt) ? 'var(--green-rich)' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s ease',
                        }}>
                          {availability.includes(opt) && <Check size={13} color="white" strokeWidth={3} />}
                        </div>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Area of Interest */}
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Area of Interest *</label>
                  <div style={{ position: 'relative' }}>
                    <select
                      className="input"
                      value={interest}
                      onChange={e => setInterest(e.target.value)}
                      style={{
                        appearance: 'none',
                        paddingRight: 40,
                        color: interest ? 'var(--text-primary)' : 'var(--text-tertiary)',
                      }}
                    >
                      <option value="" disabled>Select an area</option>
                      {interestAreas.map(area => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </select>
                    <ChevronDown size={18} color="var(--text-tertiary)" style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  </div>
                </div>

                {/* Document Upload */}
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Supporting Documents</label>
                  <div style={{
                    border: '2px dashed var(--border)',
                    borderRadius: 'var(--radius-md)',
                    padding: 24,
                    textAlign: 'center',
                    background: 'var(--bg-primary)',
                    cursor: 'pointer',
                  }}>
                    <Upload size={28} color="var(--text-tertiary)" style={{ marginBottom: 8 }} />
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Upload Documents</div>
                    <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>PDF, JPG, PNG up to 5MB</div>
                  </div>
                </div>

                {/* Terms */}
                <button
                  onClick={() => setTermsAccepted(!termsAccepted)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                    textAlign: 'left',
                    padding: '4px 0',
                  }}
                >
                  <div style={{
                    width: 22,
                    height: 22,
                    borderRadius: 6,
                    border: termsAccepted ? 'none' : '2px solid var(--border)',
                    background: termsAccepted ? 'var(--green-rich)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: 1,
                    transition: 'all 0.2s ease',
                  }}>
                    {termsAccepted && <Check size={14} color="white" strokeWidth={3} />}
                  </div>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    I agree to the <span style={{ color: 'var(--green-rich)', fontWeight: 600 }}>Terms & Conditions</span> and acknowledge the volunteer program requirements.
                  </span>
                </button>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                className="btn btn-primary btn-full btn-lg"
                onClick={handleSubmit}
                style={{ marginTop: 28 }}
              >
                SUBMIT APPLICATION
              </motion.button>
            </motion.div>
          )}

          {/* ========== PAGE 3: Confirmation ========== */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              style={{
                padding: '40px 24px 120px',
                textAlign: 'center',
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'var(--green-rich)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                >
                  <Check size={40} color="white" strokeWidth={3} />
                </motion.div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="t-display-lg"
                style={{ marginBottom: 8 }}
              >
                Application Submitted Successfully!
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}
              >
                Thank you for your interest in volunteering with us.
              </motion.p>

              {/* Reference Number */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="card"
                style={{ padding: 16, marginBottom: 24, textAlign: 'left' }}
              >
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 4 }}>Reference Number</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--green-rich)' }}>
                    {refNumber}
                  </span>
                  <button style={{ color: 'var(--text-tertiary)', padding: 4 }}>
                    <Copy size={16} />
                  </button>
                </div>
              </motion.div>

              {/* What's Next */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="card"
                style={{ padding: 20, textAlign: 'left', marginBottom: 28 }}
              >
                <h3 className="t-display-sm" style={{ marginBottom: 16 }}>What's Next?</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {nextSteps.map((item, i) => (
                    <div key={item.step} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{
                        width: 32,
                        height: 32,
                        borderRadius: 'var(--radius-full)',
                        background: i === 0 ? 'var(--green-rich)' : 'var(--green-pale)',
                        color: i === 0 ? 'white' : 'var(--green-rich)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 13,
                        fontWeight: 700,
                        flexShrink: 0,
                      }}>
                        {item.step}
                      </div>
                      <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <button
                onClick={() => navigate('/learning')}
                className="btn btn-primary btn-full"
              >
                BACK TO LEARNING HUB
              </button>
              <button
                onClick={() => navigate('/home')}
                className="btn btn-ghost btn-full"
                style={{ marginTop: 8 }}
              >
                Go Home
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}

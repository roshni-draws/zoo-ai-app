import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ChevronLeft, ChevronRight, Calendar, Users, Package, Sliders, MapPin, Star, Clock, Route as RouteIcon, Navigation, Share2, Bookmark, Check, Shuffle, QrCode, Camera as CameraIcon, HelpCircle, Baby, Accessibility, Bike, Plus, Minus, Tag } from 'lucide-react'
import { useApp } from './context'
import { animals, curatedPlans, defaultPlanStops } from './data'
import { BackHeader, PageTransition, SectionHeader } from './components'

/* ============================================
   Plan Tab — Landing
   ============================================ */

export function PlanTab() {
  const navigate = useNavigate()
  const { setWanderMode, setActivePlan } = useApp()

  return (
    <PageTransition>
      <div className="page page-scroll">
        <h1 className="t-display-lg" style={{ marginBottom: 20 }}>Plan Your Visit</h1>

        {/* Create New Plan */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-gradient"
          style={{
            borderRadius: 'var(--radius-xl)',
            padding: 28,
            marginBottom: 16,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: -20, right: -10, fontSize: 80, opacity: 0.08 }}>✨</div>
          <div style={{ fontSize: 13, color: 'var(--gold-light)', fontWeight: 600, marginBottom: 6 }}>AI-POWERED</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 22,
            fontWeight: 600,
            color: 'white',
            marginBottom: 8,
          }}>Create Your Perfect Day</h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.4, marginBottom: 20 }}>
            Tell us about your group and AI builds your ideal zoo day
          </p>
          <button
            onClick={() => navigate('/plan/builder')}
            className="btn"
            style={{ background: 'white', color: 'var(--green-deep)', fontWeight: 700 }}
          >
            <Sparkles size={16} /> Start Planning
          </button>
        </motion.div>

        {/* Wander Mode */}
        <div className="card" style={{
          marginBottom: 28,
          padding: 20,
          background: 'var(--gold-pale)',
          border: '1px solid var(--gold-light)',
        }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ fontSize: 32 }}>🎲</div>
            <div>
              <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Surprise Me</h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: 12 }}>
                No plan? No problem. Let AI guide you one discovery at a time.
              </p>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => { setWanderMode(true); navigate('/map') }} className="btn btn-sm" style={{ background: 'var(--gold)', color: 'white' }}>
                  <Shuffle size={14} /> Relaxed
                </button>
                <button onClick={() => { setWanderMode(true); navigate('/map') }} className="btn btn-sm btn-secondary">
                  ⚡ Adventurous
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Curated Plans */}
        <SectionHeader title="Popular Plans" />
        {curatedPlans.map((plan, i) => (
          <motion.button
            key={plan.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/plan/curated/${plan.id}`)}
            className="card"
            style={{
              display: 'flex',
              gap: 14,
              padding: 16,
              marginBottom: 10,
              width: '100%',
              textAlign: 'left',
              cursor: 'pointer',
            }}
          >
            <div style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: 'var(--green-pale)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              flexShrink: 0,
            }}>{plan.icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{plan.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                {plan.exhibits} exhibits · {plan.duration} · {plan.distance}
              </div>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {plan.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="badge badge-active" style={{ fontSize: 10 }}>{tag}</span>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: 'var(--gold)', fontWeight: 600, flexShrink: 0 }}>
              <Star size={14} fill="currentColor" /> {plan.rating}
            </div>
          </motion.button>
        ))}

        {/* Past Plans */}
        <SectionHeader title="Past Plans" />
        <div className="card" style={{ padding: 14, marginBottom: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Family Day — Feb 14</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>7 exhibits · 4h 23min</div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button className="btn btn-sm btn-primary" style={{ fontSize: 11 }}>Rebook</button>
              <button onClick={() => navigate('/profile/visits')} className="btn btn-sm btn-secondary" style={{ fontSize: 11 }}>Recap</button>
            </div>
          </div>
        </div>

        {/* Active Challenges */}
        <div style={{ marginTop: 20 }}>
          <SectionHeader title="Active Challenges" />
          {[
            { emoji: '🐢', title: 'Find Harold the Tortoise', desc: "He's been here since 1962", type: 'scan', status: 'In progress' },
            { emoji: '🦩', title: 'Flamingo on One Leg', desc: 'Capture the perfect photo', type: 'photo', status: 'Not started' },
            { emoji: '🦍', title: 'Gorilla Quiz', desc: 'Answer 3 questions after visiting', type: 'quiz', status: 'Locked' },
          ].map(challenge => (
            <div key={challenge.title} className="card" style={{ padding: 14, marginBottom: 8, display: 'flex', gap: 12 }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: 'var(--gold-pale)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                flexShrink: 0,
              }}>{challenge.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{challenge.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>{challenge.desc}</div>
                <span className="badge" style={{
                  background: challenge.status === 'In progress' ? 'var(--green-light)' : challenge.status === 'Locked' ? 'var(--border-light)' : 'var(--sky-pale)',
                  color: challenge.status === 'In progress' ? 'var(--green-rich)' : challenge.status === 'Locked' ? 'var(--text-tertiary)' : 'var(--sky)',
                  fontSize: 10,
                }}>{challenge.status}</span>
              </div>
              <button className="btn btn-sm btn-secondary" style={{ alignSelf: 'center', fontSize: 11 }}>
                {challenge.type === 'scan' ? <><QrCode size={12} /> Scan</> : challenge.type === 'photo' ? <><CameraIcon size={12} /> Photo</> : <><HelpCircle size={12} /> Quiz</>}
              </button>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}

/* ============================================
   Plan Builder — 5 Steps
   ============================================ */

export function PlanBuilder() {
  const navigate = useNavigate()
  const { setActivePlan: saveActivePlan } = useApp()
  const [step, setStep] = useState(1)
  const [generating, setGenerating] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [groupType, setGroupType] = useState<string | null>(null)
  const [duration, setDuration] = useState('full')
  const [pace, setPace] = useState('balanced')
  const [mustSee, setMustSee] = useState<string[]>([])
  const [equipment, setEquipment] = useState<Record<string, number>>({})

  const equipmentOptions = [
    { id: 'stroller-single', label: 'Single Stroller', emoji: '👶', price: 12, icon: Baby },
    { id: 'stroller-double', label: 'Double Stroller', emoji: '👶👶', price: 18, icon: Baby },
    { id: 'wheelchair', label: 'Wheelchair', emoji: '♿', price: 0, sub: 'Complimentary', icon: Accessibility },
    { id: 'wagon', label: 'Kids Wagon', emoji: '🛒', price: 15, icon: Bike },
  ]

  const handleGenerate = () => {
    setGenerating(true)
    saveActivePlan({
      date: selectedDate || 'Today',
      stops: mustSee.slice(0, 5).map((id, i) => ({
        id,
        name: animals.find(a => a.id === id)?.name || id,
        emoji: animals.find(a => a.id === id)?.emoji || '🦁',
        time: `${9 + i}:${i % 2 === 0 ? '00' : '30'} AM`,
        duration: '30 min',
        insight: 'AI-optimized stop',
        completed: false,
      })),
      totalDuration: '3.5 hours',
      distance: '2.1 miles',
    })
    setTimeout(() => navigate('/plan/itinerary'), 3000)
  }

  if (generating) {
    return (
      <div style={{
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(165deg, var(--green-deep), var(--green-rich))',
        padding: 40,
        textAlign: 'center',
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          style={{ fontSize: 64, marginBottom: 32 }}
        >
          🗺️
        </motion.div>
        <AnimatePresence mode="wait">
          {[
            'Checking crowd predictions...',
            'Finding best animal activity windows...',
            'Optimizing your walking route...',
          ].map((msg, i) => (
            <motion.div
              key={msg}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 1 }}
              style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: 15,
                fontWeight: 500,
                marginBottom: 4,
              }}
            >
              {msg}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <PageTransition>
      <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)' }}>
        {/* Header */}
        <div style={{
          padding: '48px 20px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <button onClick={() => step > 1 ? setStep(s => s - 1) : navigate(-1)}>
            <ChevronLeft size={22} />
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', gap: 4 }}>
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} style={{
                  flex: 1,
                  height: 3,
                  borderRadius: 2,
                  background: i <= step ? 'var(--green-rich)' : 'var(--border)',
                  transition: 'background 0.3s ease',
                }} />
              ))}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 6 }}>Step {step} of 5</div>
          </div>
        </div>

        <div style={{ padding: '8px 24px 40px' }}>
          <AnimatePresence mode="wait">
            {/* Step 1: Date */}
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="t-display-md" style={{ marginBottom: 20 }}>When are you<br />visiting?</h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
                  {['Today', 'Tomorrow', 'This Weekend', 'Next Week'].map(d => (
                    <button
                      key={d}
                      onClick={() => setSelectedDate(d)}
                      className="card"
                      style={{
                        padding: 16,
                        textAlign: 'center',
                        fontWeight: 600,
                        fontSize: 14,
                        border: selectedDate === d ? '2px solid var(--green-rich)' : '1.5px solid var(--border)',
                        background: selectedDate === d ? 'var(--green-pale)' : 'var(--bg-card)',
                      }}
                    >
                      {d}
                    </button>
                  ))}
                </div>

                <div style={{
                  padding: 12,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--green-pale)',
                  fontSize: 13,
                  color: 'var(--green-rich)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 24,
                }}>
                  <Sparkles size={16} />
                  Weekdays are 40% less crowded than weekends
                </div>

                <button onClick={() => setStep(2)} className="btn btn-primary btn-full">Continue</button>
              </motion.div>
            )}

            {/* Step 2: Group */}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="t-display-md" style={{ marginBottom: 20 }}>Who's coming?</h2>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                  {['Solo', 'Couple', 'Family', 'Friends', 'School/Group'].map(g => (
                    <button
                      key={g}
                      onClick={() => setGroupType(g)}
                      className={`chip ${groupType === g ? 'chip-active' : ''}`}
                      style={{ padding: '10px 20px', fontSize: 14 }}
                    >
                      {g}
                    </button>
                  ))}
                </div>

                {groupType === 'Family' && (
                  <div className="card" style={{ padding: 16, marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <span style={{ fontWeight: 600, fontSize: 14 }}>Adults</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <button className="btn-icon btn-secondary" style={{ width: 32, height: 32, border: '1px solid var(--border)', borderRadius: 8 }}>-</button>
                        <span style={{ fontWeight: 700, width: 20, textAlign: 'center' }}>2</span>
                        <button className="btn-icon btn-secondary" style={{ width: 32, height: 32, border: '1px solid var(--border)', borderRadius: 8 }}>+</button>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 600, fontSize: 14 }}>Children</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <button className="btn-icon btn-secondary" style={{ width: 32, height: 32, border: '1px solid var(--border)', borderRadius: 8 }}>-</button>
                        <span style={{ fontWeight: 700, width: 20, textAlign: 'center' }}>2</span>
                        <button className="btn-icon btn-secondary" style={{ width: 32, height: 32, border: '1px solid var(--border)', borderRadius: 8 }}>+</button>
                      </div>
                    </div>
                  </div>
                )}

                <button onClick={() => setStep(3)} className="btn btn-primary btn-full">Continue</button>
              </motion.div>
            )}

            {/* Step 3: Equipment */}
            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="t-display-md" style={{ marginBottom: 4 }}>Need any<br />equipment?</h2>
                <p className="t-body text-secondary" style={{ marginBottom: 20 }}>
                  Reserve ahead and skip the line at pickup
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                  {equipmentOptions.map(item => {
                    const qty = equipment[item.id] || 0
                    return (
                      <div
                        key={item.id}
                        className="card"
                        style={{
                          padding: 16,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 14,
                          border: qty > 0 ? '2px solid var(--green-rich)' : '1.5px solid var(--border)',
                          background: qty > 0 ? 'var(--green-pale)' : 'var(--bg-card)',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <div style={{
                          width: 48,
                          height: 48,
                          borderRadius: 12,
                          background: qty > 0 ? 'var(--green-light)' : 'var(--bg-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 24,
                          flexShrink: 0,
                        }}>
                          {item.emoji}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600, fontSize: 14 }}>{item.label}</div>
                          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                            {item.sub || `$${item.price}/day`}
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          {qty > 0 && (
                            <button
                              onClick={() => setEquipment(prev => {
                                const next = { ...prev }
                                if (next[item.id] <= 1) delete next[item.id]
                                else next[item.id]--
                                return next
                              })}
                              style={{
                                width: 32, height: 32, borderRadius: 8,
                                border: '1px solid var(--border)', background: 'white',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                              }}
                            >
                              <Minus size={14} />
                            </button>
                          )}
                          {qty > 0 && (
                            <span style={{ fontWeight: 700, width: 20, textAlign: 'center' }}>{qty}</span>
                          )}
                          <button
                            onClick={() => setEquipment(prev => ({ ...prev, [item.id]: (prev[item.id] || 0) + 1 }))}
                            style={{
                              width: 32, height: 32, borderRadius: 8,
                              border: '1px solid var(--border)', background: 'white',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {Object.keys(equipment).length > 0 && (
                  <div style={{
                    padding: 12,
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--green-pale)',
                    fontSize: 13,
                    color: 'var(--green-rich)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginBottom: 16,
                  }}>
                    <Sparkles size={16} />
                    Equipment will be ready at the main entrance when you arrive
                  </div>
                )}

                <button onClick={() => setStep(4)} className="btn btn-primary btn-full">
                  {Object.keys(equipment).length > 0 ? 'Continue' : 'Skip — No Equipment Needed'}
                </button>
              </motion.div>
            )}

            {/* Step 4: Preferences */}
            {step === 4 && (
              <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="t-display-md" style={{ marginBottom: 20 }}>How do you want<br />your day?</h2>

                <div style={{ marginBottom: 20 }}>
                  <div className="t-heading" style={{ marginBottom: 8 }}>Duration</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {[{ id: 'half', label: 'Half Day' }, { id: 'full', label: 'Full Day' }, { id: 'short', label: '2-3 hrs' }].map(d => (
                      <button
                        key={d.id}
                        onClick={() => setDuration(d.id)}
                        className={`chip ${duration === d.id ? 'chip-active' : ''}`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <div className="t-heading" style={{ marginBottom: 8 }}>Pace</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {[
                      { id: 'relaxed', label: '🐢 Relaxed' },
                      { id: 'balanced', label: '⚖️ Balanced' },
                      { id: 'packed', label: '⚡ Packed' },
                    ].map(p => (
                      <button
                        key={p.id}
                        onClick={() => setPace(p.id)}
                        className={`chip ${pace === p.id ? 'chip-active' : ''}`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button onClick={() => setStep(5)} className="btn btn-primary btn-full">Continue</button>
              </motion.div>
            )}

            {/* Step 5: Must-See */}
            {step === 5 && (
              <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="t-display-md" style={{ marginBottom: 4 }}>Must-see<br />exhibits</h2>
                <p className="t-body text-secondary" style={{ marginBottom: 20 }}>Select your favorites</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 24 }}>
                  {animals.slice(0, 9).map(animal => (
                    <motion.button
                      key={animal.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setMustSee(prev =>
                        prev.includes(animal.id) ? prev.filter(a => a !== animal.id) : [...prev, animal.id]
                      )}
                      style={{
                        padding: 12,
                        borderRadius: 'var(--radius-md)',
                        border: mustSee.includes(animal.id) ? '2px solid var(--green-rich)' : '1.5px solid var(--border)',
                        background: mustSee.includes(animal.id) ? 'var(--green-pale)' : 'var(--bg-card)',
                        textAlign: 'center',
                        position: 'relative',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {mustSee.includes(animal.id) && (
                        <div style={{
                          position: 'absolute',
                          top: 4,
                          right: 4,
                          width: 18,
                          height: 18,
                          borderRadius: '50%',
                          background: 'var(--green-rich)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          <Check size={11} color="white" />
                        </div>
                      )}
                      <div style={{ fontSize: 28, marginBottom: 4 }}>{animal.emoji}</div>
                      <div style={{ fontSize: 11, fontWeight: 600 }}>{animal.individual || animal.name.split(' ').pop()}</div>
                    </motion.button>
                  ))}
                </div>

                <button onClick={handleGenerate} className="btn btn-primary btn-full btn-lg">
                  <Sparkles size={18} /> Generate My Plan
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  )
}

/* ============================================
   Add-Ons Section (used in Itinerary Result)
   ============================================ */

function AddOnsSection() {
  const [selected, setSelected] = useState<string[]>([])
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  const addOns = [
    { id: 'parking', label: 'Preferred Parking', desc: 'Reserved spot near main entrance', price: '$15', emoji: '🅿️' },
    { id: 'guided-tour', label: 'Guided Tour Upgrade', desc: 'Expert-led 90min guided tour', price: '$25/person', emoji: '🎙️' },
    { id: 'meal-deal', label: 'Family Meal Deal', desc: '4 meals + 4 drinks + 2 snacks', price: '$68', emoji: '🍔', badge: 'Save 20%' },
    { id: 'photo-pass', label: 'Photo Pass', desc: 'Unlimited digital photos all day', price: '$30', emoji: '📸' },
  ]

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  return (
    <div style={{ marginTop: 20 }}>
      <div className="t-heading" style={{ marginBottom: 12 }}>Enhance Your Day</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        {addOns.map(addon => (
          <motion.button
            key={addon.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggle(addon.id)}
            className="card"
            style={{
              padding: 14,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              width: '100%',
              textAlign: 'left',
              border: selected.includes(addon.id) ? '2px solid var(--green-rich)' : '1.5px solid var(--border)',
              background: selected.includes(addon.id) ? 'var(--green-pale)' : 'var(--bg-card)',
              transition: 'all 0.2s ease',
              position: 'relative',
            }}
          >
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: selected.includes(addon.id) ? 'var(--green-light)' : 'var(--bg-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, flexShrink: 0,
            }}>
              {addon.emoji}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{addon.label}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{addon.desc}</div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{addon.price}</div>
              {addon.badge && (
                <span className="badge" style={{ background: 'var(--coral-pale)', color: 'var(--coral)', fontSize: 9, marginTop: 2 }}>
                  {addon.badge}
                </span>
              )}
            </div>
            {selected.includes(addon.id) && (
              <div style={{
                position: 'absolute', top: 6, right: 6,
                width: 18, height: 18, borderRadius: '50%',
                background: 'var(--green-rich)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Check size={11} color="white" />
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Promo Code */}
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Tag size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
          <input
            type="text"
            value={promoCode}
            onChange={e => { setPromoCode(e.target.value); setPromoApplied(false) }}
            placeholder="Promo code"
            className="input"
            style={{ paddingLeft: 34, fontSize: 14 }}
          />
        </div>
        <button
          onClick={() => promoCode && setPromoApplied(true)}
          className="btn btn-secondary"
          style={{ flexShrink: 0, fontSize: 13 }}
        >
          Apply
        </button>
      </div>
      {promoApplied && (
        <div style={{
          marginTop: 8, padding: 8, borderRadius: 'var(--radius-sm)',
          background: 'var(--green-pale)', fontSize: 12, color: 'var(--green-rich)',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <Check size={14} /> Code applied — 10% off add-ons
        </div>
      )}
    </div>
  )
}

/* ============================================
   Itinerary Result
   ============================================ */

export function ItineraryResult() {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)' }}>
        <BackHeader title="Your Plan" />

        <div style={{ padding: '0 20px 120px' }}>
          {/* Header info */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 16 }}>
            <div>
              <div className="t-display-sm">Saturday, Feb 21</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Family · 2 adults, 2 kids</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>7 stops</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>9am – 1pm · 2.4 mi</div>
            </div>
          </div>

          {/* Mini Map */}
          <div
            onClick={() => navigate('/map')}
            style={{
              height: 120,
              borderRadius: 'var(--radius-lg)',
              background: 'linear-gradient(135deg, #D4E8D1, #EDE8E0)',
              marginBottom: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ fontSize: 24, letterSpacing: 8 }}>🦁→🦒→🍽️→🐘→🐧→🦍→🐻‍❄️</div>
            <div style={{
              position: 'absolute',
              bottom: 8,
              right: 12,
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--green-rich)',
            }}>View Full Map →</div>
          </div>

          {/* Timeline */}
          {defaultPlanStops.map((stop, i) => (
            <motion.div
              key={stop.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              style={{ display: 'flex', gap: 14, marginBottom: 4 }}
            >
              {/* Timeline line */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: 24,
              }}>
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: 'var(--green-deep)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontWeight: 700,
                  flexShrink: 0,
                }}>{i + 1}</div>
                {i < defaultPlanStops.length - 1 && (
                  <div style={{
                    width: 2,
                    flex: 1,
                    background: 'var(--border)',
                    margin: '4px 0',
                    minHeight: 20,
                  }} />
                )}
              </div>

              {/* Content */}
              <div className="card" style={{
                flex: 1,
                padding: 14,
                marginBottom: 8,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{stop.emoji} {stop.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                      {stop.time} · {stop.duration}
                    </div>
                  </div>
                </div>
                <div style={{
                  marginTop: 6,
                  fontSize: 12,
                  color: 'var(--green-rich)',
                  lineHeight: 1.4,
                  display: 'flex',
                  alignItems: 'start',
                  gap: 4,
                }}>
                  <Sparkles size={12} style={{ flexShrink: 0, marginTop: 1 }} />
                  {stop.insight}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Add-ons */}
          <AddOnsSection />

          {/* Booking Summary */}
          <div className="card" style={{ marginTop: 12, padding: 16 }}>
            <div className="t-heading" style={{ marginBottom: 12 }}>Booking Summary</div>
            {[
              { item: '2x Adult General Admission', price: '$64.00' },
              { item: '2x Child (3-11)', price: '$48.00' },
              { item: '1x Single Stroller', price: '$12.00' },
            ].map(line => (
              <div key={line.item} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 6 }}>
                <span style={{ color: 'var(--text-secondary)' }}>{line.item}</span>
                <span style={{ fontWeight: 600 }}>{line.price}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: 8, marginTop: 8, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 700 }}>Total</span>
              <span style={{ fontWeight: 700, fontSize: 18 }}>$124.00</span>
            </div>
          </div>

          {/* Actions */}
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button onClick={() => navigate('/payment')} className="btn btn-primary btn-full btn-lg">
              Purchase & Confirm Plan
            </button>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-secondary" style={{ flex: 1 }}><Share2 size={16} /> Share</button>
              <button className="btn btn-secondary" style={{ flex: 1 }}><Bookmark size={16} /> Save</button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

/* ============================================
   Curated Plan Detail
   ============================================ */

export function CuratedPlanDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const plan = curatedPlans.find(p => p.id === id) || curatedPlans[0]

  return (
    <PageTransition>
      <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)' }}>
        <BackHeader title={plan.title} />

        <div style={{ padding: '0 20px 120px' }}>
          {/* Hero */}
          <div style={{
            height: 180,
            borderRadius: 'var(--radius-xl)',
            background: 'linear-gradient(135deg, var(--green-deep), var(--green-mid))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
          }}>
            <span style={{ fontSize: 72 }}>{plan.icon}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <h2 className="t-display-md">{plan.title}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--gold)', fontWeight: 700 }}>
              <Star size={16} fill="currentColor" /> {plan.rating}
            </div>
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>
            {plan.visitors.toLocaleString()} visitors · Curated by San Diego Zoo
          </div>

          <p style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--text-secondary)', marginBottom: 16 }}>
            {plan.desc}
          </p>

          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <div className="card" style={{ flex: 1, padding: 12, textAlign: 'center' }}>
              <div style={{ fontSize: 20 }}>🏛️</div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{plan.exhibits}</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Exhibits</div>
            </div>
            <div className="card" style={{ flex: 1, padding: 12, textAlign: 'center' }}>
              <div style={{ fontSize: 20 }}>⏱️</div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{plan.duration}</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Duration</div>
            </div>
            <div className="card" style={{ flex: 1, padding: 12, textAlign: 'center' }}>
              <div style={{ fontSize: 20 }}>🚶</div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{plan.distance}</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Distance</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 24 }}>
            {plan.tags.map(tag => (
              <span key={tag} className="badge badge-active">{tag}</span>
            ))}
          </div>

          <button onClick={() => navigate('/payment')} className="btn btn-primary btn-full btn-lg" style={{ marginBottom: 8 }}>
            Use This Plan
          </button>
          <button onClick={() => navigate('/plan/builder')} className="btn btn-secondary btn-full">
            Customize First
          </button>
        </div>
      </div>
    </PageTransition>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Crown, Star, Zap, Eye, Coffee, Users, MapPin, ChevronDown, Check, ArrowRight, Sparkles, Shield } from 'lucide-react'
import { BackHeader, PageTransition } from '../../components'

const benefits = [
  {
    icon: Zap,
    title: 'Priority Entry',
    desc: 'Skip all queues at the main gate and ride entrances',
  },
  {
    icon: Eye,
    title: 'Backstage Tours',
    desc: 'Go behind the scenes at select animal habitats',
  },
  {
    icon: Star,
    title: 'Premium Seating',
    desc: 'Reserved front-row seats at all shows and demonstrations',
  },
  {
    icon: Coffee,
    title: 'VIP Lounge Access',
    desc: 'Relax in the exclusive lounge with complimentary refreshments',
  },
  {
    icon: Users,
    title: 'Dedicated Guide',
    desc: 'Personal zoo guide for 2 hours during your visit',
  },
  {
    icon: MapPin,
    title: 'Reserved Parking',
    desc: 'Premium parking spot closest to the main entrance',
  },
]

const whatYouGet = [
  'Express entry at all gates and exhibits',
  'Reserved premium seating at all shows',
  'Access to VIP lounge with refreshments',
  '2-hour personal guide session',
  'Behind-the-scenes habitat tour (1 session)',
  'Exclusive souvenir gift bag',
  'Priority access to feeding experiences',
  'Complimentary stroller or wheelchair rental',
]

const howItWorks = [
  { step: 1, title: 'Add to Your Ticket', desc: 'Select Premier Access while booking or upgrade anytime before your visit' },
  { step: 2, title: 'Get Your Gold Pass', desc: 'A special gold QR code will be added to your digital ticket' },
  { step: 3, title: 'Enjoy the Benefits', desc: 'Show your gold pass at any queue, show, or VIP area for instant access' },
]

const importantInfo = [
  { title: 'Availability', content: 'Premier Access is limited to 50 passes per day to ensure an exclusive experience. Book early to secure your upgrade.' },
  { title: 'Upgrade Policy', content: 'Premier Access can be added during booking or upgraded up to 2 hours before your visit time. No partial-day upgrades available.' },
  { title: 'Refund Policy', content: 'Premier Access follows the same cancellation policy as your base ticket. Full refund if cancelled 48 hours before visit date.' },
]

export default function PremierAccess() {
  const navigate = useNavigate()
  const [expandedInfo, setExpandedInfo] = useState<string | null>(null)

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title="Premier Access" />

        <div style={{ padding: '0 24px 120px' }}>
          {/* Gold Hero Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              marginBottom: 28,
              position: 'relative',
              background: 'linear-gradient(145deg, #2A1F0A 0%, #4A3510 40%, #2A1F0A 100%)',
              border: '1.5px solid rgba(197, 214, 58, 0.3)',
            }}
          >
            {/* Shimmer effect */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(110deg, transparent 30%, rgba(197,214,58,0.06) 50%, transparent 70%)',
              animation: 'shimmer 3s infinite',
              backgroundSize: '200% 100%',
              pointerEvents: 'none',
            }} />

            <div style={{ padding: '32px 24px', textAlign: 'center', position: 'relative' }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 'var(--radius-full)',
                  background: 'linear-gradient(135deg, var(--gold), var(--yellow-medium))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  boxShadow: '0 8px 32px rgba(197, 214, 58, 0.3)',
                }}
              >
                <Crown size={32} color="white" />
              </motion.div>

              <div style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
                Go Beyond Ordinary
              </div>
              <h1 className="t-display-xl" style={{ color: 'white', marginBottom: 8 }}>
                FASTER
              </h1>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 20, lineHeight: 1.5 }}>
                The ultimate zoo experience with priority access, exclusive areas, and personal service
              </p>

              <div style={{
                display: 'inline-flex',
                alignItems: 'baseline',
                gap: 4,
                padding: '12px 28px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(197, 214, 58, 0.15)',
                border: '1px solid rgba(197, 214, 58, 0.3)',
              }}>
                <span style={{ fontSize: 28, fontWeight: 800, color: 'var(--gold)', fontFamily: 'var(--font-display)' }}>
                  {'\u20B9'}500
                </span>
                <span style={{ fontSize: 13, color: 'rgba(197, 214, 58, 0.7)' }}>/person</span>
              </div>
            </div>
          </motion.div>

          {/* Benefits Grid */}
          <div style={{ marginBottom: 32 }}>
            <h2 className="t-display-md" style={{ marginBottom: 16 }}>Benefits</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {benefits.map((benefit, i) => {
                const Icon = benefit.icon
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.06 }}
                    className="card"
                    style={{ padding: 16 }}
                  >
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--gold-pale)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 10,
                    }}>
                      <Icon size={20} color="var(--yellow-medium)" />
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{benefit.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{benefit.desc}</div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* What You Get */}
          <div style={{ marginBottom: 32 }}>
            <h2 className="t-display-md" style={{ marginBottom: 16 }}>What You Get</h2>
            <div className="card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {whatYouGet.map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 22,
                      height: 22,
                      borderRadius: 'var(--radius-full)',
                      background: 'linear-gradient(135deg, var(--gold), var(--yellow-medium))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Check size={12} color="white" strokeWidth={3} />
                    </div>
                    <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div style={{ marginBottom: 32 }}>
            <h2 className="t-display-md" style={{ marginBottom: 20 }}>How It Works</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {howItWorks.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}
                >
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 'var(--radius-full)',
                    background: 'linear-gradient(135deg, var(--gold), var(--yellow-medium))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: 16,
                    fontWeight: 800,
                    color: 'white',
                  }}>
                    {step.step}
                  </div>
                  <div style={{ flex: 1, paddingTop: 2 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{step.title}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{step.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Important Information */}
          <div style={{ marginBottom: 32 }}>
            <h2 className="t-display-md" style={{ marginBottom: 16 }}>Important Information</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {importantInfo.map(info => (
                <div key={info.title} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                  <button
                    onClick={() => setExpandedInfo(expandedInfo === info.title ? null : info.title)}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                    }}
                  >
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{info.title}</span>
                    <motion.div
                      animate={{ rotate: expandedInfo === info.title ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={18} color="var(--text-tertiary)" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {expandedInfo === info.title && (
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
                          {info.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="btn btn-gold btn-full btn-lg"
            onClick={() => navigate(-1)}
            style={{
              boxShadow: '0 8px 24px rgba(197, 214, 58, 0.3)',
            }}
          >
            <Crown size={18} /> ADD TO TICKET — {'\u20B9'}500
          </motion.button>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            marginTop: 12,
            fontSize: 12,
            color: 'var(--text-tertiary)',
          }}>
            <Shield size={12} />
            Limited to 50 passes per day
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, GraduationCap, Ticket, Crown, ChevronRight, ChevronDown, QrCode, ShieldCheck, CreditCard, Clock, Zap, Star, Check } from 'lucide-react'
import { BackHeader, PageTransition } from '../../components'

const ticketTypes = [
  {
    id: 'general',
    name: 'General Entry Ticket',
    description: 'Full-day access to all public exhibits, animal encounters, and daily shows.',
    icon: Ticket,
    color: 'var(--green-rich)',
    bgColor: 'var(--green-pale)',
    features: [
      'Access to all public exhibits & zones',
      'Daily animal keeper talks',
      'Live shows & demonstrations',
      'Children\'s play areas',
      'Free zoo map & guide',
    ],
    priceFrom: 500,
  },
  {
    id: 'group',
    name: 'Group Entry Ticket',
    description: 'Discounted rates for groups of 10 or more. Perfect for family reunions and outings.',
    icon: Users,
    color: 'var(--sky)',
    bgColor: 'var(--sky-pale)',
    features: [
      'All General Entry benefits',
      'Group discount (10+ visitors)',
      'Dedicated group entrance',
      'Group coordinator support',
      'Flexible date rebooking',
    ],
    priceFrom: 400,
  },
  {
    id: 'educational',
    name: 'Educational Visit Ticket',
    description: 'Tailored experience for schools and educational institutions with guided learning.',
    icon: GraduationCap,
    color: 'var(--amber)',
    bgColor: 'var(--orange-pale)',
    features: [
      'All General Entry benefits',
      'Guided educational tour',
      'Worksheet & activity pack',
      'Behind-the-scenes access',
      'Certificate of participation',
    ],
    priceFrom: 350,
  },
]

const howItWorks = [
  { step: '01', title: 'Choose Ticket', desc: 'Select your ticket type and preferred date', icon: Ticket },
  { step: '02', title: 'Book & Pay', desc: 'Secure checkout with multiple payment options', icon: CreditCard },
  { step: '03', title: 'Enter with QR', desc: 'Show your digital ticket at the gate — no printing needed', icon: QrCode },
]

const whyBookOnline = [
  { title: 'Skip the Queue', desc: 'Walk straight in with your digital pass', icon: Zap },
  { title: 'Guaranteed Entry', desc: 'Secure your spot even on peak days', icon: ShieldCheck },
  { title: 'Secure Payments', desc: 'Encrypted checkout with trusted gateways', icon: CreditCard },
]

const importantInfo = [
  { title: 'Entry & Timings', content: 'The zoo is open from 9:00 AM to 5:30 PM. Last entry at 4:30 PM. Gates open 15 minutes before scheduled time. Please arrive at least 10 minutes early.' },
  { title: 'Cancellation Policy', content: 'Full refund if cancelled 48 hours before visit date. 50% refund for cancellations within 24-48 hours. No refund for same-day cancellations.' },
  { title: 'Children & Infants', content: 'Children under 3 years enter free. Children aged 3-12 require a child ticket. All children must be accompanied by an adult.' },
  { title: 'Accessibility', content: 'Wheelchair accessible pathways available. Service animals are welcome. Assistive devices can be borrowed at the entrance. Contact us for special requirements.' },
]

export default function TicketTypes() {
  const navigate = useNavigate()
  const [expandedInfo, setExpandedInfo] = useState<string | null>(null)

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title="Buy Ticket" />

        {/* Hero Image */}
        <div style={{
          margin: '0 24px 24px',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          position: 'relative',
          height: 180,
          background: 'linear-gradient(135deg, var(--green-deep) 0%, var(--green-rich) 100%)',
        }}>
          <img
            src="https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=800&h=400&fit=crop"
            alt="Zoo entrance"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
          />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '24px 20px',
            background: 'linear-gradient(transparent, rgba(13,26,13,0.85))',
          }}>
            <h1 className="t-display-lg" style={{ color: 'white', marginBottom: 4 }}>
              Plan Your Visit
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>
              Choose the perfect ticket for your adventure
            </p>
          </div>
        </div>

        <div style={{ padding: '0 24px 120px' }}>
          {/* Ticket Type Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
            {ticketTypes.map((ticket, i) => {
              const Icon = ticket.icon
              return (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="card card-elevated"
                  style={{ padding: 0, overflow: 'hidden' }}
                >
                  {/* Card Header */}
                  <div style={{
                    padding: '20px 20px 16px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 14,
                  }}>
                    <div style={{
                      width: 48,
                      height: 48,
                      borderRadius: 'var(--radius-md)',
                      background: ticket.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Icon size={24} color={ticket.color} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 className="t-display-sm" style={{ marginBottom: 4 }}>{ticket.name}</h3>
                      <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                        {ticket.description}
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div style={{ padding: '0 20px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {ticket.features.map(feature => (
                      <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 18,
                          height: 18,
                          borderRadius: 'var(--radius-full)',
                          background: ticket.bgColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}>
                          <Check size={11} color={ticket.color} strokeWidth={3} />
                        </div>
                        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price + CTA */}
                  <div style={{
                    padding: '14px 20px',
                    borderTop: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'var(--bg-primary)',
                  }}>
                    <div>
                      <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>From </span>
                      <span style={{ fontSize: 22, fontWeight: 800, fontFamily: 'var(--font-display)' }}>
                        {'\u20B9'}{ticket.priceFrom}
                      </span>
                      <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}> /person</span>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="btn btn-primary btn-sm"
                      onClick={() => navigate(`/tickets/select?type=${ticket.id}`)}
                      style={{ gap: 6 }}
                    >
                      SEE PRICES <ChevronRight size={14} />
                    </motion.button>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Premier Access Upgrade */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card"
            style={{
              background: 'linear-gradient(135deg, #2A1F0A 0%, #4A3510 50%, #2A1F0A 100%)',
              border: '1px solid rgba(197, 214, 58, 0.3)',
              padding: 0,
              overflow: 'hidden',
              marginBottom: 32,
            }}
          >
            <div style={{ padding: '24px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 'var(--radius-full)',
                  background: 'linear-gradient(135deg, var(--gold), var(--yellow-medium))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Crown size={20} color="white" />
                </div>
                <div>
                  <h3 className="t-display-sm" style={{ color: 'var(--gold)' }}>Premier Access</h3>
                  <span style={{ fontSize: 12, color: 'rgba(197, 214, 58, 0.7)' }}>Upgrade your experience</span>
                </div>
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, marginBottom: 16 }}>
                Skip the queues, get exclusive behind-the-scenes tours, and enjoy premium seating at all shows.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                {['Priority Entry', 'VIP Lounge', 'Backstage Tours', 'Premium Seating'].map(b => (
                  <span key={b} style={{
                    padding: '5px 12px',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(197, 214, 58, 0.15)',
                    color: 'var(--gold)',
                    fontSize: 11,
                    fontWeight: 600,
                    border: '1px solid rgba(197, 214, 58, 0.2)',
                  }}>
                    {b}
                  </span>
                ))}
              </div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="btn btn-gold btn-full"
                onClick={() => navigate('/tickets/premier')}
              >
                <Crown size={16} /> Learn More <ChevronRight size={16} />
              </motion.button>
            </div>
          </motion.div>

          {/* How It Works */}
          <div style={{ marginBottom: 32 }}>
            <h2 className="t-display-md" style={{ marginBottom: 20 }}>How It Works</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {howItWorks.map((step, i) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    style={{ display: 'flex', alignItems: 'center', gap: 16 }}
                  >
                    <div style={{
                      width: 52,
                      height: 52,
                      borderRadius: 'var(--radius-lg)',
                      background: 'var(--green-pale)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      position: 'relative',
                    }}>
                      <Icon size={22} color="var(--green-rich)" />
                      <span style={{
                        position: 'absolute',
                        top: -4,
                        right: -4,
                        width: 20,
                        height: 20,
                        borderRadius: 'var(--radius-full)',
                        background: 'var(--green-deep)',
                        color: 'white',
                        fontSize: 10,
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        {step.step}
                      </span>
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{step.title}</div>
                      <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{step.desc}</div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Why Book Online */}
          <div style={{ marginBottom: 32 }}>
            <h2 className="t-display-md" style={{ marginBottom: 20 }}>Why Book Online?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              {whyBookOnline.map(item => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className="card"
                    style={{ padding: 16, textAlign: 'center' }}
                  >
                    <div style={{
                      width: 44,
                      height: 44,
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--green-pale)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 10px',
                    }}>
                      <Icon size={20} color="var(--green-rich)" />
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{item.desc}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Important Information */}
          <div>
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
        </div>
      </div>
    </PageTransition>
  )
}

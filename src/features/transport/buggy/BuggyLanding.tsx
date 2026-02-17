import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, Car, Shield, Clock, ChevronRight, Zap } from 'lucide-react'
import { BackHeader, PageTransition } from '../../../components'

export default function BuggyLanding({ embedded }: { embedded?: boolean }) {
  const navigate = useNavigate()

  const content = (
    <div style={{ padding: '20px 24px 120px' }}>
      {/* Header Description */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: 20 }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 8,
        }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 'var(--radius-md)',
            background: 'var(--gold-pale)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Zap size={22} color="var(--gold)" />
          </div>
          <div>
            <h2 className="t-display-sm">On-Demand Buggy Service</h2>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              Comfortable rides across the zoo
            </p>
          </div>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          Book a buggy for a quick, comfortable ride between zones. Choose between a shared option at a per-seat rate or a private buggy for your group.
        </p>
      </motion.div>

      {/* Choose Your Buggy */}
      <h3 className="t-display-sm" style={{ marginBottom: 14 }}>Choose Your Buggy</h3>

      {/* Shared Buggy Card */}
      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/transport/buggy/booking?type=shared')}
        className="card"
        style={{
          width: '100%',
          padding: 0,
          marginBottom: 14,
          overflow: 'hidden',
          textAlign: 'left',
          cursor: 'pointer',
        }}
      >
        {/* Image Area */}
        <div style={{
          height: 140,
          background: 'linear-gradient(135deg, var(--green-pale) 0%, var(--green-light) 50%, var(--gold-pale) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
          <motion.span
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ fontSize: 60 }}
          >
            🛺
          </motion.span>
          <span className="badge badge-active" style={{
            position: 'absolute',
            top: 12,
            left: 12,
            fontSize: 10,
          }}>
            <Users size={10} /> Shared
          </span>
        </div>

        <div style={{ padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <h4 className="t-display-sm">Shared Buggy</h4>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--green-deep)', fontFamily: 'var(--font-display)' }}>
                ₹49
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>per seat</div>
            </div>
          </div>

          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: 12 }}>
            Share a ride with other visitors. Economical and fun way to travel between zones.
          </p>

          <div style={{ display: 'flex', gap: 12, fontSize: 12, color: 'var(--text-secondary)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Users size={12} color="var(--green-rich)" /> Up to 6 people
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Clock size={12} color="var(--green-rich)" /> 5-10 min wait
            </span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 6,
            marginTop: 12,
            color: 'var(--green-rich)',
            fontWeight: 600,
            fontSize: 13,
          }}>
            Book Now <ChevronRight size={16} />
          </div>
        </div>
      </motion.button>

      {/* Private Buggy Card */}
      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/transport/buggy/booking?type=private')}
        className="card"
        style={{
          width: '100%',
          padding: 0,
          marginBottom: 20,
          overflow: 'hidden',
          textAlign: 'left',
          cursor: 'pointer',
          border: '2px solid var(--gold-light)',
        }}
      >
        {/* Image Area */}
        <div style={{
          height: 140,
          background: 'linear-gradient(135deg, var(--gold-pale) 0%, var(--gold-light) 50%, var(--green-pale) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
          <motion.span
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            style={{ fontSize: 60 }}
          >
            🏎️
          </motion.span>
          <span className="badge badge-gold" style={{
            position: 'absolute',
            top: 12,
            left: 12,
            fontSize: 10,
          }}>
            <Shield size={10} /> Private
          </span>
          <span className="badge" style={{
            position: 'absolute',
            top: 12,
            right: 12,
            fontSize: 10,
            background: 'var(--coral-pale)',
            color: 'var(--coral)',
          }}>
            Popular
          </span>
        </div>

        <div style={{ padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <h4 className="t-display-sm">Private Buggy</h4>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--green-deep)', fontFamily: 'var(--font-display)' }}>
                ₹199
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>per ride</div>
            </div>
          </div>

          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: 12 }}>
            Exclusive buggy for your group. Direct route, no sharing. Perfect for families with kids.
          </p>

          <div style={{ display: 'flex', gap: 12, fontSize: 12, color: 'var(--text-secondary)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Car size={12} color="var(--gold)" /> Exclusive ride
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Clock size={12} color="var(--gold)" /> 2-3 min pickup
            </span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 6,
            marginTop: 12,
            color: 'var(--green-rich)',
            fontWeight: 600,
            fontSize: 13,
          }}>
            Book Now <ChevronRight size={16} />
          </div>
        </div>
      </motion.button>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        style={{ display: 'flex', gap: 10 }}
      >
        {[
          { icon: '🔋', label: 'Electric', desc: 'Eco-friendly' },
          { icon: '🛡️', label: 'Insured', desc: 'Full coverage' },
          { icon: '♿', label: 'Accessible', desc: 'Wheelchair OK' },
        ].map(feat => (
          <div key={feat.label} style={{
            flex: 1,
            padding: '14px 8px',
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>{feat.icon}</div>
            <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 2 }}>{feat.label}</div>
            <div style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>{feat.desc}</div>
          </div>
        ))}
      </motion.div>
    </div>
  )

  if (embedded) return content

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title="Transport" />
        {content}
      </div>
    </PageTransition>
  )
}

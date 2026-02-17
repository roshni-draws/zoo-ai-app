import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Users, Car, ChevronRight } from 'lucide-react'
import { BackHeader, PageTransition } from '../../../components'

export default function BuggyConfirmation() {
  const navigate = useNavigate()

  const bookingDetails = {
    type: 'Private Buggy',
    adults: 2,
    children: 1,
    pickup: 'Main Entrance Gate',
    drop: 'Africa Rocks',
    buggyFare: 199,
    addonPrice: 5,
    total: 204,
  }

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title="Buggy Tour" />

        <div style={{ padding: '0 24px 120px' }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', padding: '8px 0 20px' }}
          >
            <div style={{
              width: 56, height: 56, borderRadius: 'var(--radius-lg)',
              background: 'var(--gold-pale)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 10px', fontSize: 28,
            }}>
              🏎️
            </div>
            <h2 className="t-display-md">Confirm Your Booking</h2>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>Review details before payment</p>
          </motion.div>

          {/* Guest Info */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
            style={{ padding: 16, marginBottom: 14 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <Users size={16} color="var(--green-rich)" />
              <span className="t-heading">Guests</span>
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{
                flex: 1,
                padding: '12px',
                background: 'var(--green-pale)',
                borderRadius: 'var(--radius-md)',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--green-deep)' }}>{bookingDetails.adults}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Adults</div>
              </div>
              <div style={{
                flex: 1,
                padding: '12px',
                background: 'var(--gold-pale)',
                borderRadius: 'var(--radius-md)',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--green-deep)' }}>{bookingDetails.children}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Children</div>
              </div>
            </div>
          </motion.div>

          {/* Location Details */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
            style={{ padding: 16, marginBottom: 14 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <MapPin size={16} color="var(--green-rich)" />
              <span className="t-heading">Location Details</span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px',
              background: 'var(--bg-primary)',
              borderRadius: 'var(--radius-md)',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--green-rich)' }} />
                <div style={{ width: 1, height: 20, borderLeft: '2px dashed var(--border)' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--coral)' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Pickup</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{bookingDetails.pickup}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Drop</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{bookingDetails.drop}</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Fare Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
            style={{ padding: 16, marginBottom: 24 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <Car size={16} color="var(--green-rich)" />
              <span className="t-heading">Fare Breakdown</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-light)' }}>
              <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Total Buggy Fare</span>
              <span style={{ fontSize: 14, fontWeight: 600 }}>₹{bookingDetails.buggyFare}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-light)' }}>
              <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Service Add-on</span>
              <span style={{ fontSize: 14, fontWeight: 600 }}>₹{bookingDetails.addonPrice}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0 0', marginTop: 4 }}>
              <span style={{ fontSize: 16, fontWeight: 800 }}>Total</span>
              <span style={{ fontSize: 22, fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--green-deep)' }}>
                ₹{bookingDetails.total}
              </span>
            </div>
          </motion.div>

          {/* Confirm Pay Button */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={() => navigate('/transport/buggy/payment')}
              className="btn btn-primary btn-full"
              style={{ padding: 16, fontSize: 16, fontWeight: 700, letterSpacing: '0.05em' }}
            >
              CONFIRM PAY · ₹{bookingDetails.total}
            </button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}

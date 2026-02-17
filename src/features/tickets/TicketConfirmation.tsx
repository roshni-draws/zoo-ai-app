import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, Download, Calendar, MapPin, Users, Clock, Info, Ticket, Smartphone, ChevronRight } from 'lucide-react'
import { BackHeader, PageTransition } from '../../components'

const beforeVisit = [
  'Download your digital ticket or take a screenshot of the QR code',
  'Arrive at least 15 minutes before the gate opens',
  'Wear comfortable walking shoes and sun protection',
  'Check the weather forecast and dress accordingly',
]

const onTheDay = [
  'Show your QR code at the main entrance scanner',
  'Collect your zoo map at the information desk',
  'Check the daily schedule board for show timings',
  'Premier Access holders: use the priority lane at the entrance',
]

export default function TicketConfirmation() {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title="" />

        <div style={{ padding: '0 24px 120px' }}>
          {/* Success Animation */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              style={{
                width: 88,
                height: 88,
                borderRadius: '50%',
                background: 'var(--green-rich)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                boxShadow: '0 8px 32px rgba(46, 107, 52, 0.3)',
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
              >
                <Check size={44} color="white" strokeWidth={3} />
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="t-display-xl"
              style={{ marginBottom: 8 }}
            >
              You're All Set!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}
            >
              Your booking has been confirmed. Check your email for the receipt.
            </motion.p>
          </div>

          {/* Ticket Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="card card-elevated"
            style={{ padding: 0, overflow: 'hidden', marginBottom: 24 }}
          >
            {/* Zoo Image Banner */}
            <div style={{
              height: 120,
              position: 'relative',
              background: 'linear-gradient(135deg, var(--green-deep), var(--green-rich))',
            }}>
              <img
                src="https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=800&h=300&fit=crop"
                alt="Zoo"
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '16px 20px',
                background: 'linear-gradient(transparent, rgba(13,26,13,0.8))',
              }}>
                <div style={{ color: 'white', fontWeight: 700, fontSize: 18 }}>General Entry Ticket</div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>Booking #ZOO-2026-0217-4829</div>
              </div>
            </div>

            {/* Ticket Details */}
            <div style={{ padding: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Calendar size={16} color="var(--green-rich)" />
                  <span style={{ fontSize: 14 }}>Saturday, 22 February 2026</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Clock size={16} color="var(--green-rich)" />
                  <span style={{ fontSize: 14 }}>9:00 AM - 5:30 PM</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Users size={16} color="var(--green-rich)" />
                  <span style={{ fontSize: 14 }}>2 Adults, 1 Child</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <MapPin size={16} color="var(--green-rich)" />
                  <span style={{ fontSize: 14 }}>Main Entrance, Gate 1</span>
                </div>
              </div>

              {/* Dotted Separator */}
              <div style={{
                borderTop: '2px dashed var(--border)',
                margin: '0 -20px',
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute',
                  left: -12,
                  top: -12,
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: 'var(--bg-primary)',
                }} />
                <div style={{
                  position: 'absolute',
                  right: -12,
                  top: -12,
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: 'var(--bg-primary)',
                }} />
              </div>

              {/* QR Code Placeholder */}
              <div style={{ textAlign: 'center', padding: '24px 0 8px' }}>
                <div style={{
                  width: 160,
                  height: 160,
                  margin: '0 auto 12px',
                  background: 'var(--bg-primary)',
                  borderRadius: 'var(--radius-md)',
                  padding: 12,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                }}>
                  {/* QR code pattern */}
                  {Array.from({ length: 8 }).map((_, row) => (
                    <div key={row} style={{ display: 'flex', gap: 4, flex: 1 }}>
                      {Array.from({ length: 8 }).map((_, col) => (
                        <div
                          key={col}
                          style={{
                            flex: 1,
                            borderRadius: 2,
                            background: (
                              // Corner patterns
                              (row < 2 && col < 2) ||
                              (row < 2 && col > 5) ||
                              (row > 5 && col < 2) ||
                              // Random middle fills
                              Math.random() > 0.5
                            ) ? 'var(--green-deep)' : 'var(--border-light)',
                          }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Scan at entrance</div>
              </div>
            </div>
          </motion.div>

          {/* Important Information */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            style={{ marginBottom: 24 }}
          >
            <h2 className="t-display-sm" style={{ marginBottom: 16 }}>Important Information</h2>

            {/* Before You Visit */}
            <div className="card" style={{ padding: 20, marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--green-pale)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Info size={16} color="var(--green-rich)" />
                </div>
                <span className="t-heading">Before You Visit</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {beforeVisit.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: 'var(--green-mid)',
                      flexShrink: 0,
                      marginTop: 6,
                    }} />
                    <span style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* On the Day */}
            <div className="card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--gold-pale)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Ticket size={16} color="var(--yellow-medium)" />
                </div>
                <span className="t-heading">On the Day</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {onTheDay.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: 'var(--gold)',
                      flexShrink: 0,
                      marginTop: 6,
                    }} />
                    <span style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
          >
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="btn btn-primary btn-full btn-lg"
            >
              <Download size={18} /> Download Ticket
            </motion.button>

            {/* Digital Pass */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="card"
              onClick={() => navigate('/profile/wallet')}
              style={{
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                width: '100%',
                textAlign: 'left',
                background: 'var(--green-pale)',
                borderColor: 'var(--green-light)',
              }}
            >
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 'var(--radius-md)',
                background: 'var(--green-rich)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Smartphone size={18} color="white" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Digital Pass</div>
                <div style={{ fontSize: 12, color: 'var(--green-rich)' }}>
                  Added to your Wallet for quick access
                </div>
              </div>
              <ChevronRight size={18} color="var(--green-rich)" />
            </motion.button>

            <button
              onClick={() => navigate('/home')}
              className="btn btn-ghost btn-full"
              style={{ marginTop: 4 }}
            >
              Back to Home
            </button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}

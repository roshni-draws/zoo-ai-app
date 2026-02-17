import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BackHeader, PageTransition } from '../../components'

const services = [
  { id: 'discover', label: 'Discover Zones', emoji: '\uD83C\uDF0D', route: '/discover', bgColor: 'var(--green-pale)', color: 'var(--green-rich)' },
  { id: 'animals', label: 'Animal Guide', emoji: '\uD83E\uDD81', route: '/animals', bgColor: 'var(--orange-pale)', color: 'var(--amber)' },
  { id: 'events', label: 'Events & Shows', emoji: '\uD83C\uDFAD', route: '/events', bgColor: 'var(--coral-pale)', color: 'var(--coral)' },
  { id: 'dining', label: 'Dining', emoji: '\uD83C\uDF7D\uFE0F', route: '/dining', bgColor: 'var(--gold-pale)', color: 'var(--yellow-medium)' },
  { id: 'transport', label: 'Transport', emoji: '\uD83D\uDE8C', route: '/transport', bgColor: 'var(--sky-pale)', color: 'var(--sky)' },
  { id: 'tickets', label: 'Buy Tickets', emoji: '\uD83C\uDF9F\uFE0F', route: '/tickets', bgColor: 'var(--green-pale)', color: 'var(--green-rich)' },
  { id: 'shops', label: 'Shops', emoji: '\uD83D\uDECD\uFE0F', route: '/shops', bgColor: 'var(--coral-pale)', color: 'var(--pink-medium)' },
  { id: 'learning', label: 'Learning', emoji: '\uD83D\uDCDA', route: '/learning', bgColor: 'var(--orange-pale)', color: 'var(--amber)' },
  { id: 'kids', label: 'Kids Pack', emoji: '\uD83D\uDC76', route: '/kids', bgColor: 'var(--gold-pale)', color: 'var(--gold)' },
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] } },
}

export default function ServicesHub() {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title="Services & Activities" />

        <div style={{ padding: '0 24px 120px' }}>
          <h2 className="t-display-md" style={{ marginBottom: 4 }}>
            What would you like to do?
          </h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 28 }}>
            Explore all the zoo has to offer
          </p>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 14,
            }}
          >
            {services.map(service => (
              <motion.div
                key={service.id}
                variants={fadeUp}
                whileTap={{ scale: 0.9 }}
                whileHover={{ y: -4, boxShadow: 'var(--shadow-md)' }}
                onClick={() => navigate(service.route)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 10,
                  padding: '20px 12px 16px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--green-pale)',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.2s ease',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: 'var(--radius-full)',
                  background: service.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 28,
                  boxShadow: `0 4px 12px ${service.bgColor}`,
                }}>
                  {service.emoji}
                </div>
                <span style={{
                  fontSize: 12,
                  fontWeight: 600,
                  textAlign: 'center',
                  color: 'var(--text-primary)',
                  lineHeight: 1.3,
                }}>
                  {service.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}

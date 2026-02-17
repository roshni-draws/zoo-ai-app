import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Users } from 'lucide-react'
import { PageTransition, BackHeader } from '../../components'
import { zonesExtended } from '../../data/zones-extended'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] } },
}

export default function DiscoverHome() {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <BackHeader title="Discover" />

      <div className="page-scroll" style={{ paddingTop: 0 }}>
        <h2 className="t-display-md" style={{ marginBottom: 4 }}>
          Select a Place
        </h2>
        <p className="t-body-sm" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)' }}>
          Discover More
        </p>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}
        >
          {zonesExtended.map((zone) => (
            <motion.div
              key={zone.id}
              variants={fadeUp}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(`/discover/zone/${zone.id}`)}
              className="card card-elevated"
              style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}
            >
              {/* Zone Image */}
              <div style={{ position: 'relative', height: 160, overflow: 'hidden' }}>
                <img
                  src={zone.image}
                  alt={zone.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 60,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
                }} />
              </div>

              {/* Zone Info */}
              <div style={{ padding: 'var(--space-lg)' }}>
                <h3 className="t-display-sm" style={{ marginBottom: 4 }}>
                  {zone.name}
                </h3>
                <p className="t-body-sm" style={{
                  color: 'var(--text-secondary)',
                  marginBottom: 'var(--space-md)',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {zone.description}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Users size={14} color="var(--green-rich)" />
                    <span className="t-caption" style={{ color: 'var(--text-secondary)' }}>
                      {zone.animals} animals
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <MapPin size={14} color="var(--green-rich)" />
                    <span className="t-caption" style={{ color: 'var(--text-secondary)' }}>
                      {zone.distance}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageTransition>
  )
}

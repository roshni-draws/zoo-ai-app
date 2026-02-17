import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Car, ShoppingBag, Calendar, MapPin, ChevronRight } from 'lucide-react'
import { PageTransition, BackHeader } from '../../components'
import { zonesExtended } from '../../data/zones-extended'
import { animalsExtended } from '../../data/animals-extended'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.32, 0.72, 0, 1] },
  }),
}

const activityIcons: Record<string, React.ReactNode> = {
  Drive: <Car size={20} />,
  Shop: <ShoppingBag size={20} />,
  'Shows & Events': <Calendar size={20} />,
}

export default function ZoneDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const zone = zonesExtended.find(z => z.id === id)
  if (!zone) {
    return (
      <PageTransition>
        <BackHeader title="Zone" />
        <div className="page-scroll" style={{ textAlign: 'center', paddingTop: 80 }}>
          <p className="t-body" style={{ color: 'var(--text-secondary)' }}>Zone not found</p>
        </div>
      </PageTransition>
    )
  }

  const zoneAnimals = animalsExtended.filter(a => a.zone === zone.name)
  const nearbyZones = zonesExtended.filter(z => z.id !== zone.id).slice(0, 4)

  return (
    <PageTransition>
      <div style={{ position: 'relative' }}>
        {/* Hero Image */}
        <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
          <img
            src={zone.image}
            alt={zone.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: 'var(--space-xl)',
            left: 'var(--space-xl)',
            right: 'var(--space-xl)',
          }}>
            <h1 className="t-display-lg" style={{ color: 'white' }}>{zone.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
              <MapPin size={14} color="rgba(255,255,255,0.8)" />
              <span className="t-body-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
                {zone.distance} away
              </span>
            </div>
          </div>
        </div>

        {/* Sticky back header over hero */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
          <BackHeader title="" />
        </div>
      </div>

      <div className="page-scroll" style={{ paddingTop: 'var(--space-xl)' }}>
        {/* Description */}
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="t-body"
          style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-2xl)', lineHeight: 1.6 }}
        >
          {zone.description}
        </motion.p>

        {/* Activities Grid */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          style={{ marginBottom: 'var(--space-2xl)' }}
        >
          <h3 className="t-display-sm" style={{ marginBottom: 'var(--space-md)' }}>Activities</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-md)' }}>
            {zone.activities.map((activity) => (
              <motion.div
                key={activity}
                whileTap={{ scale: 0.95 }}
                className="card"
                style={{
                  padding: 'var(--space-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 'var(--space-sm)',
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--green-pale)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--green-rich)',
                }}>
                  {activityIcons[activity] || <Calendar size={20} />}
                </div>
                <span className="t-caption" style={{ fontWeight: 600, textAlign: 'center' }}>
                  {activity}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Species & Zones */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          style={{ marginBottom: 'var(--space-2xl)' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
            <h3 className="t-display-sm">Species & Zones</h3>
            <button
              onClick={() => navigate('/discover/species')}
              style={{ color: 'var(--green-rich)', fontSize: 13, fontWeight: 600 }}
            >
              See All
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            {zoneAnimals.slice(0, 4).map((animal) => (
              <motion.div
                key={animal.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/discover/animal/${animal.id}`)}
                className="card"
                style={{
                  padding: 'var(--space-md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-md)',
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}>
                  <img
                    src={animal.image}
                    alt={animal.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>
                    {animal.emoji} {animal.individual || animal.name}
                  </div>
                  <div className="t-caption" style={{ color: 'var(--text-secondary)' }}>
                    {animal.name}
                  </div>
                </div>
                <ChevronRight size={18} color="var(--text-tertiary)" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Map Snippet Placeholder */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          style={{ marginBottom: 'var(--space-2xl)' }}
        >
          <h3 className="t-display-sm" style={{ marginBottom: 'var(--space-md)' }}>Map</h3>
          <div
            className="card"
            style={{
              height: 160,
              background: 'var(--green-pale)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute',
              inset: 0,
              background: `
                radial-gradient(circle at 30% 40%, var(--green-light) 0%, transparent 50%),
                radial-gradient(circle at 70% 60%, var(--gold-pale) 0%, transparent 40%)
              `,
              opacity: 0.6,
            }} />
            <div style={{ textAlign: 'center', zIndex: 1 }}>
              <MapPin size={28} color="var(--green-rich)" />
              <p className="t-body-sm" style={{ color: 'var(--green-rich)', fontWeight: 600, marginTop: 8 }}>
                View on Map
              </p>
            </div>
          </div>
        </motion.div>

        {/* Nearby Zones */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          style={{ marginBottom: 'var(--space-2xl)' }}
        >
          <h3 className="t-display-sm" style={{ marginBottom: 'var(--space-md)' }}>Nearby Zones</h3>
          <div style={{
            display: 'flex',
            gap: 'var(--space-md)',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            paddingBottom: 'var(--space-sm)',
            margin: '0 calc(-1 * var(--space-xl))',
            padding: '0 var(--space-xl) var(--space-sm)',
          }}>
            {nearbyZones.map((nearZone) => (
              <motion.div
                key={nearZone.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/discover/zone/${nearZone.id}`)}
                style={{
                  flexShrink: 0,
                  width: 200,
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  background: 'var(--bg-card)',
                  boxShadow: 'var(--shadow-sm)',
                  cursor: 'pointer',
                }}
              >
                <div style={{ height: 100, overflow: 'hidden' }}>
                  <img
                    src={nearZone.image}
                    alt={nearZone.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                </div>
                <div style={{ padding: 'var(--space-md)' }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{nearZone.name}</div>
                  <div className="t-caption" style={{ color: 'var(--text-secondary)', marginTop: 2 }}>
                    {nearZone.animals} animals &middot; {nearZone.distance}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageTransition>
  )
}

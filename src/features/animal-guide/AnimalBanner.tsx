import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageTransition, BackHeader } from '../../components'
import { animalsExtended } from '../../data/animals-extended'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: [0.32, 0.72, 0, 1] },
  }),
}

const conservationColors: Record<string, { bg: string; text: string }> = {
  'Least Concern': { bg: 'rgba(197,232,200,0.9)', text: 'var(--green-deep)' },
  'Near Threatened': { bg: 'rgba(234,240,176,0.9)', text: 'var(--yellow-dark)' },
  'Vulnerable': { bg: 'rgba(240,200,176,0.9)', text: 'var(--orange-dark)' },
  'Endangered': { bg: 'rgba(232,104,160,0.9)', text: 'white' },
  'Critically Endangered': { bg: 'rgba(232,104,160,0.95)', text: 'white' },
}

function getConservationLabel(conservation: string): string {
  return conservation.split(' \u2014 ')[0].split(' — ')[0].split(' -')[0].trim()
}

export default function AnimalBanner() {
  const navigate = useNavigate()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // Featured animals for the banner carousel
  const featuredAnimals = animalsExtended.filter(a => a.bannerImage).slice(0, 8)

  const handleScroll = () => {
    if (!scrollRef.current) return
    const scrollLeft = scrollRef.current.scrollLeft
    const cardWidth = scrollRef.current.offsetWidth - 48 // account for padding
    const index = Math.round(scrollLeft / cardWidth)
    setActiveIndex(index)
  }

  return (
    <PageTransition>
      <BackHeader title="Featured Animals" />

      <div className="page-scroll" style={{ paddingTop: 0 }}>
        <h2 className="t-display-md" style={{ marginBottom: 4 }}>
          Meet Our Stars
        </h2>
        <p className="t-body-sm" style={{
          color: 'var(--text-secondary)',
          marginBottom: 'var(--space-xl)',
        }}>
          Swipe to discover amazing animals
        </p>

        {/* Swipeable Carousel */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          style={{
            display: 'flex',
            gap: 'var(--space-lg)',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            margin: '0 calc(-1 * var(--space-xl))',
            padding: '0 var(--space-xl)',
            paddingBottom: 'var(--space-lg)',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {featuredAnimals.map((animal, i) => {
            const label = getConservationLabel(animal.conservation)
            const colors = conservationColors[label] || conservationColors['Vulnerable']

            return (
              <motion.div
                key={animal.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/discover/animal/${animal.id}`)}
                style={{
                  flexShrink: 0,
                  width: 'calc(100vw - 48px)',
                  maxWidth: 382,
                  height: 300,
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'pointer',
                  scrollSnapAlign: 'center',
                  background: 'var(--bg-dark)',
                }}
              >
                {/* Full-width Image */}
                <img
                  src={animal.bannerImage}
                  alt={animal.name}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  loading="lazy"
                />

                {/* Gradient Overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.05) 70%)',
                }} />

                {/* Conservation badge at top right */}
                <div style={{
                  position: 'absolute',
                  top: 'var(--space-lg)',
                  right: 'var(--space-lg)',
                }}>
                  <span className="badge" style={{
                    background: colors.bg,
                    color: colors.text,
                    fontSize: 10,
                    backdropFilter: 'blur(8px)',
                  }}>
                    {label}
                  </span>
                </div>

                {/* Content at bottom */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: 'var(--space-xl)',
                }}>
                  <div style={{
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.6)',
                    marginBottom: 4,
                    fontWeight: 500,
                  }}>
                    {animal.zone}
                  </div>
                  <h3 style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: 'white',
                    lineHeight: 1.2,
                    marginBottom: 4,
                    fontFamily: 'var(--font-display)',
                  }}>
                    {animal.name}
                  </h3>
                  {animal.individual && (
                    <p style={{
                      fontSize: 14,
                      color: 'rgba(255,255,255,0.7)',
                    }}>
                      Meet {animal.individual}
                    </p>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Dot indicators */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 6,
          marginTop: 'var(--space-md)',
          marginBottom: 'var(--space-2xl)',
        }}>
          {featuredAnimals.map((_, i) => (
            <div
              key={i}
              style={{
                width: activeIndex === i ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background: activeIndex === i ? 'var(--green-rich)' : 'var(--border)',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>

        {/* Full list below carousel */}
        <h3 className="t-display-sm" style={{ marginBottom: 'var(--space-lg)' }}>
          All Featured
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {featuredAnimals.map((animal, i) => {
            const label = getConservationLabel(animal.conservation)
            const colors = conservationColors[label] || conservationColors['Vulnerable']

            return (
              <motion.div
                key={animal.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/discover/animal/${animal.id}`)}
                className="card"
                style={{
                  padding: 0,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'stretch',
                }}
              >
                {/* Thumbnail */}
                <div style={{ width: 90, flexShrink: 0, overflow: 'hidden' }}>
                  <img
                    src={animal.image}
                    alt={animal.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 80 }}
                    loading="lazy"
                  />
                </div>
                {/* Info */}
                <div style={{
                  flex: 1,
                  padding: 'var(--space-md) var(--space-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: 4,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 15, fontWeight: 600 }}>
                      {animal.emoji} {animal.individual || animal.name}
                    </span>
                    <span className="badge" style={{
                      background: colors.bg,
                      color: colors.text,
                      fontSize: 9,
                    }}>
                      {label === 'Critically Endangered' ? 'CR' :
                       label === 'Endangered' ? 'EN' :
                       label === 'Vulnerable' ? 'VU' :
                       label === 'Near Threatened' ? 'NT' : 'LC'}
                    </span>
                  </div>
                  <div className="t-caption" style={{ color: 'var(--text-secondary)' }}>
                    {animal.name} &middot; {animal.zone}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </PageTransition>
  )
}

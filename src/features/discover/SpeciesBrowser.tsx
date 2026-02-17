import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, MapPin } from 'lucide-react'
import { PageTransition, BackHeader } from '../../components'
import { zonesExtended } from '../../data/zones-extended'
import { animalsExtended } from '../../data/animals-extended'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.35, ease: [0.32, 0.72, 0, 1] },
  }),
}

export default function SpeciesBrowser() {
  const [activeTab, setActiveTab] = useState<'zones' | 'species'>('zones')
  const navigate = useNavigate()

  const sortedAnimals = [...animalsExtended].sort((a, b) => a.name.localeCompare(b.name))

  // Group animals by first letter
  const grouped: Record<string, typeof animalsExtended> = {}
  sortedAnimals.forEach(animal => {
    const letter = animal.name[0].toUpperCase()
    if (!grouped[letter]) grouped[letter] = []
    grouped[letter].push(animal)
  })

  return (
    <PageTransition>
      <BackHeader title="Species & Zones" />

      <div className="page-scroll" style={{ paddingTop: 0 }}>
        {/* Tab Switcher */}
        <div style={{
          display: 'flex',
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-full)',
          padding: 4,
          marginBottom: 'var(--space-xl)',
          border: '1.5px solid var(--border)',
        }}>
          {(['zones', 'species'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: '10px 0',
                borderRadius: 'var(--radius-full)',
                fontSize: 14,
                fontWeight: 600,
                background: activeTab === tab ? 'var(--green-deep)' : 'transparent',
                color: activeTab === tab ? 'white' : 'var(--text-secondary)',
                transition: 'all 0.25s ease',
              }}
            >
              {tab === 'zones' ? 'Zones' : 'Species'}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'zones' ? (
            <motion.div
              key="zones"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}
            >
              {zonesExtended.map((zone, i) => (
                <motion.div
                  key={zone.id}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate(`/discover/zone/${zone.id}`)}
                  className="card"
                  style={{
                    padding: 0,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'stretch',
                  }}
                >
                  <div style={{ width: 100, flexShrink: 0, overflow: 'hidden' }}>
                    <img
                      src={zone.image}
                      alt={zone.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 90 }}
                      loading="lazy"
                    />
                  </div>
                  <div style={{
                    flex: 1,
                    padding: 'var(--space-md) var(--space-lg)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: 4,
                  }}>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>{zone.name}</div>
                    <div className="t-caption" style={{
                      color: 'var(--text-secondary)',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {zone.description}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginTop: 2 }}>
                      <span className="t-label" style={{ color: 'var(--green-rich)' }}>
                        {zone.animals} animals
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <MapPin size={11} color="var(--text-tertiary)" />
                        <span className="t-label" style={{ color: 'var(--text-tertiary)' }}>
                          {zone.distance}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    paddingRight: 'var(--space-md)',
                  }}>
                    <ChevronRight size={18} color="var(--text-tertiary)" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="species"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {Object.entries(grouped).map(([letter, animals]) => (
                <div key={letter} style={{ marginBottom: 'var(--space-lg)' }}>
                  <div
                    className="t-label"
                    style={{
                      color: 'var(--text-tertiary)',
                      padding: '4px 0',
                      marginBottom: 'var(--space-sm)',
                      borderBottom: '1px solid var(--border-light)',
                    }}
                  >
                    {letter}
                  </div>
                  {animals.map((animal, i) => (
                    <motion.div
                      key={animal.id}
                      custom={i}
                      variants={fadeUp}
                      initial="hidden"
                      animate="show"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => navigate(`/discover/animal/${animal.id}`)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-md)',
                        padding: 'var(--space-md) 0',
                        borderBottom: '1px solid var(--border-light)',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{
                        width: 48,
                        height: 48,
                        borderRadius: 'var(--radius-md)',
                        overflow: 'hidden',
                        flexShrink: 0,
                        background: 'var(--bg-placeholder)',
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
                          {animal.emoji} {animal.name}
                        </div>
                        <div className="t-caption" style={{ color: 'var(--text-secondary)' }}>
                          {animal.zone}
                        </div>
                      </div>
                      <ChevronRight size={18} color="var(--text-tertiary)" />
                    </motion.div>
                  ))}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}

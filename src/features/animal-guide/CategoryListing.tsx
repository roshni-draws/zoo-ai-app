import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { PageTransition, BackHeader } from '../../components'
import { animalsExtended, animalCategories } from '../../data/animals-extended'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] } },
}

function getConservationLabel(conservation: string): string {
  return conservation.split(' \u2014 ')[0].split(' — ')[0].split(' -')[0].trim()
}

export default function CategoryListing() {
  const { category } = useParams<{ category: string }>()
  const navigate = useNavigate()

  const categoryInfo = animalCategories.find(c => c.id === category)
  const categoryName = categoryInfo?.name || 'Animals'

  const animals = animalsExtended.filter(a => a.category === category)

  return (
    <PageTransition>
      <BackHeader title={categoryName} />

      <div className="page-scroll" style={{ paddingTop: 0 }}>
        {/* Count summary */}
        <p className="t-body-sm" style={{
          color: 'var(--text-secondary)',
          marginBottom: 'var(--space-xl)',
        }}>
          {animals.length} {animals.length === 1 ? 'species' : 'species'} found
        </p>

        {animals.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: 'var(--space-3xl)' }}>
            <span style={{ fontSize: 48, display: 'block', marginBottom: 'var(--space-lg)' }}>
              {categoryInfo?.icon || '\u{1F43E}'}
            </span>
            <p className="t-body" style={{ color: 'var(--text-tertiary)' }}>
              No animals in this category yet
            </p>
          </div>
        ) : (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--space-md)',
            }}
          >
            {animals.map((animal) => (
              <motion.div
                key={animal.id}
                variants={fadeUp}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/discover/animal/${animal.id}`)}
                style={{
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  background: 'var(--bg-card)',
                  boxShadow: 'var(--shadow-sm)',
                  cursor: 'pointer',
                  border: '1px solid var(--border-light)',
                }}
              >
                {/* Animal Photo */}
                <div style={{ position: 'relative', height: 130, overflow: 'hidden' }}>
                  <img
                    src={animal.image}
                    alt={animal.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                  {/* Conservation status chip */}
                  <div style={{ position: 'absolute', top: 8, right: 8 }}>
                    {(() => {
                      const label = getConservationLabel(animal.conservation)
                      return (
                        <span className="badge" style={{
                          background: label === 'Critically Endangered' || label === 'Endangered'
                            ? 'var(--coral)'
                            : label === 'Vulnerable'
                              ? 'var(--amber-light)'
                              : 'var(--green-light)',
                          color: label === 'Critically Endangered' || label === 'Endangered'
                            ? 'white'
                            : label === 'Vulnerable'
                              ? 'var(--text-warning)'
                              : 'var(--green-rich)',
                          fontSize: 9,
                        }}>
                          {label === 'Critically Endangered' ? 'CR' :
                           label === 'Endangered' ? 'EN' :
                           label === 'Vulnerable' ? 'VU' :
                           label === 'Near Threatened' ? 'NT' : 'LC'}
                        </span>
                      )
                    })()}
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: 'var(--space-md)' }}>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>
                    {animal.emoji} {animal.individual || animal.name}
                  </div>
                  <div className="t-caption" style={{ color: 'var(--text-secondary)', marginBottom: 6 }}>
                    {animal.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <MapPin size={11} color="var(--text-tertiary)" />
                    <span className="t-caption" style={{ color: 'var(--text-tertiary)' }}>
                      {animal.zone}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </PageTransition>
  )
}

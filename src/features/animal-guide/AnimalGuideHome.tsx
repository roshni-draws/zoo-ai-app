import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { PageTransition, BackHeader } from '../../components'
import { animalCategories, animalsExtended } from '../../data/animals-extended'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] } },
}

const categoryImages: Record<string, string> = {
  mammal: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=400&h=300&fit=crop',
  bird: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=300&fit=crop',
  reptile: 'https://images.unsplash.com/photo-1504450874802-0ba2bcd659e0?w=400&h=300&fit=crop',
  aquatic: 'https://images.unsplash.com/photo-1591025207163-942350e47db2?w=400&h=300&fit=crop',
  amphibian: 'https://images.unsplash.com/photo-1559253664-ca249d4608c6?w=400&h=300&fit=crop',
  insect: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=300&fit=crop',
}

const categoryColors: Record<string, string> = {
  mammal: '#E8F5E9',
  bird: '#FBE4EF',
  reptile: '#F5F8E0',
  aquatic: '#E8F1FB',
  amphibian: '#FDF0E6',
  insect: '#F0C8B0',
}

export default function AnimalGuideHome() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const filteredAnimals = search.trim()
    ? animalsExtended.filter(a =>
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        (a.individual && a.individual.toLowerCase().includes(search.toLowerCase()))
      )
    : []

  return (
    <PageTransition>
      <BackHeader title="Explore Animals" />

      <div className="page-scroll" style={{ paddingTop: 0 }}>
        {/* Search Bar */}
        <div className="search-bar" style={{ marginBottom: 'var(--space-xl)' }}>
          <Search size={18} color="var(--text-tertiary)" />
          <input
            placeholder="Search animals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Search Results */}
        {search.trim() && (
          <div style={{ marginBottom: 'var(--space-xl)' }}>
            {filteredAnimals.length === 0 ? (
              <p className="t-body-sm" style={{ color: 'var(--text-tertiary)', textAlign: 'center', padding: 'var(--space-xl)' }}>
                No animals found for "{search}"
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                {filteredAnimals.map((animal) => (
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
                      width: 48,
                      height: 48,
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
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 600 }}>
                        {animal.emoji} {animal.individual || animal.name}
                      </div>
                      <div className="t-caption" style={{ color: 'var(--text-secondary)' }}>
                        {animal.name} &middot; {animal.zone}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Category Grid */}
        {!search.trim() && (
          <>
            <h3 className="t-display-sm" style={{ marginBottom: 'var(--space-lg)' }}>
              Browse by Category
            </h3>
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
              {animalCategories.map((cat) => (
                <motion.div
                  key={cat.id}
                  variants={fadeUp}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/animals/category/${cat.id}`)}
                  style={{
                    position: 'relative',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    height: 160,
                  }}
                >
                  {/* Background Image */}
                  <img
                    src={categoryImages[cat.id] || cat.image}
                    alt={cat.name}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    loading="lazy"
                  />

                  {/* Color Overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 100%)`,
                  }} />

                  {/* Content */}
                  <div style={{
                    position: 'relative',
                    zIndex: 1,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: 'var(--space-lg)',
                  }}>
                    <span style={{ fontSize: 32, marginBottom: 4 }}>{cat.icon}</span>
                    <span style={{ fontSize: 16, fontWeight: 700, color: 'white' }}>
                      {cat.name}
                    </span>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>
                      {cat.count} {cat.count === 1 ? 'species' : 'species'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </PageTransition>
  )
}

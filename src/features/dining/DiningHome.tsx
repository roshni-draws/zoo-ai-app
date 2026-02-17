import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Star, Clock, MapPin, ChevronRight, X, Utensils } from 'lucide-react'
import { BackHeader, PageTransition, SectionHeader } from '../../components'

const cuisineCategories = [
  { id: 'north-indian', label: 'North Indian', emoji: '🍛', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200&h=200&fit=crop' },
  { id: 'south-indian', label: 'South Indian', emoji: '🥘', image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=200&h=200&fit=crop' },
  { id: 'italian', label: 'Italian', emoji: '🍕', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop' },
  { id: 'chinese', label: 'Chinese', emoji: '🥡', image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=200&h=200&fit=crop' },
  { id: 'continental', label: 'Continental', emoji: '🥗', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop' },
  { id: 'fast-food', label: 'Fast Food', emoji: '🍔', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop' },
  { id: 'desserts', label: 'Desserts', emoji: '🍦', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=200&h=200&fit=crop' },
  { id: 'beverages', label: 'Beverages', emoji: '🧋', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200&h=200&fit=crop' },
]

const recommendedRestaurants = [
  {
    id: 'r1',
    name: "Albert's Restaurant",
    cuisine: ['Continental', 'Italian'],
    zone: 'Treehouse',
    rating: 4.6,
    reviews: 342,
    priceRange: '$$',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
    waitTime: '10 min',
    isOpen: true,
    tags: ['Family Friendly', 'Outdoor Seating'],
  },
  {
    id: 'r2',
    name: 'Safari Spice Kitchen',
    cuisine: ['North Indian', 'South Indian'],
    zone: 'Africa Rocks',
    rating: 4.4,
    reviews: 218,
    priceRange: '$$',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=400&fit=crop',
    waitTime: '5 min',
    isOpen: true,
    tags: ['Vegetarian Options', 'Spicy Favorites'],
  },
  {
    id: 'r3',
    name: 'Bamboo Bistro',
    cuisine: ['Chinese', 'Fast Food'],
    zone: 'Panda Ridge',
    rating: 4.2,
    reviews: 156,
    priceRange: '$',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop',
    waitTime: '3 min',
    isOpen: true,
    tags: ['Quick Bites', 'Kid-Approved'],
  },
  {
    id: 'r4',
    name: 'Polar Chill Cafe',
    cuisine: ['Beverages', 'Desserts'],
    zone: 'Polar Rim',
    rating: 4.7,
    reviews: 89,
    priceRange: '$',
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=600&h=400&fit=crop',
    waitTime: 'No wait',
    isOpen: true,
    tags: ['Ice Cream', 'Smoothies'],
  },
]

export default function DiningHome() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title="Dining" />

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            margin: '0 24px 20px',
            height: 180,
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=400&fit=crop"
            alt="Dining"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(transparent 40%, rgba(13,26,13,0.75))',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: 20,
          }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 24,
              fontWeight: 700,
              color: 'white',
              marginBottom: 4,
            }}>
              Savor the Wild Side
            </h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>
              12 restaurants across the zoo
            </p>
          </div>
        </motion.div>

        <div style={{ padding: '0 24px 120px' }}>
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="search-bar"
            style={{ marginBottom: 24 }}
          >
            <Search size={18} color="var(--text-tertiary)" />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search restaurants, cuisines..."
              style={{ flex: 1, fontSize: 15 }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')}>
                <X size={16} color="var(--text-tertiary)" />
              </button>
            )}
          </motion.div>

          {/* Cuisine Categories */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ marginBottom: 28 }}
          >
            <SectionHeader title="Browse by Cuisine" />
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 12,
            }}>
              {cuisineCategories.map((cat, i) => (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.12 + i * 0.03 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => navigate(`/dining/cuisine/${cat.id}`)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <div style={{
                    width: 68,
                    height: 68,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '3px solid var(--border-light)',
                    boxShadow: 'var(--shadow-sm)',
                  }}>
                    <img
                      src={cat.image}
                      alt={cat.label}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                  </div>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    textAlign: 'center',
                    lineHeight: 1.2,
                  }}>
                    {cat.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Quick Status */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              display: 'flex',
              gap: 10,
              marginBottom: 28,
            }}
          >
            <div className="card" style={{
              flex: 1,
              padding: 14,
              textAlign: 'center',
              background: 'var(--green-pale)',
              border: '1px solid var(--green-light)',
            }}>
              <Utensils size={20} color="var(--green-rich)" style={{ margin: '0 auto 4px' }} />
              <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--green-rich)' }}>8</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Open Now</div>
            </div>
            <div className="card" style={{
              flex: 1,
              padding: 14,
              textAlign: 'center',
              background: 'var(--gold-pale)',
              border: '1px solid var(--gold-light)',
            }}>
              <Clock size={20} color="var(--yellow-medium)" style={{ margin: '0 auto 4px' }} />
              <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--yellow-medium)' }}>3 min</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Avg Wait</div>
            </div>
            <div className="card" style={{
              flex: 1,
              padding: 14,
              textAlign: 'center',
              background: 'var(--coral-pale)',
              border: '1px solid var(--coral-light)',
            }}>
              <Star size={20} color="var(--coral)" style={{ margin: '0 auto 4px' }} />
              <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--coral)' }}>4.5</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Avg Rating</div>
            </div>
          </motion.div>

          {/* Recommended For You */}
          <SectionHeader title="Recommended for You" action="See All" onAction={() => navigate('/dining/cuisine/all')} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {recommendedRestaurants.map((rest, i) => (
              <motion.div
                key={rest.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.06 }}
                whileTap={{ scale: 0.98 }}
                className="card"
                onClick={() => navigate(`/dining/restaurant/${rest.id}`)}
                style={{
                  padding: 0,
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
              >
                {/* Image */}
                <div style={{
                  width: '100%',
                  height: 150,
                  position: 'relative',
                }}>
                  <img
                    src={rest.image}
                    alt={rest.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                  <div style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    display: 'flex',
                    gap: 6,
                  }}>
                    <span className="badge" style={{
                      background: 'rgba(0,0,0,0.6)',
                      color: 'white',
                      backdropFilter: 'blur(8px)',
                    }}>
                      <Star size={10} fill="var(--gold)" color="var(--gold)" /> {rest.rating}
                    </span>
                    <span className="badge" style={{
                      background: rest.isOpen ? 'var(--green-rich)' : 'var(--coral)',
                      color: 'white',
                    }}>
                      {rest.isOpen ? 'Open' : 'Closed'}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: '12px 16px 14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700 }}>{rest.name}</h3>
                    <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 600 }}>{rest.priceRange}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <MapPin size={12} /> {rest.zone}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Clock size={12} /> {rest.waitTime}
                    </span>
                    <span>{rest.reviews} reviews</span>
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {rest.cuisine.map(c => (
                      <span key={c} className="badge badge-active" style={{ fontSize: 10 }}>{c}</span>
                    ))}
                    {rest.tags.slice(0, 1).map(t => (
                      <span key={t} className="badge badge-gold" style={{ fontSize: 10 }}>{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

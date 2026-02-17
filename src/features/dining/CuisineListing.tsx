import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Clock, MapPin, ChevronRight } from 'lucide-react'
import { BackHeader, PageTransition } from '../../components'

const cuisineNames: Record<string, string> = {
  'north-indian': 'North Indian',
  'south-indian': 'South Indian',
  'italian': 'Italian',
  'chinese': 'Chinese',
  'continental': 'Continental',
  'fast-food': 'Fast Food',
  'desserts': 'Desserts',
  'beverages': 'Beverages',
  'all': 'All Restaurants',
}

const allRestaurants = [
  {
    id: 'r1',
    name: "Albert's Restaurant",
    cuisines: ['continental', 'italian'],
    zone: 'Treehouse',
    rating: 4.6,
    reviews: 342,
    priceRange: '$$',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
    familyImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    waitTime: '10 min',
    isOpen: true,
    tags: ['Family Friendly', 'Outdoor Seating', 'Continental'],
    description: 'Fine dining with panoramic zoo views. Enjoy a leisurely lunch with the family amidst lush tropical greenery.',
  },
  {
    id: 'r2',
    name: 'Safari Spice Kitchen',
    cuisines: ['north-indian', 'south-indian'],
    zone: 'Africa Rocks',
    rating: 4.4,
    reviews: 218,
    priceRange: '$$',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=400&fit=crop',
    familyImage: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop',
    waitTime: '5 min',
    isOpen: true,
    tags: ['Vegetarian', 'Spicy Favorites', 'North Indian'],
    description: 'Aromatic Indian cuisine that transports you to the streets of Delhi and the coasts of Kerala.',
  },
  {
    id: 'r3',
    name: 'Bamboo Bistro',
    cuisines: ['chinese', 'fast-food'],
    zone: 'Panda Ridge',
    rating: 4.2,
    reviews: 156,
    priceRange: '$',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop',
    familyImage: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=600&h=400&fit=crop',
    waitTime: '3 min',
    isOpen: true,
    tags: ['Quick Bites', 'Kid-Approved', 'Chinese'],
    description: 'Quick, delicious Asian-inspired fare perfect for a fast refuel between exhibits.',
  },
  {
    id: 'r4',
    name: 'Polar Chill Cafe',
    cuisines: ['beverages', 'desserts'],
    zone: 'Polar Rim',
    rating: 4.7,
    reviews: 89,
    priceRange: '$',
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=600&h=400&fit=crop',
    familyImage: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&h=400&fit=crop',
    waitTime: 'No wait',
    isOpen: true,
    tags: ['Ice Cream', 'Smoothies', 'Desserts'],
    description: 'Cool down with artisanal ice cream, frozen treats, and refreshing smoothies near the polar bears.',
  },
  {
    id: 'r5',
    name: 'Treetop Trattoria',
    cuisines: ['italian'],
    zone: 'Urban Jungle',
    rating: 4.5,
    reviews: 267,
    priceRange: '$$',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop',
    familyImage: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=400&fit=crop',
    waitTime: '15 min',
    isOpen: true,
    tags: ['Wood-fired Pizza', 'Pasta', 'Italian'],
    description: 'Authentic wood-fired pizzas and handmade pastas served in a charming elevated dining room among the treetops.',
  },
  {
    id: 'r6',
    name: 'Outback Grill',
    cuisines: ['fast-food', 'continental'],
    zone: 'Australian Outback',
    rating: 4.1,
    reviews: 134,
    priceRange: '$',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop',
    familyImage: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&h=400&fit=crop',
    waitTime: '5 min',
    isOpen: true,
    tags: ['Burgers', 'BBQ', 'Fast Food'],
    description: 'Classic American burgers, grilled meats, and BBQ platters with a laid-back Australian vibe.',
  },
  {
    id: 'r7',
    name: 'Lotus Garden',
    cuisines: ['chinese', 'south-indian'],
    zone: 'Lost Forest',
    rating: 4.3,
    reviews: 178,
    priceRange: '$$',
    image: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=600&h=400&fit=crop',
    familyImage: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=600&h=400&fit=crop',
    waitTime: '8 min',
    isOpen: false,
    tags: ['Noodles', 'Dosa', 'Vegetarian'],
    description: 'A fusion of South Indian and Chinese flavors in a serene garden setting surrounded by ancient trees.',
  },
]

export default function CuisineListing() {
  const { type } = useParams()
  const navigate = useNavigate()

  const cuisineName = cuisineNames[type || ''] || 'Restaurants'
  const filtered = type === 'all'
    ? allRestaurants
    : allRestaurants.filter(r => r.cuisines.includes(type || ''))

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title={cuisineName} />

        <div style={{ padding: '0 24px' }}>
          {/* Result Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              marginBottom: 16,
              fontSize: 13,
              color: 'var(--text-secondary)',
            }}
          >
            {filtered.length} {filtered.length === 1 ? 'restaurant' : 'restaurants'} found
          </motion.div>
        </div>

        {/* Restaurant Cards */}
        <div style={{ padding: '0 24px 120px' }}>
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: 'center', padding: '48px 20px' }}
            >
              <div style={{ fontSize: 48, marginBottom: 12 }}>🍽️</div>
              <h3 className="t-display-sm" style={{ marginBottom: 6 }}>No restaurants found</h3>
              <p className="t-body-sm" style={{ color: 'var(--text-secondary)' }}>
                Try a different cuisine category
              </p>
            </motion.div>
          ) : (
            filtered.map((rest, i) => (
              <motion.div
                key={rest.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="card"
                style={{
                  padding: 0,
                  overflow: 'hidden',
                  marginBottom: 16,
                }}
              >
                {/* Large Photo */}
                <div style={{
                  width: '100%',
                  height: 200,
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  <img
                    src={i % 2 === 0 ? rest.image : rest.familyImage}
                    alt={rest.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(transparent 50%, rgba(0,0,0,0.4))',
                  }} />
                  <div style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    display: 'flex',
                    gap: 6,
                  }}>
                    <span className="badge" style={{
                      background: 'rgba(0,0,0,0.6)',
                      backdropFilter: 'blur(8px)',
                      color: 'white',
                    }}>
                      <Star size={10} fill="var(--gold)" color="var(--gold)" /> {rest.rating}
                    </span>
                    <span className="badge" style={{
                      background: rest.isOpen ? 'rgba(46,107,52,0.85)' : 'rgba(232,104,160,0.85)',
                      color: 'white',
                    }}>
                      {rest.isOpen ? 'Open' : 'Closed'}
                    </span>
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: 12,
                    left: 14,
                  }}>
                    <span className="badge" style={{
                      background: 'rgba(255,255,255,0.9)',
                      color: 'var(--text-primary)',
                      fontSize: 11,
                    }}>
                      {rest.priceRange} · {rest.waitTime}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '14px 16px 16px' }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{rest.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <MapPin size={12} /> {rest.zone}
                    </span>
                    <span>{rest.reviews} reviews</span>
                  </div>

                  <p className="t-body-sm" style={{ color: 'var(--text-secondary)', marginBottom: 12, lineHeight: 1.5 }}>
                    {rest.description}
                  </p>

                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                    {rest.tags.map(tag => (
                      <span key={tag} className="badge badge-active" style={{ fontSize: 10 }}>{tag}</span>
                    ))}
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    className="btn btn-primary btn-sm btn-full"
                    onClick={() => navigate(`/dining/restaurant/${rest.id}`)}
                  >
                    VIEW DETAILS <ChevronRight size={14} />
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </PageTransition>
  )
}

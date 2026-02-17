import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Clock, MapPin, Phone, ChevronRight, Heart, Share2, Navigation, MessageCircle, Users } from 'lucide-react'
import { BackHeader, PageTransition, SectionHeader } from '../../components'

const restaurantsData: Record<string, any> = {
  r1: {
    name: "Albert's Restaurant",
    tagline: 'Fine dining with a wild view',
    cuisine: ['Continental', 'Italian'],
    zone: 'Treehouse',
    rating: 4.6,
    reviews: 342,
    priceRange: '$$',
    heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop',
    isOpen: true,
    hours: 'Mon-Sun: 10:00 AM - 8:00 PM',
    phone: '+1 (555) 234-5678',
    description: 'Enjoy an elevated dining experience with panoramic views of the zoo. Our seasonal menu features locally sourced ingredients prepared by award-winning chefs.',
    gallery: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop',
    ],
    menu: [
      { category: 'Starters', items: [
        { name: 'Garden Caesar Salad', price: '$14', desc: 'Crisp romaine, parmesan, croutons, anchovy dressing', popular: true },
        { name: 'Wild Mushroom Soup', price: '$12', desc: 'Truffle oil, sourdough croutons', popular: false },
        { name: 'Bruschetta Trio', price: '$16', desc: 'Classic tomato, roasted pepper, olive tapenade', popular: false },
      ]},
      { category: 'Main Course', items: [
        { name: 'Grilled Salmon', price: '$28', desc: 'Lemon butter, seasonal vegetables, wild rice', popular: true },
        { name: 'Wood-fired Margherita', price: '$18', desc: 'San Marzano tomato, fresh mozzarella, basil', popular: true },
        { name: 'Herb-crusted Chicken', price: '$22', desc: 'Free-range chicken, roasted potatoes, pan jus', popular: false },
        { name: 'Mushroom Risotto', price: '$20', desc: 'Arborio rice, porcini, parmesan, truffle oil', popular: false },
      ]},
      { category: 'Kids Menu', items: [
        { name: 'Mini Cheeseburger', price: '$10', desc: 'With fries and juice', popular: true },
        { name: 'Pasta Marinara', price: '$9', desc: 'Penne with tomato sauce', popular: false },
        { name: 'Grilled Cheese', price: '$8', desc: 'With tomato soup', popular: false },
      ]},
      { category: 'Desserts', items: [
        { name: 'Tiramisu', price: '$12', desc: 'Classic Italian coffee dessert', popular: true },
        { name: 'Chocolate Lava Cake', price: '$14', desc: 'Warm center, vanilla bean ice cream', popular: false },
      ]},
    ],
    nearby: [
      { id: 'r3', name: 'Bamboo Bistro', cuisine: 'Chinese', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=200&fit=crop', rating: 4.2 },
      { id: 'r5', name: 'Treetop Trattoria', cuisine: 'Italian', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=200&fit=crop', rating: 4.5 },
      { id: 'r4', name: 'Polar Chill Cafe', cuisine: 'Desserts', image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=300&h=200&fit=crop', rating: 4.7 },
    ],
  },
}

const fallbackRestaurant = {
  name: 'Zoo Restaurant',
  tagline: 'Great food for your zoo adventure',
  cuisine: ['Mixed Cuisine'],
  zone: 'Main Plaza',
  rating: 4.3,
  reviews: 150,
  priceRange: '$$',
  heroImage: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=500&fit=crop',
  isOpen: true,
  hours: 'Mon-Sun: 9:00 AM - 7:00 PM',
  phone: '+1 (555) 123-4567',
  description: 'A wonderful dining spot right in the heart of the zoo, offering a variety of cuisines for every palate.',
  gallery: [
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
  ],
  menu: [
    { category: 'Popular Items', items: [
      { name: 'Classic Burger', price: '$15', desc: 'Angus beef, lettuce, tomato, secret sauce', popular: true },
      { name: 'Caesar Salad', price: '$12', desc: 'Romaine, croutons, parmesan dressing', popular: false },
      { name: 'Grilled Chicken Wrap', price: '$13', desc: 'Chicken, avocado, mixed greens', popular: true },
    ]},
  ],
  nearby: [
    { id: 'r1', name: "Albert's Restaurant", cuisine: 'Continental', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop', rating: 4.6 },
  ],
}

export default function RestaurantDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [liked, setLiked] = useState(false)
  const [activeMenuCategory, setActiveMenuCategory] = useState(0)

  const restaurant = restaurantsData[id || ''] || fallbackRestaurant

  return (
    <PageTransition>
      <div className="page" style={{ paddingBottom: 100 }}>
        <BackHeader
          title=""
          right={
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => setLiked(!liked)}
                style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'var(--bg-card)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <Heart size={18} fill={liked ? 'var(--coral)' : 'none'} color={liked ? 'var(--coral)' : 'var(--text-secondary)'} />
              </button>
              <button
                style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'var(--bg-card)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <Share2 size={18} color="var(--text-secondary)" />
              </button>
            </div>
          }
        />

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            width: '100%',
            height: 260,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <img
            src={restaurant.heroImage}
            alt={restaurant.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(transparent 50%, rgba(0,0,0,0.5))',
          }} />
          <div style={{ position: 'absolute', bottom: 14, left: 16, display: 'flex', gap: 8 }}>
            <span className="badge" style={{
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(8px)',
              color: 'white',
              fontSize: 12,
              padding: '5px 12px',
            }}>
              <Star size={12} fill="var(--gold)" color="var(--gold)" /> {restaurant.rating} ({restaurant.reviews})
            </span>
            <span className="badge" style={{
              background: restaurant.isOpen ? 'var(--green-rich)' : 'var(--coral)',
              color: 'white',
              fontSize: 12,
              padding: '5px 12px',
            }}>
              {restaurant.isOpen ? 'Open Now' : 'Closed'}
            </span>
          </div>
        </motion.div>

        <div style={{ padding: '20px 24px 0' }}>
          {/* Title & Tags */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="t-display-lg" style={{ marginBottom: 4 }}>{restaurant.name}</h1>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 12 }}>{restaurant.tagline}</p>

            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
              {restaurant.cuisine.map((c: string) => (
                <span key={c} className="chip" style={{ padding: '6px 12px', fontSize: 12 }}>{c}</span>
              ))}
            </div>

            {/* Info Row */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              padding: '14px 16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              marginBottom: 24,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--text-secondary)' }}>
                <Clock size={16} color="var(--green-rich)" /> {restaurant.hours}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--text-secondary)' }}>
                <MapPin size={16} color="var(--green-rich)" /> {restaurant.zone} Zone
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--text-secondary)' }}>
                <Phone size={16} color="var(--green-rich)" /> {restaurant.phone}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--text-secondary)' }}>
                <Users size={16} color="var(--green-rich)" /> {restaurant.priceRange} price range
              </div>
            </div>
          </motion.div>

          {/* Menu Section */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            style={{ marginBottom: 28 }}
          >
            <SectionHeader title="Menu" />

            {/* Category Tabs */}
            <div style={{
              display: 'flex',
              gap: 6,
              overflowX: 'auto',
              scrollbarWidth: 'none',
              marginBottom: 14,
              paddingBottom: 2,
            }}>
              {restaurant.menu.map((cat: any, i: number) => (
                <button
                  key={cat.category}
                  className={`chip ${activeMenuCategory === i ? 'chip-active' : ''}`}
                  onClick={() => setActiveMenuCategory(i)}
                  style={{ fontSize: 12 }}
                >
                  {cat.category}
                </button>
              ))}
            </div>

            {/* Menu Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {restaurant.menu[activeMenuCategory]?.items.map((item: any, i: number) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="card"
                  style={{
                    padding: '12px 14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <div style={{ flex: 1, paddingRight: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                      <span style={{ fontSize: 14, fontWeight: 600 }}>{item.name}</span>
                      {item.popular && (
                        <span className="badge" style={{
                          background: 'var(--coral-pale)',
                          color: 'var(--coral)',
                          fontSize: 9,
                          padding: '2px 6px',
                        }}>
                          Popular
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{item.desc}</p>
                  </div>
                  <span style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: 'var(--green-rich)',
                    flexShrink: 0,
                  }}>
                    {item.price}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Photo Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ marginBottom: 28 }}
          >
            <SectionHeader title="Photos" />
            <div className="scroll-x" style={{ paddingLeft: 0, paddingRight: 0 }}>
              {restaurant.gallery.map((img: string, i: number) => (
                <div
                  key={i}
                  style={{
                    width: 180,
                    height: 130,
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  <img src={img} alt={`Photo ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Location Map */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            style={{ marginBottom: 28 }}
          >
            <SectionHeader title="Location" />
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{
                height: 150,
                background: 'linear-gradient(135deg, var(--green-pale), var(--sky-pale))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'var(--green-rich)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: 'var(--shadow-md)',
                }}>
                  <MapPin size={22} color="white" />
                </div>
              </div>
              <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{restaurant.zone} Zone</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>5 min walk from entrance</div>
                </div>
                <button
                  onClick={() => navigate('/map')}
                  className="btn btn-sm"
                  style={{ background: 'var(--green-pale)', color: 'var(--green-rich)', fontSize: 12 }}
                >
                  <Navigation size={12} /> VIEW MAP
                </button>
              </div>
            </div>
          </motion.div>

          {/* Questions Card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ marginBottom: 28 }}
          >
            <div className="card" style={{
              background: 'var(--gold-pale)',
              border: '1px solid var(--gold-light)',
              display: 'flex',
              gap: 14,
              alignItems: 'center',
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: 'var(--gold)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <MessageCircle size={22} color="white" />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>Have Questions?</h4>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  Our team is here to help with dietary needs, reservations, or special requests.
                </p>
              </div>
              <ChevronRight size={18} color="var(--text-tertiary)" />
            </div>
          </motion.div>

          {/* Nearby Restaurants */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            style={{ marginBottom: 32 }}
          >
            <SectionHeader title="Nearby Restaurants" />
            <div className="scroll-x" style={{ paddingLeft: 0, paddingRight: 0 }}>
              {restaurant.nearby.map((nr: any) => (
                <motion.div
                  key={nr.id}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate(`/dining/restaurant/${nr.id}`)}
                  style={{
                    width: 170,
                    flexShrink: 0,
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    width: '100%',
                    height: 110,
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    marginBottom: 8,
                  }}>
                    <img src={nr.image} alt={nr.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{nr.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Star size={11} fill="var(--gold)" color="var(--gold)" /> {nr.rating} · {nr.cuisine}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sticky Book CTA */}
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 430,
          padding: '12px 24px',
          paddingBottom: 'calc(12px + env(safe-area-inset-bottom, 0px))',
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid var(--border-light)',
          zIndex: 50,
        }}>
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="btn btn-primary btn-full btn-lg"
            onClick={() => navigate(`/dining/reserve/${id || 'r1'}`)}
          >
            BOOK A TABLE
          </motion.button>
        </div>
      </div>
    </PageTransition>
  )
}

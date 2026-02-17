import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, MapPin } from 'lucide-react'
import { BackHeader, PageTransition } from '../../components'

const zones = ['View All', 'Wonder of The World', 'Habitats', 'Wild Valley', 'Discovery Zone', 'Safari Trail']

const shopsData = [
  {
    id: 'shop1',
    name: 'Safari Gift Shop',
    zone: 'Wonder of The World',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&h=400&fit=crop',
    isOpen: true,
    hours: '9:00 AM - 5:30 PM',
    desc: 'Souvenirs, plush toys, and wildlife-themed gifts',
  },
  {
    id: 'shop2',
    name: 'Jungle Boutique',
    zone: 'Habitats',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
    isOpen: true,
    hours: '9:30 AM - 5:00 PM',
    desc: 'Premium clothing and accessories with nature prints',
  },
  {
    id: 'shop3',
    name: 'Wild Things Store',
    zone: 'Wild Valley',
    image: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=600&h=400&fit=crop',
    isOpen: false,
    hours: '10:00 AM - 4:00 PM',
    desc: 'Educational toys, books, and science kits',
  },
  {
    id: 'shop4',
    name: 'Nature\'s Treasures',
    zone: 'Discovery Zone',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    isOpen: true,
    hours: '9:00 AM - 5:30 PM',
    desc: 'Handcrafted jewelry, crystals, and natural artifacts',
  },
  {
    id: 'shop5',
    name: 'The Explorer\'s Outpost',
    zone: 'Safari Trail',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&h=400&fit=crop',
    isOpen: true,
    hours: '9:00 AM - 5:00 PM',
    desc: 'Outdoor gear, hats, binoculars, and adventure essentials',
  },
  {
    id: 'shop6',
    name: 'Little Cubs Corner',
    zone: 'Wonder of The World',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=400&fit=crop',
    isOpen: true,
    hours: '9:30 AM - 5:30 PM',
    desc: 'Kids\' clothing, toys, and character merchandise',
  },
  {
    id: 'shop7',
    name: 'Conservation Corner',
    zone: 'Habitats',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&h=400&fit=crop',
    isOpen: false,
    hours: '10:00 AM - 3:00 PM',
    desc: 'Eco-friendly products supporting wildlife conservation',
  },
  {
    id: 'shop8',
    name: 'Photo Memories',
    zone: 'Wild Valley',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=600&h=400&fit=crop',
    isOpen: true,
    hours: '9:00 AM - 5:30 PM',
    desc: 'Professional photos, frames, and custom prints',
  },
]

export default function ShopListing() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('View All')

  const filtered = activeFilter === 'View All'
    ? shopsData
    : shopsData.filter(s => s.zone === activeFilter)

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title="Shops" />

        {/* Filter Tabs */}
        <div style={{
          display: 'flex',
          gap: 8,
          padding: '0 24px 16px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}>
          {zones.map(zone => (
            <motion.button
              key={zone}
              whileTap={{ scale: 0.95 }}
              className={`chip ${activeFilter === zone ? 'chip-active' : ''}`}
              onClick={() => setActiveFilter(zone)}
            >
              {zone}
            </motion.button>
          ))}
        </div>

        {/* Shop Cards */}
        <div style={{ padding: '0 24px 120px' }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((shop, i) => (
              <motion.div
                key={shop.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                whileTap={{ scale: 0.98 }}
                className="card card-elevated"
                onClick={() => navigate(`/shops/${shop.id}`)}
                style={{
                  padding: 0,
                  marginBottom: 14,
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
              >
                {/* Image */}
                <div style={{
                  height: 140,
                  position: 'relative',
                  background: 'var(--bg-placeholder)',
                }}>
                  <img
                    src={shop.image}
                    alt={shop.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                  {/* Status Badge */}
                  <div style={{ position: 'absolute', top: 12, right: 12 }}>
                    <span className={`badge ${shop.isOpen ? 'badge-active' : 'badge-warning'}`} style={{ fontSize: 11 }}>
                      {shop.isOpen ? 'Open' : 'Closed'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '14px 16px' }}>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{shop.name}</div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    fontSize: 12,
                    color: 'var(--text-secondary)',
                    marginBottom: 6,
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <MapPin size={12} /> {shop.zone}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={12} /> {shop.hours}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-tertiary)', lineHeight: 1.4 }}>
                    {shop.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '48px 20px',
              color: 'var(--text-tertiary)',
            }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🛍</div>
              <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>No shops in this zone</div>
              <div style={{ fontSize: 13 }}>Try selecting a different zone filter</div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}

import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, MapPin, Navigation, Phone, ChevronRight } from 'lucide-react'
import { BackHeader, PageTransition } from '../../components'

const shopsData: Record<string, {
  name: string
  zone: string
  image: string
  isOpen: boolean
  hours: string
  description: string
  phone: string
  features: string[]
}> = {
  shop1: {
    name: 'Safari Gift Shop',
    zone: 'Wonder of The World',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&h=500&fit=crop',
    isOpen: true,
    hours: '9:00 AM - 5:30 PM',
    description: 'The Safari Gift Shop is your one-stop destination for wild memories. Browse our extensive collection of plush animals, wildlife-themed clothing, and handcrafted souvenirs. Every purchase supports our conservation programs and helps protect endangered species around the world.',
    phone: '+91 98765 43210',
    features: ['Plush toys', 'Clothing', 'Souvenirs', 'Books', 'Postcards'],
  },
  shop2: {
    name: 'Jungle Boutique',
    zone: 'Habitats',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop',
    isOpen: true,
    hours: '9:30 AM - 5:00 PM',
    description: 'Discover premium fashion inspired by the wild at Jungle Boutique. Our curated collection features nature-printed apparel, eco-conscious accessories, and sustainable lifestyle products. From hand-painted silk scarves to bamboo sunglasses, find unique pieces you won\'t find anywhere else.',
    phone: '+91 98765 43211',
    features: ['Premium clothing', 'Accessories', 'Eco products', 'Gifts'],
  },
  shop3: {
    name: 'Wild Things Store',
    zone: 'Wild Valley',
    image: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=800&h=500&fit=crop',
    isOpen: false,
    hours: '10:00 AM - 4:00 PM',
    description: 'Fuel young minds with our collection of educational toys, interactive science kits, and wildlife books. The Wild Things Store is designed to inspire the next generation of conservationists. Perfect for curious kids and lifelong learners alike.',
    phone: '+91 98765 43212',
    features: ['Educational toys', 'Science kits', 'Books', 'Games'],
  },
  shop4: {
    name: 'Nature\'s Treasures',
    zone: 'Discovery Zone',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop',
    isOpen: true,
    hours: '9:00 AM - 5:30 PM',
    description: 'Explore a world of natural wonders at Nature\'s Treasures. Our collection features handcrafted jewelry, polished crystals, fossils, and unique artifacts from around the globe. Each piece tells a story of our planet\'s incredible geological history.',
    phone: '+91 98765 43213',
    features: ['Jewelry', 'Crystals', 'Fossils', 'Artifacts'],
  },
  shop5: {
    name: 'The Explorer\'s Outpost',
    zone: 'Safari Trail',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&h=500&fit=crop',
    isOpen: true,
    hours: '9:00 AM - 5:00 PM',
    description: 'Gear up for adventure at The Explorer\'s Outpost. We stock premium outdoor essentials including sun hats, binoculars, water bottles, and lightweight rain jackets. Whether you\'re exploring the zoo or heading into the wild, we\'ve got you covered.',
    phone: '+91 98765 43214',
    features: ['Outdoor gear', 'Binoculars', 'Hats', 'Water bottles'],
  },
  shop6: {
    name: 'Little Cubs Corner',
    zone: 'Wonder of The World',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=500&fit=crop',
    isOpen: true,
    hours: '9:30 AM - 5:30 PM',
    description: 'A magical world for little explorers! Little Cubs Corner is packed with adorable kids\' clothing, character toys, costume accessories, and interactive playsets. Watch your little ones light up as they pick their favorite animal friends to take home.',
    phone: '+91 98765 43215',
    features: ['Kids\' clothing', 'Toys', 'Costumes', 'Playsets'],
  },
  shop7: {
    name: 'Conservation Corner',
    zone: 'Habitats',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&h=500&fit=crop',
    isOpen: false,
    hours: '10:00 AM - 3:00 PM',
    description: 'Shop with purpose at Conservation Corner. Every product is eco-friendly, sustainably sourced, and supports wildlife conservation efforts. From reusable bags to adoption certificates, make a positive impact with every purchase.',
    phone: '+91 98765 43216',
    features: ['Eco products', 'Adoption certificates', 'Reusable items'],
  },
  shop8: {
    name: 'Photo Memories',
    zone: 'Wild Valley',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&h=500&fit=crop',
    isOpen: true,
    hours: '9:00 AM - 5:30 PM',
    description: 'Capture and preserve your zoo memories at Photo Memories. Browse professional photos taken during your visit, choose from premium frames, or create custom prints and photo books. Our team can also help with instant photo printing.',
    phone: '+91 98765 43217',
    features: ['Photo prints', 'Frames', 'Photo books', 'Custom prints'],
  },
}

const otherOutlets = [
  { id: 'shop1', name: 'Safari Gift Shop', zone: 'Wonder of The World', image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=300&h=200&fit=crop', isOpen: true },
  { id: 'shop2', name: 'Jungle Boutique', zone: 'Habitats', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop', isOpen: true },
  { id: 'shop4', name: 'Nature\'s Treasures', zone: 'Discovery Zone', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop', isOpen: true },
  { id: 'shop5', name: 'Explorer\'s Outpost', zone: 'Safari Trail', image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=300&h=200&fit=crop', isOpen: true },
  { id: 'shop6', name: 'Little Cubs Corner', zone: 'Wonder of The World', image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=300&h=200&fit=crop', isOpen: true },
]

export default function ShopDetail() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const shop = shopsData[id || 'shop1'] || shopsData.shop1
  const currentId = id || 'shop1'
  const filteredOutlets = otherOutlets.filter(o => o.id !== currentId)

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title={shop.name} />

        {/* Hero Image */}
        <div style={{
          margin: '0 24px',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          position: 'relative',
          height: 200,
          background: 'var(--bg-placeholder)',
          marginBottom: 20,
        }}>
          <img
            src={shop.image}
            alt={shop.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {/* Status Badge */}
          <div style={{ position: 'absolute', top: 14, right: 14 }}>
            <span className={`badge ${shop.isOpen ? 'badge-active' : 'badge-warning'}`} style={{
              fontSize: 12,
              padding: '5px 14px',
              backdropFilter: 'blur(8px)',
            }}>
              {shop.isOpen ? 'Open Now' : 'Closed'}
            </span>
          </div>
        </div>

        <div style={{ padding: '0 24px 120px' }}>
          {/* Name + Zone + Status */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginBottom: 20 }}
          >
            <h1 className="t-display-lg" style={{ marginBottom: 8 }}>{shop.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <span style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                fontSize: 13,
                color: 'var(--text-secondary)',
              }}>
                <MapPin size={14} color="var(--green-rich)" />
                {shop.zone}
              </span>
              <span style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                fontSize: 13,
                color: 'var(--text-secondary)',
              }}>
                <Clock size={14} color="var(--green-rich)" />
                {shop.hours}
              </span>
            </div>
          </motion.div>

          {/* Features/Tags */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              marginBottom: 20,
            }}
          >
            {shop.features.map(feature => (
              <span key={feature} className="chip" style={{ pointerEvents: 'none' }}>
                {feature}
              </span>
            ))}
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="card"
            style={{ padding: 20, marginBottom: 16 }}
          >
            <h3 className="t-heading" style={{ marginBottom: 10 }}>About</h3>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {shop.description}
            </p>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
            style={{ padding: 20, marginBottom: 16 }}
          >
            <h3 className="t-heading" style={{ marginBottom: 12 }}>Opening Hours</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                <div key={day} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{day}</span>
                  <span style={{ fontWeight: 600 }}>
                    {day === 'Sunday' ? 'Closed' : shop.hours}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Explore with Map */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="card card-gradient"
            style={{
              padding: 20,
              marginBottom: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <div style={{
              width: 52,
              height: 52,
              borderRadius: 'var(--radius-lg)',
              background: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Navigation size={24} color="white" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: 'white', marginBottom: 4 }}>
                Explore this place with ease!
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
                Get directions and find us on the zoo map
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/map')}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontSize: 13,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                flexShrink: 0,
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <MapPin size={14} /> View Map
            </motion.button>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
            style={{ padding: 16, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 14 }}
          >
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 'var(--radius-md)',
              background: 'var(--green-pale)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Phone size={18} color="var(--green-rich)" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Contact Shop</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{shop.phone}</div>
            </div>
            <ChevronRight size={18} color="var(--text-tertiary)" />
          </motion.div>

          {/* Other Outlets */}
          <div>
            <h2 className="t-display-sm" style={{ marginBottom: 16 }}>Other Outlets</h2>
            <div style={{
              display: 'flex',
              gap: 14,
              overflowX: 'auto',
              scrollbarWidth: 'none',
              paddingBottom: 4,
              marginLeft: -24,
              marginRight: -24,
              paddingLeft: 24,
              paddingRight: 24,
            }}>
              {filteredOutlets.map((outlet, i) => (
                <motion.div
                  key={outlet.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate(`/shops/${outlet.id}`)}
                  style={{
                    width: 200,
                    flexShrink: 0,
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    height: 120,
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    position: 'relative',
                    background: 'var(--bg-placeholder)',
                    marginBottom: 8,
                  }}>
                    <img
                      src={outlet.image}
                      alt={outlet.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                    <div style={{ position: 'absolute', top: 8, right: 8 }}>
                      <span className={`badge ${outlet.isOpen ? 'badge-active' : 'badge-warning'}`} style={{ fontSize: 9 }}>
                        {outlet.isOpen ? 'Open' : 'Closed'}
                      </span>
                    </div>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{outlet.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <MapPin size={11} /> {outlet.zone}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, Star, Users, ChevronRight } from 'lucide-react'
import { BackHeader, PageTransition } from '../../../components'

const safaris = [
  {
    id: 'safari-1',
    name: 'Cheetah Safari',
    description: 'Witness the world\'s fastest land animal in a breathtaking savanna setting.',
    price: 799,
    duration: '2 hours',
    rating: 4.8,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=600&h=400&fit=crop',
    capacity: 20,
    spotsLeft: 8,
    tag: 'Most Popular',
  },
  {
    id: 'safari-2',
    name: 'Sunset Savanna Tour',
    description: 'Experience the golden hour with giraffes, zebras, and wildebeest.',
    price: 999,
    duration: '2.5 hours',
    rating: 4.9,
    reviews: 186,
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&h=400&fit=crop',
    capacity: 16,
    spotsLeft: 4,
    tag: 'Premium',
  },
  {
    id: 'safari-3',
    name: 'Night Safari',
    description: 'Discover the mysterious world of nocturnal animals under the stars.',
    price: 1199,
    duration: '3 hours',
    rating: 4.7,
    reviews: 142,
    image: 'https://images.unsplash.com/photo-1504173010664-32509aeebb62?w=600&h=400&fit=crop',
    capacity: 12,
    spotsLeft: 6,
    tag: 'Exclusive',
  },
  {
    id: 'safari-4',
    name: 'Jungle Explorer',
    description: 'Trek through tropical forests and see primates, reptiles, and exotic birds.',
    price: 649,
    duration: '1.5 hours',
    rating: 4.6,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=600&h=400&fit=crop',
    capacity: 24,
    spotsLeft: 15,
    tag: null,
  },
]

export default function SafariListing({ embedded }: { embedded?: boolean }) {
  const navigate = useNavigate()

  const content = (
    <div style={{ padding: '20px 24px 120px' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: 20 }}
      >
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          Embark on an unforgettable journey through our world-class safari tours. Expert guides, up-close encounters, and stunning landscapes await.
        </p>
      </motion.div>

      {/* Safari Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {safaris.map((safari, i) => (
          <motion.button
            key={safari.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/transport/safari/${safari.id}`)}
            className="card"
            style={{
              width: '100%',
              padding: 0,
              overflow: 'hidden',
              textAlign: 'left',
              cursor: 'pointer',
            }}
          >
            {/* Hero Image */}
            <div style={{
              height: 160,
              position: 'relative',
              overflow: 'hidden',
              background: 'var(--bg-placeholder)',
            }}>
              <img
                src={safari.image}
                alt={safari.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 60,
                background: 'linear-gradient(transparent, rgba(0,0,0,0.5))',
              }} />

              {safari.tag && (
                <span className="badge" style={{
                  position: 'absolute',
                  top: 12,
                  left: 12,
                  background: safari.tag === 'Premium' ? 'var(--gold)' : safari.tag === 'Exclusive' ? 'var(--coral)' : 'var(--green-rich)',
                  color: 'white',
                  fontSize: 10,
                }}>
                  {safari.tag}
                </span>
              )}

              {safari.spotsLeft <= 8 && (
                <span className="badge" style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  background: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  fontSize: 10,
                  backdropFilter: 'blur(8px)',
                }}>
                  <Users size={10} /> {safari.spotsLeft} spots left
                </span>
              )}

              {/* Price overlay */}
              <div style={{
                position: 'absolute',
                bottom: 10,
                right: 12,
                background: 'rgba(255,255,255,0.95)',
                borderRadius: 'var(--radius-sm)',
                padding: '6px 10px',
                backdropFilter: 'blur(8px)',
              }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--green-deep)' }}>₹{safari.price}</div>
                <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>per person</div>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <h4 className="t-display-sm">{safari.name}</h4>
              </div>

              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: 12 }}>
                {safari.description}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: 14, fontSize: 12, color: 'var(--text-secondary)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Clock size={12} color="var(--green-rich)" />
                    {safari.duration}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Star size={12} color="var(--gold)" fill="var(--gold)" />
                    {safari.rating} ({safari.reviews})
                  </span>
                </div>

                <span style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  fontSize: 13, fontWeight: 600, color: 'var(--green-rich)',
                }}>
                  Book Now <ChevronRight size={14} />
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )

  if (embedded) return content

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title="Safari Tours" />
        {content}
      </div>
    </PageTransition>
  )
}

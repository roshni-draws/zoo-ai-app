import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, Star, Users, MapPin, Check, Camera, ChevronLeft } from 'lucide-react'
import { PageTransition } from '../../../components'

const safariData: Record<string, any> = {
  'safari-1': {
    name: 'Cheetah Safari',
    price: { adult: 799, child: 499, infant: 0 },
    duration: '2 hours',
    capacity: 20,
    rating: 4.8,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=600&h=400&fit=crop',
    description: 'Witness the world\'s fastest land animal in a breathtaking savanna setting. Our expert guides will take you through the cheetah conservation area where you can observe these magnificent creatures in their natural habitat. Learn about conservation efforts and capture stunning photos.',
    itinerary: [
      { time: '9:00 AM', title: 'Check-in & Safety Briefing', desc: 'Meet at the Safari Pavilion' },
      { time: '9:30 AM', title: 'Cheetah Enclosure', desc: 'Observe cheetahs in their habitat' },
      { time: '10:15 AM', title: 'Feeding Session', desc: 'Watch the feeding from a safe distance' },
      { time: '10:45 AM', title: 'Photo Opportunity', desc: 'Guided photography session' },
      { time: '11:00 AM', title: 'Tour Wrap-up', desc: 'Q&A with the guide and souvenir photos' },
    ],
    included: ['Expert Safari Guide', 'Binoculars', 'Refreshments', 'Souvenir Photo', 'Conservation Booklet'],
    moments: [
      'https://images.unsplash.com/photo-1549366021-9f761d450615?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1504173010664-32509aeebb62?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=200&h=200&fit=crop',
    ],
  },
}

// Fallback for all safari IDs
const getDetail = (id: string) => safariData[id] || safariData['safari-1']

export default function SafariDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const safari = getDetail(id || 'safari-1')
  const [showFullDesc, setShowFullDesc] = useState(false)

  return (
    <PageTransition>
      <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)' }}>
        {/* Hero Image */}
        <div style={{ position: 'relative', height: 280, overflow: 'hidden' }}>
          <img
            src={safari.image}
            alt={safari.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(transparent 50%, rgba(0,0,0,0.7))',
          }} />

          {/* Back button overlay */}
          <button
            onClick={() => navigate(-1)}
            style={{
              position: 'absolute', top: 'calc(env(safe-area-inset-top, 12px) + 12px)', left: 16,
              width: 40, height: 40, borderRadius: '50%',
              background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <ChevronLeft size={22} />
          </button>

          {/* Title overlay */}
          <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20, color: 'white' }}>
            <h1 className="t-display-lg" style={{ color: 'white', marginBottom: 6 }}>{safari.name}</h1>
            <div style={{ display: 'flex', gap: 16, fontSize: 13 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, opacity: 0.9 }}>
                <Clock size={14} /> {safari.duration}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, opacity: 0.9 }}>
                <Users size={14} /> {safari.capacity} max
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, opacity: 0.9 }}>
                <Star size={14} fill="var(--gold)" color="var(--gold)" /> {safari.rating} ({safari.reviews})
              </span>
            </div>
          </div>
        </div>

        <div style={{ padding: '20px 24px 120px' }}>
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
            style={{ padding: 16, marginBottom: 16 }}
          >
            <h3 className="t-display-sm" style={{ marginBottom: 10 }}>About this Tour</h3>
            <p style={{
              fontSize: 14,
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              maxHeight: showFullDesc ? 'none' : 80,
              overflow: 'hidden',
              transition: 'max-height 0.3s ease',
            }}>
              {safari.description}
            </p>
            <button
              onClick={() => setShowFullDesc(!showFullDesc)}
              style={{ fontSize: 13, color: 'var(--green-rich)', fontWeight: 600, marginTop: 6 }}
            >
              {showFullDesc ? 'Show Less' : 'Read More'}
            </button>
          </motion.div>

          {/* Map Snippet */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              height: 120,
              borderRadius: 'var(--radius-lg)',
              background: 'var(--green-pale)',
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--green-light)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(circle at 30% 50%, var(--green-light) 2px, transparent 2px),
                           radial-gradient(circle at 70% 30%, var(--green-light) 2px, transparent 2px),
                           radial-gradient(circle at 50% 80%, var(--green-light) 2px, transparent 2px)`,
              opacity: 0.5,
            }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--green-rich)', zIndex: 1 }}>
              <MapPin size={20} />
              <span style={{ fontSize: 14, fontWeight: 600 }}>View on Map</span>
            </div>
          </motion.div>

          {/* Safari Itinerary */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="card"
            style={{ padding: 16, marginBottom: 16 }}
          >
            <h3 className="t-display-sm" style={{ marginBottom: 16 }}>Safari Itinerary</h3>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {safari.itinerary.map((item: any, i: number) => (
                <div key={i} style={{ display: 'flex', gap: 14 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 20 }}>
                    <div style={{
                      width: 12, height: 12, borderRadius: '50%',
                      background: i === 0 ? 'var(--green-rich)' : 'var(--bg-card)',
                      border: i === 0 ? 'none' : '2px solid var(--green-light)',
                      flexShrink: 0,
                    }} />
                    {i < safari.itinerary.length - 1 && (
                      <div style={{ width: 2, flex: 1, minHeight: 28, background: 'var(--green-light)' }} />
                    )}
                  </div>
                  <div style={{ flex: 1, paddingBottom: i < safari.itinerary.length - 1 ? 14 : 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--green-rich)' }}>{item.time}</span>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{item.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* What's Included */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
            style={{ padding: 16, marginBottom: 16 }}
          >
            <h3 className="t-display-sm" style={{ marginBottom: 12 }}>What's Included</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {safari.included.map((item: string) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: '50%',
                    background: 'var(--green-pale)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Check size={12} color="var(--green-rich)" />
                  </div>
                  <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="card"
            style={{ padding: 16, marginBottom: 16 }}
          >
            <h3 className="t-display-sm" style={{ marginBottom: 12 }}>Pricing</h3>
            {[
              { label: 'Adult (12+)', price: safari.price.adult },
              { label: 'Child (3-11)', price: safari.price.child },
              { label: 'Infant (0-2)', price: safari.price.infant, free: true },
            ].map(item => (
              <div key={item.label} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 0', borderBottom: '1px solid var(--border-light)',
              }}>
                <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{item.label}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: item.free ? 'var(--green-rich)' : 'var(--text-primary)' }}>
                  {item.free ? 'Free' : `₹${item.price}`}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Safari Moments */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ marginBottom: 24 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Camera size={16} color="var(--green-rich)" />
              <h3 className="t-display-sm">Safari Moments</h3>
            </div>
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 4 }}>
              {safari.moments.map((url: string, i: number) => (
                <motion.div
                  key={i}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: 100, height: 100, borderRadius: 'var(--radius-md)',
                    overflow: 'hidden', flexShrink: 0,
                  }}
                >
                  <img src={url} alt={`Safari moment ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Book Now Button */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <button
              onClick={() => navigate(`/transport/safari/${id}/date`)}
              className="btn btn-primary btn-full btn-lg"
              style={{ fontWeight: 700, letterSpacing: '0.05em' }}
            >
              BOOK NOW
            </button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}

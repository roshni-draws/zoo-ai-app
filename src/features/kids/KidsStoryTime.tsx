import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Clock, ChevronRight } from 'lucide-react'
import { BackHeader, PageTransition } from '../../components'

const categories = ['All', 'Animal Tales', 'Adventure', 'Nature']

const stories = [
  {
    id: 'st1',
    title: 'The Brave Little Elephant',
    description: 'Join Ellie on her first adventure through the savanna as she discovers the power of friendship.',
    emoji: '\uD83D\uDC18',
    category: 'Animal Tales',
    duration: '8 min',
    age: 'Ages 4-8',
    bgColor: 'var(--green-pale)',
    featured: true,
  },
  {
    id: 'st2',
    title: 'The Lost Penguin',
    description: 'When Pip gets separated from his colony, he meets unlikely friends who help him find his way home.',
    emoji: '\uD83D\uDC27',
    category: 'Adventure',
    duration: '10 min',
    age: 'Ages 3-7',
    bgColor: 'var(--sky-pale)',
    featured: true,
  },
  {
    id: 'st3',
    title: 'Rainbow Reef',
    description: 'Dive beneath the waves with Coral the clownfish and discover the colorful world of the reef.',
    emoji: '\uD83D\uDC20',
    category: 'Nature',
    duration: '7 min',
    age: 'Ages 5-9',
    bgColor: 'var(--coral-pale)',
    featured: false,
  },
  {
    id: 'st4',
    title: 'The Monkey King\'s Crown',
    description: 'When the Monkey King loses his crown, the whole jungle comes together to solve the mystery.',
    emoji: '\uD83D\uDC12',
    category: 'Animal Tales',
    duration: '12 min',
    age: 'Ages 5-10',
    bgColor: 'var(--gold-pale)',
    featured: false,
  },
  {
    id: 'st5',
    title: 'Midnight in the Forest',
    description: 'As the sun sets, the nocturnal creatures of the forest wake up for their nighttime adventures.',
    emoji: '\uD83C\uDF19',
    category: 'Nature',
    duration: '9 min',
    age: 'Ages 6-10',
    bgColor: 'var(--green-pale)',
    featured: false,
  },
  {
    id: 'st6',
    title: 'The Great Migration',
    description: 'Follow the wildebeest herd on their epic journey across the African plains.',
    emoji: '\uD83E\uDD8C',
    category: 'Adventure',
    duration: '11 min',
    age: 'Ages 6-12',
    bgColor: 'var(--orange-pale)',
    featured: true,
  },
]

const sponsors = [
  { id: 'sp1', name: 'Wildlife Foundation', emoji: '\uD83C\uDF0D', color: 'var(--green-pale)' },
  { id: 'sp2', name: 'Nature Trust', emoji: '\uD83C\uDF3F', color: 'var(--gold-pale)' },
  { id: 'sp3', name: 'Ocean Alliance', emoji: '\uD83C\uDF0A', color: 'var(--sky-pale)' },
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] } },
}

export default function KidsStoryTime() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All' ? stories : stories.filter(s => s.category === activeCategory)

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title="Story Time" />

        <div style={{ padding: '0 24px' }}>
          {/* Hero */}
          <div style={{
            textAlign: 'center',
            marginBottom: 24,
            padding: '20px 0',
          }}>
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', delay: 0.1 }}
              style={{ fontSize: 48, marginBottom: 10 }}
            >
              \uD83D\uDCDA
            </motion.div>
            <h2 className="t-display-md">Story Time</h2>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Enchanting tales from the animal kingdom</p>
          </div>

          {/* Sponsors */}
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: 'var(--text-secondary)' }}>Choose your Sponsor</h3>
            <div style={{ display: 'flex', gap: 10 }}>
              {sponsors.map(sponsor => (
                <motion.div
                  key={sponsor.id}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    flex: 1,
                    padding: 14,
                    borderRadius: 'var(--radius-md)',
                    background: sponsor.color,
                    textAlign: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontSize: 24, display: 'block', marginBottom: 4 }}>{sponsor.emoji}</span>
                  <span style={{ fontSize: 11, fontWeight: 600 }}>{sponsor.name}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Category Filters */}
          <div style={{
            display: 'flex',
            gap: 8,
            marginBottom: 20,
            overflowX: 'auto',
            scrollbarWidth: 'none',
          }}>
            {categories.map(cat => (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.95 }}
                className={`chip ${activeCategory === cat ? 'chip-active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Story Cards */}
        <div style={{ padding: '0 24px 120px' }}>
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
          >
            {filtered.map(story => (
              <motion.div
                key={story.id}
                variants={fadeUp}
                className="card card-elevated"
                style={{ padding: 0, overflow: 'hidden' }}
              >
                <div style={{ display: 'flex' }}>
                  {/* Illustration */}
                  <div style={{
                    width: 110,
                    minHeight: 130,
                    background: story.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 44,
                    flexShrink: 0,
                    position: 'relative',
                  }}>
                    {story.emoji}
                    {story.featured && (
                      <span style={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        background: 'var(--coral)',
                        color: 'white',
                        fontSize: 9,
                        fontWeight: 700,
                      }}>
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h4 style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{story.title}</h4>
                      <p style={{
                        fontSize: 12,
                        color: 'var(--text-secondary)',
                        lineHeight: 1.4,
                        marginBottom: 10,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}>
                        {story.description}
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <span className="badge" style={{ background: 'var(--green-pale)', color: 'var(--green-rich)', fontSize: 10 }}>
                          <Clock size={10} /> {story.duration}
                        </span>
                        <span className="badge" style={{ background: 'var(--bg-primary)', color: 'var(--text-secondary)', fontSize: 10 }}>
                          {story.age}
                        </span>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.92 }}
                        className="btn btn-primary btn-sm"
                        style={{ padding: '6px 14px', fontSize: 12 }}
                      >
                        <BookOpen size={13} /> READ
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}

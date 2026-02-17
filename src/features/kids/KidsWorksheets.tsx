import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Download, ChevronRight } from 'lucide-react'
import { BackHeader, PageTransition } from '../../components'

const worksheets = [
  {
    id: 'w1',
    title: 'Safari Animal Coloring',
    description: 'Color in your favorite African safari animals with vibrant patterns.',
    emoji: '\uD83E\uDD81',
    difficulty: 'Easy',
    pages: 8,
    bgColor: 'var(--gold-pale)',
  },
  {
    id: 'w2',
    title: 'Ocean Creatures Connect',
    description: 'Connect the dots to reveal amazing ocean creatures hiding beneath the waves.',
    emoji: '\uD83D\uDC19',
    difficulty: 'Easy',
    pages: 6,
    bgColor: 'var(--sky-pale)',
  },
  {
    id: 'w3',
    title: 'Rainforest Maze Adventure',
    description: 'Navigate through the rainforest mazes and find the hidden animals.',
    emoji: '\uD83C\uDF3F',
    difficulty: 'Medium',
    pages: 10,
    bgColor: 'var(--green-pale)',
  },
  {
    id: 'w4',
    title: 'Animal Alphabet Book',
    description: 'Learn the alphabet with animals from A to Z. Trace, write, and color!',
    emoji: '\uD83D\uDCD6',
    difficulty: 'Easy',
    pages: 26,
    bgColor: 'var(--coral-pale)',
  },
  {
    id: 'w5',
    title: 'Bird Watching Journal',
    description: 'Record the birds you spot at the zoo with drawings and fun facts.',
    emoji: '\uD83E\uDD9C',
    difficulty: 'Medium',
    pages: 12,
    bgColor: 'var(--orange-pale)',
  },
  {
    id: 'w6',
    title: 'Endangered Species',
    description: 'Learn about endangered animals and what we can do to protect them.',
    emoji: '\uD83D\uDC3C',
    difficulty: 'Advanced',
    pages: 14,
    bgColor: 'var(--green-pale)',
  },
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] } },
}

export default function KidsWorksheets() {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title="Worksheets" />

        <div style={{ padding: '0 24px 120px' }}>
          <h2 className="t-display-md" style={{ marginBottom: 4 }}>Printable Worksheets</h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 24 }}>
            Download and print fun learning activities for your little ones
          </p>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}
          >
            {worksheets.map(ws => (
              <motion.div
                key={ws.id}
                variants={fadeUp}
                className="card card-elevated"
                style={{ padding: 0, overflow: 'hidden' }}
              >
                <div style={{ display: 'flex' }}>
                  {/* Illustration Placeholder */}
                  <div style={{
                    width: 110,
                    minHeight: 120,
                    background: ws.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 44,
                    flexShrink: 0,
                  }}>
                    {ws.emoji}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h4 style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{ws.title}</h4>
                      <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: 10 }}>
                        {ws.description}
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <span className="badge" style={{
                          background: ws.difficulty === 'Easy' ? 'var(--green-pale)' : ws.difficulty === 'Medium' ? 'var(--gold-pale)' : 'var(--coral-pale)',
                          color: ws.difficulty === 'Easy' ? 'var(--green-rich)' : ws.difficulty === 'Medium' ? 'var(--yellow-medium)' : 'var(--coral)',
                          fontSize: 10,
                        }}>
                          {ws.difficulty}
                        </span>
                        <span className="badge" style={{ background: 'var(--bg-primary)', color: 'var(--text-secondary)', fontSize: 10 }}>
                          {ws.pages} pages
                        </span>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.92 }}
                        className="btn btn-primary btn-sm"
                        style={{ padding: '6px 14px', fontSize: 12 }}
                      >
                        <Download size={13} /> DOWNLOAD
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            className="btn btn-secondary btn-full"
          >
            VIEW MORE WORKSHEETS <ChevronRight size={16} />
          </motion.button>
        </div>
      </div>
    </PageTransition>
  )
}

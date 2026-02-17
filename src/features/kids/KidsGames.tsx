import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Star, Clock, Play } from 'lucide-react'
import { BackHeader, PageTransition } from '../../components'

const categories = [
  {
    id: 'numbers',
    name: 'Numbers',
    emoji: '\uD83D\uDD22',
    color: 'var(--green-rich)',
    bgColor: 'var(--green-pale)',
    games: [
      { id: 'n1', title: 'Count the Animals', difficulty: 'Easy', duration: '5 min', stars: 3 },
      { id: 'n2', title: 'Zoo Math Challenge', difficulty: 'Medium', duration: '10 min', stars: 4 },
      { id: 'n3', title: 'Number Safari', difficulty: 'Easy', duration: '8 min', stars: 3 },
    ],
  },
  {
    id: 'reading',
    name: 'Reading',
    emoji: '\uD83D\uDCDA',
    color: 'var(--sky)',
    bgColor: 'var(--sky-pale)',
    games: [
      { id: 'r1', title: 'Animal Word Scramble', difficulty: 'Medium', duration: '8 min', stars: 4 },
      { id: 'r2', title: 'Zoo Story Fill-in', difficulty: 'Easy', duration: '10 min', stars: 3 },
      { id: 'r3', title: 'Habitat Vocabulary', difficulty: 'Hard', duration: '12 min', stars: 5 },
    ],
  },
  {
    id: 'puzzle',
    name: 'Puzzle',
    emoji: '\uD83E\uDDE9',
    color: 'var(--coral)',
    bgColor: 'var(--coral-pale)',
    games: [
      { id: 'p1', title: 'Animal Jigsaw', difficulty: 'Easy', duration: '5 min', stars: 3 },
      { id: 'p2', title: 'Spot the Difference', difficulty: 'Medium', duration: '7 min', stars: 4 },
      { id: 'p3', title: 'Habitat Match', difficulty: 'Easy', duration: '6 min', stars: 3 },
    ],
  },
  {
    id: 'drawing',
    name: 'Drawing',
    emoji: '\uD83C\uDFA8',
    color: 'var(--amber)',
    bgColor: 'var(--orange-pale)',
    games: [
      { id: 'd1', title: 'Draw Your Favorite Animal', difficulty: 'Easy', duration: '15 min', stars: 3 },
      { id: 'd2', title: 'Zoo Design Challenge', difficulty: 'Medium', duration: '20 min', stars: 4 },
      { id: 'd3', title: 'Animal Tracing Fun', difficulty: 'Easy', duration: '10 min', stars: 3 },
    ],
  },
  {
    id: 'minigames',
    name: 'Mini Games',
    emoji: '\uD83C\uDFAE',
    color: 'var(--gold)',
    bgColor: 'var(--gold-pale)',
    games: [
      { id: 'm1', title: 'Animal Memory Match', difficulty: 'Easy', duration: '5 min', stars: 3 },
      { id: 'm2', title: 'Feeding Time Rush', difficulty: 'Medium', duration: '8 min', stars: 4 },
      { id: 'm3', title: 'Zoo Keeper Dash', difficulty: 'Hard', duration: '10 min', stars: 5 },
    ],
  },
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] } },
}

export default function KidsGames() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const activeCategory = categories.find(c => c.id === selectedCategory)

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title="Games and Quizzes" />

        <div style={{ padding: '0 24px 120px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.1 }}
              style={{ fontSize: 48, marginBottom: 10 }}
            >
              \uD83E\uDDD1\u200D\uD83C\uDF93
            </motion.div>
            <h2 className="t-display-md" style={{ marginBottom: 4 }}>
              Test your kids knowledge
            </h2>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              with Fun Tasks!
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!selectedCategory ? (
              /* ========== Category Grid ========== */
              <motion.div
                key="categories"
                variants={stagger}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 14,
                  marginBottom: 28,
                }}
              >
                {categories.map(cat => (
                  <motion.div
                    key={cat.id}
                    variants={fadeUp}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => setSelectedCategory(cat.id)}
                    className="card card-elevated"
                    style={{
                      padding: 20,
                      textAlign: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{
                      width: 60,
                      height: 60,
                      borderRadius: 'var(--radius-lg)',
                      background: cat.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 32,
                      margin: '0 auto 12px',
                    }}>
                      {cat.emoji}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{cat.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                      {cat.games.length} games
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              /* ========== Game List ========== */
              <motion.div
                key="gamelist"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <button
                  onClick={() => setSelectedCategory(null)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'var(--green-rich)',
                    marginBottom: 16,
                  }}
                >
                  <ChevronLeft size={16} /> Back to Categories
                </button>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  marginBottom: 20,
                  padding: 16,
                  borderRadius: 'var(--radius-lg)',
                  background: activeCategory?.bgColor,
                }}>
                  <span style={{ fontSize: 36 }}>{activeCategory?.emoji}</span>
                  <div>
                    <h3 className="t-display-sm">{activeCategory?.name}</h3>
                    <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{activeCategory?.games.length} games available</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                  {activeCategory?.games.map((game, i) => (
                    <motion.div
                      key={game.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      whileTap={{ scale: 0.98 }}
                      className="card"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        padding: 16,
                        cursor: 'pointer',
                      }}
                      onClick={() => navigate('/kids/activity')}
                    >
                      <div style={{
                        width: 44,
                        height: 44,
                        borderRadius: 'var(--radius-md)',
                        background: activeCategory?.bgColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <Play size={20} color={activeCategory?.color} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{game.title}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: 'var(--text-secondary)' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                            <Clock size={11} /> {game.duration}
                          </span>
                          <span className="badge" style={{
                            background: game.difficulty === 'Easy' ? 'var(--green-pale)' : game.difficulty === 'Medium' ? 'var(--gold-pale)' : 'var(--coral-pale)',
                            color: game.difficulty === 'Easy' ? 'var(--green-rich)' : game.difficulty === 'Medium' ? 'var(--yellow-medium)' : 'var(--coral)',
                            fontSize: 10,
                          }}>
                            {game.difficulty}
                          </span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 2 }}>
                        {Array.from({ length: game.stars }).map((_, si) => (
                          <Star key={si} size={12} color="var(--gold)" fill="var(--gold)" />
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => navigate('/kids/worksheets')}
            className="btn btn-ghost btn-full"
            style={{ marginTop: 8 }}
          >
            VIEW MORE WORKSHEETS <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </PageTransition>
  )
}

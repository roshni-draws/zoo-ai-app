import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, Play, Pause, Bell, Clock, Heart } from 'lucide-react'
import { PageTransition } from '../../components'
import { animalsExtended } from '../../data/animals-extended'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.32, 0.72, 0, 1] },
  }),
}

const conservationColors: Record<string, { bg: string; text: string }> = {
  'Least Concern': { bg: 'var(--green-light)', text: 'var(--green-rich)' },
  'Near Threatened': { bg: 'var(--gold-pale)', text: 'var(--yellow-medium)' },
  'Vulnerable': { bg: 'var(--amber-light)', text: 'var(--text-warning)' },
  'Endangered': { bg: 'var(--coral-pale)', text: 'var(--pink-medium)' },
  'Critically Endangered': { bg: 'var(--coral)', text: 'white' },
}

const lifeStageIcons: Record<string, string> = {
  Egg: '\u{1F95A}',
  Cub: '\u{1F43E}',
  Calf: '\u{1F43E}',
  Pup: '\u{1F43E}',
  Joey: '\u{1F43E}',
  Infant: '\u{1F476}',
  Chick: '\u{1F423}',
  Hatchling: '\u{1F423}',
  Tadpole: '\u{1F4A7}',
  Froglet: '\u{1F438}',
  Caterpillar: '\u{1F41B}',
  Chrysalis: '\u{1FAB9}',
  Larva: '\u{1F41B}',
  Juvenile: '\u{2B50}',
  'Sub-adult': '\u{1F31F}',
  Blackback: '\u{1F31F}',
  Silverback: '\u{1F451}',
  Adult: '\u{2728}',
  Senior: '\u{1F451}',
}

export default function AnimalDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioProgress, setAudioProgress] = useState(0)

  const animal = animalsExtended.find(a => a.id === id)
  if (!animal) {
    return (
      <PageTransition>
        <div className="page-scroll" style={{ textAlign: 'center', paddingTop: 80 }}>
          <p className="t-body" style={{ color: 'var(--text-secondary)' }}>Animal not found</p>
        </div>
      </PageTransition>
    )
  }

  // Extract the conservation status label (e.g. "Vulnerable" from "Vulnerable -- ...")
  const conservationLabel = animal.conservation.split(' \u2014 ')[0].split(' — ')[0].split(' -')[0].trim()
  const colors = conservationColors[conservationLabel] || conservationColors['Vulnerable']
  const related = animal.id
    ? animalsExtended.filter(a => a.id !== animal.id).slice(0, 5)
    : []

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying)
    if (!isPlaying) {
      const interval = setInterval(() => {
        setAudioProgress(prev => {
          if (prev >= 100) { clearInterval(interval); setIsPlaying(false); return 0 }
          return prev + 0.5
        })
      }, 100)
    }
  }

  const taxonomyEntries = animal.taxonomy
    ? Object.entries(animal.taxonomy).map(([key, value]) => ({
        label: key.charAt(0).toUpperCase() + key.slice(1),
        value,
      }))
    : []

  const quickFacts = animal.quickFacts || []

  // Build diet items from the diet string
  const dietText = animal.diet || ''
  const dietType = dietText.split(' — ')[0] || ''
  const dietDetails = dietText.split(' — ')[1] || ''
  const dietItemsList = dietDetails ? dietDetails.split(', ').map(item => {
    const cleaned = item.replace(/\(.*\)/, '').trim()
    return cleaned
  }) : []

  // Build feeding times from quickFacts or generic
  const feedingTimes = ['10:00 AM', '2:30 PM']

  // Life stage labels for this animal
  const categoryStages: Record<string, string[]> = {
    mammal: ['Cub', 'Juvenile', 'Sub-adult', 'Adult'],
    bird: ['Egg', 'Chick', 'Juvenile', 'Adult'],
    reptile: ['Egg', 'Hatchling', 'Juvenile', 'Adult'],
    aquatic: ['Pup', 'Juvenile', 'Sub-adult', 'Adult'],
    amphibian: ['Egg', 'Tadpole', 'Froglet', 'Adult'],
    insect: ['Egg', 'Caterpillar', 'Chrysalis', 'Adult'],
  }
  const lifeStages = categoryStages[animal.category] || ['Juvenile', 'Adult']
  const currentStageIndex = lifeStages.length - 1 // default to adult

  return (
    <PageTransition>
      {/* Hero Image */}
      <div style={{ position: 'relative', height: 280, overflow: 'hidden' }}>
        <img
          src={animal.image}
          alt={animal.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 40%, transparent 70%)',
        }} />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            position: 'absolute',
            top: 'calc(env(safe-area-inset-top, 12px) + 12px)',
            left: 'var(--space-lg)',
            width: 36,
            height: 36,
            borderRadius: 'var(--radius-full)',
            background: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            zIndex: 10,
          }}
        >
          <ChevronLeft size={22} />
        </button>

        {/* Save button */}
        <button
          style={{
            position: 'absolute',
            top: 'calc(env(safe-area-inset-top, 12px) + 12px)',
            right: 'var(--space-lg)',
            width: 36,
            height: 36,
            borderRadius: 'var(--radius-full)',
            background: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            zIndex: 10,
          }}
        >
          <Heart size={18} />
        </button>

        {/* Name overlay */}
        <div style={{
          position: 'absolute',
          bottom: 'var(--space-xl)',
          left: 'var(--space-xl)',
          right: 'var(--space-xl)',
        }}>
          <h1 className="t-display-lg" style={{ color: 'white', marginBottom: 2 }}>
            {animal.emoji} {animal.individual || animal.name}
          </h1>
          <p className="t-body-sm" style={{ color: 'rgba(255,255,255,0.75)', fontStyle: 'italic' }}>
            {animal.taxonomy.species}
          </p>
        </div>
      </div>

      <div className="page-scroll" style={{ paddingTop: 'var(--space-xl)', paddingBottom: 120 }}>
        {/* Conservation Status Badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          style={{ marginBottom: 'var(--space-xl)' }}
        >
          <span
            className="badge"
            style={{
              background: colors.bg,
              color: colors.text,
              fontSize: 12,
              padding: '5px 14px',
            }}
          >
            {conservationLabel}
          </span>
        </motion.div>

        {/* Description */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          style={{ marginBottom: 'var(--space-2xl)' }}
        >
          <p className="t-body" style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}>
            {animal.fact}
          </p>
        </motion.div>

        {/* Audio Narration Bar */}
        {animal.audioNarration && (
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="card"
            style={{
              padding: 'var(--space-md) var(--space-lg)',
              marginBottom: 'var(--space-2xl)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-md)',
              background: 'var(--green-pale)',
              border: '1px solid var(--green-light)',
            }}
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handlePlayToggle}
              style={{
                width: 40,
                height: 40,
                borderRadius: 'var(--radius-full)',
                background: 'var(--green-deep)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color: 'white',
              }}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: 2 }} />}
            </motion.button>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                Audio Narration
              </div>
              <div className="progress-bar">
                <motion.div
                  className="progress-bar-fill"
                  animate={{ width: `${audioProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
            <span className="t-caption" style={{ color: 'var(--text-secondary)', flexShrink: 0 }}>
              3:45
            </span>
          </motion.div>
        )}

        {/* Taxonomy Grid */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          style={{ marginBottom: 'var(--space-2xl)' }}
        >
          <h3 className="t-display-sm" style={{ marginBottom: 'var(--space-md)' }}>Taxonomy</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
            {taxonomyEntries.map(({ label, value }) => (
              <div
                key={label}
                style={{
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <span className="t-label" style={{ color: 'var(--text-tertiary)', fontSize: 9 }}>
                  {label}
                </span>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Facts Grid */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          style={{ marginBottom: 'var(--space-2xl)' }}
        >
          <h3 className="t-display-sm" style={{ marginBottom: 'var(--space-md)' }}>Quick Facts</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
            {quickFacts.map((fact) => (
              <div
                key={fact.label}
                className="card"
                style={{ padding: 'var(--space-md) var(--space-lg)' }}
              >
                <div className="t-label" style={{ color: 'var(--text-tertiary)', marginBottom: 4 }}>
                  {fact.label}
                </div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{fact.value}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Life Stage Visual */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          style={{ marginBottom: 'var(--space-2xl)' }}
        >
          <h3 className="t-display-sm" style={{ marginBottom: 'var(--space-lg)' }}>Life Stage</h3>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            padding: '0 var(--space-sm)',
          }}>
            {/* Connecting line */}
            <div style={{
              position: 'absolute',
              top: 24,
              left: 40,
              right: 40,
              height: 3,
              background: 'var(--border-light)',
              borderRadius: 2,
            }}>
              <div style={{
                height: '100%',
                width: `${(currentStageIndex / (lifeStages.length - 1)) * 100}%`,
                background: 'linear-gradient(90deg, var(--green-rich), var(--green-mid))',
                borderRadius: 2,
                transition: 'width 0.5s ease',
              }} />
            </div>

            {lifeStages.map((stage, i) => {
              const isActive = i <= currentStageIndex
              return (
                <div
                  key={stage}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 8,
                    zIndex: 1,
                  }}
                >
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 'var(--radius-full)',
                    background: isActive ? 'var(--green-pale)' : 'var(--bg-card)',
                    border: isActive ? '2px solid var(--green-rich)' : '2px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 22,
                    transition: 'all 0.3s ease',
                  }}>
                    {lifeStageIcons[stage] || '\u{2B50}'}
                  </div>
                  <span className="t-caption" style={{
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? 'var(--green-rich)' : 'var(--text-tertiary)',
                    textAlign: 'center',
                    fontSize: 11,
                  }}>
                    {stage}
                  </span>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Diet Section */}
        <motion.div
          custom={6}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          style={{ marginBottom: 'var(--space-2xl)' }}
        >
          <h3 className="t-display-sm" style={{ marginBottom: 4 }}>Diet</h3>
          <p className="t-body-sm" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-md)' }}>
            {dietType}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
            {dietItemsList.map((item) => (
              <span
                key={item}
                className="chip"
                style={{ fontSize: 13 }}
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Feeding Times */}
        <motion.div
          custom={7}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          style={{ marginBottom: 'var(--space-2xl)' }}
        >
          <h3 className="t-display-sm" style={{ marginBottom: 'var(--space-md)' }}>Feeding Times</h3>
          <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
            {feedingTimes.map((time) => (
              <div
                key={time}
                className="card"
                style={{
                  padding: 'var(--space-md) var(--space-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-sm)',
                  flex: 1,
                }}
              >
                <Clock size={16} color="var(--green-rich)" />
                <span style={{ fontSize: 14, fontWeight: 600 }}>{time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Related Animals */}
        <motion.div
          custom={8}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          style={{ marginBottom: 'var(--space-2xl)' }}
        >
          <h3 className="t-display-sm" style={{ marginBottom: 'var(--space-md)' }}>Related Animals</h3>
          <div style={{
            display: 'flex',
            gap: 'var(--space-md)',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            paddingBottom: 'var(--space-sm)',
            margin: '0 calc(-1 * var(--space-xl))',
            padding: '0 var(--space-xl) var(--space-sm)',
          }}>
            {related.map((r) => (
              <motion.div
                key={r.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/discover/animal/${r.id}`)}
                style={{
                  flexShrink: 0,
                  width: 140,
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  width: '100%',
                  height: 100,
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  background: 'var(--bg-placeholder)',
                }}>
                  <img
                    src={r.image}
                    alt={r.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                </div>
                <div style={{ marginTop: 8 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{r.emoji} {r.individual || r.name}</div>
                  <div className="t-caption" style={{ color: 'var(--text-secondary)' }}>{r.name}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Sticky Bottom Button */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 430,
        padding: 'var(--space-lg) var(--space-xl)',
        paddingBottom: 'calc(var(--space-lg) + env(safe-area-inset-bottom, 0px) + 72px)',
        background: 'linear-gradient(to top, var(--bg-primary) 70%, transparent)',
        zIndex: 30,
      }}>
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="btn btn-primary btn-full"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <Bell size={18} />
          ADD REMINDER
        </motion.button>
      </div>
    </PageTransition>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Sun, Clock, Navigation, ChevronRight, Star, Footprints, Eye, Heart, ArrowRight, Share2, RefreshCw, Sparkles, Zap, Coffee, TreePine, Target, Shield, Umbrella, Car, Timer } from 'lucide-react'
import { useApp } from './context'
import { animals, events, zones, newsItems, defaultPlanStops } from './data'
import { SectionHeader, AnimalCard, EventCard, PageTransition } from './components'

/* ============================================
   Home Tab — State Router
   ============================================ */

export function Home() {
  const { visitState, cycleVisitState } = useApp()

  return (
    <PageTransition>
      <div className="page">
        {/* State Switcher (demo only) */}
        <div style={{
          position: 'sticky',
          top: 0,
          zIndex: 45,
          padding: '8px 16px',
          display: 'flex',
          gap: 6,
          overflowX: 'auto',
          background: 'var(--bg-primary)',
          borderBottom: '1px solid var(--border-light)',
          scrollbarWidth: 'none',
        }}>
          {(['discovery', 'pre-visit', 'in-park', 'post-visit'] as const).map(s => (
            <button
              key={s}
              onClick={cycleVisitState}
              className={`chip ${visitState === s ? 'chip-active' : ''}`}
              style={{ fontSize: 11, padding: '6px 12px' }}
            >
              {s === 'discovery' ? '🔍' : s === 'pre-visit' ? '📅' : s === 'in-park' ? '📍' : '✨'} {s}
            </button>
          ))}
        </div>

        {visitState === 'discovery' && <DiscoveryState />}
        {visitState === 'pre-visit' && <PreVisitState />}
        {visitState === 'in-park' && <InParkState />}
        {visitState === 'post-visit' && <PostVisitState />}
      </div>
    </PageTransition>
  )
}

/* ============================================
   State A: Discovery
   ============================================ */

function DiscoveryState() {
  const navigate = useNavigate()
  const { currentZoo } = useApp()

  return (
    <div style={{ padding: '16px 20px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
          <MapPin size={16} color="var(--green-rich)" />
          <span className="t-heading">{currentZoo}</span>
        </div>
        <div style={{ display: 'flex', gap: 16, color: 'var(--text-secondary)', fontSize: 13 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Clock size={13} /> Open today: 9am – 5pm
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Sun size={13} /> 76°F
          </span>
        </div>
      </div>

      {/* Plan CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-gradient"
        style={{
          borderRadius: 'var(--radius-xl)',
          padding: '28px 24px',
          marginBottom: 28,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute',
          top: -30,
          right: -20,
          fontSize: 100,
          opacity: 0.08,
        }}>🦁</div>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 24,
          fontWeight: 600,
          marginBottom: 6,
          color: 'white',
          fontVariationSettings: "'opsz' 48",
        }}>Plan Your Visit</h2>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', marginBottom: 18, lineHeight: 1.4 }}>
          Let AI build your perfect zoo day
        </p>
        <button
          onClick={() => navigate('/plan/builder')}
          className="btn"
          style={{
            background: 'white',
            color: 'var(--green-deep)',
            fontWeight: 700,
            padding: '12px 24px',
          }}
        >
          <Sparkles size={16} /> Start Planning
        </button>
      </motion.div>

      {/* Popular Right Now */}
      <SectionHeader title="Popular Right Now" action="See all" />
      <div className="scroll-x" style={{ marginLeft: -20, marginRight: -20, marginBottom: 28, paddingLeft: 20, paddingRight: 20 }}>
        {animals.filter(a => a.status === 'active' || a.status === 'feeding').slice(0, 6).map(animal => (
          <AnimalCard
            key={animal.id}
            animal={animal}
            onClick={() => navigate('/map')}
          />
        ))}
      </div>

      {/* Upcoming Events */}
      <SectionHeader title="Upcoming Events" />
      <div style={{ marginBottom: 28 }}>
        {events.slice(0, 3).map(event => (
          <motion.div key={event.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <EventCard event={event} />
          </motion.div>
        ))}
      </div>

      {/* Explore the Zoo */}
      <SectionHeader title="Explore the Zoo" action="View Map" onAction={() => navigate('/map')} />
      <div className="scroll-x" style={{ marginLeft: -20, marginRight: -20, marginBottom: 28, paddingLeft: 20, paddingRight: 20 }}>
        {zones.map(zone => (
          <motion.div
            key={zone.id}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/map')}
            style={{
              width: 200,
              flexShrink: 0,
              cursor: 'pointer',
            }}
          >
            <div style={{
              width: '100%',
              height: 110,
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              position: 'relative',
              background: 'var(--bg-placeholder)',
            }}>
              <img src={zone.image} alt={zone.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '16px 12px 8px',
                background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
                color: 'white',
              }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{zone.name}</div>
                <div style={{ fontSize: 11, opacity: 0.8 }}>{zone.animals} animals</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Zoo News */}
      <SectionHeader title="Zoo News" />
      {newsItems.map(item => (
        <div key={item.id} className="card" style={{ display: 'flex', gap: 12, padding: 12, marginBottom: 8 }}>
          <div style={{
            width: 72,
            height: 72,
            borderRadius: 'var(--radius-sm)',
            overflow: 'hidden',
            flexShrink: 0,
            background: 'var(--bg-placeholder)',
          }}>
            <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{item.title}</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>{item.subtitle}</div>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{item.date}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ============================================
   State B: Pre-Visit
   ============================================ */

function PreVisitState() {
  const navigate = useNavigate()
  const { currentZoo } = useApp()
  const [checklist, setChecklist] = useState([
    { text: 'Tickets purchased (2 adults, 2 kids)', done: true },
    { text: 'Stroller reserved', done: true },
    { text: 'Download offline map', done: false },
    { text: 'Pack sunscreen (UV index: 7)', done: false },
  ])

  const toggleCheck = (i: number) => {
    setChecklist(prev => prev.map((item, idx) => idx === i ? { ...item, done: !item.done } : item))
  }

  return (
    <div style={{ padding: '16px 20px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
          <MapPin size={16} color="var(--green-rich)" />
          <span className="t-heading">{currentZoo}</span>
        </div>
        <div style={{ display: 'flex', gap: 12, color: 'var(--text-secondary)', fontSize: 13 }}>
          <span>📅 Your visit: Saturday, Feb 21</span>
          <span>☀️ 72°F</span>
        </div>
      </div>

      {/* Trip Summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-gradient"
        style={{
          borderRadius: 'var(--radius-xl)',
          padding: '24px',
          marginBottom: 24,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 16 }}>
          <div>
            <div className="t-label" style={{ color: 'var(--gold-light)', marginBottom: 6 }}>YOUR TRIP</div>
            <div style={{ color: 'white', fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600 }}>Saturday, Feb 21</div>
          </div>
          <span style={{ fontSize: 11, background: 'rgba(255,255,255,0.15)', padding: '4px 10px', borderRadius: 20, color: 'white' }}>
            5 days away
          </span>
        </div>
        <div style={{ display: 'flex', gap: 20, marginBottom: 16 }}>
          <div><div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Stops</div><div style={{ color: 'white', fontWeight: 600 }}>7 exhibits</div></div>
          <div><div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Duration</div><div style={{ color: 'white', fontWeight: 600 }}>9am – 2:30pm</div></div>
        </div>
        <div style={{ fontSize: 24, letterSpacing: 4, marginBottom: 16 }}>
          🦁 → 🦒 → 🍽️ → 🐘 → 🐧 → 🦍 → 🐻‍❄️
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => navigate('/plan/itinerary')} className="btn btn-sm" style={{ background: 'white', color: 'var(--green-deep)', fontWeight: 600 }}>
            View Full Plan
          </button>
          <button className="btn btn-sm" style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}>
            Edit Plan
          </button>
        </div>
      </motion.div>

      {/* Pre-Visit Checklist */}
      <SectionHeader title="Pre-Visit Checklist" />
      <div className="card" style={{ marginBottom: 24, padding: 16 }}>
        {checklist.map((item, i) => (
          <button
            key={i}
            onClick={() => toggleCheck(i)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px 0',
              borderBottom: i < checklist.length - 1 ? '1px solid var(--border-light)' : 'none',
              width: '100%',
              textAlign: 'left',
            }}
          >
            <div style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              border: item.done ? 'none' : '2px solid var(--border)',
              background: item.done ? 'var(--green-rich)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'all 0.2s ease',
            }}>
              {item.done && <span style={{ color: 'white', fontSize: 12 }}>✓</span>}
            </div>
            <span style={{
              fontSize: 14,
              color: item.done ? 'var(--text-secondary)' : 'var(--text-primary)',
              textDecoration: item.done ? 'line-through' : 'none',
            }}>
              {item.text}
            </span>
          </button>
        ))}
      </div>

      {/* Anticipation Engine — Multi-day Countdown */}
      <SectionHeader title="Getting Excited?" />
      <div className="scroll-x" style={{ marginLeft: -20, marginRight: -20, marginBottom: 16, paddingLeft: 20, paddingRight: 20 }}>
        {/* Day 5 — Animal Preview */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card card-elevated"
          style={{ width: 260, flexShrink: 0, overflow: 'hidden', padding: 0 }}
        >
          <div style={{
            height: 130,
            background: `url(${animals[0].image}) center/cover`,
            position: 'relative',
          }}>
            <span style={{
              position: 'absolute',
              top: 10,
              left: 10,
              background: 'var(--green-rich)',
              color: 'white',
              fontSize: 11,
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: 10,
            }}>5 DAYS AWAY</span>
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '20px 14px 10px',
              background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
              color: 'white',
            }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Meet Izu — the lion on your plan</div>
            </div>
          </div>
          <div style={{ padding: 12 }}>
            <p style={{ fontSize: 13, lineHeight: 1.4, color: 'var(--text-secondary)' }}>
              {animals[0].fact}
            </p>
          </div>
        </motion.div>

        {/* Day 4 — Scavenger Challenge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card card-elevated"
          style={{ width: 260, flexShrink: 0, padding: 16 }}
        >
          <span style={{
            background: 'var(--gold-pale)',
            color: 'var(--gold-dark)',
            fontSize: 11,
            fontWeight: 700,
            padding: '3px 8px',
            borderRadius: 10,
            marginBottom: 10,
            display: 'inline-block',
          }}>4 DAYS AWAY</span>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🔍</div>
          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>Scavenger Challenge</div>
          <p style={{ fontSize: 13, lineHeight: 1.4, color: 'var(--text-secondary)', marginBottom: 12 }}>
            Can you find 5 hidden animal sculptures along the trail? Ella & Kai will love this!
          </p>
          <button className="btn btn-sm" style={{ background: 'var(--gold-pale)', color: 'var(--gold-dark)', fontWeight: 600, fontSize: 12 }}>
            <Target size={12} /> Preview the hunt
          </button>
        </motion.div>

        {/* Day 3 — Kid Fun Fact */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card card-elevated"
          style={{ width: 260, flexShrink: 0, padding: 16 }}
        >
          <span style={{
            background: 'var(--coral-pale)',
            color: 'var(--coral)',
            fontSize: 11,
            fontWeight: 700,
            padding: '3px 8px',
            borderRadius: 10,
            marginBottom: 10,
            display: 'inline-block',
          }}>3 DAYS AWAY</span>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🐧</div>
          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>Fun Fact for Ella</div>
          <p style={{ fontSize: 13, lineHeight: 1.4, color: 'var(--text-secondary)', marginBottom: 12 }}>
            Penguins can hold their breath for up to 20 minutes! Ask the keeper about it at Penguin Beach.
          </p>
          <button onClick={() => navigate('/map')} className="btn btn-sm" style={{ background: 'var(--coral-pale)', color: 'var(--coral)', fontWeight: 600, fontSize: 12 }}>
            See on map
          </button>
        </motion.div>
      </div>

      {/* Comfort Assurance Block */}
      <SectionHeader title="Arrival Plan" />
      <div className="card" style={{
        background: 'var(--gold-pale)',
        border: '1px solid var(--gold-light)',
        marginBottom: 16,
        padding: 0,
        overflow: 'hidden',
      }}>
        {[
          { icon: <Car size={15} color="var(--green-rich)" />, label: 'Entry', detail: 'Front Gate entrance · Opens 8:30am · Est. 5 min wait' },
          { icon: <span style={{ fontSize: 14 }}>🅿️</span>, label: 'Parking', detail: 'Lot B recommended · $20 · Opens 8:00am' },
          { icon: <Sun size={15} color="var(--gold-dark)" />, label: 'Weather', detail: '72°F sunny · UV 7 · Shade routes available' },
          { icon: <span style={{ fontSize: 14 }}>👶</span>, label: 'Equipment', detail: 'Stroller pickup at Guest Services (left of entry)' },
          { icon: <Shield size={15} color="var(--coral)" />, label: 'Crowds', detail: 'Moderate expected · Best arrival: 9:00am' },
        ].map((item, i, arr) => (
          <div key={item.label} style={{
            display: 'flex',
            gap: 12,
            alignItems: 'start',
            padding: '12px 16px',
            borderBottom: i < arr.length - 1 ? '1px solid var(--gold-light)' : 'none',
          }}>
            <div style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: 'rgba(255,255,255,0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>{item.icon}</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 1 }}>{item.label}</div>
              <div style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.4 }}>{item.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ============================================
   State C: In-Park (Live Mode)
   ============================================ */

function InParkState() {
  const navigate = useNavigate()
  const { setAudioPlaying } = useApp()
  const [energyResponse, setEnergyResponse] = useState<null | 'great' | 'tired' | 'break'>(null)
  const [insightDismissed, setInsightDismissed] = useState(false)

  return (
    <div style={{ padding: '16px 20px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          <div style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: 'var(--green-active)',
            animation: 'breathe 2s ease-in-out infinite',
          }} />
          <span className="t-heading">You're at San Diego Zoo</span>
        </div>
        <div style={{ display: 'flex', gap: 16, fontSize: 13, color: 'var(--text-secondary)' }}>
          <span><Clock size={12} style={{ display: 'inline', verticalAlign: -1 }} /> 2h 15m in park</span>
          <span><Footprints size={12} style={{ display: 'inline', verticalAlign: -1 }} /> 1.8 mi walked</span>
        </div>
      </div>

      {/* Live Itinerary */}
      <div className="card-gradient" style={{
        borderRadius: 'var(--radius-xl)',
        padding: '20px',
        marginBottom: 20,
      }}>
        <div className="t-label" style={{ color: 'var(--gold-light)', marginBottom: 12 }}>LIVE ITINERARY</div>
        {defaultPlanStops.slice(0, 4).map((stop, i) => (
          <div key={stop.id} style={{
            display: 'flex',
            gap: 12,
            padding: '8px 0',
            opacity: stop.completed ? 0.5 : 1,
            borderLeft: `2px solid ${stop.completed ? 'rgba(255,255,255,0.2)' : i === 2 ? 'var(--gold)' : 'rgba(255,255,255,0.15)'}`,
            paddingLeft: 14,
            marginLeft: 4,
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              left: -6,
              top: 12,
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: stop.completed ? 'rgba(255,255,255,0.3)' : i === 2 ? 'var(--gold)' : 'rgba(255,255,255,0.4)',
              border: stop.completed ? 'none' : i === 2 ? '2px solid var(--gold-light)' : 'none',
            }} />
            <div style={{ flex: 1 }}>
              <div style={{ color: 'white', fontSize: 14, fontWeight: stop.completed ? 400 : 600 }}>
                {stop.emoji} {stop.name}
                {stop.completed && <span style={{ marginLeft: 6, color: 'rgba(255,255,255,0.5)' }}>✓</span>}
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                {stop.time} · {stop.duration}
              </div>
            </div>
            {!stop.completed && i === 2 && (
              <button
                onClick={() => navigate('/map')}
                className="btn btn-sm"
                style={{ background: 'var(--gold)', color: 'white', fontSize: 12 }}
              >
                <Navigation size={12} /> Go
              </button>
            )}
          </div>
        ))}
        <button
          onClick={() => navigate('/plan/itinerary')}
          style={{ color: 'var(--gold-light)', fontSize: 13, fontWeight: 600, marginTop: 8, marginLeft: 18 }}
        >
          View full plan →
        </button>
      </div>

      {/* Family Tracker */}
      <div className="card" style={{ marginBottom: 16, padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span className="t-heading">👨‍👩‍👧‍👦 Family</span>
          <button onClick={() => navigate('/map')} style={{ fontSize: 12, color: 'var(--green-rich)', fontWeight: 600 }}>View on Map</button>
        </div>
        {[
          { name: 'Jordan', loc: 'Gift Shop', dist: '200ft', emoji: '🧑' },
          { name: 'Ella & Kai', loc: 'With you', dist: '', emoji: '👧' },
        ].map(member => (
          <div key={member.name} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '8px 0',
          }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'var(--green-pale)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
            }}>{member.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{member.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{member.loc}</div>
            </div>
            {member.dist && <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{member.dist}</span>}
          </div>
        ))}
      </div>

      {/* Happening Now */}
      <SectionHeader title="Happening Now" />
      <div className="card" style={{ marginBottom: 16, padding: 14, display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: 'var(--coral-pale)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 22,
        }}>🐟</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontWeight: 600, fontSize: 14 }}>Sea Lion Feeding</span>
            <span className="badge badge-live">LIVE</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Sea Lion Point · 3 min walk</div>
        </div>
        <button onClick={() => navigate('/map')} className="btn btn-sm btn-primary" style={{ fontSize: 12 }}>Go</button>
      </div>

      {/* AI Insight */}
      {!insightDismissed && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
          style={{
            marginBottom: 16,
            padding: 16,
            background: 'var(--green-pale)',
            border: '1px solid var(--green-light)',
          }}
        >
          <div style={{ display: 'flex', gap: 10 }}>
            <Sparkles size={18} color="var(--green-rich)" style={{ flexShrink: 0, marginTop: 2 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>AI Insight</div>
              <p style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--text-secondary)' }}>
                Crowds are building at Panda Ridge. Skip it for now — it clears up after 2pm.
              </p>
            </div>
            <button onClick={() => setInsightDismissed(true)} style={{ color: 'var(--text-tertiary)', fontSize: 12, alignSelf: 'start' }}>✕</button>
          </div>
        </motion.div>
      )}

      {/* Food Decision */}
      <div className="card card-elevated" style={{ marginBottom: 16, padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <Coffee size={16} color="var(--gold)" />
          <span className="t-heading">Lunch time?</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
          {[
            { name: "Albert's", dist: '5 min', wait: 'No wait', note: 'Outdoor seating, kids menu' },
            { name: 'Treehouse Cafe', dist: '3 min', wait: '5 min', note: 'Shaded, near playground' },
          ].map(r => (
            <button key={r.name} className="card" style={{ padding: 12, textAlign: 'left', border: '1.5px solid var(--border)' }}>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{r.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                {r.dist} · {r.wait}<br />{r.note}
              </div>
            </button>
          ))}
        </div>
        <button className="btn btn-ghost btn-sm" style={{ margin: '0 auto', display: 'block' }}>Not hungry yet</button>
      </div>

      {/* Energy Check-In */}
      {energyResponse === null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card card-gold"
          style={{ borderRadius: 'var(--radius-xl)', padding: 24, textAlign: 'center', marginBottom: 16 }}
        >
          <div style={{ fontSize: 32, marginBottom: 8 }}>🌡️</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, marginBottom: 4 }}>
            How's everyone doing?
          </div>
          <p style={{ fontSize: 13, opacity: 0.8, marginBottom: 16 }}>
            You've been exploring for 2 hours
          </p>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { label: 'Great, keep going!', emoji: '💪', value: 'great' as const },
              { label: 'Getting tired', emoji: '😅', value: 'tired' as const },
              { label: 'Need a break', emoji: '😮‍💨', value: 'break' as const },
            ].map(opt => (
              <button
                key={opt.label}
                onClick={() => setEnergyResponse(opt.value)}
                className="btn btn-sm"
                style={{ background: 'rgba(255,255,255,0.2)', color: 'white', fontSize: 12 }}
              >
                {opt.emoji} {opt.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Energy Response: Tired — Adjusted Plan */}
      {energyResponse === 'tired' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
          style={{ marginBottom: 16, padding: 0, overflow: 'hidden' }}
        >
          <div style={{
            background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <Sparkles size={18} color="white" />
            <div style={{ color: 'white', fontWeight: 600, fontSize: 15 }}>Plan adjusted for your energy</div>
          </div>
          <div style={{ padding: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'start' }}>
                <span style={{ fontSize: 16 }}>🗑️</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>Dropped</div>
                  <div style={{ fontSize: 14 }}>Monkey Trail — moved to next visit</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'start' }}>
                <span style={{ fontSize: 16 }}>🪑</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--green-rich)' }}>Added</div>
                  <div style={{ fontSize: 14 }}>15 min rest at Treetop Terrace (shaded)</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'start' }}>
                <span style={{ fontSize: 16 }}>🍽️</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--coral)' }}>Moved up</div>
                  <div style={{ fontSize: 14 }}>Lunch at Albert's — 10 min walk, kids menu</div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setEnergyResponse('great')} className="btn btn-primary btn-sm" style={{ flex: 1 }}>Sounds good</button>
              <button onClick={() => setEnergyResponse(null)} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>Show me options</button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Energy Response: Break — Quiet Spot Finder */}
      {energyResponse === 'break' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
          style={{ marginBottom: 16, padding: 0, overflow: 'hidden' }}
        >
          <div style={{
            background: 'linear-gradient(135deg, #5B8C6F, var(--green-rich))',
            padding: '20px',
            textAlign: 'center',
          }}>
            <TreePine size={28} color="white" style={{ marginBottom: 6 }} />
            <div style={{ color: 'white', fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, marginBottom: 4 }}>
              Nearest Quiet Spot
            </div>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Take all the time you need</div>
          </div>
          <div style={{ padding: 16 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: 14,
              background: 'var(--green-pale)',
              borderRadius: 'var(--radius-md)',
              marginBottom: 12,
            }}>
              <span style={{ fontSize: 28 }}>🌳</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>Treetop Garden</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>2 min walk · Shaded benches</div>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2 }}>Water fountain · Restrooms nearby</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => navigate('/map')} className="btn btn-primary btn-sm" style={{ flex: 1 }}>
                <Navigation size={14} /> Navigate there
              </button>
              <button onClick={() => setEnergyResponse(null)} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>Find another</button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Progress */}
      <div className="card" style={{ padding: 16, marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span className="t-heading">Today's Progress</span>
          <span style={{ fontWeight: 700, color: 'var(--green-rich)', fontSize: 14 }}>35%</span>
        </div>
        <div className="progress-bar" style={{ marginBottom: 8 }}>
          <div className="progress-bar-fill" style={{ width: '35%' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-secondary)' }}>
          <span>3 of 7 stops visited</span>
          <span>4 exhibits explored</span>
        </div>
      </div>

      {/* Next Move Suggestion */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
        style={{
          marginBottom: 16,
          padding: 16,
          background: 'var(--green-pale)',
          border: '1px solid var(--green-light)',
        }}
      >
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: 'var(--green-rich)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
            flexShrink: 0,
          }}>🐘</div>
          <div style={{ flex: 1 }}>
            <div className="t-label" style={{ color: 'var(--green-rich)', marginBottom: 4 }}>NEXT UP</div>
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 2 }}>Elephant Odyssey</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>5 min walk · Low crowds right now</div>
            <div style={{
              fontSize: 12,
              color: 'var(--green-rich)',
              background: 'white',
              padding: '6px 10px',
              borderRadius: 'var(--radius-sm)',
              marginBottom: 10,
              lineHeight: 1.4,
            }}>
              <Sparkles size={11} style={{ display: 'inline', verticalAlign: -1 }} /> Ella asked about elephants earlier — perfect timing!
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => navigate('/map')} className="btn btn-primary btn-sm" style={{ fontSize: 12 }}>
                <Navigation size={12} /> Let's go
              </button>
              <button className="btn btn-ghost btn-sm" style={{ fontSize: 12 }}>Skip</button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Exit Timing */}
      <div className="card card-elevated" style={{ marginBottom: 16, padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <Timer size={16} color="var(--coral)" />
          <span className="t-heading">Ready to head out?</span>
        </div>
        <div style={{
          display: 'flex',
          gap: 16,
          marginBottom: 14,
          padding: 12,
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
        }}>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--green-rich)' }}>4</div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>stops left</div>
          </div>
          <div style={{ width: 1, background: 'var(--border-light)' }} />
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--gold)' }}>~2h</div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>remaining</div>
          </div>
          <div style={{ width: 1, background: 'var(--border-light)' }} />
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--coral)' }}>35%</div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>complete</div>
          </div>
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Star size={13} color="var(--gold)" /> Your must-sees left: <strong>Elephants, Penguins</strong>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => navigate('/map')} className="btn btn-sm" style={{
            flex: 1,
            background: 'var(--coral-pale)',
            color: 'var(--coral)',
            fontWeight: 600,
          }}>Head to exit</button>
          <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>Keep exploring</button>
        </div>
      </div>
    </div>
  )
}

/* ============================================
   State D: Post-Visit
   ============================================ */

function PostVisitState() {
  const navigate = useNavigate()
  const { user } = useApp()

  return (
    <div style={{ padding: '16px 20px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 className="t-display-md">Welcome back, {user.name}</h1>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Last visit: Feb 14, 2025</p>
      </div>

      {/* Visit Recap */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card card-elevated"
        style={{ marginBottom: 20, padding: 0, overflow: 'hidden' }}
      >
        <div style={{
          height: 140,
          background: 'linear-gradient(135deg, var(--green-deep), var(--green-rich))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
          <div style={{ textAlign: 'center', color: 'white' }}>
            <div style={{ fontSize: 14, opacity: 0.7, marginBottom: 4 }}>February 14 Visit</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 600 }}>4h 23m</div>
            <div style={{ display: 'flex', gap: 16, marginTop: 8, fontSize: 12, justifyContent: 'center' }}>
              <span><Footprints size={12} style={{ display: 'inline', verticalAlign: -1 }} /> 3.2 mi</span>
              <span><Eye size={12} style={{ display: 'inline', verticalAlign: -1 }} /> 12 animals</span>
              <span><Star size={12} style={{ display: 'inline', verticalAlign: -1 }} /> 5 stamps</span>
            </div>
          </div>
        </div>
        <div style={{ padding: 16, display: 'flex', gap: 8 }}>
          <button onClick={() => navigate('/profile/visits')} className="btn btn-primary btn-sm" style={{ flex: 1 }}>View Full Recap</button>
          <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}><Share2 size={14} /> Share</button>
        </div>
      </motion.div>

      {/* Top Animal */}
      <SectionHeader title="Your Star Connection" />
      <div className="card" style={{ display: 'flex', gap: 14, padding: 14, marginBottom: 20 }}>
        <div style={{
          width: 64,
          height: 64,
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          flexShrink: 0,
          background: 'var(--bg-placeholder)',
        }}>
          <img src={animals[0].image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 15 }}>🦁 Izu — African Lion</div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Longest stop · 11 min</div>
          <button className="btn btn-sm" style={{ background: 'var(--green-pale)', color: 'var(--green-rich)', fontWeight: 600, fontSize: 12 }}>
            <Heart size={12} /> Follow Izu's updates
          </button>
        </div>
      </div>

      {/* Living Connection */}
      <div className="card" style={{
        background: 'var(--gold-pale)',
        border: '1px solid var(--gold-light)',
        marginBottom: 20,
      }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 28 }}>🦁</span>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>Izu just became a father!</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Two cubs born last week. Mom and babies are healthy.
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <button className="btn btn-sm btn-primary">See Photos</button>
          <button className="btn btn-sm btn-gold">Adopt Izu — $25</button>
        </div>
      </div>

      {/* What You Missed */}
      <SectionHeader title="What You Missed" />
      <div className="scroll-x" style={{ marginLeft: -20, marginRight: -20, marginBottom: 20, paddingLeft: 20, paddingRight: 20 }}>
        {animals.filter(a => !['lion', 'elephant', 'penguin'].includes(a.id)).slice(0, 5).map(animal => (
          <AnimalCard key={animal.id} animal={animal} small />
        ))}
      </div>

      {/* Return Hook */}
      <div className="card card-gradient" style={{ borderRadius: 'var(--radius-xl)', padding: 24, marginBottom: 16 }}>
        <div style={{ color: 'white' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
            Come back and explore more
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.5, opacity: 0.8, marginBottom: 16 }}>
            You explored 60% of the zoo. The north side has Australian Outback and Monkey Trail — best in fall when it's cooler.
          </p>
          <button onClick={() => navigate('/plan/builder')} className="btn btn-sm" style={{ background: 'white', color: 'var(--green-deep)', fontWeight: 600 }}>
            <RefreshCw size={14} /> Plan a Return Visit
          </button>
        </div>
      </div>

      {/* What's New */}
      <SectionHeader title="What's New at the Zoo" />
      {newsItems.slice(0, 2).map(item => (
        <div key={item.id} className="card" style={{ display: 'flex', gap: 12, padding: 12, marginBottom: 8 }}>
          <div style={{
            width: 64,
            height: 64,
            borderRadius: 'var(--radius-sm)',
            overflow: 'hidden',
            flexShrink: 0,
            background: 'var(--bg-placeholder)',
          }}>
            <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{item.title}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{item.subtitle}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

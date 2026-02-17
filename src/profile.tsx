import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, CreditCard, Clock, Users, Heart, Award, Brain, Gift, Settings as SettingsIcon, Bell, Globe, Accessibility, HelpCircle, LogOut, QrCode, Star, Eye, Footprints, MapPin, Share2, ChevronLeft, BarChart3, RotateCcw, Check, Ticket, Camera, Download, Sparkles, Route } from 'lucide-react'
import { useApp } from './context'
import { animals, stamps, badges } from './data'
import { BackHeader, PageTransition, SectionHeader } from './components'

/* ============================================
   Profile Tab — Main
   ============================================ */

export function ProfileTab() {
  const navigate = useNavigate()
  const { user, setOnboarded, collectedStamps } = useApp()

  const menuItems = [
    { icon: CreditCard, label: 'Wallet', path: '/profile/wallet', badge: '2 Active Tickets' },
    { icon: Clock, label: 'Past Visits', path: '/profile/visits', badge: '3 visits' },
    { icon: Users, label: 'My Family', path: '/profile/family', badge: '3 members' },
    { icon: Heart, label: 'Saved Animals', path: '/profile/animals', badge: '2 saved' },
    { icon: Award, label: 'Stamps & Badges', path: '/profile/passport', badge: `${collectedStamps}/42` },
    { icon: Brain, label: 'AI Interests', path: '/profile/ai' },
    { icon: Gift, label: 'My Adoptions', path: '/profile/adoptions' },
  ]

  const settingsItems = [
    { icon: SettingsIcon, label: 'Settings', path: '/profile/settings' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: Globe, label: 'Language' },
    { icon: Accessibility, label: 'Accessibility' },
    { icon: HelpCircle, label: 'Help & Support' },
  ]

  return (
    <PageTransition>
      <div className="page page-scroll">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'var(--green-pale)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
            border: '3px solid var(--green-rich)',
          }}>
            {user.avatar}
          </div>
          <div>
            <h1 className="t-display-md">{user.name}</h1>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              <MapPin size={12} style={{ display: 'inline', verticalAlign: -1 }} /> San Diego Zoo · Member since {user.memberSince}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {[
            { label: 'Visits', value: user.visits, icon: '🏛️' },
            { label: 'Animals', value: user.animalsSeen, icon: '🦁' },
            { label: 'Miles', value: user.distanceWalked, icon: '🚶' },
          ].map(stat => (
            <div key={stat.label} className="card" style={{ flex: 1, padding: 14, textAlign: 'center' }}>
              <div style={{ fontSize: 18, marginBottom: 4 }}>{stat.icon}</div>
              <div style={{ fontWeight: 800, fontSize: 20, fontFamily: 'var(--font-display)' }}>{stat.value}</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Menu */}
        <div className="card" style={{ padding: 0, marginBottom: 16, overflow: 'hidden' }}>
          {menuItems.map((item, i) => (
            <button
              key={item.label}
              onClick={() => item.path && navigate(item.path)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '14px 16px',
                width: '100%',
                textAlign: 'left',
                borderBottom: i < menuItems.length - 1 ? '1px solid var(--border-light)' : 'none',
              }}
            >
              <item.icon size={20} color="var(--green-rich)" />
              <span style={{ flex: 1, fontWeight: 600, fontSize: 14 }}>{item.label}</span>
              {item.badge && <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{item.badge}</span>}
              <ChevronRight size={16} color="var(--text-tertiary)" />
            </button>
          ))}
        </div>

        {/* Settings */}
        <div className="card" style={{ padding: 0, marginBottom: 16, overflow: 'hidden' }}>
          {settingsItems.map((item, i) => (
            <button
              key={item.label}
              onClick={() => item.path && navigate(item.path)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '14px 16px',
                width: '100%',
                textAlign: 'left',
                borderBottom: i < settingsItems.length - 1 ? '1px solid var(--border-light)' : 'none',
              }}
            >
              <item.icon size={18} color="var(--text-secondary)" />
              <span style={{ flex: 1, fontSize: 14 }}>{item.label}</span>
              <ChevronRight size={16} color="var(--text-tertiary)" />
            </button>
          ))}
        </div>

        <button
          onClick={() => setOnboarded(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            margin: '8px auto',
            color: 'var(--coral)',
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </PageTransition>
  )
}

/* ============================================
   Wallet
   ============================================ */

export function Wallet() {
  return (
    <PageTransition>
      <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)' }}>
        <BackHeader title="Wallet" />
        <div style={{ padding: '0 20px 100px' }}>
          <SectionHeader title="Active Tickets" />
          <div className="card card-gradient" style={{
            borderRadius: 'var(--radius-xl)',
            padding: 24,
            marginBottom: 20,
            position: 'relative',
          }}>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 600, marginBottom: 8 }}>SAN DIEGO ZOO</div>
            <div style={{ color: 'white', fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, marginBottom: 4 }}>
              Saturday, Feb 21
            </div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 16 }}>
              2 Adult + 2 Child · Stroller Reserved
            </div>
            <div style={{
              width: '100%',
              height: 60,
              borderRadius: 8,
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{ display: 'flex', gap: 2 }}>
                {Array.from({ length: 30 }).map((_, i) => (
                  <div key={i} style={{
                    width: i % 3 === 0 ? 3 : 1.5,
                    height: 36,
                    background: '#1A1A1A',
                    borderRadius: 0.5,
                  }} />
                ))}
              </div>
            </div>
          </div>

          <SectionHeader title="Memberships" />
          <div className="card" style={{ padding: 16, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: 'var(--gold-pale)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
            }}>🏆</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Family Membership</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Valid until Dec 2025</div>
            </div>
            <button className="btn btn-sm btn-primary" style={{ fontSize: 12 }}>
              <Ticket size={12} /> Show Pass
            </button>
          </div>

          <SectionHeader title="Vouchers & Offers" />
          {[
            { title: 'Free Kids Meal', desc: 'Valid at any restaurant · Expires Feb 28', icon: '🍽️' },
            { title: '10% Off Gift Shop', desc: 'Single use · Expires Mar 31', icon: '🎁' },
          ].map(v => (
            <div key={v.title} className="card" style={{ padding: 14, marginBottom: 8, display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{ fontSize: 24 }}>{v.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{v.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{v.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}

/* ============================================
   Past Visits
   ============================================ */

export function PastVisits() {
  const navigate = useNavigate()

  const visits = [
    { id: 'feb14', date: 'Feb 14, 2025', type: 'Family', animals: 12, duration: '4h 23m', distance: '3.2 mi' },
    { id: 'jan14', date: 'Jan 14, 2025', type: 'Family', animals: 9, duration: '3h 45m', distance: '2.8 mi' },
    { id: 'dec8', date: 'Dec 8, 2024', type: 'Couple', animals: 15, duration: '5h 10m', distance: '4.1 mi' },
  ]

  return (
    <PageTransition>
      <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)' }}>
        <BackHeader title="Past Visits" />
        <div style={{ padding: '0 20px 100px' }}>
          {visits.map((visit, i) => (
            <motion.div
              key={visit.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card card-elevated"
              style={{ marginBottom: 12, padding: 0, overflow: 'hidden', cursor: 'pointer' }}
              onClick={() => navigate(`/profile/visits/${visit.id}`)}
              whileTap={{ scale: 0.98 }}
            >
              <div style={{
                height: 100,
                background: `linear-gradient(135deg, var(--green-deep), var(--green-mid))`,
                padding: 16,
                display: 'flex',
                alignItems: 'end',
              }}>
                <div style={{ color: 'white' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600 }}>{visit.date}</div>
                  <div style={{ fontSize: 12, opacity: 0.7 }}>{visit.type} Visit</div>
                </div>
              </div>
              <div style={{ padding: 16 }}>
                <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Eye size={12} /> {visit.animals} animals
                  </span>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Clock size={12} /> {visit.duration}
                  </span>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Footprints size={12} /> {visit.distance}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={(e) => { e.stopPropagation(); navigate(`/profile/visits/${visit.id}/share`) }} className="btn btn-sm btn-primary" style={{ flex: 1, fontSize: 12 }}><Share2 size={12} /> Share Recap</button>
                  <button onClick={(e) => { e.stopPropagation(); navigate('/plan/builder') }} className="btn btn-sm btn-secondary" style={{ flex: 1, fontSize: 12 }}>
                    <RotateCcw size={12} /> Plan Similar
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}

/* ============================================
   Family
   ============================================ */

export function FamilyScreen() {
  const { user } = useApp()

  return (
    <PageTransition>
      <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)' }}>
        <BackHeader title="My Family" />
        <div style={{ padding: '0 20px 100px' }}>
          {user.familyMembers.map(member => (
            <div key={member.name} className="card" style={{ padding: 16, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'var(--green-pale)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
              }}>
                {member.relationship === 'Partner' ? '🧑' : member.age < 10 ? '👧' : '🧑'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{member.name}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                  {member.relationship} · Age {member.age}
                </div>
              </div>
              <button className="btn btn-sm btn-ghost" style={{ fontSize: 12 }}>Edit</button>
            </div>
          ))}

          <button className="btn btn-secondary btn-full" style={{ marginTop: 12 }}>
            + Add Family Member
          </button>

          <div style={{ marginTop: 24 }}>
            <SectionHeader title="Location Sharing" />
            <div className="card" style={{ padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>Share location during visits</span>
                <div style={{
                  width: 48,
                  height: 28,
                  borderRadius: 14,
                  background: 'var(--green-rich)',
                  padding: 2,
                  cursor: 'pointer',
                }}>
                  <div style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: 'white',
                    marginLeft: 20,
                    transition: 'margin 0.2s ease',
                  }} />
                </div>
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Location is only shared with your family group during active zoo visits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

/* ============================================
   Saved Animals
   ============================================ */

export function SavedAnimals() {
  const { savedAnimals } = useApp()
  const saved = animals.filter(a => savedAnimals.includes(a.id))

  return (
    <PageTransition>
      <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)' }}>
        <BackHeader title="Saved Animals" />
        <div style={{ padding: '0 20px 100px' }}>
          {saved.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>💚</div>
              <p>No saved animals yet. Tap the heart on any animal to save it!</p>
            </div>
          ) : (
            saved.map(animal => (
              <div key={animal.id} className="card" style={{ padding: 14, marginBottom: 8, display: 'flex', gap: 14 }}>
                <div style={{
                  width: 60,
                  height: 60,
                  borderRadius: 12,
                  overflow: 'hidden',
                  background: 'var(--bg-placeholder)',
                  flexShrink: 0,
                }}>
                  <img src={animal.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{animal.emoji} {animal.individual || animal.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{animal.name} · {animal.zone}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </PageTransition>
  )
}

/* ============================================
   Passport (Stamps & Badges)
   ============================================ */

export function Passport() {
  const { collectedStamps } = useApp()
  const totalStamps = 42
  return (
    <PageTransition>
      <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)' }}>
        <BackHeader title="Zoo Passport" />
        <div style={{ padding: '0 20px 100px' }}>
          {/* Header */}
          <div className="card card-gradient" style={{
            borderRadius: 'var(--radius-xl)',
            padding: 24,
            marginBottom: 24,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🎖️</div>
            <div style={{ color: 'white', fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 600 }}>
              {collectedStamps} / {totalStamps}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>stamps collected</div>
            <div className="progress-bar" style={{ marginTop: 16, background: 'rgba(255,255,255,0.2)' }}>
              <div className="progress-bar-fill" style={{ width: `${(collectedStamps / totalStamps) * 100}%`, background: 'var(--gold)' }} />
            </div>
          </div>

          {/* Zones */}
          <SectionHeader title="Zone Progress" />
          {stamps.map(zone => (
            <div key={zone.zone} className="card" style={{ padding: 14, marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{zone.zone}</span>
                <span style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: zone.earned === zone.total ? 'var(--green-rich)' : 'var(--text-secondary)',
                }}>
                  {zone.earned === zone.total ? 'DONE ✓' : `${zone.earned}/${zone.total}`}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {Array.from({ length: zone.total }).map((_, i) => (
                  <div key={i} style={{
                    flex: 1,
                    height: 6,
                    borderRadius: 3,
                    background: i < zone.earned ? 'var(--green-rich)' : 'var(--border-light)',
                    transition: 'background 0.3s ease',
                  }} />
                ))}
              </div>
            </div>
          ))}

          {/* Badges */}
          <div style={{ marginTop: 20 }}>
            <SectionHeader title="Badges Earned" />
            {badges.filter(b => b.earned).map(badge => (
              <div key={badge.id} className="card" style={{ padding: 14, marginBottom: 8, display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: 'var(--gold-pale)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 26,
                }}>{badge.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{badge.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{badge.desc}</div>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{badge.date}</div>
              </div>
            ))}

            <SectionHeader title="Locked Badges" />
            {badges.filter(b => !b.earned).map(badge => (
              <div key={badge.id} className="card" style={{ padding: 14, marginBottom: 8, opacity: 0.7 }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 8 }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: 'var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 26,
                  }}>🔒</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{badge.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{badge.desc}</div>
                  </div>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: `${((badge as any).progress / (badge as any).total) * 100}%` }} />
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4, textAlign: 'right' }}>
                  {(badge as any).progress}/{(badge as any).total}
                </div>
              </div>
            ))}
          </div>

          <button className="btn btn-secondary btn-full" style={{ marginTop: 16 }}>
            <Share2 size={16} /> Share Passport
          </button>
        </div>
      </div>
    </PageTransition>
  )
}

/* ============================================
   AI Interests
   ============================================ */

export function AIInterests() {
  const interests = [
    { name: 'Big Cats', pct: 85 },
    { name: 'Elephants', pct: 65 },
    { name: 'Marine Life', pct: 55 },
    { name: 'Primates', pct: 40 },
    { name: 'Birds', pct: 20 },
  ]

  return (
    <PageTransition>
      <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)' }}>
        <BackHeader title="AI Interests" />
        <div style={{ padding: '0 20px 100px' }}>
          <SectionHeader title="Your Interest Profile" />
          <div className="card" style={{ padding: 16, marginBottom: 20 }}>
            {interests.map(int => (
              <div key={int.name} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{int.name}</span>
                  <span style={{ fontSize: 13, color: 'var(--green-rich)', fontWeight: 700 }}>{int.pct}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: `${int.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          <SectionHeader title="Visit Style" />
          <div className="card" style={{
            padding: 16,
            marginBottom: 20,
            background: 'var(--green-pale)',
            border: '1px solid var(--green-light)',
          }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <Brain size={18} color="var(--green-rich)" />
              <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--green-rich)' }}>AI Summary</span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              You tend to spend longer at fewer exhibits. You prefer mornings and take a food break around 11am.
              You skip birds and indoor exhibits. You love big mammals.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-secondary" style={{ flex: 1 }}>Adjust Preferences</button>
            <button className="btn btn-ghost" style={{ flex: 1, color: 'var(--text-secondary)' }}>Reset AI</button>
          </div>

          <div style={{
            marginTop: 20,
            padding: 14,
            borderRadius: 'var(--radius-md)',
            background: 'var(--gold-pale)',
            fontSize: 12,
            lineHeight: 1.5,
            color: 'var(--text-secondary)',
          }}>
            <strong>Transparency:</strong> This data powers your home feed content, plan recommendations, audio guide depth, and animal updates you receive.
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

/* ============================================
   Adoptions
   ============================================ */

export function Adoptions() {
  return (
    <PageTransition>
      <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)' }}>
        <BackHeader title="My Adoptions" />
        <div style={{ padding: '0 20px 100px' }}>
          <SectionHeader title="Active Adoptions" />
          <div className="card" style={{ padding: 16, marginBottom: 20 }}>
            <div style={{ display: 'flex', gap: 14 }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: 14,
                overflow: 'hidden',
                background: 'var(--bg-placeholder)',
                flexShrink: 0,
              }}>
                <img src={animals[0].image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>🦁 Izu — African Lion</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>Adopted Dec 2024 · $25</div>
                <span className="badge badge-active" style={{ fontSize: 10 }}>Active</span>
              </div>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 10, lineHeight: 1.5 }}>
              Your $25 contribution goes directly to lion conservation programs in East Africa.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button className="btn btn-sm btn-secondary">Certificate</button>
              <button className="btn btn-sm btn-primary">Updates</button>
            </div>
          </div>

          <SectionHeader title="Adopt an Animal" />
          {[
            { animal: animals[1], price: '$25', reason: 'You spent 11 min with Tembo' },
            { animal: animals[2], price: '$15', reason: "Ella's favorite" },
            { animal: animals[4], price: '$30', reason: 'Visit to unlock!' },
          ].map(({ animal, price, reason }) => (
            <div key={animal.id} className="card" style={{ padding: 14, marginBottom: 8, display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{
                width: 50,
                height: 50,
                borderRadius: 12,
                overflow: 'hidden',
                background: 'var(--bg-placeholder)',
                flexShrink: 0,
              }}>
                <img src={animal.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{animal.emoji} {animal.individual || animal.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{reason}</div>
              </div>
              <button className="btn btn-sm btn-gold">{price}</button>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}

/* ============================================
   Visit Recap Detail
   ============================================ */

const recapJourney = [
  { time: '9:00 AM', name: 'Arrived at Zoo', emoji: '🚗', dwell: '', type: 'start' },
  { time: '9:15 AM', name: 'African Lions', emoji: '🦁', dwell: '12 min', type: 'animal' },
  { time: '9:45 AM', name: 'Giraffes', emoji: '🦒', dwell: '8 min', type: 'animal' },
  { time: '10:10 AM', name: 'Elephant Odyssey', emoji: '🐘', dwell: '15 min', type: 'animal' },
  { time: '10:40 AM', name: 'Sea Lion Feeding', emoji: '🐟', dwell: '20 min', type: 'event' },
  { time: '11:15 AM', name: "Albert's Restaurant", emoji: '🍽️', dwell: '35 min', type: 'dining' },
  { time: '12:00 PM', name: 'Penguin Beach', emoji: '🐧', dwell: '10 min', type: 'animal' },
  { time: '12:25 PM', name: 'Gorilla Forest', emoji: '🦍', dwell: '14 min', type: 'animal' },
  { time: '12:50 PM', name: 'Polar Bear Plunge', emoji: '🐻‍❄️', dwell: '11 min', type: 'animal' },
  { time: '1:10 PM', name: 'Gift Shop', emoji: '🎁', dwell: '15 min', type: 'shop' },
  { time: '1:25 PM', name: 'Departed', emoji: '👋', dwell: '', type: 'end' },
]

const recapPhotos = [
  { emoji: '🦁', caption: 'Izu posing' },
  { emoji: '🐘', caption: 'Tembo waving' },
  { emoji: '🐧', caption: 'Penguin parade' },
  { emoji: '🦍', caption: 'Silverback closeup' },
  { emoji: '🐻‍❄️', caption: 'Polar bear swim' },
  { emoji: '👨‍👩‍👧‍👦', caption: 'Family selfie' },
]

export function VisitRecap() {
  const navigate = useNavigate()
  const [shareOpen, setShareOpen] = useState(false)

  const typeColor: Record<string, string> = {
    animal: 'var(--green-rich)',
    event: 'var(--coral)',
    dining: 'var(--gold)',
    shop: 'var(--amber)',
    start: 'var(--text-tertiary)',
    end: 'var(--text-tertiary)',
  }

  return (
    <PageTransition>
      <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)' }}>
        <BackHeader title="Visit Recap" />
        <div style={{ padding: '0 20px 100px' }}>
          {/* Hero */}
          <div className="card-gradient" style={{
            borderRadius: 'var(--radius-xl)',
            padding: 24,
            marginBottom: 24,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 6 }}>SAN DIEGO ZOO</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, color: 'white', marginBottom: 4 }}>
              February 14, 2025
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 16 }}>Family Visit</div>
            <div style={{ display: 'flex', gap: 20, justifyContent: 'center' }}>
              {[
                { icon: <Clock size={14} />, value: '4h 23m', label: 'Duration' },
                { icon: <Footprints size={14} />, value: '3.2 mi', label: 'Walked' },
                { icon: <Eye size={14} />, value: '12', label: 'Animals' },
                { icon: <Award size={14} />, value: '5', label: 'Stamps' },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ color: 'var(--gold)', marginBottom: 2 }}>{s.icon}</div>
                  <div style={{ color: 'white', fontWeight: 700, fontSize: 17 }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Summary */}
          <div className="card" style={{
            marginBottom: 20,
            padding: 16,
            background: 'var(--green-pale)',
            border: '1px solid var(--green-light)',
          }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <Sparkles size={16} color="var(--green-rich)" />
              <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--green-rich)' }}>AI Summary</span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              A wonderful family day! You focused on large mammals — Izu the lion was your star stop (12 min).
              Ella loved the penguin parade, while Kai was fascinated by the polar bears.
              You covered the south side well. The north side (Monkey Trail, Australian Outback) awaits your next visit!
            </p>
          </div>

          {/* Journey Timeline */}
          <SectionHeader title="Your Journey" />
          <div className="card" style={{ padding: '12px 16px', marginBottom: 20 }}>
            {recapJourney.map((stop, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: 12,
                paddingBottom: i < recapJourney.length - 1 ? 12 : 0,
                borderLeft: i < recapJourney.length - 1 ? `2px solid ${typeColor[stop.type] || 'var(--border-light)'}` : 'none',
                marginLeft: 8,
                paddingLeft: 16,
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute',
                  left: -7,
                  top: 2,
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: typeColor[stop.type] || 'var(--border)',
                  border: '2px solid var(--bg-primary)',
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{stop.emoji} {stop.name}</span>
                    {stop.dwell && (
                      <span style={{ fontSize: 11, color: 'var(--text-secondary)', background: 'var(--bg-secondary)', padding: '2px 8px', borderRadius: 10 }}>
                        {stop.dwell}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{stop.time}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Animals Seen */}
          <SectionHeader title="Animals You Met" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 20 }}>
            {animals.slice(0, 6).map(animal => (
              <motion.div
                key={animal.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/discover/animal/${animal.id}`)}
                className="card"
                style={{ padding: 10, textAlign: 'center', cursor: 'pointer' }}
              >
                <div style={{
                  width: '100%',
                  aspectRatio: '1',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  marginBottom: 6,
                  background: 'var(--bg-placeholder)',
                }}>
                  <img src={animal.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                </div>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{animal.emoji} {animal.individual || animal.name}</div>
              </motion.div>
            ))}
          </div>

          {/* Photos */}
          <SectionHeader title="Photo Memories" />
          <div className="scroll-x" style={{ marginLeft: -20, marginRight: -20, marginBottom: 20, paddingLeft: 20, paddingRight: 20 }}>
            {recapPhotos.map((photo, i) => (
              <div key={i} style={{
                width: 120,
                flexShrink: 0,
              }}>
                <div style={{
                  width: 120,
                  height: 120,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 40,
                  marginBottom: 4,
                  position: 'relative',
                }}>
                  {photo.emoji}
                  <Camera size={14} color="var(--text-tertiary)" style={{ position: 'absolute', bottom: 6, right: 6 }} />
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', textAlign: 'center' }}>{photo.caption}</div>
              </div>
            ))}
          </div>

          {/* Stamps Collected */}
          <SectionHeader title="Stamps Collected" />
          <div className="card" style={{ padding: 16, marginBottom: 20 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 12 }}>
              {['🦁', '🦒', '🐘', '🐧', '🦍'].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: i * 0.1, type: 'spring' }}
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: 'var(--gold-pale)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 26,
                    border: '2px solid var(--gold)',
                  }}
                >{s}</motion.div>
              ))}
            </div>
            <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-secondary)' }}>
              5 of 42 total stamps · <button onClick={() => navigate('/profile/passport')} style={{ color: 'var(--green-rich)', fontWeight: 600 }}>View Passport</button>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <button
              onClick={() => navigate(`/profile/visits/feb14/share`)}
              className="btn btn-primary"
              style={{ flex: 1 }}
            >
              <Share2 size={16} /> Share Visit Card
            </button>
            <button onClick={() => navigate('/plan/builder')} className="btn btn-secondary" style={{ flex: 1 }}>
              <RotateCcw size={16} /> Plan Return
            </button>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

/* ============================================
   Shareable Visit Card
   ============================================ */

export function ShareableCard() {
  const navigate = useNavigate()
  const [cardStyle, setCardStyle] = useState<'classic' | 'minimal' | 'photo'>('classic')

  return (
    <PageTransition>
      <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)' }}>
        <BackHeader title="Share Your Visit" />
        <div style={{ padding: '0 20px 100px' }}>
          {/* Style Selector */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
            {(['classic', 'minimal', 'photo'] as const).map(s => (
              <button
                key={s}
                onClick={() => setCardStyle(s)}
                className={`chip ${cardStyle === s ? 'chip-active' : ''}`}
                style={{ flex: 1, justifyContent: 'center', fontSize: 12 }}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>

          {/* Card Preview */}
          <motion.div
            key={cardStyle}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              marginBottom: 24,
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            }}
          >
            {cardStyle === 'classic' && (
              <div style={{
                background: 'linear-gradient(145deg, var(--green-deep), var(--green-rich), #1a5c3a)',
                padding: 28,
                minHeight: 380,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 600, letterSpacing: 2, marginBottom: 8 }}>SAN DIEGO ZOO</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 600, color: 'white', marginBottom: 4 }}>
                    Family Adventure
                  </div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>February 14, 2025</div>
                </div>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'center', margin: '24px 0' }}>
                  {['🦁', '🐘', '🐧', '🦍', '🐻‍❄️'].map((e, i) => (
                    <div key={i} style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      background: 'rgba(255,255,255,0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 24,
                    }}>{e}</div>
                  ))}
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 16 }}>
                    {[
                      { value: '4h 23m', label: 'Duration' },
                      { value: '12', label: 'Animals' },
                      { value: '3.2 mi', label: 'Walked' },
                      { value: '5', label: 'Stamps' },
                    ].map(s => (
                      <div key={s.label} style={{ textAlign: 'center' }}>
                        <div style={{ color: 'var(--gold)', fontWeight: 700, fontSize: 17 }}>{s.value}</div>
                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{
                    textAlign: 'center',
                    fontSize: 11,
                    color: 'rgba(255,255,255,0.3)',
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    paddingTop: 12,
                  }}>
                    Created with Zoo AI · sandiegozoo.org
                  </div>
                </div>
              </div>
            )}

            {cardStyle === 'minimal' && (
              <div style={{
                background: 'var(--bg-primary)',
                border: '2px solid var(--border)',
                borderRadius: 'var(--radius-xl)',
                padding: 28,
                minHeight: 380,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 600, letterSpacing: 2 }}>SAN DIEGO ZOO</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 600, color: 'var(--green-deep)', marginTop: 8 }}>
                    Feb 14
                  </div>
                  <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Family Visit · 2025</div>
                </div>
                <div style={{ fontSize: 60, textAlign: 'center', letterSpacing: 8, margin: '20px 0' }}>
                  🦁🐘🐧🦍🐻‍❄️
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: 16 }}>
                  {[
                    { value: '4h 23m', label: 'Duration' },
                    { value: '12 animals', label: 'Seen' },
                    { value: '3.2 mi', label: 'Walked' },
                  ].map(s => (
                    <div key={s.label}>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{s.value}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {cardStyle === 'photo' && (
              <div style={{
                background: 'linear-gradient(145deg, var(--gold), #c4930a)',
                padding: 28,
                minHeight: 380,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 600, letterSpacing: 2 }}>OUR DAY AT THE ZOO</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600, color: 'white', marginTop: 8 }}>
                    The Adventure Family
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, margin: '20px 0' }}>
                  {['🦁', '🐘', '🐧', '👨‍👩‍👧‍👦'].map((e, i) => (
                    <div key={i} style={{
                      aspectRatio: '1',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(255,255,255,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 40,
                    }}>{e}</div>
                  ))}
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: 'white', fontWeight: 600, fontSize: 15 }}>Feb 14, 2025 · 12 Animals · 5 Stamps</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>
                    Created with Zoo AI · sandiegozoo.org
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Share Actions */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <button className="btn btn-primary" style={{ flex: 1 }}>
              <Share2 size={16} /> Share
            </button>
            <button className="btn btn-secondary" style={{ flex: 1 }}>
              <Download size={16} /> Save Image
            </button>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 16 }}>
            {['Instagram', 'Facebook', 'X / Twitter', 'Messages'].map(p => (
              <button key={p} className="chip" style={{ fontSize: 12 }}>{p}</button>
            ))}
          </div>

          <button onClick={() => navigate(-1 as any)} className="btn btn-ghost btn-full" style={{ color: 'var(--text-secondary)' }}>
            Back to Recap
          </button>
        </div>
      </div>
    </PageTransition>
  )
}

/* ============================================
   Settings
   ============================================ */

export function Settings() {
  const { sensorySensitivity, simplifiedMode, setSensorySensitivity, setSimplifiedMode } = useApp()
  const [notifLevel, setNotifLevel] = useState('balanced')
  const [contentDepth, setContentDepth] = useState('standard')

  const Toggle = ({ on, onToggle }: { on: boolean, onToggle: () => void }) => (
    <button
      onClick={onToggle}
      style={{
        width: 44,
        height: 26,
        borderRadius: 13,
        background: on ? 'var(--green-rich)' : 'var(--border)',
        padding: 2,
        position: 'relative',
        transition: 'background 0.2s ease',
      }}
    >
      <div style={{
        width: 22,
        height: 22,
        borderRadius: '50%',
        background: 'white',
        marginLeft: on ? 18 : 0,
        transition: 'margin 0.2s ease',
        boxShadow: 'var(--shadow-sm)',
      }} />
    </button>
  )

  return (
    <PageTransition>
      <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)' }}>
        <BackHeader title="Settings" />
        <div style={{ padding: '0 20px 100px' }}>
          <SectionHeader title="Notifications" />
          <div className="card" style={{ padding: 16, marginBottom: 20 }}>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Frequency</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {['minimal', 'balanced', 'all'].map(l => (
                  <button
                    key={l}
                    onClick={() => setNotifLevel(l)}
                    className={`chip ${notifLevel === l ? 'chip-active' : ''}`}
                    style={{ flex: 1, justifyContent: 'center', fontSize: 12 }}
                  >
                    {l.charAt(0).toUpperCase() + l.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            {['Pre-visit content', 'In-park suggestions', 'Post-visit updates', 'Zoo news'].map(item => (
              <div key={item} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border-light)' }}>
                <span style={{ fontSize: 14 }}>{item}</span>
                <Toggle on={true} onToggle={() => {}} />
              </div>
            ))}
          </div>

          <SectionHeader title="AI Preferences" />
          <div className="card" style={{ padding: 16, marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Content Depth</div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
              {['quick', 'standard', 'deep'].map(d => (
                <button
                  key={d}
                  onClick={() => setContentDepth(d)}
                  className={`chip ${contentDepth === d ? 'chip-active' : ''}`}
                  style={{ flex: 1, justifyContent: 'center', fontSize: 12 }}
                >
                  {d === 'quick' ? 'Quick Facts' : d === 'standard' ? 'Standard' : 'Deep Dive'}
                </button>
              ))}
            </div>
            {['Audio auto-play on dwell', 'AI Spotlight during visits', 'Energy check-ins'].map(item => (
              <div key={item} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border-light)' }}>
                <span style={{ fontSize: 14 }}>{item}</span>
                <Toggle on={true} onToggle={() => {}} />
              </div>
            ))}
          </div>

          <SectionHeader title="Accessibility" />
          <div className="card" style={{ padding: 0, marginBottom: 20, overflow: 'hidden' }}>
            {/* Sensory Sensitivity */}
            <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 18 }}>🔇</span>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>Sensory Sensitivity Mode</span>
                </div>
                <Toggle on={sensorySensitivity} onToggle={() => setSensorySensitivity(!sensorySensitivity)} />
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4, marginLeft: 28 }}>
                Shows noise levels on exhibits, suggests quiet routes, and reduces animations.
              </p>
            </div>

            {/* Simplified Interface */}
            <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 18 }}>🔤</span>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>Simplified Interface</span>
                </div>
                <Toggle on={simplifiedMode} onToggle={() => setSimplifiedMode(!simplifiedMode)} />
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4, marginLeft: 28 }}>
                Larger text, bigger buttons, and fewer on-screen elements for easier navigation.
              </p>
            </div>

            {/* Static accessibility options */}
            {['High contrast mode', 'Voice navigation'].map(item => (
              <div key={item} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderBottom: '1px solid var(--border-light)' }}>
                <span style={{ fontSize: 14 }}>{item}</span>
                <Toggle on={false} onToggle={() => {}} />
              </div>
            ))}
          </div>

          {/* Active Modes Summary */}
          {(sensorySensitivity || simplifiedMode) && (
            <div className="card" style={{
              padding: 14,
              background: 'var(--green-pale)',
              border: '1px solid var(--green-light)',
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--green-rich)', marginBottom: 6 }}>Active Accessibility Modes</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {sensorySensitivity && (
                  <span className="badge badge-active" style={{ fontSize: 11 }}>🔇 Sensory Sensitivity</span>
                )}
                {simplifiedMode && (
                  <span className="badge badge-active" style={{ fontSize: 11 }}>🔤 Simplified Interface</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}

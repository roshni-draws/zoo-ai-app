import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { NotificationToast, NotificationCategory } from './NotificationToast'

interface NotificationTemplate {
  id: string
  title: string
  message: string
  icon: string
  category: NotificationCategory
}

const preVisitNotifications: NotificationTemplate[] = [
  {
    id: 'pv1',
    title: 'Your visit is in 2 days!',
    message: 'Saturday, Feb 21 · 4 tickets confirmed. Download your offline map now for a smoother experience.',
    icon: '📅',
    category: 'info',
  },
  {
    id: 'pv2',
    title: 'Weather update for Saturday',
    message: '72°F and sunny · UV index 7. Pack sunscreen, hats, and water bottles for the family.',
    icon: '☀️',
    category: 'alert',
  },
  {
    id: 'pv3',
    title: 'Sea Lion Show added to your day',
    message: 'A new 11:30 AM show just opened up — it fits perfectly between your Elephant and Penguin stops.',
    icon: '🐟',
    category: 'event',
  },
  {
    id: 'pv4',
    title: 'Izu the Lion says hi!',
    message: "He's been extra playful this week. Your stop at the lion exhibit is going to be great.",
    icon: '🦁',
    category: 'social',
  },
]

const inParkNotifications: NotificationTemplate[] = [
  {
    id: 'ip1',
    title: 'Sea Lion Feeding — 5 min!',
    message: 'Starting at Sea Lion Point in 5 minutes. It\'s a 3 min walk from you. Want directions?',
    icon: '🐟',
    category: 'alert',
  },
  {
    id: 'ip2',
    title: 'Crowd alert: Panda Ridge',
    message: 'Panda Ridge is very busy right now. Skip it for now — crowds clear up after 2pm.',
    icon: '🐼',
    category: 'location',
  },
  {
    id: 'ip3',
    title: 'How\'s everyone doing?',
    message: 'You\'ve been exploring for 2 hours. Ready for a break? There\'s a shaded rest area 2 min away.',
    icon: '🌡️',
    category: 'energy',
  },
  {
    id: 'ip4',
    title: 'Keeper Talk: Gorilla Forest',
    message: 'A keeper talk is starting in 15 minutes at Gorilla Forest. It\'s on your plan — want a reminder?',
    icon: '🦍',
    category: 'event',
  },
  {
    id: 'ip5',
    title: 'Jordan is at the Gift Shop',
    message: 'Family member Jordan checked in at Safari Gift Shop, about 200ft from you.',
    icon: '🛍️',
    category: 'info',
  },
]

const postVisitNotifications: NotificationTemplate[] = [
  {
    id: 'post1',
    title: 'Your visit recap is ready!',
    message: '4h 23m · 12 animals · 3.2 mi walked. See your full journey and share it with friends.',
    icon: '✨',
    category: 'info',
  },
  {
    id: 'post2',
    title: 'Izu just became a father!',
    message: 'Two cubs born last week. Mom and babies are healthy. See photos of the lion you visited.',
    icon: '🦁',
    category: 'social',
  },
  {
    id: 'post3',
    title: 'Complete your zoo passport',
    message: 'You earned 5 stamps! Visit 3 more zones to unlock the Explorer badge.',
    icon: '🎖️',
    category: 'event',
  },
  {
    id: 'post4',
    title: 'Plan your return visit',
    message: 'You explored 60% of the zoo. The north side has Monkey Trail and Australian Outback — best in spring!',
    icon: '🗺️',
    category: 'info',
  },
]

export default function NotificationDemo() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'pre-visit' | 'in-park' | 'post-visit'>('in-park')
  const [activeToast, setActiveToast] = useState<NotificationTemplate | null>(null)

  const tabs = [
    { key: 'pre-visit' as const, label: 'Pre-Visit', emoji: '📅' },
    { key: 'in-park' as const, label: 'In-Park', emoji: '📍' },
    { key: 'post-visit' as const, label: 'Post-Visit', emoji: '✨' },
  ]

  const notificationSets: Record<string, NotificationTemplate[]> = {
    'pre-visit': preVisitNotifications,
    'in-park': inParkNotifications,
    'post-visit': postVisitNotifications,
  }

  const notifications = notificationSets[activeTab]

  const categoryLabels: Record<NotificationCategory, { label: string, color: string, bg: string }> = {
    info: { label: 'Info', color: 'var(--green-rich)', bg: 'var(--green-pale)' },
    alert: { label: 'Alert', color: 'var(--coral)', bg: 'var(--coral-pale)' },
    event: { label: 'Event', color: 'var(--gold-dark)', bg: 'var(--gold-pale)' },
    social: { label: 'Social', color: 'var(--green-rich)', bg: 'var(--green-pale)' },
    location: { label: 'Location', color: '#3b82f6', bg: '#eff6ff' },
    energy: { label: 'Check-In', color: 'var(--gold-dark)', bg: 'var(--gold-pale)' },
  }

  return (
    <>
      <AnimatePresence>
        {activeToast && (
          <NotificationToast
            title={activeToast.title}
            message={activeToast.message}
            icon={activeToast.icon}
            category={activeToast.category}
            onDismiss={() => setActiveToast(null)}
            onView={() => setActiveToast(null)}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.25 }}
        style={{ minHeight: '100dvh', background: 'var(--bg-primary)' }}
      >
        {/* Header */}
        <div className="page-header" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <ChevronLeft size={22} />
          </button>
          <span className="t-heading" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>Notifications</span>
          <div style={{ width: 22 }} />
        </div>

        <div style={{ padding: '0 20px 100px' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`chip ${activeTab === tab.key ? 'chip-active' : ''}`}
                style={{ flex: 1, justifyContent: 'center', fontSize: 12 }}
              >
                {tab.emoji} {tab.label}
              </button>
            ))}
          </div>

          {/* Description */}
          <div className="card" style={{
            padding: 14,
            marginBottom: 20,
            background: 'var(--green-pale)',
            border: '1px solid var(--green-light)',
          }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <Bell size={16} color="var(--green-rich)" />
              <span style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                {activeTab === 'pre-visit' && 'Notifications sent in the days leading up to your visit.'}
                {activeTab === 'in-park' && 'Real-time notifications while you explore the zoo.'}
                {activeTab === 'post-visit' && 'Follow-up notifications after your visit.'}
                {' '}Tap any card to preview it as a toast.
              </span>
            </div>
          </div>

          {/* Notification Cards */}
          {notifications.map((notif, i) => {
            const cat = categoryLabels[notif.category]
            return (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="card card-elevated"
                style={{ marginBottom: 10, padding: 0, overflow: 'hidden', cursor: 'pointer' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveToast(notif)}
              >
                {/* Category accent */}
                <div style={{
                  height: 3,
                  background: notif.category === 'alert' ? 'linear-gradient(90deg, var(--coral), #ef4444)'
                    : notif.category === 'event' ? 'linear-gradient(90deg, var(--gold), #d97706)'
                    : notif.category === 'social' ? 'linear-gradient(90deg, var(--green-rich), #16a34a)'
                    : notif.category === 'location' ? 'linear-gradient(90deg, #3b82f6, #6366f1)'
                    : notif.category === 'energy' ? 'linear-gradient(90deg, var(--gold), var(--coral))'
                    : 'linear-gradient(90deg, var(--green-rich), var(--gold))',
                }} />

                <div style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'start' }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: cat.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 20,
                      flexShrink: 0,
                    }}>{notif.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                        <span style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: cat.color,
                          background: cat.bg,
                          padding: '2px 8px',
                          borderRadius: 10,
                        }}>{cat.label.toUpperCase()}</span>
                      </div>
                      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{notif.title}</div>
                      <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{notif.message}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </>
  )
}

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BackHeader, PageTransition } from '../../components'
import ShuttleLanding from './shuttle/ShuttleLanding'
import BuggyLanding from './buggy/BuggyLanding'
import SafariListing from './safari/SafariListing'

const tabs = ['Shuttle Bus', 'Buggy Tour', 'Safari Tour'] as const
type TabType = typeof tabs[number]

const tabIcons: Record<TabType, string> = {
  'Shuttle Bus': '\uD83D\uDE8C',
  'Buggy Tour': '\uD83D\uDE97',
  'Safari Tour': '\uD83E\uDD81',
}

export default function TransportHome() {
  const [activeTab, setActiveTab] = useState<TabType>('Shuttle Bus')

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title="Transport" />

        {/* Tab Bar */}
        <div style={{
          display: 'flex',
          gap: 6,
          padding: '0 24px 16px',
          borderBottom: '1px solid var(--border-light)',
        }}>
          {tabs.map(tab => (
            <motion.button
              key={tab}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: '10px 8px',
                borderRadius: 'var(--radius-md)',
                fontSize: 13,
                fontWeight: activeTab === tab ? 700 : 500,
                background: activeTab === tab ? 'var(--green-deep)' : 'var(--bg-card)',
                color: activeTab === tab ? 'var(--text-inverse)' : 'var(--text-secondary)',
                border: activeTab === tab ? 'none' : '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                transition: 'all 0.2s ease',
                position: 'relative',
              }}
            >
              <span style={{ fontSize: 16 }}>{tabIcons[tab]}</span>
              {tab.split(' ')[0]}
              {activeTab === tab && (
                <motion.div
                  layoutId="transport-tab-indicator"
                  style={{
                    position: 'absolute',
                    bottom: -1,
                    left: '20%',
                    right: '20%',
                    height: 2,
                    borderRadius: 1,
                    background: 'var(--gold)',
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'Shuttle Bus' && <ShuttleLanding embedded />}
            {activeTab === 'Buggy Tour' && <BuggyLanding embedded />}
            {activeTab === 'Safari Tour' && <SafariListing embedded />}
          </motion.div>
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}

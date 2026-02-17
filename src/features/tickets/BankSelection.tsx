import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Building2, ChevronRight } from 'lucide-react'
import { BackHeader, PageTransition } from '../../components'

const popularBanks = [
  { id: 'hdfc', name: 'HDFC Bank', color: '#004B87' },
  { id: 'icici', name: 'ICICI Bank', color: '#F37920' },
  { id: 'sbi', name: 'State Bank of India', color: '#22409A' },
  { id: 'axis', name: 'Axis Bank', color: '#97144D' },
]

const allBanks = [
  { id: 'bob', name: 'Bank of Baroda' },
  { id: 'boi', name: 'Bank of India' },
  { id: 'bom', name: 'Bank of Maharashtra' },
  { id: 'canara', name: 'Canara Bank' },
  { id: 'central', name: 'Central Bank of India' },
  { id: 'citi', name: 'Citibank' },
  { id: 'dbs', name: 'DBS Bank' },
  { id: 'federal', name: 'Federal Bank' },
  { id: 'hsbc', name: 'HSBC' },
  { id: 'idbi', name: 'IDBI Bank' },
  { id: 'idfc', name: 'IDFC First Bank' },
  { id: 'indusind', name: 'IndusInd Bank' },
  { id: 'iob', name: 'Indian Overseas Bank' },
  { id: 'kotak', name: 'Kotak Mahindra Bank' },
  { id: 'pnb', name: 'Punjab National Bank' },
  { id: 'rbl', name: 'RBL Bank' },
  { id: 'uco', name: 'UCO Bank' },
  { id: 'union', name: 'Union Bank of India' },
  { id: 'yes', name: 'Yes Bank' },
]

export default function BankSelection() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBank, setSelectedBank] = useState<string | null>(null)

  const filteredBanks = allBanks.filter(bank =>
    bank.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title="Select a Bank" />

        <div style={{ padding: '0 24px 120px' }}>
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="search-bar"
            style={{ marginBottom: 24 }}
          >
            <Search size={18} color="var(--text-tertiary)" />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search banks..."
              style={{ fontSize: 15 }}
            />
          </motion.div>

          {/* Popular Banks */}
          {!searchQuery && (
            <div style={{ marginBottom: 28 }}>
              <h3 className="t-label" style={{ color: 'var(--text-tertiary)', marginBottom: 14, paddingLeft: 4 }}>
                POPULAR BANKS
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {popularBanks.map((bank, i) => (
                  <motion.button
                    key={bank.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setSelectedBank(bank.id)}
                    className="card"
                    style={{
                      padding: '16px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      textAlign: 'left',
                      borderColor: selectedBank === bank.id ? 'var(--green-rich)' : undefined,
                      background: selectedBank === bank.id ? 'var(--green-pale)' : undefined,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: 'var(--radius-md)',
                      background: bank.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: 'white',
                      fontWeight: 800,
                      fontSize: 14,
                    }}>
                      {bank.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontWeight: 600,
                        fontSize: 13,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {bank.name}
                      </div>
                    </div>
                    {selectedBank === bank.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 'var(--radius-full)',
                          background: 'var(--green-rich)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }} />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* All Banks */}
          <div style={{ marginBottom: 24 }}>
            <h3 className="t-label" style={{ color: 'var(--text-tertiary)', marginBottom: 14, paddingLeft: 4 }}>
              {searchQuery ? 'SEARCH RESULTS' : 'ALL BANKS'}
            </h3>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <AnimatePresence mode="popLayout">
                {filteredBanks.map((bank, i) => (
                  <motion.button
                    key={bank.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedBank(bank.id)}
                    style={{
                      width: '100%',
                      padding: '14px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      textAlign: 'left',
                      borderBottom: i < filteredBanks.length - 1 ? '1px solid var(--border-light)' : 'none',
                      background: selectedBank === bank.id ? 'var(--green-pale)' : 'transparent',
                      transition: 'background 0.2s ease',
                    }}
                  >
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Building2 size={16} color="var(--text-secondary)" />
                    </div>
                    <span style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{bank.name}</span>
                    <div style={{
                      width: 20,
                      height: 20,
                      borderRadius: 'var(--radius-full)',
                      border: selectedBank === bank.id ? '2px solid var(--green-rich)' : '2px solid var(--border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.2s ease',
                    }}>
                      {selectedBank === bank.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--green-rich)' }}
                        />
                      )}
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>

              {filteredBanks.length === 0 && (
                <div style={{
                  padding: '32px 20px',
                  textAlign: 'center',
                  color: 'var(--text-tertiary)',
                  fontSize: 14,
                }}>
                  No banks found for "{searchQuery}"
                </div>
              )}
            </div>
          </div>

          {/* Continue Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="btn btn-primary btn-full btn-lg"
            onClick={() => navigate('/tickets/confirmation')}
            style={{
              opacity: selectedBank ? 1 : 0.5,
              pointerEvents: selectedBank ? 'auto' : 'none',
            }}
          >
            Continue
          </motion.button>
        </div>
      </div>
    </PageTransition>
  )
}

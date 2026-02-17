import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CreditCard, Eye, EyeOff, Shield, Check, Lock } from 'lucide-react'
import { BackHeader, PageTransition } from '../../components'

export default function AddCard() {
  const navigate = useNavigate()
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [name, setName] = useState('')
  const [nickname, setNickname] = useState('')
  const [showCvv, setShowCvv] = useState(false)
  const [saveCard, setSaveCard] = useState(true)

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 16)
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ')
  }

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4)
    if (digits.length >= 2) {
      return digits.slice(0, 2) + '/' + digits.slice(2)
    }
    return digits
  }

  const getCardBrand = (num: string) => {
    const clean = num.replace(/\s/g, '')
    if (clean.startsWith('4')) return 'Visa'
    if (clean.startsWith('5') || clean.startsWith('2')) return 'Mastercard'
    if (clean.startsWith('6')) return 'RuPay'
    return null
  }

  const cardBrand = getCardBrand(cardNumber)
  const isValid = cardNumber.replace(/\s/g, '').length === 16 && expiry.length === 5 && cvv.length >= 3 && name.length > 0

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title="Add New Card" />

        <div style={{ padding: '0 24px 120px' }}>
          {/* Card Preview */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              borderRadius: 'var(--radius-xl)',
              background: 'linear-gradient(145deg, var(--green-deep) 0%, #1A5028 50%, var(--green-rich) 100%)',
              padding: '28px 24px',
              marginBottom: 28,
              position: 'relative',
              overflow: 'hidden',
              minHeight: 180,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* Pattern overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.04)',
              transform: 'translate(40%, -40%)',
            }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <CreditCard size={28} color="rgba(255,255,255,0.5)" />
              {cardBrand && (
                <span style={{
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(255,255,255,0.15)',
                  color: 'white',
                  fontSize: 12,
                  fontWeight: 600,
                }}>
                  {cardBrand}
                </span>
              )}
            </div>

            <div>
              <div style={{
                fontSize: 20,
                fontWeight: 600,
                color: 'white',
                letterSpacing: '0.15em',
                marginBottom: 16,
                fontFamily: 'monospace',
              }}>
                {cardNumber || '•••• •••• •••• ••••'}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: 2 }}>Card Holder</div>
                  <div style={{ fontSize: 13, color: 'white', fontWeight: 600 }}>{name || 'YOUR NAME'}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: 2 }}>Expires</div>
                  <div style={{ fontSize: 13, color: 'white', fontWeight: 600 }}>{expiry || 'MM/YY'}</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Card Number */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6, color: 'var(--text-primary)' }}>
                Card Number
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  value={cardNumber}
                  onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                  placeholder="1234 5678 9012 3456"
                  className="input"
                  style={{ paddingRight: 48 }}
                  inputMode="numeric"
                />
                <CreditCard size={18} color="var(--text-tertiary)" style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </motion.div>

            {/* Expiry + CVV */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              style={{ display: 'flex', gap: 12 }}
            >
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Valid Through</label>
                <input
                  value={expiry}
                  onChange={e => setExpiry(formatExpiry(e.target.value))}
                  placeholder="MM/YY"
                  className="input"
                  inputMode="numeric"
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>CVV</label>
                <div style={{ position: 'relative' }}>
                  <input
                    value={cvv}
                    onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="•••"
                    className="input"
                    type={showCvv ? 'text' : 'password'}
                    inputMode="numeric"
                    style={{ paddingRight: 40 }}
                  />
                  <button
                    onClick={() => setShowCvv(!showCvv)}
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)' }}
                  >
                    {showCvv ? <EyeOff size={16} color="var(--text-tertiary)" /> : <Eye size={16} color="var(--text-tertiary)" />}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Name on Card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Name on Card</label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter name as on card"
                className="input"
              />
            </motion.div>

            {/* Card Nickname */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
                Card Nickname <span style={{ color: 'var(--text-tertiary)', fontWeight: 400 }}>(optional)</span>
              </label>
              <input
                value={nickname}
                onChange={e => setNickname(e.target.value)}
                placeholder='e.g. "Personal HDFC"'
                className="input"
              />
            </motion.div>

            {/* Save Card Checkbox */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <button
                onClick={() => setSaveCard(!saveCard)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-md)',
                  background: saveCard ? 'var(--green-pale)' : 'var(--bg-card)',
                  border: `1.5px solid ${saveCard ? 'var(--green-light)' : 'var(--border)'}`,
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  border: saveCard ? 'none' : '2px solid var(--border)',
                  background: saveCard ? 'var(--green-rich)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.2s ease',
                }}>
                  {saveCard && <Check size={14} color="white" />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>Secure this card</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                    Save for faster checkout next time
                  </div>
                </div>
                <Lock size={16} color="var(--text-tertiary)" />
              </button>
            </motion.div>
          </div>

          {/* Proceed Button */}
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            whileTap={{ scale: 0.97 }}
            className="btn btn-primary btn-full btn-lg"
            onClick={() => navigate('/tickets/confirmation')}
            style={{
              marginTop: 28,
              opacity: isValid ? 1 : 0.5,
              pointerEvents: isValid ? 'auto' : 'none',
            }}
          >
            PROCEED
          </motion.button>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            marginTop: 12,
            fontSize: 12,
            color: 'var(--text-tertiary)',
          }}>
            <Shield size={12} />
            Your card details are encrypted and secure
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

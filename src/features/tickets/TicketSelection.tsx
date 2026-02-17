import { useState, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Minus, Plus, ChevronLeft, ChevronRight, Ticket, Users, GraduationCap, Check, Crown, MapPin, Camera } from 'lucide-react'
import { BackHeader, PageTransition } from '../../components'

const ticketMeta: Record<string, { name: string; icon: typeof Ticket; prices: { adult: number; child: number; infant: number } }> = {
  general: {
    name: 'General Entry Ticket',
    icon: Ticket,
    prices: { adult: 500, child: 300, infant: 0 },
  },
  group: {
    name: 'Group Entry Ticket',
    icon: Users,
    prices: { adult: 400, child: 250, infant: 0 },
  },
  educational: {
    name: 'Educational Visit Ticket',
    icon: GraduationCap,
    prices: { adult: 350, child: 200, infant: 0 },
  },
}

const addOns = [
  { id: 'premier', name: 'Premier Access', desc: 'Skip queues & VIP perks', price: 500, icon: Crown },
  { id: 'parking', name: 'Parking Pass', desc: 'Reserved parking spot', price: 200, icon: MapPin },
  { id: 'photo', name: 'Photo Package', desc: 'Unlimited digital photos', price: 300, icon: Camera },
]

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

export default function TicketSelection() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const ticketType = searchParams.get('type') || 'general'
  const meta = ticketMeta[ticketType] || ticketMeta.general

  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(1)
  const [infants, setInfants] = useState(0)
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])

  const today = new Date()
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [viewYear, setViewYear] = useState(today.getFullYear())

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)

  const isToday = (day: number) => {
    return viewYear === today.getFullYear() && viewMonth === today.getMonth() && day === today.getDate()
  }

  const isPast = (day: number) => {
    const d = new Date(viewYear, viewMonth, day)
    const t = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return d < t
  }

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear(y => y - 1)
    } else {
      setViewMonth(m => m - 1)
    }
    setSelectedDate(null)
  }

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear(y => y + 1)
    } else {
      setViewMonth(m => m + 1)
    }
    setSelectedDate(null)
  }

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    )
  }

  const ticketTotal = useMemo(() => {
    const base = (adults * meta.prices.adult) + (children * meta.prices.child) + (infants * meta.prices.infant)
    const addOnTotal = addOns
      .filter(a => selectedAddOns.includes(a.id))
      .reduce((sum, a) => sum + a.price * (adults + children), 0)
    return base + addOnTotal
  }, [adults, children, infants, selectedAddOns, meta])

  const Icon = meta.icon

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title="Buy Ticket" />

        <div style={{ padding: '0 24px 140px' }}>
          {/* Selected Ticket Type */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
            style={{
              padding: 16,
              marginBottom: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              border: '1.5px solid var(--green-light)',
              background: 'var(--green-pale)',
            }}
          >
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 'var(--radius-md)',
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Icon size={22} color="var(--green-rich)" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{meta.name}</div>
              <div style={{ fontSize: 12, color: 'var(--green-rich)' }}>
                From {'\u20B9'}{meta.prices.adult}/adult
              </div>
            </div>
            <span className="badge badge-active">Selected</span>
          </motion.div>

          {/* Quantity Picker */}
          <div style={{ marginBottom: 24 }}>
            <h3 className="t-display-sm" style={{ marginBottom: 16 }}>Number of Visitors</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Adult */}
              <div className="card" style={{
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>Adult</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Age 13+ &middot; {'\u20B9'}{meta.prices.adult}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 'var(--radius-full)',
                      border: '1.5px solid var(--border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: adults <= 1 ? 0.4 : 1,
                    }}
                  >
                    <Minus size={16} />
                  </motion.button>
                  <span style={{ fontWeight: 700, fontSize: 18, width: 24, textAlign: 'center' }}>{adults}</span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setAdults(adults + 1)}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--green-deep)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Plus size={16} />
                  </motion.button>
                </div>
              </div>

              {/* Child */}
              <div className="card" style={{
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>Child</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Age 3-12 &middot; {'\u20B9'}{meta.prices.child}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 'var(--radius-full)',
                      border: '1.5px solid var(--border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: children <= 0 ? 0.4 : 1,
                    }}
                  >
                    <Minus size={16} />
                  </motion.button>
                  <span style={{ fontWeight: 700, fontSize: 18, width: 24, textAlign: 'center' }}>{children}</span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setChildren(children + 1)}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--green-deep)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Plus size={16} />
                  </motion.button>
                </div>
              </div>

              {/* Infant */}
              <div className="card" style={{
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>Infant</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Under 3 &middot; Free</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setInfants(Math.max(0, infants - 1))}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 'var(--radius-full)',
                      border: '1.5px solid var(--border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: infants <= 0 ? 0.4 : 1,
                    }}
                  >
                    <Minus size={16} />
                  </motion.button>
                  <span style={{ fontWeight: 700, fontSize: 18, width: 24, textAlign: 'center' }}>{infants}</span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setInfants(infants + 1)}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--green-deep)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Plus size={16} />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar Date Picker */}
          <div style={{ marginBottom: 24 }}>
            <h3 className="t-display-sm" style={{ marginBottom: 16 }}>Select Date</h3>
            <div className="card" style={{ padding: 20 }}>
              {/* Month Navigation */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 16,
              }}>
                <motion.button whileTap={{ scale: 0.9 }} onClick={prevMonth}>
                  <ChevronLeft size={20} color="var(--text-secondary)" />
                </motion.button>
                <span style={{ fontWeight: 700, fontSize: 16 }}>
                  {months[viewMonth]} {viewYear}
                </span>
                <motion.button whileTap={{ scale: 0.9 }} onClick={nextMonth}>
                  <ChevronRight size={20} color="var(--text-secondary)" />
                </motion.button>
              </div>

              {/* Day Headers */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: 4,
                marginBottom: 8,
              }}>
                {dayNames.map(d => (
                  <div key={d} style={{
                    textAlign: 'center',
                    fontSize: 11,
                    fontWeight: 600,
                    color: 'var(--text-tertiary)',
                    padding: '4px 0',
                    textTransform: 'uppercase',
                  }}>
                    {d}
                  </div>
                ))}
              </div>

              {/* Day Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: 4,
              }}>
                {/* Empty cells for offset */}
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {/* Days */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1
                  const past = isPast(day)
                  const todayCell = isToday(day)
                  const selected = selectedDate === day

                  return (
                    <motion.button
                      key={day}
                      whileTap={!past ? { scale: 0.9 } : undefined}
                      onClick={() => !past && setSelectedDate(day)}
                      disabled={past}
                      style={{
                        width: '100%',
                        aspectRatio: '1',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 14,
                        fontWeight: selected ? 700 : todayCell ? 600 : 400,
                        background: selected
                          ? 'var(--green-deep)'
                          : todayCell
                            ? 'var(--green-pale)'
                            : 'transparent',
                        color: selected
                          ? 'white'
                          : past
                            ? 'var(--text-tertiary)'
                            : todayCell
                              ? 'var(--green-rich)'
                              : 'var(--text-primary)',
                        opacity: past ? 0.4 : 1,
                        cursor: past ? 'default' : 'pointer',
                        border: todayCell && !selected ? '1.5px solid var(--green-light)' : '1.5px solid transparent',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {day}
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Add-Ons */}
          <div style={{ marginBottom: 24 }}>
            <h3 className="t-display-sm" style={{ marginBottom: 16 }}>Add-Ons</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {addOns.map(addon => {
                const AddonIcon = addon.icon
                const isSelected = selectedAddOns.includes(addon.id)
                return (
                  <motion.button
                    key={addon.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleAddOn(addon.id)}
                    className="card"
                    style={{
                      padding: '14px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      width: '100%',
                      textAlign: 'left',
                      borderColor: isSelected ? 'var(--green-rich)' : undefined,
                      background: isSelected ? 'var(--green-pale)' : undefined,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{
                      width: 22,
                      height: 22,
                      borderRadius: 6,
                      border: isSelected ? 'none' : '2px solid var(--border)',
                      background: isSelected ? 'var(--green-rich)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.2s ease',
                    }}>
                      {isSelected && <Check size={14} color="white" />}
                    </div>
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: 'var(--radius-sm)',
                      background: isSelected ? 'white' : 'var(--green-pale)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <AddonIcon size={18} color="var(--green-rich)" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{addon.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{addon.desc}</div>
                    </div>
                    <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--green-rich)' }}>
                      +{'\u20B9'}{addon.price}
                    </span>
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* Running Total */}
          <div className="card" style={{
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 16,
            background: 'var(--bg-dark)',
            color: 'white',
            border: 'none',
          }}>
            <div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Estimated Total</div>
              <div style={{ fontSize: 11, opacity: 0.5 }}>
                {adults} Adult{adults > 1 ? 's' : ''}{children > 0 ? `, ${children} Child${children > 1 ? 'ren' : ''}` : ''}{infants > 0 ? `, ${infants} Infant${infants > 1 ? 's' : ''}` : ''}
              </div>
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, fontFamily: 'var(--font-display)' }}>
              {'\u20B9'}{ticketTotal.toLocaleString()}
            </div>
          </div>

          {/* CTA */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="btn btn-primary btn-full btn-lg"
            onClick={() => navigate('/tickets/review')}
            style={{
              opacity: selectedDate ? 1 : 0.5,
              pointerEvents: selectedDate ? 'auto' : 'none',
            }}
          >
            REVIEW AND PAY &middot; {'\u20B9'}{ticketTotal.toLocaleString()}
          </motion.button>
        </div>
      </div>
    </PageTransition>
  )
}

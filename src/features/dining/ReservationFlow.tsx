import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check, Calendar, Clock, Users, PartyPopper, Home, MapPin, AlertCircle } from 'lucide-react'
import { BackHeader, PageTransition } from '../../components'

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const timeSlots = [
  { time: '11:00 AM', period: 'Lunch' },
  { time: '11:30 AM', period: 'Lunch' },
  { time: '12:00 PM', period: 'Lunch' },
  { time: '12:30 PM', period: 'Lunch' },
  { time: '1:00 PM', period: 'Lunch' },
  { time: '1:30 PM', period: 'Lunch' },
  { time: '5:00 PM', period: 'Dinner' },
  { time: '5:30 PM', period: 'Dinner' },
  { time: '6:00 PM', period: 'Dinner' },
  { time: '6:30 PM', period: 'Dinner' },
  { time: '7:00 PM', period: 'Dinner' },
  { time: '7:30 PM', period: 'Dinner' },
]

const specificSlots = [
  { time: '12:00 PM', table: 'Window Seat', seats: 4, available: true },
  { time: '12:00 PM', table: 'Garden View', seats: 6, available: true },
  { time: '12:00 PM', table: 'Indoor Booth', seats: 2, available: false },
  { time: '12:30 PM', table: 'Terrace', seats: 4, available: true },
  { time: '12:30 PM', table: 'Private Alcove', seats: 8, available: true },
]

const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

export default function ReservationFlow() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [selectedMonth] = useState(1) // February
  const [selectedYear] = useState(2026)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null)
  const [guestCount, setGuestCount] = useState(2)
  const [termsAccepted, setTermsAccepted] = useState({
    cancellation: false,
    noShow: false,
    allergens: false,
  })

  const allTermsAccepted = Object.values(termsAccepted).every(Boolean)

  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth)
  const firstDay = getFirstDayOfMonth(selectedYear, selectedMonth)
  const days = useMemo(() => {
    const arr: (number | null)[] = []
    for (let i = 0; i < firstDay; i++) arr.push(null)
    for (let d = 1; d <= daysInMonth; d++) arr.push(d)
    return arr
  }, [daysInMonth, firstDay])

  const canProceed = () => {
    switch (step) {
      case 1: return selectedDay !== null && selectedTime !== null
      case 2: return selectedSlot !== null
      case 3: return allTermsAccepted
      case 4: return true
      case 5: return true
      default: return false
    }
  }

  const goNext = () => {
    if (step < 5) setStep(step + 1)
  }

  const goBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const progressPercent = (step / 5) * 100

  const stepVariants = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  }

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title="Book a Table" />

        {/* Progress Bar */}
        <div style={{ padding: '0 24px 8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span className="t-caption" style={{ color: 'var(--text-secondary)' }}>Step {step} of 5</span>
            <span className="t-caption" style={{ color: 'var(--green-rich)', fontWeight: 600 }}>
              {step === 1 ? 'Date & Time' : step === 2 ? 'Select Slot' : step === 3 ? 'Terms' : step === 4 ? 'Confirm' : 'Done!'}
            </span>
          </div>
          <div className="progress-bar">
            <motion.div
              className="progress-bar-fill"
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>

          {/* Step Indicators */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, marginBottom: 4 }}>
            {[1, 2, 3, 4, 5].map(s => (
              <div
                key={s}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: s <= step ? 'var(--green-rich)' : 'var(--border-light)',
                  color: s <= step ? 'white' : 'var(--text-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 700,
                  transition: 'all 0.3s ease',
                }}
              >
                {s < step ? <Check size={14} /> : s}
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '16px 24px 140px' }}>
          <AnimatePresence mode="wait">
            {/* STEP 1: Date & Time */}
            {step === 1 && (
              <motion.div key="step1" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.25 }}>
                <h3 className="t-display-sm" style={{ marginBottom: 16 }}>
                  <Calendar size={20} style={{ verticalAlign: 'middle', marginRight: 8 }} />
                  Choose a Date
                </h3>

                {/* Mini Calendar */}
                <div className="card" style={{ padding: 14, marginBottom: 24 }}>
                  <div style={{ textAlign: 'center', fontWeight: 600, fontSize: 15, marginBottom: 12 }}>
                    {months[selectedMonth]} {selectedYear}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 4 }}>
                    {weekdays.map(wd => (
                      <div key={wd} style={{ textAlign: 'center', fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', padding: '4px 0' }}>
                        {wd}
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3 }}>
                    {days.map((day, i) => {
                      if (day === null) return <div key={`e-${i}`} />
                      const isPast = day < 17
                      const selected = day === selectedDay
                      return (
                        <button
                          key={day}
                          disabled={isPast}
                          onClick={() => setSelectedDay(day)}
                          style={{
                            aspectRatio: '1',
                            borderRadius: 'var(--radius-sm)',
                            background: selected ? 'var(--green-deep)' : 'transparent',
                            color: selected ? 'white' : isPast ? 'var(--border)' : 'var(--text-primary)',
                            fontWeight: selected ? 700 : 400,
                            fontSize: 13,
                            opacity: isPast ? 0.4 : 1,
                            cursor: isPast ? 'not-allowed' : 'pointer',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          {day}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Guest Count */}
                <h3 className="t-display-sm" style={{ marginBottom: 12 }}>
                  <Users size={20} style={{ verticalAlign: 'middle', marginRight: 8 }} />
                  Number of Guests
                </h3>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
                  {guestOptions.map(n => (
                    <button
                      key={n}
                      className={`chip ${guestCount === n ? 'chip-active' : ''}`}
                      onClick={() => setGuestCount(n)}
                      style={{ minWidth: 44, justifyContent: 'center' }}
                    >
                      {n}
                    </button>
                  ))}
                </div>

                {/* Time Slots */}
                <h3 className="t-display-sm" style={{ marginBottom: 12 }}>
                  <Clock size={20} style={{ verticalAlign: 'middle', marginRight: 8 }} />
                  Pick a Time
                </h3>

                {['Lunch', 'Dinner'].map(period => (
                  <div key={period} style={{ marginBottom: 16 }}>
                    <div className="t-label" style={{ color: 'var(--text-tertiary)', marginBottom: 8 }}>{period}</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                      {timeSlots.filter(s => s.period === period).map(slot => (
                        <button
                          key={slot.time}
                          className={`chip ${selectedTime === slot.time ? 'chip-active' : ''}`}
                          onClick={() => setSelectedTime(slot.time)}
                          style={{ justifyContent: 'center', fontSize: 13 }}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* STEP 2: Select Specific Slot */}
            {step === 2 && (
              <motion.div key="step2" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.25 }}>
                <h3 className="t-display-sm" style={{ marginBottom: 6 }}>Select Your Table</h3>
                <p className="t-body-sm" style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>
                  Available tables for {guestCount} guests on Feb {selectedDay}, {selectedTime}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {specificSlots.map((slot, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      whileTap={slot.available ? { scale: 0.98 } : undefined}
                      disabled={!slot.available}
                      onClick={() => slot.available && setSelectedSlot(i)}
                      className="card"
                      style={{
                        padding: 16,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        textAlign: 'left',
                        opacity: slot.available ? 1 : 0.45,
                        border: selectedSlot === i ? '2px solid var(--green-rich)' : '1px solid var(--border-light)',
                        background: selectedSlot === i ? 'var(--green-pale)' : 'var(--bg-card)',
                        transition: 'all 0.2s ease',
                        cursor: slot.available ? 'pointer' : 'not-allowed',
                      }}
                    >
                      <div style={{
                        width: 48, height: 48, borderRadius: 'var(--radius-md)',
                        background: selectedSlot === i ? 'var(--green-rich)' : 'var(--bg-primary)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all 0.2s ease',
                      }}>
                        <MapPin size={20} color={selectedSlot === i ? 'white' : 'var(--green-rich)'} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 2 }}>{slot.table}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                          {slot.time} · Seats {slot.seats}
                        </div>
                      </div>
                      {slot.available ? (
                        <div style={{
                          width: 24, height: 24, borderRadius: '50%',
                          border: `2px solid ${selectedSlot === i ? 'var(--green-rich)' : 'var(--border)'}`,
                          background: selectedSlot === i ? 'var(--green-rich)' : 'transparent',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'all 0.2s ease',
                        }}>
                          {selectedSlot === i && <Check size={14} color="white" strokeWidth={3} />}
                        </div>
                      ) : (
                        <span className="badge" style={{ background: 'var(--coral-pale)', color: 'var(--coral)', fontSize: 10 }}>
                          Taken
                        </span>
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 3: Terms & Conditions */}
            {step === 3 && (
              <motion.div key="step3" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.25 }}>
                <h3 className="t-display-sm" style={{ marginBottom: 6 }}>Terms & Conditions</h3>
                <p className="t-body-sm" style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>
                  Please review and accept the following before confirming your reservation
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {/* Cancellation Policy */}
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setTermsAccepted(prev => ({ ...prev, cancellation: !prev.cancellation }))}
                    className="card"
                    style={{
                      padding: 16,
                      display: 'flex',
                      gap: 14,
                      textAlign: 'left',
                      border: termsAccepted.cancellation ? '1.5px solid var(--green-rich)' : '1px solid var(--border-light)',
                      background: termsAccepted.cancellation ? 'var(--green-pale)' : 'var(--bg-card)',
                    }}
                  >
                    <div style={{
                      width: 24, height: 24, borderRadius: 6, flexShrink: 0,
                      border: `2px solid ${termsAccepted.cancellation ? 'var(--green-rich)' : 'var(--border)'}`,
                      background: termsAccepted.cancellation ? 'var(--green-rich)' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginTop: 2,
                    }}>
                      {termsAccepted.cancellation && <Check size={14} color="white" strokeWidth={3} />}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Cancellation Policy</div>
                      <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        Free cancellation up to 2 hours before your reservation time. Late cancellations may result in a $10 fee per person.
                      </p>
                    </div>
                  </motion.button>

                  {/* No-Show Policy */}
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setTermsAccepted(prev => ({ ...prev, noShow: !prev.noShow }))}
                    className="card"
                    style={{
                      padding: 16,
                      display: 'flex',
                      gap: 14,
                      textAlign: 'left',
                      border: termsAccepted.noShow ? '1.5px solid var(--green-rich)' : '1px solid var(--border-light)',
                      background: termsAccepted.noShow ? 'var(--green-pale)' : 'var(--bg-card)',
                    }}
                  >
                    <div style={{
                      width: 24, height: 24, borderRadius: 6, flexShrink: 0,
                      border: `2px solid ${termsAccepted.noShow ? 'var(--green-rich)' : 'var(--border)'}`,
                      background: termsAccepted.noShow ? 'var(--green-rich)' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginTop: 2,
                    }}>
                      {termsAccepted.noShow && <Check size={14} color="white" strokeWidth={3} />}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>No-Show Policy</div>
                      <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        Tables are held for 15 minutes past your reservation time. After that, your reservation will be released to walk-in guests.
                      </p>
                    </div>
                  </motion.button>

                  {/* Allergens */}
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setTermsAccepted(prev => ({ ...prev, allergens: !prev.allergens }))}
                    className="card"
                    style={{
                      padding: 16,
                      display: 'flex',
                      gap: 14,
                      textAlign: 'left',
                      border: termsAccepted.allergens ? '1.5px solid var(--green-rich)' : '1px solid var(--border-light)',
                      background: termsAccepted.allergens ? 'var(--green-pale)' : 'var(--bg-card)',
                    }}
                  >
                    <div style={{
                      width: 24, height: 24, borderRadius: 6, flexShrink: 0,
                      border: `2px solid ${termsAccepted.allergens ? 'var(--green-rich)' : 'var(--border)'}`,
                      background: termsAccepted.allergens ? 'var(--green-rich)' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginTop: 2,
                    }}>
                      {termsAccepted.allergens && <Check size={14} color="white" strokeWidth={3} />}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Allergen Acknowledgment</div>
                      <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        I understand that the restaurant menu may contain allergens. I will inform the staff of any dietary restrictions or allergies upon arrival.
                      </p>
                    </div>
                  </motion.button>
                </div>

                {!allTermsAccepted && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      marginTop: 16,
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--orange-pale)',
                      border: '1px solid var(--amber-light)',
                    }}
                  >
                    <AlertCircle size={16} color="var(--amber)" />
                    <span style={{ fontSize: 12, color: 'var(--orange-medium)' }}>
                      Please accept all terms to continue
                    </span>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* STEP 4: Confirm Details */}
            {step === 4 && (
              <motion.div key="step4" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.25 }}>
                <h3 className="t-display-sm" style={{ marginBottom: 6 }}>Confirm Your Reservation</h3>
                <p className="t-body-sm" style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>
                  Please review the details below before confirming
                </p>

                <div className="card" style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: 'var(--radius-md)',
                      background: 'var(--green-pale)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 28,
                    }}>
                      🍽️
                    </div>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 700 }}>Albert's Restaurant</div>
                      <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Treehouse Zone</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{
                      display: 'flex', justifyContent: 'space-between',
                      padding: '12px 14px', borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-primary)',
                    }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-secondary)' }}>
                        <Calendar size={16} color="var(--green-rich)" /> Date
                      </span>
                      <span style={{ fontSize: 14, fontWeight: 600 }}>
                        Feb {selectedDay}, 2026
                      </span>
                    </div>
                    <div style={{
                      display: 'flex', justifyContent: 'space-between',
                      padding: '12px 14px', borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-primary)',
                    }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-secondary)' }}>
                        <Clock size={16} color="var(--green-rich)" /> Time
                      </span>
                      <span style={{ fontSize: 14, fontWeight: 600 }}>
                        {selectedTime || '12:00 PM'}
                      </span>
                    </div>
                    <div style={{
                      display: 'flex', justifyContent: 'space-between',
                      padding: '12px 14px', borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-primary)',
                    }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-secondary)' }}>
                        <Users size={16} color="var(--green-rich)" /> Guests
                      </span>
                      <span style={{ fontSize: 14, fontWeight: 600 }}>
                        {guestCount} {guestCount === 1 ? 'Guest' : 'Guests'}
                      </span>
                    </div>
                    <div style={{
                      display: 'flex', justifyContent: 'space-between',
                      padding: '12px 14px', borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-primary)',
                    }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-secondary)' }}>
                        <MapPin size={16} color="var(--green-rich)" /> Table
                      </span>
                      <span style={{ fontSize: 14, fontWeight: 600 }}>
                        {selectedSlot !== null ? specificSlots[selectedSlot]?.table : 'Window Seat'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="card" style={{
                  background: 'var(--gold-pale)',
                  border: '1px solid var(--gold-light)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: 14,
                }}>
                  <AlertCircle size={18} color="var(--yellow-medium)" />
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    Your table will be held for 15 minutes. A confirmation will be sent to your registered email and phone number.
                  </span>
                </div>
              </motion.div>
            )}

            {/* STEP 5: Success */}
            {step === 5 && (
              <motion.div
                key="step5"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.25 }}
                style={{ textAlign: 'center', padding: '24px 0' }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    background: 'var(--green-pale)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                  >
                    <PartyPopper size={48} color="var(--green-rich)" />
                  </motion.div>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="t-display-lg"
                  style={{ marginBottom: 8 }}
                >
                  Congratulations!
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="t-body"
                  style={{ color: 'var(--text-secondary)', marginBottom: 28 }}
                >
                  Your table has been reserved successfully
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="card"
                  style={{ textAlign: 'left', marginBottom: 20 }}
                >
                  <div className="t-label" style={{ color: 'var(--green-rich)', marginBottom: 12 }}>
                    CONFIRMATION DETAILS
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Booking ID</span>
                      <span style={{ fontSize: 13, fontWeight: 700 }}>ZOO-RES-{Math.floor(Math.random() * 9000 + 1000)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Restaurant</span>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>Albert's Restaurant</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Date</span>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>Feb {selectedDay || 17}, 2026</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Time</span>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{selectedTime || '12:00 PM'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Guests</span>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{guestCount}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Table</span>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>
                        {selectedSlot !== null ? specificSlots[selectedSlot]?.table : 'Window Seat'}
                      </span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--green-pale)',
                    border: '1px solid var(--green-light)',
                    marginBottom: 28,
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <Check size={16} color="var(--green-rich)" />
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--green-rich)' }}>Confirmation sent!</span>
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)', paddingLeft: 24 }}>
                    A confirmation has been sent to your email and phone number on file.
                  </p>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn btn-primary btn-full btn-lg"
                  onClick={() => navigate('/home')}
                >
                  <Home size={18} /> Back to Home
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons (not on step 5) */}
        {step < 5 && (
          <div style={{
            position: 'fixed',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: 430,
            padding: '12px 24px',
            paddingBottom: 'calc(12px + env(safe-area-inset-bottom, 0px))',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid var(--border-light)',
            zIndex: 50,
            display: 'flex',
            gap: 12,
          }}>
            {step > 1 && (
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="btn btn-secondary"
                onClick={goBack}
                style={{ flex: 1 }}
              >
                <ChevronLeft size={16} /> Back
              </motion.button>
            )}
            <motion.button
              whileTap={{ scale: 0.97 }}
              className={`btn btn-primary ${!canProceed() ? '' : ''}`}
              onClick={goNext}
              disabled={!canProceed()}
              style={{
                flex: step > 1 ? 2 : 1,
                width: step === 1 ? '100%' : undefined,
                opacity: canProceed() ? 1 : 0.5,
                cursor: canProceed() ? 'pointer' : 'not-allowed',
              }}
            >
              {step === 4 ? 'Confirm Reservation' : 'Next'}
              {step < 4 && <ChevronRight size={16} />}
            </motion.button>
          </div>
        )}
      </div>
    </PageTransition>
  )
}

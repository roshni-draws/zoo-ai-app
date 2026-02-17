import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft as ChevLeft, ChevronRight as ChevRight, Clock, Minus, Plus, Users } from 'lucide-react'
import { BackHeader, PageTransition } from '../../../components'

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const timeSlots = [
  { time: '9:00 AM', spots: 3 },
  { time: '11:00 AM', spots: 12 },
  { time: '1:00 PM', spots: 8 },
  { time: '3:00 PM', spots: 15 },
  { time: '5:00 PM', spots: 20 },
]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

export default function SafariDatePicker() {
  const { id } = useParams()
  const navigate = useNavigate()
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)

  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth)
  const days: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) days.push(null)
  for (let i = 1; i <= daysInMonth; i++) days.push(i)

  const isPast = (day: number) => {
    const d = new Date(currentYear, currentMonth, day)
    const t = new Date()
    t.setHours(0, 0, 0, 0)
    return d < t
  }

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1) }
    else setCurrentMonth(currentMonth - 1)
    setSelectedDate(null)
  }

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1) }
    else setCurrentMonth(currentMonth + 1)
    setSelectedDate(null)
  }

  const canContinue = selectedDate && selectedTime && adults > 0

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title="Select Date & Time" />

        <div style={{ padding: '0 24px 120px' }}>
          {/* Tour Info */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 14px', background: 'var(--green-pale)',
              borderRadius: 'var(--radius-md)', marginBottom: 16,
            }}
          >
            <span style={{ fontSize: 28 }}>🦁</span>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>Cheetah Safari</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Clock size={12} /> 2 hours duration
              </div>
            </div>
          </motion.div>

          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
            style={{ padding: 16, marginBottom: 16 }}
          >
            {/* Month Nav */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <button onClick={prevMonth} style={{ padding: 4 }}>
                <ChevLeft size={20} color="var(--text-secondary)" />
              </button>
              <span className="t-heading">{monthNames[currentMonth]} {currentYear}</span>
              <button onClick={nextMonth} style={{ padding: 4 }}>
                <ChevRight size={20} color="var(--text-secondary)" />
              </button>
            </div>

            {/* Day Headers */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 6 }}>
              {dayNames.map(d => (
                <div key={d} style={{ textAlign: 'center', fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)', padding: '4px 0' }}>
                  {d}
                </div>
              ))}
            </div>

            {/* Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
              {days.map((day, i) => {
                if (day === null) return <div key={`e-${i}`} />
                const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()
                const isSelected = day === selectedDate
                const past = isPast(day)

                return (
                  <motion.button
                    key={day}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => !past && setSelectedDate(day)}
                    style={{
                      width: '100%', aspectRatio: '1',
                      borderRadius: 'var(--radius-full)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 14,
                      fontWeight: isSelected || isToday ? 700 : 400,
                      background: isSelected ? 'var(--green-deep)' : isToday ? 'var(--green-pale)' : 'transparent',
                      color: isSelected ? 'white' : past ? 'var(--text-tertiary)' : isToday ? 'var(--green-rich)' : 'var(--text-primary)',
                      opacity: past ? 0.4 : 1,
                      cursor: past ? 'default' : 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {day}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>

          {/* How many people? */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="card"
            style={{ padding: 16, marginBottom: 16 }}
          >
            <h3 className="t-heading" style={{ marginBottom: 14 }}>
              <Users size={16} style={{ display: 'inline', marginRight: 6 }} />
              How many people?
            </h3>

            {[
              { label: 'Adult', desc: 'Age 12+', value: adults, set: setAdults, min: 1, max: 10 },
              { label: 'Children', desc: 'Age 3-11', value: children, set: setChildren, min: 0, max: 8 },
              { label: 'Infant', desc: 'Age 0-2 (Free)', value: infants, set: setInfants, min: 0, max: 4 },
            ].map((group, i) => (
              <div key={group.label} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: i < 2 ? '1px solid var(--border-light)' : 'none',
              }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{group.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{group.desc}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => group.set(Math.max(group.min, group.value - 1))}
                    style={{
                      width: 30, height: 30, borderRadius: 'var(--radius-full)',
                      border: '1.5px solid var(--border)', display: 'flex',
                      alignItems: 'center', justifyContent: 'center', background: 'var(--bg-card)',
                    }}
                  >
                    <Minus size={14} />
                  </motion.button>
                  <span style={{ fontWeight: 700, fontSize: 16, minWidth: 20, textAlign: 'center' }}>{group.value}</span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => group.set(Math.min(group.max, group.value + 1))}
                    style={{
                      width: 30, height: 30, borderRadius: 'var(--radius-full)',
                      background: 'var(--green-deep)', display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <Plus size={14} color="white" />
                  </motion.button>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Available Times */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
            style={{ padding: 16, marginBottom: 24 }}
          >
            <h3 className="t-heading" style={{ marginBottom: 12 }}>Available Times</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {timeSlots.map(slot => (
                <motion.button
                  key={slot.time}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedTime(slot.time)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: selectedTime === slot.time ? '2px solid var(--green-rich)' : '1px solid var(--border-light)',
                    background: selectedTime === slot.time ? 'var(--green-pale)' : 'var(--bg-card)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Clock size={16} color={selectedTime === slot.time ? 'var(--green-rich)' : 'var(--text-tertiary)'} />
                    <span style={{ fontSize: 14, fontWeight: selectedTime === slot.time ? 700 : 500 }}>
                      {slot.time}
                    </span>
                  </div>
                  <span className="badge" style={{
                    background: slot.spots <= 5 ? 'var(--coral-pale)' : 'var(--green-pale)',
                    color: slot.spots <= 5 ? 'var(--coral)' : 'var(--green-rich)',
                    fontSize: 10,
                  }}>
                    {slot.spots} spots left
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Continue Button */}
          <button
            onClick={() => canContinue && navigate(`/transport/safari/${id}/info`)}
            className={`btn btn-full ${canContinue ? 'btn-primary' : 'btn-secondary'}`}
            style={{
              padding: 16, fontSize: 16, fontWeight: 700,
              letterSpacing: '0.05em', opacity: canContinue ? 1 : 0.5,
            }}
          >
            CONTINUE
          </button>
        </div>
      </div>
    </PageTransition>
  )
}

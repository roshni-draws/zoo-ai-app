import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft as ChevLeft, ChevronRight as ChevRight } from 'lucide-react'
import { BackHeader, PageTransition } from '../../../components'

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

export default function ShuttleDatePicker() {
  const navigate = useNavigate()
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [hours, setHours] = useState(10)
  const [minutes, setMinutes] = useState(0)
  const [ampm, setAmpm] = useState<'AM' | 'PM'>('AM')

  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth)
  const days: (number | null)[] = []

  for (let i = 0; i < firstDay; i++) days.push(null)
  for (let i = 1; i <= daysInMonth; i++) days.push(i)

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
    setSelectedDate(null)
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
    setSelectedDate(null)
  }

  const isPast = (day: number) => {
    const d = new Date(currentYear, currentMonth, day)
    const t = new Date()
    t.setHours(0, 0, 0, 0)
    return d < t
  }

  const handleClear = () => {
    setSelectedDate(null)
    setHours(10)
    setMinutes(0)
    setAmpm('AM')
  }

  const handleSelect = () => {
    if (selectedDate) {
      navigate('/transport/shuttle/listing')
    }
  }

  return (
    <PageTransition>
      <div className="page">
        <BackHeader title="Select Time & Date" />

        <div style={{ padding: '0 24px 120px' }}>
          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
            style={{ padding: 16, marginBottom: 20 }}
          >
            {/* Month Navigation */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <button onClick={prevMonth} style={{ padding: 4 }}>
                <ChevLeft size={20} color="var(--text-secondary)" />
              </button>
              <span className="t-heading">{monthNames[currentMonth]} {currentYear}</span>
              <button onClick={nextMonth} style={{ padding: 4 }}>
                <ChevRight size={20} color="var(--text-secondary)" />
              </button>
            </div>

            {/* Day Headers */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 8 }}>
              {dayNames.map(d => (
                <div key={d} style={{
                  textAlign: 'center',
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'var(--text-tertiary)',
                  padding: '4px 0',
                }}>
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
              {days.map((day, i) => {
                if (day === null) return <div key={`empty-${i}`} />
                const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()
                const isSelected = day === selectedDate
                const past = isPast(day)

                return (
                  <motion.button
                    key={day}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => !past && setSelectedDate(day)}
                    style={{
                      width: '100%',
                      aspectRatio: '1',
                      borderRadius: 'var(--radius-full)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 14,
                      fontWeight: isSelected || isToday ? 700 : 400,
                      background: isSelected
                        ? 'var(--green-deep)'
                        : isToday
                          ? 'var(--green-pale)'
                          : 'transparent',
                      color: isSelected
                        ? 'white'
                        : past
                          ? 'var(--text-tertiary)'
                          : isToday
                            ? 'var(--green-rich)'
                            : 'var(--text-primary)',
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

          {/* Time Picker */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="card"
            style={{ padding: 16, marginBottom: 24 }}
          >
            <h3 className="t-display-sm" style={{ marginBottom: 14 }}>Select Time</h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              {/* Hours */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <button
                  onClick={() => setHours(h => h >= 12 ? 1 : h + 1)}
                  style={{ padding: 4, color: 'var(--text-tertiary)' }}
                >
                  <ChevRight size={18} style={{ transform: 'rotate(-90deg)' }} />
                </button>
                <div style={{
                  width: 56,
                  height: 48,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--green-pale)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  fontWeight: 700,
                  color: 'var(--green-deep)',
                }}>
                  {hours.toString().padStart(2, '0')}
                </div>
                <button
                  onClick={() => setHours(h => h <= 1 ? 12 : h - 1)}
                  style={{ padding: 4, color: 'var(--text-tertiary)' }}
                >
                  <ChevRight size={18} style={{ transform: 'rotate(90deg)' }} />
                </button>
              </div>

              <span style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-secondary)' }}>:</span>

              {/* Minutes */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <button
                  onClick={() => setMinutes(m => (m + 15) % 60)}
                  style={{ padding: 4, color: 'var(--text-tertiary)' }}
                >
                  <ChevRight size={18} style={{ transform: 'rotate(-90deg)' }} />
                </button>
                <div style={{
                  width: 56,
                  height: 48,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--green-pale)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  fontWeight: 700,
                  color: 'var(--green-deep)',
                }}>
                  {minutes.toString().padStart(2, '0')}
                </div>
                <button
                  onClick={() => setMinutes(m => (m - 15 + 60) % 60)}
                  style={{ padding: 4, color: 'var(--text-tertiary)' }}
                >
                  <ChevRight size={18} style={{ transform: 'rotate(90deg)' }} />
                </button>
              </div>

              {/* AM/PM */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                marginLeft: 8,
              }}>
                <button
                  onClick={() => setAmpm('AM')}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: 13,
                    fontWeight: 700,
                    background: ampm === 'AM' ? 'var(--green-deep)' : 'var(--bg-primary)',
                    color: ampm === 'AM' ? 'white' : 'var(--text-secondary)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  AM
                </button>
                <button
                  onClick={() => setAmpm('PM')}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: 13,
                    fontWeight: 700,
                    background: ampm === 'PM' ? 'var(--green-deep)' : 'var(--bg-primary)',
                    color: ampm === 'PM' ? 'white' : 'var(--text-secondary)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  PM
                </button>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={handleClear}
              className="btn btn-secondary"
              style={{ flex: 1 }}
            >
              Clear
            </button>
            <button
              onClick={handleSelect}
              className={`btn ${selectedDate ? 'btn-primary' : 'btn-secondary'}`}
              style={{ flex: 2, opacity: selectedDate ? 1 : 0.5 }}
            >
              Select
            </button>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

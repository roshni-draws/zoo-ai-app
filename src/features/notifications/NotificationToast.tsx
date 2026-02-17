import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bell, X, AlertTriangle, Calendar, Heart, Zap, MapPin } from 'lucide-react'

export type NotificationCategory = 'info' | 'alert' | 'event' | 'social' | 'location' | 'energy'

const categoryConfig: Record<NotificationCategory, {
  gradient: string
  label: string
  labelColor: string
  iconBg: string
  Icon: typeof Bell
}> = {
  info: {
    gradient: 'linear-gradient(90deg, var(--green-rich), var(--gold))',
    label: 'Zoo Update',
    labelColor: 'var(--green-rich)',
    iconBg: 'var(--green-pale)',
    Icon: Bell,
  },
  alert: {
    gradient: 'linear-gradient(90deg, var(--coral), #ef4444)',
    label: 'Time-Sensitive',
    labelColor: 'var(--coral)',
    iconBg: 'var(--coral-pale)',
    Icon: AlertTriangle,
  },
  event: {
    gradient: 'linear-gradient(90deg, var(--gold), #d97706)',
    label: 'Upcoming Event',
    labelColor: 'var(--gold-dark)',
    iconBg: 'var(--gold-pale)',
    Icon: Calendar,
  },
  social: {
    gradient: 'linear-gradient(90deg, var(--green-rich), #16a34a)',
    label: 'Animal Update',
    labelColor: 'var(--green-rich)',
    iconBg: 'var(--green-pale)',
    Icon: Heart,
  },
  location: {
    gradient: 'linear-gradient(90deg, #3b82f6, #6366f1)',
    label: 'Nearby',
    labelColor: '#3b82f6',
    iconBg: '#eff6ff',
    Icon: MapPin,
  },
  energy: {
    gradient: 'linear-gradient(90deg, var(--gold), var(--coral))',
    label: 'Check-In',
    labelColor: 'var(--gold-dark)',
    iconBg: 'var(--gold-pale)',
    Icon: Zap,
  },
}

interface NotificationToastProps {
  title: string
  message: string
  icon: string
  category?: NotificationCategory
  onDismiss: () => void
  onView: () => void
}

export function NotificationToast({ title, message, icon, category = 'info', onDismiss, onView }: NotificationToastProps) {
  const config = categoryConfig[category]

  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss()
    }, 5000)
    return () => clearTimeout(timer)
  }, [onDismiss])

  return (
    <motion.div
      initial={{ y: -120, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: -120, opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      style={{
        position: 'fixed',
        top: 'calc(env(safe-area-inset-top, 8px) + 8px)',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 32px)',
        maxWidth: 398,
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-xl)',
        zIndex: 200,
        overflow: 'hidden',
        border: '1px solid var(--border-light)',
      }}
    >
      {/* Top accent bar */}
      <div style={{ height: 3, background: config.gradient }} />

      <div style={{ padding: '14px 16px' }}>
        {/* Header Row */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 12,
          marginBottom: 10,
        }}>
          {/* Icon */}
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 'var(--radius-md)',
            background: config.iconBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
            flexShrink: 0,
          }}>
            {icon}
          </div>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 4,
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}>
                <config.Icon size={12} color={config.labelColor} />
                <span style={{ fontSize: 11, fontWeight: 600, color: config.labelColor }}>{config.label}</span>
              </div>
              <button
                onClick={onDismiss}
                style={{
                  padding: 2,
                  color: 'var(--text-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <X size={16} />
              </button>
            </div>
            <h4 style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, lineHeight: 1.3 }}>{title}</h4>
            <p style={{
              fontSize: 13,
              color: 'var(--text-secondary)',
              lineHeight: 1.4,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}>
              {message}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: 8,
          paddingTop: 10,
          borderTop: '1px solid var(--border-light)',
        }}>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onDismiss}
            style={{
              flex: 1,
              padding: '9px 16px',
              borderRadius: 'var(--radius-full)',
              border: '1.5px solid var(--border)',
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--text-secondary)',
              background: 'var(--bg-card)',
            }}
          >
            DISMISS
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onView}
            style={{
              flex: 1,
              padding: '9px 16px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--green-deep)',
              color: 'white',
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            VIEW DETAILS
          </motion.button>
        </div>
      </div>

      {/* Auto-dismiss progress bar */}
      <motion.div
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: 5, ease: 'linear' }}
        style={{
          height: 2,
          background: config.gradient,
          borderRadius: 1,
        }}
      />
    </motion.div>
  )
}

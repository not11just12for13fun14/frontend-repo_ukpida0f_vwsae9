import { motion } from 'framer-motion'
import { cn } from '../utils/cn'

export function Card({ className = '', children, as: Component = 'div', ...props }) {
  return (
    <Component
      className={cn(
        'rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur border border-slate-200/60 dark:border-slate-700/60 shadow-[0_6px_30px_rgba(2,6,23,0.08)]',
        'transition-transform duration-200 will-change-transform',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export const HoverLift = ({ children, amount = 6 }) => (
  <motion.div whileHover={{ y: -Math.min(10, amount), transition: { type: 'spring', stiffness: 300, damping: 20 } }}>
    {children}
  </motion.div>
)

export const FadeIn = ({ children, delay = 0 }) => (
  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay }}>
    {children}
  </motion.div>
)

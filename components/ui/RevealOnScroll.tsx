'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'

/**
 * Обёртка для reveal-on-scroll эффекта. Framer Motion + `whileInView`.
 * Respects `prefers-reduced-motion` — при reduce анимация заменяется на
 * instant fade-in без translate.
 */
type RevealProps = HTMLMotionProps<'div'> & {
  delay?: number
  y?: number
}

export function RevealOnScroll({ delay = 0, y = 24, children, ...props }: RevealProps) {
  const shouldReduce = useReducedMotion()
  const initial = shouldReduce ? { opacity: 0 } : { opacity: 0, y }
  const animate = shouldReduce ? { opacity: 1 } : { opacity: 1, y: 0 }

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: shouldReduce ? 0 : 0.6,
        delay: shouldReduce ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

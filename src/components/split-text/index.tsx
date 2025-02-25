import React from 'react'
import { motion, AnimatePresence } from 'motion/react'

import s from './split-text.module.scss'

type SplitTextProps = {
  children: React.ReactNode
  wrapper?: boolean
  split?: boolean
  delay?: number
  time?: number
  reverse?: boolean
  from?: 'left' | 'right'
}

export const SplitText = ({
  children,
  delay = 0.1,
  time = 1,
  reverse = false,
  from = 'left',
}: SplitTextProps) => {
  if (!children) return null

  const ltr = from === 'left'

  const text = typeof children === 'string' ? children : children.toString()
  const splitWord = text.split(' ')

  const item = {
    hidden: { opacity: 0, x: ltr ? -120 : 120 },
    show: { opacity: 1, x: 0 },
    hide: { opacity: 0, x: ltr ? -120 : 120 },
  }

  let universalCounter = ltr ? 0 : text.length // Universal counter for all letters

  return (
    <AnimatePresence>
      {!reverse && (
        <div className={s.textSplitted} aria-label={text}>
          {splitWord.map((w, i) => (
            <span key={i} className={s.word}>
              {w.split('').map((c, il) => {
                const lDelay = delay + universalCounter * 0.05
                universalCounter += ltr ? 1 : -1

                return (
                  <span key={il} className={s.letter}>
                    <motion.span
                      initial="hidden"
                      animate="show"
                      exit="hide"
                      variants={item}
                      transition={{
                        duration: time,
                        delay: lDelay,
                        ease: 'easeInOut',
                      }}
                    >
                      {c}
                    </motion.span>
                  </span>
                )
              })}
            </span>
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}


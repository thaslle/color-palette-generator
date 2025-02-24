import React from 'react'
import { clsx } from 'clsx'

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
  delay = 0.4,
  time = 0.02,
  reverse = false,
  from = 'left',
}: SplitTextProps) => {
  if (!children) return null

  const fromRight = from === 'right'

  const text = typeof children === 'string' ? children : children.toString()
  const splitWord = text.split(' ')

  let universalCounter = fromRight ? text.length : 0 // Universal counter for all letters

  return (
    <div
      className={clsx(
        s.textSplitted,
        { [s.reverse]: reverse },
        { [s.fromRight]: fromRight },
      )}
      aria-label={text}
    >
      {splitWord.map((w, i) => (
        <span key={i} className={s.word}>
          {w.split('').map((c, il) => {
            const lDelay = delay + universalCounter * time
            universalCounter += fromRight ? -1 : 1

            return (
              <span key={il} className={s.letter}>
                <span style={{ animationDelay: `${lDelay}s` }}>{c}</span>
              </span>
            )
          })}
        </span>
      ))}
    </div>
  )
}

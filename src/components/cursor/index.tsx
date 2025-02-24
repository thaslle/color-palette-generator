import { useEffect, useRef, useState } from 'react'
import { clsx } from 'clsx'
import { gsap } from 'gsap'
import { useStore } from '~/hooks/use-store'

import s from './cursor.module.scss'

export const Cursor = () => {
  const hint = useStore((state) => state.hint)
  const cursorRef = useRef<HTMLDivElement>(null)

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const actionRef = useRef<NodeJS.Timeout | null>(null)

  const [label, setLabel] = useState('')
  const [showActionHint, setShowActionHint] = useState(false)

  useEffect(() => {
    if (!cursorRef.current) return

    const yTo = gsap.quickTo(cursorRef.current, 'y', {
      duration: 0.5,
      ease: 'power3.out',
    })
    const xTo = gsap.quickTo(cursorRef.current, 'x', {
      duration: 0.5,
      ease: 'power3.out',
    })

    // Track mouse position
    const onMouseMove = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY

      yTo(y)
      xTo(x)
    }

    // Handle mouse over and out to check for elements with data-cursor-label
    const onMouseOver = (e: MouseEvent) => {
      if (!(e.target instanceof Element) || !cursorRef.current) return

      // Check if the target element or any of its ancestors has the 'data-cursor-label' attribute
      const targetElement = e.target.closest('[data-label]')
      const targetLabel = targetElement?.getAttribute('data-label')

      if (!targetElement || !targetLabel) return

      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      setLabel(targetLabel)
    }

    const onMouseOut = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)

      timeoutRef.current = setTimeout(() => {
        setLabel('')
      }, 210)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)

    // Manage hint
    if (hint.message && hint.time) {
      if (actionRef.current) clearTimeout(actionRef.current)

      setShowActionHint(true)

      actionRef.current = setTimeout(() => {
        setShowActionHint(false)
        setLabel('')
      }, 2000)
    }

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)

      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (actionRef.current) clearTimeout(actionRef.current)
    }
  }, [hint])

  return (
    <div
      ref={cursorRef}
      className={clsx(s.cursor, { [s.label]: label !== '' })}
    >
      <div className={s.pointer}></div>
      <div
        className={clsx(s.text, { [s.copied]: showActionHint })}
        style={{ width: `${label.length + 2}ch` }}
      >
        <span className={s.labelMain}>{label}</span>
        <span className={s.labelHint}>{hint.message}</span>
      </div>
    </div>
  )
}

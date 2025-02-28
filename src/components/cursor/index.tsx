import { clsx } from 'clsx'
import { RefObject, useEffect, useRef, useState } from 'react'
import { frame, motion, useMotionValue, useSpring } from 'motion/react'

import { useStore } from '~/hooks/use-store'

import s from './cursor.module.scss'

export const Cursor = () => {
  const hint = useStore((state) => state.hint)
  const cursorRef = useRef<HTMLDivElement>(null)

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const actionRef = useRef<NodeJS.Timeout | null>(null)

  const [label, setLabel] = useState('')
  const [showActionHint, setShowActionHint] = useState(false)
  const [hideCursor, setHideCursor] = useState(false)
  const [darkCursor, setDarkCursor] = useState(false)

  const { x, y } = useFollowPointer(cursorRef)

  useEffect(() => {
    if (!cursorRef.current) return

    // Handle mouse over and out to check for elements with data-cursor-label
    const onMouseOver = (e: MouseEvent) => {
      if (!(e.target instanceof Element) || !cursorRef.current) return

      // Check if the target element or any of its ancestors has the 'data-cursor-label' attribute
      const targetElement = e.target.closest('[data-label]')
      const targetLabel = targetElement?.getAttribute('data-label')

      const targetCursorElement = e.target.closest('[data-hide-cursor]')
      const targetCursor = targetCursorElement ? true : false
      setHideCursor(targetCursor)

      const targetDarkCursorElement = e.target.closest('[data-dark-cursor]')
      const targetDarkCursor =
        targetDarkCursorElement?.getAttribute('data-dark-cursor') === 'true'
      setDarkCursor(targetDarkCursor)

      if (!targetLabel) return

      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      setLabel(targetLabel)
    }

    const onMouseOut = () => {
      setHideCursor(false)
      setDarkCursor(false)

      if (timeoutRef.current) clearTimeout(timeoutRef.current)

      timeoutRef.current = setTimeout(() => {
        setLabel('')
      }, 210)
    }

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
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)

      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (actionRef.current) clearTimeout(actionRef.current)
    }
  }, [hint, hideCursor, darkCursor])

  return (
    <motion.div
      ref={cursorRef}
      className={clsx(
        s.cursor,
        { [s.label]: label !== '' },
        { [s.dark]: darkCursor },
      )}
      style={{ x, y }}
    >
      <motion.div
        className={s.pointer}
        style={{ scale: hideCursor ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: 'easeInOut' }}
      ></motion.div>
      <div
        className={clsx(s.text, { [s.copied]: showActionHint })}
        style={{ width: `${label.length + 2}ch` }}
      >
        <span className={s.labelMain}>{label}</span>
        <span className={s.labelHint}>{hint.message}</span>
      </div>
    </motion.div>
  )
}

export const useFollowPointer = (ref: RefObject<HTMLDivElement | null>) => {
  const spring = { damping: 10, stiffness: 50, restDelta: 0.005 }
  const xPoint = useMotionValue(0)
  const yPoint = useMotionValue(0)
  const x = useSpring(xPoint, spring)
  const y = useSpring(yPoint, spring)

  useEffect(() => {
    if (!ref.current) return

    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      const element = ref.current!

      frame.read(() => {
        xPoint.set(clientX - element.offsetLeft - element.offsetWidth / 2)
        yPoint.set(clientY - element.offsetTop - element.offsetHeight / 2)
      })
    }

    window.addEventListener('pointermove', handlePointerMove)

    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  return { x, y }
}


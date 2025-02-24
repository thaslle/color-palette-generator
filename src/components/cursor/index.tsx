import { useEffect, useRef, useState } from 'react'
import { clsx } from 'clsx'
import { gsap } from 'gsap'
import { useStore } from '~/hooks/use-store'

import s from './cursor.module.scss'

export const Cursor = () => {
  const copied = useStore((state) => state.copied)
  const cursorRef = useRef<HTMLDivElement>(null)

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const copiedRef = useRef<NodeJS.Timeout | null>(null)

  const [label, setLabel] = useState('')
  const [showCopied, setShowCopied] = useState(false)

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

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)

      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  useEffect(() => {
    if (copied === null) return

    if (copiedRef.current) clearTimeout(copiedRef.current)

    setShowCopied(true)

    copiedRef.current = setTimeout(() => {
      setShowCopied(false)
    }, 2500)

    return () => {
      if (copiedRef.current) clearTimeout(copiedRef.current)
    }
  }, [copied])

  return (
    <div
      ref={cursorRef}
      className={clsx(s.cursor, { [s.label]: label !== '' })}
    >
      <div className={s.pointer}></div>
      <div
        className={clsx(s.text, { [s.copied]: showCopied })}
        style={{ width: `${label.length + 2}ch` }}
      >
        <span className={s.labelMain}>{label}</span>
        <span className={s.labelCopied}>Copied!</span>
      </div>
    </div>
  )
}

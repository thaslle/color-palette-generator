import { clsx } from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

import s from './response.module.scss'

type ResponseProps = {
  start: number | null
  error: boolean
  searchQuery: string
}

export const Response: React.FC<ResponseProps> = ({
  start,
  error,
  searchQuery,
}) => {
  const [showLoader, setShowLoader] = useState(false)
  const [showError, setShowError] = useState(error)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if ((start || error) && timeoutRef.current) clearTimeout(timeoutRef.current)

    if (start && Date.now() - start <= 500) setShowLoader(true)
    if (error) setShowError(true)

    timeoutRef.current = setTimeout(() => {
      setShowLoader(false)
      setShowError(false)
    }, 3000)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [start, error])

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          className={s.wrap}
          initial="hidden"
          animate="show"
          exit="hide"
          variants={{
            hidden: {
              opacity: 0,
              filter: 'blur(0.5rem)',
            },
            show: {
              opacity: 1,
              filter: 'blur(0)',
            },
            hide: {
              opacity: 0,
              filter: 'blur(0.5rem)',
            },
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className={clsx(s.card, s.loading)}>
            <span className={s.placeholder}>{searchQuery}</span>
            <span className={s.animation}>
              <span>↑</span>
            </span>
          </div>

          <motion.div
            className={clsx(s.card, s.return)}
            animate={{ scale: showError ? 1 : 0 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
          >
            <p>Oops, no palette... but here's a surprise ↑</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


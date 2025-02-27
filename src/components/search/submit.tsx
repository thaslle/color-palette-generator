import { AnimatePresence, motion } from 'motion/react'
import { useStore } from '~/hooks/use-store'

import s from './search.module.scss'

export const Submit = () => {
  const { show, x } = useStore((state) => state.caret)

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="submit"
          className={s.submit}
          aria-label="Search palette"
          initial="hidden"
          animate="show"
          exit="hide"
          variants={{
            hidden: {
              opacity: 0,
              scale: 0,
              y: '100%',
              filter: 'blur(0.25rem)',
            },
            show: {
              opacity: 1,
              scale: 1,
              x: x,
              y: 0,
              filter: 'blur(0)',
            },
            hide: {
              opacity: 0,
              scale: 0,
              y: '100%',
              filter: 'blur(0.25rem)',
            },
          }}
          transition={{ duration: 0.05, ease: 'easeInOut' }}
        >
          <span>↑</span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}


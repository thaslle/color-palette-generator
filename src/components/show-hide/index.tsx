import { clsx } from 'clsx'
import { motion, AnimatePresence } from 'motion/react'
import { SplitText } from '../split-text'
import { useStore } from '~/hooks/use-store'

import s from './show-hide.module.scss'

export const ShowHide = () => {
  const { showControls, setShowControls } = useStore()

  return (
    <div className={s.showhide}>
      <button
        className={clsx(s.button, { [s.hidden]: !showControls })}
        onClick={() => setShowControls()}
      >
        <div className={s.hide}>
          <SplitText from={'right'} reverse={!showControls}>
            → Hide controls
          </SplitText>
        </div>
        <AnimatePresence>
          <div className={s.show}>
            {!showControls && (
              <motion.span
                initial="hidden"
                animate="show"
                exit="hide"
                variants={{
                  hidden: { opacity: 0, x: 120 },
                  show: { opacity: 1, x: 0 },
                  hide: { opacity: 0, x: 120 },
                }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                ←
              </motion.span>
            )}
          </div>
        </AnimatePresence>
      </button>
    </div>
  )
}


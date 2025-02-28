import { clsx } from 'clsx'
import { motion, AnimatePresence } from 'motion/react'
import { SplitText } from '../split-text'

import { useStore } from '~/hooks/use-store'
import { useIsMobile } from '~/hooks/use-mobile'

import s from './show-hide.module.scss'

export const ShowHide = () => {
  const showControls = useStore((state) => state.showControls)
  const isMobile = useIsMobile()

  const setShowControls = useStore((state) => state.setShowControls)
  const colors = useStore((state) => state.palette.colors)
  const isDark = colors[4].isDark

  return (
    <motion.div
      className={clsx(s.showhide, { [s.dark]: isDark })}
      animate={{
        y: isMobile && !showControls ? '4.5rem' : 0,
        transition: { duration: 0.5, ease: 'easeInOut' },
      }}
    >
      <button
        className={clsx(s.button, { [s.hidden]: !showControls })}
        onClick={() => setShowControls()}
      >
        {!isMobile && (
          <div className={s.hide}>
            <SplitText from={'right'} reverse={!showControls}>
              → Hide controls
            </SplitText>
          </div>
        )}

        <AnimatePresence>
          <div className={s.show}>
            {isMobile && (
              <>
                {showControls && (
                  <motion.span
                    initial="hidden"
                    animate="show"
                    exit="hide"
                    variants={{
                      hidden: { opacity: 0, x: 100, y: 100 },
                      show: { opacity: 1, x: 0, y: 0 },
                      hide: { opacity: 0, x: 100, y: 100 },
                    }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                  >
                    ↘
                  </motion.span>
                )}

                {!showControls && (
                  <motion.span
                    initial="hidden"
                    animate="show"
                    exit="hide"
                    variants={{
                      hidden: { opacity: 0, x: 100, y: 100 },
                      show: { opacity: 1, x: 0, y: 0 },
                      hide: { opacity: 0, x: 100, y: 100 },
                    }}
                    transition={{
                      duration: 1,
                      delay: 0.5,
                      ease: 'easeInOut',
                    }}
                  >
                    ↖
                  </motion.span>
                )}
              </>
            )}

            {!showControls && !isMobile && (
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
    </motion.div>
  )
}


import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useStore } from '~/hooks/use-store'
import { useDisableInput } from '~/hooks/use-disable-input'
import { useDebounce } from '~/hooks/use-debounce'

import s from './slider.module.scss'

export const Slider = () => {
  const maxBlur = 250

  const { disabled } = useDisableInput()
  useDebounce
  const [isActive, setIsActive] = useState(false)

  const splashScreen = useStore((state) => state.splashScreen)
  const blur = useStore((state) => state.blur)
  const setBlur = useStore((state) => state.setBlur)
  const [progress, setProgress] = useState(blur / maxBlur)

  const debouncedBlur = useDebounce(blur, 5) // Adjust the delay as needed

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = Number(e.target.value)
    setBlur(value)
    setProgress(value / maxBlur)
  }

  useEffect(() => {
    setBlur(debouncedBlur)
  }, [debouncedBlur, setBlur])

  return (
    <div className={s.wrapper}>
      <div className={s.group}>
        <AnimatePresence>
          {!disabled && !splashScreen && (
            <motion.div
              className={s.slider}
              data-hide-cursor={true}
              initial="hidden"
              animate="show"
              exit="hide"
              variants={{
                hidden: {
                  opacity: 0,
                  y: '5%',
                },
                show: {
                  opacity: 1,
                  y: 0,
                },
                hide: {
                  opacity: 0,
                  y: '5%',
                },
              }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
            >
              <motion.div
                className={s.customSlider}
                animate={isActive ? 'active' : 'inactive'}
                variants={{
                  active: {
                    opacity: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    clipPath: 'inset(0 0 round 0.3rem)',
                    transition: { duration: 0.25, ease: 'easeInOut' },
                  },
                  inactive: {
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    clipPath: 'inset(0.6rem 0 round 0.1rem)',
                    opacity: 0.8,
                    transition: { duration: 0.25, ease: 'easeInOut' },
                  },
                }}
              >
                <span
                  className={s.thumb}
                  style={{ width: `${Math.max(progress, 0.01) * 100}%` }}
                />
              </motion.div>
              <input
                className={s.input}
                type="range"
                value={blur}
                min={0}
                max={maxBlur}
                onChange={handleChange}
                onMouseDown={() => setIsActive(true)}
                onMouseUp={() => setIsActive(false)}
                onMouseEnter={() => setIsActive(true)}
                onMouseLeave={() => setIsActive(false)}
                onBlur={() => setIsActive(false)}
                onTouchStart={() => setIsActive(true)}
                onTouchEnd={() => setIsActive(false)}
                disabled={disabled}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}


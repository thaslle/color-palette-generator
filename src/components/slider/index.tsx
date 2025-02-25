import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useStore } from '~/hooks/use-store'
import { useDisableInput } from '~/hooks/use-disable-input'

import s from './slider.module.scss'

export const Slider = () => {
  const maxBlur = 250

  const { disabled } = useDisableInput()

  const splashScreen = useStore((state) => state.splashScreen)
  const blur = useStore((state) => state.blur)
  const setBlur = useStore((state) => state.setBlur)
  const [progress, setProgress] = useState(blur / maxBlur)

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = Number(e.target.value)
    setBlur(value)
    setProgress(value / maxBlur)
  }

  return (
    <div className={s.wrapper}>
      <div className={s.group}>
        <AnimatePresence>
          {!disabled && !splashScreen && (
            <motion.div
              className={s.slider}
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
              <div className={s.customSlider}>
                <span
                  className={s.thumb}
                  style={{ width: `${Math.max(progress, 0.01) * 100}%` }}
                ></span>
              </div>
              <input
                className={s.input}
                type="range"
                value={blur}
                min={0}
                max={maxBlur}
                onChange={handleChange}
                disabled={disabled}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

import { motion } from 'motion/react'
import { ColorProps } from '~/utils/types'

import s from './background.module.scss'

export const Background = ({ props }: { props: ColorProps }) => {
  const item = {
    hidden: { clipPath: 'inset(100% 0 0 0)', filter: 'blur(1rem)' },
    show: { clipPath: 'inset(0 0 0 0)', filter: 'blur(1rem)' },
    hide: { clipPath: 'inset(0 0 100% 0)', filter: 'blur(1rem)' },
  }

  const transition = {
    duration: 0.5,
    delay: 0.3 + props.index * 0.1,
    ease: 'easeInOut',
  }
  return (
    <div className={s.background}>
      <motion.div
        key={`${props.hex}${props.index}${props.name}`}
        className={s.main}
        style={{ backgroundColor: props.code }}
        initial="hidden"
        animate="show"
        exit="hide"
        variants={item}
        transition={transition}
      />
    </div>
  )
}


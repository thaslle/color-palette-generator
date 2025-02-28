import { motion } from 'motion/react'
import { useStore } from '~/hooks/use-store'
import { ColorProps } from '~/utils/types'

import s from './background.module.scss'

export const Background = ({ props }: { props: ColorProps }) => {
  const splashScreen = useStore((state) => state.splashScreen)
  const loading = useStore((state) => state.loading)

  const item = {
    hidden: {
      opacity: 0,
      y: splashScreen ? '100%' : 0,
      filter: 'blur(10rem)',
    },
    show: { opacity: 1, y: 0, filter: 'blur(0)' },
    hide: {
      opacity: 0,
      y: splashScreen ? '100%' : 0,
      filter: `blur(${splashScreen ? 10 : 0}rem)`,
    },
  }

  const transition = {
    duration: 0.5,
    delay: loading.state ? 0 : 0.3 + (props.index ?? 0) * 0.1,
    ease: 'easeInOut',
  }
  return (
    <div className={s.background}>
      <motion.div
        key={`${props.code}${props.index}${props.name}`}
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


import { motion } from 'motion/react'

import s from './submit.module.scss'

export const Submit = () => {
  return (
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
          filter: 'blur(0.25rem)',
        },
        show: {
          opacity: 1,
          scale: 1,
          filter: 'blur(0)',
        },
        hide: {
          opacity: 0,
          scale: 0,
          filter: 'blur(0.25rem)',
        },
      }}
      transition={{ duration: 0.05, ease: 'easeInOut' }}
    >
      <span>↑</span>
    </motion.button>
  )
}


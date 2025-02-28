import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Submit } from './submit'

import s from './custom-input.module.scss'

type CustomInputProps = {
  disabled: boolean
  searchQuery: string
  placeholder: string
  canSubmit: boolean
}

export const CustomInput: React.FC<CustomInputProps> = ({
  disabled,
  searchQuery,
  placeholder,
  canSubmit,
}) => {
  const [showPlaceholder, setShowPlaceholder] = useState(false)

  useEffect(() => {
    setShowPlaceholder(searchQuery.length === 0)
  }, [searchQuery])

  return (
    <div className={s.customInput}>
      {showPlaceholder && (
        <motion.div
          animate={{
            opacity: disabled ? 0.3 : 0.8,
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className={s.placeholder}
        >
          {placeholder}
        </motion.div>
      )}
      <div className={s.value}>{searchQuery}</div>
      {canSubmit && <Submit />}
    </div>
  )
}

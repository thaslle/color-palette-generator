import { clsx } from 'clsx'
import React from 'react'
import { IconMonochromatic } from './icons'
import { useStore } from '~/hooks/use-store'

import s from './search.module.scss'

type MonochromaticProps = {
  isMonochromatic: boolean
  setIsMonochromatic: React.Dispatch<React.SetStateAction<boolean>>
}

export const Monochromatic: React.FC<MonochromaticProps> = ({
  isMonochromatic,
  setIsMonochromatic,
}) => {
  const setHint = useStore((state) => state.setHint)

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsMonochromatic(e.target.checked)
    setHint(
      e.target.checked
        ? 'Changed to monochromatic!'
        : 'Changed to colored pallete!',
    )
  }

  return (
    <label
      className={clsx(s.monochromatic, { [s.checked]: isMonochromatic })}
      data-label={
        isMonochromatic
          ? 'Change to colored pallete'
          : 'Change to monochromatic'
      }
    >
      <input
        type="checkbox"
        name="monochromatic"
        className={s.checkbox}
        checked={isMonochromatic}
        onChange={handleCheckboxChange}
      />
      <IconMonochromatic />
    </label>
  )
}

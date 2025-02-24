import { clsx } from 'clsx'
import React, { useState } from 'react'
import { IconMonochromatic } from './icons'
import s from './search.module.scss'

export const Monochromatic = () => {
  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked)
  }

  return (
    <label
      className={clsx(s.monochromatic, { [s.checked]: isChecked })}
      data-label={
        isChecked ? 'Change to colored pallete' : 'Change to monochromatic'
      }
    >
      <input
        type="checkbox"
        name="monochromatic"
        className={s.checkbox}
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <IconMonochromatic />
    </label>
  )
}

import { clsx } from 'clsx'
import { PaletteList } from './palette-list'
import { ColorCanvas } from '~/components/color-canvas'

import s from './palette.module.scss'

export const Palette = () => (
  <div className={s.grid}>
    <div className={clsx(s.palette, s.stack, s.names)}>
      <PaletteList />
    </div>

    <div className={clsx(s.stack, s.colors)}>
      <ColorCanvas />
    </div>
  </div>
)


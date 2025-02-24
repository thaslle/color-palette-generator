import { Palette } from '~/components/palette'
import { Controls } from '~/components/controls'

import s from './grid.module.scss'

export const Grid = () => {
  return (
    <section className={s.grid}>
      <main className={s.main}>
        <Palette />
      </main>
      <nav className={s.nav}>
        <Controls />
      </nav>
    </section>
  )
}

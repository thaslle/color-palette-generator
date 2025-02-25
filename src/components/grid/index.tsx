import { Palette } from '~/components/palette'
import { Controls } from '~/components/controls'
import { Slider } from '~/components/slider'

import s from './grid.module.scss'

export const Grid = () => {
  return (
    <section className={s.grid}>
      <aside className={s.slider}>
        <Slider />
      </aside>
      <main className={s.main}>
        <Palette />
      </main>
      <nav className={s.nav}>
        <Controls />
      </nav>
    </section>
  )
}


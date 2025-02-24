import { clsx } from 'clsx'
import { Search } from '~/components/search'
import { Title } from '~/components/title'
import { ShowHide } from '~/components/show-hide'
import { useStore } from '~/hooks/use-store'

import s from './controls.module.scss'

export const Controls = () => {
  const { firstColumnLight, lastColumnLight } = useStore()

  return (
    <div
      className={clsx(
        s.controls,
        { [s.firstColumnLight]: firstColumnLight },
        { [s.lastColumnLight]: lastColumnLight },
      )}
    >
      <Title />
      <Search />
      <ShowHide />
    </div>
  )
}

import { Search } from '~/components/search'
import { Title } from '~/components/title'
import { ShowHide } from '~/components/show-hide'

import s from './controls.module.scss'

export const Controls = () => (
  <div className={s.controls}>
    <Title />
    <Search />
    <ShowHide />
  </div>
)


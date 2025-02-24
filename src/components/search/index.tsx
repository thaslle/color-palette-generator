import { clsx } from 'clsx'
import { Monochromatic } from './monochromatic'
import { SearchBar } from './search-bar'
import { Submit } from './submit'
import { useStore } from '~/hooks/use-store'

import s from './search.module.scss'

export const Search = () => {
  const { showControls } = useStore()

  return (
    <div className={clsx(s.search, { [s.hidden]: !showControls })}>
      <form className={s.form}>
        <SearchBar />
        <Monochromatic />
        <Submit />
      </form>
    </div>
  )
}

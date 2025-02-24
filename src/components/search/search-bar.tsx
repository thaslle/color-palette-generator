import { IconSearch } from './icons'

import s from './search.module.scss'

export const SearchBar = () => (
  <label className={s.searchBar}>
    <span className={s.searchIcon}>
      <IconSearch />
    </span>
    <input
      type="search"
      name="color"
      className={s.searchInput}
      placeholder="What’s the mood today?"
      required
      spellCheck="false"
      autoComplete="false"
    />
  </label>
)

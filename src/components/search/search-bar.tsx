import { IconSearch } from './icons'

import s from './search.module.scss'

type SearchBarProps = {
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
}) => (
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
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </label>
)

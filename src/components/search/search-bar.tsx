import { useDisableInput } from '~/hooks/use-disable-input'
import { IconSearch } from './icons'

import s from './search-bar.module.scss'

type SearchBarProps = {
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
  placeholder: string
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  placeholder,
}) => {
  const { disabled } = useDisableInput()
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <label className={s.searchBar}>
      <span className={s.searchIcon}>
        <IconSearch />
      </span>
      <input
        type="search"
        name="color"
        className={s.searchInput}
        placeholder={placeholder}
        required
        spellCheck="false"
        autoComplete="off"
        value={searchQuery}
        disabled={disabled}
        maxLength={40}
        onChange={(e) => handleInput(e)}
      />
    </label>
  )
}


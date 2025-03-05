import { useEffect, useState } from 'react'
import { useDisableInput } from '~/hooks/use-disable-input'
import { History } from './history'
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
  const [showHistory, setShowHistory] = useState(false)
  const [keyDown, setKeyDown] = useState<React.KeyboardEvent | null>(null)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    setKeyDown(e)
  }

  useEffect(() => {
    if (disabled) setShowHistory(false)
  }, [disabled])

  return (
    <>
      <label className={s.searchBar}>
        <span className={s.searchIcon}>
          <IconSearch />
        </span>
        <input
          type="search"
          name="color"
          className={s.searchInput}
          placeholder={placeholder}
          // required
          spellCheck="false"
          autoComplete="off"
          value={searchQuery}
          disabled={disabled}
          maxLength={40}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowHistory(true)}
          onBlur={() => setShowHistory(false)}
        />
      </label>

      <History searchQuery={searchQuery} keyDown={keyDown} show={showHistory} />
    </>
  )
}


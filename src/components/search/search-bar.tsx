import { useRef } from 'react'
import { useDisableInput } from '~/hooks/use-disable-input'
import { IconSearch } from './icons'
import { useStore } from '~/hooks/use-store'

import s from './search.module.scss'

type SearchBarProps = {
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  const { disabled } = useDisableInput()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const setCaret = useStore((state) => state.setCaret)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)

    if (!inputRef.current) return

    const caretIndex = inputRef.current.selectionStart ?? 0 // Caret position in characters

    // Calculate caret position in pixels
    const inputElement = inputRef.current

    // Get the position of the input field relative to the viewport
    const rect = inputElement.getBoundingClientRect()

    // Get the width of the input field's text area
    const font = window.getComputedStyle(inputElement)
    const fontSize = parseInt(font.fontSize, 10) * 0.5
    const paddingLeft = parseInt(font.paddingLeft, 10) + 10
    const paddingRight = parseInt(font.paddingRight, 10) - 10

    // Calculate the position of the caret in pixels by taking into account the width of the text
    const caretX = Math.min(
      paddingLeft + caretIndex * fontSize,
      rect.right - rect.left - paddingRight,
    )

    setCaret({
      show: searchQuery.length > 1 && caretX > paddingLeft,
      x: caretX,
    })

    // Log the X position (in pixels) of the caret
    //console.log('Caret Position X (in pixels):', caretX + rect.left)
  }

  return (
    <label className={s.searchBar}>
      <span className={s.searchIcon}>
        <IconSearch />
      </span>
      <input
        type="search"
        name="color"
        ref={inputRef}
        className={s.searchInput}
        placeholder="What’s the mood today?"
        required
        spellCheck="false"
        autoComplete="false"
        value={searchQuery}
        disabled={disabled}
        maxLength={40}
        onChange={(e) => handleInput(e)}
      />
    </label>
  )
}


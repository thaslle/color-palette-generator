import { useEffect, useState } from 'react'
import { FormatPaletteProps } from '~/utils/types'
import { useStore } from '~/hooks/use-store'
import { delayExecution } from '~/utils/color'

import s from './history.module.scss'

type HistoryProps = {
  searchQuery: string
}

export const History: React.FC<HistoryProps> = ({ searchQuery }) => {
  const setResponse = useStore((state) => state.setResponse)
  const setSplashScreen = useStore((state) => state.setSplashScreen)
  const setLoading = useStore((state) => state.setLoading)

  const [paletteList, setPaletteList] = useState<FormatPaletteProps[]>([])
  const [filteredHistory, setFilteredHistory] = useState<FormatPaletteProps[]>(
    [],
  )
  const [selectedIndex, setSelectedIndex] = useState(-1)

  // Load data from localStorage once when the component mounts
  useEffect(() => {
    const storedData = localStorage.getItem('palette')
    if (storedData) {
      setPaletteList(JSON.parse(storedData))
    }
  }, []) // Empty dependency array, runs only once when the component mounts

  // Filter suggestions based on input value
  useEffect(() => {
    if (searchQuery) {
      const filtered = paletteList.filter((item: FormatPaletteProps) =>
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredHistory(filtered)
    } else {
      setFilteredHistory(paletteList)
    }
  }, [searchQuery, paletteList]) // Runs when searchQuery or paletteList changes

  //Click
  const handleSelect = async (response: FormatPaletteProps) => {
    setLoading(true)

    // Waits a little to strike the animation
    await delayExecution(1000)
    setResponse(response)
    setSplashScreen(false)
    setLoading(false)
  }

  return (
    filteredHistory.length > 0 && (
      <div className={s.history}>
        <ul>
          {filteredHistory.map((palette: FormatPaletteProps, index) => (
            <li key={index}>
              <button
                className={s.item}
                onMouseDown={() => handleSelect(palette)}
              >
                {palette.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  )
}

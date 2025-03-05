import { clsx } from 'clsx'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { IconHistory } from './icons'

import { FormatPaletteProps } from '~/utils/types'
import { useStore } from '~/hooks/use-store'
import { delayExecution } from '~/utils/color'

import s from './history.module.scss'

type HistoryProps = {
  searchQuery: string
  keyDown: React.KeyboardEvent | null
  show: boolean
}

export const History: React.FC<HistoryProps> = ({
  searchQuery,
  keyDown,
  show,
}) => {
  const response = useStore((state) => state.response)
  const loading = useStore((state) => state.loading)
  const setResponse = useStore((state) => state.setResponse)
  const setSplashScreen = useStore((state) => state.setSplashScreen)
  const setLoading = useStore((state) => state.setLoading)

  const [paletteList, setPaletteList] = useState<FormatPaletteProps[]>([])
  const [filteredHistory, setFilteredHistory] = useState<FormatPaletteProps[]>(
    [],
  )
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [showHistory, setShowHistory] = useState(show)

  // Load data from localStorage once when the component mounts
  useEffect(() => {
    const storedData = localStorage.getItem('palette')
    if (!storedData) return

    const data = JSON.parse(storedData)

    // Reverse the array to show the most recently added item first
    const reversedData = [...data].reverse()

    setPaletteList(reversedData)
  }, [response])

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
  }, [searchQuery, paletteList])

  // Handle key navigation and closing with Escape
  useEffect(() => {
    if (!keyDown?.key) return

    if (keyDown.key === 'ArrowDown') {
      setSelectedIndex((prevIndex) =>
        Math.min(prevIndex + 1, filteredHistory.length - 1),
      )
    } else if (keyDown.key === 'ArrowUp') {
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0))
    } else if (keyDown.key === 'Enter' && selectedIndex >= 0) {
      // Select the item and update the input value
      handleSelect(filteredHistory[selectedIndex])
      setSelectedIndex(-1) // Reset the selection after choosing an option
    } else if (keyDown.key === 'Escape') {
      setShowHistory(false)
      setSelectedIndex(-1) // Close the suggestions when Escape is pressed
    }
  }, [keyDown])

  // Show history
  useEffect(() => {
    setShowHistory(show)
  }, [show])

  useEffect(() => {
    setShowHistory(false)
  }, [loading])

  //Click
  const handleSelect = async (response: FormatPaletteProps) => {
    setShowHistory(false)
    setLoading(true)

    // Waits a little to strike the animation
    await delayExecution(1000)
    setResponse(response)
    setSplashScreen(false)
    setLoading(false)
  }

  return (
    <AnimatePresence>
      {filteredHistory.length > 0 && showHistory && (
        <motion.div
          className={s.history}
          initial="hidden"
          animate="show"
          exit="hide"
          variants={{
            hidden: {
              opacity: 0,
              y: '5%',
              scale: 0.98,
              filter: 'blur(0.25rem)',
            },
            show: {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: 'blur(0)',
            },
            hide: {
              opacity: 0,
              y: '5%',
              scale: 0.98,
              filter: 'blur(0.25rem)',
            },
          }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          <ul>
            {filteredHistory.map((palette: FormatPaletteProps, index) => (
              <li key={index}>
                <button
                  className={clsx(s.item, {
                    [s.selected]: selectedIndex === index,
                  })}
                  onMouseDown={() => handleSelect(palette)}
                >
                  <IconHistory />
                  <span className={s.name}>{palette.name}</span>
                  <span className={s.icon}>↗</span>
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

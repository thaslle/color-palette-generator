import { clsx } from 'clsx'
import { AnimatePresence } from 'motion/react'
import { useEffect, useState } from 'react'
import { Color } from '~/components/color'
import { Background } from '~/components/background'
import { Blur } from '~/components/blur'
import { useStore } from '~/hooks/use-store'
import {
  getHexCode,
  hexToRGB,
  isDarkColor,
  randomHexColor,
} from '~/utils/color'

import s from './palette.module.scss'

export const Palette = () => {
  const response = useStore((state) => state.response)
  //const loading = useStore((state) => state.loading)

  const [paletteChange, setPaletteChange] = useState(false)
  const [paletteList, setPaletteList] = useState([
    { code: randomHexColor() },
    { code: randomHexColor() },
    { code: randomHexColor() },
    { code: randomHexColor() },
    { code: randomHexColor() },
  ])

  // Processing palette
  const processedPalette = paletteList.map((color, index) => {
    const hex = getHexCode(color.code)
    const rgb = hexToRGB(hex)
    const isDark = isDarkColor(rgb)

    return { ...color, hex, rgb, isDark, index: index }
  })

  // Update paletteList when response changes
  useEffect(() => {
    if (!response) return

    setPaletteList(response) // Update paletteList with response value
    setPaletteChange(true)

    const paletteTimeout = setTimeout(() => {
      setPaletteChange(false)
    }, 500)

    return () => {
      clearTimeout(paletteTimeout)
    }
  }, [response])

  // Update the UI with values from colors
  const setFirstColumnLight = useStore((state) => state.setFirstColumnLight)
  const setLastColumnLight = useStore((state) => state.setLastColumnLight)

  useEffect(() => {
    const firstColor = processedPalette[0]
    const lastColor = processedPalette[processedPalette.length - 1]

    if (firstColor.isDark) setFirstColumnLight(true)
    if (lastColor.isDark) setLastColumnLight(true)
  }, [processedPalette, setFirstColumnLight, setLastColumnLight])

  return (
    <div className={s.grid}>
      <div className={clsx(s.palette, s.stack, s.names)}>
        {processedPalette.map((color, i) => {
          return <Color props={color} key={i} />
        })}
      </div>

      <div className={clsx(s.stack, s.colors)}>
        <Blur>
          <div className={s.palette}>
            <AnimatePresence>
              {!paletteChange &&
                processedPalette.map((color, i) => {
                  return (
                    <Background
                      props={color}
                      key={`${i}${color.hex}${color.index}`}
                    />
                  )
                })}
            </AnimatePresence>
          </div>
        </Blur>
      </div>
    </div>
  )
}


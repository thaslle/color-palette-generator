import { useEffect } from 'react'
import { Color } from '../color'
import { useStore } from '~/hooks/use-store'
import { RGB } from '~/utils/types'

import s from './palette.module.scss'

export const Palette = () => {
  const paletteList = [
    { name: 'Electric Blue', code: '#dbd834' },
    { name: 'Deep Plum', code: '#e7ff97' },
    { name: 'Bright Coral', code: '#e84855' },
    { name: 'Light Cream', code: '#ff5700' },
    { name: 'Vibrant Orange', code: '#2b3a67' },
  ]

  const getHexCode = (colorCode: string): string => {
    return colorCode.replace('#', '')
  }

  const hexToRGB = (hex: string): RGB => {
    const r = parseInt(hex.slice(0, 2), 16)
    const g = parseInt(hex.slice(2, 4), 16)
    const b = parseInt(hex.slice(4, 6), 16)

    return { r: r, g: g, b: b }
  }

  const isDarkColor = (color: RGB): boolean => {
    const luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b
    return luminance < 128
  }

  // Processing palette
  const processedPalette = paletteList.map((color) => {
    const hex = getHexCode(color.code)
    const rgb = hexToRGB(hex)
    const isDark = isDarkColor(rgb)

    return { ...color, hex, rgb, isDark }
  })

  const setFirstColumnLight = useStore((state) => state.setFirstColumnLight)
  const setLastColumnLight = useStore((state) => state.setLastColumnLight)

  useEffect(() => {
    const firstColor = processedPalette[0]
    const lastColor = processedPalette[processedPalette.length - 1]

    if (firstColor.isDark) setFirstColumnLight(true)
    if (lastColor.isDark) setLastColumnLight(true)
  }, [processedPalette, setFirstColumnLight, setLastColumnLight])

  return (
    <div className={s.palette}>
      {processedPalette.map((color, i) => {
        return <Color props={color} key={i} />
      })}
    </div>
  )
}

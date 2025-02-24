import { useEffect } from 'react'
import { Color } from '../color'
import { useStore } from '~/hooks/use-store'
import {
  getHexCode,
  hexToRGB,
  isDarkColor,
  randomHexColor,
} from '~/utils/color'

import s from './palette.module.scss'

export const Palette = () => {
  // const paletteList = [
  //   { name: 'Electric Blue', code: '#dbd834' },
  //   { name: 'Deep Plum', code: '#e7ff97' },
  //   { name: 'Bright Coral', code: '#e84855' },
  //   { name: 'Light Cream', code: '#ff5700' },
  //   { name: 'Vibrant Orange', code: '#2b3a67' },
  // ]

  const paletteList = [
    { code: randomHexColor() },
    { code: randomHexColor() },
    { code: randomHexColor() },
    { code: randomHexColor() },
    { code: randomHexColor() },
  ]

  // const { response, loading } = useStore();

  // return (
  //   <div>
  //     {loading && <p>Loading...</p>}
  //     {!loading && response && <p>Response: {response}</p>}
  //   </div>
  // );

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

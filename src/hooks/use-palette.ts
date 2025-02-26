/*import { useEffect, useState, useCallback } from 'react'
import { useStore } from '~/hooks/use-store'
import {
  formatPalette,
} from '~/utils/color'

import { ColorProps } from '~/utils/types'

export const usePalette = () => {
  const response = useStore((state) => state.response)
  const palette = useStore((state) => state.palette)

  const [finalPalette, setFinalPalette] = useSta

  // Update paletteList when response changes (only if the response is different)
  useEffect(() => {
    if (!response) return
    const formattedResponse = formatPalette(response)

    
  }, [response])

  // Format and process the current palette list
  // const processedPalette = formatPalette(paletteList)

  console.log('aqui')

  // // Handle UI state updates for dark/light columns
  // const setFirstColumnLight = useStore((state) => state.setFirstColumnLight)
  // const setLastColumnLight = useStore((state) => state.setLastColumnLight)

  // // A function that checks the first and last colors and updates the UI state
  // const checkFirstAndLastColor = useCallback(() => {
  //   if (!processedPalette.length) return

  //   const firstColor = processedPalette[0]
  //   const lastColor = processedPalette[processedPalette.length - 1]

  //   // Update the first and last columns based on the color darkness
  //   if (firstColor.isDark) setFirstColumnLight(true)
  //   else setFirstColumnLight(false)

  //   if (lastColor.isDark) setLastColumnLight(true)
  //   else setLastColumnLight(false)
  // }, [processedPalette, setFirstColumnLight, setLastColumnLight])

  // // Perform the check whenever the processed palette changes
  // useEffect(() => {
  //   checkFirstAndLastColor()
  // }, [processedPalette, checkFirstAndLastColor])

  return processedPalette
}*/

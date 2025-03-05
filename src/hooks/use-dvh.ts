import { useEffect, useState } from 'react'

export const useDvh = (height: number) => {
  const [rootFontSize, setRootFontSize] = useState(16) // Default root font-size (in pixels)
  const [viewportHeight, setViewportHeight] = useState(0)

  // Get the root font size dynamically (e.g., for responsive layouts)
  // useEffect(() => {
  //   const fontSize = parseFloat(
  //     getComputedStyle(document.documentElement).fontSize,
  //   )
  //   setRootFontSize(fontSize)

  //   // Update viewport height on resize or visualViewport change
  //   const updateViewportHeight = () => {
  //     if (window.visualViewport) {
  //       setViewportHeight(window.visualViewport.height)
  //     } else {
  //       setViewportHeight(window.innerHeight)
  //     }
  //   }

  //   // Initial update
  //   updateViewportHeight()

  //   // Listen to resize events (and visualViewport changes for Safari on iOS)
  //   window.addEventListener('resize', updateViewportHeight)
  //   if (window.visualViewport) {
  //     window.visualViewport.addEventListener('resize', updateViewportHeight)
  //   }

  //   // Clean up event listener
  //   return () => {
  //     window.removeEventListener('resize', updateViewportHeight)
  //     if (window.visualViewport) {
  //       window.visualViewport.removeEventListener(
  //         'resize',
  //         updateViewportHeight,
  //       )
  //     }
  //   }
  // }, [])

  useEffect(() => {
    const fontSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize,
    )
    setRootFontSize(fontSize)

    // Update viewport height on resize or visualViewport change

    const viewportHeight = window.visualViewport
      ? window.visualViewport.height
      : window.innerHeight

    setViewportHeight(viewportHeight)
  }, [])

  // Convert `height` (in rem) to pixels
  const heightInPixels = height * rootFontSize

  // Calculate the percentage based on the viewport height
  const heightPercentage = viewportHeight ? heightInPixels / viewportHeight : 0

  return heightPercentage
}


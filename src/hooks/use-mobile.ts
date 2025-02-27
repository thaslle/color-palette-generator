import { useState, useEffect } from 'react'

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 767)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 767)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return isMobile
}

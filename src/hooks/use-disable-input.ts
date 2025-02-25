import { useState, useEffect } from 'react'
import { useStore } from '~/hooks/use-store'

export const useDisableInput = () => {
  const loading = useStore((state) => state.loading)
  const splashScreen = useStore((state) => state.splashScreen)
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    if (splashScreen) return

    if (loading) {
      setDisabled(true)
      return
    }

    const timeout = setTimeout(() => {
      setDisabled(false)
    }, 1500)

    return () => {
      clearTimeout(timeout)
    }
  }, [loading, splashScreen])

  return { disabled }
}

import { create } from 'zustand'
import { formatPalette, randomHexColor } from '~/utils/color'
import { PaletteProps } from '~/utils/types'

type Hint = {
  time: number | null
  message: string | null
}

type Loading = {
  time: number
  state: boolean
}

type Store = {
  // UI
  showControls: boolean
  firstColumnLight: boolean
  lastColumnLight: boolean
  hint: Hint
  motionBlur: number
  blur: number
  setShowControls: () => void
  setFirstColumnLight: (isLight: boolean) => void
  setLastColumnLight: (isLight: boolean) => void
  setHint: (message: string) => void
  setBlur: (blur: number) => void

  // API
  response: string | any
  splashScreen: boolean
  loading: Loading
  palette: PaletteProps
  setResponse: (response: string | any) => void
  setSplashScreen: (splashScreen: boolean) => void
  setLoading: (loading: boolean) => void
}

export const useStore = create<Store>((set) => ({
  // UI
  showControls: true,
  firstColumnLight: false,
  lastColumnLight: false,
  hint: { time: null, message: null },
  motionBlur: 250,
  blur: 0,
  submit: false,
  setShowControls: () =>
    set((state) => ({ showControls: !state.showControls })),
  setFirstColumnLight: (isLight) => set(() => ({ firstColumnLight: isLight })),
  setLastColumnLight: (isLight) => set(() => ({ lastColumnLight: isLight })),
  setHint: (message) =>
    set(() => ({ hint: { time: Date.now(), message: message } })),
  setBlur: (blur) => set({ blur }),

  // API
  response: '',
  splashScreen: true,
  loading: { time: Date.now(), state: false },

  // Create a new palette
  palette: formatPalette({
    date: Date.now(),
    colors: Array.from({ length: 5 }, (_, index) => {
      const randColor = randomHexColor()
      return { code: randColor, index }
    }),
  }),

  //setResponse: (response) => set({ response }),
  setResponse: (response) => {
    set(() => {
      const palette = formatPalette(response)
      return {
        response: response,
        palette: palette,
      }
    })
  },
  setSplashScreen: (splashScreen) => set({ splashScreen }),
  setLoading: (loading) =>
    set({ loading: { time: Date.now(), state: loading } }),
}))


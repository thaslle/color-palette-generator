import { create } from 'zustand'

type Hint = {
  time: number | null
  message: string | null
}

type Store = {
  // UI
  showControls: boolean
  firstColumnLight: boolean
  lastColumnLight: boolean
  hint: Hint
  blur: number
  setShowControls: () => void
  setFirstColumnLight: (isLight: boolean) => void
  setLastColumnLight: (isLight: boolean) => void
  setHint: (message: string) => void
  setBlur: (blur: number) => void

  // API
  response: string | any
  loading: boolean
  setResponse: (response: string | any) => void
  setLoading: (loading: boolean) => void
}

export const useStore = create<Store>((set) => ({
  // UI
  showControls: true,
  firstColumnLight: false,
  lastColumnLight: false,
  hint: { time: null, message: null },
  blur: 0,
  setShowControls: () =>
    set((state) => ({ showControls: !state.showControls })),
  setFirstColumnLight: (isLight) => set(() => ({ firstColumnLight: isLight })),
  setLastColumnLight: (isLight) => set(() => ({ lastColumnLight: isLight })),
  setHint: (message) =>
    set(() => ({ hint: { time: Date.now(), message: message } })),
  setBlur: (blur) => set(() => ({ blur: blur })),

  // API
  response: '',
  loading: false,
  setResponse: (response) => set({ response }),
  setLoading: (loading) => set({ loading }),
}))


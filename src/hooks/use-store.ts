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
  setShowControls: () => void
  setFirstColumnLight: (isLight: boolean) => void
  setLastColumnLight: (isLight: boolean) => void
  setHint: (message: string) => void

  // API
  response: string
  loading: boolean
  setResponse: (response: string) => void
  setLoading: (loading: boolean) => void
}

export const useStore = create<Store>((set) => ({
  // UI
  showControls: true,
  firstColumnLight: false,
  lastColumnLight: false,
  hint: { time: null, message: null },
  setShowControls: () =>
    set((state) => ({ showControls: !state.showControls })),
  setFirstColumnLight: (isLight) => set(() => ({ firstColumnLight: isLight })),
  setLastColumnLight: (isLight) => set(() => ({ lastColumnLight: isLight })),
  setHint: (message) =>
    set(() => ({ hint: { time: Date.now(), message: message } })),

  // API
  response: '',
  loading: false,
  setResponse: (response: string) => set({ response }),
  setLoading: (loading: boolean) => set({ loading }),
}))


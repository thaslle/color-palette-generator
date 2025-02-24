import { create } from 'zustand'

type Store = {
  showControls: boolean
  firstColumnLight: boolean
  lastColumnLight: boolean
  copied: number | null
  setShowControls: () => void
  setFirstColumnLight: (isLight: boolean) => void
  setLastColumnLight: (isLight: boolean) => void
  setCopied: () => void
}

export const useStore = create<Store>((set) => ({
  showControls: true,
  firstColumnLight: false,
  lastColumnLight: false,
  copied: null,
  setShowControls: () =>
    set((state) => ({ showControls: !state.showControls })),

  setFirstColumnLight: (isLight) => set(() => ({ firstColumnLight: isLight })),
  setLastColumnLight: (isLight) => set(() => ({ lastColumnLight: isLight })),
  setCopied: () => set(() => ({ copied: Date.now() })),
}))


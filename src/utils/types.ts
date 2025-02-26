export type RGB = { r: number; g: number; b: number }

export type PaletteProps = {
  name?: string
  code: string
  index?: number
}

export type ColorProps = PaletteProps & {
  hex: string
  rgb: RGB
  isDark: boolean
}


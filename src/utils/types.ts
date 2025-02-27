export type RGB = { r: number; g: number; b: number }

export type ColorProps = {
  name?: string
  code: string
  index?: number
}

export type ColorGroupProps = ColorProps & {
  hex: string
  rgb: RGB
  isDark: boolean
}

export type PaletteProps = {
  name?: string
  date: number
  colors: ColorGroupProps[]
}

export type FormatPaletteProps = {
  name?: string
  date: number
  colors: ColorProps[]
}


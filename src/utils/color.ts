import { RGB, FormatPaletteProps, ColorProps } from './types'

export const getHexCode = (colorCode: string): string => {
  return colorCode.replace('#', '')
}

export const hexToRGB = (hex: string): RGB => {
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)

  return { r: r, g: g, b: b }
}

export const isDarkColor = (color: RGB): boolean => {
  const luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b
  return luminance < 128
}

export const randomHexColor = () => {
  const randomColor = `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`
  return randomColor
}

// Function to format the palette
export const formatPalette = (palette: FormatPaletteProps) => {
  const formattedColors = palette.colors.map((color, index) => {
    const hex = getHexCode(color.code)
    const rgb = hexToRGB(hex)
    const isDark = isDarkColor(rgb)

    return { ...color, hex, rgb, isDark, index }
  })

  return {
    name: palette.name || '',
    date: palette.date,
    colors: formattedColors,
  }
}

export const isColorPropsArray = (array: any): array is ColorProps[] => {
  return (
    Array.isArray(array) &&
    array.every(
      (item) =>
        item &&
        typeof item.code === 'string' && // 'code' is required to be a string
        (item.name === undefined || typeof item.name === 'string') && // 'name' is optional and if exists, must be a string
        (item.index === undefined || typeof item.index === 'number'), // 'index' is optional and if exists, must be a number
    )
  )
}

export const delayExecution = (time: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}


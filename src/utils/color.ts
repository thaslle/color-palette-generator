import { RGB } from './types'

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

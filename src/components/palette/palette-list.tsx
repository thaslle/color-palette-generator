import { Color } from '~/components/color'
import { useStore } from '~/hooks/use-store'

export const PaletteList = () => {
  const palette = useStore((state) => state.palette)

  return palette.map((color, i) => {
    return <Color props={color} key={i} />
  })
}

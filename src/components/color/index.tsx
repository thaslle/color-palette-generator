import { clsx } from 'clsx'
import { ColorProps } from '~/utils/types'
import { SplitText } from '../slipt-text'
import { useStore } from '~/hooks/use-store'

import s from './color.module.scss'

export const Color = ({ props }: { props: ColorProps }) => {
  const showControls = useStore((state) => state.showControls)
  const setHint = useStore((state) => state.setHint)

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setHint('Copied!')
      })
      .catch((error) => {
        console.error('Failed to copy text: ', error)
      })
  }

  return (
    <div className={clsx(s.color, { [s.dark]: props.isDark })}>
      {props.name && (
        <div
          className={s.header}
          data-label="Click to copy"
          onClick={() => copyToClipboard(props.code)}
        >
          <h2 className={s.title}>
            <SplitText reverse={!showControls} delay={1.2}>
              {props.hex}
            </SplitText>
          </h2>
          <div className={s.description}>
            <SplitText reverse={!showControls} delay={1.4}>
              {props.name}
            </SplitText>
          </div>
        </div>
      )}
      <div
        className={s.background}
        style={{ backgroundColor: props.code }}
      ></div>
    </div>
  )
}

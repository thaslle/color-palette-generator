import { clsx } from 'clsx'
import { useEffect, useState } from 'react'
import { ColorGroupProps } from '~/utils/types'
import { SplitText } from '../split-text'

import { useStore } from '~/hooks/use-store'
import { settings } from '~/config/settings'

import s from './color.module.scss'

export const Color = ({ props }: { props: ColorGroupProps }) => {
  const showControls = useStore((state) => state.showControls)
  const blur = useStore((state) => state.blur)
  const loading = useStore((state) => state.loading)
  const setHint = useStore((state) => state.setHint)

  const [reverse, setReverse] = useState(!showControls || loading.state)
  useEffect(() => {
    setReverse(!showControls || loading.state || blur > settings.blurThreshold)
  }, [showControls, loading, blur])

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
    <div
      className={clsx(s.color, { [s.dark]: props.isDark })}
      data-dark-cursor={!props.isDark}
    >
      {props.name && (
        <div
          className={s.header}
          data-label={blur > settings.blurThreshold ? '' : 'Click to copy'}
          onClick={() => copyToClipboard(props.code)}
          style={{
            pointerEvents:
              showControls && blur <= settings.blurThreshold
                ? 'visible'
                : 'none',
          }}
        >
          <h2 className={s.title}>
            <SplitText reverse={reverse} delay={loading ? 0.1 : 0.2}>
              {props.hex}
            </SplitText>
          </h2>
          <div className={s.description}>
            <SplitText reverse={reverse} delay={loading ? 0.1 : 0.4}>
              {props.name}
            </SplitText>
          </div>
        </div>
      )}
    </div>
  )
}


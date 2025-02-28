import { clsx } from 'clsx'
import { SplitText } from '../split-text'
import { useStore } from '~/hooks/use-store'
import { useIsMobile } from '~/hooks/use-mobile'

import s from './title.module.scss'

export const Title = () => {
  const showControls = useStore((state) => state.showControls)
  const { name, date, colors } = useStore((state) => state.palette)
  const isMobile = useIsMobile()

  const isDark = isMobile ? colors[4].isDark : colors[0].isDark

  const showTitle = name ? `${name} ↗` : `Start typing ${isMobile ? '↓' : '→'}`
  return (
    <div className={clsx(s.title, { [s.dark]: isDark })}>
      <SplitText key={date} reverse={!showControls}>
        {showTitle}
      </SplitText>
    </div>
  )
}


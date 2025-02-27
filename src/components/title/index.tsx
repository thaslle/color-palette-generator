import { clsx } from 'clsx'
import { SplitText } from '../split-text'
import { useStore } from '~/hooks/use-store'

import s from './title.module.scss'

export const Title = () => {
  const showControls = useStore((state) => state.showControls)
  const { name, date, colors } = useStore((state) => state.palette)

  const isDark = colors[0].isDark

  const showTitle = name ? `This is “${name}” palette ↗` : 'Start here →'
  return (
    <div className={clsx(s.title, { [s.dark]: isDark })}>
      <SplitText key={date} reverse={!showControls}>
        {showTitle}
      </SplitText>
    </div>
  )
}


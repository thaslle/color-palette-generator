import { SplitText } from '../split-text'
import { useStore } from '~/hooks/use-store'

import s from './title.module.scss'

export const Title = () => {
  const { showControls } = useStore()

  return (
    <div className={s.title}>
      <SplitText reverse={!showControls}>This is playful palette ↗</SplitText>
    </div>
  )
}


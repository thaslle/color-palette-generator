import { clsx } from 'clsx'
import { SplitText } from '../slipt-text'
import { useStore } from '~/hooks/use-store'

import s from './show-hide.module.scss'

export const ShowHide = () => {
  const { showControls, setShowControls } = useStore()

  return (
    <div className={s.showhide}>
      <button
        className={clsx(s.button, { [s.hidden]: !showControls })}
        onClick={() => setShowControls()}
      >
        <div className={s.hide}>
          <SplitText from={'right'} reverse={!showControls}>
            → Hide controls
          </SplitText>
        </div>
        <div className={s.show}>
          <span>←</span>
        </div>
      </button>
    </div>
  )
}

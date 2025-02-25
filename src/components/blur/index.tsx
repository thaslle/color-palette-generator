import React, { ReactNode, useEffect, useRef } from 'react'
import { useStore } from '~/hooks/use-store'
import s from './blur.module.scss'

type BlurProps = {
  children: ReactNode
}

export const Blur: React.FC<BlurProps> = ({ children }) => {
  const motionBlur = useStore((state) => state.motionBlur)
  const blur = useStore((state) => state.blur)
  const loading = useStore((state) => state.loading)
  const splashScreen = useStore((state) => state.splashScreen)
  const setSplashScreen = useStore((state) => state.setSplashScreen)

  const animateRef = useRef<SVGAnimateElement | null>(null)

  useEffect(() => {
    if (!animateRef.current) return

    if (!loading && !splashScreen) {
      // Play animation
      animateRef.current.setAttribute('values', `${motionBlur}; ${blur}`)
      animateRef.current.setAttribute('duration', '3s')
      animateRef.current.beginElement()
    }

    if (loading && splashScreen) setSplashScreen(false)
  }, [loading])

  useEffect(() => {
    if (!animateRef.current) return

    if (!loading && !splashScreen) {
      // Play animation
      animateRef.current.setAttribute('values', `${blur}; ${blur}`)
      animateRef.current.setAttribute('duration', '0s')
      animateRef.current.endElement()
    }
  }, [blur])

  return (
    <>
      <svg className={s.svg}>
        <filter id="blur-filter" colorInterpolationFilters="sRGB">
          <feGaussianBlur
            in="SourceGraphic"
            result="blur"
            stdDeviation={motionBlur}
          >
            <animate
              ref={animateRef}
              id="blur-animation"
              attributeName="stdDeviation"
              values={`${motionBlur}; ${blur}`}
              dur="3s"
              repeatCount="1"
              begin="indefinite"
              fill="freeze"
              keyTimes="0;1"
              keySplines="0.42 0 0.58 1"
              calcMode="spline"
            ></animate>
          </feGaussianBlur>
          <feComponentTransfer>
            <feFuncA type="table" tableValues="1"></feFuncA>
          </feComponentTransfer>
        </filter>
      </svg>

      <div
        className={s.filter}
        style={{
          filter: 'url(#blur-filter)',
        }}
      >
        {children}
      </div>
    </>
  )
}


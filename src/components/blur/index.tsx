import React, { useEffect, useRef, ReactNode } from 'react'
import s from './blur.module.scss'

type BlurProps = {
  children: ReactNode
}

export const Blur: React.FC<BlurProps> = ({ children }) => {
  //const [startAnimation, setStartAnimation] = useState(false);
  const animateRef = useRef<SVGAnimateElement | null>(null)

  //   useEffect(() => {
  //     if (startAnimation && animateRef.current) {
  //       animateRef.current.beginElement();
  //     }
  //   }, [startAnimation]);

  useEffect(() => {
    if (!animateRef.current) return
    //animateRef.current.beginElement()
  }, [])

  return (
    <>
      <svg className={s.svg}>
        <filter id="blur-filter">
          <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="150">
            <animate
              ref={animateRef}
              id="blur-animation"
              attributeName="stdDeviation"
              values="150; 0"
              dur="1s"
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

      {/* Target element */}
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

import { Canvas } from '@react-three/fiber'
import { Experience } from './experience'

import s from './color-canvas.module.scss'

export const ColorCanvas = () => {
  return (
    <Canvas className={s.canvas} camera={{ position: [0, 0, 5], fov: 30 }}>
      <color attach="background" args={['black']} />
      <Experience />
    </Canvas>
  )
}


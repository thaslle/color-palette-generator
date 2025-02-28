import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr } from '@react-three/drei'
import { Experience } from './experience'

import s from './color-canvas.module.scss'

export const ColorCanvas = () => {
  return (
    <Canvas className={s.canvas} camera={{ position: [0, 0, 5], fov: 30 }}>
      <color attach="background" args={['black']} />
      <AdaptiveDpr pixelated />
      <Experience />
    </Canvas>
  )
}


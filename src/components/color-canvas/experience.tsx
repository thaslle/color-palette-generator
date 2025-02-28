import { useEffect, useMemo, useRef, useState } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { ScreenSizer } from '@react-three/drei'
import { Color, MathUtils, MeshBasicMaterial } from 'three'
import CustomShaderMaterial from 'three-custom-shader-material'

import { ColorGroupProps } from '~/utils/types'
import { useStore } from '~/hooks/use-store'
import { useIsMobile } from '~/hooks/use-mobile'

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

export const Experience = () => {
  const { size } = useThree() // Get the size of the viewport

  const palette = useStore((state) => state.palette.colors)
  const blur = useStore((state) => state.blur)
  const motionBlur = useStore((state) => state.motionBlur)
  const loading = useStore((state) => state.loading)
  const splashScreen = useStore((state) => state.splashScreen)
  const showControls = useStore((state) => state.showControls)
  const isMobile = useIsMobile()

  const [blurTarget, setBlurTarget] = useState(1)
  const [colorTarget, setColorTarget] = useState(0)
  const [controlsTarget, setControlsTarget] = useState(1)

  // Create an array with 5 color objects
  const [prevPalette, setPrevPalette] = useState<ColorGroupProps[]>(palette)

  // Refs
  const materialRef = useRef<any>(null)

  // Set uniforms
  const uniforms = useMemo(
    () => ({
      uIsMobile: { value: isMobile ? 1 : 0 },
      uBlurProgress: { value: 0 },
      uColorProgress: { value: 0 },
      uControlsProgress: { value: 0 },
      uMotionBlur: { value: motionBlur },
      uUserBlur: { value: blur },
      uPrevColor1: { value: new Color('#000000') },
      uPrevColor2: { value: new Color('#000000') },
      uPrevColor3: { value: new Color('#000000') },
      uPrevColor4: { value: new Color('#000000') },
      uPrevColor5: { value: new Color('#000000') },
      uColor1: { value: new Color(palette[0].code) },
      uColor2: { value: new Color(palette[1].code) },
      uColor3: { value: new Color(palette[2].code) },
      uColor4: { value: new Color(palette[3].code) },
      uColor5: { value: new Color(palette[4].code) },
    }),
    [],
  )

  // When isMobile Changes
  useEffect(() => {
    if (!materialRef.current) return
    materialRef.current.uniforms.uIsMobile.value = isMobile ? 1 : 0
  }, [isMobile])

  // Set a new blur value
  useEffect(() => {
    if (!materialRef.current || loading.state || splashScreen) return
    materialRef.current.uniforms.uUserBlur.value = blur
  }, [blur])

  // Change Colors
  useEffect(() => {
    if (!materialRef.current) return

    materialRef.current.uniforms.uColorProgress.value = 0
    setColorTarget(1)

    materialRef.current.uniforms.uPrevColor1.value = new Color(
      prevPalette[0].code,
    )
    materialRef.current.uniforms.uPrevColor2.value = new Color(
      prevPalette[1].code,
    )
    materialRef.current.uniforms.uPrevColor3.value = new Color(
      prevPalette[2].code,
    )
    materialRef.current.uniforms.uPrevColor4.value = new Color(
      prevPalette[3].code,
    )
    materialRef.current.uniforms.uPrevColor5.value = new Color(
      prevPalette[4].code,
    )

    materialRef.current.uniforms.uColor1.value = new Color(palette[0].code)
    materialRef.current.uniforms.uColor2.value = new Color(palette[1].code)
    materialRef.current.uniforms.uColor3.value = new Color(palette[2].code)
    materialRef.current.uniforms.uColor4.value = new Color(palette[3].code)
    materialRef.current.uniforms.uColor5.value = new Color(palette[4].code)

    return () => {
      setPrevPalette(palette)
    }
  }, [palette])

  // Change blur when loading
  useEffect(() => {
    if (!materialRef.current) return
    setBlurTarget(loading.state || splashScreen ? 1 : 0)
  }, [loading])

  // Change position when hide controls
  useEffect(() => {
    if (!materialRef.current && !isMobile) return
    setControlsTarget(showControls ? 1 : 0)
  }, [showControls])

  //Update shader time
  useFrame(() => {
    if (!materialRef.current) return

    materialRef.current.uniforms.uColorProgress.value = MathUtils.lerp(
      materialRef.current.uniforms.uColorProgress.value,
      colorTarget,
      0.02,
    )

    materialRef.current.uniforms.uBlurProgress.value = MathUtils.lerp(
      materialRef.current.uniforms.uBlurProgress.value,
      blurTarget,
      0.02,
    )

    materialRef.current.uniforms.uControlsProgress.value = MathUtils.lerp(
      materialRef.current.uniforms.uControlsProgress.value,
      controlsTarget,
      0.02,
    )

    // const mmm = materialRef.current.uniforms.uBlurProgress.value
    // console.log(mmm.toFixed(1))
  })

  return (
    <ScreenSizer scale={1}>
      <mesh>
        <planeGeometry args={[size.width, size.height]} />
        {
          <CustomShaderMaterial
            ref={materialRef}
            baseMaterial={MeshBasicMaterial}
            uniforms={uniforms}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            toneMapped={false}
            color="black"
            transparent
          />
        }
      </mesh>
    </ScreenSizer>
  )
}


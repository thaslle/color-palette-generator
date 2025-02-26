import { useEffect, useMemo, useRef, useState } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { ScreenSizer } from '@react-three/drei'
import { Color, MathUtils, MeshBasicMaterial } from 'three'
import { useSpring } from 'motion/react'
import CustomShaderMaterial from 'three-custom-shader-material'

import { useStore } from '~/hooks/use-store'

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import { PaletteProps } from '~/utils/types'

export const Experience = () => {
  const { size } = useThree() // Get the size of the viewport

  // const motionBlur = useStore((state) => state.motionBlur);
  const palette = useStore((state) => state.palette)
  const blur = useStore((state) => state.blur)
  const motionBlur = useStore((state) => state.motionBlur)
  const loading = useStore((state) => state.loading)
  const splashScreen = useStore((state) => state.splashScreen)

  const [counter, setCounter] = useState(0)

  const progression = useSpring(0, {
    stiffness: 200,
    damping: 250,
    mass: 2,
  })

  // Create an array with 5 color objects
  const [prevPalette, setPrevPalette] = useState<PaletteProps[]>(palette)

  // Refs
  const materialRef = useRef<any>(null)

  // Set uniforms
  const uniforms = useMemo(
    () => ({
      uProgress: { value: 0 },
      uFromBlur: { value: motionBlur },
      uToBlur: { value: motionBlur },
      uBackandForth: { value: 0 },
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

  // Set starting movement
  useEffect(() => {
    if (!materialRef.current) return

    // Initial values
    if (splashScreen) {
      materialRef.current.uniforms.uBackandForth.value = 0
      materialRef.current.uniforms.uProgress.value = 0
    }
  }, [])

  // Set a new blur value
  useEffect(() => {
    if (!materialRef.current || loading || splashScreen) return
    materialRef.current.uniforms.uToBlur.value = blur
  }, [blur])

  // When splash screen is out
  useEffect(() => {
    if (!materialRef.current || counter <= 2) return
    materialRef.current.uniforms.uBackandForth.value = 1
    materialRef.current.uniforms.uFromBlur.value = motionBlur
    materialRef.current.uniforms.uToBlur.value = blur
  }, [counter, palette])

  // Change Colors
  useEffect(() => {
    if (!materialRef.current) return

    materialRef.current.uniforms.uProgress.value = 0
    progression.setCurrent(0)
    progression.set(1.0)

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

    console.log({
      date: Date.now(),
      prev: prevPalette,
      palette: palette,
    })

    //console.log({ palette: 'palette', date: Date.now() })
    setCounter((state) => state + 1)

    return () => {
      setPrevPalette(palette) // Update prevPalette only if palette changed
    }
  }, [palette])

  //Update shader time
  useFrame(() => {
    if (!materialRef.current) return
    // materialRef.current.uniforms.uProgress.value = MathUtils.damp(
    //   materialRef.current.uniforms.uProgress.value,
    //   1,
    //   0.9,
    //   0.005,
    // )

    materialRef.current.uniforms.uProgress.value = Math.min(
      Math.max(0, progression.get()),
      1,
    )

    //console.log(materialRef.current.uniforms.uProgress.value)
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
            color="black"
            transparent
          />
        }
      </mesh>
    </ScreenSizer>
  )
}


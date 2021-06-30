import { Box, useBreakpointValue, useColorModeValue } from "@chakra-ui/react"
import { ContactShadows } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Vignette,
} from "@react-three/postprocessing"
import React, { useRef, useMemo, useState, FC, useContext } from "react"
import * as THREE from "three"
import { InstancedMesh } from "three"

import { MotionContext } from "../../pages/_app"
import theme from "../../theme/index"

interface Particle {
  t: number
  factor: number
  speed: number
  xFactor: number
  yFactor: number
  zFactor: number
  mx: number
  my: number
}

interface SwarmProps {
  motionPref: boolean
  count: number
  sphereColor: string
  position: [number, number, number]
}

const Swarm: FC<SwarmProps> = ({
  motionPref,
  count,
  sphereColor,
  ...props
}) => {
  const mesh = useRef<InstancedMesh>()
  const [dummy] = useState(() => new THREE.Object3D())

  const particles = useMemo(() => {
    const particle = [] as Particle[]
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.01 + Math.random() / 200
      const xFactor = -60 + Math.random() * 120
      const yFactor = -25 + Math.random() * 50
      const zFactor = -20 + Math.random() * 40
      particle.push({
        t,
        factor,
        speed,
        xFactor,
        yFactor,
        zFactor,
        mx: 0,
        my: 0,
      })
    }

    return particle
  }, [count])

  useFrame(state => {
    motionPref &&
      particles.forEach((particle, i) => {
        const { factor, speed, xFactor, yFactor, zFactor } = particle
        let { t } = particle
        t = particle.t += speed / 2
        const a = Math.cos(t) + Math.sin(t * 1) / 10
        const b = Math.sin(t) + Math.cos(t * 2) / 10
        const s = Math.max(1.5, Math.cos(t) * 5)
        particle.mx +=
          (state.mouse.x * state.viewport.width - particle.mx) * 0.02
        particle.my +=
          (state.mouse.y * state.viewport.height - particle.my) * 0.02
        dummy.position.set(
          (particle.mx / 10) * a +
            xFactor +
            Math.cos((t / 10) * factor) +
            (Math.sin(t * 1) * factor) / 10,
          (particle.my / 10) * b +
            yFactor +
            Math.sin((t / 10) * factor) +
            (Math.cos(t * 2) * factor) / 10,
          (particle.my / 10) * b +
            zFactor +
            Math.cos((t / 10) * factor) +
            (Math.sin(t * 3) * factor) / 10
        )
        dummy.scale.set(s, s, s)
        dummy.updateMatrix()
        mesh.current.setMatrixAt(i, dummy.matrix)
      })

    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh
      ref={mesh}
      args={[null, null, count]}
      castShadow
      receiveShadow
      {...props}
    >
      <sphereBufferGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={sphereColor} roughness={0} />
    </instancedMesh>
  )
}

export const Visualization: FC = () => {
  const sphereColor = useColorModeValue(
    theme.colors.gray["800"],
    theme.colors.gray["900"]
  )
  const { motionPref } = useContext(MotionContext)

  const sphereCount = useBreakpointValue({
    base: 95,
    sm: 110,
    md: 125,
    lg: 135,
    xl: 150,
  })

  return (
    <Box h="100vh" position="absolute" top={0} w="100%" zIndex={2}>
      <Canvas
        camera={{ fov: 75, position: [0, 0, 60], near: 10, far: 150 }}
        gl={{ alpha: true, antialias: true }}
        mode="concurrent"
        shadows
      >
        <fog args={[theme.colors.teal["500"], 30, 120]} attach="fog" />
        <ambientLight intensity={1.5} />
        <pointLight intensity={20} position={[100, 10, -50]} castShadow />
        <pointLight
          color={theme.colors.teal["500"]}
          intensity={10}
          position={[-100, -100, -100]}
        />
        <Swarm
          count={sphereCount}
          motionPref={motionPref}
          position={[0, 5, 0]}
          sphereColor={sphereColor}
        />
        <ContactShadows
          blur={0.6}
          far={40}
          height={130}
          opacity={0.1}
          position={[0, -30, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          width={260}
        />
        <EffectComposer disableNormalPass={false} multisampling={0}>
          <DepthOfField
            bokehScale={2}
            focalLength={0.3}
            focusDistance={0}
            height={480}
          />
          <Bloom height={30} intensity={0.3} opacity={0.3} />
          <Noise opacity={0.005} />
          <Vignette darkness={0.7} eskil={false} offset={0.1} />
        </EffectComposer>
      </Canvas>
    </Box>
  )
}

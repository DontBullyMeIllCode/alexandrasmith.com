import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import MusicVisualizer from "@/components/webgl/MusicVisualizer";
//import CameraRig from "@/components/webgl/CameraRig";
import StarParticles from "@/components/webgl/StarParticles/StarParticles";
import { Suspense } from "react";
import LakeMichigan from "@/components/webgl/LakeMichigan";
import { Color } from "three";
import Moon from "@/components/webgl/Moon";

export default function MainCanvas() {

  const sceneColor = new Color().setHex(0x200d3b)

  return (
    <Canvas shadows scene={{background: sceneColor}} camera={{ position: [0, 5, 1000], fov: 55, near: 1, far: 20000, }}>
      <MusicVisualizer>
        {/* "Lights" */}
        <Stars
          radius={5000}
          depth={50}
          count={10000}
          factor={4}
          saturation={1}
          speed={0}
        />
        <ambientLight intensity={1} />

        {/* Camera */}
        {/* <CameraRig /> */}
        <OrbitControls />

        {/* Action */}
        <Suspense fallback={null}>
          <StarParticles />
          <group position={[0, 0, -5000]} scale={2000}>
            <Moon />
          </group>
          <group position={[0, -100, 0]}>
            <LakeMichigan />
          </group>
        </Suspense>

        {/* Post */}
        <EffectComposer autoClear={false}>
          <Bloom
            mipmapBlur
            intensity={1} // The bloom intensity.
            luminanceThreshold={0.5} // luminance threshold. Raise this value to mask out darker elements in the scene.
            luminanceSmoothing={0.4} // smoothness of the luminance threshold. Range is [0, 1]
          />
        </EffectComposer>
      </MusicVisualizer>
    </Canvas>
  );
}

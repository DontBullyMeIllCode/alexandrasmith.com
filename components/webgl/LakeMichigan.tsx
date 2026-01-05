import * as THREE from 'three'
import React, {useRef, useMemo} from 'react'
import {extend, useThree, useLoader, useFrame} from '@react-three/fiber'
import {Water} from 'three-stdlib'

extend({Water})

export default function LakeMichigan() {
  const ref = useRef<Water>(null)
  const gl = useThree((state) => state.gl)
  const waterNormalsTexture = useLoader(THREE.TextureLoader, '/textures/water/waternormals.jpeg')

  const waterNormals = useMemo(() => {
    const texture = waterNormalsTexture.clone()
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    return texture
  }, [waterNormalsTexture])

  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), [])
  const config = useMemo(
    () => {
      const waterConfig: {
        textureWidth: number
        textureHeight: number
        waterNormals: THREE.Texture
        sunDirection: THREE.Vector3
        sunColor: number
        waterColor: number
        distortionScale: number
        fog: boolean
        format?: number
      } = {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals,
        sunDirection: new THREE.Vector3(),
        sunColor: 0x8c0076,
        waterColor: 0x200d3b,
        distortionScale: 3.7,
        fog: false,
      }
      
      // Only add format if it exists on the renderer (for older Three.js versions)
      if ('encoding' in gl) {
        waterConfig.format = (gl as { encoding?: number }).encoding
      }
      
      return waterConfig
    },
    [waterNormals, gl]
  );

  const water = useMemo(() => new Water(geom, config), [geom, config])

  useFrame((state, delta) => {
    if (ref.current?.material) {
      const material = ref.current.material as THREE.ShaderMaterial & {
        uniforms: { time: { value: number } }
      }
      if (material.uniforms?.time) {
        material.uniforms.time.value += delta
      }
    }
  });

  return (
    <primitive 
      object={water} 
      ref={ref} 
      rotation-x={-Math.PI / 2}
    />
  )
}

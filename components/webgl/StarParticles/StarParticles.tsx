import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { createPortal, extend, useFrame } from "@react-three/fiber";
import { useFBO } from "@react-three/drei";
import { useAppContext, useAppDispatch } from "@/context/AppContext";
import SimulationMaterial from "@/materials/SimulationMaterial/SimulationMaterial";
import FrequencyMaterial from "@/materials/FrequencyMaterial/FrequencyMaterial";
import getFrequencyColorMapping from "@/helpers/webgl/getFrequencyColorMapping";
import generateColorsTexture from "@/helpers/webgl/generateColorsTexture";

import particlesVertexShader from "./shaders/vertexShader";
import particlesFragmentShader from "./shaders/fragmentShader";

extend({ SimulationMaterial: SimulationMaterial });
extend({ FrequencyMaterial: FrequencyMaterial });

export default function StarParticles() {
  const { canvasReady, audioAnalyser } = useAppContext();
  const dispatch = useAppDispatch();

  const size = 1024;
  const radius = 10000;

  const points = useRef<THREE.Points | null>(null);
  const simulationMaterialRef = useRef<THREE.Material | null>(null);
  const frequencyMaterialRef = useRef<THREE.Material | null>(null);

  const scene = useMemo(() => new THREE.Scene(), []);
  const frequencyScene = useMemo(() => new THREE.Scene(), []);

  const camera = new THREE.OrthographicCamera(
    -1,
    1,
    1,
    -1,
    1 / Math.pow(2, 53),
    1
  );

  const positions = new Float32Array([
    -1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0,
  ]);
  const uvs = new Float32Array([
    0,
    0, // bottom-left
    1,
    0, // bottom-right
    1,
    1, // top-right
    0,
    0, // bottom-left
    1,
    1, // top-right
    0,
    1, // top-left
  ]);

  const renderTarget = useFBO(size, size, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    stencilBuffer: false,
    type: THREE.FloatType,
  });
  const frequencyRenderTarget = useFBO(size, size, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    stencilBuffer: false,
    type: THREE.FloatType,
  });

  const particlesPosition = useMemo(() => {
    const length = size * size;
    const particles = new Float32Array(length * 3);
    for (let i = 0; i < length; i++) {
      const i3 = i * 3;
      particles[i3 + 0] = (i % size) / size;
      particles[i3 + 1] = i / size / size;
    }
    return particles;
  }, [size]);

  const uniforms = useMemo(
    () => ({
      uPositions: {
        value: null,
      },
      uFrequencies: {
        value: null,
      },
      uRadius: {
        value: radius,
      },
    }),
    []
  );

  useEffect(() => {
    if (!canvasReady) {
      dispatch({ type: "canvasReady" });
    }
  }, [canvasReady, dispatch]);

  useFrame((state) => {
    const { gl, clock } = state;

    gl.setRenderTarget(renderTarget);
    gl.clear();
    gl.render(scene, camera);
    gl.setRenderTarget(null);

    gl.setRenderTarget(frequencyRenderTarget);
    gl.clear();
    gl.render(frequencyScene, camera);
    gl.setRenderTarget(null);

    points.current!.material.uniforms.uPositions.value = renderTarget.texture;
    points.current!.material.uniforms.uFrequencies.value =
      frequencyRenderTarget.texture;

    simulationMaterialRef.current!.uniforms.uTime.value = clock.elapsedTime;
    generateColorsTexture(
      size,
      frequencyMaterialRef.current!.uniforms.frequency.value,
      getFrequencyColorMapping(size, audioAnalyser.getFrequencyData())
    );
  });

  return (
    <>
      {createPortal(
        <mesh>
          <simulationMaterial
            ref={simulationMaterialRef}
            args={[size, radius]}
          />
          <bufferGeometry drawRange={{ start: 0, count: size }}>
            <bufferAttribute
              attach="attributes-position"
              count={positions.length / 3}
              array={positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-uv"
              count={uvs.length / 2}
              array={uvs}
              itemSize={2}
            />
          </bufferGeometry>
        </mesh>,
        scene
      )}
      {createPortal(
        <mesh>
          <frequencyMaterial ref={frequencyMaterialRef} args={[size]} />
          <bufferGeometry drawRange={{ start: 0, count: size }}>
            <bufferAttribute
              attach="attributes-position"
              count={positions.length / 3}
              array={positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-uv"
              count={uvs.length / 2}
              array={uvs}
              itemSize={2}
            />
          </bufferGeometry>
        </mesh>,
        frequencyScene
      )}
      <points ref={points} frustumCulled={false}>
        <bufferGeometry drawRange={{ start: 0, count: size }}>
          <bufferAttribute
            attach="attributes-position"
            count={particlesPosition.length / 3}
            array={particlesPosition}
            itemSize={3}
          />
        </bufferGeometry>
        <shaderMaterial
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          fragmentShader={particlesFragmentShader}
          vertexShader={particlesVertexShader}
          uniforms={uniforms}
        />
      </points>
    </>
  );
}

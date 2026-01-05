import * as THREE from "three";
import getRandomDataSphere from "@/helpers/webgl/getRandomDataSphere";

import simulationVertexShader from "./shaders/vertexShader";
import simulationFragmentShader from "./shaders/fragmentShader";

class SimulationMaterial extends THREE.ShaderMaterial {
  constructor(size: number, radius: number) {
    const positionsTexture = new THREE.DataTexture(
      getRandomDataSphere(size, radius),
      size,
      size,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    positionsTexture.needsUpdate = true;

    const simulationUniforms = {
      positions: { value: positionsTexture },
      uFrequency: { value: 0.25 },
      uTime: { value: 0 },
      uRadius: { value: radius },
    };

    super({
      uniforms: simulationUniforms,
      vertexShader: simulationVertexShader,
      fragmentShader: simulationFragmentShader,
    });
  }
}

export default SimulationMaterial;

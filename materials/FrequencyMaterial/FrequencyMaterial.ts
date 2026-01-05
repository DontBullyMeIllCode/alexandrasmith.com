import * as THREE from "three";
import getFrequencyColorMapping from "@/helpers/webgl/getFrequencyColorMapping";

import frequencyVertexShader from "./shaders/vertexShader";
import frequencyFragmentShader from "./shaders/fragmentShader";

class FrequencyMaterial extends THREE.ShaderMaterial {
  constructor(size: number) {
    const frequencyTexture = generateFrequencyTexture(
      size,
      new Uint8Array(1024)
    );

    const simulationUniforms = {
      frequency: { value: frequencyTexture },
    };

    super({
      uniforms: simulationUniforms,
      vertexShader: frequencyVertexShader,
      fragmentShader: frequencyFragmentShader,
    });

    function generateFrequencyTexture(size: number, data: Uint8Array) {
      return new THREE.DataTexture(
        getFrequencyColorMapping(size, data),
        size,
        size,
        THREE.RGBAFormat,
        THREE.FloatType
      );
    }
  }
}

export default FrequencyMaterial;

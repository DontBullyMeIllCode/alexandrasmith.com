import * as THREE from "three";

function frequencyToColor(frequency: number) {
  // Define the 4 colors based on the provided hex values #002094 and #F301A6 (normalized to [0, 1])
  const color1 = new THREE.Vector3(0.0, 0.125, 0.58); // #002094
  const color2 = new THREE.Vector3(0.31, 0.165, 0.541); // #4F2A8A
  const color3 = new THREE.Vector3(0.624, 0.306, 0.62); // #9F4E9E
  const color4 = new THREE.Vector3(0.953, 0.004, 0.651); // #F301A6

  // Normalize [0,1]
  frequency = frequency / 255;

  // Map frequency to range [0,1] and assign colors
  if (frequency < 0.33) {
    // Low frequencies (bass) -> #002094 to #4F2A8A
    // return color1 + (color2 - color1) * (frequency * 3.0);
    return new THREE.Vector3()
      .subVectors(color2, color1)
      .multiplyScalar(frequency * 3.0)
      .add(color1); // Smooth gradient between #002094 and #4F2A8A
  } else if (frequency < 0.66) {
    // Mid-range frequencies -> #4F2A8A to #9F4E9E
    //return color2 + (color3 - color2) * ((frequency - 0.33) * 3.0)
    return new THREE.Vector3()
      .subVectors(color3, color2)
      .multiplyScalar((frequency - 0.33) * 3.0)
      .add(color2); // Smooth gradient between #4F2A8A and #9F4E9E
  } else {
    // High frequencies -> #9F4E9E to #F301A6
    // return color3 + (color4 - color3) * ((frequency - 0.66) * 3.0)
    return new THREE.Vector3()
      .subVectors(color4, color3)
      .multiplyScalar((frequency - 0.66) * 3.0)
      .add(color3); // Smooth gradient between #9F4E9E and #F301A6
  }
}

export default function getFrequencyColorMapping(
  size: number,
  frequencyData: Uint8Array
) {
  // we need to create a vec4 since we're passing the positions to the fragment shader
  // data textures need to have 4 components, R, G, B, and A
  const length = size * size * 4;
  const data = new Float32Array(length);

  for (let i = 0; i < frequencyData.length; i++) {
    const stride = i * 4;

    const color = frequencyToColor(frequencyData[i]);

    data[stride] = color.x; // R value
    data[stride + 1] = color.y; // G value
    data[stride + 2] = color.z; // B value
    data[stride + 3] = frequencyData[i % 1024]; // Frequency data
  }

  return data;
}

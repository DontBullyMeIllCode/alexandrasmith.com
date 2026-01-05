import * as THREE from "three";

export default function getRandomDataSphere(size: number, radius: number) {
  // we need to create a vec4 since we're passing the positions to the fragment shader
  // data textures need to have 4 components, R, G, B, and A
  const length = size * size * 4;
  const data = new Float32Array(length);
  const distance = radius * .9;

  for (let i = 0; i < length; i++) {
    const stride = i * 4;

    // const distance = Math.sqrt(Math.random()) * radius;
    const theta = THREE.MathUtils.randFloatSpread(360);
    const phi = THREE.MathUtils.randFloatSpread(360);

    data[stride] = distance * Math.sin(theta) * Math.cos(phi);
    data[stride + 1] = distance * Math.sin(theta) * Math.sin(phi);
    data[stride + 2] = distance * Math.cos(theta);
    data[stride + 3] = 1.0; // this value will not have any impact
  }

  return data;
};

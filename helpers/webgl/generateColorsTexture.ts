import * as THREE from "three";

export default function generateColorsTexture(
  count: number,
  texture: THREE.DataTexture,
  data: Float32Array
) {
  const imageData = texture.image as { data: Float32Array };
  
  for (let i = 0; i < count; i++) {
    const i4 = i * 4;

    // Colors based on geometry
    imageData.data[i4] = data[i4];
    imageData.data[i4 + 1] = data[i4 + 1];
    imageData.data[i4 + 2] = data[i4 + 2];
    imageData.data[i4 + 3] = data[i4 + 3];
  }
  texture.needsUpdate = true;
}

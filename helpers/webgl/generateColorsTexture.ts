import * as THREE from "three";

export default function generateColorsTexture(
  count: number,
  texture: THREE.Texture,
  data: Float32Array
) {
  for (let i = 0; i < count; i++) {
    const i4 = i * 4;

    // Colors based on geometry
    texture.image.data[i4] = data[i4];
    texture.image.data[i4 + 1] = data[i4 + 1];
    texture.image.data[i4 + 2] = data[i4 + 2];
    texture.image.data[i4 + 3] = data[i4 + 3];
  }
  texture.needsUpdate = true;
}

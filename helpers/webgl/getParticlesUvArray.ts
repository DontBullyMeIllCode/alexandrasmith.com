export default function getParticlesUvArray(size: number) {
  const length = size * size;
  const particlesUvArray = new Float32Array(length * 3);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = y * size + x;
      const i2 = i * 2;

      // Particles UV
      const uvX = (x + 0.5) / size;
      const uvY = (y + 0.5) / size;

      particlesUvArray[i2 + 0] = uvX;
      particlesUvArray[i2 + 1] = uvY;
    }
  }

  return particlesUvArray;
}

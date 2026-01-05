const fragmentShader = `
uniform sampler2D positions;
uniform float uTime;
uniform float uFrequency;
uniform float uRadius;

varying vec2 vUv;

// Source: https://github.com/dmnsgn/glsl-rotate/blob/main/rotation-3d-y.glsl.js
mat3 rotation3dY(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat3(
    c, 0.0, -s,
    0.0, 1.0, 0.0,
    s, 0.0, c
  );
}

void main() {
  vec3 pos = texture2D(positions, vUv).rgb;

  float distanceFactor = pow(uRadius - distance(pos, vec3(0.0)), 1.5);
  vec3 particlePosition = pos * rotation3dY(uTime * 0.01);

  gl_FragColor = vec4(particlePosition, 1.0);
}
`;
export default fragmentShader;
const fragmentShader = `
uniform sampler2D frequency;

varying vec2 vUv;

void main() {
  vec4 color = texture2D(frequency, vUv);
  gl_FragColor = color;
}
`;
export default fragmentShader;
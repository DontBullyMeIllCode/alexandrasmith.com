const fragmentShader = `
varying float vDistance;
varying vec4 vColor;

void main() {
  vec3 color = vec3(vColor.rgb);
  float strength = distance(gl_PointCoord, vec2(0.5));
  strength = 1.0 - strength;

  color = mix(color, color, vDistance * 0.5);
  color = mix(vec3(0.0), color, strength);

  vec2 uv = gl_PointCoord;
  float distanceToCenter = length(uv - 0.5);
  float alpha = 0.05 / distanceToCenter - 0.1;
  
  gl_FragColor = vec4(color, alpha);
}
`;
export default fragmentShader;

const vertexShader=`
uniform sampler2D uPositions;
uniform sampler2D uFrequencies;
uniform float uTime;
uniform float uRadius;

varying float vDistance;
varying vec4 vColor;

void main() {
  vec3 pos = texture2D(uPositions, position.xy).xyz;
  vec4 color = texture2D(uFrequencies, position.xy);
  float frequency = float(color.a);

  float distanceFactor = pow(uRadius - distance(pos, vec3(0.0)), 1.75);
  float size = distanceFactor * 10.0 + 10.0;

  vDistance = distanceFactor;
  vColor = color;

  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  // Point size
  gl_PointSize = size + (frequency * .25);
  gl_PointSize *= (1.0 / - viewPosition.z);
}
`;
export default vertexShader;
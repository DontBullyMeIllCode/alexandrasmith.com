import * as THREE from "three";
import { useTexture } from "@react-three/drei";

export default function ToonMaterial(props: THREE.MeshToonMaterialParameters) {
  const gradientMap = useTexture("/textures/fiveTone.jpg");
  gradientMap.minFilter = THREE.NearestFilter;
  gradientMap.magFilter = THREE.NearestFilter;

  return (
    <>
      <meshToonMaterial gradientMap={gradientMap} {...props} />
    </>
  );
}

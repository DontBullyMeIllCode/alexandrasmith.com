import * as THREE from "three";
import { useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import ToonMaterial from "@/materials/ToonMaterial"

export default function Moon() {
    const moonRef = useRef<THREE.Mesh | null>(null)

    const texture = useTexture({
        map: 'textures/moon/color.jpg',
        normalMap: 'textures/moon/normal.jpg',
    })

    useFrame(({ clock }) => {
        moonRef.current!.rotation.y = clock.getElapsedTime() / 50;
    })


    return (
        <group>
            <mesh scale={1} ref={moonRef} receiveShadow castShadow>
                <sphereGeometry />
                <ToonMaterial {...texture} emissive={0xffffff} emissiveMap={texture.map} emissiveIntensity={4} toneMapped={false}/>
            </mesh>
        </group>
    )
}

import { RigidBody } from "@react-three/rapier";
import { Suspense } from "react";

export default function Boxes() {
  return (
    <>
      <Suspense fallback={null}>
        {Array.from({ length: 6 }).map((_, idx) => (
          <RigidBody key={idx} colliders="cuboid" mass={0.2}>
            <mesh position={[0, 2 + idx * 2.5, 70]}>
              <boxGeometry args={[2, 1, 2]} />
              <meshStandardMaterial color="orange" />
            </mesh>
          </RigidBody>
        ))}
      </Suspense>
    </>
  );
}

// import { useRef } from "react";
// import { useFrame } from "@react-three/fiber";

export default function Placeholder() {
  // const sphereRef = useRef();

  // useFrame((state, delta) => {
  //   const angle = state.clock.elapsedTime;
  //   sphereRef.current!.rotation.y = angle / 2;
  // });

  return (
    <mesh>
      <sphereGeometry
        // ref={sphereRef}
        args={[5, 6, 6]}
      />
      <meshBasicMaterial wireframe color="darkGreen" />
    </mesh>
  );
}

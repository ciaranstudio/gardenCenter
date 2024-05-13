import { Suspense } from "react";
import { Sky } from "@react-three/drei";
import Grass from "../grass/Grass";
import Placeholder from "../loading/Placeholder";

export default function Setting() {
  return (
    <>
      <Suspense fallback={<Placeholder />}>
        <Grass />
        <Sky distance={3500} sunPosition={[50, 30, 50]} rayleigh={0.3} />
        <ambientLight intensity={0.5} />
      </Suspense>
    </>
  );
}

import { PropsWithChildren } from "react";

export interface Props {
  positionOffset: number;
  startingHeight: number;
}

export default function PlatformPattern(props: PropsWithChildren<Props>) {
  const rampRotationZ = Math.PI / 8;
  const rampWidth = 12;
  const rampConnectorY = 1.5;

  return (
    <>
      <group position={[0, props.startingHeight, 0]}>
        <mesh
          rotation-y={-Math.PI / 2}
          rotation-z={-rampRotationZ}
          position={[0, 6, 16]}
        >
          <boxGeometry args={[20, 0.1, rampWidth]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>
        <mesh
          rotation-y={-Math.PI / 2}
          rotation-z={-rampRotationZ / 2}
          position={[0, rampConnectorY, 28]}
        >
          <boxGeometry args={[5.1, 0.1, rampWidth]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>

        <mesh
          rotation-y={-Math.PI / 2}
          rotation-z={rampRotationZ}
          position={[0, 6, -16]}
        >
          <boxGeometry args={[20, 0.1, rampWidth]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>
        <mesh
          rotation-y={-Math.PI / 2}
          rotation-z={rampRotationZ / 2}
          position={[0, rampConnectorY, -28]}
        >
          <boxGeometry args={[5.1, 0.1, rampWidth]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>

        <mesh rotation-z={-rampRotationZ} position={[16, 6, 0]}>
          <boxGeometry args={[20, 0.1, rampWidth]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>
        <mesh
          rotation-z={rampRotationZ / 2}
          position={[-28, rampConnectorY, 0]}
        >
          <boxGeometry args={[5.1, 0.1, rampWidth]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>

        <mesh rotation-z={rampRotationZ} position={[-16, 6, 0]}>
          <boxGeometry args={[20, 0.1, rampWidth]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>
        <mesh
          rotation-z={-rampRotationZ / 2}
          position={[28, rampConnectorY, 0]}
        >
          <boxGeometry args={[5.1, 0.1, rampWidth]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>

        <mesh position={[0, 9.75, 0]}>
          <boxGeometry args={[12.5, 0.1, 12.5]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>
      </group>
      <group position={[-props.positionOffset, props.startingHeight, 0]}>
        <mesh
          rotation-y={-Math.PI / 2}
          rotation-z={-rampRotationZ}
          position={[0, 6, 16]}
        >
          <boxGeometry args={[20, 0.1, rampWidth]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>
        <mesh
          rotation-y={-Math.PI / 2}
          rotation-z={-rampRotationZ / 2}
          position={[0, rampConnectorY, 28]}
        >
          <boxGeometry args={[5.1, 0.1, rampWidth]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>

        <mesh
          rotation-y={-Math.PI / 2}
          rotation-z={rampRotationZ}
          position={[0, 6, -16]}
        >
          <boxGeometry args={[20, 0.1, rampWidth]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>
        <mesh
          rotation-y={-Math.PI / 2}
          rotation-z={rampRotationZ / 2}
          position={[0, rampConnectorY, -28]}
        >
          <boxGeometry args={[5.1, 0.1, rampWidth]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>

        <mesh rotation-z={-rampRotationZ} position={[16, 6, 0]}>
          <boxGeometry args={[20, 0.1, rampWidth]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>
        <mesh
          rotation-z={rampRotationZ / 2}
          position={[-28, rampConnectorY, 0]}
        >
          <boxGeometry args={[5.1, 0.1, rampWidth]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>

        <mesh rotation-z={rampRotationZ} position={[-16, 6, 0]}>
          <boxGeometry args={[20, 0.1, rampWidth]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>
        <mesh
          rotation-z={-rampRotationZ / 2}
          position={[28, rampConnectorY, 0]}
        >
          <boxGeometry args={[5.1, 0.1, rampWidth]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>

        <mesh position={[0, 9.75, 0]}>
          <boxGeometry args={[12.5, 0.1, 12.5]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>
      </group>
      <group position={[props.positionOffset, props.startingHeight, 0]}>
        <mesh
          rotation-y={-Math.PI / 2}
          rotation-z={-rampRotationZ}
          position={[0, 6, 16]}
        >
          <boxGeometry args={[20, 0.1, rampWidth]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>
        <mesh
          rotation-y={-Math.PI / 2}
          rotation-z={-rampRotationZ / 2}
          position={[0, rampConnectorY, 28]}
        >
          <boxGeometry args={[5.1, 0.1, rampWidth]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>

        <mesh
          rotation-y={-Math.PI / 2}
          rotation-z={rampRotationZ}
          position={[0, 6, -16]}
        >
          <boxGeometry args={[20, 0.1, rampWidth]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>
        <mesh
          rotation-y={-Math.PI / 2}
          rotation-z={rampRotationZ / 2}
          position={[0, rampConnectorY, -28]}
        >
          <boxGeometry args={[5.1, 0.1, rampWidth]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>

        <mesh rotation-z={-rampRotationZ} position={[16, 6, 0]}>
          <boxGeometry args={[20, 0.1, rampWidth]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>
        <mesh
          rotation-z={rampRotationZ / 2}
          position={[-28, rampConnectorY, 0]}
        >
          <boxGeometry args={[5.1, 0.1, rampWidth]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>

        <mesh rotation-z={rampRotationZ} position={[-16, 6, 0]}>
          <boxGeometry args={[20, 0.1, rampWidth]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>
        <mesh
          rotation-z={-rampRotationZ / 2}
          position={[28, rampConnectorY, 0]}
        >
          <boxGeometry args={[5.1, 0.1, rampWidth]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>

        <mesh position={[0, 9.75, 0]}>
          <boxGeometry args={[12.5, 0.1, 12.5]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>
      </group>
      <group position={[0, props.startingHeight, props.positionOffset]}>
        <mesh
          rotation-y={-Math.PI / 2}
          rotation-z={-rampRotationZ}
          position={[0, 6, 16]}
        >
          <boxGeometry args={[20, 0.1, rampWidth]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>
        <mesh
          rotation-y={-Math.PI / 2}
          rotation-z={-rampRotationZ / 2}
          position={[0, rampConnectorY, 28]}
        >
          <boxGeometry args={[5.1, 0.1, rampWidth]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>

        <mesh
          rotation-y={-Math.PI / 2}
          rotation-z={rampRotationZ}
          position={[0, 6, -16]}
        >
          <boxGeometry args={[20, 0.1, rampWidth]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>
        <mesh
          rotation-y={-Math.PI / 2}
          rotation-z={rampRotationZ / 2}
          position={[0, rampConnectorY, -28]}
        >
          <boxGeometry args={[5.1, 0.1, rampWidth]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>

        <mesh rotation-z={-rampRotationZ} position={[16, 6, 0]}>
          <boxGeometry args={[20, 0.1, rampWidth]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>
        <mesh
          rotation-z={rampRotationZ / 2}
          position={[-28, rampConnectorY, 0]}
        >
          <boxGeometry args={[5.1, 0.1, rampWidth]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>

        <mesh rotation-z={rampRotationZ} position={[-16, 6, 0]}>
          <boxGeometry args={[20, 0.1, rampWidth]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>
        <mesh
          rotation-z={-rampRotationZ / 2}
          position={[28, rampConnectorY, 0]}
        >
          <boxGeometry args={[5.1, 0.1, rampWidth]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>

        <mesh position={[0, 9.75, 0]}>
          <boxGeometry args={[12.5, 0.1, 12.5]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>
      </group>
      <group position={[0, props.startingHeight, -props.positionOffset]}>
        <mesh
          rotation-y={-Math.PI / 2}
          rotation-z={-rampRotationZ}
          position={[0, 6, 16]}
        >
          <boxGeometry args={[20, 0.1, rampWidth]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>
        <mesh
          rotation-y={-Math.PI / 2}
          rotation-z={-rampRotationZ / 2}
          position={[0, rampConnectorY, 28]}
        >
          <boxGeometry args={[5.1, 0.1, rampWidth]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>

        <mesh
          rotation-y={-Math.PI / 2}
          rotation-z={rampRotationZ}
          position={[0, 6, -16]}
        >
          <boxGeometry args={[20, 0.1, rampWidth]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>
        <mesh
          rotation-y={-Math.PI / 2}
          rotation-z={rampRotationZ / 2}
          position={[0, rampConnectorY, -28]}
        >
          <boxGeometry args={[5.1, 0.1, rampWidth]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>

        <mesh rotation-z={-rampRotationZ} position={[16, 6, 0]}>
          <boxGeometry args={[20, 0.1, rampWidth]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>
        <mesh
          rotation-z={rampRotationZ / 2}
          position={[-28, rampConnectorY, 0]}
        >
          <boxGeometry args={[5.1, 0.1, rampWidth]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>

        <mesh rotation-z={rampRotationZ} position={[-16, 6, 0]}>
          <boxGeometry args={[20, 0.1, rampWidth]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>
        <mesh
          rotation-z={-rampRotationZ / 2}
          position={[28, rampConnectorY, 0]}
        >
          <boxGeometry args={[5.1, 0.1, rampWidth]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>

        <mesh position={[0, 9.75, 0]}>
          <boxGeometry args={[12.5, 0.1, 12.5]} />
          <meshStandardMaterial color="green" />
          {/* <Edges /> */}
        </mesh>
      </group>
    </>
  );
}

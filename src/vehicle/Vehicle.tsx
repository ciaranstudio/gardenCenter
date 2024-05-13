import { useGLTF } from "@react-three/drei";
import {
  CuboidCollider,
  RapierRigidBody,
  RigidBody,
  RigidBodyProps,
  useRapier,
} from "@react-three/rapier";
import { useControls as useLeva } from "leva";
import {
  forwardRef,
  Fragment,
  RefObject,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Color,
  Group,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  SpotLightHelper,
  Vector3,
  Vector3Tuple,
} from "three";
import { LEVA_KEY } from "./constants";
import { RapierRaycastVehicle, WheelOptions } from "./rapierRaycastVehicle";
import { Helper } from "./Helper";

const BRAKE_LIGHTS_ON_COLOR = new Color(1, 0.05, 0.05).multiplyScalar(1.5);
const BRAKE_LIGHTS_OFF_COLOR = new Color(0x333333);

const REVERSE_ON_COLOR = new Color(0.2, 0.2, 0.2).multiplyScalar(1.5);
const DRIVING_ON_COLOR = new Color(0.05, 0.4, 0.2).multiplyScalar(1.5);

type RaycastVehicleWheel = {
  options: WheelOptions;
  object: RefObject<Object3D>;
};

export type VehicleProps = RigidBodyProps;

export type VehicleRef = {
  chassisRigidBody: RefObject<RapierRigidBody>;
  rapierRaycastVehicle: RefObject<RapierRaycastVehicle>;
  wheels: RaycastVehicleWheel[];
  setBraking: (braking: boolean, reversing: boolean, driving: boolean) => void;
};

export const Vehicle = forwardRef<VehicleRef, VehicleProps>(
  ({ children, ...groupProps }, ref) => {
    const rapier = useRapier();

    const { nodes, materials } = useGLTF("/pmndrsVan.gltf");
    const vehicleRef = useRef<RapierRaycastVehicle>(null!);
    const chassisRigidBodyRef = useRef<RapierRigidBody>(null!);
    const brakeLightsRef = useRef<Mesh>(null!);
    const frontLightsRef = useRef<Mesh>(null!);

    const topLeftWheelObject = useRef<Group>(null!);
    const topRightWheelObject = useRef<Group>(null!);
    const bottomLeftWheelObject = useRef<Group>(null!);
    const bottomRightWheelObject = useRef<Group>(null!);

    const { headlightsSpotLightHelper } = useLeva(`${LEVA_KEY}-headlights`, {
      headlightsSpotLightHelper: false,
    });

    const {
      indexRightAxis,
      indexForwardAxis,
      indexUpAxis,
      directionLocal: directionLocalArray,
      axleLocal: axleLocalArray,
      vehicleWidth,
      vehicleHeight,
      vehicleFront,
      vehicleBack,
      ...levaWheelOptions
    } = useLeva(`${LEVA_KEY}-wheel-options`, {
      radius: 0.5,

      indexRightAxis: 2,
      indexForwardAxis: 0,
      indexUpAxis: 1,

      directionLocal: [0, -1, 0],
      axleLocal: [0, 0, 1],

      suspensionStiffness: 30,
      suspensionRestLength: 0.3,
      maxSuspensionForce: 100000,
      maxSuspensionTravel: 0.3,

      sideFrictionStiffness: 1,
      frictionSlip: 1.4,
      dampingRelaxation: 2.3,
      dampingCompression: 4.4,

      rollInfluence: 0.01,

      customSlidingRotationalSpeed: -30,
      useCustomSlidingRotationalSpeed: true,

      forwardAcceleration: 1,
      sideAcceleration: 1,

      vehicleWidth: 2.8,
      vehicleHeight: -0.1,
      vehicleFront: -1.35,
      vehicleBack: 1.3,
    });

    const directionLocal = useMemo(
      () => new Vector3(...directionLocalArray),
      [directionLocalArray],
    );
    const axleLocal = useMemo(
      () => new Vector3(...axleLocalArray),
      [axleLocalArray],
    );

    const commonWheelOptions = {
      ...levaWheelOptions,
      directionLocal,
      axleLocal,
    };

    const wheels: RaycastVehicleWheel[] = [
      {
        object: topLeftWheelObject,
        options: {
          ...commonWheelOptions,
          chassisConnectionPointLocal: new Vector3(
            vehicleBack,
            vehicleHeight,
            vehicleWidth * 0.5,
          ),
        },
      },
      {
        object: topRightWheelObject,
        options: {
          ...commonWheelOptions,
          chassisConnectionPointLocal: new Vector3(
            vehicleBack,
            vehicleHeight,
            vehicleWidth * -0.5,
          ),
        },
      },
      {
        object: bottomLeftWheelObject,
        options: {
          ...commonWheelOptions,
          chassisConnectionPointLocal: new Vector3(
            vehicleFront,
            vehicleHeight,
            vehicleWidth * 0.5,
          ),
        },
      },
      {
        object: bottomRightWheelObject,
        options: {
          ...commonWheelOptions,
          chassisConnectionPointLocal: new Vector3(
            vehicleFront,
            vehicleHeight,
            vehicleWidth * -0.5,
          ),
        },
      },
    ];

    useImperativeHandle(ref, () => ({
      chassisRigidBody: chassisRigidBodyRef,
      rapierRaycastVehicle: vehicleRef,
      setBraking: (braking: boolean, reversing: boolean, driving: boolean) => {
        const material = brakeLightsRef.current
          .material as MeshStandardMaterial;
        material.color = braking
          ? BRAKE_LIGHTS_ON_COLOR
          : reversing
            ? REVERSE_ON_COLOR
            : driving
              ? DRIVING_ON_COLOR
              : BRAKE_LIGHTS_OFF_COLOR;
      },
      wheels,
    }));

    useEffect(() => {
      vehicleRef.current = new RapierRaycastVehicle({
        world: rapier.world,
        chassisRigidBody: chassisRigidBodyRef.current,
        indexRightAxis,
        indexForwardAxis,
        indexUpAxis,
      });

      for (let i = 0; i < wheels.length; i++) {
        const options = wheels[i].options;
        vehicleRef.current.addWheel(options);
      }

      vehicleRef.current = vehicleRef.current;
    }, [
      chassisRigidBodyRef,
      vehicleRef,
      indexRightAxis,
      indexForwardAxis,
      indexUpAxis,
      directionLocal,
      axleLocal,
      levaWheelOptions,
    ]);

    const [leftHeadlightTarget] = useState(() => {
      const object = new Object3D();
      object.position.set(10, -0.5, -0.7);
      return object;
    });

    const [rightHeadlightTarget] = useState(() => {
      const object = new Object3D();
      object.position.set(10, -0.5, 0.7);
      return object;
    });

    return (
      <>
        <group>
          <RigidBody
            {...groupProps}
            colliders={false}
            ref={chassisRigidBodyRef}
            mass={150}
          >
            {/* Collider */}
            <CuboidCollider args={[2.35, 1.075, 1.1]} position={[0, 0.6, 0]} />

            {/* Headlights */}
            {[
              {
                position: [2.05, 0.5, -0.75] as Vector3Tuple,
                target: leftHeadlightTarget,
              },
              {
                position: [2.05, 0.5, 0.75] as Vector3Tuple,
                target: rightHeadlightTarget,
              },
            ].map(({ position, target }, idx) => (
              <Fragment key={idx}>
                <primitive object={target} />
                <spotLight
                  position={position}
                  target={target}
                  angle={0.8}
                  decay={1}
                  distance={20}
                  castShadow
                  penumbra={1}
                  intensity={20}
                >
                  {headlightsSpotLightHelper && (
                    <Helper type={SpotLightHelper} />
                  )}
                </spotLight>
              </Fragment>
            ))}

            {/* Chassis */}
            <group
              position={[0, -0.25, 0]}
              rotation-y={Math.PI / 2}
              dispose={null}
            >
              <group>
                <group
                  rotation={[Math.PI, 0, Math.PI]}
                  scale={1.75}
                  position={[0, -0.325, 0]}
                >
                  <group position={[0, 0.2, -0.1]}>
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={(nodes.Mesh_body as THREE.Mesh).geometry}
                      material={materials.plastic}
                    >
                      {/* <Edges /> */}
                    </mesh>

                    <mesh
                      castShadow
                      receiveShadow
                      geometry={(nodes.Mesh_body_1 as THREE.Mesh).geometry}
                      material={materials.paintBlue}
                    >
                      <meshStandardMaterial
                        // emissive={"#ffffff"}
                        // emissiveIntensity={0.05}
                        color={"#ffffff"}
                        flatShading
                        metalness={0.25}
                        roughness={0}
                      />
                      {/* <Edges /> */}
                    </mesh>

                    <mesh
                      ref={frontLightsRef}
                      castShadow
                      receiveShadow
                      geometry={(nodes.Mesh_body_2 as THREE.Mesh).geometry}
                      material={materials.lightFront}
                    >
                      <meshStandardMaterial
                        emissive={"#ffffff"}
                        emissiveIntensity={2}
                      />
                    </mesh>

                    <mesh
                      castShadow
                      receiveShadow
                      geometry={(nodes.Mesh_body_3 as THREE.Mesh).geometry}
                      material={materials._defaultMat}
                    />

                    <mesh
                      ref={brakeLightsRef}
                      castShadow
                      receiveShadow
                      geometry={(nodes.Mesh_body_4 as THREE.Mesh).geometry}
                      material={materials.lightBack}
                    >
                      <meshBasicMaterial />
                    </mesh>

                    <mesh
                      castShadow
                      receiveShadow
                      geometry={(nodes.Mesh_body_5 as THREE.Mesh).geometry}
                      material={materials._defaultMat}
                    >
                      <meshPhongMaterial color={"#27271a"} />
                    </mesh>
                  </group>
                  <group position={[-0.35, 0.3, 0.76]} scale={[-1, 1, 1]}>
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={
                        (nodes.Mesh_wheel_frontLeft as THREE.Mesh).geometry
                      }
                      material={materials.carTire}
                    />

                    <mesh
                      castShadow
                      receiveShadow
                      geometry={
                        (nodes.Mesh_wheel_frontLeft_1 as THREE.Mesh).geometry
                      }
                      material={materials._defaultMat}
                    />
                  </group>
                  <group position={[0.35, 0.3, 0.76]}>
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={
                        (nodes.Mesh_wheel_frontLeft as THREE.Mesh).geometry
                      }
                      material={materials.carTire}
                    />

                    <mesh
                      castShadow
                      receiveShadow
                      geometry={
                        (nodes.Mesh_wheel_frontLeft_1 as THREE.Mesh).geometry
                      }
                      material={materials._defaultMat}
                    />
                  </group>
                  <group position={[-0.35, 0.3, -0.76]} scale={[-1, 1, 1]}>
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={
                        (nodes.Mesh_wheel_frontLeft as THREE.Mesh).geometry
                      }
                      material={materials.carTire}
                    />

                    <mesh
                      castShadow
                      receiveShadow
                      geometry={
                        (nodes.Mesh_wheel_frontLeft_1 as THREE.Mesh).geometry
                      }
                      material={materials._defaultMat}
                    />
                  </group>
                  <group position={[0.35, 0.3, -0.76]}>
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={
                        (nodes.Mesh_wheel_frontLeft as THREE.Mesh).geometry
                      }
                      material={materials.carTire}
                    />

                    <mesh
                      castShadow
                      receiveShadow
                      geometry={
                        (nodes.Mesh_wheel_frontLeft_1 as THREE.Mesh).geometry
                      }
                      material={materials._defaultMat}
                    />
                  </group>
                </group>
              </group>

              {children}
            </group>
          </RigidBody>
        </group>
      </>
    );
  },
);

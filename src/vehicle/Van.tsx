import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useBeforePhysicsStep } from "@react-three/rapier";
import { useControls as useLeva } from "leva";
import { useEffect, useRef } from "react";
import { Object3D, Object3DEventMap, Quaternion, Vector3 } from "three";
import { Vehicle, VehicleRef } from "./Vehicle";
import { AFTER_RAPIER_UPDATE, LEVA_KEY } from "./constants";
import styled from "styled-components";
import { SpeedTextTunnel } from "../controls/SpeedTextTunnel";
import useGame from "../store/useGame";
import Placeholder from "../loading/Placeholder";

const Text = styled.div`
  width: 100%;
  text-align: center;
  font-size: 2em;
  color: white;
  font-family: sans-seri;
`;

// const ControlsText = styled(Text)`
//   position: absolute;
//   bottom: 4em;
//   left: 0;
// `;

const SpeedText = styled(Text)`
  position: absolute;
  bottom: 4svh;
  left: 0;
  font-size: 2svh;
  font-family: var(--leva-fonts-mono);
`;

const cameraIdealOffset = new Vector3();
const cameraIdealLookAt = new Vector3();
const chassisTranslation = new Vector3();
const chassisRotation = new Quaternion();

export default function Van() {
  const startingPositionY = 4;
  Object3D<Object3DEventMap>;
  const raycastVehicle = useRef<VehicleRef>(null);
  const currentSpeedTextDiv = useRef<HTMLDivElement>(null);
  const camera = useThree((state) => state.camera);
  const currentCameraPosition = useRef(new Vector3(15, 15, 0));
  const currentCameraLookAt = useRef(new Vector3());
  const dirLight: any = useRef();

  const { cameraMode } = useLeva(`${LEVA_KEY}-camera`, {
    cameraMode: {
      value: "drive",
      options: ["drive", "orbit"],
    },
  });

  const { maxForce, maxSteer, maxBrake } = useLeva(`${LEVA_KEY}-controls`, {
    maxForce: 45,
    maxSteer: 10,
    maxBrake: 1,
  });

  const gasToggle = useGame((state: any) => state.gasOn);
  const reverseToggle = useGame((state: any) => state.reverseOn);
  const brakeToggle = useGame((state: any) => state.brakeOn);
  const leftToggle = useGame((state: any) => state.leftOn);
  const rightToggle = useGame((state: any) => state.rightOn);
  const jumpToggle = useGame((state: any) => state.jumpOn);

  useBeforePhysicsStep((world) => {
    if (
      !raycastVehicle.current ||
      !raycastVehicle.current.rapierRaycastVehicle.current
    ) {
      return;
    }

    const {
      wheels,
      rapierRaycastVehicle: { current: vehicle },
      setBraking,
    } = raycastVehicle.current;

    // update wheels from controls
    let engineForce = 0;
    let steering = 0;

    if (gasToggle) {
      engineForce += maxForce;
    }
    if (reverseToggle) {
      engineForce -= maxForce;
    }

    if (leftToggle) {
      steering += maxSteer;
    }
    if (rightToggle) {
      steering -= maxSteer;
    }
    if (jumpToggle) {
      reset();
      // const { x, y, z } =
      //   raycastVehicle.current.rapierRaycastVehicle.current.chassisRigidBody.translation();
      // raycastVehicle.current.rapierRaycastVehicle.current.chassisRigidBody.setTranslation(
      //   { x: x, y: y + 0.15, z: z },
      //   true
      // );
      // raycastVehicle.current.rapierRaycastVehicle.current.chassisRigidBody.applyImpulse(
      //   { x: 0, y: 10, z: 0 },
      //   true,
      // );
      // raycastVehicle.current.rapierRaycastVehicle.current.chassisRigidBody.applyTorqueImpulse(
      //   { x: 20, y: 0, z: 10 },
      //   true,
      // );
      // raycastVehicle.current.rapierRaycastVehicle.current.chassisRigidBody.setAdditionalMass();
    }

    const brakeForce = brakeToggle ? maxBrake : 0;

    for (let i = 0; i < vehicle.wheels.length; i++) {
      vehicle.setBrakeValue(brakeForce, i);
    }

    // steer front wheels
    vehicle.setSteeringValue(steering, 0);
    vehicle.setSteeringValue(steering, 1);

    // apply engine force to back wheels
    vehicle.applyEngineForce(engineForce, 2);
    vehicle.applyEngineForce(engineForce, 3);

    // update the vehicle
    vehicle.update(world.timestep);

    // update the wheels
    for (let i = 0; i < vehicle.wheels.length; i++) {
      const wheelObject = wheels[i].object.current;
      if (!wheelObject) continue;

      const wheelState = vehicle.wheels[i].state;
      wheelObject.position.copy(wheelState.worldTransform.position);
      wheelObject.quaternion.copy(wheelState.worldTransform.quaternion);
    }

    // update speed text
    if (currentSpeedTextDiv.current) {
      const km = Math.abs(
        vehicle.state.currentVehicleSpeedKmHour / 2,
      ).toFixed();
      currentSpeedTextDiv.current.innerText = `${km} km/h`;
    }

    // update brake lights
    setBraking(brakeForce > 0, reverseToggle, gasToggle);
  });

  useFrame((_, delta) => {
    if (cameraMode !== "drive") return;

    const chassis = raycastVehicle.current?.chassisRigidBody;
    if (!chassis?.current) return;

    chassisRotation.copy(chassis.current.rotation() as Quaternion);
    chassisTranslation.copy(chassis.current.translation() as Vector3);

    const t = 1.0 - Math.pow(0.01, delta);

    cameraIdealOffset.set(-10, 3, 0);
    cameraIdealOffset.applyQuaternion(chassisRotation);
    cameraIdealOffset.add(chassisTranslation);

    if (cameraIdealOffset.y < 0) {
      cameraIdealOffset.y = 0.5;
    }

    cameraIdealLookAt.set(0, 1, 0);
    cameraIdealLookAt.applyQuaternion(chassisRotation);
    cameraIdealLookAt.add(chassisTranslation);

    currentCameraPosition.current.lerp(cameraIdealOffset, t);
    currentCameraLookAt.current.lerp(cameraIdealLookAt, t);

    camera.position.copy(currentCameraPosition.current);
    camera.lookAt(currentCameraLookAt.current);
  }, AFTER_RAPIER_UPDATE);

  // phase updates
  const start = useGame((state) => state.start);
  const end = useGame((state) => state.end);
  const restart = useGame((state) => state.restart);

  const toggleGasOff = useGame((state) => state.toggleGasOff);
  const toggleReverseOff = useGame((state) => state.toggleReverseOff);
  const toggleBrakeOn = useGame((state) => state.toggleBrakeOn);
  const toggleRightOff = useGame((state) => state.toggleRightOff);
  const toggleLeftOff = useGame((state) => state.toggleLeftOff);
  const toggleJumpOff = useGame((state) => state.toggleJumpOff);

  const resetStoreControls = () => {
    toggleGasOff();
    toggleReverseOff();
    toggleBrakeOn();
    toggleRightOff();
    toggleLeftOff();
    toggleJumpOff();
  };

  const reset = () => {
    resetStoreControls();
    raycastVehicle.current?.chassisRigidBody.current?.setTranslation(
      { x: 0, y: startingPositionY, z: 0 },
      true,
    );
    raycastVehicle.current?.chassisRigidBody.current?.setRotation(
      {
        x: 0,
        y: 0,
        z: 0,
        w: 1,
      },
      true,
    );
    // reset car control values and forces / velocity
    raycastVehicle.current?.chassisRigidBody.current?.setLinvel(
      { x: 0, y: 0, z: 0 },
      true,
    );
    raycastVehicle.current?.chassisRigidBody.current?.setAngvel(
      { x: 0, y: 0, z: 0 },
      true,
    );
    raycastVehicle.current?.chassisRigidBody.current?.resetForces(true);
    raycastVehicle.current?.chassisRigidBody.current?.resetTorques(true);
  };

  useEffect(() => {
    console.log(raycastVehicle.current?.chassisRigidBody.current);
    const unsubscribeReset = useGame.subscribe(
      (state) => state.phase,
      (value) => {
        if (value === "ready") reset();
      },
    );

    const unsubscribeGasStart = useGame.subscribe(
      (state) => state.gasOn,
      (value) => {
        if (value === true) start();
      },
    );

    const unsubscribeReverseStart = useGame.subscribe(
      (state) => state.reverseOn,
      (value) => {
        if (value === true) start();
      },
    );

    return () => {
      unsubscribeReset();
      unsubscribeReverseStart;
      unsubscribeGasStart();
    };
  }, []);

  useFrame(() => {
    if (raycastVehicle.current) {
      const bodyPosition =
        raycastVehicle.current?.chassisRigidBody.current?.translation();
      /**
       * Phases
       */
      if (
        bodyPosition!.z > 80 ||
        bodyPosition!.z < -80 ||
        bodyPosition!.x > 80 ||
        bodyPosition!.x < -80
      )
        end();
      if (bodyPosition!.y < -20) restart();
    }
  });

  return (
    <>
      <SpeedTextTunnel.In>
        <SpeedText ref={currentSpeedTextDiv} />
      </SpeedTextTunnel.In>

      <Suspense fallback={<Placeholder />}>
        {/* raycast vehicle */}
        <Vehicle
          ref={raycastVehicle}
          position={[0, startingPositionY, 0]}
          rotation={[0, -Math.PI / 2, 0]}
        />
      </Suspense>
      <directionalLight
        ref={dirLight}
        castShadow
        position={[50, 30, 50]}
        intensity={5}
        target-position={[0, 0, 0]}
      />

      {cameraMode === "orbit" && <OrbitControls />}
    </>
  );
}

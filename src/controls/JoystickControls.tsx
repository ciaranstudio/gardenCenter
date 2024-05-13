import { EcctrlJoystick } from "ecctrl";
import useGame from "../store/useGame";
import { useLoadingAssets } from "../hooks/useLoadingAssets";
import { useState, useEffect } from "react";
export interface CustomJoystickProps {}

export default function EcctrlJoystickControls() {
  // useState
  const [showControls, setShowControls] = useState(false);

  // state from store
  const gasToggle = useGame((state: any) => state.gasOn);
  const reverseToggle = useGame((state: any) => state.reverseOn);
  const brakeToggle = useGame((state: any) => state.brakeOn);
  const jumpToggle = useGame((state: any) => state.jumpOn);
  const joystickToggle = useGame((state: any) => state.joystickOn);

  // loading hook
  const loading = useLoadingAssets();

  useEffect(() => {
    if (!loading) {
      window.setTimeout(() => {
        setShowControls(true);
      }, 500);
    }
  }, [loading]);

  return (
    <>
      {joystickToggle && showControls && (
        <EcctrlJoystick
          buttonNumber={4}
          buttonGroup1Position={[-2, 0, 0]}
          buttonGroup2Position={[1, 0, 0]}
          buttonGroup3Position={[-0.5, -2.1, 0]}
          buttonGroup4Position={[-0.5, 2.1, 0]}
          buttonTop1Props={{ visible: reverseToggle }}
          buttonTop2Props={{ visible: gasToggle }}
          buttonTop3Props={{ visible: brakeToggle }}
          buttonTop4Props={{ visible: jumpToggle }}
        />
      )}
    </>
  );
}

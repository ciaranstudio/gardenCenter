import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export interface useGameProps {
  joystickOn: boolean;
  gasOn: boolean;
  reverseOn: boolean;
  brakeOn: boolean;
  leftOn: boolean;
  rightOn: boolean;
  jumpOn: boolean;
  startTime: number;
  endTime: number;
  phase: string;
  start: () => void;
  restart: () => void;
  end: () => void;
  toggleJoystickOn: () => void;
  toggleJoystickOff: () => void;
  toggleGasOn: () => void;
  toggleGasOff: () => void;
  toggleReverseOn: () => void;
  toggleReverseOff: () => void;
  toggleBrakeOn: () => void;
  toggleBrakeOff: () => void;
  toggleJumpOn: () => void;
  toggleJumpOff: () => void;
}

export default create(
  subscribeWithSelector((store: any) => {
    return {
      /**
       * time
       */
      startTime: 0,
      endTime: 0,

      /**
       * vehicle features in current use (set by toggle functions below)
       */
      joystickOn: false,
      gasOn: false,
      reverseOn: false,
      brakeOn: true,
      leftOn: false,
      rightOn: false,
      jumpOn: false,

      /**
       * phases
       */
      phase: "ready",

      start: () => {
        store((state: { phase: string }) => {
          if (state.phase === "ready")
            return { phase: "playing", startTime: Date.now() };

          return {};
        });
      },

      restart: () => {
        store((state: { phase: string }) => {
          if (state.phase === "playing" || state.phase === "ended")
            return {
              phase: "ready",
            };

          return {};
        });
      },

      end: () => {
        store((state: { phase: string }) => {
          if (state.phase === "playing")
            return { phase: "ended", endTime: Date.now() };
          return {};
        });
      },

      /**
       * toggle vehicle in use features (on/off) state values functions
       */

      toggleJoystickOn: () => {
        store(() => {
          return { joystickOn: true };
        });
      },

      toggleJoystickOff: () => {
        store(() => {
          return { joystickOn: false };
        });
      },
      toggleGasOn: () => {
        store(() => {
          return { gasOn: true };
        });
      },

      toggleGasOff: () => {
        store(() => {
          return { gasOn: false };
        });
      },

      toggleReverseOn: () => {
        store(() => {
          return { reverseOn: true };
        });
      },

      toggleReverseOff: () => {
        store(() => {
          return { reverseOn: false };
        });
      },

      toggleBrakeOn: () => {
        store(() => {
          return { brakeOn: true };
        });
      },

      toggleBrakeOff: () => {
        store(() => {
          return { brakeOn: false };
        });
      },

      toggleRightOn: () => {
        store(() => {
          return { rightOn: true };
        });
      },

      toggleRightOff: () => {
        store(() => {
          return { rightOn: false };
        });
      },

      toggleLeftOn: () => {
        store(() => {
          return { leftOn: true };
        });
      },

      toggleLeftOff: () => {
        store(() => {
          return { leftOn: false };
        });
      },
      toggleJumpOn: () => {
        store(() => {
          return { jumpOn: true };
        });
      },

      toggleJumpOff: () => {
        store(() => {
          return { jumpOn: false };
        });
      },
    };
  }),
);

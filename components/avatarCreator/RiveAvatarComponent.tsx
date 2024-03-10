"use client";

import { useEffect, useContext, useRef, useState, forwardRef } from "react";
import { useRive, useStateMachineInput, Layout, Alignment } from "@rive-app/react-canvas";
import { AvatarStateContext } from "@/app/context/avatarState";

const STATE_MACHINE_NAME = "State Machine 1";

const RiveAvatarComponent = forwardRef((props, ref) => {
  const { rive, RiveComponent } = useRive({
    src: "/avatar.riv",
    artboard: "Avatar",
    stateMachines: [STATE_MACHINE_NAME],
    layout: new Layout({
      alignment: Alignment.TopCenter,
    }),
    autoplay: true,
  });

  const {
    state: { riveAvatarSelections },
  } = useContext(AvatarStateContext);

  const numBodyColor = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    "numBodyColor"
  );
  const numBodySize = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    "numBodySize"
  );
  const numBodyEyes = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    "numBodyEyes"
  );
  const numBodyHair = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    "numBodyHair"
  );
  const numBodyFaceHair = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    "numBodyFaceHair"
  );
  const numBackgroundColor = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    "numBackgroundColor"
  );

  const changesTrigger = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    "changes"
  );

  const avatarRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (
      rive &&
      numBodyColor &&
      numBodySize &&
      numBodyEyes &&
      numBodyHair &&
      numBodyFaceHair &&
      numBackgroundColor &&
      changesTrigger
    ) {
      numBodyColor.value = riveAvatarSelections["BodyColor"];
      numBodySize.value = riveAvatarSelections["BodySize"];
      numBodyEyes.value = riveAvatarSelections["BodyEyes"];
      numBodyHair.value = riveAvatarSelections["BodyHair"];
      numBodyFaceHair.value = riveAvatarSelections["BodyFaceHair"];
      numBackgroundColor.value = riveAvatarSelections["BackgroundColor"];
      changesTrigger.fire();
      setIsReady(true);
    }
  }, [
    rive, 
    numBodyColor, 
    numBodySize, 
    numBodyEyes, 
    numBodyHair, 
    numBodyFaceHair, 
    numBackgroundColor, 
    changesTrigger, 
    riveAvatarSelections
  ]);

  return (
    //@ts-ignore
    <div className="w-full h-full p-5" ref={ref}> {/* Changed to use the forwarded ref */}
      <div className="bg-blue-400 w-full h-full" ref={avatarRef}>
        <RiveComponent className="bg-white dark:bg-black w-full h-full" />
      </div>
    </div>
  );
});

RiveAvatarComponent.displayName = 'RiveAvatarComponent';

export default RiveAvatarComponent;
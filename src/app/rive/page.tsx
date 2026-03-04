"use client";
import React from "react";
import { useRive } from "@rive-app/react-canvas";

export default function TestJoystick() {
  const { RiveComponent } = useRive({
    src: "/joystick.riv",
    artboard: "New Artboard",
    stateMachines: "Joystick",
    autoplay: true,
  });


  return (
    <div style={{ width: 100, height: 100 }}>
      {RiveComponent && <RiveComponent />}
    </div>
  );
}

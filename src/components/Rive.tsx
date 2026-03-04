"use client";
import React, { useRef } from "react";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";

const STATE_MACHINE_NAME = "Joystick";
const BOOLEAN_INPUT_NAME = "Hold";

const REDIRECT_URL =
  "https://jup.ag/tokens/SENDdRQtYMWaQrBroBrJ2Q53fgVuq95CV9UPGEvpCxa";

export default function TestJoystick() {
  const { rive, RiveComponent } = useRive({
    src: "/joystick-2.riv",
    artboard: "New Artboard",
    stateMachines: STATE_MACHINE_NAME,
    autoplay: true,
  });

  const holdInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    BOOLEAN_INPUT_NAME
  );

  const timeoutRef = useRef<number | null>(null);
  const hasRedirectedRef = useRef(false);
  const isDraggingRef = useRef(false);

  const handleStart = () => {
    isDraggingRef.current = true;
    if (holdInput) holdInput.value = true;

    // Clear any existing redirect flag when starting a new drag
    hasRedirectedRef.current = false;

    // Clear any pending timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleEnd = () => {
    if (isDraggingRef.current && !hasRedirectedRef.current) {
      isDraggingRef.current = false;
      hasRedirectedRef.current = true;

      // Set dragging to false
      if (holdInput) holdInput.value = false;

      // Play sound
      const audio = new Audio("/joystick-sound.mov");
      audio.play().catch((e) => console.error("Audio play failed:", e));

      // Redirect after a short delay
      timeoutRef.current = window.setTimeout(() => {
        window.open(REDIRECT_URL, "_blank");
      }, 500);
    }
  };

  const handleLeave = () => {
    // Reset dragging state if interaction leaves while dragging
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      if (holdInput) holdInput.value = false;
    }
  };

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart();
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    handleEnd();
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    e.preventDefault();
    handleLeave();
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    handleStart();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    handleEnd();
  };

  const handleTouchCancel = (e: React.TouchEvent) => {
    e.preventDefault();
    handleLeave();
  };

  return (
    <div
      className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-[100px] xl:h-[100px]"
      style={{
        cursor: "grab",
        touchAction: "none", // Prevents default touch behaviors like scrolling
      }}
      // Mouse events
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      // Touch events
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
    >
      {RiveComponent && <RiveComponent />}
    </div>
  );
}

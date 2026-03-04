"use client";
import React, { useRef } from "react";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";

const STATE_MACHINE_NAME = "State Machine 1";
const BOOLEAN_INPUT_NAME = "isDragging";

// Jupiter redirect commented out — joystick now changes the monitor video
// const REDIRECT_URL =
//   "https://jup.ag/tokens/SENDdRQtYMWaQrBroBrJ2Q53fgVuq95CV9UPGEvpCxa";

interface RiveJoystickProps {
  onInteract?: () => void;
}

export default function RiveJoystick({ onInteract }: RiveJoystickProps) {
  const { rive, RiveComponent } = useRive({
    src: "/arcade_control-joystick.riv",
    artboard: "joystick",
    stateMachines: STATE_MACHINE_NAME,
    autoplay: true,
  });

  const isDraggingInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    BOOLEAN_INPUT_NAME
  );

  const timeoutRef = useRef<number | null>(null);
  const hasRedirectedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartedRef = useRef(false);
  const touchStartTimeRef = useRef<number>(0);
  const divRef = useRef<HTMLDivElement>(null);

  // Safari-compatible redirect function
  // Jupiter redirect commented out — joystick now changes the monitor video
  // const performRedirect = () => {
  //   if (hasRedirectedRef.current) return;
  //   hasRedirectedRef.current = true;
  //   try {
  //     const audio = new Audio("/joystick-sound.mov");
  //     audio.play().catch((e) => console.error("Audio play failed:", e));
  //   } catch (e) {
  //     console.error("Audio creation failed:", e);
  //   }
  //   const tryAppOpen = () => {
  //     const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  //     if (isMobile) {
  //       const appUrl = `jupiter://open?inputMint=So11111111111111111111111111111111111111112&outputMint=SENDdRQtYMWaQrBroBrJ2Q53fgVuq95CV9UPGEvpCxa`;
  //       const iframe = document.createElement("iframe");
  //       iframe.style.display = "none";
  //       iframe.src = appUrl;
  //       document.body.appendChild(iframe);
  //       setTimeout(() => {
  //         document.body.removeChild(iframe);
  //         window.open(REDIRECT_URL, "_blank");
  //       }, 1000);
  //     } else {
  //       window.open(REDIRECT_URL, "_blank");
  //     }
  //   };
  //   tryAppOpen();
  // };

  const performInteraction = () => {
    if (hasRedirectedRef.current) return;
    hasRedirectedRef.current = true;

    // Play sound
    try {
      const audio = new Audio("/joystick-sound.mov");
      audio.play().catch((e) => console.error("Audio play failed:", e));
    } catch (e) {
      console.error("Audio creation failed:", e);
    }

    // Change the video on the monitor
    onInteract?.();
  };

  const handleStart = () => {
    console.log("Drag started");
    isDraggingRef.current = true;
    dragStartedRef.current = true;
    touchStartTimeRef.current = Date.now();

    if (isDraggingInput) isDraggingInput.value = true;

    hasRedirectedRef.current = false;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleEnd = () => {
    const touchDuration = Date.now() - touchStartTimeRef.current;
    console.log("Drag ended", {
      isDragging: isDraggingRef.current,
      dragStarted: dragStartedRef.current,
      hasRedirected: hasRedirectedRef.current,
      touchDuration,
    });

    // Only redirect if we actually started dragging and haven't redirected yet
    // Reduced minimum duration for better responsiveness
    if (
      dragStartedRef.current &&
      !hasRedirectedRef.current &&
      touchDuration > 30 // Reduced from 50ms for better responsiveness
    ) {
      isDraggingRef.current = false;
      dragStartedRef.current = false;

      if (isDraggingInput) isDraggingInput.value = false;

      console.log("Changing video...");
      // Safari requires immediate action - no setTimeout
      performInteraction();
    }
  };

  const handleLeave = () => {
    console.log("Drag left/cancelled");

    if (isDraggingRef.current && dragStartedRef.current) {
      handleEnd();
    } else {
      isDraggingRef.current = false;
      dragStartedRef.current = false;
      if (isDraggingInput) isDraggingInput.value = false;
    }
  };

  // Simplified mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleStart();
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleEnd();
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    e.preventDefault();
    handleLeave();
  };

  // Simplified touch event handlers for better Safari compatibility
  const handleTouchStart = (e: React.TouchEvent) => {
    console.log("Touch start detected");
    e.stopPropagation(); // Don't prevent default to maintain Safari compatibility

    if (e.touches.length === 1) {
      handleStart();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    console.log("Touch end detected");
    e.stopPropagation(); // Don't prevent default to maintain Safari compatibility

    if (e.touches.length === 0) {
      handleEnd();
    }
  };

  const handleTouchCancel = (e: React.TouchEvent) => {
    console.log("Touch cancelled");
    e.stopPropagation();
    handleLeave();
  };

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={divRef}
      className="w-16 h-16 lg:w-[100px] lg:h-[100px]"
      style={{
        cursor: "grab",
        touchAction: "manipulation", // Changed from "none" for better Safari compatibility
        userSelect: "none",
        WebkitUserSelect: "none",
        WebkitTouchCallout: "none",
        WebkitTapHighlightColor: "transparent",
        msUserSelect: "none",
        MozUserSelect: "none",
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

"use client";
import React, { useRef, useState, useEffect } from "react";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";

const STATE_MACHINE_NAME = "State Machine 1";
const NUMBER_INPUT_NAME = "Sound_level";

export default function TestSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  const { rive, RiveComponent } = useRive({
    src: "/sound_icon_2.riv",
    artboard: "Artboard",
    stateMachines: STATE_MACHINE_NAME,
    autoplay: true,
  });

  const soundLevelInput = useStateMachineInput(
    rive ?? null,
    STATE_MACHINE_NAME,
    NUMBER_INPUT_NAME
  );

  // 🟢 Simulate sound levels
  useEffect(() => {
    if (!soundLevelInput) return;

    let intervalId: ReturnType<typeof setInterval> | null = null;

    if (isPlaying) {
      intervalId = setInterval(() => {
        soundLevelInput.value = Math.floor(Math.random() * 100);
      }, 100);
    } else {
      soundLevelInput.value = 0;
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying, soundLevelInput]);

  // 🟡 Setup audio on mount
  useEffect(() => {
    const initAudio = async () => {
      try {
        audioRef.current = new Audio();
        audioRef.current.src = "/pixel-dreams.mp3";
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;
        audioRef.current.muted = true;

        audioRef.current.addEventListener("canplay", async () => {
          setIsAudioLoaded(true);
          try {
            await audioRef.current!.play(); // silently pre-load audio
            console.log("Audio preloaded silently");
          } catch (err) {
            console.warn("Muted autoplay failed:", err);
          }
        });

        audioRef.current.load();
      } catch (error) {
        console.error("Error initializing audio:", error);
      }
    };

    initAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // 🟠 Manual toggle via icon
  const toggleMusic = async () => {
    if (!audioRef.current || !isAudioLoaded) return;

    try {
      if (!userInteracted) {
        setUserInteracted(true);
        audioRef.current.muted = false;
      }

      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error("Error toggling audio:", err);
    }
  };

  return (
    <div
      className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 xl:w-[60px] xl:h-[60px]"
      style={{
        cursor: "pointer",
        opacity: isAudioLoaded ? 1 : 0.5,
        touchAction: "none",
      }}
      onClick={toggleMusic}
      title={
        !isAudioLoaded
          ? "Loading..."
          : isPlaying
          ? "Click to pause"
          : "Click to play"
      }
    >
      {RiveComponent && <RiveComponent />}
    </div>
  );
}

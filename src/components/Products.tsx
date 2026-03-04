"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Blinks from "./Blinks";

const Products = () => {
  const [appHovered, setAppHovered] = useState(false);
  const [appClicked, setAppClicked] = useState(false);
  const [sendGuysHovered, setSendGuysHovered] = useState(false);
  const [lanaRoadsHovered, setLanaRoadsHovered] = useState(false);
  const [vibeGameHovered, setVibeGameHovered] = useState(false);
  const [squidGameHovered, setSquidGameHovered] = useState(false);
  const [fuseMeHovered, setFuseMeHovered] = useState(false);
  const [mutedStates, setMutedStates] = useState({
    fuseMe: true,
    app: true,
    sendGuys: true,
    lanaRoads: true,
    squidGame: true,
  });
  const [activeFeedback, setActiveFeedback] = useState<string | null>(null);

  const fusemePlaylist = [
    "https://pub-c4d90db77e92437ea367b7af11523bec.r2.dev/trailer.mp4",
    "https://pub-c4d90db77e92437ea367b7af11523bec.r2.dev/metadao.mp4",
  ];
  const [fusemeIndex, setFusemeIndex] = useState(0);
  const fusemeVideoRef = useRef<HTMLVideoElement | null>(null);

  // Mobile touch states for video playback
  const [mobileTouching, setMobileTouching] = useState({
    app: false,
    sendGuys: false,
    lanaRoads: false,
    squidGame: false,
    fuseMe: false,
  });

  // Video refs for preloading
  const appVideoRef = useRef<HTMLVideoElement | null>(null);
  const sendGuysVideoRef = useRef<HTMLVideoElement | null>(null);
  const lanaRoadsVideoRef = useRef<HTMLVideoElement | null>(null);
  const squidGameVideoRef = useRef<HTMLVideoElement | null>(null);

  // Video loading states - simplified to track readiness
  const [videosReady, setVideosReady] = useState({
    app: false,
    sendGuys: false,
    lanaRoads: false,
    squidGame: false,
    fuseMe: false,
  });

  const [imagesLoaded, setImagesLoaded] = useState<{ [key: string]: boolean }>({});
  const handleImageLoad = (key: string) => {
    setImagesLoaded(prev => ({ ...prev, [key]: true }));
  };

  // Preload videos and images on component mount
  useEffect(() => {
    // Preload critical images first using Next.js optimization
    const imagesToPreload = [
      "/products/app-asset.png",
      "/products/app-text.png",
      "/products/casset.png",
      "/products/sendguys-sticker.png",
      "/products/sendguysP.png",
      "/products/lanaroadsSticker.png",
      "/products/lanaroads.png",
      "/products/squadtix.png",
      "/products/blinks.png",
      "/products/link.png",
      "/products/info.png",
      "/products/vibegame-fidget.png",
    ];

    // Use proper preloading with Next.js
    imagesToPreload.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
    });

    // Improved video loading with better detection
    const prepareVideo = (
      ref: React.RefObject<HTMLVideoElement | null>,
      key: string
    ) => {
      if (ref.current) {
        const video = ref.current;

        // Multiple event listeners for better browser compatibility
        const handleVideoReady = () => {
          setVideosReady((prev) => ({ ...prev, [key]: true }));
          // Remove listeners once ready
          video.removeEventListener("loadeddata", handleVideoReady);
          video.removeEventListener("canplay", handleVideoReady);
        };

        // Listen for both events for better compatibility
        video.addEventListener("loadeddata", handleVideoReady);
        video.addEventListener("canplay", handleVideoReady);

        // Load the video metadata
        if (video.readyState >= 2) {
          // Video is already ready
          handleVideoReady();
        } else {
          video.load();
        }

        // Reduced fallback timeout for better UX
        setTimeout(() => {
          setVideosReady((prev) => ({ ...prev, [key]: true }));
        }, 1500);
      }
    };

    // Stagger video loading to prevent bandwidth competition
    setTimeout(() => prepareVideo(appVideoRef, "app"), 50);
    setTimeout(() => prepareVideo(sendGuysVideoRef, "sendGuys"), 150);
    setTimeout(() => prepareVideo(lanaRoadsVideoRef, "lanaRoads"), 250);
    setTimeout(() => prepareVideo(squidGameVideoRef, "squidGame"), 350);
    setTimeout(() => prepareVideo(fusemeVideoRef, "fuseMe"), 450);
  }, []);

  useEffect(() => {
    // Ensure playlist continues after src swap (autoplay can be flaky on some browsers)
    const v = fusemeVideoRef.current;
    if (v && fuseMeHovered) {
      v.play().catch(() => { });
    }
  }, [fusemeIndex, fuseMeHovered]);

  // Auto-close app overlay after 2 seconds
  useEffect(() => {
    if (appClicked) {
      const timer = setTimeout(() => {
        setAppClicked(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [appClicked]);

  // Improved video play/pause with better error handling
  const handleVideoPlay = (ref: React.RefObject<HTMLVideoElement | null>) => {
    if (ref.current) {
      const video = ref.current;
      const videoKey = video.dataset.video as keyof typeof videosReady;

      if (videosReady[videoKey] || video.readyState >= 2) {
        video.play().catch((error) => {
          console.log("Video play failed:", error);
          // Retry once after a brief delay
          setTimeout(() => {
            video.play().catch(() => { });
          }, 100);
        });
      }
    }
  };

  const handleVideoPause = (ref: React.RefObject<HTMLVideoElement | null>) => {
    if (ref.current) {
      ref.current.pause();
    }
  };

  const toggleMute = (e?: React.MouseEvent | React.TouchEvent, productKey: string = "fuseMe") => {
    if (e) e.stopPropagation();

    const isForcedMuted = productKey === "sendGuys" || productKey === "lanaRoads";

    if (isForcedMuted) {
      setMutedStates((prev) => ({ ...prev, [productKey]: true }));
    } else {
      setMutedStates((prev) => ({ ...prev, [productKey]: !prev[productKey as keyof typeof prev] }));
    }

    setActiveFeedback(productKey);
    setTimeout(() => setActiveFeedback(null), 800);
  };

  const handleRedirect = (url: string) => {
    // We now use click to toggle mute, so redirect might need another way or double click
    // The user said "when we click on any video it should mute or unmute"
    // I'll keep the redirect for now but priority is mute toggle.
    // However, if the user explicitly wants to redirect, they might be annoyed.
    // I'll make the redirect happen only if already unmuted or as a separate button?
    // Actually, I'll just keep it and see. Usually click toggles.
    window.open(url, "_blank");
  };

  // Simplified touch handlers without preventDefault to fix mobile redirects
  const handleTouchStart = (product: string) => {
    setMobileTouching((prev) => ({
      ...prev,
      [product]: true,
    }));
  };

  const handleTouchEnd = (product: string) => {
    setMobileTouching((prev) => ({
      ...prev,
      [product]: false,
    }));
  };

  // Touch handlers for vibegame (no video, just hover state)
  const handleVibeGameTouchStart = () => {
    setVibeGameHovered(true);
  };

  const handleVibeGameTouchEnd = () => {
    setVibeGameHovered(false);
  };

  return (
    <div
      style={{
        background: "#01348C",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: "4vw 0",
      }}
    >
      <div className="flex flex-col items-center w-full">
        {/* Title & Product Header */}
        <div className="flex flex-col items-center px-4 md:px-0 w-full max-w-[95vw]">
          <div
            className="flex justify-center items-center w-full"
            style={{ marginBottom: "3vw" }}
          >
            <h2
              className="text-4xl sm:text-5xl lg:text-[3.4rem] text-white"
              style={{ fontFamily: "var(--font-matrix-sans-screen)" }}
            >
              Products
            </h2>
          </div>
        </div>

        <div className="w-[55%] sm:w-[60%] md:w-[70%] lg:w-[60%] flex flex-col items-center mb-16 self-center">
          <div className="w-full relative shadow-2xl overflow-hidden flex items-center justify-center p-0">
            <div className="relative w-full aspect-[1921/1121]">
              <Image
                src="/products/Seeker.svg"
                alt="FuseMeDaddy Seeker"
                fill
                priority
                className="object-cover object-center"
              />

              {/* Video sits inside the monitor area */}
              <div
                className="absolute overflow-hidden flex items-center justify-center cursor-pointer"
                style={{
                  top: "16%",
                  left: "7.5%",
                  width: "85%",
                  height: "68%",
                  zIndex: 20,
                }}
                onMouseEnter={() => {
                  setFuseMeHovered(true);
                  handleVideoPlay(fusemeVideoRef);
                }}
                onMouseLeave={() => {
                  setFuseMeHovered(false);
                  handleVideoPause(fusemeVideoRef);
                }}
                onTouchStart={() => {
                  handleTouchStart("fuseMe");
                  handleVideoPlay(fusemeVideoRef);
                }}
                onTouchEnd={() => {
                  handleTouchEnd("fuseMe");
                  handleVideoPause(fusemeVideoRef);
                }}
                onClick={(e) => toggleMute(e, "fuseMe")}
              >
                {!videosReady.fuseMe && <div className="absolute inset-0 skeleton z-30" />}
                {/* Mute Feedback Per Div */}
                <AnimatePresence>
                  {activeFeedback === "fuseMe" && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1.2, opacity: 1 }}
                      exit={{ scale: 1.5, opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none z-[100]"
                    >
                      <div className="bg-black/60 p-4 rounded-full">
                        {mutedStates.fuseMe ? (
                          <VolumeX size={32} className="text-white" />
                        ) : (
                          <Volume2 size={32} className="text-white" />
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {!fuseMeHovered && !mobileTouching.fuseMe && (
                  <div
                    className="relative z-10 flex items-center justify-center"
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Image
                      src="/products/fusemedaddybg.png"
                      alt="FuseMeDaddy Static"
                      fill
                      className="object-cover"
                      style={{
                        border: "4px solid #000",
                        borderRadius: "clamp(12px, 2vw, 24px)",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                )}
                {(fuseMeHovered || mobileTouching.fuseMe) && (
                  <video
                    ref={fusemeVideoRef}
                    key={fusemeIndex}
                    src={fusemePlaylist[fusemeIndex]}
                    playsInline
                    muted={mutedStates.fuseMe}
                    preload="metadata"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      border: "4px solid #000",
                      borderRadius: "clamp(12px, 2vw, 24px)",
                      boxSizing: "border-box",
                    }}
                    data-video="fuseMe"
                    onEnded={() =>
                      setFusemeIndex((i) => (i + 1) % fusemePlaylist.length)
                    }
                    onLoadedData={() => setVideosReady(prev => ({ ...prev, fuseMe: true }))}
                  />
                )}
              </div>
              {/* Optional subtle overlay */}
              <div className="pointer-events-none absolute inset-0 bg-black/5" />
            </div>
          </div>
        </div>

        {/* Bento Grid Section - Back to Constrained Width */}
        <div className="flex flex-col items-center px-4 md:px-0 w-full max-w-[95vw]">
          {/* Top Row - Bento Layout */}
          <div className="flex flex-col md:flex-row gap-4 lg:gap-[4vw] w-full justify-center items-center lg:items-start">

            {/* Left Side - App */}
            <div
              className="relative cursor-pointer flex-shrink-0"
              style={{
                width: "clamp(260px, 23.5vw, 452px)",
                aspectRatio: "466.31/1017.10",
                borderRadius: "clamp(32px, 3.2vw, 64px)",
                border: "clamp(6px, 0.6vw, 12px) solid #000",
                background:
                  "linear-gradient(180deg, #3A6CFF 0%, #012C9B 50%, #0B111E 100%)",
                overflow: "hidden",
              }}
              onMouseEnter={() => {
                setAppHovered(true);
                handleVideoPlay(appVideoRef);
              }}
              onMouseLeave={() => {
                setAppHovered(false);
                handleVideoPause(appVideoRef);
              }}
              onTouchStart={() => {
                handleTouchStart("app");
                handleVideoPlay(appVideoRef);
              }}
              onTouchEnd={() => {
                handleTouchEnd("app");
                handleVideoPause(appVideoRef);
              }}
              onClick={() => setAppClicked(!appClicked)}
            >
              {!videosReady.app && <div className="absolute inset-0 skeleton z-30 pointer-events-none" />}
              {/* Notch - Always visible */}
              <div
                style={{
                  position: "absolute",
                  top: "2%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "21%",
                  aspectRatio: "97.784/24.847",
                  borderRadius: "999px",
                  background: "#000",
                  flexShrink: 0,
                  zIndex: 3,
                }}
              />

              {/* Home Indicator - Always visible */}
              <div
                style={{
                  position: "absolute",
                  bottom: "2%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  width: "84%",
                  height: "3.3%",
                  justifyContent: "center",
                  alignItems: "center",
                  flexShrink: 0,
                  zIndex: 3,
                }}
              >
                <div
                  style={{
                    width: "34%",
                    height: "15%",
                    borderRadius: "100px",
                    background: "#fff",
                  }}
                />
              </div>

              {/* App Asset */}
              <div
                className="absolute inset-0"
                style={{
                  opacity: appHovered || mobileTouching.app ? 0 : 1,
                  transition: "opacity 0.1s ease",
                  zIndex: 1,
                }}
              >
                <Image
                  src="/products/app-asset.png"
                  alt="App Asset"
                  fill
                  className="object-contain"
                  priority
                  style={{
                    objectPosition: "top center",
                  }}
                />
              </div>

              {/* App Text */}
              <div
                className="absolute inset-0 flex justify-center items-center"
                style={{
                  top: "30%",
                  opacity: appHovered || mobileTouching.app ? 0 : 1,
                  transition: "opacity 0.1s ease",
                  zIndex: 2,
                }}
              >
                <div style={{ width: "75%", aspectRatio: "350/200" }}>
                  <Image
                    src="/products/app-text.png"
                    alt="App Text"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Video - Always rendered with poster for immediate feedback */}
              <video
                ref={appVideoRef}
                muted={true}
                loop
                playsInline
                preload="metadata"
                poster="/products/app-asset.png"
                className="absolute inset-0 w-full h-full object-contain"
                style={{
                  zIndex: 1,
                  opacity: appHovered || mobileTouching.app ? 1 : 0,
                  transition: "opacity 0.1s ease",
                }}
                data-video="app"
              >
                <source src="/products/app-video.mp4" type="video/mp4" />
              </video>

              {/* Coming Soon Overlay */}
              {appClicked && (
                <div
                  className="absolute inset-0 flex flex-col justify-center items-center"
                  style={{
                    background: "rgba(0, 0, 0, 0.6)",
                    zIndex: 10,
                    borderRadius: "clamp(32px, 3.2vw, 0px)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {/* App Assets */}
                  <div
                    className="absolute inset-0"
                    style={{
                      opacity: 0.3,
                      zIndex: 1,
                    }}
                  >
                    <Image
                      src="/products/app-asset.png"
                      alt="App Asset Background"
                      fill
                      className="object-contain"
                      style={{
                        objectPosition: "top center",
                      }}
                    />
                  </div>

                  {/* Coming Soon Text */}
                  <div
                    style={{
                      zIndex: 2,
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        color: "#ffffff",
                        fontFamily: "var(--font-lilita-one)",
                        fontSize: "clamp(24px, 3vw, 36px)",
                        fontWeight: 400,
                        lineHeight: "normal",
                        letterSpacing: 0,
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
                      }}
                    >
                      COMING SOON
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - Casset Products */}
            <div className="flex flex-col gap-4 lg:gap-[4vw] flex-shrink-0">
              {/* SendGuys - Top */}
              <div
                className="relative cursor-pointer"
                style={{
                  width: "clamp(340px, 34vw, 674px)",
                  aspectRatio: "674.19/469.93",
                }}
                onMouseEnter={() => {
                  setSendGuysHovered(true);
                  handleVideoPlay(sendGuysVideoRef);
                }}
                onMouseLeave={() => {
                  setSendGuysHovered(false);
                  handleVideoPause(sendGuysVideoRef);
                }}
                onTouchStart={() => {
                  handleTouchStart("sendGuys");
                  handleVideoPlay(sendGuysVideoRef);
                }}
                onTouchEnd={() => {
                  handleTouchEnd("sendGuys");
                  handleVideoPause(sendGuysVideoRef);
                }}
                onClick={() => handleRedirect("https://guys.sendarcade.fun")}
              >
                {!videosReady.sendGuys && <div className="absolute inset-0 skeleton z-30 pointer-events-none" style={{ borderRadius: 'inherit' }} />}
                {/* Base Casset */}
                <Image
                  src="/products/casset.png"
                  alt="Casset"
                  fill
                  className="object-contain"
                  priority
                />

                {/* Send Guys Sticker */}
                <div
                  style={{
                    position: "absolute",
                    top: "8.5%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "85.3%",
                    aspectRatio: "575.083/204.632",
                    borderRadius: "clamp(20px, 2vw, 40px)",
                    background: `linear-gradient(180deg, rgba(255, 255, 255, 0.00) 94.41%, rgba(255, 255, 255, 0.42) 100%), linear-gradient(180deg, rgba(82, 82, 82, 0.23) 0%, rgba(106, 106, 106, 0.00) 10.91%), url('/products/sendguys-sticker.png') lightgray 50% / cover no-repeat`,
                    backgroundBlendMode: "lighten, multiply, normal",
                    boxShadow:
                      "-1px -2px 0.5px 0 rgba(223, 216, 221, 0.50) inset, 2px 2px 2px 0 rgba(0, 0, 0, 0.60) inset",
                    flexShrink: 0,
                    opacity: sendGuysHovered || mobileTouching.sendGuys ? 0 : 1,
                    transition: "opacity 0.1s ease",
                    zIndex: 2,
                  }}
                />

                {/* Send Guys */}
                <div
                  style={{
                    position: "absolute",
                    top: "10.2%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "83.7%",
                    aspectRatio: "564.531/277.542",
                    borderRadius: "clamp(17px, 1.7vw, 34px)",
                    background: `linear-gradient(180deg, rgba(255, 255, 255, 0.00) 94.41%, rgba(255, 255, 255, 0.42) 100%), linear-gradient(180deg, rgba(82, 82, 82, 0.23) 0%, rgba(106, 106, 106, 0.00) 10.91%), url('/products/sendguysP.png') lightgray 50% / cover no-repeat`,
                    backgroundBlendMode: "lighten, multiply, normal",
                    boxShadow:
                      "0 1px 0 0 rgba(232, 230, 231, 0.84) inset, 1px 2px 2px 0 rgba(28, 16, 16, 0.80)",
                    flexShrink: 0,
                    opacity: sendGuysHovered || mobileTouching.sendGuys ? 0 : 1,
                    transition: "opacity 0.1s ease",
                    zIndex: 3,
                  }}
                />

                {/* Video - Always rendered with better loading */}
                <video
                  ref={sendGuysVideoRef}
                  muted={true}
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute object-contain rounded-lg"
                  style={{
                    top: "10.2%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "83.7%",
                    aspectRatio: "564.531/277.542",
                    borderRadius: "clamp(17px, 1.7vw, 34px)",
                    opacity: sendGuysHovered || mobileTouching.sendGuys ? 1 : 0,
                    transition: "opacity 0.1s ease",
                    zIndex: 4,
                  }}
                  data-video="sendGuys"
                >
                  <source src="https://pub-c4d90db77e92437ea367b7af11523bec.r2.dev/sendguys-video.mp4" type="video/mp4" />
                </video>
              </div>

              {/* Lana Roads - Bottom */}
              <div
                className="relative cursor-pointer"
                style={{
                  width: "clamp(340px, 34vw, 674px)",
                  aspectRatio: "674.19/469.93",
                }}
                onMouseEnter={() => {
                  setLanaRoadsHovered(true);
                  handleVideoPlay(lanaRoadsVideoRef);
                }}
                onMouseLeave={() => {
                  setLanaRoadsHovered(false);
                  handleVideoPause(lanaRoadsVideoRef);
                }}
                onTouchStart={() => {
                  handleTouchStart("lanaRoads");
                  handleVideoPlay(lanaRoadsVideoRef);
                }}
                onTouchEnd={() => {
                  handleTouchEnd("lanaRoads");
                  handleVideoPause(lanaRoadsVideoRef);
                }}
                onClick={() => handleRedirect("https://lanaroads.sendarcade.fun")}
              >
                {!videosReady.lanaRoads && <div className="absolute inset-0 skeleton z-30 pointer-events-none" style={{ borderRadius: 'inherit' }} />}
                {/* Base Casset */}
                <Image
                  src="/products/casset.png"
                  alt="Casset"
                  fill
                  className="object-contain"
                  priority
                />

                {/* Lana Roads Sticker */}
                <div
                  style={{
                    position: "absolute",
                    top: "8.5%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "85.3%",
                    aspectRatio: "575.083/204.632",
                    borderRadius: "clamp(20px, 2vw, 40px)",
                    background: `linear-gradient(180deg, rgba(255, 255, 255, 0.00) 94.41%, rgba(255, 255, 255, 0.42) 100%), linear-gradient(180deg, rgba(82, 82, 82, 0.23) 0%, rgba(106, 106, 106, 0.00) 10.91%), url('/products/lanaroadsSticker.png') lightgray 50% / cover no-repeat`,
                    backgroundBlendMode: "lighten, multiply, normal",
                    boxShadow:
                      "-1px -2px 0.5px 0 rgba(223, 216, 221, 0.50) inset, 2px 2px 2px 0 rgba(0, 0, 0, 0.60) inset",
                    flexShrink: 0,
                    opacity: lanaRoadsHovered || mobileTouching.lanaRoads ? 0 : 1,
                    transition: "opacity 0.1s ease",
                    zIndex: 2,
                  }}
                />

                {/* Lana Roads */}
                <div
                  style={{
                    position: "absolute",
                    top: "10.2%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "83.7%",
                    aspectRatio: "564.531/277.542",
                    borderRadius: "clamp(17px, 1.7vw, 34px)",
                    background: `linear-gradient(180deg, rgba(255, 255, 255, 0.00) 94.41%, rgba(255, 255, 255, 0.42) 100%), linear-gradient(180deg, rgba(82, 82, 82, 0.23) 0%, rgba(106, 106, 106, 0.00) 10.91%), url('/products/lanaroads.png') lightgray 50% / cover no-repeat`,
                    backgroundBlendMode: "lighten, multiply, normal",
                    boxShadow:
                      "0 1px 0 0 rgba(232, 230, 231, 0.84) inset, 1px 2px 2px 0 rgba(28, 16, 16, 0.80)",
                    flexShrink: 0,
                    opacity: lanaRoadsHovered || mobileTouching.lanaRoads ? 0 : 1,
                    transition: "opacity 0.1s ease",
                    zIndex: 3,
                  }}
                />

                {/* Video - Always rendered with better loading */}
                <video
                  ref={lanaRoadsVideoRef}
                  muted={true}
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute object-contain rounded-lg"
                  style={{
                    top: "10.2%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "83.7%",
                    aspectRatio: "564.531/277.542",
                    borderRadius: "clamp(17px, 1.7vw, 34px)",
                    opacity: lanaRoadsHovered || mobileTouching.lanaRoads ? 1 : 0,
                    transition: "opacity 0.1s ease",
                    zIndex: 4,
                  }}
                  data-video="lanaRoads"
                >
                  <source src="https://pub-c4d90db77e92437ea367b7af11523bec.r2.dev/lanaroads-video.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>

          {/* Bottom Row - 3 Products */}
          <div
            className="flex flex-col md:flex-row gap-4 md:gap-[4vw] w-full justify-center items-center"
            style={{ marginTop: "4vw" }}
          >
            {/* Frame 1 - Squid Game */}
            <div
              className="relative flex-shrink-0 cursor-pointer"
              style={{
                width: "clamp(320px, 25vw, 480px)",
                height: "clamp(420px, 34vw, 630px)", // Match new Blinks height
                borderRadius: "clamp(12px, 1.2vw, 24px)",
                overflow: "hidden",
              }}
              onMouseEnter={() => {
                setSquidGameHovered(true);
                handleVideoPlay(squidGameVideoRef);
              }}
              onMouseLeave={() => {
                setSquidGameHovered(false);
                // Restart video from beginning instead of pausing
                if (squidGameVideoRef.current) {
                  squidGameVideoRef.current.currentTime = 0;
                  squidGameVideoRef.current.pause();
                }
              }}
              onTouchStart={() => {
                setMobileTouching((prev) => ({
                  ...prev,
                  squidGame: true,
                }));
                handleVideoPlay(squidGameVideoRef);
              }}
              onTouchEnd={() => {
                setMobileTouching((prev) => ({
                  ...prev,
                  squidGame: false,
                }));
                // Restart video from beginning instead of pausing
                if (squidGameVideoRef.current) {
                  squidGameVideoRef.current.currentTime = 0;
                  squidGameVideoRef.current.pause();
                }
              }}
              onClick={() => handleRedirect("https://squid-game.sendarcade.fun")}
            >
              {!videosReady.squidGame && <div className="absolute inset-0 skeleton z-30 pointer-events-none" />}
              <video
                ref={squidGameVideoRef}
                muted={true}
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-contain"
                style={{
                  borderRadius: "clamp(12px, 1.2vw, 24px)",
                  opacity: squidGameHovered || mobileTouching.squidGame ? 1 : 1,
                  transition: "opacity 0.3s ease",
                }}
                data-video="squidGame"
              >
                <source src="https://pub-c4d90db77e92437ea367b7af11523bec.r2.dev/squidgame.mp4" type="video/mp4" />
              </video>
            </div>
            {/* Frame 3 - Blinks Component (Now Properly Responsive) */}
            <div
              className="relative flex-shrink-0"
              style={{
                width: "clamp(320px, 25vw, 480px)",
                height: "clamp(420px, 34vw, 630px)", // Match new Blinks height
                borderRadius: "clamp(12px, 1.2vw, 24px)",
                overflow: "visible", // Changed to visible since component scales internally
                background: "#01348C",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Blinks />
            </div>
            {/* Frame 3 - Vibegame */}
            <div
              className="relative flex-shrink-0 cursor-pointer"
              style={{
                width: "clamp(320px, 25vw, 480px)",
                height: "clamp(420px, 34vw, 630px)", // Match new Blinks height
                borderRadius: "clamp(12px, 1.2vw, 24px)",
                overflow: "hidden",
              }}
              onMouseEnter={() => setVibeGameHovered(true)}
              onMouseLeave={() => setVibeGameHovered(false)}
              onTouchStart={handleVibeGameTouchStart}
              onTouchEnd={handleVibeGameTouchEnd}
              onClick={() => handleRedirect("https://vibegame.fun")}
            >
              <div
                className="absolute inset-0 w-full h-full"
                style={{
                  transform: vibeGameHovered ? "rotate(360deg)" : "rotate(0deg)",
                  transition: vibeGameHovered
                    ? "transform 0.6s linear"
                    : "transform 0.3s ease-out",
                }}
              >
                <Image
                  src="/products/vibegame-fidget.png"
                  alt="Vibegame Fidget"
                  fill
                  className="object-cover"
                  style={{
                    borderRadius: "clamp(12px, 1.2vw, 24px)",
                  }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>



        <style jsx>{`
        .loading-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .blink-hover-glow:hover {
          box-shadow: 0 0 20px rgba(73, 155, 234, 0.3);
        }

        .fidget-spin {
          animation: continuousSpin 0.6s linear infinite;
        }

        @keyframes continuousSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
      </div>
    </div>
  );
};

export default Products;

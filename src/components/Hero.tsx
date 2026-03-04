"use client";
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DpadSVG from "./DpadSVG";
import RiveJoystick from "./RiveJoystick";

interface GameOption {
  id: string;
  name: string;
  url: string;
  keywords: string[];
}

interface VideoItem {
  src: string;
  redirectUrl: string;
  label: string;
  channel: string;
}

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBtnPressed, setSearchBtnPressed] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showMuteFeedback, setShowMuteFeedback] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Memoize videos array to prevent useEffect dependency changes
  const videos: VideoItem[] = useMemo(
    () => [
      {
        src: "https://pub-c4d90db77e92437ea367b7af11523bec.r2.dev/feature-1.mp4",
        redirectUrl: "https://x.com/magicblock/status/1949832343289729392",
        label: "SEND GUYS × MAGICBLOCK",
        channel: "CH 01",
      },
      {
        src: "https://pub-c4d90db77e92437ea367b7af11523bec.r2.dev/feature-2.mp4",
        redirectUrl: "https://magiceden.io/marketplace/lana_roads",
        label: "LANA ROADS // NFT DROP",
        channel: "CH 02",
      },
      {
        src: "https://pub-c4d90db77e92437ea367b7af11523bec.r2.dev/trailer.mp4",
        redirectUrl: "https://x.com/sendarcade",
        label: "FUSE ME DADDY // PRE-SEASON",
        channel: "CH 03",
      },
    ],
    []
  );

  /* Removed manual setInterval to ensure videos play fully before advancing */

  // PRIORITY: Preload carousel videos FIRST
  useEffect(() => {
    videos.forEach((video) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "video";
      link.href = video.src;
      link.fetchPriority = "high";
      document.head.appendChild(link);
    });

    return () => {
      const preloadLinks = document.querySelectorAll(
        'link[rel="preload"][as="video"]'
      );
      preloadLinks.forEach((link) => {
        try {
          document.head.removeChild(link);
        } catch {
          // Already removed
        }
      });
    };
  }, [videos]);

  // Game options for search
  const gameOptions: GameOption[] = [
    {
      id: "send-guys",
      name: "Send Guys",
      url: "https://guys.sendarcade.fun",
      keywords: ["send", "guys", "sendguys", "send guys"],
    },
    {
      id: "lana-roads",
      name: "Lana Roads",
      url: "https://lanaroads.sendarcade.fun",
      keywords: ["lana", "roads", "lanaroads", "lana roads"],
    },
  ];

  // Filter games based on search query
  const filteredGames = gameOptions.filter(
    (game) =>
      game.keywords.some((keyword) =>
        keyword.toLowerCase().includes(searchQuery.toLowerCase())
      ) || game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // D-pad navigation
  const handleNavigation = (direction: "left" | "right") => {
    setIsVideoLoaded(false);
    if (videos.length === 0) return;

    if (direction === "left") {
      setCurrentImageIndex((prev) =>
        prev === 0 ? videos.length - 1 : prev - 1
      );
    } else {
      setCurrentImageIndex((prev) =>
        prev === videos.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handleSearchClicked = () => {
    setSearchBtnPressed(true);
    setIsSearchMode((prev) => !prev);
    setTimeout(() => {
      setSearchBtnPressed(false);
    }, 100);
  };

  const handleGameSelect = (gameUrl: string) => {
    window.open(gameUrl, "_blank");
    setIsSearchMode(false);
    setSearchQuery("");
  };

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsMuted((prev) => !prev);

    setShowMuteFeedback(true);
    setTimeout(() => setShowMuteFeedback(false), 800);
  };

  const handleVideoClick = () => {
    // If not a forced-mute video, toggle mute
    // Otherwise still toggle but it will stay muted logic
    toggleMute();

    // Optional: Only redirect if already unmuted or on double click?
    // The user said "when we click on any video it should mute or unmute"
    // So toggle is the priority now.
  };

  return (
    <div
      id="hero"
      className="relative w-full"
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      {/* Cloud Background Layer */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/metadaobg.png')",
          width: "100vw",
          height: "100vh",
        }}
      />

      {/* Floating Particles / Digital Mist Layer */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        {/* Large soft orbs */}
        <div className="particle particle-1" />
        <div className="particle particle-2" />
        <div className="particle particle-3" />
        <div className="particle particle-4" />
        <div className="particle particle-5" />
        {/* Small sparkle dots */}
        <div className="sparkle sparkle-1" />
        <div className="sparkle sparkle-2" />
        <div className="sparkle sparkle-3" />
        <div className="sparkle sparkle-4" />
        <div className="sparkle sparkle-5" />
        <div className="sparkle sparkle-6" />
        <div className="sparkle sparkle-7" />
        <div className="sparkle sparkle-8" />
      </div>

      {/* ── HOLOGRAPHIC ARCADE CONSTRUCT ── */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[52%] w-[94%] sm:w-[84%] md:w-[74%] lg:w-[64%] xl:w-[58%] max-w-[1000px] aspect-video"
        style={{ zIndex: 2 }}
      >
        {/* The Holographic Lines (SVG Layer) */}
        <svg
          className="absolute -inset-[5%] w-[110%] h-[110%] pointer-events-none overflow-visible holographic-machine"
          viewBox="0 0 1100 618.75"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ willChange: "transform, opacity", transform: "translate3d(0,0,0)" }}
        >
          <defs>
            <linearGradient id="marqueeFill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0A2D7A" />
              <stop offset="100%" stopColor="#051B4D" />
            </linearGradient>
            <linearGradient id="deckFill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
            <linearGradient id="sideFill" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#051B4D" />
              <stop offset="100%" stopColor="#031236" />
            </linearGradient>
          </defs>

          {/* 1. TOP MARQUEE - Solid Header Area */}
          <path
            d="M150,-20 L950,-20 L1000,28.125 L100,28.125 Z"
            stroke="white"
            strokeWidth="2"
            fill="url(#marqueeFill)"
            fillOpacity="1"
            className="holographic-path-pulse-1"
          />

          {/* 2. MAIN SCREEN BEZEL — Framing the video */}
          <rect
            x="50"
            y="28.125"
            width="1000"
            height="562.5"
            rx="4"
            stroke="white"
            strokeWidth="3"
            fill="#010A1F"
            fillOpacity="0.4"
            className="holographic-frame"
          />

          {/* 3. SIDE PANELS - Solid Body silhouette */}
          <path d="M50,28.125 L0,60 L0,530 L50,590.625" stroke="white" strokeWidth="1" fill="url(#sideFill)" fillOpacity="1" />
          <path d="M1050,28.125 L1100,60 L1100,530 L1050,590.625" stroke="white" strokeWidth="1" fill="url(#sideFill)" fillOpacity="1" />

          {/* 4. CONTROL DECK - Solid Interactive Base */}
          <path
            d="M50,590.625 L-20,680 L1120,680 L1050,590.625"
            stroke="white"
            strokeWidth="3"
            fill="url(#deckFill)"
            fillOpacity="0.9"
            className="holographic-path-pulse-2"
          />

          {/* Corner highlights - Bold Accents */}
          <path d="M50,78.125 L50,28.125 L100,28.125" stroke="white" strokeWidth="4" strokeLinecap="round" />
          <path d="M1000,28.125 L1050,28.125 L1050,78.125" stroke="white" strokeWidth="4" strokeLinecap="round" />
          <path d="M50,540.625 L50,590.625 L100,590.625" stroke="white" strokeWidth="4" strokeLinecap="round" />
          <path d="M1000,590.625 L1050,590.625 L1050,540.625" stroke="white" strokeWidth="4" strokeLinecap="round" />

        </svg>

        {/* Video / Content Area */}
        <div className={`relative w-full h-full overflow-hidden group ${!isVideoLoaded ? 'skeleton' : ''}`}>
          {!isSearchMode && videos.length > 0 && (
            <div className="relative w-full h-full cursor-pointer" onClick={handleVideoClick}>
              <video
                key={currentImageIndex}
                autoPlay
                muted={isMuted}
                playsInline
                preload="metadata"
                onEnded={() => handleNavigation("right")}
                onLoadedData={() => setIsVideoLoaded(true)}
                className={`w-full h-full object-contain opacity-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-[1.01] ${isVideoLoaded ? 'opacity-90' : 'opacity-0'}`}
              >
                <source src={videos[currentImageIndex].src} type="video/mp4" />
              </video>

              {/* Holographic Overlays */}
              <div className="absolute inset-0 pointer-events-none border border-white/10" />
              <div className="absolute bottom-4 left-4 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white] animate-pulse" />
                <span className="text-[10px] sm:text-xs text-white/50 tracking-[0.3em] font-bold" style={{ fontFamily: "var(--font-pp-neue-bit)" }}>
                  {videos[currentImageIndex].channel} {"//"} {videos[currentImageIndex].label}
                </span>
              </div>

              {/* Nav Arrows */}
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all"
                onClick={(e) => { e.stopPropagation(); handleNavigation("left"); }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all"
                onClick={(e) => { e.stopPropagation(); handleNavigation("right"); }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>

              <div className="absolute top-4 right-4 text-[8px] text-white/20 font-mono tracking-tighter text-right">
                SIGNAL_LOSS: 0.02%<br />
                LATENCY: 14MS
              </div>

              {/* Mute/Unmute Button Overlay */}
              <button
                className="absolute bottom-4 right-4 z-30 p-2 rounded-full bg-black/40 border border-white/10 text-white hover:bg-black/60 transition-all"
                onClick={toggleMute}
              >
                {isMuted ? (
                  <VolumeX size={16} />
                ) : (
                  <Volume2 size={16} />
                )}
              </button>

              {/* Popping Feedback Icon */}
              <AnimatePresence>
                {showMuteFeedback && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 1 }}
                    exit={{ scale: 2, opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-40"
                  >
                    <div className="bg-black/60 p-6 rounded-full">
                      {isMuted ? (
                        <VolumeX size={48} className="text-white" />
                      ) : (
                        <Volume2 size={48} className="text-white" />
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Search Overlay */}
          {isSearchMode && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 bg-black/80 backdrop-blur-md">
              <div className="w-full max-w-sm space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-bold text-white tracking-[0.4em]" style={{ fontFamily: "var(--font-pp-neue-bit)" }}>TERMINAL_SEARCH</h2>
                  <div className="h-px w-24 mx-auto mt-2 bg-white/30" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter Keyword..."
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-sm text-white text-xs outline-none focus:border-white transition-colors"
                  autoFocus
                />
                <div className="max-h-40 overflow-y-auto space-y-1 pointer-events-auto">
                  {filteredGames.length > 0 ? (
                    filteredGames.map((game) => (
                      <button key={game.id} onClick={() => handleGameSelect(game.url)} className="w-full p-2 text-left text-[10px] text-white/60 hover:text-white hover:bg-white/10 transition-all">
                        &gt; {game.name}
                      </button>
                    ))
                  ) : (
                    <p className="text-[10px] text-white/20 text-center">NO_RESULTS</p>
                  )}
                </div>
                <button onClick={() => setIsSearchMode(false)} className="w-full text-[9px] text-white/30 uppercase tracking-[0.5em] hover:text-white">CLOSE_SESSION</button>
              </div>
            </div>
          )}
        </div>

        {/* ── ARCADE CONTROLS - Integrated into the Machine ── */}
        <div
          className="absolute top-[107%] left-0 w-full flex justify-between items-center px-[10%] sm:px-[14%] pointer-events-none"
          style={{ zIndex: 10, transform: "translateY(-50%) perspective(1000px) rotateX(20deg)" }}
        >
          {/* Left Side - Joystick */}
          <div className="pointer-events-auto scale-[0.4] sm:scale-[0.55] md:scale-[0.7] lg:scale-[0.8] origin-left transition-all">
            <RiveJoystick onInteract={() => handleNavigation("right")} />
          </div>

          {/* Center - D-pad */}
          <div className="pointer-events-auto scale-[0.25] sm:scale-[0.35] md:scale-[0.45] lg:scale-[0.55] origin-center transition-all opacity-90 hover:opacity-100">
            <DpadSVG
              onUp={() => handleNavigation("right")}
              onDown={() => handleNavigation("left")}
              onLeft={() => handleNavigation("left")}
              onRight={() => handleNavigation("right")}
              onCenter={() => { }}
            />
          </div>

          {/* Right Side - Search Button */}
          <div className="pointer-events-auto scale-[0.3] sm:scale-[0.4] md:scale-[0.5] lg:scale-[0.6] origin-right transition-all">
            <Image
              src={
                searchBtnPressed
                  ? "/search-btn-unpressed.png"
                  : "/search-btn-pressed.png"
              }
              alt="Search"
              width={180}
              height={80}
              className="cursor-pointer active:scale-95 transition-transform"
              style={{ objectFit: "contain" }}
              onClick={handleSearchClicked}
            />
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        /* Floating Particles */
        .particle {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.08) 0%,
            transparent 70%
          );
          pointer-events: none;
        }

        .particle-1 {
          width: 300px;
          height: 300px;
          top: 10%;
          left: -5%;
          animation: floatParticle 12s ease-in-out infinite;
        }
        .particle-2 {
          width: 200px;
          height: 200px;
          top: 60%;
          right: -3%;
          animation: floatParticle 10s ease-in-out infinite reverse;
        }
        .particle-3 {
          width: 150px;
          height: 150px;
          top: 30%;
          right: 20%;
          animation: floatParticle 14s ease-in-out infinite 2s;
        }
        .particle-4 {
          width: 250px;
          height: 250px;
          bottom: 5%;
          left: 20%;
          animation: floatParticle 11s ease-in-out infinite 1s;
        }
        .particle-5 {
          width: 100px;
          height: 100px;
          top: 15%;
          right: 30%;
          animation: floatParticle 9s ease-in-out infinite 3s;
        }

        /* Small sparkle dots */
        .sparkle {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          pointer-events: none;
          animation: sparkleFloat 6s ease-in-out infinite;
        }

        .sparkle-1 {
          top: 20%;
          left: 15%;
          animation-delay: 0s;
        }
        .sparkle-2 {
          top: 40%;
          left: 80%;
          animation-delay: 1s;
        }
        .sparkle-3 {
          top: 70%;
          left: 25%;
          animation-delay: 2s;
        }
        .sparkle-4 {
          top: 15%;
          left: 60%;
          animation-delay: 3s;
        }
        .sparkle-5 {
          top: 55%;
          left: 45%;
          animation-delay: 0.5s;
        }
        .sparkle-6 {
          top: 80%;
          left: 70%;
          animation-delay: 1.5s;
        }
        .sparkle-7 {
          top: 35%;
          left: 10%;
          animation-delay: 2.5s;
        }
        .sparkle-8 {
          top: 65%;
          left: 90%;
          animation-delay: 4s;
        }

        /* Keyframes */
        @keyframes floatParticle {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translate(30px, -20px) scale(1.05);
            opacity: 0.5;
          }
          50% {
            transform: translate(-15px, -40px) scale(0.95);
            opacity: 0.3;
          }
          75% {
            transform: translate(20px, -10px) scale(1.02);
            opacity: 0.4;
          }
        }

        @keyframes sparkleFloat {
          0%,
          100% {
            opacity: 0;
            transform: translateY(0) scale(0);
          }
          20% {
            opacity: 0.6;
            transform: translateY(-10px) scale(1);
          }
          50% {
            opacity: 0.3;
            transform: translateY(-25px) scale(0.8);
          }
          80% {
            opacity: 0.5;
            transform: translateY(-40px) scale(1);
          }
        }

        @keyframes videoGlow {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }

        /* Holographic Machine Styles */
        .holographic-machine {
          filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.4));
          will-change: transform, opacity;
        }

        .holographic-path-pulse-1 {
          animation: pathPulse1 4s ease-in-out infinite;
        }

        .holographic-path-pulse-2 {
          animation: pathPulse2 5s ease-in-out infinite;
        }

        .holographic-point-pulse {
          animation: pointPulse 2.5s ease-in-out infinite;
        }

        @keyframes pathPulse1 {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes pathPulse2 {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes pointPulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;

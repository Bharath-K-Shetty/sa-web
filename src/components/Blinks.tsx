import React, { useState } from "react";
import Image from "next/image";

const Blinks: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isTouching, setIsTouching] = useState(false);

  // Safari-compatible redirect handler
  const handlePlayClick = (e: React.MouseEvent | React.TouchEvent) => {
    // Prevent event bubbling
    e.preventDefault();
    e.stopPropagation();

    // Set executing state immediately
    setIsExecuting(true);

    // Safari requires immediate redirect from user gesture - no setTimeout delay
    // Open in new tab immediately while we still have user gesture context
    const newWindow = window.open("https://blinks.sendarcade.fun", "_blank");

    // Reset state after a brief moment for visual feedback
    setTimeout(() => {
      setIsExecuting(false);
    }, 800);

    // Fallback: if popup was blocked, try direct navigation
    if (
      !newWindow ||
      newWindow.closed ||
      typeof newWindow.closed === "undefined"
    ) {
      // Popup blocked - try direct navigation as fallback
      setTimeout(() => {
        window.location.href = "https://blinks.sendarcade.fun";
      }, 100);
    }
  };

  // Touch event handlers for mobile
  const handleTouchStart = () => {
    setIsTouching(true);
    setIsHovered(true); // Apply hover effect on touch
  };

  const handleTouchEnd = () => {
    setIsTouching(false);
    // Keep hover effect briefly after touch for smooth transition
    setTimeout(() => {
      if (!isTouching) {
        setIsHovered(false);
      }
    }, 100);
  };

  return (
    <div
      className="flex flex-col items-start bg-white"
      style={{
        width: "clamp(320px, 25vw, 480px)",
        height: "clamp(420px, 32.5vw, 630px)",
        borderRadius: "clamp(12px, 1.2vw, 24px)",
        border: "clamp(1.5px, 0.12vw, 2.5px) solid #499BEA",
        boxShadow: isHovered
          ? "0 clamp(3px, 0.24vw, 5px) clamp(3px, 0.24vw, 5px) 0 rgba(0, 0, 0, 0.25), 0 0 clamp(45px, 3.2vw, 44.5px) rgba(73, 155, 234, 0.5)"
          : "0 clamp(3px, 0.24vw, 5px) clamp(3px, 0.24vw, 5px) 0 rgba(0, 0, 0, 0.25)",
        transform: isHovered ? "scale(1.05)" : "scale(1)",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        backdropFilter: "blur(1.5px)",
        fontFamily: "var(--font-pp-neuebit), monospace",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Frame 1 - Image Section */}
      <div
        className="flex flex-col items-start self-stretch"
        style={{
          padding:
            "clamp(12px, 1vw, 18px) clamp(12px, 1vw, 18px) 0 clamp(12px, 1vw, 18px)",
          gap: "clamp(6px, 0.5vw, 10px)",
          flex: "1",
        }}
      >
        <div
          style={{
            width: "100%",
            aspectRatio: "1/1",
            borderRadius: "clamp(6px, 0.5vw, 10px)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Image
            src="/products/blinks.png"
            alt="Blinks"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Frame 2 - Content Section */}
      <div
        className="flex flex-col items-start self-stretch"
        style={{
          padding:
            "0 clamp(12px, 1vw, 18px) clamp(12px, 1vw, 18px) clamp(12px, 1vw, 18px)",
          gap: "clamp(8px, 0.65vw, 12px)",
        }}
      >
        <div
          className="flex flex-col items-start self-stretch"
          style={{
            gap: "clamp(6px, 0.5vw, 10px)",
          }}
        >
          {/* Frame A - Link Section */}
          <div
            className="flex items-center"
            style={{
              gap: "clamp(5px, 0.4vw, 8px)",
            }}
          >
            <div
              style={{
                width: "clamp(10px, 0.8vw, 16px)",
                height: "clamp(10px, 0.8vw, 16px)",
                position: "relative",
              }}
            >
              <Image
                src="/products/link.png"
                alt="Link"
                fill
                className="object-contain"
              />
            </div>
            <span
              style={{
                color: "#566470",
                fontSize: "16px",
                fontWeight: 400,
                letterSpacing: "-0.47px",
              }}
            >
              blinks.sendarcade.fun
            </span>
            <div
              className="flex items-center rounded-full"
              style={{
                padding: "clamp(2px, 0.16vw, 4px)",
                gap: "clamp(6px, 0.5vw, 10px)",
                background: "rgba(110, 118, 125, 0.10)",
              }}
            >
              <div
                style={{
                  width: "clamp(7px, 0.6vw, 11px)",
                  height: "clamp(8px, 0.65vw, 12px)",
                  position: "relative",
                }}
              >
                <Image
                  src="/products/info.png"
                  alt="Info"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Frame B - Title Section */}
          <div
            className="flex flex-col justify-center items-start self-stretch"
            style={{
              gap: "clamp(1px, 0.08vw, 2px)",
            }}
          >
            <span
              style={{
                color: "#101418",
                fontSize: "24px",
                fontWeight: 600,
                lineHeight: "clamp(16px, 1.3vw, 24px)",
                letterSpacing: "-0.47px",
              }}
            >
              Games on Blinks
            </span>
          </div>

          {/* Frame C - Button Section */}
          <div
            className="flex items-start self-stretch"
            style={{
              gap: "clamp(6px, 0.5vw, 9px)",
            }}
          >
            <button
              onClick={handlePlayClick}
              onTouchEnd={handlePlayClick} // Add touch support for mobile
              disabled={isExecuting}
              className="blink-button"
              style={{
                height: "clamp(28px, 2.3vw, 43px)",
                padding: "clamp(8px, 0.65vw, 12px) clamp(16px, 1.3vw, 24px)",
                borderRadius: "clamp(100px, 8vw, 164px)",
                background: isExecuting ? "rgb(156, 163, 175)" : "#499BEA",
                color: "white",
                fontSize: "20px",
                fontWeight: 600,
                letterSpacing: "-0.47px",
                border: "none",
                cursor: isExecuting ? "not-allowed" : "pointer",
                opacity: isExecuting ? "0.6" : "1",
                transition: "all 0.2s ease",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                position: "relative",
                overflow: "hidden",
                // Safari-specific optimizations
                WebkitAppearance: "none",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {isExecuting && (
                <div
                  className="blink-button-loading"
                  style={{
                    width: "clamp(14px, 1.1vw, 18px)",
                    height: "clamp(14px, 1.1vw, 18px)",
                    border: "2px solid rgba(255, 255, 255, 0.3)",
                    borderTop: "2px solid white",
                    borderRadius: "50%",
                    animation: "blink-spin 1s linear infinite",
                    marginRight: "8px",
                  }}
                />
              )}
              <span className="blink-button-text">
                {isExecuting ? "Executing..." : "Play"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blinks;

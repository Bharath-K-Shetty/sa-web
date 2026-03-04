"use client";
import React from "react";
import Image from "next/image";

const Footer = () => {
  const handleSocialClick = (platform: string, url: string) => {
    const lightningElement = document.getElementById(`${platform}-lightning`);
    if (lightningElement) {
      lightningElement.classList.add("active");

      setTimeout(() => {
        window.open(url, "_blank");
        lightningElement.classList.remove("active");
      }, 1000);
    }
  };

  return (
    <div
      className="w-full flex flex-col items-center pt-12 sm:pt-16"
      style={{ background: "#01348C" }}
    >
      {/* Rest of your Footer End content stays the same */}
      <div
        className="relative flex items-end justify-between w-full h-[180px] sm:h-[220px] lg:h-[262px]"
        style={{
          width: "100%",
          minHeight: "180px",
          backgroundImage: "url('/footer-endBG.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Content Frame */}
        <div className="absolute inset-0 flex justify-center items-center z-5 px-4 sm:px-6">
          <div className="inline-flex flex-col justify-center items-center gap-6 sm:gap-8 lg:gap-12 w-full max-w-md">
            {/* Frame-1 - Logo and Social */}
            <div className="flex flex-col justify-center items-center gap-4 sm:gap-6 lg:gap-8">
              {/* Frame-a - Logo and Text */}
              <div className="flex justify-center items-center gap-2 sm:gap-3">
                <Image
                  src="/sendarcade-logo.png"
                  alt="Send Arcade Logo"
                  width={24}
                  height={24}
                  className="w-6 h-6 sm:w-8 sm:h-8"
                />
                <span
                  className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl"
                  style={{
                    color: "#EFF8FF",
                    fontFamily: "var(--font-pp-neue-bit)",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "normal",
                  }}
                >
                  Send Arcade Studios
                </span>
              </div>

              {/* Frame-b - Social Icons */}
              <div className="flex justify-center items-center gap-4 sm:gap-6">
                {/* Discord with lightning effect */}
                <div className="relative social-button-container">
                  <div
                    className="lightning-effect"
                    id="discord-lightning"
                  ></div>
                  <Image
                    src="/SocialDiscord.png"
                    alt="Discord"
                    width={36}
                    height={36}
                    className="cursor-pointer relative z-20 sm:w-12 sm:h-12"
                    onClick={() =>
                      handleSocialClick("discord", "https://discord.gg/xEH7BpKX")
                    }
                  />
                </div>

                {/* Twitter with lightning effect */}
                {/* <div className="relative social-button-container">
                  <div
                    className="lightning-effect"
                    id="twitter-lightning"
                  ></div>
                  <Image
                    src="/SocialTwitter.png"
                    alt="Twitter"
                    width={36}
                    height={36}
                    className="cursor-pointer relative z-20 sm:w-12 sm:h-12"
                    onClick={() =>
                      handleSocialClick(
                        "twitter",
                        "https://x.com/sendarcadefun"
                      )
                    }
                  />
                </div> */}
              </div>
            </div>

            {/* Frame-2 - Footer Buttons */}
            <div className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-4 w-full">
              <Image
                src="/footer/copyright.png"
                alt="Copyright"
                width={120}
                height={40}
                className="cursor-pointer w-16 h-5 sm:w-20 sm:h-7 lg:w-[120px] lg:h-[40px]"
                onClick={() => window.open("/copyright", "_blank")}
              />
              <Image
                src="/footer/terms.png"
                alt="Terms"
                width={120}
                height={40}
                className="cursor-pointer w-16 h-5 sm:w-20 sm:h-7 lg:w-[120px] lg:h-[40px]"
                onClick={() => window.open("/tnc", "_blank")}
              />
              <Image
                src="/footer/privacy.png"
                alt="Privacy"
                width={120}
                height={40}
                className="cursor-pointer w-16 h-5 sm:w-20 sm:h-7 lg:w-[120px] lg:h-[40px]"
                onClick={() => window.open("/privacy", "_blank")}
              />
              {/* <Image
                src="/footer/airdrop.png"
                alt="Airdrop"
                width={120}
                height={40}
                className="cursor-pointer w-16 h-5 sm:w-20 sm:h-7 lg:w-[120px] lg:h-[40px]"
              />
              <Image
                src="/footer/brandassets.png"
                alt="Brand Assets"
                width={120}
                height={40}
                className="cursor-pointer w-16 h-5 sm:w-20 sm:h-7 lg:w-[120px] lg:h-[40px]"
              />
              <Image
                src="/footer/aiagents.png"
                alt="AI AGENTS"
                width={120}
                height={40}
                className="cursor-pointer w-16 h-5 sm:w-20 sm:h-7 lg:w-[120px] lg:h-[40px]"
              /> */}
            </div>
          </div>
        </div>
        {/* Floating Coins - Smaller on mobile */}
        <div
          className="absolute left-0 bottom-8 lg:bottom-0 z-10 "
          style={{
            animation: "floatLeft 2s ease-in-out infinite",
          }}
        >
          <Image
            src="/footer/LeftHorse.svg"
            alt="Horse Left"
            width={120}
            height={120}
            className="w-20 h-20 sm:w-24 sm:h-24 lg:w-[200px] lg:h-[200px]"
          />
        </div>
        <div
          className="absolute right-0 bottom-8 lg:bottom-0 z-10 "
          style={{
            animation: "floatRight 2s ease-in-out infinite",
          }}
        >
          <Image
            src="/footer/RightHorse.svg"
            alt="Horse Right"
            width={120}
            height={120}
            className="w-20 h-20 sm:w-24 sm:h-24 lg:w-[200px] lg:h-[200px]"
          />
        </div>
      </div>

      <style jsx>{`
        /* Social button styles */
        .social-button-container {
          position: relative;
          display: inline-block;
        }

        .lightning-effect {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 80px;
          opacity: 0;
          pointer-events: none;
          z-index: 10;
        }

        @media (min-width: 640px) {
          .lightning-effect {
            width: 100px;
            height: 100px;
          }
        }

        .lightning-effect.active {
          opacity: 1;
          animation: lightning-burst 1s ease-out;
        }

        .lightning-effect.active::before,
        .lightning-effect.active::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(
            circle,
            #ffffff 0%,
            rgba(255, 255, 255, 0.8) 30%,
            transparent 70%
          );
          border-radius: 50%;
          animation: lightning-pulse 1s ease-out;
        }

        .lightning-effect.active::before {
          width: 60px;
          height: 60px;
          animation-delay: 0s;
        }

        .lightning-effect.active::after {
          width: 90px;
          height: 90px;
          animation-delay: 0.1s;
        }

        @media (min-width: 640px) {
          .lightning-effect.active::before {
            width: 80px;
            height: 80px;
          }

          .lightning-effect.active::after {
            width: 120px;
            height: 120px;
          }
        }

        /* Keyframes */
        @keyframes lightning-burst {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
          20% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 1;
          }
          40% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0.8;
          }
          60% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 1;
          }
          80% {
            transform: translate(-50%, -50%) scale(0.9);
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
          }
        }

        @keyframes lightning-pulse {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
          }
        }

        @keyframes floatLeft {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes floatRight {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @media (min-width: 768px) {
          @keyframes floatLeft {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-30px);
            }
            100% {
              transform: translateY(0px);
            }
          }

          @keyframes floatRight {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-25px);
            }
            100% {
              transform: translateY(0px);
            }
          }
        }

        @media (min-width: 1024px) {
          @keyframes floatLeft {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-40px);
            }
            100% {
              transform: translateY(0px);
            }
          }

          @keyframes floatRight {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-35px);
            }
            100% {
              transform: translateY(0px);
            }
          }
        }
      `}</style>
    </div>
  );
};

export default Footer;

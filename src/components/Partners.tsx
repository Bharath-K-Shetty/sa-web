"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const Partners = () => {
  // State to track which buttons are pressed
  const [pressedButtons, setPressedButtons] = useState<{
    [key: string]: boolean;
  }>({});
  const [imagesLoaded, setImagesLoaded] = useState<{ [key: string]: boolean }>({});

  const handleImageLoad = (partnerName: string) => {
    setImagesLoaded((prev) => ({ ...prev, [partnerName]: true }));
  };

  // Partner buttons configuration - All 25 partners with individual Twitter URLs
  const partnerButtons = [
    {
      name: "soon",
      normalSrc: "/partners/soon-button.png",
      pressedSrc: "/partners/soon-button-pressed.png",
      twitterUrl: "https://x.com/soon_svm/", // TODO: Add specific tweet URL
    },
    {
      name: "magiceden",
      normalSrc: "/partners/magiceden-button.png",
      pressedSrc: "/partners/magiceden-button-pressed.png",
      twitterUrl: "https://x.com/MagicEden", // TODO: Add specific tweet URL
    },
    {
      name: "helius",
      normalSrc: "/partners/helius-button.png",
      pressedSrc: "/partners/helius-button-pressed.png",
      twitterUrl: "https://x.com/heliuslabs", // TODO: Add specific tweet URL
    },
    {
      name: "tensor",
      normalSrc: "/partners/tensor-button.png",
      pressedSrc: "/partners/tensor-button-pressed.png",
      twitterUrl: "https://x.com/tensor_hq", // TODO: Add specific tweet URL
    },
    {
      name: "sonic",
      normalSrc: "/partners/sonic-button.png",
      pressedSrc: "/partners/sonic-button-pressed.png",
      twitterUrl: "https://x.com/SonicSVM", // TODO: Add specific tweet URL
    },
    {
      name: "squad",
      normalSrc: "/partners/squad-button.png",
      pressedSrc: "/partners/squad-button-pressed.png",
      twitterUrl: "https://x.com/SquadsProtocol", // TODO: Add specific tweet URL
    },
    {
      name: "privy",
      normalSrc: "/partners/privy-button.png",
      pressedSrc: "/partners/privy-button-pressed.png",
      twitterUrl: "https://x.com/privy_io", // TODO: Add specific tweet URL
    },
    {
      name: "meteora",
      normalSrc: "/partners/meteora-button.png",
      pressedSrc: "/partners/meteora-button-pressed.png",
      twitterUrl: "https://x.com/MeteoraAG", // TODO: Add specific tweet URL
    },
    {
      name: "backpack",
      normalSrc: "/partners/backpack-button.png",
      pressedSrc: "/partners/backpack-button-pressed.png",
      twitterUrl: "https://x.com/Backpack", // TODO: Add specific tweet URL
    },
    {
      name: "block",
      normalSrc: "/partners/block-button.png",
      pressedSrc: "/partners/block-button-pressed.png",
      twitterUrl: "https://x.com/blockstranding", // TODO: Add specific tweet URL
    },
    {
      name: "cfl",
      normalSrc: "/partners/cfl-button.png",
      pressedSrc: "/partners/cfl-button-pressed.png",
      twitterUrl: "https://x.com/cfldotfun", // TODO: Add specific tweet URL
    },
    {
      name: "chillonic",
      normalSrc: "/partners/chillonic-button.png",
      pressedSrc: "/partners/chillonic-button-pressed.png",
      twitterUrl: "https://x.com/chillonicNFT", // TODO: Add specific tweet URL
    },
    {
      name: "dagdotgg",
      normalSrc: "/partners/dagdotgg-button.png",
      pressedSrc: "/partners/dagdotgg-button-pressed.png",
      twitterUrl: "https://x.com/dagdotgg", // TODO: Add specific tweet URL
    },
    {
      name: "dialect",
      normalSrc: "/partners/dialect-button.png",
      pressedSrc: "/partners/dialect-button-pressed.png",
      twitterUrl: "https://x.com/saydialect", // TODO: Add specific tweet URL
    },
    {
      name: "eclipse",
      normalSrc: "/partners/eclipse-button.png",
      pressedSrc: "/partners/eclipse-button-pressed.png",
      twitterUrl: "https://x.com/EclipseFND", // TODO: Add specific tweet URL
    },
    {
      name: "farcaster",
      normalSrc: "/partners/farcaster-button.png",
      pressedSrc: "/partners/farcaster-button-pressed.png",
      twitterUrl: "https://x.com/farcaster_xyz", // TODO: Add specific tweet URL
    },
    {
      name: "gamingsolana",
      normalSrc: "/partners/gamingsolana-button.png",
      pressedSrc: "/partners/gamingsolana-button-pressed.png",
      twitterUrl: "https://x.com/GamingOnSolana_",
    },
    {
      name: "indiesolana",
      normalSrc: "/partners/indiesolana-button.png",
      pressedSrc: "/partners/indiesolana-button-pressed.png",
      twitterUrl: "https://x.com/indiesonsolana", // TODO: Add specific tweet URL
    },
    {
      name: "lfg",
      normalSrc: "/partners/lfg-button.png",
      pressedSrc: "/partners/lfg-button-pressed.png",
      twitterUrl: "https://x.com/LFJ_gg", // TODO: Add specific tweet URL
    },
    {
      name: "playsolana",
      normalSrc: "/partners/playsolana-button.png",
      pressedSrc: "/partners/playsolana-button-pressed.png",
      twitterUrl: "https://x.com/playsolana", // TODO: Add specific tweet URL
    },
    {
      name: "ruby",
      normalSrc: "/partners/ruby-button.png",
      pressedSrc: "/partners/ruby-button-pressed.png",
      twitterUrl: "https://x.com/RubyCorporation", // TODO: Add specific tweet URL
    },
    {
      name: "superteam india",
      normalSrc: "/partners/snindia-button.png",
      pressedSrc: "/partners/snindia-button-pressed.png",
      twitterUrl: "https://x.com/SuperteamIN", // TODO: Add specific tweet URL
    },
    {
      name: "solanamobile",
      normalSrc: "/partners/solanamobile-button.png",
      pressedSrc: "/partners/solanamobile-button-pressed.png",
      twitterUrl: "https://x.com/solanamobile", // TODO: Add specific tweet URL
    },
    {
      name: "stvietnam",
      normalSrc: "/partners/stvietnam-button.png",
      pressedSrc: "/partners/stvietnam-button-pressed.png",
      twitterUrl: "https://x.com/SuperteamVN", // TODO: Add specific tweet URL
    },
  ];

  useEffect(() => {
    // Preload all partner button images (both normal and pressed states)
    const allImages = partnerButtons.flatMap((partner) => [
      partner.normalSrc,
      partner.pressedSrc,
    ]);

    allImages.forEach((imageSrc) => {
      const img = new window.Image();
      img.src = imageSrc;

      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = imageSrc;
      document.head.appendChild(link);
    });

    return () => {
      const preloadLinks = document.querySelectorAll(
        'link[rel="preload"][as="image"]'
      );
      preloadLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (href && allImages.includes(href)) {
          try {
            document.head.removeChild(link);
          } catch {
            // Link might already be removed
          }
        }
      });
    };
  }, []);

  // Handle button press
  const handleButtonPress = (partnerName: string) => {
    setPressedButtons((prev) => ({ ...prev, [partnerName]: true }));

    // Find the partner and get their specific Twitter URL
    const partner = partnerButtons.find((p) => p.name === partnerName);

    // Reset pressed state after animation
    setTimeout(() => {
      setPressedButtons((prev) => ({ ...prev, [partnerName]: false }));
      // Redirect to partner's specific Twitter URL
      if (partner?.twitterUrl) {
        window.open(partner.twitterUrl, "_blank");
      }
    }, 150);
  };

  return (
    <div className="flex justify-center bg-[#01348C] py-12 sm:py-16">
      {/* Inner Content */}
      <div className="flex flex-col items-center w-full px-4 sm:px-6">
        {/* Partners Title */}
        <div className="flex items-center gap-3 sm:gap-4 mb-12 sm:mb-16">
          <h2
            className="text-white text-4xl sm:text-5xl lg:text-[3.4rem] font-normal leading-none"
            style={{ fontFamily: "var(--font-matrix-sans-screen)" }}
          >
            Partners
          </h2>
          <Image
            src="/partners-cap.png"
            alt="Partners Cap"
            width={48}
            height={48}
            className="w-12 h-8 lg:w-16 lg:h-12"
          />
        </div>

        {/* Partners Buttons - Multiple Rows of 8 */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 sm:gap-6 lg:gap-8 max-w-7xl justify-items-center">
          {partnerButtons.map((partner, index) => (
            <button
              key={partner.name}
              onClick={() => handleButtonPress(partner.name)}
              className={`cursor-pointer transition-all duration-150 hover:scale-105 active:scale-95 ${!imagesLoaded[partner.name] ? 'skeleton' : ''}`}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                borderRadius: '8px',
                minWidth: '100px',
                minHeight: '50px'
              }}
            >
              <Image
                src={
                  pressedButtons[partner.name]
                    ? partner.pressedSrc
                    : partner.normalSrc
                }
                alt={`${partner.name} partner`}
                width={120}
                height={60}
                className={`w-28 h-14 sm:w-32 sm:h-16 md:w-36 md:h-18 lg:w-40 lg:h-20 object-contain transition-opacity duration-300 ${imagesLoaded[partner.name] ? 'opacity-100' : 'opacity-0'}`}
                priority={index < 4} // Priority load first 4 images
                onLoad={() => handleImageLoad(partner.name)}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Tweet } from "react-tweet";

// Add real Tweet IDs here
const tweetIds = [
  "2009274004356648982", // Toly's testimonial
  "1928572182759628966", // Solana
  "1916123921394323968", // Raj Gokal
  "1915048275436331284", // Chillonic
  "1914769676288086379", // SOON
  "1848348554726649977", // Sonic
  "2008267460164624833", // Solana Gaming
  "1938622338951794900", // Matt LeFun
  "1930630260720361697", // Magicblock
  "1904627106698404005", // Superteam India
];

const Tweets = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [itemsPerView, setItemsPerView] = React.useState(3);

  // Double the items for seamless looping
  const extendedTweets = [...tweetIds, ...tweetIds];

  // Responsive items per view
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-slide logic
  React.useEffect(() => {

    const timer = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, [itemsPerView]);

  // When we reach the start of the second set, jump back to the first set instantly
  const handleAnimationComplete = () => {
    if (currentIndex >= tweetIds.length) {
      setCurrentIndex(0);
    }
  };

  return (
    <section
      className="w-full py-20 sm:py-24"
      style={{
        background:
          "radial-gradient(circle at top, #0b1535 0%, #010b26 40%, #000518 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-10 sm:mb-14 px-4 sm:px-6">
          <p
            className="text-[11px] sm:text-xs tracking-[0.3em] uppercase text-sky-400/80"
            style={{ fontFamily: "var(--font-matrix-sans-screen)" }}
          >
            From the timeline
          </p>
          <h2
            className="mt-3 text-3xl sm:text-4xl lg:text-[2.8rem] leading-tight text-white"
            style={{ fontFamily: "var(--font-matrix-sans-screen)" }}
          >
            What our friends say
          </h2>
        </div>

        <div className="relative px-4 sm:px-6">
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{
                // Calculate percentage based on a single item shift
                x: `calc(-${currentIndex * (100 / itemsPerView)}% - ${currentIndex * (24 / itemsPerView)}px)`,
              }}
              transition={currentIndex === 0 ? { duration: 0 } : {
                type: "spring",
                stiffness: 260,
                damping: 28,
              }}
              onAnimationComplete={handleAnimationComplete}
            >
              {extendedTweets.map((id, index) => (
                <div
                  key={`${id}-${index}`}
                  data-theme="dark"
                  // Ensure w is calculated correctly for the gap
                  className="react-tweet-container w-[calc((100%/1)-0px)] md:w-[calc((100%/2)-12px)] lg:w-[calc((100%/3)-16px)] flex-shrink-0"
                >
                  <div className="rounded-3xl overflow-hidden border border-white/5 bg-slate-900/40 backdrop-blur-md shadow-2xl h-full">
                    <Tweet id={id} />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tweets;




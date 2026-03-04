"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Volume2, VolumeX } from "lucide-react";
import { AnimatePresence } from "framer-motion";

/* ── Story data ─────────────────────────────────────────── */
interface StoryBlock {
  phase: string;
  title: string;
  description: string;
  image?: string;
  video?: string;
  color: string;
  stats: { label: string; value: string }[];
  highlights: string[];
}

const storyBlocks: StoryBlock[] = [
  {
    phase: "PHASE 01",
    title: "The Spark",
    description:
      "Bootstrapped & Dangerous. Send Arcade was born from pure conviction. Zero funding, zero marketing budget, all build. We bootstrapped through hackathons and earned attention the hard way—by shipping. We didn’t buy growth. We built it.",
    image: "https://pub-c4d90db77e92437ea367b7af11523bec.r2.dev/Bento.svg",
    color: "#34D39A",
    stats: [
      { label: "Funding", value: "$0" },
      { label: "Marketing", value: "$0" },
      { label: "Organic", value: "100%" },
    ],
    highlights: [
      "2x Blinkathon Winner",
      "Solana AI Hackathon",
      "MagicBlock Realtime Winner",
      "Colosseum Radar Winner",
      "Helius Launchpad Cohort 1",
    ],
  },
  {
    phase: "PHASE 02",
    title: "Open Source From Day One",
    description:
      "Building the Tools. We didn’t just build games. We built the rails. Active contributors to the Solana Agent Kit (v1 & v2) and main contributor to Solana AppKit. Creators of SendRC—the base rollup contract powering our rollup-based games. Built with MagicBlock. We don’t just play in the ecosystem. We help shape it.",
    image: "/story/COVER.png",
    color: "#3B82F6",
    stats: [
      { label: "Open Source", value: "100%" },
      { label: "Ecosystem", value: "First" },
      { label: "Infra", value: "+ Games" },
    ],
    highlights: [
      "Solana Agent Kit (v1 & v2)",
      "Solana AppKit Contributor",
      "SendRC Rollup Contract",
      "Built with MagicBlock",
    ],
  },
  {
    phase: "PHASE 03",
    title: "VibeGame",
    description:
      "The Incubation. We incubated VibeGame—and everything accelerated. Vision: Becoming the Pump × TikTok of on-chain gaming. A platform where anyone can launch, play, and monetize instantly. The flywheel started spinning.",
    image: "/vibegame.png",
    video: "https://pub-c4d90db77e92437ea367b7af11523bec.r2.dev/Vibegame.mp4",
    color: "#A855F7",
    stats: [
      { label: "Launched", value: "50+" },
      { label: "Built", value: "100+" },
      { label: "Plays", value: "25K+" },
      { label: "Volume", value: "$4M+" },
    ],
    highlights: [
      "50+ gamecoins launched",
      "100+ games built",
      "25,000+ plays in v1",
      "$4M+ in volume",
    ],
  },
  {
    phase: "PHASE 04",
    title: "Distribution Layer",
    description:
      "Everywhere Players Are. Distribution is leverage. Top 3 Blinks inside Backpack Mobile. 20K+ plays on Farcaster. Published on the Solana Dapp Store. Games pre-installed on PlaySolana. We didn’t chase users. We embedded where they already are.",
    image: "/story/SendOnMobile.png",
    color: "#F59E0B",
    stats: [
      { label: "Blinks", value: "Top 3" },
      { label: "Farcaster", value: "20K+" },
      { label: "Campaigns", value: "Ecosystem" },
    ],
    highlights: [
      "Backpack Mobile Native",
      "Solana Seeker Integration",
      "PlaySolana Pre-installed",
      "Solana Dapp Store",
    ],
  },
  {
    phase: "PHASE 05",
    title: "Real-Time Arena",
    description:
      "Real-Time On-Chain Multiplayer. We proved games could live on-chain. Now we proved they could move in real-time. FuseMeDaddy is a fully on-chain multiplayer bomber-style game built entirely on MagicBlock. No centralized servers. No Web2 fallback. Every move. Every explosion. On-chain.",
    image: "/story/storyfmd.jpg",
    color: "#EF4444",
    stats: [
      { label: "Matches", value: "Real-time" },
      { label: "State", value: "Deterministic" },
      { label: "Logic", value: "Composable" },
    ],
    highlights: [
      "FuseMeDaddy launch",
      "MagicBlock Engine",
      "GamePasses soon",
      "On-chain characters",
    ],
  },
];

/* ── Single Story Row (image left, text right) ──────────── */
function StoryRow({
  block,
}: {
  block: StoryBlock;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = React.useState(true);
  const [showMuteFeedback, setShowMuteFeedback] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isMediaLoaded, setIsMediaLoaded] = React.useState(false);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const handleMouseEnter = () => {
    setIsHovered(true);
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted((prev) => !prev);
    setShowMuteFeedback(true);
    setTimeout(() => setShowMuteFeedback(false), 800);
  };

  return (
    <div
      ref={ref}
      className="py-8 sm:py-10 flex flex-col md:flex-row gap-6 sm:gap-8 items-stretch"
    >
      {/* Image Side */}
      <motion.div
        initial={{ opacity: 0, x: -30, scale: 0.96 }}
        animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="md:w-[320px] lg:w-[360px] flex-shrink-0"
      >
        <div className={`relative overflow-hidden border border-white/10 bg-white/5 shadow-[0_18px_40px_rgba(15,23,42,0.75)] ${!isMediaLoaded ? 'skeleton' : ''}`} style={{ aspectRatio: "16/9" }}>
          {block.video ? (
            <div
              className="relative cursor-pointer w-full h-full"
              onClick={toggleMute}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Placeholder Image */}
              <AnimatePresence>
                {!isHovered && block.image && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 z-10"
                  >
                    <Image
                      src={block.image}
                      alt={block.title}
                      fill
                      className="object-cover"
                      onLoad={() => setIsMediaLoaded(true)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <video
                ref={videoRef}
                src={block.video}
                className="w-full h-full object-contain"
                playsInline
                muted={isMuted}
                loop
                onLoadedData={() => {
                  if (block.image) {
                    // If there's an image, we wait for image to load primarily
                    // But if no image, we use video load
                  } else {
                    setIsMediaLoaded(true);
                  }
                }}
              />

              {/* Mute Feedback Per Div */}
              <AnimatePresence>
                {showMuteFeedback && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: 1 }}
                    exit={{ scale: 1.5, opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-[100]"
                  >
                    <div className="bg-black/60 p-4 rounded-full">
                      {isMuted ? (
                        <VolumeX size={32} className="text-white" />
                      ) : (
                        <Volume2 size={32} className="text-white" />
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Image
              src={block.image || ""}
              alt={block.title}
              width={640}
              height={360}
              className={`w-full h-auto object-cover transition-opacity duration-300 ${isMediaLoaded ? 'opacity-100' : 'opacity-0'}`}
              style={{ aspectRatio: "16/9" }}
              onLoad={() => setIsMediaLoaded(true)}
            />
          )}
        </div>
      </motion.div>

      {/* Text Side */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex-1 w-full flex flex-col justify-between"
      >
        {/* Top meta row */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <span
            className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-white/80"
            style={{ fontFamily: "var(--font-matrix-sans-screen)" }}
          >
            {block.phase}
          </span>

          {block.highlights[0] && (
            <span
              className="text-[11px] uppercase tracking-[0.18em] text-white/50"
              style={{ fontFamily: "var(--font-matrix-sans-screen)" }}
            >
              {block.highlights[0]}
            </span>
          )}
        </div>

        {/* Title & description */}
        <div>
          <h3
            className="text-2xl sm:text-[1.7rem] lg:text-[1.9rem] leading-snug text-white mb-2"
            style={{ fontFamily: "var(--font-matrix-sans-screen)" }}
          >
            {block.title}
          </h3>
          <p
            className="text-sm sm:text-[0.95rem] text-white/70 leading-relaxed max-w-xl"
            style={{ fontFamily: "var(--font-pp-neue-bit)" }}
          >
            {block.description}
          </p>
        </div>

        {/* Bottom meta / stats row */}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] text-white/60">
          {block.stats.map((stat, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 border border-white/20"
              style={{ fontFamily: "var(--font-matrix-sans-screen)" }}
            >
              <span className="font-semibold text-white">{stat.value}</span>
              <span className="uppercase tracking-[0.18em] text-white/70">
                {stat.label}
              </span>
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ── Main Story Component ──────────────────────────────── */
const Story = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="story"
      ref={containerRef}
      className="relative w-full py-20 sm:py-24 overflow-hidden"
      style={{ background: "#01348C" }}
    >
      {/* Section Header */}
      <div className="relative z-10 text-center mb-16 sm:mb-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span
            className="text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 block"
            style={{
              color: "#548AFF",
              fontFamily: "var(--font-matrix-sans-screen)",
            }}
          >
            The Arc of Madness
          </span>
          <h2
            className="text-4xl sm:text-5xl lg:text-[3.4rem] text-white mb-4"
            style={{ fontFamily: "var(--font-matrix-sans-screen)" }}
          >
            Our story
          </h2>
          <p
            className="text-base sm:text-lg text-white/60 max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-pp-neue-bit)" }}
          >
            From zero funding to the largest on-chain gaming platform on Solana.
            Every level earned, never given.
          </p>
        </motion.div>
      </div>

      {/* Story rows - unified layout (image left, text right) */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="divide-y divide-white/10 border-y border-white/10">
          {storyBlocks.map((block, index) => (
            <StoryRow key={index} block={block} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Story;

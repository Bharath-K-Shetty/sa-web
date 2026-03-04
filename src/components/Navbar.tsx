"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Copy, Check } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navItems = ["Story", "Products", "Partners", "Events"];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        "SENDdRQtYMWaQrBroBrJ2Q53fgVuq95CV9UPGEvpCxa"
      );
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 5000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const scrollToSection = (sectionName: string) => {
    const sectionId = sectionName.toLowerCase();
    const isOnHomePage = window.location.pathname === "/";

    if (!isOnHomePage) {
      window.location.href = `/#${sectionId}`;
      return;
    }

    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - navbarHeight;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 100);

    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between transition-all duration-500"
        style={{
          width: "min(92%, 1100px)",
          height: "56px",
          background: scrolled
            ? "rgba(0, 22, 61, 0.75)"
            : "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: scrolled
            ? "1px solid rgba(82, 145, 255, 0.25)"
            : "1px solid rgba(255, 255, 255, 0.15)",
          borderRadius: "18px",
          padding: "0 20px",
          boxShadow: scrolled
            ? "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 60px rgba(23, 100, 232, 0.08)"
            : "0 8px 32px rgba(0, 0, 0, 0.12)",
        }}
      >
        {/* Left - Logo */}
        <div
          className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => {
            const isOnHomePage = window.location.pathname === "/";
            if (!isOnHomePage) {
              window.location.href = "/";
            } else {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <div className="relative">
            <div
              className="absolute -inset-1 rounded-full opacity-60"
              style={{
                background:
                  "radial-gradient(circle, rgba(23, 100, 232, 0.4) 0%, transparent 70%)",
                animation: "navGlow 3s ease-in-out infinite",
              }}
            />
            <Image
              src="/sendarcade-logo.png"
              alt="Send Arcade Logo"
              width={28}
              height={28}
              className="relative z-10 w-6 h-6 sm:w-7 sm:h-7"
            />
          </div>
          <span
            className="text-white text-sm sm:text-base font-bold tracking-wider uppercase"
            style={{ fontFamily: "var(--font-pp-neue-bit)" }}
          >
            SEND ARCADE
          </span>
        </div>

        {/* Center - Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item, index) => (
            <button
              key={index}
              className="relative px-4 py-1.5 text-white/70 hover:text-white text-sm font-medium transition-all duration-300 rounded-lg hover:bg-white/5"
              style={{ fontFamily: "var(--font-pp-neue-bit)", fontSize: "18px" }}
              onClick={() => scrollToSection(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-2">
          {/* <button
            onClick={handleCopy}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 hover:scale-105"
            style={{
              background: isCopied
                ? "rgba(52, 211, 154, 0.2)"
                : "rgba(82, 145, 255, 0.15)",
              border: isCopied
                ? "1px solid rgba(52, 211, 154, 0.3)"
                : "1px solid rgba(82, 145, 255, 0.2)",
            }}
          >
            <span
              className="text-xs"
              style={{
                color: isCopied ? "#34D39A" : "#93B8FF",
                fontFamily: "var(--font-matrix-sans-screen)",
              }}
            >
              {isCopied ? "Copied!" : "SENDdR...EvpCxa"}
            </span>
            {isCopied ? (
              <Check className="w-3 h-3" style={{ color: "#34D39A" }} />
            ) : (
              <Copy className="w-3 h-3" style={{ color: "#93B8FF" }} />
            )}
          </button> */}

          {/* Play Now CTA */}
          <button
            onClick={() =>
              window.open("https://blinks.sendarcade.fun/", "_blank")
            }
            className="hidden sm:flex items-center transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <Image
              src="/PlayBtn.svg"
              alt="Play Now"
              width={160}
              height={44}
              className="w-auto h-7 sm:h-8"
            />
          </button>

          {/* Mobile - Copy + Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={handleCopy}
              className="sm:hidden flex items-center gap-1 px-2.5 py-1 rounded-lg"
              style={{
                background: "rgba(82, 145, 255, 0.15)",
                border: "1px solid rgba(82, 145, 255, 0.2)",
              }}
            >
              <span
                className="text-[10px]"
                style={{
                  color: isCopied ? "#34D39A" : "#93B8FF",
                  fontFamily: "var(--font-matrix-sans-screen)",
                }}
              >
                {isCopied ? "Copied!" : "CA"}
              </span>
              {isCopied ? (
                <Check className="w-2.5 h-2.5" style={{ color: "#34D39A" }} />
              ) : (
                <Copy className="w-2.5 h-2.5" style={{ color: "#93B8FF" }} />
              )}
            </button>

            <button
              onClick={toggleMenu}
              className="p-1.5 text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div
          className="fixed md:hidden z-40 left-1/2 -translate-x-1/2 transition-all duration-300"
          style={{
            top: "80px",
            width: "min(88%, 400px)",
            background: "rgba(0, 22, 61, 0.9)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(82, 145, 255, 0.2)",
            borderRadius: "24px",
            padding: "16px",
            boxShadow: "0 16px 48px rgba(0, 0, 0, 0.4)",
          }}
        >
          <div className="flex flex-col gap-1">
            {navItems.map((item, index) => (
              <button
                key={index}
                className="w-full py-3 px-4 text-white/80 hover:text-white hover:bg-white/5 rounded-xl text-left transition-all duration-200 text-lg font-bold"
                style={{ fontFamily: "var(--font-pp-neue-bit)" }}
                onClick={() => scrollToSection(item)}
              >
                {item}
              </button>
            ))}
            <div className="h-px bg-white/10 my-2" />
            <button
              onClick={() => {
                window.open("https://blinks.sendarcade.fun/", "_blank");
                setIsMenuOpen(false);
              }}
              className="w-full flex justify-center py-2 transition-all duration-200 active:scale-95"
            >
              <Image
                src="/PlayBtn.svg"
                alt="Play Now"
                width={160}
                height={44}
                className="w-auto h-9"
              />
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes navGlow {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;

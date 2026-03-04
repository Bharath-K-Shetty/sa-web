"use client";
import React from "react";
import Image from "next/image";

const Events = () => {
  return (
    <div className="w-full flex justify-center bg-[#01348C] py-12 sm:py-16">
      {/* Inner Content */}
      <div className="flex flex-col items-center w-full px-4 sm:px-6 max-w-[1208px]">
        {/* Events Title */}
        <div className="flex justify-center items-center gap-4 mb-12 sm:mb-16">
          <h2
            className="text-white text-4xl sm:text-5xl lg:text-[3.4rem] font-normal leading-none"
            style={{ fontFamily: "var(--font-matrix-sans-screen)" }}
          >
            Events
          </h2>
        </div>

        {/* Event Images */}
        <div className="w-full">
          {/* First row - 3 events */}
          <div className="flex justify-center items-center gap-6 sm:gap-8 mb-6 sm:mb-8 flex-wrap lg:flex-nowrap">
            {[
              { src: "/events/event-1.png", lgRotate: "-8deg" },
              { src: "/events/event-2.png", lgRotate: "0deg" },
              { src: "/events/event-3.png", lgRotate: "8deg" },
            ].map((event, idx) => (
              <div
                key={idx}
                className="event-card transition-transform duration-300"
                style={{ "--lg-rotate": event.lgRotate } as React.CSSProperties}
              >
                <Image
                  src={event.src}
                  alt={`Event ${idx + 1}`}
                  width={300}
                  height={400}
                  className="rounded-lg w-[160px] h-[200px] sm:w-[180px] sm:h-[240px] lg:w-[300px] lg:h-[400px] object-cover"
                />
              </div>
            ))}
          </div>

          {/* Second row - 2 events centered */}
          <div className="flex justify-center items-center gap-6 sm:gap-8">
            {[
              { src: "/events/event-4.png", lgRotate: "-2deg" },
              { src: "/events/event-5.png", lgRotate: "8deg" },

            ].map((event, idx) => (
              <div
                key={idx + 3}
                className="event-card transition-transform duration-300"
                style={{ "--lg-rotate": event.lgRotate } as React.CSSProperties}
              >
                <Image
                  src={event.src}
                  alt={`Event ${idx + 4}`}
                  width={300}
                  height={400}
                  className="rounded-lg w-[160px] h-[200px] sm:w-[180px] sm:h-[240px] lg:w-[300px] lg:h-[400px] object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS for responsive rotation */}
      <style jsx>{`
        .event-card {
          transform: rotate(0deg);
        }

        @media (min-width: 1024px) {
          .event-card {
            transform: rotate(var(--lg-rotate));
          }
        }
      `}</style>
    </div>
  );
};

export default Events;

import React, { useState } from "react";
import { DotLottieReact, type DotLottie } from "@lottiefiles/dotlottie-react";

type DotLottieInstance = DotLottie | null;

const TgDesktop = () => {
  const [dotLottie, setDotLottie] = useState<DotLottieInstance>(null);

  const handleClick = () => {
    if (dotLottie) {
      dotLottie.play();
    }
  };

  const handleComplete = () => {
    // Open the link
    window.open("https://jup.ag", "_blank");

    // Reset animation back to beginning after a short delay
    setTimeout(() => {
      if (dotLottie) {
        dotLottie.stop(); // This will reset to frame 0
      }
    }, 100);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        cursor: "pointer",
        display: "inline-block",
        width: "360px",
        height: "450px",
      }}
    >
      <DotLottieReact
        src="https://lottie.host/41786479-a367-4ab1-9783-0ff31b69f006/4iqhxsk1OY.lottie"
        loop={false}
        autoplay={false}
        style={{
          width: "100%",
          height: "100%",
        }}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        dotLottieRefCallback={(dotLottieInstance: any) => {
          setDotLottie(dotLottieInstance);

          if (dotLottieInstance) {
            dotLottieInstance.addEventListener("complete", handleComplete);
          }
        }}
      />
    </div>
  );
};

export default TgDesktop;

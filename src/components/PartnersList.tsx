"use client";
import React, { useState } from "react";

interface PartnersListProps {
  imageSrc: string;
  website: string;
  imageClassName?: string;
}

const PartnersList: React.FC<PartnersListProps> = ({ imageSrc, website }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // Check if this is a supported partner with pressed state
    const partnerName = imageSrc.split("/").pop()?.split(".")[0];
    const supportedPartners = ["metaplex", "jupiter"];

    if (supportedPartners.includes(partnerName || "")) {
      setIsPressed(true);

      // Redirect after 0.5 second
      setTimeout(() => {
        window.open(website, "_blank");
        setIsPressed(false);
      }, 500);
    } else {
      // For other partners, redirect immediately
      window.open(website, "_blank");
    }
  };

  const getPressedImage = () => {
    const partnerName = imageSrc.split("/").pop()?.split(".")[0];
    return `/${partnerName}-pressed.png`;
  };

  const shouldShowPressedState = () => {
    const partnerName = imageSrc.split("/").pop()?.split(".")[0];
    return ["metaplex", "jupiter"].includes(partnerName || "") && isPressed;
  };

  return (
    <div className="flex flex-col items-center rounded-2xl bg-cover bg-center bg-no-repeat">
      <div
        onClick={handleClick}
        className="flex items-center cursor-pointer transition-transform hover:scale-105"
      >
        <div
          className="w-20 h-20 lg:w-24 lg:h-24 aspect-square bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${
              shouldShowPressedState() ? getPressedImage() : imageSrc
            })`,
          }}
        />
      </div>
    </div>
  );
};

export default PartnersList;

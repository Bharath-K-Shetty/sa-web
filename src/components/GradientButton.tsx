"use client";
import React from "react";

interface GradientButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  onClick,
  children,
  className = "",
  disabled = false,
  style = {},
  innerStyle = {},
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
      style={{
        display: "flex",
        padding: "8px",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        borderRadius: "50px",
        background: `radial-gradient(circle at center, #87CEEB 0%, #4682B4 30%, #1E90FF 60%, #0066CC 100%)`,
        boxShadow: "0px 4px 8.9px 0px rgba(0, 0, 0, 0.25)",
        border: "none",
        outline: "none",
        ...style,
      }}
    >
      {/* Inner Frame */}
      <div
        style={{
          display: "flex",
          width: "32px",
          height: "32px",
          padding: "3px 4px",
          justifyContent: "center",
          alignItems: "center",
          aspectRatio: "1/1",
          borderRadius: "60.417px",
          background: "linear-gradient(0deg, #1E3D80 0%, #1E3D80 100%), #FFF",
          boxShadow: "0px 10px 17.8px 0px rgba(58, 108, 255, 0.40) inset",
          ...innerStyle,
        }}
      >
        {children}
      </div>
    </button>
  );
};

export default GradientButton;

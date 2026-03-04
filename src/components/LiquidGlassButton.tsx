import { ReactNode } from "react";

// Component Props Types
export interface LiquidGlassButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  style?: React.CSSProperties;
}

export default function LiquidGlassButton({
  children,
  className = "",
  onClick,
  onMouseEnter,
  onMouseLeave,
  style = {},
}: LiquidGlassButtonProps) {
  // Extract borderRadius from style prop, default to 100px
  const borderRadius = style.borderRadius || "100px";

  // Check if the button has flex display to apply to content wrapper
  const isFlexButton = className.includes("flex") || style.display === "flex";

  return (
    <button
      className={`group relative transition-all duration-200 hover:scale-105 hover:brightness-110 ${className}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        ...style,
        border: "none",
        outline: "none",
        background: style.background || "transparent",
        cursor: "pointer",
      }}
    >
      {/* Overlay shadow layer */}
      <div
        className="absolute inset-0 pointer-events-none group-hover:opacity-80"
        style={{
          borderRadius,
          boxShadow: "inset 0px 0px 0px 1px #A6A6A6",
          mixBlendMode: "overlay",
        }}
      />

      {/* Plus-lighter shadow layers */}
      <div
        className="absolute inset-0 pointer-events-none group-hover:opacity-80"
        style={{
          borderRadius,
          boxShadow: "inset -2px -2px 1px -2px #666666",
          mixBlendMode: "plus-lighter",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none group-hover:opacity-80"
        style={{
          borderRadius,
          boxShadow: "inset 2px 2px 1px -2px #666666",
          mixBlendMode: "plus-lighter",
        }}
      />

      {/* Content */}
      <div
        className={`relative z-10 transition-all duration-200 ${
          isFlexButton ? "flex items-center" : ""
        }`}
        style={isFlexButton ? { gap: "inherit" } : {}}
      >
        {children}
      </div>
    </button>
  );
}

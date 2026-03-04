import localFont from "next/font/local";

export const ppNeueBit = localFont({
  src: [
    {
      path: "../../public/fonts/ppneuebit-bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-pp-neuebit",
  display: "swap",
});

export const matrixSansScreen = localFont({
  src: [
    {
      path: "../../public/fonts/MatrixSansScreen-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-matrix-sans-screen",
  display: "swap",
});

export const matrixSansRaster = localFont({
  src: [
    {
      path: "../../public/fonts/MatrixSansRaster-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-matrix-sans-raster",
  display: "swap",
});
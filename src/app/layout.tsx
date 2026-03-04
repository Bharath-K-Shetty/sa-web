import type { Metadata } from "next";
import { Lilita_One } from "next/font/google";
import { ppNeueBit, matrixSansScreen, matrixSansRaster } from "./fonts";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const lilitaOne = Lilita_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-lilita-one",
});

export const metadata: Metadata = {
  title: "Send Arcade",
  description: "Send Arcade",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//pub-c4d90db77e92437ea367b7af11523bec.r2.dev" />
        <link rel="dns-prefetch" href="//guys.sendarcade.fun" />
        <link rel="dns-prefetch" href="//lanaroads.sendarcade.fun" />
        <link rel="dns-prefetch" href="//blinks.arcade.fun" />
        <link rel="dns-prefetch" href="//t.me" />

        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://pub-c4d90db77e92437ea367b7af11523bec.r2.dev" />
        <link rel="preconnect" href="https://guys.sendarcade.fun" />
        <link rel="preconnect" href="https://lanaroads.sendarcade.fun" />
        <link rel="preconnect" href="https://blinks.arcade.fun" />

        {/* HIGHEST PRIORITY: Carousel images for immediate D-pad functionality */}
        <link
          rel="preload"
          as="image"
          href="/feature-1.png"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/feature-2.png"
          fetchPriority="high"
        />

        {/* Preload critical above-the-fold images */}
        <link rel="preload" as="image" href="/hero-bg.png" />
        <link rel="preload" as="image" href="/arcade-monitor.png" />

        {/* Preload critical product images */}
        <link rel="preload" as="image" href="/products/app-asset.png" />
        <link rel="preload" as="image" href="/products/casset.png" />

        {/* Preload Rive files for joystick */}
        <link
          rel="preload"
          as="fetch"
          href="/joystick.riv"
          crossOrigin="anonymous"
        />

        {/* Video preload hints for metadata only */}
        <link rel="preload" as="video" href="https://pub-c4d90db77e92437ea367b7af11523bec.r2.dev/sendguys-video.mp4" />
        <link rel="preload" as="video" href="https://pub-c4d90db77e92437ea367b7af11523bec.r2.dev/lanaroads-video.mp4" />
        <link rel="preload" as="video" href="https://pub-c4d90db77e92437ea367b7af11523bec.r2.dev/ArcadeApp.mp4" />

        {/* Performance hints */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </head>
      <body
        className={`${ppNeueBit.variable} ${matrixSansScreen.variable} ${matrixSansRaster.variable} ${lilitaOne.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}

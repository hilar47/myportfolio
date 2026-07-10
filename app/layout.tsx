import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";

const barlowCondensed = localFont({
  src: [
    { path: "../public/fonts/barlow-condensed/barlow-condensed-200-normal.woff2", weight: "200", style: "normal" },
    { path: "../public/fonts/barlow-condensed/barlow-condensed-200-italic.woff2", weight: "200", style: "italic" },
    { path: "../public/fonts/barlow-condensed/barlow-condensed-300-normal.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/barlow-condensed/barlow-condensed-300-italic.woff2", weight: "300", style: "italic" },
    { path: "../public/fonts/barlow-condensed/barlow-condensed-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/barlow-condensed/barlow-condensed-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../public/fonts/barlow-condensed/barlow-condensed-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/barlow-condensed/barlow-condensed-500-italic.woff2", weight: "500", style: "italic" },
    { path: "../public/fonts/barlow-condensed/barlow-condensed-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/barlow-condensed/barlow-condensed-600-italic.woff2", weight: "600", style: "italic" },
    { path: "../public/fonts/barlow-condensed/barlow-condensed-700-normal.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/barlow-condensed/barlow-condensed-700-italic.woff2", weight: "700", style: "italic" },
    { path: "../public/fonts/barlow-condensed/barlow-condensed-800-normal.woff2", weight: "800", style: "normal" },
    { path: "../public/fonts/barlow-condensed/barlow-condensed-800-italic.woff2", weight: "800", style: "italic" },
    { path: "../public/fonts/barlow-condensed/barlow-condensed-900-normal.woff2", weight: "900", style: "normal" },
    { path: "../public/fonts/barlow-condensed/barlow-condensed-900-italic.woff2", weight: "900", style: "italic" },
  ],
  display: "swap",
  variable: "--font-display",
});

const dmSans = localFont({
  src: [
    { path: "../public/fonts/dm-sans/dm-sans-300-normal.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/dm-sans/dm-sans-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/dm-sans/dm-sans-500-normal.woff2", weight: "500", style: "normal" },
  ],
  display: "swap",
  variable: "--font-body",
});

const helloParis = localFont({
  src: [
    { path: "../public/fonts/paris-font/HelloParisSansExtraLight.ttf", weight: "200", style: "normal" },
    { path: "../public/fonts/paris-font/HelloParisSansLight.ttf",      weight: "300", style: "normal" },
    { path: "../public/fonts/paris-font/HelloParisSansRegular.ttf",    weight: "400", style: "normal" },
    { path: "../public/fonts/paris-font/HelloParisSansMedium.ttf",     weight: "500", style: "normal" },
    { path: "../public/fonts/paris-font/HelloParisSansBold.ttf",       weight: "700", style: "normal" },
  ],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hilario Goes — Technical Lead & Frontend Developer",
  description:
    "Portfolio of Hilario Goes — 15+ years building enterprise platforms, e-commerce systems, and pixel-perfect UIs across India and the UAE.",
  keywords: [
    "Frontend Developer",
    "Technical Lead",
    "Full Stack Developer",
    "React",
    "Next.js",
    "Dubai",
    "UI/UX",
  ],
  openGraph: {
    title: "Hilario Goes — Technical Lead & Frontend Developer",
    description:
      "15+ years building enterprise platforms, e-commerce systems, and pixel-perfect UIs.",
    url: "https://hilariogoes.com",
    siteName: "Hilario Goes Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${dmSans.variable} ${helloParis.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Bebas_Neue, Barlow } from "next/font/google";
import SocialBar from "@/components/SocialBar";
// import CursorTrail from "@/components/CursorTrail";
import Script from "next/script";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const barlow = Barlow({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-barlow",
});

export const metadata: Metadata = {
  title: "Hilario Goes — Frontend and Full Stack Developer",
  description: "Indian based Technical Lead, Frontend and Full Stack Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bebas.variable} ${barlow.variable}`}>
      <body className="font-barlow antialiased bg-[#111] text-white">
        {/* <CursorTrail /> */}
         <SocialBar />
        {children}

        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
        >
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "wylnib3x08");
          `}
        </Script>
      </body>
    </html>
  );
}

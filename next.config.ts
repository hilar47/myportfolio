import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", //if u want to host on static hosting like cpanel
  images: {
    // If you host images externally, add domains here
    // domains: ["your-cdn.com"],
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,  //this is needed so that the static export works correctly with the SPA routing e.g. about.html and /about both will work.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
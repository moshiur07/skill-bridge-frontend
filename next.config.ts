import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL(
        "https://images.pexels.com/photos/4261793/pexels-photo-4261793.jpeg",
        "https://images.pexels.com/photos/5212675/pexels-photo-5212675.jpeg",
      ),
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/photos/**",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.lunie.dev",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
  },
  experimental: {
    // @ts-expect-error - Next.js undocumented config to allow local network dev access
    allowedDevOrigins: ["localhost", "127.0.0.1", "192.168.1.90"],
  },
};

export default nextConfig;
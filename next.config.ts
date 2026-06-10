import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Avoid Next 15 dev overlay manifest glitches after hot reload / suspended dev servers.
  devIndicators: false,
};

export default nextConfig;

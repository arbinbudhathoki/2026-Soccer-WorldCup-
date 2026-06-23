import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Avoid Next 15 dev overlay manifest glitches after hot reload / suspended dev servers.
  devIndicators: false,
  async redirects() {
    return [
      {
        source: "/tickets",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

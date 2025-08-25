import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //
  images: {
    remotePatterns: [
      new URL('https://pokeapi.co/**'),
      new URL('https://raw.githubusercontent.com/**')
    ],
  },
};

export default nextConfig;

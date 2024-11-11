import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'salt.tkbcdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.tkbcdn.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

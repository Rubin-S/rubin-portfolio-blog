import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  serverExternalPackages: ["firebase-admin"],
};
export default nextConfig;

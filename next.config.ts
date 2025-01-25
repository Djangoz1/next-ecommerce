import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/**",
      },
      // https://pqlckmmlrgajldynkysw.supabase.co/
      {
        protocol: "https",
        hostname: "pqlckmmlrgajldynkysw.supabase.co",

        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

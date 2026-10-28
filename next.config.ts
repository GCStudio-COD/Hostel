import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const backendHost = process.env.BACKEND_HOST || 'http://localhost:5000';
    return [
      {
        source: '/api/:path*',
        destination: `${backendHost}/api/:path*`,
      },
    ];
  },
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

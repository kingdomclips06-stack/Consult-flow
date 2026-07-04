// @ts-check
import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Security headers are managed via vercel.json

  // Enable React strict mode for development
  reactStrictMode: true,

  // Ignore TypeScript and ESLint during builds to optimize memory
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },

  // Compression
  compress: true,

  // HTTP headers (in addition to vercel.json)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#general-options

  org: process.env.SENTRY_ORG || "",
  project: process.env.SENTRY_PROJECT || "",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to their corresponding source maps (disabled by default)
  tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically delete source maps after uploading
  deleteSourcemapsAfterUpload: true,

  // Enable Sentry in development for faster debugging
  disableClientWebpackPlugin: process.env.NODE_ENV === "development",
  disableServerWebpackPlugin: process.env.NODE_ENV === "development",
});
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

// Basic hardening for every response. A full Content-Security-Policy is left
// out on purpose: the Google Maps iframe, JSON-LD and Next.js inline scripts
// would need a nonce setup; frame-ancestors alone stops clickjacking.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  poweredByHeader: false,
  // <Photo> checks public/images on the server to choose between the photo and
  // a placeholder. Serverless bundles do not contain public/ by default, so a
  // page regenerated at runtime would lose its photos without this.
  outputFileTracingIncludes: {
    "/*": ["./public/images/**/*"],
    "/*/*": ["./public/images/**/*"],
  },
  headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
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

export default withNextIntl(nextConfig);

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      "/research/ongoing/source-localization/presentation/[[...file]]": ["./private/ongoing-research.enc"],
      "/research/ongoing/same-images-different-headsets/presentation/[[...file]]": ["./private/same-images-different-headsets.enc"],
    },
  },
  async headers() {
    return [
      {
        source: "/research/ongoing/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
          { key: "Referrer-Policy", value: "no-referrer" },
          { key: "Cache-Control", value: "private, no-store, max-age=0, must-revalidate" },
        ],
      },
    ]
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig

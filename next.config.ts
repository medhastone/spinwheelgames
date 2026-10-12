import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  experimental: {
    staticGenerationMaxConcurrency: 1,
  },
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  /* experimental */
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/(.*\\.(?:ico|png|svg|jpg|jpeg|gif|webp|avif|woff2))',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(robots.txt|sitemap.xml|sitemaps/:path*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200',
          },
        ],
      },
      {
        source: '/((?!api|_next).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=31536000, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: '/d2', destination: '/dice/d2', permanent: true },
      { source: '/d4', destination: '/roll-1d4', permanent: true },
      { source: '/dice/d4', destination: '/roll-1d4', permanent: true },
      { source: '/dice/4d6', destination: '/roll-4d6', permanent: true },
      { source: '/d6', destination: '/dice/d6', permanent: true },
      { source: '/d8', destination: '/dice/d8', permanent: true },
      { source: '/d10', destination: '/dice/d10', permanent: true },
      { source: '/d12', destination: '/dice/d12', permanent: true },
      { source: '/d20', destination: '/dice/d20', permanent: true },
      { source: '/d100', destination: '/dice/d100', permanent: true },
      { source: '/dice-average', destination: '/dice-average-calculator', permanent: true },
      { source: '/dnd-stats', destination: '/dnd-stat-roller', permanent: true },
      { source: '/roll-3d6', destination: '/dice-roller', permanent: true },
      { source: '/roll-5d6', destination: '/dice-roller', permanent: true },
      { source: '/roll-2d12', destination: '/dice-roller', permanent: true },
      { source: '/roll-d3', destination: '/dice-roller', permanent: true },
      { source: '/fair-randomness', destination: '/fairness', permanent: true },
      { source: '/4d6', destination: '/roll-4d6', permanent: true },
      { source: '/bingo-spin-wheel', destination: '/bingo-wheel', permanent: true },
    ];
  },
  // output: 'standalone',
  transpilePackages: ['motion', 'canvas-confetti'],
  webpack: (config, {dev}) => {
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;

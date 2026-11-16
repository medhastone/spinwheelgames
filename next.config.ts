import type {NextConfig} from 'next';

const isGithubPages = process.env.GITHUB_PAGES === 'true';
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() || '';
const githubPagesBasePath =
  isGithubPages && rawBasePath && rawBasePath !== '/'
    ? rawBasePath.startsWith('/')
      ? rawBasePath.replace(/\/+$/, '')
      : `/${rawBasePath.replace(/\/+$/, '')}`
    : undefined;

const nextConfig: NextConfig = {
  ...(isGithubPages ? { output: 'export' as const } : {}),
  ...(githubPagesBasePath
    ? { basePath: githubPagesBasePath, assetPrefix: githubPagesBasePath }
    : {}),
  experimental: {
    staticGenerationMaxConcurrency: 1,
    staleTimes: {
      dynamic: 30,
      static: 300,
    },
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
    ...(isGithubPages ? { unoptimized: true } : {}),
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2678400,
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
  ...(isGithubPages
    ? {}
    : {
        async headers() {
          if (process.env.NODE_ENV !== 'production') {
            return [];
          }
          return [
            {
              source: '/:path*',
              headers: [
                {
                  key: 'Strict-Transport-Security',
                  value: 'max-age=63072000; includeSubDomains; preload',
                },
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
              source: '/_next/static/:path*',
              headers: [
                {
                  key: 'Cache-Control',
                  value: 'public, max-age=31536000, immutable',
                },
              ],
            },
            {
              source: '/_next/image/:path*',
              headers: [
                {
                  key: 'Cache-Control',
                  value: 'public, max-age=86400, s-maxage=31536000, stale-while-revalidate=604800',
                },
                {
                  key: 'Vercel-CDN-Cache-Control',
                  value: 'public, s-maxage=31536000, immutable',
                },
              ],
            },
            {
              source: '/(.*\\.(?:ico|png|svg|jpg|jpeg|gif|webp|avif|woff2|woff|ttf|eot|css|js|webmanifest))',
              headers: [
                {
                  key: 'Cache-Control',
                  value: 'public, max-age=31536000, immutable',
                },
              ],
            },
            {
              source: '/((?!api|_next|w/|stream-control|robots\\.txt|sitemap\\.xml|sitemaps|llms\\.txt).*)',
              headers: [
                {
                  key: 'Cache-Control',
                  value: 'public, max-age=300, s-maxage=31536000, stale-while-revalidate=86400',
                },
                {
                  key: 'CDN-Cache-Control',
                  value: 'public, s-maxage=31536000, stale-while-revalidate=86400',
                },
                {
                  key: 'Vercel-CDN-Cache-Control',
                  value: 'public, s-maxage=31536000, stale-while-revalidate=86400',
                },
              ],
            },
            {
              source: '/(robots.txt|sitemap.xml|sitemaps/:path*|llms.txt)',
              headers: [
                {
                  key: 'Cache-Control',
                  value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
                },
                {
                  key: 'CDN-Cache-Control',
                  value: 'public, s-maxage=86400, stale-while-revalidate=604800',
                },
                {
                  key: 'Vercel-CDN-Cache-Control',
                  value: 'public, s-maxage=86400, stale-while-revalidate=604800',
                },
              ],
            },
          ];
        },
        async redirects() {
          return [];
        },
      }),
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

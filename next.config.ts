import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Optimize device sizes for common breakpoints
    deviceSizes: [320, 480, 640, 750, 828, 1080, 1200],
    // Adjust image sizes for thumbnails and previews
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24, // 24 hours
    // Disable blur placeholder for better CLS
    disableStaticImages: true,
  },
  experimental: {
    turbo: {
      rules: {
        "*.png": ["file-loader"],
        "*.jpg": ["file-loader"],
        "*.webp": ["file-loader"],
        "*.avif": ["file-loader"],
        "*.woff": ["file-loader"],
      },
    },
    optimizeCss: true,
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  headers: async () => {
    return [
      {
        source: "/:all*(svg|jpg|png|webp|avif|woff)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          // Add priority hints for images
          {
            key: "Priority",
            value: "high",
          },
          // Add resource hints
          {
            key: "Link",
            value: '<https://vercel.live>; rel="preconnect"',
          }
        ],
      },
      {
        source: "/:all*(js|css)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          // Add priority hints for critical resources
          {
            key: "Priority",
            value: "high",
          }
        ],
      },
    ];
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
        splitChunks: {
          chunks: "all",
          minSize: 20000,
          maxSize: 244000,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;

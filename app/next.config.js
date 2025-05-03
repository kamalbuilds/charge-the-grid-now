/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.unsplash.com'],
  },
  eslint: {
    // Temporarily disable eslint during development
    ignoreDuringBuilds: true,
  }
};

module.exports = nextConfig; 
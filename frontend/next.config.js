
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export', // For static exports
  distDir: 'dist',  // Match Vite's default output directory
};

module.exports = nextConfig;

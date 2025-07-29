/* eslint-env node */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Generate a static export for GitHub Pages
  output: 'export',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  transpilePackages: ['@dentor/ui', '@dentor/config'],
};

module.exports = nextConfig;

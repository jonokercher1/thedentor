/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  transpilePackages: ['@dentor/ui'],
};

module.exports = nextConfig;

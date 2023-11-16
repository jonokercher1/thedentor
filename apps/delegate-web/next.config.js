
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  transpilePackages: ['@dentor/ui', '@dentor/config'],
  redirects() {
    return [
      {
        source: '/',
        destination: '/courses/in-person/discover',
        permanent: false,
      },
      {
        source: '/courses',
        destination: '/courses/in-person/discover',
        permanent: false,
      },
      {
        source: '/courses/in-person',
        destination: '/courses/in-person/discover',
        permanent: false,
      },
    ]
  }
};

module.exports = nextConfig;

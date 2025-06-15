/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  experimental: {
    turbo: {
      loaders: {},
    },
  },
};

export default nextConfig;

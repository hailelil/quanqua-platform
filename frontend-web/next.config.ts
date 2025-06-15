/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enables static HTML export
  experimental: {
    turbo: {
      loaders: {}, // Disable Turbopack (fixes dev/build compatibility)
    },
  },
};

export default nextConfig;

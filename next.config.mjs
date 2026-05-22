/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Produces a self-contained build in .next/standalone — required for Docker
  output: 'standalone',
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Inlined at build time so the F3 debug overlay can report what's actually deployed.
  env: {
    BUILD_TIME: new Date().toISOString(),
    COMMIT_SHA: process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.GITHUB_SHA ?? '',
  },
  // Produces a self-contained build in .next/standalone — required for Docker
  output: 'standalone',
};

export default nextConfig;

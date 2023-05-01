/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig

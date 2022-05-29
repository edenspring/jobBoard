/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    if (process.env.NODE_ENV !== 'production') {

      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:5000/api/:path*' // Proxy to Backend
        }
      ]
    } else return []
  },
}

module.exports = nextConfig

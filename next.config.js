/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lingua-books-images.s3.*.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  }
}

module.exports = nextConfig
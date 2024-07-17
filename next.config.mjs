/** @type {import('next').NextConfig} */

// TODO: might add github profile url need to check by login
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
    ],
  },
}

export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**"
      },
      {
        protocol: "https",
        hostname: "i.scdn.co",
        port: "",
        pathname: '/image/**',
      },
      {
        protocol: "https",
        hostname: "covers.openlibrary.org",
        port: "",
        pathname: "/b/**"
      }
    ]
  }
};

export default nextConfig;
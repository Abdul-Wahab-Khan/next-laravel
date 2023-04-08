/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: "http://myapp.test/api",
    ASSETS_URL: "http://myapp.test",
  },
  images: {
    domains: ["myapp.test"],
  },
};

module.exports = nextConfig;

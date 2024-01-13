/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['tailwindui.com', 'images.unsplash.com', 'khotwh.com'],
    dangerouslyAllowSVG: true,
  },
}

module.exports = nextConfig

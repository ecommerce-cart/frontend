/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['tailwindui.com', 'images.unsplash.com', 'khotwh.com'],
    dangerouslyAllowSVG: true,
  },
}

module.exports = nextConfig

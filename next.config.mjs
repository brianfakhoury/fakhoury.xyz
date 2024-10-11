/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["lucide-react"],
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;

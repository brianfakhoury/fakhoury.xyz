/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["lucide-react"],
  reactStrictMode: true,
  images: {
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;

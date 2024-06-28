/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/kiem-duyet/san-pham",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dang-nhap",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

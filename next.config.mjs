const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/plunk/:path*",
        destination: "https://next-api.useplunk.com/:path*",
      },
    ];
  },
};


export default nextConfig;

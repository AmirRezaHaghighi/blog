/** @type {import('next').NextConfig} */
const imageHostname = process.env.NEXT_PUBLIC_IMAGE_REMOTE_HOSTNAME;

const nextConfig = {
  images: {
    remotePatterns: imageHostname
      ? [
          {
            protocol: "https",
            hostname: imageHostname,
            port: "",
            pathname: "/**",
          },
        ]
      : [],
  },
};
export default nextConfig;
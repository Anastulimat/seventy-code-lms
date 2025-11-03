import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                hostname: "seventy-code-lms.t3.storage.dev",
                port: "",
                protocol: "https",
            },
        ],
    },
};

export default nextConfig;

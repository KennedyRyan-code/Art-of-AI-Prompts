/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com", //lh3.googleusercontent.com
                port: "",
                pathname: "/a/**",
            },
        ],
    },
    webpack(config) {
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        };
        return config;
    }
};

export default nextConfig;

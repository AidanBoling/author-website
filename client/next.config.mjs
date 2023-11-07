/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    distDir: './dist', // Changes the build output directory to `./dist/`.

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                port: '',
            },
        ],
    },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'standalone',
    distDir: './build', // Changes the build output directory to `./dist/`.

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                port: '',
            },
        ],
    },

    // compiler: {
    //     removeConsole: {
    //         exclude: ['error'],
    //     },
    // },
};

export default nextConfig;

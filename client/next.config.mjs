/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'standalone',
    distDir: './build', // Changes the build output directory to `./dist/`.

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'd2w3fdea7tfrpv.cloudfront.net',
                port: '',
            },

            {
                protocol: 'https',
                hostname: 'picsum.photos',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
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

/** @type {import('next').NextConfig} */
module.exports = {
    // assetPrefix: 'https://multipurpose-v2.vercel.app',
    images: {
        remotePatterns: [
            { hostname: 'cdn.sanity.io' },
            { hostname: 'source.unsplash.com' },
            { hostname: 'images.unsplash.com' },
        ],
    },
    reactStrictMode: false,
    typescript: {
        // Ignore TypeScript errors during build
        ignoreBuildErrors: true,
    },
    eslint: {
        // Ignore ESLint errors during build
        ignoreDuringBuilds: true,
    },
}

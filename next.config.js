/** @type {import('next').NextConfig} */
module.exports = {
    // assetPrefix: 'https://multipurpose-v2.vercel.app',
    async rewrites() {
        return [
            {
                source: '/reset-password',
                destination: '/reset-password.html',
            },
            {
                source: '/stripe-account-linked',
                destination: '/Stripe_Account_Linked.html',
            },
            {
                source: '/stripe-account-link-expired',
                destination: '/Stripe_Account_Link_Expired.html',
            },
        ]
    },
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

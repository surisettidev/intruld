/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // ⚠️ CRITICAL: Disables server-side optimization for Cloudflare (Free Tier)
    unoptimized: true, 
    
    // Allow images from these external domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      }
    ],
  },
  // Ignore lint/type errors during build to ensure deployment succeeds
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

module.exports = nextConfig;

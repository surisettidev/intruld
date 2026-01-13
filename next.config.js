/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // This tells Next.js to just use the image URL as-is
    unoptimized: true, 
    
    // Allow images from these external domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co', // This covers your database images
      }
    ],
  },
};

module.exports = nextConfig;

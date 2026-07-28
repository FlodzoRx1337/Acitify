/** @type {import("next").NextConfig} */

require("dotenv").config();

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: `${process.env.SUPABASE_REFERENCE_ID}.supabase.co`,
      },
    ],
  },
};

module.exports = nextConfig;

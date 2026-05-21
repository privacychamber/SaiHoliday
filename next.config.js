/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProd ? '/SaiHoliday' : '',
  assetPrefix: isProd ? '/SaiHoliday/' : '',
  images: {
    unoptimized: true, // Required for static export
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? '/SaiHoliday' : '',
  },
};

module.exports = nextConfig;


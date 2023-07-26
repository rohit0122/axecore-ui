/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  productionBrowserSourceMaps: true,
  publicRuntimeConfig: {
    projectDomain: 'https://axecore-prp10al5v-rohit0122.vercel.app/',
    socketConnectDomain: 'https://axecore-prp10al5v-rohit0122.vercel.app:3200/'
  },
}

module.exports = nextConfig

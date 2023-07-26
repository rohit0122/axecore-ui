/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  productionBrowserSourceMaps: true,
  publicRuntimeConfig: {
    projectDomain: 'http://localhost:3000/',
    socketConnectDomain: 'http://localhost:3200/'
  },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  productionBrowserSourceMaps: true,
  publicRuntimeConfig: {
    projectDomain: '',
    socketConnectDomain: ''
  },
}

module.exports = nextConfig

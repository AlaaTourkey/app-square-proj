/** @type {import('next').NextConfig} */
const { i18n } = require('next-i18next');

const nextConfig = {
  i18n: {
    locales: ['en', 'ar'],  
    defaultLocale: 'en', 
    localeDetection: false,
  },
};

module.exports = nextConfig;
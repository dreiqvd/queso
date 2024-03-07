/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./apps/**/src/**/*.{html,ts}', './libs/**/src/**/*.{html,ts}'],
  theme: {
    extend: {},
    screens: {
      'mobile-sm': { max: '360px' },
      'mobile-md': { max: '480px' },
      'tablet-sm': { max: '640px' },
      'tablet-md': { max: '768px' },
      'desktop-sm': { max: '1024px' },
      'desktop-md': { max: '1366px' },
      'desktop-lg': { max: '1919px' },
      'screen-4k': { min: '1920px' },
      'view-short': { min: '768px', max: '768px' }
    }
  },
  plugins: [],
  blocklist: ['container'],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./apps/**/src/**/*.{html,ts}', './libs/**/src/**/*.{html,ts}'],
  theme: {
    extend: {},
    /**
     * Any update in breakpoints should be manually applied to:
     * - constants.ts (in libs/shared/common)
     * - tailwind.config.js
     * - _breakpoints.scss
    */
    screens: {
      'mobile-sm': { max: '360px' },
      'mobile-md': { max: '480px' },
      'tablet-sm': { max: '640px' },
      'tablet-md': { max: '768px' },
      'desktop-sm': { max: '1024px' },
      'desktop-md': { max: '1366px' },
      'desktop-lg': { min: '1367px' },
      'view-short': { min: '768px', max: '768px' }
    }
  },
  plugins: [],
  blocklist: ['container'],
};

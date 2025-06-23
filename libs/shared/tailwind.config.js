const { fontFamily } = require('tailwindcss/defaultTheme');
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
      'view-short': { raw: '(max-height: 768px)' },
      'desktop-lg': { min: '1367px' },
      'desktop-md': { max: '1366px' },
      'desktop-sm': { max: '1024px' },
      'tablet-md': { max: '768px' },
      'tablet-sm': { max: '640px' },
      'mobile-md': { max: '480px' },
      'mobile-sm': { max: '360px' },
    },
    colors: {
      transparent: 'transparent',
      'transluscent-white': 'rgba(255, 255, 255, 0.5)',
      white: '#FFFFFF',
      gray: {
        DEFAULT: 'var(--color-gray)',
        50: 'var(--color-gray-50)',
        100: 'var(--color-gray-100)',
        200: 'var(--color-gray-200)',
        300: 'var(--color-gray-300)',
        400: 'var(--color-gray-400)',
        500: 'var(--color-gray-500)',
        600: 'var(--color-gray-600)',
        700: 'var(--color-gray-700)',
        800: 'var(--color-gray-800)',
        900: 'var(--color-gray-900)',
      },
      primary: {
        DEFAULT: 'var(--color-primary)',
        50: 'var(--color-primary-50)',
        100: 'var(--color-primary-100)',
        200: 'var(--color-primary-200)',
        300: 'var(--color-primary-300)',
        400: 'var(--color-primary-400)',
        500: 'var(--color-primary-500)',
        600: 'var(--color-primary-600)',
        700: 'var(--color-primary-700)',
        800: 'var(--color-primary-800)',
        900: 'var(--color-primary-900)',
      },
      accent: {
        DEFAULT: 'var(--color-accent)',
        50: 'var(--color-accent-50)',
        100: 'var(--color-accent-100)',
        200: 'var(--color-accent-200)',
        300: 'var(--color-accent-300)',
        400: 'var(--color-accent-400)',
        500: 'var(--color-accent-500)',
        600: 'var(--color-accent-600)',
        700: 'var(--color-accent-700)',
        800: 'var(--color-accent-800)',
        900: 'var(--color-accent-900)',
      },
      red: {
        DEFAULT: 'var(--color-red)',
        50: 'var(--color-red-50)',
        100: 'var(--color-red-100)',
        200: 'var(--color-red-200)',
        300: 'var(--color-red-300)',
        400: 'var(--color-red-400)',
        500: 'var(--color-red-500)',
        600: 'var(--color-red-600)',
        700: 'var(--color-red-700)',
        800: 'var(--color-red-800)',
        900: 'var(--color-red-900)',
      },
      green: {
        DEFAULT: 'var(--color-green)',
        50: 'var(--color-green-50)',
        100: 'var(--color-green-100)',
        200: 'var(--color-green-200)',
        300: 'var(--color-green-300)',
        400: 'var(--color-green-400)',
        500: 'var(--color-green-500)',
        600: 'var(--color-green-600)',
        700: 'var(--color-green-700)',
        800: 'var(--color-green-800)',
        900: 'var(--color-green-900)',
      },
    },
    textColor: ({ theme }) => ({
      'default-color': 'var(--text-default-color)',
      'body-light': 'var(--text-body-light)',
      ...theme('colors'),
    }),
    boxShadow: {
      DEFAULT: 'var(--box-shadow-default)',
      sidebar: '2px 0 4px -2px var(--color-gray-200)',
    },
    fontFamily: () => ({
      ...fontFamily,
      body: ['var(--font-body)'],
      heading: ['var(--font-heading)'],
    }),
    zIndex: {
      fixed: 'var(--z-fixed)',
      highest: 'var(--z-highest)',
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Disable Tailwind's default styles
  },
  // Following blocklist are preferred to be used without default styling
  blocklist: ['container'],
};

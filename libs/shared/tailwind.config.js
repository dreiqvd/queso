/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./apps/**/src/**/*.{html,ts}', './libs/**/src/**/*.{html,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],
  blocklist: ['container'],
};
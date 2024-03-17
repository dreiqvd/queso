const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');
const sharedTailwindConfig = require('../../libs/shared/tailwind.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [sharedTailwindConfig],
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        'accent-red': 'var(--color-accent-red)',
        'accent-purple':  'var(--color-accent-purple)',
      },
      dropShadow: {
        DEFAULT: '0px 8px 24px rgba(149, 157, 165, 0.2)',
      },
      fontFamily: {
        secondary: 'Inconsolata, sans-serif'
      }
    },
  }
};

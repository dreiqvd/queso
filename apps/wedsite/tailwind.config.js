// tailwind.config.js
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
        toupe: {
          DEFAULT: 'var(--color-toupe)',
          50: 'var(--color-toupe-50)',
          100: 'var(--color-toupe-100)',
          200: 'var(--color-toupe-200)',
          300: 'var(--color-toupe-300)',
          400: 'var(--color-toupe-400)',
          500: 'var(--color-toupe-500)',
          600: 'var(--color-toupe-600)',
          700: 'var(--color-toupe-700)',
          800: 'var(--color-toupe-800)',
          900: 'var(--color-toupe-900)',
        },
      },
      fontFamily: {
        'main-heading': ['var(--font-heading)', 'serif'],
        'sub-heading': ['var(--font-subheading)', 'serif'],
      },
    },
  },
};

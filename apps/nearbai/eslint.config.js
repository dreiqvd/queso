const angularEslintConfig = require('../../eslint-angular.config');

module.exports = [
  ...angularEslintConfig,
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
    languageOptions: {
      parserOptions: {
        project: ['apps/nearbai/tsconfig.*?.json'],
      },
    },
  },
];

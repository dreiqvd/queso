const angularEslintConfig = require('../../eslint-angular.config');

module.exports = [
  ...angularEslintConfig,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: ['libs/common/tsconfig.*?.json'],
      },
    },
  },
];

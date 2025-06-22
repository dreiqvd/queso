const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const nxEslintPlugin = require('@nx/eslint-plugin');
const typescriptEslintEslintPlugin = require('@typescript-eslint/eslint-plugin');
const angularEslintEslintPlugin = require('@angular-eslint/eslint-plugin');
const eslintPluginImport = require('eslint-plugin-import');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  {
    plugins: {
      '@nx': nxEslintPlugin,
      '@typescript-eslint': typescriptEslintEslintPlugin,
      '@angular-eslint': angularEslintEslintPlugin,
      import: eslintPluginImport,
    },
  },
  {
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: [
            './tsconfig.base.json',
            './apps/*/tsconfig.json',
            './libs/*/tsconfig.json',
          ],
        },
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: 'scope:shared',
              onlyDependOnLibsWithTags: ['scope:shared'],
            },
            {
              sourceTag: 'scope:portfolio',
              onlyDependOnLibsWithTags: ['scope:shared', 'scope:portfolio'],
            },
            {
              sourceTag: 'scope:portfolio2',
              onlyDependOnLibsWithTags: ['scope:shared', 'scope:portfolio2'],
            },
            {
              sourceTag: 'scope:nearbai',
              onlyDependOnLibsWithTags: ['scope:shared', 'scope:nearbai'],
            },
            {
              sourceTag: 'scope:cashflow',
              onlyDependOnLibsWithTags: ['scope:shared', 'scope:cashflow'],
            },
            {
              sourceTag: 'scope:wedsite',
              onlyDependOnLibsWithTags: ['scope:shared', 'scope:wedsite'],
            },
            {
              sourceTag: 'type:app',
              onlyDependOnLibsWithTags: ['type:utils', 'type:ui'],
            },
            {
              sourceTag: 'type:ui',
              onlyDependOnLibsWithTags: ['type:utils', 'type:ui'],
            },
            {
              sourceTag: 'type:utils',
              onlyDependOnLibsWithTags: ['type:utils'],
            },
          ],
        },
      ],
    },
  },
  ...compat
    .config({
      extends: [
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:@nx/typescript',
      ],
    })
    .map((config) => ({
      ...config,
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        ...config.rules,
        'no-console': 'warn',
        'import/no-unresolved': 'error',
        'import/order': [
          'error',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              ['parent', 'sibling'],
              'index',
              'unknown',
            ],
            alphabetize: { order: 'asc', caseInsensitive: true },
            pathGroups: [
              { pattern: '@/**', group: 'internal', position: 'after' },
              { pattern: './**', group: 'sibling', position: 'after' },
            ],
            'newlines-between': 'always',
          },
        ],
        'sort-imports': [
          'error',
          {
            allowSeparatedGroups: true,
            ignoreCase: true,
            ignoreDeclarationSort: true,
            ignoreMemberSort: false,
            memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          },
        ],
        'no-trailing-spaces': 'error',
        semi: 'error',
        quotes: [2, 'single', { avoidEscape: true }],
        '@typescript-eslint/explicit-function-return-type': 'error',
      },
    })),
  ...compat.config({ extends: ['plugin:@nx/javascript'] }).map((config) => ({
    ...config,
    files: ['**/*.js', '**/*.jsx'],
    rules: { ...config.rules },
  })),
  ...compat.config({ env: { jest: true } }).map((config) => ({
    ...config,
    files: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.spec.js', '**/*.spec.jsx'],
    rules: { ...config.rules },
  })),
];

import globals from 'globals';
import pluginJs from '@eslint/js';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  {
    files: ['**/*.js', '**/*.jsx', '**/*.mjs'],
  },
  {
    ignores: ['**/*.min.js', '**/dealer-locator/vendor/*'],
  },
  {
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  prettierRecommended,
  {
    rules: {
      curly: 'error',
      'comma-dangle': ['error', 'always-multiline'],
      'comma-spacing': ['error', { before: false, after: true }],
      'comma-style': ['error', 'last'],
      'no-extra-semi': 'error',
      'no-tabs': 'error',
      'func-names': ['warn', 'as-needed'],
      semi: ['error', 'always'],
      'no-nested-ternary': 'error',
      'no-unused-vars': 'warn',
      'no-duplicate-imports': ['error', { includeExports: true }],
      'one-var': ['error', 'never'],
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-template': 'error',
      'no-multiple-empty-lines': 'error',
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'function' },
        { blankLine: 'always', prev: 'function', next: 'function' },
      ],
      quotes: ['error', 'single'],
      'no-constant-binary-expression': 'error',
    },
  },
];

import globals from 'globals';
import pluginJs from '@eslint/js';
import { defineConfig } from 'eslint/config';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

const mainConfig = {
  languageOptions: { globals: globals.browser },
  ...pluginJs.configs.recommended,
  ...prettierRecommended,
  files: ['**/*.js', '**/*.mjs'],
  ignores: ['**/*.min.js', '**/dealer-locator/vendor/*', './e2e-report/**'],
  rules: {
    curly: 'error',
    'no-undef': 'error',
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
};

export default defineConfig([
  {
    ...mainConfig,
  },
  {
    ...mainConfig,
    languageOptions: { globals: globals.node },
    files: ['e2e/**/*.js'],
  },
]);

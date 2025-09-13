import base from './base.js';
import nextPlugin from '@next/eslint-plugin-next';
import reactHooks from 'eslint-plugin-react-hooks';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import globals from 'globals';

export default [
  ...base,
  {
    plugins: {
      '@next/next': nextPlugin,
      'react-hooks': reactHooks,
      '@typescript-eslint': tsPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...base[1].rules,
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'warn',
      'react-hooks/exhaustive-deps': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
];

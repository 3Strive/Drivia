import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';

export default [
  {
    ignores: [
      '**/.next/**', // ignore Next.js build output
      '**/dist/**', // ignore dist folders
      '**/node_modules/**', // always ignore deps
    ],
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react,
    },
    rules: {
      // example rules
      'react/react-in-jsx-scope': 'off',
    },
  },
];

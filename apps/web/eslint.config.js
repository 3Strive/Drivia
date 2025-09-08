import react from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';

const eslintConfig = [
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
        // project: "./tsconfig.json"  // optional
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
];

export default eslintConfig;

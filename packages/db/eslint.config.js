import nestConfig from '@drivia/eslint-config/nest-js';

export default [
  ...nestConfig,
  {
    ignores: ['**/*.spec.ts', '**/*.test.ts', 'dist/**'],
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    files: ['**/*.ts'],
    settings: {
      'import/resolver': {
        typescript: {
          project: 'packages/db/tsconfig.json',
        },
      },
    },
  },
];

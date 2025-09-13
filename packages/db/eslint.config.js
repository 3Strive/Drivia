import nestConfig from '@drivia/eslint-config/nest-js';

export default [
  ...nestConfig,
  {
    ignores: ['**/*.spec.ts', '**/*.test.ts', 'dist/**'],
  },
  {
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

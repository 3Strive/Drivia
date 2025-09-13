import nestConfig from '@repo/eslint-config/nest-js';

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
          project: 'services/chat-services/tsconfig.json',
        },
      },
    },
  },
];

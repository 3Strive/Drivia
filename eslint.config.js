import path from 'path';
import { fileURLToPath } from 'url';
import webConfig from './apps/web/eslint.config.js';
import adminConfig from './apps/admin/eslint.config.js';
import authConfig from './services/auth/eslint.config.js';
import gatewayConfig from './services/gateway/eslint.config.js';
import dbConfig from './packages/db/eslint.config.js';
import utilsConfig from './packages/utils/eslint.config.js';
import baseConfig from './packages/eslint-config/base.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  ...webConfig.map((config) => ({
    ...config,
    files: ['apps/web/**/*.{ts,tsx}'],
  })),

  {
    ignores: [
      '**/dist/**',
      '**/.next/**',
      '**/node_modules/**',
      'packages/db/prisma/**',
      'apps/drivia-mobile/**/*.{ts,tsx}',
    ],
  },

  ...dbConfig.map((config) => ({
    ...config,
    files: ['packages/db/**/*.{ts,tsx}'],
  })),

  ...utilsConfig.map((config) => ({
    ...config,
    files: ['packages/utils/**/*.{ts,tsx}'],
  })),

  ...adminConfig.map((config) => ({
    ...config,
    files: ['apps/admin/**/*.{ts,tsx}'],
  })),

  ...baseConfig.map((config) => ({
    ...config,
    files: ['**/*.{ts,tsx}'],
  })),

  ...authConfig.map((config) => ({
    ...config,
    files: ['services/auth/**/*.{ts,tsx}'],
  })),

  ...gatewayConfig.map((config) => ({
    ...config,
    files: ['services/gateway/**/*.{ts,tsx}'],
  })),
];

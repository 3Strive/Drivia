import path from 'path';
import { fileURLToPath } from 'url';
import webConfig from './apps/web/eslint.config.js';
import adminConfig from './apps/admin/eslint.config.js';
import baseConfig from './packages/eslint-config/base.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    ignores: ['**/dist/**', '**/.next/**', '**/node_modules/**'],
  },

  ...webConfig.map((config) => ({
    ...config,
    files: ['apps/web/**/*.{ts,tsx}'],
  })),

  ...adminConfig.map((config) => ({
    ...config,
    files: ['apps/admin/**/*.{ts,tsx}'],
  })),

  ...baseConfig.map((config) => ({
    ...config,
    files: ['**/*.{ts,tsx}'],
  })),
];

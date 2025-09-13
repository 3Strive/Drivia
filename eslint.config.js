import path from 'path';
import { fileURLToPath } from 'url';
import webConfig from './apps/web/eslint.config.js';
import adminConfig from './apps/admin/eslint.config.js';
import dbConfig from './packages/db/eslint.config.js';
import utilsConfig from './packages/utils/eslint.config.js';
import baseConfig from './packages/eslint-config/base.js';
import chatServicesConfig from './services/chat-services/eslint.config.js';
import authServicesConfig from './services/auth-services/eslint.config.js';

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

  ...chatServicesConfig.map((config) => ({
    ...config,
    files: ['services/chat-services/**/*.{ts,tsx}'],
  })),

  ...authServicesConfig.map((config) => ({
    ...config,
    files: ['services/auth-services/**/*.{ts,tsx}'],
  })),

  ...baseConfig.map((config) => ({
    ...config,
    files: ['**/*.{ts,tsx}'],
  })),
];

import path from "path";
import { fileURLToPath } from "url";
import webConfig from "./apps/web/eslint.config.js";
import adminConfig from "./apps/admin/eslint.config.js";
import baseConfig from "@drivia/eslint-config/base";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default [
  {
    ignores: ["**/dist/**", "**/.next/**", "**/node_modules/**"],
  },

  // ✅ Add React + hooks plugin + rules globally
  {
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off", // no need for React import in JSX
      "no-undef": "off", // fixes React undefined errors
    },
    files: ["**/*.{ts,tsx,jsx,js}"],
  },

  ...webConfig.map((config) => ({
    ...config,
    files: ["apps/web/**/*.{ts,tsx}"],
  })),

  ...adminConfig.map((config) => ({
    ...config,
    files: ["apps/admin/**/*.{ts,tsx}"],
  })),

  ...baseConfig.map((config) => ({
    ...config,
    files: ["**/*.{ts,tsx}"],
  })),
];

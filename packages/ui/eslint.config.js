import tsParser from "@typescript-eslint/parser";
import reactConfig from "@drivia/eslint-config/react-internal.js";

export default [
  ...reactConfig,
  {
    ignores: ["dist/**"],
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        React: true,
        JSX: true,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {},
      },
    },
  },
];

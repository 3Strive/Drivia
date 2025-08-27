import js from "@eslint/js";
import spellcheck from "eslint-plugin-spellcheck";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import jsdoc from "eslint-plugin-jsdoc";
import prettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";

export default [
  js.configs.recommended,
  prettier,
  {
    plugins: {
      import: importPlugin,
      "unused-imports": unusedImports,
      "simple-import-sort": simpleImportSort,
      spellcheck: spellcheck,
      jsdoc: jsdoc,
    },
    rules: {
      "no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",

      complexity: ["warn", 15],
      "max-depth": ["warn", 4],
      "max-lines": ["error", 300],
      "max-lines-per-function": ["warn", 100],
      "max-nested-callbacks": ["warn", 3],
      "max-params": ["warn", 10],
    },
  },
];

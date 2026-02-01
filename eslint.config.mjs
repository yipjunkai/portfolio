// @ts-check
import { defineConfig } from "eslint/config";
import eslintPluginTailwindcss from "eslint-plugin-tailwindcss";
import eslintPluginNext from "@next/eslint-plugin-next";

import tsEslint from "typescript-eslint";
import globals from "globals";
import js from "@eslint/js";
import unusedImports from "eslint-plugin-unused-imports";
import eslintConfigPrettier from "eslint-config-prettier";

import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const configs = defineConfig(
  {
    ignores: ["node_modules", "dist", ".next", "**/*.d.ts", "public", "messages"]
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    extends: [js.configs.recommended, tsEslint.configs.disableTypeChecked]
  },
  {
    files: ["**/*.{ts,tsx,spec.ts,spec.tsx}"],
    extends: [tsEslint.configs.recommended, tsEslint.configs.stylistic]
  },
  {
    plugins: {
      "unused-imports": unusedImports,
      "@typescript-eslint": tsEslint.plugin
    },
    rules: {
      "max-len": [
        "error",
        {
          code: 120,
          ignoreComments: true,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true
        }
      ],

      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true,
          caughtErrors: "none",
          destructuredArrayIgnorePattern: "^_"
        }
      ]
    }
  },
  {
    plugins: {
      tailwindcss: eslintPluginTailwindcss,
      "@next/next": eslintPluginNext
    },
    rules: {
      ...eslintPluginNext.configs.recommended.rules,
      ...eslintPluginNext.configs["core-web-vitals"].rules,
      ...eslintPluginTailwindcss.configs.recommended.rules
    },
    settings: {
      tailwindcss: {
        config: `${__dirname}/src/app/globals.css`
      }
    }
  },
  eslintConfigPrettier
);

export default configs;

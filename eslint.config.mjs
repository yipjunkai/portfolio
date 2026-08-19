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
    // `.claude` holds vendored Claude Code skill scripts — third-party code we
    // neither wrote nor ship. It is gitignored, so CI never sees it and `pnpm
    // lint` passes there; only local runs picked it up, reporting 255 problems
    // (192 of them errors) that no one could act on. Prettier already skips it
    // for free, because Prettier 3 defaults --ignore-path to .gitignore. ESLint
    // flat config does not read .gitignore at all, which is the whole reason
    // the two tools disagreed. Keep this in sync with .gitignore by hand, or
    // pull in @eslint/compat's includeIgnoreFile if the list ever grows.
    ignores: ["node_modules", "dist", ".next", "**/*.d.ts", "public", "messages", ".claude"]
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

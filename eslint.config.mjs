import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import nextPlugin from '@next/eslint-plugin-next';
import reactHooks from 'eslint-plugin-react-hooks';
import reactPlugin from '@eslint-react/eslint-plugin';
import jsxA11y from 'eslint-plugin-jsx-a11y-x';
import { configs as importXConfigs } from 'eslint-plugin-import-x';

const sourceFiles = ['**/*.{js,mjs,cjs,jsx,ts,tsx}'];
const reactFiles = ['**/*.{jsx,tsx}'];

export default defineConfig([
  globalIgnores(['.next/**', 'out/**', 'build/**', 'coverage/**', 'next-env.d.ts']),
  {
    files: sourceFiles,
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2025,
      },
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: sourceFiles,
    ...nextPlugin.configs['core-web-vitals'],
  },
  {
    files: reactFiles,
    ...reactPlugin.configs['recommended-typescript'],
  },
  {
    files: reactFiles,
    ...reactHooks.configs.flat['recommended-latest'],
  },
  {
    files: reactFiles,
    ...jsxA11y.configs.recommended,
  },
  {
    files: sourceFiles,
    ...importXConfigs['flat/recommended'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    ...importXConfigs['flat/typescript'],
  },
]);

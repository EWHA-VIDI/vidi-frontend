import { readdirSync } from 'node:fs'

import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const features = readdirSync(new URL('./src/features', import.meta.url), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)

function restrictImports(regex) {
  return [
    'error',
    { patterns: [{ regex, message: 'pages → features → 공통 import 방향을 지켜 주세요.' }] },
  ]
}

export default defineConfig([
  globalIgnores(['dist', 'coverage', 'src/api/generated']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      eslintConfigPrettier,
    ],
    plugins: { 'simple-import-sort': simpleImportSort },
    languageOptions: { globals: globals.browser },
    rules: {
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/no-explicit-any': 'error',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': restrictImports('^\\.'),
      'no-restricted-syntax': [
        'error',
        { selector: 'ExportDefaultDeclaration', message: 'named export를 사용한다.' },
      ],
    },
  },
  {
    files: ['src/pages/**/*.{ts,tsx}'],
    rules: { 'no-restricted-imports': restrictImports('^\\.|^@/(app|pages)(/|$)') },
  },
  ...features.map((feature) => ({
    files: [`src/features/${feature}/**/*.{ts,tsx}`],
    rules: {
      'no-restricted-imports': restrictImports(
        `^\\.|^@/(app|pages)(/|$)|^@/features/(?!${feature}(/|$))`,
      ),
    },
  })),
  {
    files: ['src/{api,stores,components,hooks,lib,styles,types,constants}/**/*.{ts,tsx}'],
    rules: { 'no-restricted-imports': restrictImports('^\\.|^@/(app|pages|features)(/|$)') },
  },
])

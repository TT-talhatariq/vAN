import globals from 'globals'
import pluginJs from '@eslint/js'
import prettierConfig from 'eslint-config-prettier' // Import prettier config

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs' },
    rules: {
      'no-console': 'error', // Warn on console statements
      'no-unused-vars': ['warning', { argsIgnorePattern: '^_' }],
      quotes: ['error', 'single'], // Enforce single quotes
      semi: ['error', 'never'], // Enforce no semicolons
    },
  },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  prettierConfig, // Add prettier config to disable conflicting rules
]

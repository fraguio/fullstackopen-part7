import js from '@eslint/js'

export default [
  {
    ignores: ['node_modules', 'dist', 'build'],
  },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'no-unused-vars': 'warn',
    },
  },
]

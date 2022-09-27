module.exports = {
  env: {
    browser: true,
    node: true
  },
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['script/*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    }
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  // https://eslint.org/docs/latest/user-guide/configuring/
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'camelcase': ['error', { properties: 'never' }],
    'curly': ["error", "multi-line"],
    'eqeqeq': 'error',
    'no-else-return': 'error',
    'default-case': 'error',
    'no-fallthrough': 'error',
    'no-unneeded-ternary': 'error',
    'quotes': ['error', 'single'],
    'prefer-template': 'error',
    'no-path-concat': 'error',
    'no-useless-concat': 'error',
    'no-prototype-builtins': 'error',
    'dot-notation': 'error',
    'no-extend-native': 'error',
    'no-new-object': 'error',
    'object-shorthand': ['error', 'always'],
    'no-array-constructor': 'error',
    'new-cap': 'error',
    'no-extra-parens': 'error',
    'no-extra-semi': 'error',
    "@typescript-eslint/consistent-type-imports": "warn"
  },
  // https://eslint.org/docs/latest/user-guide/configuring/ignoring-code#the-eslintignore-file
  ignorePatterns: [
    'dist',
    '.*',
    "*.config.*",
    "/script/*",
    "test"
  ]
}

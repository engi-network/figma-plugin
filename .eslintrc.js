/* eslint-disable sort-keys */

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  globals: {
    globalThis: false,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['typescript-sort-keys', '@emotion', 'tailwindcss'],
  ignorePatterns: ['*.md'],
  rules: {
    '@emotion/pkg-renaming': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    'no-duplicate-imports': 'error',
    'object-shorthand': ['error', 'always'],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'function-declaration',
      },
    ],
    'react/jsx-no-bind': [
      'error',
      {
        allowArrowFunctions: true,
        allowFunctions: true,
      },
    ],
    'react/jsx-boolean-value': ['error', 'never'],
    'react/react-in-jsx-scope': 'off',
    'sort-keys': [
      'error',
      'asc',
      { caseSensitive: false, natural: true, minKeys: 5 },
    ],
    curly: 'error',
    'typescript-sort-keys/interface': 'error',
    'typescript-sort-keys/string-enum': [
      'error',
      'asc',
      { caseSensitive: false, natural: true },
    ],
    quotes: ['error', 'single', { avoidEscape: true }],
    'react/prop-types': [0],
    'react/display-name': [0, { ignoreTranspilerName: false }],
    // 'tailwindcss/no-custom-classname': 'warn',
    // 'tailwindcss/no-contradicting-classname': 'error',
  },
  settings: {
    react: { version: 'detect' },
    // tailwindcss: {
    //   // These are the default values but feel free to customize
    //   callees: ['classnames', 'clsx', 'ctl'],
    //   config: 'tailwind.config.js',
    //   groups: defaultGroups, // imported from groups.js
    //   prependCustom: false,
    //   removeDuplicates: true,
    //   whitelist: [],
    // },
  },
};

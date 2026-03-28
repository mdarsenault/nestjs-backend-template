// @ts-check
const tseslint = require('typescript-eslint');
const prettier = require('eslint-plugin-prettier');
const unusedImports = require('eslint-plugin-unused-imports');
const simpleImportSort = require('eslint-plugin-simple-import-sort');
const importX = require('eslint-plugin-import-x');
const jest = require('eslint-plugin-jest');

module.exports = tseslint.config(
  // Global ignores
  {
    ignores: [
      'eslint.config.js',
      'src/dev/**',
      'e2e-test/test-config/jest-e2e.config.ts',
      'dist/**',
      'node_modules/**',
    ],
  },

  // Base config for all TS files
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [...tseslint.configs.recommended],
    plugins: {
      prettier,
      'unused-imports': unusedImports,
      'simple-import-sort': simpleImportSort,
      'import-x': importX,
      jest,
    },
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        ecmaVersion: 2018,
        sourceType: 'module',
      },
    },
    settings: {
      'import-x/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      // Prettier
      'prettier/prettier': 'error',

      // Type safety and discipline
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-empty-interface': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-restricted-types': [
        'error',
        {
          types: {
            '{}': 'Define a more specific interface instead of `{}`',
            object:
              'Use a defined interface or a more specific type instead of `object`',
            Object:
              'Use a defined interface or a more specific type instead of `Object`',
          },
        },
      ],
      '@typescript-eslint/no-wrapper-object-types': 'error',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-ignore': true,
          'ts-nocheck': true,
          'ts-expect-error': true,
        },
      ],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['camelCase', 'UPPER_CASE'],
        },
        { selector: 'variableLike', format: ['camelCase'] },
        { selector: 'typeLike', format: ['PascalCase'] },
        { selector: 'enumMember', format: ['UPPER_CASE'] },
        { selector: 'property', format: ['camelCase', 'snake_case'] },
        {
          selector: 'objectLiteralProperty',
          format: ['camelCase', 'snake_case'],
        },
        {
          selector: 'parameter',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        { selector: 'function', format: ['camelCase', 'PascalCase'] },
        { selector: 'method', format: ['camelCase'] },
      ],

      // Import order
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^node:', '^@nestjs/', '^@?\\w'],
            [
              '^@/(?!.*\\b(constants|messages|enums|mocks|types|(?!common/)filters)\\b)',
            ],
            ['^\\.'],
            [
              '^@/.*/constants',
              '^@/.*/messages',
              '^@/.*/enums',
              '^@/.*/types',
              '^@/(?!common/).*/filters',
              '^@/.*/mocks',
              '^\\./constants',
              '^\\./messages',
              '^\\./enums',
              '^\\./types',
              '^\\./filters',
              '^\\./mocks',
              '^\\../constants',
              '^\\../messages',
              '^\\../enums',
              '^\\../types',
              '^\\../filters',
              '^\\../mocks',
            ],
          ],
        },
      ],

      // Remove unused
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // Clean code
      'no-console': ['error', { allow: ['warn', 'error', 'log'] }],
      'prefer-const': 'error',
      'import-x/no-duplicates': 'error',
    },
  },

  // Test files — relaxed rules
  {
    files: [
      '**/*.spec.ts',
      '**/*.test.ts',
      '**/tests/**/*.ts',
      '**/*.e2e-spec.ts',
    ],
    plugins: { jest },
    extends: [jest.configs['flat/recommended']],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-restricted-types': 'off',
      '@typescript-eslint/no-wrapper-object-types': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      'prettier/prettier': 'off',
      'jest/no-focused-tests': 'off',
      complexity: 'off',
    },
  },

  // database.ts — no naming convention
  {
    files: ['**/database.ts'],
    rules: {
      '@typescript-eslint/naming-convention': 'off',
    },
  },

  // Config / constants files — no naming convention
  {
    files: [
      'src/config/environment.validation.ts',
      'src/config/environment.validation.spec.ts',
      'jest.config.ts',
      '*.constants.ts',
    ],
    rules: {
      '@typescript-eslint/naming-convention': 'off',
    },
  },

  // Entities — relaxed ban-types (no `unknown` restriction)
  {
    files: ['src/entities/**/*.ts', '**/*.entity.ts'],
    rules: {
      '@typescript-eslint/no-restricted-types': [
        'error',
        {
          types: {
            '{}': 'Define a more specific interface instead of `{}`',
            object:
              'Use a defined interface or a more specific type instead of `object`',
            Object:
              'Use a defined interface or a more specific type instead of `Object`',
          },
        },
      ],
      '@typescript-eslint/no-wrapper-object-types': 'error',
    },
  },
);

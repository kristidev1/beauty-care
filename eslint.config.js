const {defineConfig} = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');
const simpleImportSort = require('eslint-plugin-simple-import-sort');

module.exports = defineConfig([
  expoConfig,
  {
    plugins: {
      prettier: prettierPlugin,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'prettier/prettier': 'warn',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^(react$|react-native$)'],
            ['^\\u0000'],
            ['^@?\\w'],
            [
              '^(root|context|hoc|hooks|models|screens|types|utils|store|lists|navi|firebase)(/.*|$)',
            ],
            ['^(components)(/.*|$)'],
            ['^(apollo)(/.*|$)'],
            ['^(cons|translations|general-types)(/.*|$)'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ['^(styles)(/.*|$)'],
            ['^(assets)(/.*|$)'],
            ['^\\u0000'],
          ],
        },
      ],
      'import/no-named-as-default-member': 'off',
    },
  },
  prettierConfig,
  {
    ignores: ['dist/*'],
  },
]);

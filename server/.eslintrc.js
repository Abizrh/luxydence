module.exports = {
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'prettier/prettier': 'error',
    semi: 'off',
    radix: 'off',
    'func-names': 'off',
    'no-console': 'off',
    'no-shadow': 'off',
    'no-unused-vars': ['error', { args: 'none' }],
    'consistent-return': 'off',
    'no-underscore-dangle': 'off',
    'import/no-unresolved': 'off',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    commonjs: true,
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
}

module.exports = {
  parser: 'babel-eslint',
  env: { es6: true, browser: true },
  extends: ['plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        arrowParens: 'always',
        'space-before-function-paren': ['error', 'always'],
      },
    ],
    quotes: ['error', 'single'],
    semi: [2, 'always'],
    'space-before-function-paren': ['error', 'always'],
  },
  env: {
    jest: true,
    node: true,
    mongo: true,
  },
};

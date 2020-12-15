module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  plugins: ['simple-import-sort', 'prettier', 'react-hooks'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'none',
        singleQuote: true,
        printWidth: 90,
        endOfLine: 'auto',
        semi: false
      }
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/react-in-jsx-scope': 0,
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    'comma-dangle': 0,
    'simple-import-sort/imports': 'error',
    'max-len': 0,
    'multiline-ternary': ['error', 'always-multiline'],
    'no-console': 0,
    semi: ['error', 'never']
  }
}

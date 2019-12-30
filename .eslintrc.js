module.exports = {
    "parser": "babel-eslint",
    "env": {
        browser: true,
        node: true,
      },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
      ],
    "plugins": [
        "simple-import-sort",
        "prettier",
        "react-hooks"
      ],
      "rules": {
        "prettier/prettier": [
          "error",
          {
            "trailingComma": "none",
            "singleQuote": true,
            "printWidth": 90,
            "endOfLine":"auto"
          }
        ],
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "quotes": [
          2,
          "single",
          {
            "avoidEscape": true,
            "allowTemplateLiterals": true
          }
        ],
        "comma-dangle": 0,
        "simple-import-sort/sort": "error",
        "max-len": 0,
        "multiline-ternary": ["error", "always-multiline"],
        "no-console": 0
      }
};
module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    es6: true,
    node: true,
    browser: true,
    es2021: true
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ["react", "@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  rules: {
    // I want *tslint* handling this not eslint
    "react/prop-types": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    // suppress errors for missing 'import React' in files
    "react/react-in-jsx-scope": "off",
    "no-undef": "off",
    "no-useless-escape": "off",
    "no-empty": "off",
    "no-func-assign": "off",
    "no-cond-assign": "off",
    "no-redeclare" :"off"
  }
};

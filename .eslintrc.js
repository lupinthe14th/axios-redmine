module.exports = {
  "env": {
    "node": true,
    "commonjs": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 12
  },
  "parser": "@typescript-eslint/parser",
  "rules": {
    // Possible Errors
    "no-console": "off",
    "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],

    // Best Practices
    "eqeqeq": ["error", "always"],
    "no-eval": "error",
    "no-implied-eval": "error",
    "no-return-await": "error",
    "require-await": "error",

    // Stylistic Issues
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "quotes": ["error", "single", { "avoidEscape": true }],
    "semi": ["error", "never"],
    "comma-dangle": ["error", "never"],
    "no-trailing-spaces": "error",
    "eol-last": ["error", "always"],

    // ES6+
    "prefer-const": "error",
    "no-var": "error",
    "prefer-template": "error"
  },
  "overrides": [
    {
      "files": ["test/**/*.js"],
      "rules": {
        // Mocha recommends function expressions over arrow functions for test callbacks
        // to preserve 'this' context
        "prefer-arrow-callback": "off"
      }
    }
  ]
};

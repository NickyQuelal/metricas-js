const js = require("@eslint/js");
const globals = require("globals");
module.exports = [
  js.configs.recommended,
  {
    files: ["src/**/*.js"],
    languageOptions: { sourceType: "commonjs", globals: globals.node },
    rules: {
      complexity: ["warn", 10],
      "max-depth": ["warn", 3],
      "max-lines-per-function": ["warn", 40],
      "max-params": ["warn", 4],
      eqeqeq: "error",
      "no-unused-vars": "error"
    }
  }
];

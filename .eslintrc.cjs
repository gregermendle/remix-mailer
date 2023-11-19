/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  ignorePatterns: [
    "node_modules/",
    ".cache/",
    "browser/",
    "dist/",
    "example/dist"
  ],
  extends: ["react-app"],
  plugins: ["prettier", "no-only-tests"],
  rules: {
    "import/no-anonymous-default-export": "off",
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "unknown",
          "parent",
          "sibling",
          "index",
        ],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        "newlines-between": "never",
      },
    ],
    "prettier/prettier": "error",
    "no-only-tests/no-only-tests": "error",
  },
  overrides: [
    {
      files: ["./cypress/**"],
      rules: {
        "@typescript-eslint/no-unused-expressions": "off",
      },
    },
  ],
};

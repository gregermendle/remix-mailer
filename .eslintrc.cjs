/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  ignorePatterns: [
    "node_modules/",
    ".cache/",
    "browser/",
    "build/",
    "example/build",
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

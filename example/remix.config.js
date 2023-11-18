/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*", "**/*.test.{ts,tsx}"],
  watchPaths: ["../build/**/*"],
  serverModuleFormat: "cjs",
  serverDependenciesToBundle: "all"
};

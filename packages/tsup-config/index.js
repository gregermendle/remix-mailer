const { defineConfig } = require("tsup");

exports.config = defineConfig({
  entry: ["src/index.ts"],
  splitting: false,
  sourcemap: true,
  clean: false,
  dts: true,
  format: ["esm", "cjs"],
  outDir: "build",
  define: {
    "import.meta.vitest": "undefined",
  },
  outExtension({ format }) {
    return { js: `.${format}.js` };
  },
});

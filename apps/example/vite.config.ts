import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import shikiize from "./shikiize.plugin.mjs";
import path from "node:path";

installGlobals();

export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "app"),
      "@": path.resolve(__dirname, "@"),
    },
  },
  plugins: [remix(), shikiize()],
});

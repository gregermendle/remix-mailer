import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import path from "node:path";
import shikiize from "./shikiize.plugin";
import { getLoadContext } from "./load-context";

installGlobals();

export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "app"),
      "@": path.resolve(__dirname, "@"),
    },
  },
  plugins: [
    remixCloudflareDevProxy({ getLoadContext }),
    remix(),
    shikiize(),
  ],
});

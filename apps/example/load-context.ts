import type { AppLoadContext } from "@remix-run/cloudflare";
import type { PlatformProxy } from "wrangler";

interface Env {}

type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    cloudflare: Cloudflare;
  }
}

export const getLoadContext = (args: {
  request: Request;
  context: { cloudflare: unknown };
}): AppLoadContext =>
  args.context as unknown as AppLoadContext;

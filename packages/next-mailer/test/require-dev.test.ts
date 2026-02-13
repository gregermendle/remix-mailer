import { describe, test, expect } from "vitest";
import { requireDev } from "../src/server/require-dev";

describe(requireDev, () => {
  test("should throw when not development or test", () => {
    const oldEnv = process.env.NODE_ENV;
    process.env.NODE_ENv = "development";
    expect(requireDev).not.toThrow();
    process.env.NODE_ENv = "test";
    expect(requireDev).not.toThrow();
    process.env.NODE_ENV = "production";
    expect(requireDev).toThrow();
    process.env.NODE_ENV = oldEnv;
  });
});

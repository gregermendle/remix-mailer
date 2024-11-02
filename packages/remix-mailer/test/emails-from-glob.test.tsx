import { describe, test, expect, vi, beforeEach } from "vitest";
import { emailsFromGlob } from "../src/server/emails-from-glob";

describe(emailsFromGlob, () => {
  const consoleSpy = vi.spyOn(console, "error");

  beforeEach(() => {
    consoleSpy.mockClear();
  });

  const glob = vi.fn(() => ({
    "./__mocks/email-invalid-default.js": () =>
      import("./__mocks/email-invalid-default.js"),
    "./__mocks/email-valid.js": () => import("./__mocks/email-valid.js"),
    "./__mocks/email-no-default.js": () =>
      import("./__mocks/email-no-default.js"),
  }));

  test("should convert glob to valid emails object", async () => {
    const emails = await emailsFromGlob(glob());
    expect(Object.entries(emails)).toHaveLength(1);
    expect(emails["EmailValid"]).toBeTypeOf("function");
  });

  test("should report and error for invalid imports", async () => {
    await emailsFromGlob(glob());
    expect(consoleSpy).toBeCalledTimes(2);
    expect(consoleSpy).toHaveBeenNthCalledWith(
      1,
      "Remix-Mailer: ./__mocks/email-invalid-default.js does not contain a default export or the default export is not a component."
    );
    expect(consoleSpy).toHaveBeenNthCalledWith(
      2,
      "Remix-Mailer: ./__mocks/email-no-default.js does not contain a default export or the default export is not a component."
    );
  });
});

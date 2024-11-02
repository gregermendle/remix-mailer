import { describe, test, expect } from "vitest";
import { createPreviews } from "../src/server/create-previews";

describe(createPreviews, () => {
  test("awaits async render function", async () => {
    await expect(
      createPreviews(
        new Request("http://localhost?preview=test"),
        {
          test: () => null,
        },
        {
          render: () =>
            new Promise((resolve) => {
              setTimeout(() => resolve("done"), 500);
            }),
        }
      )
    ).resolves.toEqual({
      __rmPreviews: {
        previews: ["test"],
        selected: {
          title: "test",
          rendered: "done",
        },
      },
    });
  });
});

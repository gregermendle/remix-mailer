import { loadPreview } from "../src";

describe(loadPreview, () => {
  let request: Request;

  beforeEach(() => {
    request = new Request("http://localhost");
  });

  test("prevents usage outside of development and test envs by default", async () => {
    const oldNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "something";
    await expect(loadPreview(request, {})).rejects.toBeInstanceOf(Response);
    process.env.NODE_ENV = "test";
    await expect(loadPreview(request, {})).resolves.toEqual({
      __rmPreviews: {
        previews: [],
        selected: null,
      },
    });
    process.env.NODE_ENV = oldNodeEnv;
  });

  test("respects allowedEnvs override", async () => {
    const oldNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "something";
    await expect(
      loadPreview(
        request,
        {},
        {
          allowedEnvs: ["something"],
        },
      ),
    ).resolves.toEqual({
      __rmPreviews: {
        previews: [],
        selected: null,
      },
    });
    process.env.NODE_ENV = "test";
    await expect(
      loadPreview(
        request,
        {},
        {
          allowedEnvs: ["something"],
        },
      ),
    ).rejects.toBeInstanceOf(Response);
    process.env.NODE_ENV = oldNodeEnv;
  });

  test("awaits async renderers", async () => {
    await expect(
      loadPreview(
        new Request("http://localhost?preview=test"),
        {
          test: () => null,
        },
        {
          renderer: () =>
            new Promise((resolve) => {
              setTimeout(() => resolve("done"), 500);
            }),
        },
      ),
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

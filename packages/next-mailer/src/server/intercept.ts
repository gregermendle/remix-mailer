import { randomUUID } from "node:crypto";
const openImport = import("open");

interface InterceptCache {
  [key: string]: {
    html: string;
  };
}

interface InterceptOptions<T> {
  shouldIntercept?: (options: T) => boolean;
  previewUrl?: string;
}

const defaultOptions = {
  previewUrl: "http://localhost:3000",
  shouldIntercept: () =>
    process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test",
};

function intercept<T extends { html: string }, R>(
  _sendMail: (options: T) => R,
  {
    shouldIntercept = defaultOptions.shouldIntercept,
    previewUrl = defaultOptions.previewUrl,
  }: InterceptOptions<T> = defaultOptions,
) {
  const interceptCache: InterceptCache = {};

  const sendMail = async (input: T & { forceSend?: boolean }) => {
    if (
      !input.forceSend &&
      typeof shouldIntercept !== "undefined" &&
      shouldIntercept(input)
    ) {
      const id = randomUUID();
      const { default: open } = await openImport;
      interceptCache[id] = {
        html: input.html,
      };
      return {
        type: "intercept" as const,
        result: await open(`${previewUrl}?preview=${id}`),
      };
    }

    delete input.forceSend;
    const result = await _sendMail(input);
    return {
      type: "send" as const,
      result,
    };
  };

  return { sendMail, interceptCache };
}

export { intercept, InterceptCache };

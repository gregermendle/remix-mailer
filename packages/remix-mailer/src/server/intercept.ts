import { randomUUID } from "node:crypto";
const openImport = import("open");

interface InterceptCache {
  [key: string]: {
    subject: string;
    html: string;
  };
}

interface InterceptOptions<T> {
  shouldIntercept(options: T): boolean;
}

function intercept<T extends { html: string }, R>(
  _sendMail: (options: T) => R,
  options: InterceptOptions<T>,
) {
  const interceptCache: InterceptCache = {};

  const sendMail = async (options: T & { forceSend?: boolean }) => {
    if (!options.forceSend) {
      const id = randomUUID();
      const { default: open } = await openImport;
      interceptCache[id] = {
        subject: "test",
        html: options.html,
      };
      return {
        type: "intercept",
        result: await open(`http://localhost:3000/email?preview=${id}`),
      };
    }

    const result = await _sendMail(options);
    return {
      type: "send",
      result,
    };
  };

  return { sendMail, interceptCache };
}

export { intercept, InterceptCache };

import type { EntryContext } from "@remix-run/cloudflare";
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import { renderToReadableStream } from "react-dom/server";

const ABORT_DELAY = 5_000;

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  return isbot(request.headers.get("user-agent") ?? "")
    ? handleBotRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext,
      )
    : handleBrowserRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext,
      );
}

async function handleBotRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  try {
    const stream = await renderToReadableStream(
      <RemixServer
        context={remixContext as Parameters<typeof RemixServer>[0]["context"]}
        url={request.url}
        abortDelay={ABORT_DELAY}
      />,
      {
        onAllReady: () => {},
        onShellError: (error: unknown) => {
          throw error;
        },
        onError: (error: unknown) => {
          responseStatusCode = 500;
          console.error(error);
        },
      } as Parameters<typeof renderToReadableStream>[1],
    );
    await (stream as unknown as { allReady: Promise<void> }).allReady;
    responseHeaders.set("Content-Type", "text/html");
    return new Response(stream, {
      headers: responseHeaders,
      status: responseStatusCode,
    });
  } catch (error) {
    throw error;
  }
}

async function handleBrowserRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  try {
    const stream = await renderToReadableStream(
      <RemixServer
        context={remixContext as Parameters<typeof RemixServer>[0]["context"]}
        url={request.url}
        abortDelay={ABORT_DELAY}
      />,
      {
        onShellError: (error: unknown) => {
          throw error;
        },
        onError: (error: unknown) => {
          console.error(error);
        },
      } as Parameters<typeof renderToReadableStream>[1],
    );
    responseHeaders.set("Content-Type", "text/html");
    return new Response(stream, {
      headers: responseHeaders,
      status: responseStatusCode,
    });
  } catch (error) {
    throw error;
  }
}

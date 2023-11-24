import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { RM_DATA_KEY } from "../common/constants.js";
import { type InterceptCache } from "./intercept.js";

const defaultRender = (Component: React.ComponentType) =>
  renderToStaticMarkup(<Component />);

async function createPreviews<C extends React.ComponentType>(
  request: Request,
  p: Record<string, C>,
  {
    render = defaultRender,
    interceptCache,
  }: {
    allowedEnvs?: string[];
    render?: (Component: C) => Promise<string> | string;
    interceptCache?: InterceptCache;
  } = {
    render: defaultRender,
  },
) {
  const url = new URL(request.url);
  const previews = Object.keys(p);
  const preview = url.searchParams.get("preview");

  if (typeof preview !== "string") {
    return {
      [RM_DATA_KEY]: { selected: null, previews },
    };
  }

  if (interceptCache && interceptCache[preview]) {
    return {
      [RM_DATA_KEY]: {
        selected: {
          title: preview,
          rendered: interceptCache[preview].html,
        },
        previews,
      },
    };
  }

  if (p[preview]) {
    return {
      [RM_DATA_KEY]: {
        selected: {
          title: preview,
          rendered: await render(p[preview]),
        },
        previews,
      },
    };
  }

  return {
    [RM_DATA_KEY]: { selected: null, previews },
  };
}

export { createPreviews };

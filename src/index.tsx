import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { useLoaderData } from "@remix-run/react";

const RM_DATA_KEY = "__rmPreviews";

export async function loadPreview<C extends React.ComponentType>(
  request: Request,
  p: Record<string, C>,
  options: {
    renderer: (Component: C) => Promise<string> | string;
  } = {
    renderer: (Component: React.ComponentType) =>
      renderToStaticMarkup(<Component />),
  },
) {
  const url = new URL(request.url);
  const preview = url.searchParams.get("preview");
  const Component =
    typeof preview === "string" && p[preview] ? p[preview] : null;
  const selected = Component
    ? {
        title: preview,
        rendered: await options.renderer(Component),
      }
    : null;

  return {
    [RM_DATA_KEY]: { selected, previews: Object.keys(p) },
  };
}

export const usePreviews = () => {
  const { [RM_DATA_KEY]: previews } = useLoaderData<typeof loadPreview>();
  return previews;
};

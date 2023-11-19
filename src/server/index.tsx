import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { useLoaderData } from "@remix-run/react";

const RM_DATA_KEY = "__rmPreviews";

export async function loadPreview<C extends React.ComponentType>(
  request: Request,
  p: Record<string, C>,
  {
    allowedEnvs = ["development", "test"],
    renderer = (Component: React.ComponentType) =>
      renderToStaticMarkup(<Component />),
  }: {
    allowedEnvs?: string[];
    renderer?: (Component: C) => Promise<string> | string;
  },
) {
  if (
    typeof process.env.NODE_ENV !== "string" ||
    !allowedEnvs.includes(process.env.NODE_ENV)
  ) {
    throw new Response("You do not have access to this resource.", {
      status: 403,
    });
  }

  const url = new URL(request.url);
  const preview = url.searchParams.get("preview");
  const Component =
    typeof preview === "string" && p[preview] ? p[preview] : null;
  const selected = Component
    ? {
        title: preview,
        rendered: await renderer(Component),
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

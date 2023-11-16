import { renderAsync } from "@react-email/components";
import { useLoaderData } from "@remix-run/react";

type EmailComponent<P = object> = {
  (props: P): JSX.Element;
  PreviewProps?: P;
};

const RM_DATA_KEY = "__rmPreviews";

export async function loadPreview(
  request: Request,
  p: Record<string, EmailComponent>,
) {
  const url = new URL(request.url);
  const preview = url.searchParams.get("preview");
  const Component =
    typeof preview === "string" && p[preview]
      ? p[preview]
      : Object.values(p)[0];
  const selected = Component
    ? {
        title: preview,
        rendered: await renderAsync(<Component {...Component?.PreviewProps} />),
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

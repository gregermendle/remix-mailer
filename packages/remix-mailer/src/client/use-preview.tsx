import { useLoaderData } from "@remix-run/react";
import { RM_DATA_KEY, loadPreview } from "../server";

const usePreviews = () => {
  const { [RM_DATA_KEY]: previews } = useLoaderData<typeof loadPreview>();
  return previews;
};

export { usePreviews };

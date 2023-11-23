import { useLoaderData } from "@remix-run/react";
import { RM_DATA_KEY } from "../common/constants.js";
import { createPreviews } from "../server/create-previews.js";

const usePreviews = () => {
  const { [RM_DATA_KEY]: previews } = useLoaderData<typeof createPreviews>();
  return previews;
};

export { usePreviews };

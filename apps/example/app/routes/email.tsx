import { renderAsync } from "@react-email/components";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { createPreviews } from "remix-mailer/server/create-previews";
import { emailsFromGlob } from "remix-mailer/server/emails-from-glob";
import { PreviewBrowser } from "remix-mailer/ui/preview-browser";

import "remix-mailer/ui/index.css";

const emails = import.meta.glob("~/emails/*.tsx");

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const previews = await createPreviews(request, await emailsFromGlob(emails), {
    render: (Component) =>
      renderAsync(<Component {...Component.PreviewProps} />),
  });

  return json({
    ...previews,
  });
};

export default PreviewBrowser;

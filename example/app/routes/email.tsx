import {
  json,
  type LinksFunction,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import PreviewBrowser, { loadPreview } from "remix-mailer";
import remixMailerStylesheet from "remix-mailer/index.css";
import LinearLoginCodeEmail from "~/emails/linear-login-code";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: remixMailerStylesheet,
  },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const previews = await loadPreview(request, {
    loginCode: LinearLoginCodeEmail,
    loginCodeBasic: LinearLoginCodeEmail,
  });

  return json({
    ...previews,
  });
};

export default PreviewBrowser;

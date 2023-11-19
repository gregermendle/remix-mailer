import { renderAsync } from "@react-email/components";
import {
  json,
  type LinksFunction,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { loadPreview } from "remix-mailer";
import { PreviewBrowser } from "remix-mailer/ui/preview-browser";
import remixMailerStylesheet from "remix-mailer/ui/index.css";
import LinearLoginCodeEmail from "~/emails/login-code";
import LinearLoginCodeEmail2 from "~/emails/login-code-2";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: remixMailerStylesheet,
  },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const previews = await loadPreview(
    request,
    {
      loginCode: LinearLoginCodeEmail,
      loginCodeBasic: LinearLoginCodeEmail2,
    },
    {
      renderer: async (Component) =>
        renderAsync(<Component {...Component?.PreviewProps} />),
    },
  );

  return json({
    ...previews,
  });
};

export default PreviewBrowser;

import { renderAsync } from "@react-email/components";
import {
  json,
  type LinksFunction,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { loadPreview } from "remix-mailer";
import remixMailerStylesheet from "remix-mailer/index.css";
import { PreviewBrowser } from "remix-mailer/preview-browser";

import { LoginCode } from "~/emails/login-code";
import { ResetPassword } from "~/emails/reset-password";

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
      loginCode: LoginCode,
      resetPassword: ResetPassword,
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

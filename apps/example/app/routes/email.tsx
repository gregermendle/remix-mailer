import { renderAsync } from "@react-email/components";
import {
  json,
  type LinksFunction,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { createPreviews } from "remix-mailer/server/create-previews";
import remixMailerStylesheet from "remix-mailer/ui/index.css";
import { PreviewBrowser } from "remix-mailer/ui/preview-browser";
import { LoginCode } from "~/emails/login-code";
import { ResetPassword } from "~/emails/reset-password";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: remixMailerStylesheet,
  },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const previews = await createPreviews(
    request,
    {
      loginCode: LoginCode,
      resetPassword: ResetPassword,
    },
    {
      render: (Component) =>
        renderAsync(<Component {...Component.PreviewProps} />),
    },
  );

  return json({
    ...previews,
  });
};

export default PreviewBrowser;

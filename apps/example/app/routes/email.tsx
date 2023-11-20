import { renderAsync } from "@react-email/components";
import {
  json,
  type LinksFunction,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { loadPreview, PreviewBrowser } from "remix-mailer";
import remixMailerStylesheet from "remix-mailer/index.css";
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
      // Dont do this in a typical app unless you want everyone to see your previews
      allowedEnvs: ["production", "development", "test"],
      renderer: async (Component) =>
        renderAsync(<Component {...Component?.PreviewProps} />),
    },
  );

  return json({
    ...previews,
  });
};

export default PreviewBrowser;

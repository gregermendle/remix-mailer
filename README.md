# Remix Mailer

A way to preview and test email templates in Remix with minimal setup.

[Example usage and docs here](remix-mailer.gregermendle.com)

## Installation

```bash
# Install the base remix-mailer package
npm i remix-mailer
```

Optionally install a transport and component library for creating and sending email templates.

```bash
npm i nodemailer @react-email/components
```

## Basic Usage

```tsx
import {
  json,
  type LinksFunction,
  type LoaderFunctionArgs,
} from "@remix-run/node";

// This example uses @react-email
import { renderAsync } from "@react-email/components";

// Import remix-mailer styles and components
import { loadPreview, PreviewBrowser } from "remix-mailer";
import remixMailerStylesheet from "remix-mailer/index.css";

// Import your email template components
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
      // Anything that renders to a string of HTML can be used here
      renderer: async (Component) =>
        renderAsync(<Component {...Component?.PreviewProps} />),
    }
  );

  return json({
    ...previews,
  });
};

export default PreviewBrowser;
```

## To-do

- [ ] Ability to send emails from preview browser
- [ ] Instructions on setting up a transporter
- [ ] Email intercept

Have other ideas? Create an issue and let me know :)

# Remix Mailer

A way to preview and intercept emails in Remix with minimal setup.

[Example](https://remix-mailer.gregermendle.com/email)

## What it does

- Render agnostic, use @react-email/components, mjml, html, etc.
- View previews and get updates live as you edit.
- Intercept emails in development.

## Installation

This project is ESM-only and requires that you do a few extra steps during installation to get things running when using Remix with CommonJS.

```bash
# Install the base remix-mailer package
npm i remix-mailer
```

Optionally install a transport and component library for creating and sending emails.

```bash
npm i nodemailer @react-email/components
```

### Using CJS

Add the following to `serverDependenciesToBundle` in `remix.config.js` if you are using Remix with CJS. Remix V1 will use CJS by default and V2 will use ESM.

```js
module.exports = {
  serverDependenciesToBundle: [/^remix-mailer.*/],
};
```

### Using Typescript

If you and are having issues loading typescript types for `remix-mailer`, ensure that the following is set in your `tsconfig.json`.

```json
{
  "compilerOptions": {
    "moduleResolution": "Bundler"
  }
}
```

## Examples

### Previews

Previews are easy to setup and rely on zero magic. Below are examples of setting up an email preview route.

> Note that `requireDev` is a helper that ensures you are in either `development` or `test` when accessing this route. Otherwise a `403` response is thrown.

```tsx
// with vite

// app/routes/email.tsx -> /email
import { renderAsync } from "@react-email/components";
import { json, type LoaderFunctionArgs } from "@remix-run/node";

// remix-mailer
import { createPreviews } from "remix-mailer/server/create-previews";
import { requireDev } from "remix-mailer/server/require-dev";
import { emailsFromGlob } from "remix-mailer/server/emails-from-glob";
import { PreviewBrowser } from "remix-mailer/ui/preview-browser";

import "remix-mailer/ui/index.css";

// import emails using glob
const emails = import.meta.glob("~/emails/*.tsx");

export const loader = async ({ request }: LoaderFunctionArgs) => {
  requireDev();

  const previews = await createPreviews(
    request,
    // takes our glob import and turns it into an emails object
    await emailsFromGlob(emails),
    {
      render: (Component) =>
        renderAsync(<Component {...Component.PreviewProps} />),
    }
  );

  return json({
    ...previews,
  });
};

export default PreviewBrowser;
```

```tsx
// without vite

// app/routes/email.tsx -> /email
import { renderAsync } from "@react-email/components";
import {
  json,
  type LinksFunction,
  type LoaderFunctionArgs,
} from "@remix-run/node";

import { createPreviews } from "remix-mailer/server/create-previews";
import { requireDev } from "remix-mailer/server/require-dev";
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
  requireDev();

  const previews = await createPreviews(
    request,
    // our email components imported above
    {
      loginCode: LoginCode,
      resetPassword: ResetPassword,
    },
    {
      render: (Component) =>
        renderAsync(<Component {...Component.PreviewProps} />),
    }
  );

  return json({
    ...previews,
  });
};

export default PreviewBrowser;
```

### Intercept

Intercept allows you to catch emails that are being sent in development and test. When an email is sent in `development` or `test`, a new browser window will be opened to a preview of the email that was sent. This can be helpful for example if you are testing locally with magic-link based authentication. This example uses `nodemailer` as a transport, but any transport can be used.

```tsx
// /app/email.server.ts

const transport = nodemailer.createTransport({
  host: "smtp.example.com",
  port: 587,
  auth: {
    user: "username",
    pass: "password",
  },
});

const { sendMail, interceptCache } = intercept(transport.sendMail);
export { sendMail, interceptCache };
```

Then in your preview route, add the `interceptCache` to `createPreviews` so it can find your intercepted emails.

```tsx
// /app/routes/email.tsx -> /email
import { interceptCache } from "~/email.server";

// ...
const previews = await createPreviews(
  request,
  {
    loginCode: LoginCode,
    resetPassword: ResetPassword,
  },
  {
    interceptCache,
    render: (Component) =>
      renderAsync(<Component {...Component.PreviewProps} />),
  }
);
```

Have other ideas? Create an issue and let me know :)

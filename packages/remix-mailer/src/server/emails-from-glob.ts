import type React from "react";

type EmailComponent<T = {}> = React.ComponentType<T> & {
  PreviewProps: {};
};

async function emailsFromGlob<T>(glob: Record<string, () => Promise<unknown>>) {
  let emails: Record<string, EmailComponent<T>> = {};
  for (const email in glob) {
    const component = await glob[email]();
    if (
      !!component &&
      typeof component === "object" &&
      "default" in component &&
      typeof component.default === "function"
    ) {
      emails[component.default.name] = component.default as EmailComponent<T>;
    } else {
      console.error(
        `Remix-Mailer: ${email} does not contain a default export or the default export is not a component.`
      );
    }
  }
  return emails;
}

export { emailsFromGlob };

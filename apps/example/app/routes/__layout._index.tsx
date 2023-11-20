import {
  ComponentInstanceIcon,
  CopyIcon,
  GitHubLogoIcon,
} from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { json } from "@remix-run/node";
import { LoaderFunctionArgs } from "react-router";
import * as shiki from "shiki";
import { Link, useLoaderData } from "@remix-run/react";
import { delay, fromEvent, map, mergeMap, tap } from "rxjs";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const previewCode = `
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
      renderer: async (Component) =>
        renderAsync(<Component {...Component?.PreviewProps} />),
    },
  );

  return json({
    ...previews,
  });
};

export default PreviewBrowser;
`;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const highlighter = await shiki.getHighlighter({
    langs: ["tsx"],
    theme: "css-variables",
  });

  return json({
    codeBlocks: {
      preview: highlighter.codeToHtml(previewCode.trim(), { lang: "tsx" }),
    },
  });
};

export default function _Index() {
  const copyRef = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState("previewer");
  const { codeBlocks } = useLoaderData<typeof loader>();

  useEffect(() => {
    if (!copyRef.current) return;

    const sub = fromEvent(copyRef.current, "click")
      .pipe(
        mergeMap(async (e) => {
          const result = await navigator.permissions.query({
            name: "clipboard-write" as any,
          });

          if (result.state === "granted" || result.state === "prompt") {
            navigator.clipboard.writeText("npm i remix-mailer");
          }

          return e;
        }),
        tap(() => setCopied(true)),
        delay(350),
        tap(() => setCopied(false)),
      )
      .subscribe();
    return () => sub.unsubscribe();
  }, []);

  return (
    <div className="max-w-4xl w-full mx-auto px-6 lg:px-0 pt-16">
      <Button
        ref={copyRef}
        aria-label="copy npm install command"
        variant="secondary"
        size="sm"
        className="relative gap-2 text-muted-foreground overflow-hidden mb-6"
      >
        <code
          className={cn(
            "absolute inset-0 bg-inherit flex items-center justify-center opacity-0 overlay transition-opacity",
            copied && "opacity-100",
          )}
        >
          Copied!
        </code>
        <code>npm i remix-mailer</code>
        <CopyIcon />
      </Button>
      <h1 className="text-5xl font-semibold pb-2 tracking-wide leading-none font-serif">
        Simple e-mail previews
        <br />
        with Remix
      </h1>
      <p className="text-muted-foreground">
        An open-source library for building and prototyping your e-mail
        templates.
      </p>
      <div className="space-y-4 pt-16">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="border border-border/50 bg-transparent">
            <TabsTrigger
              value="previewer"
              className="transition-colors border border-border/0 data-[state=active]:border-border/100"
            >
              Previewer
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="transition-colors border border-border/0 data-[state=active]:border-border/100"
            >
              Code
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Tabs
          value={tab}
          className="shadow-md border rounded-lg overflow-hidden"
        >
          <TabsContent value="previewer" className="m-0">
            <div className="flex items-center justify-between pl-3 pr-2 py-1.5 bg-muted/50">
              <div className="text-sm text-muted-foreground font-medium">
                preview
              </div>
              <div className="flex items-center gap-1 text-muted-foreground/50">
                <ComponentInstanceIcon />
                <ComponentInstanceIcon />
                <ComponentInstanceIcon />
              </div>
            </div>
            <div>
              <iframe
                title="remix mailer preview"
                src="/email"
                className="w-full h-[650px]"
              />
            </div>
          </TabsContent>
          <TabsContent value="code" className="m-0">
            <div className="relative">
              <code className="absolute right-4 top-2.5 text-xs text-muted-foreground">
                tsx
              </code>
              <div
                dangerouslySetInnerHTML={{ __html: codeBlocks.preview }}
                className="px-4 py-3 rounded-lg overflow-y-hidden overflow-x-auto text-xs bg-muted/50 shadow-md"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

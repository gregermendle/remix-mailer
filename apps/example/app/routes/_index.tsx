import {
  ComponentInstanceIcon,
  CopyIcon,
  FileIcon,
  GitHubLogoIcon,
} from "@radix-ui/react-icons";
import { renderAsync } from "@react-email/components";
import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { createPreviews } from "@gregermendle/remix-mailer/server/create-previews";
import { delay, fromEvent, mergeMap, tap } from "rxjs";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import LoginCode from "~/emails/login-code";
import ResetPassword from "~/emails/reset-password";
import { PreviewBrowser } from "@gregermendle/remix-mailer/ui/preview-browser";
import exampleCode from "~/example.shiki";
import viteExampleCode from "~/vite-example.shiki";

import "@gregermendle/remix-mailer/ui/index.css";
import { Logo } from "@/components/ui/logo";

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

export default function _Index() {
  const copyRef = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState("previewer");

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
    <main>
      <div className="bg-background/60 backdrop-blur-lg lg:px-0 px-6 max-w-4xl mx-auto pt-6">
        <header className="flex mx-auto w-full items-center justify-between py-4">
          <Link className="flex items-center gap-3" to="/">
            <Logo className="w-8 h-8" />
            <span className="font-semibold text-xl hidden sm:block">
              Remix Mailer
            </span>
          </Link>
          <div className="flex items-center gap-2 md:gap-4">
            <Button
              ref={copyRef}
              aria-label="copy npm install command"
              variant="secondary"
              size="sm"
              className="relative gap-2 text-muted-foreground overflow-hidden"
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
            <Button variant="outline" size="sm" asChild>
              <Link to="https://github.com/gregermendle/remix-mailer">
                Docs
              </Link>
            </Button>
            <Link to="https://github.com/gregermendle/remix-mailer">
              <GitHubLogoIcon className="w-6 h-6 text-muted-foreground" />
            </Link>
          </div>
        </header>
      </div>
      <div className="max-w-4xl w-full mx-auto px-6 lg:px-0 pt-16 mb-12">
        <h1 className="text-5xl font-semibold pb-2 tracking-wide leading-none font-serif">
          Simple e-mail previews
          <br />
          with Remix
        </h1>
        <p className="text-muted-foreground">
          A way to preview and intercept emails in Remix with minimal setup.
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
                value="vite"
                className="transition-colors border border-border/0 data-[state=active]:border-border/100"
              >
                Vite
              </TabsTrigger>
              <TabsTrigger
                value="code"
                className="transition-colors border border-border/0 data-[state=active]:border-border/100"
              >
                No Vite
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
                <PreviewBrowser />
              </div>
            </TabsContent>
            <TabsContent value="code" className="m-0">
              <CodeBlock
                lang="tsx"
                fileName="app/routes/email.tsx"
                code={exampleCode}
              />
            </TabsContent>
            <TabsContent value="vite" className="m-0">
              <CodeBlock
                lang="tsx"
                fileName="app/routes/email.tsx"
                code={viteExampleCode}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <footer className="flex text-sm items-center justify-center border-t py-6 text-muted-foreground">
        <p className="border-r pr-2.5 mr-2.5">
          by{" "}
          <Link to="https://github.com/gregermendle" className="underline">
            greg
          </Link>
        </p>
        <p className="border-r pr-2.5 mr-2.5">
          source is available on{" "}
          <Link
            to="https://github.com/gregermendle/remix-mailer"
            className="underline"
          >
            github
          </Link>
        </p>
        <p>prs welcome :)</p>
      </footer>
    </main>
  );
}

const CodeBlock = ({
  className,
  fileName,
  lang,
  code,
}: {
  className?: string;
  fileName?: string;
  lang?: string;
  code: string;
}) => {
  return (
    <div className="relative text-xs bg-muted/50 shadow-md rounded-lg leading-loose">
      {typeof fileName === "string" && (
        <div className="px-4 py-3 border-b flex items-center gap-2 text-muted-foreground">
          <FileIcon />
          <code>{fileName}</code>
        </div>
      )}
      {typeof lang === "string" && (
        <code
          className={cn(
            "absolute px-4 py-3 right-0 top-0 text-muted-foreground/80 block",
          )}
        >
          {lang}
        </code>
      )}
      <div
        dangerouslySetInnerHTML={{ __html: code }}
        className={cn("overflow-y-hidden overflow-x-auto px-4 py-3", className)}
      />
    </div>
  );
};

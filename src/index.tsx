import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { cn } from "./lib/utils.js";
import { ComponentPlaceholderIcon } from "@radix-ui/react-icons";
import { Button } from "./components/ui/button.js";
import { ScrollArea } from "./components/ui/scroll-area.js";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs.js";
import { Logo } from "./components/ui/logo.js";

const RM_DATA_KEY = "__rmPreviews";

export async function loadPreview<C extends React.ComponentType>(
  request: Request,
  p: Record<string, C>,
  options: {
    renderer: (Component: C) => Promise<string> | string;
  } = {
    renderer: (Component: React.ComponentType) =>
      renderToStaticMarkup(<Component />),
  }
) {
  const url = new URL(request.url);
  const preview = url.searchParams.get("preview");
  const Component =
    typeof preview === "string" && p[preview]
      ? p[preview]
      : null
  const selected = Component
    ? {
        title: preview,
        rendered: await options.renderer(Component),
      }
    : null;

  return {
    [RM_DATA_KEY]: { selected, previews: Object.keys(p) },
  };
}

export const usePreviews = () => {
  const { [RM_DATA_KEY]: previews } = useLoaderData<typeof loadPreview>();
  return previews;
};

export default function PreviewBrowser({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { previews, selected } = usePreviews();
  const view = searchParams.get("view") ?? "desktop";
  
  const changeView = (view: string) => {
    searchParams.set("view", view);
    setSearchParams(searchParams);
  };

  const openPreview = (title: string) => {
    searchParams.set("preview", title);
    setSearchParams(searchParams);
  };

  return (
    <div
      className={cn(
        "grid grid-cols-[260px,1fr] grid-rows-[min-content,1fr] h-screen bg-background text-foreground font-sans dark",
        className
      )}
    >
      <div className="row-span-2 grid grid-rows-[min-content,1fr] grid-cols-1">
        <div className="py-3 px-4 border-b border-r flex gap-1.5 items-center h-12">
          <Logo />
          <span className="font-semibold">Remix Mailer</span>
        </div>
        <ScrollArea className="border-r">
          <h2 className="flex items-center gap-2 pb-1 text-sm font-semibold text-muted-foreground pt-3 px-4">
            Previews
          </h2>
          <ul className="px-4">
            {previews.map((title) => (
              <li key={title}>
                <Button
                  variant={
                    selected?.title === title
                      ? "secondary"
                      : "ghost"
                  }
                  onClick={() => openPreview(title)}
                  size="sm"
                  className="mb-1 gap-1.5 w-full justify-start"
                >
                  <ComponentPlaceholderIcon className="text-muted-foreground" />
                  {title}
                </Button>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>
      <div className="flex items-center justify-center gap-2 px-4 border-b h-12">
        <Tabs
          value={view}
          onValueChange={changeView}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="desktop">Desktop</TabsTrigger>
            <TabsTrigger value="mobile">Mobile</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {selected ? (
        <iframe
          srcDoc={selected.rendered}
          className={cn("h-full w-full", view === "mobile" && "max-w-[375px] max-h-[667px] rounded-2xl mx-auto mt-12 border")}
          title={`${selected.title} preview`}
        />
      ) : (
        <div className="text-muted-foreground flex items-center justify-center">
          <p>No preview selected.</p>
        </div>
      )}
    </div>
  );
}

import { useSearchParams } from "@remix-run/react";
import React from "react";
import { PreviewBrowser as ReactMailerPreviewBrowser } from "@gregermendle/react-mailer/ui/preview-browser";
import { usePreviews } from "./use-previews.js";

const PreviewBrowser = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { previews, selected } = usePreviews();
  const view = searchParams.get("view") ?? "desktop";

  const changeView = (view: string) => {
    searchParams.set("view", view);
    setSearchParams(searchParams, {
      preventScrollReset: true,
    });
  };

  const openPreview = (title: string) => {
    searchParams.set("preview", title);
    setSearchParams(searchParams, {
      preventScrollReset: true,
    });
  };

  return (
    <ReactMailerPreviewBrowser
      ref={ref}
      previews={previews}
      selected={selected}
      view={view}
      onViewChange={changeView}
      onPreviewSelect={openPreview}
      brand="Remix Mailer"
      {...props}
    />
  );
});

PreviewBrowser.displayName = "PreviewBrowser";

export { PreviewBrowser };
export {
  PreviewBrowserNav,
  PreviewBrowserNavItem,
  type PreviewBrowserNavProps,
  type PreviewBrowserNavItemProps,
} from "@gregermendle/react-mailer/ui/preview-browser";

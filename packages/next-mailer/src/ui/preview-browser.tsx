"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { PreviewBrowser as ReactMailerPreviewBrowser } from "@gregermendle/react-mailer/ui/preview-browser";
import { usePreviews } from "./use-previews.js";

const PreviewBrowser = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { previews, selected } = usePreviews();
  const view = searchParams.get("view") ?? "desktop";

  const changeView = (view: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("view", view);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const openPreview = (title: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("preview", title);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <ReactMailerPreviewBrowser
      ref={ref}
      previews={previews}
      selected={selected}
      view={view}
      onViewChange={changeView}
      onPreviewSelect={openPreview}
      brand="Next Mailer"
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

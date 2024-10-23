import {
  ComponentPlaceholderIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import { TabsContent } from "@radix-ui/react-tabs";
import { useSearchParams } from "@remix-run/react";
import React from "react";
import { Button } from "../components/button.js";
import { Logo } from "../components/logo.js";
import { ScrollArea } from "../components/scroll-area.js";
import { Sheet, SheetContent, SheetTrigger } from "../components/sheet.js";
import { Tabs, TabsList, TabsTrigger } from "../components/tabs.js";
import { cn } from "../lib/utils.js";
import { usePreviews } from "./use-previews.js";

const PreviewBrowser = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
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

  const nav = (
    <PreviewBrowserNav>
      {previews.map((title) => (
        <PreviewBrowserNavItem
          key={title}
          value={title}
          aria-label={`view ${title}`}
          isSelected={title === searchParams.get("preview")}
          onClick={openPreview}
        >
          {title}
        </PreviewBrowserNavItem>
      ))}
    </PreviewBrowserNav>
  );

  return (
    <div className="rm">
      <div
        ref={ref}
        className={cn(
          "rm-dark rm-grid sm:rm-grid-cols-[260px,1fr] rm-grid-cols-1 rm-grid-rows-[min-content,1fr] rm-h-screen rm-bg-background rm-text-foreground rm-font-sans",
          className,
        )}
        {...props}
      >
        <div className="rm-row-span-2 rm-grid-rows-[min-content,1fr] rm-grid-cols-1 rm-hidden sm:rm-grid rm-border-r">
          {nav}
        </div>
        <div className="rm-flex rm-items-center rm-justify-center rm-gap-2 rm-px-4 rm-border-b rm-h-14 rm-relative">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="rm-absolute rm-left-2 sm:rm-hidden"
                aria-label="open side navigation"
              >
                <HamburgerMenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="rm-p-0 rm-max-w-[260px]">
              {nav}
            </SheetContent>
          </Sheet>
          <Tabs value={view} onValueChange={changeView}>
            <TabsList className="rm-grid rm-w-full rm-grid-cols-2">
              <TabsTrigger value="desktop" aria-label="view desktop resolution">
                Desktop
              </TabsTrigger>
              <TabsTrigger value="mobile" aria-label="view mobile resolution">
                Mobile
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        {selected ? (
          <Tabs value={view} className="rm-overflow-auto">
            <TabsContent value="desktop" className="rm-w-full rm-h-full">
              <iframe
                srcDoc={selected.rendered}
                className="h-full w-full"
                title={`${selected.title} preview`}
              />
            </TabsContent>
            <TabsContent value="mobile" className="rm-w-full rm-h-full">
              <iframe
                srcDoc={selected.rendered}
                className="rm-h-[667px] rm-w-full rm-max-w-[375px] rm-max-h-[667px] rm-rounded-2xl rm-mx-auto rm-mt-12 rm-border"
                title={`${selected.title} preview`}
              />
            </TabsContent>
          </Tabs>
        ) : (
          <div className="rm-text-muted-foreground rm-flex rm-items-center rm-justify-center">
            <p>No preview selected.</p>
          </div>
        )}
      </div>
    </div>
  );
});

interface PreviewBrowserNavProps extends React.HTMLAttributes<HTMLDivElement> {}

const PreviewBrowserNav = React.forwardRef<
  HTMLDivElement,
  PreviewBrowserNavProps
>(({ children, ...rest }, ref) => {
  return (
    <div ref={ref} {...rest}>
      <div className="rm-px-6 rm-border-b rm-border-dotted rm-flex rm-gap-1.5 rm-items-center rm-h-14">
        <Logo className="rm-w-7 rm-h-7" />
        <span className="rm-font-semibold">Remix Mailer</span>
      </div>
      <ScrollArea>
        <h2 className="rm-flex rm-items-center rm-gap-2 rm-pb-1 rm-text-sm rm-font-semibold rm-text-muted-foreground rm-pt-4 rm-px-6">
          Previews
        </h2>
        <div className="rm-px-4">{children}</div>
      </ScrollArea>
    </div>
  );
});

interface PreviewBrowserNavItemProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, "onClick"> {
  isSelected?: boolean;
  onClick?(
    value: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void;
  value: string;
}

const PreviewBrowserNavItem = React.forwardRef<
  HTMLButtonElement,
  PreviewBrowserNavItemProps
>(({ onClick, value, children, isSelected, className, ...rest }, ref) => {
  const onClickWithValue: React.MouseEventHandler<HTMLButtonElement> =
    React.useCallback(
      (e) => {
        onClick?.(value, e);
      },
      [value, onClick],
    );

  return (
    <Button
      ref={ref}
      variant={isSelected ? "secondary" : "ghost"}
      onClick={onClickWithValue}
      size="sm"
      className={cn("rm-mb-1 rm-gap-1.5 rm-w-full rm-justify-start", className)}
      {...rest}
    >
      <ComponentPlaceholderIcon className="rm-text-muted-foreground" />
      {children}
    </Button>
  );
});

export {
  PreviewBrowser,
  PreviewBrowserNav,
  PreviewBrowserNavItem,
  PreviewBrowserNavProps,
  PreviewBrowserNavItemProps,
};

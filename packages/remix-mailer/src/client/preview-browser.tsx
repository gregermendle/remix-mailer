import {
  ComponentPlaceholderIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import { TabsContent } from "@radix-ui/react-tabs";
import { useSearchParams } from "@remix-run/react";
import React from "react";
import { cn } from "../lib/utils";
import { usePreviews } from "../server";
import { Button } from "./button";
import { Logo } from "./logo";
import { ScrollArea } from "./scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";
import { Tabs, TabsList, TabsTrigger } from "./tabs";

const PreviewBrowser = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
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

  const nav = (
    <PreviewBrowserNav>
      {previews.map((title) => (
        <PreviewBrowserNavItem
          key={title}
          value={title}
          isSelected={title === searchParams.get("preview")}
          onClick={openPreview}
        >
          {title}
        </PreviewBrowserNavItem>
      ))}
    </PreviewBrowserNav>
  );

  return (
    <div
      ref={ref}
      className={cn(
        "grid sm:grid-cols-[260px,1fr] grid-cols-1 grid-rows-[min-content,1fr] h-screen bg-background text-foreground font-sans dark",
        className
      )}
      {...props}
    >
      <div className="row-span-2 grid-rows-[min-content,1fr] grid-cols-1 hidden sm:grid border-r">
        {nav}
      </div>
      <div className="flex items-center justify-center gap-2 px-4 border-b h-14 relative">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="absolute left-2 sm:hidden"
            >
              <HamburgerMenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 max-w-[260px]">
            {nav}
          </SheetContent>
        </Sheet>
        <Tabs value={view} onValueChange={changeView}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="desktop">Desktop</TabsTrigger>
            <TabsTrigger value="mobile">Mobile</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {selected ? (
        <Tabs value={view}>
          <TabsContent value="desktop" className="w-full h-full">
            <iframe
              srcDoc={selected.rendered}
              className="h-full w-full"
              title={`${selected.title} preview`}
            />
          </TabsContent>
          <TabsContent value="mobile" className="w-full h-full">
            <iframe
              srcDoc={selected.rendered}
              className="h-full w-full max-w-[375px] max-h-[667px] rounded-2xl mx-auto mt-12 border"
              title={`${selected.title} preview`}
            />
          </TabsContent>
        </Tabs>
      ) : (
        <div className="text-muted-foreground flex items-center justify-center">
          <p>No preview selected.</p>
        </div>
      )}
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
      <div className="px-6 border-b border-dotted flex gap-1.5 items-center h-14">
        <Logo className="w-7 h-7" />
        <span className="font-semibold">Remix Mailer</span>
      </div>
      <ScrollArea>
        <h2 className="flex items-center gap-2 pb-1 text-sm font-semibold text-muted-foreground pt-4 px-6">
          Previews
        </h2>
        <div className="px-4">{children}</div>
      </ScrollArea>
    </div>
  );
});

interface PreviewBrowserNavItemProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, "onClick"> {
  isSelected?: boolean;
  onClick?(
    value: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
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
      [value, onClick]
    );

  return (
    <Button
      ref={ref}
      variant={isSelected ? "secondary" : "ghost"}
      onClick={onClickWithValue}
      size="sm"
      className={cn("mb-1 gap-1.5 w-full justify-start", className)}
      {...rest}
    >
      <ComponentPlaceholderIcon className="text-muted-foreground" />
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

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { NavLink, Outlet } from "@remix-run/react";
import {
  Layout,
  LayoutFooter,
  LayoutHeader,
  LayoutHeaderLogo,
  LayoutHeaderNav,
} from "./__layout/layout";

const pages = [
  {
    title: "Installation",
    href: "/docs/installation",
  },
  {
    title: "<PreviewBrowser />",
    href: "/docs/preview-browser",
  },
  {
    title: "loadPreviews",
    href: "/docs/load-previews",
  },
  {
    title: "usePreviews",
    href: "/docs/use-previews",
  },
];

export default function __Layout__Toc() {
  const nav = (
    <>
      <h3 className="text-sm text-muted-foreground font-semibold pb-4">Docs</h3>
      <div className="space-y-1">
        {pages.map((page) => (
          <Button
            key={page.href}
            variant="ghost"
            size="sm"
            className="w-full justify-start [&.active]:bg-muted"
            asChild
          >
            <NavLink prefetch="intent" to={page.href}>
              {page.title}
            </NavLink>
          </Button>
        ))}
      </div>
    </>
  );

  return (
    <Layout>
      <LayoutHeader>
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="sm:hidden h-8 w-8"
              >
                <HamburgerMenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="px-6 py-4 max-w-[260px]">
              {nav}
            </SheetContent>
          </Sheet>
          <LayoutHeaderLogo />
        </div>
        <LayoutHeaderNav />
      </LayoutHeader>
      <div
        className={cn(
          "grid sm:grid-cols-[260px,1fr] grid-cols-1 grid-rows-1 bg-background text-foreground font-sans dark",
        )}
      >
        <div className="hidden sm:block border-r">
          <div className="sticky top-[65px] p-6">{nav}</div>
        </div>
        <div className="px-10 py-6 mdx max-w-2xl">
          <Outlet />
        </div>
      </div>
      <LayoutFooter />
    </Layout>
  );
}

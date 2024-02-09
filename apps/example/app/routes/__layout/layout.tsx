import { GitHubLogoIcon } from "@radix-ui/react-icons";
import type { LinkProps } from "@remix-run/react";
import { Link } from "@remix-run/react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

const LayoutHeaderLogo = ({
  to = "/",
  className,
  ...rest
}: Omit<LinkProps, "to"> & { to?: LinkProps["to"] }) => {
  return (
    <Link
      className={cn("flex items-center gap-2", className)}
      to={to}
      {...rest}
    >
      <Logo className="w-8 h-8" />
      <span className="font-semibold">Remix Mailer</span>
    </Link>
  );
};

const LayoutHeaderNav = () => {
  return (
    <div className="flex items-center gap-4">
      <Button variant="outline" size="sm" asChild>
        <Link to="https://github.com/gregermendle/remix-mailer">Docs</Link>
      </Button>
      <Link to="https://github.com/gregermendle/remix-mailer">
        <GitHubLogoIcon className="w-6 h-6 text-muted-foreground" />
      </Link>
    </div>
  );
};

const LayoutHeader = ({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "sticky z-50 bg-background/60 backdrop-blur-lg top-0 border-b px-6",
        className,
      )}
      {...rest}
    >
      <header className="flex mx-auto w-full items-center justify-between py-4">
        {children}
      </header>
    </div>
  );
};

const Layout = ({ children, ...rest }: React.HTMLAttributes<HTMLElement>) => {
  return <main {...rest}>{children}</main>;
};

const LayoutFooter = () => {
  return (
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
  );
};

export {
  Layout,
  LayoutHeader,
  LayoutHeaderLogo,
  LayoutHeaderNav,
  LayoutFooter,
};

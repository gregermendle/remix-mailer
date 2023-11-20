import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Link, Outlet } from "@remix-run/react";

export default function __Layout() {
  return (
    <main>
      <div className="sticky z-50 bg-background/60 backdrop-blur-lg top-0 border-b px-6">
        <header className="flex mx-auto w-full items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2">
            <Logo className="w-8 h-8" />
            <span className="font-semibold">Remix Mailer</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/docs">Docs</Link>
            </Button>
            <Link to="https://github.com/gregermendle/remix-mailer">
              <GitHubLogoIcon className="w-6 h-6 text-muted-foreground" />
            </Link>
          </div>
        </header>
      </div>
      <Outlet />
      <footer className="flex text-sm items-center justify-center border-t py-6 mt-12 text-muted-foreground">
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

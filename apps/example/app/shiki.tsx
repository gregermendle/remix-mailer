import { useLoaderData } from "@remix-run/react";
import { cn } from "@/lib/utils";
import { shikiize } from "./shiki.server";

const Shikiize = ({ id, className }: { id: string; className?: string }) => {
  const { blocks } = useLoaderData<typeof shikiize>();

  if (!blocks[id]) {
    throw new Error("Highlighted code block does not exist for id: " + id);
  }

  return (
    <div
      dangerouslySetInnerHTML={{ __html: blocks[id] }}
      className={cn(
        "overflow-auto border bg-muted/50 rounded-md leading-loose",
        className,
      )}
    />
  );
};

export { Shikiize };

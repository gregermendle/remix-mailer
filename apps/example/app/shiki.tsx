import { FileIcon } from "@radix-ui/react-icons";
import { useLoaderData } from "@remix-run/react";
import { cn } from "@/lib/utils";
import { shikiize } from "./shiki.server";

const Shikiize = ({
  id,
  className,
  fileName,
  lang,
}: {
  id: string;
  className?: string;
  fileName?: string;
  lang?: string;
}) => {
  const { blocks } = useLoaderData<typeof shikiize>();

  if (!blocks[id]) {
    throw new Error("Highlighted code block does not exist for id: " + id);
  }

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
        dangerouslySetInnerHTML={{ __html: blocks[id] }}
        className={cn("overflow-y-hidden overflow-x-auto px-4 py-3", className)}
      />
    </div>
  );
};

export { Shikiize };

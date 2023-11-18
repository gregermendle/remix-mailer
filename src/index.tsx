import * as React from "react";
import { renderAsync } from "@react-email/components";
import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import { cn } from "./lib/utils.js";

type EmailComponent<P = object> = {
  (props: P): JSX.Element;
  PreviewProps?: P;
};

const RM_DATA_KEY = "__rmPreviews";

export async function loadPreview(
  request: Request,
  p: Record<string, EmailComponent>,
) {
  const url = new URL(request.url);
  const preview = url.searchParams.get("preview");
  const Component =
    typeof preview === "string" && p[preview]
      ? p[preview]
      : Object.values(p)[0];
  const selected = Component
    ? {
        title: preview,
        rendered: await renderAsync(<Component {...Component?.PreviewProps} />),
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
  const [searchParams] = useSearchParams();
  const { previews, selected } = usePreviews();

  return (
    <div
      className={cn("bg-background text-foreground font-sans dark", className)}
    >
      <div className="px-4 py-4">
        <h1 className="pb-2 font-semibold">Remix Mailer</h1>
        <h2 className="flex items-center gap-2 pb-1 text-sm font-semibold text-gray-400">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.75432 1.81954C7.59742 1.72682 7.4025 1.72682 7.24559 1.81954L1.74559 5.06954C1.59336 5.15949 1.49996 5.32317 1.49996 5.5C1.49996 5.67683 1.59336 5.84051 1.74559 5.93046L7.24559 9.18046C7.4025 9.27318 7.59742 9.27318 7.75432 9.18046L13.2543 5.93046C13.4066 5.84051 13.5 5.67683 13.5 5.5C13.5 5.32317 13.4066 5.15949 13.2543 5.06954L7.75432 1.81954ZM7.49996 8.16923L2.9828 5.5L7.49996 2.83077L12.0171 5.5L7.49996 8.16923ZM2.25432 8.31954C2.01658 8.17906 1.70998 8.2579 1.56949 8.49564C1.42901 8.73337 1.50785 9.03998 1.74559 9.18046L7.24559 12.4305C7.4025 12.5232 7.59742 12.5232 7.75432 12.4305L13.2543 9.18046C13.4921 9.03998 13.5709 8.73337 13.4304 8.49564C13.2899 8.2579 12.9833 8.17906 12.7456 8.31954L7.49996 11.4192L2.25432 8.31954Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          Previews
        </h2>
        <ul className="ml-2 border-l border-dotted border-l-gray-700 py-1 pl-4">
          {previews.map((title) => (
            <li
              key={title}
              className={cn(
                "flex items-center gap-2 text-gray-400 py-1 text-sm",
                searchParams.get("preview") === title && "text-white",
              )}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.1465 1.48959C7.34176 1.29432 7.65835 1.29432 7.85361 1.48959L13.5105 7.14644C13.7057 7.3417 13.7057 7.65829 13.5105 7.85355L7.85361 13.5104C7.65835 13.7057 7.34176 13.7057 7.1465 13.5104L1.48965 7.85355C1.29439 7.65829 1.29439 7.3417 1.48965 7.14644L7.1465 1.48959ZM7.50005 2.55025L2.55031 7.49999L7.50005 12.4497L12.4498 7.49999L7.50005 2.55025Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
              <Link to={`?preview=${encodeURIComponent(title)}`}>{title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-[240px,1fr] grid-rows-1">
        {selected && (
          <iframe
            srcDoc={selected.rendered}
            className="h-screen w-full"
            title={`${selected.title} preview`}
          />
        )}
      </div>
    </div>
  );
}

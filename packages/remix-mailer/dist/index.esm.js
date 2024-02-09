// src/client/preview-browser.tsx
import {
  ComponentPlaceholderIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import { TabsContent as TabsContent2 } from "@radix-ui/react-tabs";
import { useSearchParams } from "@remix-run/react";
import React5 from "react";

// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/server/index.tsx
import { useLoaderData } from "@remix-run/react";
import { renderToStaticMarkup } from "react-dom/server";
import { jsx } from "react/jsx-runtime";
var RM_DATA_KEY = "__rmPreviews";
async function loadPreview(
  request,
  p,
  {
    allowedEnvs = ["development", "test"],
    renderer = (Component) =>
      renderToStaticMarkup(/* @__PURE__ */ jsx(Component, {})),
  },
) {
  if (
    typeof process.env.NODE_ENV !== "string" ||
    !allowedEnvs.includes(process.env.NODE_ENV)
  ) {
    throw new Response("You do not have access to this resource.", {
      status: 403,
    });
  }
  const url = new URL(request.url);
  const preview = url.searchParams.get("preview");
  const Component =
    typeof preview === "string" && p[preview] ? p[preview] : null;
  const selected = Component
    ? {
        title: preview,
        rendered: await renderer(Component),
      }
    : null;
  return {
    [RM_DATA_KEY]: { selected, previews: Object.keys(p) },
  };
}
var usePreviews = () => {
  const { [RM_DATA_KEY]: previews } = useLoaderData();
  return previews;
};

// src/client/button.tsx
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import * as React from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
var buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
var Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx2(Comp, {
      className: cn(buttonVariants({ variant, size, className })),
      ref,
      ...props,
    });
  },
);
Button.displayName = "Button";

// src/client/logo.tsx
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
var Logo = () =>
  /* @__PURE__ */ jsxs("svg", {
    width: "21",
    height: "16",
    viewBox: "0 0 21 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ jsx3("path", {
        opacity: "0.05",
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M6.90588 13.499C8.86196 10.0758 8.86196 5.17014 6.90588 1.747L7.34 1.49893C9.38392 5.07578 9.38392 10.1702 7.34 13.747L6.90588 13.499Z",
        fill: "white",
      }),
      /* @__PURE__ */ jsx3("path", {
        opacity: "0.1",
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M7.40491 13.6005C9.36216 10.1182 9.36216 5.1277 7.40491 1.64543L7.84078 1.40045C9.88354 5.03485 9.88354 10.2111 7.84078 13.8455L7.40491 13.6005Z",
        fill: "white",
      }),
      /* @__PURE__ */ jsx3("path", {
        opacity: "0.15",
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M7.94385 13.6294C9.84789 10.1182 9.84923 5.13706 7.94779 1.62379L8.38752 1.3858C10.3694 5.04761 10.368 10.208 8.38339 13.8678L7.94385 13.6294Z",
        fill: "white",
      }),
      /* @__PURE__ */ jsx3("path", {
        opacity: "0.2",
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M8.53577 13.552C10.3181 10.0514 10.3186 5.19833 8.53728 1.69698L8.98292 1.47025C10.8368 5.11409 10.8362 10.1358 8.98134 13.7789L8.53577 13.552Z",
        fill: "white",
      }),
      /* @__PURE__ */ jsx3("path", {
        opacity: "0.25",
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M9.14734 13.4186C10.7796 9.96086 10.7815 5.30011 9.15298 1.83952L9.60538 1.62662C11.2974 5.22215 11.2955 10.0392 9.5995 13.6321L9.14734 13.4186Z",
        fill: "white",
      }),
      /* @__PURE__ */ jsx3("path", {
        opacity: "0.3",
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M9.79102 13.1885C11.2326 9.81867 11.2336 5.43505 9.79381 2.0639L10.2536 1.86752C11.747 5.36416 11.746 9.88978 10.2507 13.3852L9.79102 13.1885Z",
        fill: "white",
      }),
      /* @__PURE__ */ jsx3("path", {
        opacity: "0.35",
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M10.454 12.8686C11.6781 9.64369 11.6794 5.61399 10.4577 2.3874L10.9254 2.21036C12.1902 5.55111 12.1889 9.7069 10.9215 13.0461L10.454 12.8686Z",
        fill: "white",
      }),
      /* @__PURE__ */ jsx3("path", {
        opacity: "0.4",
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M11.1384 12.4216C12.1167 9.4204 12.1177 5.83592 11.1413 2.83363L11.6168 2.67899C12.6259 5.78186 12.6249 9.47474 11.6138 12.5765L11.1384 12.4216Z",
        fill: "white",
      }),
      /* @__PURE__ */ jsx3("path", {
        opacity: "0.45",
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M11.8444 11.791C12.5484 9.13598 12.5492 6.11986 11.8467 3.46411L12.3301 3.33624C13.0548 6.07587 13.054 9.18023 12.3277 11.9191L11.8444 11.791Z",
        fill: "white",
      }),
      /* @__PURE__ */ jsx3("path", {
        opacity: "0.5",
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M12.5661 10.875C12.9753 8.76058 12.9752 6.48385 12.5658 4.36956L13.0567 4.27451C13.4782 6.45157 13.4783 8.79281 13.057 10.97L12.5661 10.875Z",
        fill: "white",
      }),
      /* @__PURE__ */ jsx3("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M1 7.62283C1 3.96514 3.96514 1 7.62283 1C11.2805 1 14.2456 3.96514 14.2456 7.62283C14.2456 11.2805 11.2805 14.2457 7.62283 14.2457C3.96514 14.2457 1 11.2805 1 7.62283ZM7.62283 1.94999C4.48981 1.94999 1.95 4.48981 1.95 7.62283C1.95 10.7559 4.48981 13.2957 7.62283 13.2957C10.7558 13.2957 13.2956 10.7559 13.2956 7.62283C13.2956 4.48981 10.7558 1.94999 7.62283 1.94999Z",
        fill: "white",
      }),
      /* @__PURE__ */ jsx3("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M19.0865 8.91102C19.5965 10.6959 19.4991 12.5996 18.8097 14.3231L17.8812 13.9517C18.4883 12.4339 18.5741 10.7575 18.125 9.18574L17.6496 7.52193C17.111 5.63661 17.111 3.63811 17.6496 1.75279L17.8647 1L18.8262 1.27472L18.6112 2.02751C18.1238 3.73328 18.1238 5.54144 18.6112 7.24721L19.0865 8.91102Z",
        fill: "white",
      }),
    ],
  });

// src/client/scroll-area.tsx
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import * as React2 from "react";
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
var ScrollArea = React2.forwardRef(({ className, children, ...props }, ref) =>
  /* @__PURE__ */ jsxs2(ScrollAreaPrimitive.Root, {
    ref,
    className: cn("relative overflow-hidden", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx4(ScrollAreaPrimitive.Viewport, {
        className: "h-full w-full rounded-[inherit]",
        children,
      }),
      /* @__PURE__ */ jsx4(ScrollBar, {}),
      /* @__PURE__ */ jsx4(ScrollAreaPrimitive.Corner, {}),
    ],
  }),
);
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
var ScrollBar = React2.forwardRef(
  ({ className, orientation = "vertical", ...props }, ref) =>
    /* @__PURE__ */ jsx4(ScrollAreaPrimitive.ScrollAreaScrollbar, {
      ref,
      orientation,
      className: cn(
        "flex touch-none select-none transition-colors",
        orientation === "vertical" &&
          "h-full w-2.5 border-l border-l-transparent p-[1px]",
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent p-[1px]",
        className,
      ),
      ...props,
      children: /* @__PURE__ */ jsx4(ScrollAreaPrimitive.ScrollAreaThumb, {
        className: "relative flex-1 rounded-full bg-border",
      }),
    }),
);
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

// src/client/sheet.tsx
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { cva as cva2 } from "class-variance-authority";
import * as React3 from "react";
import { Fragment, jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
var Sheet = SheetPrimitive.Root;
var SheetTrigger = SheetPrimitive.Trigger;
var SheetOverlay = React3.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ jsx5(SheetPrimitive.Overlay, {
    className: cn(
      "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    ),
    ...props,
    ref,
  }),
);
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
var sheetVariants = cva2(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);
var SheetContent = React3.forwardRef(
  ({ side = "right", className, children, ...props }, ref) =>
    /* @__PURE__ */ jsxs3(Fragment, {
      children: [
        /* @__PURE__ */ jsx5(SheetOverlay, {}),
        /* @__PURE__ */ jsxs3(SheetPrimitive.Content, {
          ref,
          className: cn(sheetVariants({ side }), className),
          ...props,
          children: [
            children,
            /* @__PURE__ */ jsxs3(SheetPrimitive.Close, {
              className:
                "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
              children: [
                /* @__PURE__ */ jsx5(Cross2Icon, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsx5("span", {
                  className: "sr-only",
                  children: "Close",
                }),
              ],
            }),
          ],
        }),
      ],
    }),
);
SheetContent.displayName = SheetPrimitive.Content.displayName;
var SheetHeader = ({ className, ...props }) =>
  /* @__PURE__ */ jsx5("div", {
    className: cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className,
    ),
    ...props,
  });
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) =>
  /* @__PURE__ */ jsx5("div", {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    ),
    ...props,
  });
SheetFooter.displayName = "SheetFooter";
var SheetTitle = React3.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ jsx5(SheetPrimitive.Title, {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props,
  }),
);
SheetTitle.displayName = SheetPrimitive.Title.displayName;
var SheetDescription = React3.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ jsx5(SheetPrimitive.Description, {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props,
  }),
);
SheetDescription.displayName = SheetPrimitive.Description.displayName;

// src/client/tabs.tsx
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React4 from "react";
import { jsx as jsx6 } from "react/jsx-runtime";
var Tabs = TabsPrimitive.Root;
var TabsList = React4.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ jsx6(TabsPrimitive.List, {
    ref,
    className: cn(
      "inline-flex h-8 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className,
    ),
    ...props,
  }),
);
TabsList.displayName = TabsPrimitive.List.displayName;
var TabsTrigger = React4.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ jsx6(TabsPrimitive.Trigger, {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className,
    ),
    ...props,
  }),
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
var TabsContent = React4.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ jsx6(TabsPrimitive.Content, {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    ),
    ...props,
  }),
);
TabsContent.displayName = TabsPrimitive.Content.displayName;

// src/client/preview-browser.tsx
import { jsx as jsx7, jsxs as jsxs4 } from "react/jsx-runtime";
var PreviewBrowser = React5.forwardRef(({ className, ...props }, ref) => {
  var _a;
  const [searchParams, setSearchParams] = useSearchParams();
  const { previews, selected } = usePreviews();
  const view = (_a = searchParams.get("view")) != null ? _a : "desktop";
  const changeView = (view2) => {
    searchParams.set("view", view2);
    setSearchParams(searchParams);
  };
  const openPreview = (title) => {
    searchParams.set("preview", title);
    setSearchParams(searchParams);
  };
  const nav = /* @__PURE__ */ jsx7(PreviewBrowserNav, {
    children: previews.map((title) =>
      /* @__PURE__ */ jsx7(
        PreviewBrowserNavItem,
        {
          value: title,
          isSelected: title === searchParams.get("preview"),
          onClick: openPreview,
          children: title,
        },
        title,
      ),
    ),
  });
  return /* @__PURE__ */ jsxs4("div", {
    ref,
    className: cn(
      "grid sm:grid-cols-[260px,1fr] grid-cols-1 grid-rows-[min-content,1fr] h-screen bg-background text-foreground font-sans dark",
      className,
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx7("div", {
        className:
          "row-span-2 grid-rows-[min-content,1fr] grid-cols-1 hidden sm:grid border-r",
        children: nav,
      }),
      /* @__PURE__ */ jsxs4("div", {
        className:
          "flex items-center justify-center gap-2 px-4 border-b h-14 relative",
        children: [
          /* @__PURE__ */ jsxs4(Sheet, {
            children: [
              /* @__PURE__ */ jsx7(SheetTrigger, {
                asChild: true,
                children: /* @__PURE__ */ jsx7(Button, {
                  size: "icon",
                  variant: "outline",
                  className: "absolute left-2 sm:hidden",
                  children: /* @__PURE__ */ jsx7(HamburgerMenuIcon, {}),
                }),
              }),
              /* @__PURE__ */ jsx7(SheetContent, {
                side: "left",
                className: "p-0 max-w-[260px]",
                children: nav,
              }),
            ],
          }),
          /* @__PURE__ */ jsx7(Tabs, {
            value: view,
            onValueChange: changeView,
            children: /* @__PURE__ */ jsxs4(TabsList, {
              className: "grid w-full grid-cols-2",
              children: [
                /* @__PURE__ */ jsx7(TabsTrigger, {
                  value: "desktop",
                  children: "Desktop",
                }),
                /* @__PURE__ */ jsx7(TabsTrigger, {
                  value: "mobile",
                  children: "Mobile",
                }),
              ],
            }),
          }),
        ],
      }),
      selected
        ? /* @__PURE__ */ jsxs4(Tabs, {
            value: view,
            children: [
              /* @__PURE__ */ jsx7(TabsContent2, {
                value: "desktop",
                className: "w-full h-full",
                children: /* @__PURE__ */ jsx7("iframe", {
                  srcDoc: selected.rendered,
                  className: "h-full w-full",
                  title: `${selected.title} preview`,
                }),
              }),
              /* @__PURE__ */ jsx7(TabsContent2, {
                value: "mobile",
                className: "w-full h-full",
                children: /* @__PURE__ */ jsx7("iframe", {
                  srcDoc: selected.rendered,
                  className:
                    "h-full w-full max-w-[375px] max-h-[667px] rounded-2xl mx-auto mt-12 border",
                  title: `${selected.title} preview`,
                }),
              }),
            ],
          })
        : /* @__PURE__ */ jsx7("div", {
            className: "text-muted-foreground flex items-center justify-center",
            children: /* @__PURE__ */ jsx7("p", {
              children: "No preview selected.",
            }),
          }),
    ],
  });
});
var PreviewBrowserNav = React5.forwardRef(({ children, ...rest }, ref) => {
  return /* @__PURE__ */ jsxs4("div", {
    ref,
    ...rest,
    children: [
      /* @__PURE__ */ jsxs4("div", {
        className: "px-6 border-b border-dotted flex gap-1.5 items-center h-14",
        children: [
          /* @__PURE__ */ jsx7(Logo, {}),
          /* @__PURE__ */ jsx7("span", {
            className: "font-semibold",
            children: "Remix Mailer",
          }),
        ],
      }),
      /* @__PURE__ */ jsxs4(ScrollArea, {
        children: [
          /* @__PURE__ */ jsx7("h2", {
            className:
              "flex items-center gap-2 pb-1 text-sm font-semibold text-muted-foreground pt-4 px-6",
            children: "Previews",
          }),
          /* @__PURE__ */ jsx7("div", { className: "px-4", children }),
        ],
      }),
    ],
  });
});
var PreviewBrowserNavItem = React5.forwardRef(
  ({ onClick, value, children, isSelected, className, ...rest }, ref) => {
    const onClickWithValue = React5.useCallback(
      (e) => {
        onClick == null ? void 0 : onClick(value, e);
      },
      [value, onClick],
    );
    return /* @__PURE__ */ jsxs4(Button, {
      ref,
      variant: isSelected ? "secondary" : "ghost",
      onClick: onClickWithValue,
      size: "sm",
      className: cn("mb-1 gap-1.5 w-full justify-start", className),
      ...rest,
      children: [
        /* @__PURE__ */ jsx7(ComponentPlaceholderIcon, {
          className: "text-muted-foreground",
        }),
        children,
      ],
    });
  },
);
export {
  PreviewBrowser,
  PreviewBrowserNav,
  PreviewBrowserNavItem,
  loadPreview,
  usePreviews,
};
//# sourceMappingURL=index.esm.js.map

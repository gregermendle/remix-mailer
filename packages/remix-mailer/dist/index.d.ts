import * as React from "react";
import React__default from "react";

declare const PreviewBrowser: React__default.ForwardRefExoticComponent<
  React__default.HTMLAttributes<HTMLDivElement> &
    React__default.RefAttributes<HTMLDivElement>
>;
interface PreviewBrowserNavProps
  extends React__default.HTMLAttributes<HTMLDivElement> {}
declare const PreviewBrowserNav: React__default.ForwardRefExoticComponent<
  PreviewBrowserNavProps & React__default.RefAttributes<HTMLDivElement>
>;
interface PreviewBrowserNavItemProps
  extends Omit<React__default.HTMLAttributes<HTMLButtonElement>, "onClick"> {
  isSelected?: boolean;
  onClick?(
    value: string,
    e: React__default.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void;
  value: string;
}
declare const PreviewBrowserNavItem: React__default.ForwardRefExoticComponent<
  PreviewBrowserNavItemProps & React__default.RefAttributes<HTMLButtonElement>
>;

declare function loadPreview(
  request: Request,
  p: Record<string, React.ComponentType>,
  {
    allowedEnvs,
    renderer,
  }: {
    allowedEnvs?: string[];
    renderer?: (
      Component: (typeof p)[keyof typeof p],
    ) => Promise<string> | string;
  },
): Promise<{
  __rmPreviews: {
    selected: {
      title: string | null;
      rendered: string;
    } | null;
    previews: string[];
  };
}>;
declare const usePreviews: () => {
  selected:
    | ({
        title: string | null;
        rendered: string;
      } & {})
    | null;
  previews: string[];
} & {};

export {
  PreviewBrowser,
  PreviewBrowserNav,
  PreviewBrowserNavItem,
  PreviewBrowserNavItemProps,
  PreviewBrowserNavProps,
  loadPreview,
  usePreviews,
};

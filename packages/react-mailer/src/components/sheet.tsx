import * as SheetPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/utils.js";

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "rm-fixed rm-inset-0 rm-z-50 rm-bg-black/80 rm- data-[state=open]:rm-animate-in data-[state=closed]:rm-animate-out data-[state=closed]:rm-fade-out-0 data-[state=open]:rm-fade-in-0",
      className,
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  "rm-fixed rm-z-50 rm-gap-4 rm-bg-background rm-p-6 rm-shadow-lg rm-transition rm-ease-in-out data-[state=closed]:rm-duration-300 data-[state=open]:rm-duration-500 data-[state=open]:rm-animate-in data-[state=closed]:rm-animate-out",
  {
    variants: {
      side: {
        top: "rm-inset-x-0 rm-top-0 rm-border-b data-[state=closed]:rm-slide-out-to-top data-[state=open]:rm-slide-in-from-top",
        bottom:
          "rm-inset-x-0 rm-bottom-0 rm-border-t data-[state=closed]:rm-slide-out-to-bottom data-[state=open]:rm-slide-in-from-bottom",
        left: "rm-inset-y-0 rm-left-0 rm-h-full rm-w-3/4 rm-border-r data-[state=closed]:rm-slide-out-to-left data-[state=open]:rm-slide-in-from-left sm:rm-max-w-sm",
        right:
          "rm-inset-y-0 rm-right-0 rm-h-full rm-w-3/4 rm-border-l data-[state=closed]:rm-slide-out-to-right data-[state=open]:rm-slide-in-from-right sm:rm-max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      <SheetPrimitive.Close className="rm-absolute rm-right-4 rm-top-4 rm-rounded-sm rm-opacity-70 rm-ring-offset-background rm-transition-opacity hover:rm-opacity-100 focus:rm-outline-none focus:rm-ring-2 focus:rm-ring-ring focus:rm-ring-offset-2 disabled:rm-pointer-events-none data-[state=open]:rm-bg-secondary">
        <Cross2Icon className="rm-h-4 rm-w-4" />
        <span className="rm-sr-only">Close</span>
      </SheetPrimitive.Close>
      {children}
    </SheetPrimitive.Content>
  </>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "rm-flex rm-flex-col rm-space-y-2 rm-text-center sm:rm-text-left",
      className,
    )}
    {...props}
  />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "rm-flex rm-flex-col-reverse sm:rm-flex-row sm:rm-justify-end sm:rm-space-x-2",
      className,
    )}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("rm-text-lg rm-font-semibold rm-text-foreground", className)}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("rm-text-sm rm-text-muted-foreground", className)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};

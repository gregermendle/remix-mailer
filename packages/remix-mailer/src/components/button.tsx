import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils.js";

const buttonVariants = cva(
  "rm-inline-flex rm-items-center rm-justify-center rm-gap-2 rm-whitespace-nowrap rm-rounded-md rm-text-sm rm-font-medium rm-transition-colors focus-visible:rm-outline-none focus-visible:rm-ring-1 focus-visible:rm-ring-ring disabled:rm-pointer-events-none disabled:rm-opacity-50 [&_svg]:rm-pointer-events-none [&_svg]:rm-size-4 [&_svg]:rm-shrink-0",
  {
    variants: {
      variant: {
        default:
          "rm-bg-primary rm-text-primary-foreground rm-shadow hover:rm-bg-primary/90",
        destructive:
          "rm-bg-destructive rm-text-destructive-foreground rm-shadow-sm hover:rm-bg-destructive/90",
        outline:
          "rm-border rm-border-input rm-bg-background rm-shadow-sm hover:rm-bg-accent hover:rm-text-accent-foreground",
        secondary:
          "rm-bg-secondary rm-text-secondary-foreground rm-shadow-sm hover:rm-bg-secondary/80",
        ghost: "hover:rm-bg-accent hover:rm-text-accent-foreground",
        link: "rm-text-primary rm-underline-offset-4 hover:rm-underline",
      },
      size: {
        default: "rm-h-9 rm-px-4 rm-py-2",
        sm: "rm-h-8 rm-rounded-md rm-px-3 rm-text-xs",
        lg: "rm-h-10 rm-rounded-md rm-px-8",
        icon: "rm-h-9 rm-w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

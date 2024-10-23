import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../lib/utils.js";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "rm-inline-flex rm-h-9 rm-items-center rm-justify-center rm-rounded-lg rm-bg-muted rm-p-1 rm-text-muted-foreground",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "rm-inline-flex rm-items-center rm-justify-center rm-whitespace-nowrap rm-rounded-md rm-px-3 rm-py-1 rm-text-sm rm-font-medium rm-ring-offset-background rm-transition-all focus-visible:rm-outline-none focus-visible:rm-ring-2 focus-visible:rm-ring-ring focus-visible:rm-ring-offset-2 disabled:rm-pointer-events-none disabled:rm-opacity-50 data-[state=active]:rm-bg-background data-[state=active]:rm-text-foreground data-[state=active]:rm-shadow",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "rm-mt-2 rm-ring-offset-background focus-visible:rm-outline-none focus-visible:rm-ring-2 focus-visible:rm-ring-ring focus-visible:rm-ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };

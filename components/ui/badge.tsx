import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-border bg-card text-muted-foreground",
        muted: "border-transparent bg-muted text-muted-foreground",
        primary: "border-primary/25 bg-primary/10 text-primary",
        outline: "border-border bg-transparent text-muted-foreground",
      },
      size: {
        default: "px-2.5 py-0.5 text-[11px]",
        sm: "px-2 py-px text-[10px]",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

function Badge({
  className,
  variant,
  size,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

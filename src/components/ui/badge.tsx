import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // Genre-specific variants
        action: "border-transparent bg-[hsl(199_89%_48%/0.15)] text-[hsl(199,89%,48%)]",
        comedy: "border-transparent bg-[hsl(45_93%_47%/0.15)] text-[hsl(45,93%,47%)]",
        drama: "border-transparent bg-[hsl(259_67%_60%/0.15)] text-[hsl(259,67%,60%)]",
        romance: "border-transparent bg-[hsl(340_82%_52%/0.15)] text-[hsl(340,82%,52%)]",
        thriller: "border-transparent bg-[hsl(0_84%_60%/0.15)] text-[hsl(0,84%,60%)]",
        scifi: "border-transparent bg-primary/15 text-primary",
        // Score variants
        scoreHigh: "border-transparent bg-[hsl(142_71%_45%/0.15)] text-[hsl(142,71%,45%)] font-mono",
        scoreMedium: "border-transparent bg-[hsl(45_93%_47%/0.15)] text-[hsl(45,93%,47%)] font-mono",
        scoreLow: "border-transparent bg-[hsl(0_84%_60%/0.15)] text-[hsl(0,84%,60%)] font-mono",
        // Source variants
        hybrid: "border-transparent bg-gradient-to-r from-primary/20 to-secondary/20 text-foreground",
        svd: "border-transparent bg-primary/15 text-primary",
        content: "border-transparent bg-secondary/15 text-secondary",
        trending: "border-transparent bg-[hsl(45_93%_47%/0.15)] text-[hsl(45,93%,47%)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };

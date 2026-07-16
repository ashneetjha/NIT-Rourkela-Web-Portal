import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "../../lib/utils.js";

export const Separator = ({ className, orientation = "horizontal" as const }: { className?: string; orientation?: "horizontal" | "vertical" }) => (
  <SeparatorPrimitive.Root
    orientation={orientation}
    className={cn(
      orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
      "bg-slate-200 dark:bg-slate-800",
      className,
    )}
  />
);

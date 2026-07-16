import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils.js";

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

export const Breadcrumbs = ({ items, className }: { items: BreadcrumbItem[]; className?: string }) => (
  <nav aria-label="Breadcrumb" className={cn("flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400", className)}>
    {items.map((item, index) => {
      const isLast = index === items.length - 1;
      return (
        <div key={`${item.label}-${index}`} className="flex items-center gap-2">
          {item.to && !isLast ? (
            <Link className="transition hover:text-slate-950 dark:hover:text-white" to={item.to}>
              {item.label}
            </Link>
          ) : (
            <span className={cn(isLast && "text-slate-950 dark:text-white")}>{item.label}</span>
          )}
          {!isLast ? <ChevronRight className="h-4 w-4" /> : null}
        </div>
      );
    })}
  </nav>
);

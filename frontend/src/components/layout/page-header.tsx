import { Button } from "../ui/button.js";
import { Breadcrumbs, type BreadcrumbItem } from "../navigation/breadcrumbs.js";

export const PageHeader = ({
  title,
  description,
  breadcrumbs,
  actionLabel,
  onAction,
}: {
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  actionLabel?: string;
  onAction?: () => void;
}) => (
  <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
    <div className="space-y-3">
      <Breadcrumbs items={breadcrumbs} />
      <div>
        <h2 className="font-display text-3xl font-bold tracking-tight text-slate-950 dark:text-white">{title}</h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-500 dark:text-slate-400">{description}</p>
      </div>
    </div>
    {actionLabel ? (
      <Button className="self-start" onClick={onAction}>
        {actionLabel}
      </Button>
    ) : null}
  </div>
);

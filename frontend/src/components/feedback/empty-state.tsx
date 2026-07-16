import { SearchX } from "lucide-react";
import { Card } from "../ui/card.js";
import { Button } from "../ui/button.js";

export const EmptyState = ({
  title,
  description,
  actionLabel,
  onAction,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) => (
  <Card className="flex min-h-64 flex-col items-center justify-center gap-4 text-center">
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-100 p-4 dark:border-slate-700 dark:bg-slate-900">
      <SearchX className="h-6 w-6 text-slate-500" />
    </div>
    <div className="max-w-sm space-y-2">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
    </div>
    {actionLabel ? (
      <Button variant="outline" onClick={onAction}>
        {actionLabel}
      </Button>
    ) : null}
  </Card>
);

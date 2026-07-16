import { Card } from "../ui/card.js";

export const StatCard = ({
  label,
  value,
  helper,
  accent,
}: {
  label: string;
  value: string;
  helper: string;
  accent?: string;
}) => (
  <Card className="relative overflow-hidden">
    <div className={`absolute inset-x-0 top-0 h-1 ${accent ?? "bg-slate-950 dark:bg-white"}`} />
    <div className="space-y-2">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
      <div className="text-3xl font-semibold tracking-tight">{value}</div>
      <p className="text-sm text-slate-500 dark:text-slate-400">{helper}</p>
    </div>
  </Card>
);

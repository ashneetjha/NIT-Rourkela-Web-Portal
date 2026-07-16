import { cn } from "../../lib/utils.js";
import { Card } from "../ui/card.js";
import { Badge } from "../ui/badge.js";

export interface TableColumn<T> {
  key: string;
  header: string;
  className?: string;
  render: (row: T) => React.ReactNode;
}

export const DataTable = <T,>({
  columns,
  rows,
  status,
}: {
  columns: TableColumn<T>[];
  rows: T[];
  status?: (row: T) => { label: string; variant?: "default" | "muted" | "success" | "warning" | "danger" } | null;
}) => (
  <Card className="overflow-hidden p-0">
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="sticky top-0 z-10 bg-white/95 backdrop-blur dark:bg-slate-950/95">
          <tr className="border-b border-slate-200 dark:border-slate-800">
            {columns.map((column) => (
              <th key={column.key} className={cn("px-5 py-4 font-medium text-slate-500 dark:text-slate-400", column.className)}>
                {column.header}
              </th>
            ))}
            {status ? <th className="px-5 py-4 font-medium text-slate-500 dark:text-slate-400">Status</th> : null}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const rowStatus = status?.(row) ?? null;
            return (
              <tr key={index} className="border-b border-slate-100 last:border-none dark:border-slate-900">
                {columns.map((column) => (
                  <td key={column.key} className={cn("px-5 py-4 align-top text-slate-700 dark:text-slate-200", column.className)}>
                    {column.render(row)}
                  </td>
                ))}
                {status ? (
                  <td className="px-5 py-4">
                    {rowStatus ? <Badge variant={rowStatus.variant}>{rowStatus.label}</Badge> : <span className="text-slate-400">-</span>}
                  </td>
                ) : null}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </Card>
);

import { useMemo, useState } from "react";
import type { QueryKey } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { Button } from "../components/ui/button.js";
import { Input } from "../components/ui/input.js";
import { EmptyState } from "../components/feedback/empty-state.js";
import { LoadingState } from "../components/feedback/loading-state.js";
import { DataTable, type TableColumn } from "../components/table/data-table.js";
import { PageHeader } from "../components/layout/page-header.js";
import { Badge } from "../components/ui/badge.js";
import { Card } from "../components/ui/card.js";
import { cn } from "../lib/utils.js";

export interface ResourcePageProps<T extends object> {
  title: string;
  description: string;
  breadcrumbs: Array<{ label: string; to?: string }>;
  queryKey: QueryKey;
  queryFn: () => Promise<{ items: T[] }>;
  columns: TableColumn<T>[];
  searchFields: Array<keyof T>;
  searchPlaceholder: string;
  status: (row: T) => { label: string; variant?: "default" | "muted" | "success" | "warning" | "danger" } | null;
  highlights?: Array<{ label: string; value: string; tone?: string }>;
  actionLabel?: string;
  onAction?: () => void;
}

export const ResourcePage = <T extends object>({
  title,
  description,
  breadcrumbs,
  queryKey,
  queryFn,
  columns,
  searchFields,
  searchPlaceholder,
  status,
  highlights,
  actionLabel,
  onAction,
}: ResourcePageProps<T>) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, isError } = useQuery({ queryKey, queryFn });

  const filteredRows = useMemo(() => {
    const rows = data?.items ?? [];
    if (!searchTerm.trim()) {
      return rows;
    }

    const term = searchTerm.toLowerCase();
    return rows.filter((row) =>
      searchFields.some((field) => String((row as Record<string, unknown>)[field as string] ?? "").toLowerCase().includes(term)),
    );
  }, [data?.items, searchFields, searchTerm]);

  return (
    <div className="space-y-6">
      <PageHeader
        title={title}
        description={description}
        breadcrumbs={breadcrumbs}
        actionLabel={actionLabel}
        onAction={onAction}
      />

      {highlights ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {highlights.map((item) => (
            <Card key={item.label} className="p-5">
              <p className="text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
              <div className={cn("mt-2 text-2xl font-semibold", item.tone)}>{item.value}</div>
            </Card>
          ))}
        </div>
      ) : null}

      <Card className="p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input className="pl-10" placeholder={searchPlaceholder} value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Badge variant="muted">{filteredRows.length} records</Badge>
            <span>Powered by secure API data</span>
          </div>
        </div>
      </Card>

      {isLoading ? <LoadingState /> : null}
      {isError ? <EmptyState title="Unable to load data" description="The backend request failed. Check the API connection and try again." /> : null}
      {!isLoading && !isError ? (
        filteredRows.length > 0 ? (
          <DataTable columns={columns} rows={filteredRows} status={status} />
        ) : (
          <EmptyState
            title="No matching records"
            description="Try a broader search or clear the filters to view all entries."
            actionLabel="Reset search"
            onAction={() => setSearchTerm("")}
          />
        )
      ) : null}
    </div>
  );
};

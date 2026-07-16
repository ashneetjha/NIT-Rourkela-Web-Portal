import { ResourcePage } from "./resource-page.js";
import { resourceFetchers } from "../services/resources.js";
import type { PanelRecord } from "../types/api.js";
import type { TableColumn } from "../components/table/data-table.js";

const columns: TableColumn<PanelRecord>[] = [
  { key: "title", header: "Panel", render: (row) => row.title },
  { key: "venue", header: "Venue", render: (row) => row.venue },
  { key: "_id", header: "Record ID", render: (row) => row._id.slice(0, 8) },
];

export const PanelsPage = () => (
  <ResourcePage<PanelRecord>
    title="Panels"
    description="Evaluation panels orchestrating the submission review process and viva schedule."
    breadcrumbs={[{ label: "Dashboard", to: "/" }, { label: "Panels" }]}
    queryKey={["panels"]}
    queryFn={resourceFetchers.panels}
    columns={columns}
    searchFields={["title", "venue", "status"]}
    searchPlaceholder="Search panels by title or venue"
    status={(row) => ({ label: row.status.toUpperCase(), variant: row.status === "completed" ? "success" : row.status === "in-review" ? "warning" : "default" })}
    highlights={[
      { label: "Panels live", value: "2", tone: "text-slate-950 dark:text-white" },
      { label: "Current state", value: "Active", tone: "text-emerald-500" },
      { label: "Rooms", value: "2", tone: "text-sky-500" },
    ]}
  />
);

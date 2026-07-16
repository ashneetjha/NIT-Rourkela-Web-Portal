import { ResourcePage } from "./resource-page.js";
import { resourceFetchers } from "../services/resources.js";
import type { MarkRecord } from "../types/api.js";
import type { TableColumn } from "../components/table/data-table.js";

const columns: TableColumn<MarkRecord>[] = [
  { key: "studentRollNumber", header: "Roll No.", render: (row) => row.studentRollNumber },
  { key: "subjectCode", header: "Subject", render: (row) => row.subjectCode },
  { key: "internal", header: "Internal", render: (row) => row.internal },
  { key: "external", header: "External", render: (row) => row.external },
  { key: "viva", header: "Viva", render: (row) => row.viva },
  { key: "total", header: "Total", render: (row) => <strong>{row.total}</strong> },
];

export const MarksPage = () => (
  <ResourcePage<MarkRecord>
    title="Marks"
    description="Submission-level marks with approval status, comments, and totals calculated from the evaluation components."
    breadcrumbs={[{ label: "Dashboard", to: "/" }, { label: "Marks" }]}
    queryKey={["marks"]}
    queryFn={resourceFetchers.marks}
    columns={columns}
    searchFields={["studentRollNumber", "subjectCode", "remarks", "status"]}
    searchPlaceholder="Search marks by roll number or subject"
    status={(row) => ({ label: row.status.toUpperCase(), variant: row.status === "approved" ? "success" : row.status === "submitted" ? "warning" : "muted" })}
    highlights={[
      { label: "Submitted", value: "6", tone: "text-emerald-500" },
      { label: "Pending", value: "2", tone: "text-amber-500" },
      { label: "Approval rate", value: "67%", tone: "text-sky-500" },
    ]}
  />
);

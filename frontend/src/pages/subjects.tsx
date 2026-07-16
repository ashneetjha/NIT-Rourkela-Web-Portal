import { ResourcePage } from "./resource-page.js";
import { resourceFetchers } from "../services/resources.js";
import type { SubjectRecord } from "../types/api.js";
import { Badge } from "../components/ui/badge.js";
import type { TableColumn } from "../components/table/data-table.js";

const columns: TableColumn<SubjectRecord>[] = [
  { key: "code", header: "Code", render: (row) => row.code },
  { key: "title", header: "Subject", render: (row) => row.title },
  { key: "semester", header: "Semester", render: (row) => row.semester },
  { key: "credits", header: "Credits", render: (row) => row.credits },
  { key: "coordinatorEmail", header: "Coordinator", render: (row) => row.coordinatorEmail },
];

export const SubjectsPage = () => (
  <ResourcePage<SubjectRecord>
    title="Subjects"
    description="Approved subjects and coordinators aligned with the current evaluation cycle."
    breadcrumbs={[{ label: "Dashboard", to: "/" }, { label: "Subjects" }]}
    queryKey={["subjects"]}
    queryFn={resourceFetchers.subjects}
    columns={columns}
    searchFields={["code", "title", "semester", "coordinatorEmail"]}
    searchPlaceholder="Search subjects by code or title"
    status={(row) => ({ label: `${row.credits} credits`, variant: row.credits >= 4 ? "warning" : "muted" })}
    highlights={[
      { label: "Core subjects", value: "4", tone: "text-slate-950 dark:text-white" },
      { label: "Semesters covered", value: "8th", tone: "text-sky-500" },
      { label: "Coordinators", value: "2", tone: "text-emerald-500" },
    ]}
  />
);

import { ResourcePage } from "./resource-page.js";
import { resourceFetchers } from "../services/resources.js";
import type { StudentRecord } from "../types/api.js";
import { Badge } from "../components/ui/badge.js";
import type { TableColumn } from "../components/table/data-table.js";
import { Avatar } from "./shared.js";

const columns: TableColumn<StudentRecord>[] = [
  { key: "rollNumber", header: "Roll No.", render: (row) => row.rollNumber },
  { key: "name", header: "Student", render: (row) => <Avatar name={row.name} subtitle={row.program} /> },
  { key: "semester", header: "Semester", render: (row) => `${row.semester} · Section ${row.section}` },
  { key: "advisor", header: "Advisor", render: (row) => row.advisor },
  { key: "attendancePercentage", header: "Attendance", render: (row) => `${row.attendancePercentage}%` },
];

export const StudentsPage = () => (
  <ResourcePage<StudentRecord>
    title="Students"
    description="Student records, academic progress, and attendance indicators for the active batch."
    breadcrumbs={[{ label: "Dashboard", to: "/" }, { label: "Students" }]}
    queryKey={["students"]}
    queryFn={resourceFetchers.students}
    columns={columns}
    searchFields={["rollNumber", "name", "program", "advisor", "section"]}
    searchPlaceholder="Search students by name or roll number"
    status={(row) => ({ label: row.status.toUpperCase(), variant: row.status === "completed" ? "success" : row.status === "pending" ? "warning" : "muted" })}
    highlights={[
      { label: "Tracked students", value: "6", tone: "text-slate-950 dark:text-white" },
      { label: "Average attendance", value: "93%", tone: "text-emerald-500" },
      { label: "Advisors", value: "2", tone: "text-sky-500" },
    ]}
  />
);

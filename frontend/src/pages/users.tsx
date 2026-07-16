import { ResourcePage } from "./resource-page.js";
import { resourceFetchers } from "../services/resources.js";
import type { UserRecord } from "../types/api.js";
import { Badge } from "../components/ui/badge.js";
import { Avatar } from "./shared.js";
import type { TableColumn } from "../components/table/data-table.js";

const columns: TableColumn<UserRecord>[] = [
  { key: "name", header: "User", render: (row) => <Avatar name={row.name} email={row.email} avatarUrl={row.avatarUrl} /> },
  { key: "email", header: "Email", render: (row) => row.email },
  { key: "department", header: "Department", render: (row) => row.department },
  { key: "role", header: "Role", render: (row) => <Badge variant="muted">{row.role}</Badge> },
];

export const UsersPage = () => (
  <ResourcePage<UserRecord>
    title="Users"
    description="Administration, coordination, and faculty access are all tracked here with JWT-backed authentication roles."
    breadcrumbs={[{ label: "Dashboard", to: "/" }, { label: "Users" }]}
    queryKey={["users"]}
    queryFn={resourceFetchers.users}
    columns={columns}
    searchFields={["name", "email", "department", "role"]}
    searchPlaceholder="Search users by name, email, or role"
    status={(row) => ({ label: row.role.toUpperCase(), variant: row.role === "admin" ? "default" : row.role === "coordinator" ? "warning" : "success" })}
    highlights={[
      { label: "Demo users", value: "3", tone: "text-slate-950 dark:text-white" },
      { label: "Admin access", value: "Enabled", tone: "text-emerald-500" },
      { label: "Role aware", value: "Yes", tone: "text-sky-500" },
    ]}
  />
);

import type {
  DashboardStats,
  ListResponse,
  LoginResponse,
  MarkRecord,
  PanelRecord,
  StudentRecord,
  SubjectRecord,
  UserRecord,
} from "../types/api.js";

const baseUrl = import.meta.env.VITE_API_BASE_URL ?? "/api";

const readToken = () => localStorage.getItem("msms.token") ?? "";

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");

  const token = readToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers,
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { message?: string; details?: unknown } | null;
    throw new Error(payload?.message ?? `Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export const api = {
  login: (email: string, password: string) =>
    request<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  dashboard: () => request<DashboardStats>("/dashboard"),
  users: () => request<ListResponse<UserRecord>>("/users"),
  students: () => request<ListResponse<StudentRecord>>("/students"),
  subjects: () => request<ListResponse<SubjectRecord>>("/subjects"),
  panels: () => request<ListResponse<PanelRecord>>("/panels"),
  marks: () => request<ListResponse<MarkRecord>>("/marks"),
  health: () => request<{ status: string }>("/health"),
  exportMarks: async () => {
    const token = readToken();
    const response = await fetch(`${baseUrl}/reports/export`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });

    if (!response.ok) {
      throw new Error("Unable to export report.");
    }

    return response.blob();
  },
  importMarks: async (file: File) => {
    const token = readToken();
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${baseUrl}/reports/import`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      body: formData,
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as { message?: string } | null;
      throw new Error(payload?.message ?? "Unable to import report.");
    }

    return response.json() as Promise<{ importedRows: number }>;
  },
};

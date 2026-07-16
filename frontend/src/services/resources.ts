import { api } from "../lib/api.js";
import type { ListResponse, MarkRecord, PanelRecord, StudentRecord, SubjectRecord, UserRecord } from "../types/api.js";

export const resourceFetchers = {
  users: () => api.users() as Promise<ListResponse<UserRecord>>,
  students: () => api.students() as Promise<ListResponse<StudentRecord>>,
  subjects: () => api.subjects() as Promise<ListResponse<SubjectRecord>>,
  panels: () => api.panels() as Promise<ListResponse<PanelRecord>>,
  marks: () => api.marks() as Promise<ListResponse<MarkRecord>>,
};

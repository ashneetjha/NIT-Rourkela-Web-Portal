export type Role = "admin" | "coordinator" | "faculty";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
  department?: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

export interface UserRecord extends AuthUser {
  department: string;
  passwordHash?: string;
  _id?: string;
}

export interface StudentRecord {
  _id: string;
  rollNumber: string;
  name: string;
  program: string;
  semester: string;
  section: string;
  advisor: string;
  attendancePercentage: number;
  status: "active" | "pending" | "completed";
}

export interface SubjectRecord {
  _id: string;
  code: string;
  title: string;
  credits: number;
  semester: string;
  coordinatorEmail: string;
}

export interface PanelRecord {
  _id: string;
  title: string;
  venue: string;
  status: "scheduled" | "in-review" | "completed";
}

export interface MarkRecord {
  _id: string;
  studentRollNumber: string;
  subjectCode: string;
  internal: number;
  external: number;
  viva: number;
  total: number;
  status: "pending" | "submitted" | "approved";
  remarks: string;
}

export interface DashboardStats {
  totals: {
    students: number;
    faculty: number;
    subjects: number;
    panels: number;
    pendingEvaluations: number;
    completedEvaluations: number;
  };
  recentMarks: MarkRecord[];
  panelStatus: Array<{ title: string; status: string }>;
  completionRate: number;
}

export interface ListResponse<T> {
  items: T[];
}

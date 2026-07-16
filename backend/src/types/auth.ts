export type Role = "admin" | "coordinator" | "faculty";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
}

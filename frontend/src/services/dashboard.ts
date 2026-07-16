import { api } from "../lib/api.js";
import type { DashboardStats } from "../types/api.js";

export const getDashboard = async (): Promise<DashboardStats> => api.dashboard();

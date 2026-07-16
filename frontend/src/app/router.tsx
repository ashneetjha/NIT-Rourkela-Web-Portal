import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "../layouts/app-shell.js";
import { ProtectedRoute } from "../components/auth/protected-route.js";
import { LoginPage } from "../pages/login.js";
import { DashboardPage } from "../pages/dashboard.js";
import { UsersPage } from "../pages/users.js";
import { SubjectsPage } from "../pages/subjects.js";
import { StudentsPage } from "../pages/students.js";
import { PanelsPage } from "../pages/panels.js";
import { MarksPage } from "../pages/marks.js";
import { ReportsPage } from "../pages/reports.js";
import { SettingsPage } from "../pages/settings.js";
import { NotFoundPage } from "../pages/not-found.js";

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppShell />}>
          <Route index element={<DashboardPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="subjects" element={<SubjectsPage />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="panels" element={<PanelsPage />} />
          <Route path="marks" element={<MarksPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

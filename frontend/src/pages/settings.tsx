import { useAuth } from "../hooks/use-auth.js";
import { useTheme } from "../hooks/use-theme.js";
import { PageHeader } from "../components/layout/page-header.js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card.js";
import { Button } from "../components/ui/button.js";

export const SettingsPage = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Portal preferences, active account metadata, and quick controls for the current session."
        breadcrumbs={[{ label: "Dashboard", to: "/" }, { label: "Settings" }]}
      />

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Authenticated profile pulled from the JWT login response.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
              <div className="text-slate-500">Name</div>
              <div className="mt-1 font-medium">{user?.name}</div>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
              <div className="text-slate-500">Email</div>
              <div className="mt-1 font-medium">{user?.email}</div>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
              <div className="text-slate-500">Role</div>
              <div className="mt-1 font-medium">{user?.role}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Theme persistence is stored locally for a polished working experience.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" onClick={toggleTheme}>
              Toggle {theme === "dark" ? "light" : "dark"} theme
            </Button>
            <Button variant="destructive" className="w-full justify-start" onClick={logout}>
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

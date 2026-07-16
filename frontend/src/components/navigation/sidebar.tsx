import { LayoutDashboard, PanelTop, School, Settings2, Shield, Users, FileText, BookOpenText, ScrollText, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "../../lib/utils.js";
import { useAuth } from "../../hooks/use-auth.js";
import { Button } from "../ui/button.js";

const navigation = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard },
  { label: "Users", to: "/users", icon: Users },
  { label: "Subjects", to: "/subjects", icon: BookOpenText },
  { label: "Students", to: "/students", icon: School },
  { label: "Panels", to: "/panels", icon: PanelTop },
  { label: "Marks", to: "/marks", icon: ScrollText },
  { label: "Reports", to: "/reports", icon: FileText },
  { label: "Settings", to: "/settings", icon: Settings2 },
];

export const Sidebar = () => {
  const { user, logout } = useAuth();

  return (
    <aside className="sticky top-0 flex h-screen w-80 flex-col border-r border-white/20 bg-white/55 p-5 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/65">
      <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white/70 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
          <Shield className="h-6 w-6" />
        </div>
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">NITR</div>
          <div className="font-display text-xl font-bold">EvalPortal</div>
        </div>
      </div>

      <div className="mt-5 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-950 to-slate-800 p-4 text-white shadow-xl dark:border-slate-800">
        <div className="text-xs uppercase tracking-[0.24em] text-slate-300">Signed in</div>
        <div className="mt-2 text-lg font-semibold">{user?.name}</div>
        <div className="text-sm text-slate-300">{user?.role} · CSE Department</div>
      </div>

      <nav className="mt-6 flex-1 space-y-2 overflow-y-auto pr-1 scrollbar-none">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                  isActive
                    ? "bg-slate-950 text-white shadow-lg shadow-slate-950/10 dark:bg-white dark:text-slate-950"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900",
                )
              }
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <Button variant="outline" className="mt-4 justify-start rounded-2xl" onClick={logout}>
        <LogOut className="h-4 w-4" />
        Logout
      </Button>
    </aside>
  );
};

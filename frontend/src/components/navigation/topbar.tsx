import { Menu, Search, Sparkles } from "lucide-react";
import { Button } from "../ui/button.js";
import { Input } from "../ui/input.js";
import { UserMenu } from "./user-menu.js";
import { useTheme } from "../../hooks/use-theme.js";

export const Topbar = ({ onMobileMenu }: { onMobileMenu: () => void }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 border-b border-white/20 bg-white/65 px-4 py-4 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/55 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" className="lg:hidden" onClick={onMobileMenu}>
            <Menu className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-slate-500">
              <Sparkles className="h-3.5 w-3.5" />
              Marks Submission Management System
            </div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
              NITR EvalPortal
            </h1>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-3 md:max-w-2xl">
          <div className="relative hidden flex-1 md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input className="pl-10" placeholder="Search students, subjects, or marks" />
          </div>
          <Button variant="outline" size="sm" onClick={toggleTheme}>
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </Button>
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown, LogOut, MoonStar, SunMedium } from "lucide-react";
import { useAuth } from "../../hooks/use-auth.js";
import { useTheme } from "../../hooks/use-theme.js";
import { cn } from "../../lib/utils.js";

export const UserMenu = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/70 px-3 py-2 text-left shadow-sm backdrop-blur transition hover:bg-white dark:border-slate-800 dark:bg-slate-950/70 dark:hover:bg-slate-900">
          <img
            alt={user?.name ?? "User avatar"}
            className="h-9 w-9 rounded-full border border-slate-200 bg-slate-100 object-cover dark:border-slate-700"
            src={user?.avatarUrl}
          />
          <div className="hidden sm:block">
            <div className="text-sm font-semibold text-slate-950 dark:text-white">{user?.name}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{user?.role}</div>
          </div>
          <ChevronDown className="h-4 w-4 text-slate-500" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={12}
          className="min-w-56 rounded-3xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-950/10 dark:border-slate-800 dark:bg-slate-950"
        >
          <DropdownMenu.Label className="px-3 py-2 text-xs uppercase tracking-[0.2em] text-slate-500">
            Signed in as {user?.email}
          </DropdownMenu.Label>
          <DropdownMenu.Separator className="my-2 h-px bg-slate-200 dark:bg-slate-800" />
          <DropdownMenu.Item
            className={cn(
              "flex cursor-pointer items-center justify-between rounded-2xl px-3 py-2 text-sm outline-none transition hover:bg-slate-100 dark:hover:bg-slate-900",
            )}
            onSelect={(event) => {
              event.preventDefault();
              toggleTheme();
            }}
          >
            <span>Theme</span>
            {theme === "dark" ? <MoonStar className="h-4 w-4" /> : <SunMedium className="h-4 w-4" />}
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="flex cursor-pointer items-center justify-between rounded-2xl px-3 py-2 text-sm outline-none transition hover:bg-rose-500/10 hover:text-rose-600"
            onSelect={(event) => {
              event.preventDefault();
              logout();
            }}
          >
            <span>Logout</span>
            <LogOut className="h-4 w-4" />
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

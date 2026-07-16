import { useState } from "react";
import { Outlet } from "react-router-dom";
import { MobileMenu } from "../components/navigation/mobile-menu.js";
import { Sidebar } from "../components/navigation/sidebar.js";
import { Topbar } from "../components/navigation/topbar.js";

export const AppShell = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen lg:flex">
      <Sidebar />
      <MobileMenu open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} />
      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar onMobileMenu={() => setMobileMenuOpen(true)} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

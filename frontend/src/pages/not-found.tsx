import { Link } from "react-router-dom";
import { Button } from "../components/ui/button.js";

export const NotFoundPage = () => (
  <div className="flex min-h-screen items-center justify-center p-6 text-center">
    <div className="max-w-xl space-y-6">
      <div className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">404</div>
      <h1 className="font-display text-4xl font-bold tracking-tight">Page not found</h1>
      <p className="text-slate-500">The route does not exist. Return to the dashboard to continue working in the portal.</p>
      <Button asChild>
        <Link to="/">Go to dashboard</Link>
      </Button>
    </div>
  </div>
);

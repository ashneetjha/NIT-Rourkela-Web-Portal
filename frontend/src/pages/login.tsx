import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { toast } from "sonner";
import { useAuth } from "../hooks/use-auth.js";
import { Button } from "../components/ui/button.js";
import { Input } from "../components/ui/input.js";
import { Card, CardContent } from "../components/ui/card.js";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginForm = z.infer<typeof schema>;

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "admin@nitr.edu",
      password: "Password123!",
    },
  });

  const onSubmit = async (values: LoginForm) => {
    setIsSubmitting(true);
    try {
      await login(values.email, values.password);
      navigate("/");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.16),transparent_22%),linear-gradient(180deg,rgba(248,250,252,1),rgba(241,245,249,1))] dark:bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.22),transparent_28%),radial-gradient(circle_at_top_right,rgba(99,102,241,0.2),transparent_22%),linear-gradient(180deg,rgba(2,6,23,1),rgba(15,23,42,1))]" />
      <div className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }} className="space-y-6 text-slate-950 dark:text-white">
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 backdrop-blur dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300">
            NIT Rourkela · Department of CSE
          </div>
          <div className="space-y-4">
            <h1 className="font-display text-5xl font-bold tracking-tight sm:text-6xl">NITR EvalPortal</h1>
            <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-300">
              A production-grade marks submission and evaluation workspace for faculty, coordinators, and administrators.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["JWT auth", "Secure login + protected routes"],
              ["Mongo-ready", "Atlas compatible data layer"],
              ["Responsive UI", "Desktop and mobile shell"],
            ].map(([title, text]) => (
              <Card key={title} className="p-5">
                <div className="text-sm font-semibold text-slate-950 dark:text-white">{title}</div>
                <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">{text}</div>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }} className="relative">
          <div className="absolute inset-0 -z-10 rounded-4xl bg-linear-to-br from-sky-500/20 via-cyan-400/10 to-transparent blur-3xl" />
          <Card className="border-white/50 p-7 shadow-[0_30px_100px_-35px_rgba(15,23,42,0.45)] dark:border-white/10">
            <div className="space-y-2">
              <div className="text-sm uppercase tracking-[0.28em] text-slate-500">Secure Access</div>
              <h2 className="font-display text-3xl font-bold tracking-tight">Sign in to continue</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Use one of the demo accounts below to explore the portal.</p>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="mb-2 block text-sm font-medium">Email</label>
                <Input {...register("email")} autoComplete="email" placeholder="admin@nitr.edu" />
                {errors.email ? <p className="mt-2 text-sm text-rose-500">{errors.email.message}</p> : null}
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Password</label>
                <Input {...register("password")} type="password" autoComplete="current-password" placeholder="Password123!" />
                {errors.password ? <p className="mt-2 text-sm text-rose-500">{errors.password.message}</p> : null}
              </div>
              <Button className="w-full" disabled={isSubmitting} type="submit">
                {isSubmitting ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <div className="mt-6 rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm dark:border-slate-800 dark:bg-slate-900/60">
              <div className="mb-3 font-semibold text-slate-950 dark:text-white">Demo credentials</div>
              <div className="space-y-2 text-slate-600 dark:text-slate-300">
                <div>Admin: admin@nitr.edu / Password123!</div>
                <div>Coordinator: coordinator@nitr.edu / Password123!</div>
                <div>Faculty: faculty@nitr.edu / Password123!</div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

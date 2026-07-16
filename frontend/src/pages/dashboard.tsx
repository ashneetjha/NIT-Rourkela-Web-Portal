import { useQuery } from "@tanstack/react-query";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AlertCircle, CheckCircle2, GraduationCap, Layers3 } from "lucide-react";
import { getDashboard } from "../services/dashboard.js";
import { StatCard } from "../components/navigation/stat-card.js";
import { PageHeader } from "../components/layout/page-header.js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card.js";
import { LoadingState } from "../components/feedback/loading-state.js";
import { EmptyState } from "../components/feedback/empty-state.js";
import { Badge } from "../components/ui/badge.js";
import { cn } from "../lib/utils.js";

const pieColors = ["#0f172a", "#2563eb", "#7c3aed", "#14b8a6"];

export const DashboardPage = () => {
  const { data, isLoading, isError } = useQuery({ queryKey: ["dashboard"], queryFn: getDashboard });

  if (isLoading) {
    return <LoadingState rows={6} />;
  }

  if (isError || !data) {
    return <EmptyState title="Dashboard unavailable" description="The secure API could not be reached. Ensure the backend is running and refresh the page." />;
  }

  const pieData = [
    { name: "Completed", value: data.totals.completedEvaluations },
    { name: "Pending", value: data.totals.pendingEvaluations },
  ];

  const panelData = data.panelStatus.map((panel) => ({
    name: panel.title.replace("Project Evaluation ", ""),
    value: panel.status === "completed" ? 100 : panel.status === "in-review" ? 60 : 30,
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="A live overview of submissions, panels, faculty engagement, and evaluation progress across the department."
        breadcrumbs={[{ label: "Dashboard" }]}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Total Students" value={String(data.totals.students)} helper="Active and monitored students" accent="bg-sky-500" />
        <StatCard label="Faculty" value={String(data.totals.faculty)} helper="Assigned evaluators and supervisors" accent="bg-emerald-500" />
        <StatCard label="Subjects" value={String(data.totals.subjects)} helper="Tracked academic subjects" accent="bg-violet-500" />
        <StatCard label="Panels" value={String(data.totals.panels)} helper="Scheduled evaluation panels" accent="bg-amber-500" />
        <StatCard label="Pending Evaluations" value={String(data.totals.pendingEvaluations)} helper="Awaiting faculty confirmation" accent="bg-rose-500" />
        <StatCard label="Completed Evaluations" value={String(data.totals.completedEvaluations)} helper="Locked and published marks" accent="bg-cyan-500" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Evaluation progress</CardTitle>
            <CardDescription>Pending versus completed evaluations with a live completion rate.</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={panelData} margin={{ left: 8, right: 8 }}>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="rgba(148,163,184,0.18)" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: "rgba(148,163,184,0.08)" }} />
                <Bar dataKey="value" radius={[12, 12, 0, 0]} fill="#0f172a" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completion mix</CardTitle>
            <CardDescription>Approval rate across the current evaluation cycle.</CardDescription>
          </CardHeader>
          <CardContent className="flex h-80 flex-col justify-between gap-4">
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" paddingAngle={4}>
                    {pieData.map((entry, index) => (
                      <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/70">
              <div>
                <div className="text-sm text-slate-500">Completion rate</div>
                <div className="text-2xl font-semibold">{data.completionRate}%</div>
              </div>
              <Badge variant={data.completionRate > 60 ? "success" : "warning"}>{data.completionRate > 60 ? "Healthy" : "Needs attention"}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Recent marks</CardTitle>
            <CardDescription>Latest submissions pulled from the API.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.recentMarks.map((mark) => (
              <div key={mark._id} className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-800">
                <div>
                  <div className="font-medium text-slate-950 dark:text-white">{mark.studentRollNumber}</div>
                  <div className="text-sm text-slate-500">{mark.subjectCode}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-slate-950 dark:text-white">{mark.total}/100</div>
                  <div className="text-xs text-slate-500">{mark.status}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Operational snapshot</CardTitle>
            <CardDescription>Key workflow cues for the department team.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: AlertCircle, label: "Pending reviews", value: data.totals.pendingEvaluations, tone: "text-rose-500" },
              { icon: CheckCircle2, label: "Completed", value: data.totals.completedEvaluations, tone: "text-emerald-500" },
              { icon: GraduationCap, label: "Students tracked", value: data.totals.students, tone: "text-sky-500" },
              { icon: Layers3, label: "Panels active", value: data.totals.panels, tone: "text-violet-500" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/70">
                  <Icon className={cn("h-5 w-5", item.tone)} />
                  <div className="mt-6 text-3xl font-semibold">{item.value}</div>
                  <div className="mt-1 text-sm text-slate-500">{item.label}</div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

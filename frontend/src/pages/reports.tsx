import { useRef, useState } from "react";
import { Download, FileUp, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api.js";
import { PageHeader } from "../components/layout/page-header.js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card.js";
import { Button } from "../components/ui/button.js";
import { LoadingState } from "../components/feedback/loading-state.js";
import { EmptyState } from "../components/feedback/empty-state.js";

export const ReportsPage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const { data, isLoading, isError } = useQuery({ queryKey: ["marks"], queryFn: api.marks });

  const exportReport = async () => {
    setBusy(true);
    try {
      const blob = await api.exportMarks();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "msms-marks-report.xlsx";
      anchor.click();
      URL.revokeObjectURL(url);
      toast.success("Marks report exported.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to export report");
    } finally {
      setBusy(false);
    }
  };

  const importReport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setBusy(true);
    try {
      const result = await api.importMarks(file);
      toast.success(`Imported ${result.importedRows} rows.`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to import report");
    } finally {
      setBusy(false);
      event.target.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Export and import the evaluation dataset in spreadsheet form for audit and archival workflows."
        breadcrumbs={[{ label: "Dashboard", to: "/" }, { label: "Reports" }]}
      />

      {isLoading ? <LoadingState rows={3} /> : null}
      {isError ? <EmptyState title="Reports unavailable" description="The secure API returned an error while loading the marks dataset." /> : null}

      {!isLoading && !isError && data ? (
        <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
          <Card>
            <CardHeader>
              <CardTitle>Report tools</CardTitle>
              <CardDescription>Excel-based workflows powered by xlsx and multer on the backend.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" disabled={busy} onClick={exportReport}>
                <Download className="h-4 w-4" />
                Export marks workbook
              </Button>
              <Button className="w-full justify-start" variant="outline" disabled={busy} onClick={() => fileInputRef.current?.click()}>
                <FileUp className="h-4 w-4" />
                Import workbook
              </Button>
              <input ref={fileInputRef} accept=".xlsx,.xls" className="hidden" type="file" onChange={importReport} />
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
                Upload an Excel sheet to validate incoming marks data. The backend parses the first worksheet and returns the row count.
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current workbook snapshot</CardTitle>
              <CardDescription>A lightweight preview of the rows currently in the system.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.items.map((mark) => (
                <div key={mark._id} className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-800">
                  <div>
                    <div className="font-medium">{mark.studentRollNumber}</div>
                    <div className="text-sm text-slate-500">{mark.subjectCode}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{mark.total}</div>
                    <div className="text-xs text-slate-500">{mark.status}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  );
};

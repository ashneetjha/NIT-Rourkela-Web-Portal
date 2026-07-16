import type { Request, Response } from "express";
import multer from "multer";
import xlsx from "xlsx";
import { buildMarksWorkbook, parseMarksWorkbook } from "../services/reportService.js";

const upload = multer({ storage: multer.memoryStorage() });

export const uploadSingleReport = upload.single("file");

export const exportMarksReport = async (_req: Request, res: Response) => {
  const workbook = await buildMarksWorkbook();
  const fileBuffer = xlsx.write(workbook, { bookType: "xlsx", type: "buffer" });

  res
    .setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    .setHeader("Content-Disposition", 'attachment; filename="msms-marks-report.xlsx"')
    .send(fileBuffer);
};

export const importMarksReport = async (req: Request, res: Response) => {
  if (!req.file?.buffer) {
    res.status(400).json({ message: "A spreadsheet file is required." });
    return;
  }

  const rows = parseMarksWorkbook(req.file.buffer);
  res.json({ importedRows: rows.length });
};

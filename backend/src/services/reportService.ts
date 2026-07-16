import xlsx from "xlsx";
import { getMarks, getStudents, getSubjects } from "../data/store.js";

export const buildMarksWorkbook = async () => {
  const [marks, students, subjects] = await Promise.all([getMarks(), getStudents(), getSubjects()]);
  const studentMap = new Map(students.map((student) => [student.rollNumber, student]));
  const subjectMap = new Map(subjects.map((subject) => [subject.code, subject]));

  const rows = marks.map((mark) => ({
    RollNumber: mark.studentRollNumber,
    Student: studentMap.get(mark.studentRollNumber)?.name ?? mark.studentRollNumber,
    Subject: subjectMap.get(mark.subjectCode)?.title ?? mark.subjectCode,
    Internal: mark.internal,
    External: mark.external,
    Viva: mark.viva,
    Total: mark.total,
    Status: mark.status,
    Remarks: mark.remarks,
  }));

  const worksheet = xlsx.utils.json_to_sheet(rows);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, "Marks");
  return workbook;
};

export const parseMarksWorkbook = (buffer: Buffer) => {
  const workbook = xlsx.read(buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) {
    return [];
  }

  const worksheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json<Record<string, unknown>>(worksheet);
};

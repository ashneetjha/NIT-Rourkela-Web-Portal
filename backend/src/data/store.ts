import { Types } from "mongoose";
import { comparePassword, hashPassword } from "../utils/password.js";
import { demoMarks, demoPanels, demoStudents, demoSubjects, demoUsers } from "./demoData.js";
import { StudentModel } from "../models/Student.js";
import { SubjectModel } from "../models/Subject.js";
import { PanelModel } from "../models/Panel.js";
import { MarkModel } from "../models/Mark.js";
import { UserModel } from "../models/User.js";
import { isDatabaseConnected } from "../config/database.js";
import type { AuthUser, Role } from "../types/auth.js";

export interface UserRecord extends AuthUser {
  passwordHash: string;
  department: string;
}

export interface StudentRecord {
  _id: string;
  rollNumber: string;
  name: string;
  program: string;
  semester: string;
  section: string;
  advisor: string;
  attendancePercentage: number;
  status: "active" | "pending" | "completed";
}

export interface SubjectRecord {
  _id: string;
  code: string;
  title: string;
  credits: number;
  semester: string;
  coordinatorEmail: string;
}

export interface PanelRecord {
  _id: string;
  title: string;
  venue: string;
  status: "scheduled" | "in-review" | "completed";
}

export interface MarkRecord {
  _id: string;
  studentRollNumber: string;
  subjectCode: string;
  internal: number;
  external: number;
  viva: number;
  total: number;
  status: "pending" | "submitted" | "approved";
  remarks: string;
}

interface RuntimeStore {
  users: UserRecord[];
  students: StudentRecord[];
  subjects: SubjectRecord[];
  panels: PanelRecord[];
  marks: MarkRecord[];
}

const createObjectId = () => new Types.ObjectId().toString();

let store: RuntimeStore = {
  users: [],
  students: [],
  subjects: [],
  panels: [],
  marks: [],
};

const toTotal = (entry: Pick<MarkRecord, "internal" | "external" | "viva">) => entry.internal + entry.external + entry.viva;

const normalizeId = (value: unknown) => String(value ?? createObjectId());

const normalizeUser = (record: any): UserRecord => ({
  id: String(record.id ?? normalizeId(record._id)),
  name: String(record.name),
  email: String(record.email),
  role: record.role,
  avatarUrl: String(record.avatarUrl),
  department: String(record.department),
  passwordHash: String(record.passwordHash),
});

const normalizeStudent = (record: any): StudentRecord => ({
  _id: normalizeId(record._id),
  rollNumber: String(record.rollNumber),
  name: String(record.name),
  program: String(record.program),
  semester: String(record.semester),
  section: String(record.section),
  advisor: String(record.advisor),
  attendancePercentage: Number(record.attendancePercentage),
  status: record.status,
});

const normalizeSubject = (record: any): SubjectRecord => ({
  _id: normalizeId(record._id),
  code: String(record.code),
  title: String(record.title),
  credits: Number(record.credits),
  semester: String(record.semester),
  coordinatorEmail: String(record.coordinatorEmail),
});

const normalizePanel = (record: any): PanelRecord => ({
  _id: normalizeId(record._id),
  title: String(record.title),
  venue: String(record.venue),
  status: record.status,
});

const normalizeMark = (record: any): MarkRecord => ({
  _id: normalizeId(record._id),
  studentRollNumber: String(record.studentRollNumber),
  subjectCode: String(record.subjectCode),
  internal: Number(record.internal),
  external: Number(record.external),
  viva: Number(record.viva),
  total: Number(record.total ?? Number(record.internal) + Number(record.external) + Number(record.viva)),
  status: record.status,
  remarks: String(record.remarks),
});

export const initializeSeedData = async () => {
  const users = await Promise.all(
    demoUsers.map(async (user) => {
      const id = createObjectId();
      return {
        _id: id,
        id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl,
        department: user.department,
        passwordHash: await hashPassword(user.password),
      };
    }),
  );

  const userByEmail = new Map(users.map((user) => [user.email, user]));

  store = {
    users,
    students: demoStudents.map((student) => ({ _id: createObjectId(), ...student })),
    subjects: demoSubjects.map((subject) => ({ _id: createObjectId(), ...subject })),
    panels: demoPanels.map((panel) => ({ _id: createObjectId(), ...panel })),
    marks: demoMarks.map((mark) => ({ _id: createObjectId(), ...mark, total: toTotal(mark) })),
  };

  return userByEmail;
};

export const syncToMongo = async () => {
  if (!isDatabaseConnected()) {
    return;
  }

  const userCount = await UserModel.countDocuments();
  if (userCount === 0) {
    await UserModel.insertMany(store.users);
    await StudentModel.insertMany(store.students);
    await SubjectModel.insertMany(store.subjects);
    await PanelModel.insertMany(store.panels);
    await MarkModel.insertMany(store.marks);
  }
};

export const getUsers = async () => {
  if (isDatabaseConnected() && (await UserModel.exists({}))) {
    const records = await UserModel.find().lean();
    return records.map((record) => {
      const normalized = normalizeUser(record);
      const { passwordHash: _passwordHash, ...publicUser } = normalized;
      return publicUser;
    });
  }

  return store.users.map(({ passwordHash, ...rest }) => rest);
};

export const getRawUsers = async () => {
  if (isDatabaseConnected() && (await UserModel.exists({}))) {
    const records = await UserModel.find().lean();
    return records.map(normalizeUser);
  }

  return store.users;
};

export const getUserByEmail = async (email: string) => {
  if (isDatabaseConnected() && (await UserModel.exists({}))) {
    const record = await UserModel.findOne({ email }).lean();
    return record ? normalizeUser(record) : null;
  }

  return store.users.find((user) => user.email === email) ?? null;
};

export const getUsersByRole = async (role: Role) => {
  const users = await getUsers();
  return users.filter((user) => user.role === role);
};

export const authenticateLocalUser = async (email: string, password: string) => {
  const user = await getUserByEmail(email);
  if (!user) {
    return null;
  }

  const hash = "passwordHash" in user ? user.passwordHash : undefined;
  if (!hash) {
    return null;
  }

  const isValid = await comparePassword(password, hash);
  if (!isValid) {
    return null;
  }

  return user;
};

export const getStudents = async () => {
  if (isDatabaseConnected() && (await StudentModel.exists({}))) {
    const records = await StudentModel.find().lean();
    return records.map(normalizeStudent);
  }
  return store.students.map(normalizeStudent);
};

export const getSubjects = async () => {
  if (isDatabaseConnected() && (await SubjectModel.exists({}))) {
    const records = await SubjectModel.find().lean();
    return records.map(normalizeSubject);
  }
  return store.subjects.map(normalizeSubject);
};

export const getPanels = async () => {
  if (isDatabaseConnected() && (await PanelModel.exists({}))) {
    const records = await PanelModel.find().lean();
    return records.map(normalizePanel);
  }
  return store.panels.map(normalizePanel);
};

export const getMarks = async () => {
  if (isDatabaseConnected() && (await MarkModel.exists({}))) {
    const records = await MarkModel.find().lean();
    return records.map(normalizeMark);
  }
  return store.marks.map(normalizeMark);
};

export const getDashboardStats = async () => {
  const [users, students, subjects, panels, marks] = await Promise.all([
    getUsers(),
    getStudents(),
    getSubjects(),
    getPanels(),
    getMarks(),
  ]);

  const pendingEvaluations = marks.filter((mark) => mark.status !== "approved").length;
  const completedEvaluations = marks.filter((mark) => mark.status === "approved").length;

  return {
    totals: {
      students: students.length,
      faculty: users.filter((user) => user.role === "faculty").length,
      subjects: subjects.length,
      panels: panels.length,
      pendingEvaluations,
      completedEvaluations,
    },
    recentMarks: marks.slice(0, 5),
    panelStatus: panels.map((panel) => ({ title: panel.title, status: panel.status })),
    completionRate: Math.round((completedEvaluations / Math.max(marks.length, 1)) * 100),
  };
};

export const replaceStore = (partial: Partial<RuntimeStore>) => {
  store = { ...store, ...partial };
};

export const exportSeedSnapshot = () => store;

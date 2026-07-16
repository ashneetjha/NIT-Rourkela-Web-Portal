import type { Role } from "../types/auth.js";

export interface DemoUserSeed {
  name: string;
  email: string;
  role: Role;
  department: string;
  password: string;
  avatarUrl: string;
}

export interface DemoStudentSeed {
  rollNumber: string;
  name: string;
  program: string;
  semester: string;
  section: string;
  advisor: string;
  attendancePercentage: number;
  status: "active" | "pending" | "completed";
}

export interface DemoSubjectSeed {
  code: string;
  title: string;
  credits: number;
  semester: string;
  coordinatorEmail: string;
}

export interface DemoPanelSeed {
  title: string;
  venue: string;
  status: "scheduled" | "in-review" | "completed";
}

export interface DemoMarkSeed {
  studentRollNumber: string;
  subjectCode: string;
  internal: number;
  external: number;
  viva: number;
  status: "pending" | "submitted" | "approved";
  remarks: string;
}

export const demoUsers: DemoUserSeed[] = [
  {
    name: "Dr. Ananya Patel",
    email: "admin@nitr.edu",
    role: "admin",
    department: "Computer Science and Engineering",
    password: "Password123!",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Ananya%20Patel",
  },
  {
    name: "Prof. Rohan Das",
    email: "coordinator@nitr.edu",
    role: "coordinator",
    department: "Computer Science and Engineering",
    password: "Password123!",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Rohan%20Das",
  },
  {
    name: "Prof. Meera Iyer",
    email: "faculty@nitr.edu",
    role: "faculty",
    department: "Computer Science and Engineering",
    password: "Password123!",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Meera%20Iyer",
  },
];

export const demoStudents: DemoStudentSeed[] = [
  {
    rollNumber: "22CS1001",
    name: "Aarav Mishra",
    program: "B.Tech CSE",
    semester: "8th",
    section: "A",
    advisor: "Prof. Meera Iyer",
    attendancePercentage: 96,
    status: "active",
  },
  {
    rollNumber: "22CS1002",
    name: "Ishita Sahu",
    program: "B.Tech CSE",
    semester: "8th",
    section: "A",
    advisor: "Prof. Meera Iyer",
    attendancePercentage: 94,
    status: "active",
  },
  {
    rollNumber: "22CS1003",
    name: "Kabir Singh",
    program: "B.Tech CSE",
    semester: "8th",
    section: "B",
    advisor: "Prof. Rohan Das",
    attendancePercentage: 89,
    status: "pending",
  },
  {
    rollNumber: "22CS1004",
    name: "Diya Bose",
    program: "B.Tech CSE",
    semester: "8th",
    section: "B",
    advisor: "Prof. Rohan Das",
    attendancePercentage: 97,
    status: "completed",
  },
  {
    rollNumber: "22CS1005",
    name: "Nikhil Verma",
    program: "B.Tech CSE",
    semester: "8th",
    section: "A",
    advisor: "Prof. Meera Iyer",
    attendancePercentage: 92,
    status: "active",
  },
  {
    rollNumber: "22CS1006",
    name: "Sana Khan",
    program: "B.Tech CSE",
    semester: "8th",
    section: "C",
    advisor: "Prof. Rohan Das",
    attendancePercentage: 91,
    status: "active",
  },
];

export const demoSubjects: DemoSubjectSeed[] = [
  {
    code: "CS801",
    title: "Software Engineering",
    credits: 3,
    semester: "8th",
    coordinatorEmail: "coordinator@nitr.edu",
  },
  {
    code: "CS802",
    title: "Cloud Computing",
    credits: 4,
    semester: "8th",
    coordinatorEmail: "faculty@nitr.edu",
  },
  {
    code: "CS803",
    title: "Machine Learning",
    credits: 4,
    semester: "8th",
    coordinatorEmail: "faculty@nitr.edu",
  },
  {
    code: "CS804",
    title: "Operating Systems",
    credits: 3,
    semester: "8th",
    coordinatorEmail: "coordinator@nitr.edu",
  },
];

export const demoPanels: DemoPanelSeed[] = [
  {
    title: "Project Evaluation Panel A",
    venue: "CS Seminar Hall 1",
    status: "scheduled",
  },
  {
    title: "Project Evaluation Panel B",
    venue: "CS Seminar Hall 2",
    status: "in-review",
  },
];

export const demoMarks: DemoMarkSeed[] = [
  {
    studentRollNumber: "22CS1001",
    subjectCode: "CS801",
    internal: 27,
    external: 34,
    viva: 18,
    status: "approved",
    remarks: "Excellent structure and documentation",
  },
  {
    studentRollNumber: "22CS1002",
    subjectCode: "CS801",
    internal: 25,
    external: 30,
    viva: 17,
    status: "submitted",
    remarks: "Minor formatting gaps in the report",
  },
  {
    studentRollNumber: "22CS1003",
    subjectCode: "CS802",
    internal: 24,
    external: 28,
    viva: 16,
    status: "pending",
    remarks: "Awaiting faculty review",
  },
  {
    studentRollNumber: "22CS1004",
    subjectCode: "CS803",
    internal: 29,
    external: 35,
    viva: 19,
    status: "approved",
    remarks: "Strong experimental results",
  },
  {
    studentRollNumber: "22CS1005",
    subjectCode: "CS804",
    internal: 26,
    external: 31,
    viva: 17,
    status: "submitted",
    remarks: "Good grasp of operating system concepts",
  },
  {
    studentRollNumber: "22CS1006",
    subjectCode: "CS803",
    internal: 23,
    external: 29,
    viva: 15,
    status: "pending",
    remarks: "Needs follow-up on model evaluation",
  },
];

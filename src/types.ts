export interface Subject {
  code: string;
  name: string;
  professor: string;
  room: string;
  schedule: string;
  dayOfWeek: string;
  grade: number | null;
  attendance: number;
}

export interface Course {
  id: string;
  name: string;
  degree: string;
  currentSemester: number;
  totalSemesters: number;
  shift: string;
  campus: string;
  status: 'Matriculado' | 'Trancado' | 'Formado';
  ira: number;
  completedHours: number;
  totalHours: number;
  subjects: Subject[];
}

export interface StudentCard {
  codeDNE: string;
  validUntil: string;
  issueDate: string;
  qrPayload: string;
  barcode: string;
  status: 'VÁLIDA' | 'PENDENTE' | 'EXPIRADA';
  entidadeEmissora: string;
  nationalIdDoc: string;
  certNumber: string;
}

export interface Student {
  id: string;
  name: string;
  ra: string;
  cpf: string;
  email: string;
  birthDate: string;
  avatar: string;
  university: string;
  universityShort: string;
  campus: string;
  course: Course;
  card: StudentCard;
}

export type TabType = 'home' | 'course' | 'schedule' | 'card' | 'profile';

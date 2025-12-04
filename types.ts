
export enum UserRole {
  STUDENT = 'STUDENT',
  FACULTY = 'FACULTY',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  xp?: number;
  level?: number;
  badges?: string[];
  // New Profile Details
  class?: string;
  semester?: number;
  regNo?: string;
  marksHistory?: { sem: string; gpa: number }[];
}

export interface StudentSummary {
  id: string;
  name: string;
  avatar: string;
  rollNo: string;
  attendance: number; // percentage
  gpa: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  lastActive: string;
  email: string;
  class: string;
  marksHistory: { sem: string; gpa: number }[];
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  videoUrl: string; // YouTube embed ID or URL
  notes: string;
  completed: boolean;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  instructor: string;
  progress: number; // 0-100
  thumbnail: string;
  tags: string[];
  description: string;
  units: Unit[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string; // The text of the correct option
}

export interface QuizResult {
  score: number;
  total: number;
  masteryLevel: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  COURSE_DETAIL = 'COURSE_DETAIL',
  UNIT_DETAIL = 'UNIT_DETAIL',
  AI_TUTOR = 'AI_TUTOR',
  ANALYTICS = 'ANALYTICS'
}

/**
 * Data models for Course Manager application
 * Updated with full type definitions for all features
 */

export interface Assignment {
  id: number;
  courseId: number;
  name: string;
  dueDate: string;
  category: 'homework' | 'quiz' | 'exam' | 'project' | 'participation';
  pointsEarned: number | null;
  pointsPossible: number;
  weight: number; // percentage weight in final grade
  status: 'pending' | 'submitted' | 'graded' | 'overdue';
  description?: string;
}

export interface Resource {
  id: number;
  name: string;
  url: string;
  type: 'syllabus' | 'textbook' | 'notes' | 'video' | 'other';
}

export interface Course {
  id: number;
  name: string;
  code: string;
  semester: string;
  instructor: string;
  credits: number;
  targetGrade: number; // percentage
  currentGrade: number | null; // calculated from assignments
  color?: string; // for visual distinction
  assignments: Assignment[];
  resources: Resource[];
  updated: string; // last modified date
}

export interface Semester {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  isCurrent: boolean; // indicates current active semester
  targetGPA: number;
  currentGPA: number | null; // calculated from courses
  gpa: number; // actual GPA
  courseCount: number;
  totalCredits: number;
}

export interface Notification {
  id: number;
  type: 'assignment' | 'grade' | 'deadline' | 'alert' | 'success' | 'info';
  title: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
  courseId?: number;
  assignmentId?: number;
  createdAt: string;
  read: boolean;
  actionLink?: string;
  actionText?: string;
  actionParams?: any;
}

export interface Stats {
  total: number;
  categories: number;
  latest: number;
}

export type Role = 'admin' | 'principal' | 'teacher' | 'parent';

export interface School {
  id: string;
  name: string;
  code: string;
  city: string;
  district: string;
  state: string;
  board: string;
  rating: number;
  students: number;
  teachers: number;
  classes: string;
  logoColor: string;
  logoInitials: string;
  status: 'approved' | 'pending';
}

export interface SubjectScore {
  subject: string;
  current: number;
  previous: number;
  predicted: number;
  trend: 'up' | 'down' | 'flat';
  status: 'weak' | 'average' | 'strong';
}

export interface AttendancePoint {
  label: string;
  value: number;
}

export interface RiskFactor {
  label: string;
  level: 'low' | 'medium' | 'high';
}

export interface StudyPlanDay {
  day: string;
  slots: { time: string; subject: string; focus: string; priority: 'high' | 'medium' | 'low' }[];
}

export interface CareerMatch {
  role: string;
  match: number;
  tags: string[];
}

export interface RoadmapStep {
  phase: string;
  items: string[];
  done: boolean;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  time: string;
  type: 'absence' | 'homework' | 'marks' | 'fee' | 'announcement' | 'ptm';
  read: boolean;
}

export interface ChatMessage {
  id: string;
  from: 'user' | 'ai';
  text: string;
  time: string;
}

export interface Student {
  id: string;
  name: string;
  rollNo: string;
  className: string;
  section: string;
  branch: string;
  avatarColor: string;
  initials: string;
  attendance: number;
  cgpa: number;
  assignments: number;
  projects: number;
  participation: number;
  riskScore: number;
  riskLevel: 'Normal' | 'Needs Attention' | 'At Risk' | 'Critical';
  attendanceTrend: AttendancePoint[];
  subjects: SubjectScore[];
  riskFactors: RiskFactor[];
  studyPlan: StudyPlanDay[];
  careers: CareerMatch[];
  roadmap: RoadmapStep[];
  achievements: { title: string; type: string; date: string }[];
  skills: { name: string; level: number }[];
  fee: { total: number; paid: number; due: string };
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  classes: string[];
  attendance: number;
  classesCompleted: number;
  homeworkAssigned: number;
  marksEntered: number;
  pending: number;
  status: 'active' | 'on-leave' | 'review';
  initials: string;
  color: string;
}

export interface Complaint {
  id: string;
  category: string;
  subject: string;
  raisedBy: string;
  date: string;
  status: 'Submitted' | 'Under Review' | 'In Progress' | 'Resolved' | 'Closed';
}

export interface TimetableSlot {
  day: string;
  periods: { time: string; subject: string; teacher: string; room: string; color: string }[];
}

export interface HomeworkItem {
  id: string;
  subject: string;
  title: string;
  due: string;
  status: 'pending' | 'submitted' | 'evaluated';
  color: string;
}

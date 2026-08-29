export const TOKEN_KEY = 'eduvision_token';
export const USER_KEY = 'eduvision_user';

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem(TOKEN_KEY);
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> | undefined),
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(path, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(data.error || 'Request failed', res.status);
  return data as T;
}

export type AuthUser = {
  name: string;
  email: string;
  role: 'admin' | 'principal' | 'teacher' | 'parent';
  schoolId: string;
  studentIds: string[];
  initials: string;
  color: string;
  title: string;
};

export const api = {
  health: () => request<{ ok: boolean; database: string; status: string }>('/api/health'),
  schools: () => request<import('@/types').School[]>('/api/schools'),
  registerSchool: (body: Record<string, string | number>) =>
    request('/api/schools', { method: 'POST', body: JSON.stringify(body) }),
  login: (body: { email: string; password: string; role: string; schoolCode: string }) =>
    request<{ token: string; user: AuthUser }>('/api/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  me: () => request<AuthUser>('/api/me'),
  bootstrap: () => request<Bootstrap>('/api/bootstrap'),
  approveSchool: (id: string, status: 'approved' | 'pending') =>
    request(`/api/schools/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  addHomework: (body: { subject: string; title: string; due: string }) =>
    request('/api/homework', { method: 'POST', body: JSON.stringify(body) }),
  updateComplaint: (id: string, status: string) =>
    request(`/api/complaints/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  markNotificationRead: (id: string) => request(`/api/notifications/${id}/read`, { method: 'PATCH' }),
  sendMessage: (text: string) => request('/api/messages', { method: 'POST', body: JSON.stringify({ text }) }),
  saveAttendance: (records: Record<string, boolean>) =>
    request('/api/attendance', { method: 'POST', body: JSON.stringify({ records }) }),
};

export type Bootstrap = {
  schools: import('@/types').School[];
  students: import('@/types').Student[];
  teachers: import('@/types').Teacher[];
  complaints: import('@/types').Complaint[];
  notifications: import('@/types').Notification[];
  homework: import('@/types').HomeworkItem[];
  timetable: import('@/types').TimetableSlot[];
  messages: { from: 'teacher' | 'parent'; text: string; time: string }[];
};

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { api, TOKEN_KEY, USER_KEY, type AuthUser, type Bootstrap } from '@/lib/api';
import type { Complaint, HomeworkItem, Notification, School, Student, Teacher, TimetableSlot } from '@/types';

const empty: Bootstrap = {
  schools: [],
  students: [],
  teachers: [],
  complaints: [],
  notifications: [],
  homework: [],
  timetable: [],
  messages: [],
};

interface AppCtx {
  user: AuthUser | null;
  dbStatus: 'unknown' | 'connected' | 'offline';
  loading: boolean;
  schools: School[];
  students: Student[];
  teachers: Teacher[];
  complaints: Complaint[];
  notifications: Notification[];
  homework: HomeworkItem[];
  timetable: TimetableSlot[];
  messages: Bootstrap['messages'];
  refreshPublic: () => Promise<void>;
  refresh: () => Promise<void>;
  login: (email: string, password: string, role: AuthUser['role'], schoolCode: string) => Promise<AuthUser>;
  logout: () => void;
  approveSchool: (id: string) => Promise<void>;
  addHomework: (subject: string, title: string, due: string) => Promise<void>;
  updateComplaint: (id: string, status: Complaint['status']) => Promise<void>;
  markRead: (id: string) => Promise<void>;
  sendMessage: (text: string) => Promise<void>;
  saveAttendance: (records: Record<string, boolean>) => Promise<void>;
}

const Ctx = createContext<AppCtx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      return null;
    }
  });
  const [dbStatus, setDbStatus] = useState<AppCtx['dbStatus']>('unknown');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Bootstrap>(empty);

  const refreshPublic = useCallback(async () => {
    try {
      const health = await api.health();
      setDbStatus(health.ok ? 'connected' : 'offline');
      const schools = await api.schools();
      setData((d) => ({ ...d, schools }));
    } catch {
      setDbStatus('offline');
    }
  }, []);

  const refresh = useCallback(async () => {
    if (!localStorage.getItem(TOKEN_KEY)) return;
    const boot = await api.bootstrap();
    setData(boot);
  }, []);

  useEffect(() => {
    (async () => {
      await refreshPublic();
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        try {
          const me = await api.me();
          setUser(me);
          localStorage.setItem(USER_KEY, JSON.stringify(me));
          await refresh();
        } catch {
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(USER_KEY);
          setUser(null);
        }
      }
      setLoading(false);
    })();
  }, [refresh, refreshPublic]);

  const applySession = useCallback(async (res: { token: string; user: AuthUser }) => {
    localStorage.setItem(TOKEN_KEY, res.token);
    localStorage.setItem(USER_KEY, JSON.stringify(res.user));
    setUser(res.user);
    await refresh();
    return res.user;
  }, [refresh]);

  const login = useCallback(async (email: string, password: string, role: AuthUser['role'], schoolCode: string) => {
    return applySession(await api.login({ email, password, role, schoolCode }));
  }, [applySession]);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
    setData((d) => ({ ...empty, schools: d.schools }));
  }, []);

  const value = useMemo<AppCtx>(() => ({
    user,
    dbStatus,
    loading,
    ...data,
    refreshPublic,
    refresh,
    login,
    logout,
    approveSchool: async (id) => {
      await api.approveSchool(id, 'approved');
      await refresh();
      await refreshPublic();
    },
    addHomework: async (subject, title, due) => {
      await api.addHomework({ subject, title, due });
      await refresh();
    },
    updateComplaint: async (id, status) => {
      await api.updateComplaint(id, status);
      await refresh();
    },
    markRead: async (id) => {
      await api.markNotificationRead(id);
      await refresh();
    },
    sendMessage: async (text) => {
      await api.sendMessage(text);
      await refresh();
    },
    saveAttendance: async (records) => {
      await api.saveAttendance(records);
    },
  }), [user, dbStatus, loading, data, refreshPublic, refresh, login, logout]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useApp outside AppProvider');
  return ctx;
}

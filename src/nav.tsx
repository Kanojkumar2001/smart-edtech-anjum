import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Role } from './types';

export type Route =
  | { name: 'landing' }
  | { name: 'login'; role: Role; mode?: 'signin' }
  | { name: 'dashboard'; role: Role };

interface NavCtx {
  route: Route;
  go: (r: Route) => void;
  activeSchoolId: string;
  setActiveSchoolId: (id: string) => void;
  activeStudentId: string;
  setActiveStudentId: (id: string) => void;
}

const Ctx = createContext<NavCtx | null>(null);

function initialRoute(): Route {
  try {
    const raw = localStorage.getItem('eduvision_user');
    if (!raw) return { name: 'landing' };
    const user = JSON.parse(raw) as { role?: Role };
    if (user?.role) return { name: 'dashboard', role: user.role };
  } catch {
    /* ignore */
  }
  return { name: 'landing' };
}

export function NavProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(initialRoute);
  const [activeSchoolId, setActiveSchoolId] = useState('s1');
  const [activeStudentId, setActiveStudentId] = useState('st1');
  const go = (r: Route) => {
    setRoute(r);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <Ctx.Provider value={{ route, go, activeSchoolId, setActiveSchoolId, activeStudentId, setActiveStudentId }}>
      {children}
    </Ctx.Provider>
  );
}

export function useNav() {
  const c = useContext(Ctx);
  if (!c) throw new Error('useNav outside provider');
  return c;
}

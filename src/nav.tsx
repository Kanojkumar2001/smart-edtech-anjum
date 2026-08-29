import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Role } from './types';

export type Route =
  | { name: 'landing' }
  | { name: 'login'; role: Role }
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

export function NavProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>({ name: 'landing' });
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

import { NavProvider, useNav } from '@/nav';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { AdminDashboard } from '@/pages/AdminDashboard';
import { PrincipalDashboard } from '@/pages/PrincipalDashboard';
import { TeacherDashboard } from '@/pages/TeacherDashboard';
import { ParentDashboard } from '@/pages/ParentDashboard';
import type { Role } from '@/types';

function Router() {
  const { route } = useNav();
  if (route.name === 'landing') return <LandingPage />;
  if (route.name === 'login') return <LoginPage />;
  if (route.name === 'dashboard') {
    const dashboards: Record<Role, React.ReactNode> = {
      admin: <AdminDashboard />,
      principal: <PrincipalDashboard />,
      teacher: <TeacherDashboard />,
      parent: <ParentDashboard />,
    };
    return dashboards[route.role];
  }
  return <LandingPage />;
}

export default function App() {
  return (
    <NavProvider>
      <Router />
    </NavProvider>
  );
}

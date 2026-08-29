import { type ReactNode, useState } from 'react';
import { Bell, Search, LogOut, Menu, X, ChevronDown, Settings } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Avatar } from '@/components/ui';
import { useNav } from '@/nav';
import type { Role } from '@/types';
import { schools, notifications } from '@/data';

export interface NavItem { id: string; label: string; icon: typeof Bell; badge?: number }

const roleProfile: Record<Role, { name: string; role: string; initials: string; color: string; school: string }> = {
  admin: { name: 'Arjun Mehta', role: 'Super Admin', initials: 'AM', color: 'bg-brand-500', school: 'EduVision Platform' },
  principal: { name: 'Dr. Sarita Reddy', role: 'Principal', initials: 'SR', color: 'bg-accent-500', school: 'Kendriya Vidyalaya' },
  teacher: { name: 'Anita Rao', role: 'Mathematics Teacher', initials: 'AR', color: 'bg-brand-500', school: 'Kendriya Vidyalaya' },
  parent: { name: 'Mr. Kumar', role: 'Parent', initials: 'PK', color: 'bg-success-500', school: 'Kendriya Vidyalaya' },
};

export function DashboardShell({
  role, items, active, onNavigate, children,
}: {
  role: Role;
  items: NavItem[];
  active: string;
  onNavigate: (id: string) => void;
  children: ReactNode;
}) {
  const { go } = useNav();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const profile = roleProfile[role];
  const school = schools[0];
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-ink-50 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-white border-r border-ink-100 flex flex-col transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-ink-100">
          <Logo size="sm" />
          <button onClick={() => setMobileOpen(false)} className="lg:hidden btn-ghost p-2"><X className="w-4 h-4" /></button>
        </div>
        <div className="px-3 py-4 flex-1 overflow-y-auto scrollbar-thin">
          <p className="text-[10px] font-700 uppercase tracking-wider text-ink-400 px-3 mb-2">{profile.role}</p>
          <nav className="space-y-1">
            {items.map((it) => {
              const isActive = it.id === active;
              return (
                <button key={it.id} onClick={() => { onNavigate(it.id); setMobileOpen(false); }} className={`sidebar-link w-full ${isActive ? 'sidebar-link-active' : ''}`}>
                  <it.icon className="w-4 h-4 shrink-0" />
                  <span className="flex-1 text-left">{it.label}</span>
                  {it.badge ? <span className="chip bg-danger-500 text-white text-[10px] px-1.5 py-0.5">{it.badge}</span> : null}
                </button>
              );
            })}
          </nav>
        </div>
        <div className="p-3 border-t border-ink-100">
          <button onClick={() => go({ name: 'landing' })} className="sidebar-link w-full text-danger-600 hover:bg-danger-50">
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </aside>

      {mobileOpen && <div className="fixed inset-0 z-30 bg-ink-950/30 lg:hidden" onClick={() => setMobileOpen(false)} />}

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-20 h-16 bg-white/80 backdrop-blur-xl border-b border-ink-100 flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden btn-ghost p-2"><Menu className="w-5 h-5" /></button>
            <div className="relative hidden sm:block">
              <Search className="w-4 h-4 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input placeholder="Search students, teachers, classes..." className="w-64 lg:w-80 rounded-xl bg-ink-50 border border-transparent focus:bg-white focus:border-brand-400 focus:ring-4 focus:ring-brand-500/10 pl-9 pr-3 py-2 text-sm outline-none transition-all" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-ink-50 text-sm">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              <span className="text-ink-600 font-500">{school.name}</span>
              <span className="text-ink-300">·</span>
              <span className="font-mono text-ink-400 text-xs">{school.code}</span>
            </div>
            <div className="relative">
              <button onClick={() => setNotifOpen((v) => !v)} className="btn-ghost p-2.5 relative">
                <Bell className="w-5 h-5" />
                {unread > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger-500 ring-2 ring-white" />}
              </button>
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 card p-2 animate-scale-in z-50">
                  <div className="flex items-center justify-between px-2 py-2">
                    <span className="font-700 text-ink-900 text-sm">Notifications</span>
                    <span className="chip bg-danger-50 text-danger-600">{unread} new</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto scrollbar-thin">
                    {notifications.map((n) => (
                      <div key={n.id} className={`p-3 rounded-xl hover:bg-ink-50 cursor-pointer ${!n.read ? 'bg-brand-50/50' : ''}`}>
                        <div className="flex items-start gap-2">
                          <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!n.read ? 'bg-brand-500' : 'bg-ink-200'}`} />
                          <div className="min-w-0">
                            <p className="text-sm font-600 text-ink-900">{n.title}</p>
                            <p className="text-xs text-ink-500 mt-0.5">{n.body}</p>
                            <p className="text-[10px] text-ink-400 mt-1">{n.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 pl-1.5 pr-1 sm:pr-2 py-1 rounded-xl hover:bg-ink-100 cursor-pointer">
              <Avatar initials={profile.initials} color={profile.color} size="sm" />
              <div className="hidden sm:block leading-tight">
                <div className="text-sm font-600 text-ink-900">{profile.name}</div>
                <div className="text-[11px] text-ink-400">{profile.role}</div>
              </div>
              <ChevronDown className="w-4 h-4 text-ink-400 hidden sm:block" />
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1400px] w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-800 text-ink-900">{title}</h1>
        {subtitle && <p className="text-ink-500 mt-1">{subtitle}</p>}
      </div>
      {action && <div className="flex items-center gap-2">{action}</div>}
    </div>
  );
}

export function SettingsStub() {
  return (
    <div className="card p-10 text-center">
      <Settings className="w-10 h-10 text-ink-300 mx-auto mb-3" />
      <p className="font-600 text-ink-700">Settings</p>
      <p className="text-sm text-ink-400 mt-1">Preferences and configuration will appear here.</p>
    </div>
  );
}

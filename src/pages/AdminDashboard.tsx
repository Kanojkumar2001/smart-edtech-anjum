import { useState } from 'react';
import {
  LayoutDashboard, Users, GraduationCap, UserCog, BookOpen, Calendar, CreditCard, ShieldCheck, FileBarChart, Building2, Plus, Search, CheckCircle2, XCircle, Clock, MoreHorizontal, ChevronRight,
} from 'lucide-react';
import { DashboardShell, PageHeader, type NavItem } from '@/components/DashboardShell';
import { Card, StatTile, Badge, Avatar, ProgressBar } from '@/components/ui';
import { BarChart, DonutChart, Legend } from '@/components/charts';
import { schools, teachers, students, complaints } from '@/data';

const items: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'schools', label: 'Schools', icon: Building2 },
  { id: 'teachers', label: 'Teachers', icon: UserCog },
  { id: 'parents', label: 'Parents', icon: Users },
  { id: 'students', label: 'Students', icon: GraduationCap },
  { id: 'classes', label: 'Classes & Sections', icon: BookOpen },
  { id: 'timetable', label: 'Timetable', icon: Calendar },
  { id: 'fees', label: 'Fee Structure', icon: CreditCard },
  { id: 'roles', label: 'User Roles', icon: ShieldCheck },
  { id: 'reports', label: 'Reports', icon: FileBarChart },
];

export function AdminDashboard() {
  const [active, setActive] = useState('dashboard');

  return (
    <DashboardShell role="admin" items={items} active={active} onNavigate={setActive}>
      {active === 'dashboard' && <Overview />}
      {active === 'schools' && <SchoolsTable />}
      {active === 'teachers' && <TeachersTable />}
      {active === 'students' && <StudentsTable />}
      {(active === 'parents' || active === 'classes' || active === 'timetable' || active === 'fees' || active === 'roles' || active === 'reports') && <Placeholder />}
    </DashboardShell>
  );
}

function Overview() {
  return (
    <>
      <PageHeader title="Admin Dashboard" subtitle="Platform-wide overview across all schools" action={<button className="btn-primary text-sm"><Plus className="w-4 h-4" /> Add School</button>} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatTile label="Total Schools" value={schools.length} sub="1 pending approval" icon={<Building2 className="w-4 h-4" />} tone="brand" />
        <StatTile label="Total Students" value="2,450" sub="+124 this term" icon={<GraduationCap className="w-4 h-4" />} tone="accent" />
        <StatTile label="Total Teachers" value="125" sub="3 on leave" icon={<UserCog className="w-4 h-4" />} tone="success" />
        <StatTile label="Total Parents" value="1,820" sub="Active accounts" icon={<Users className="w-4 h-4" />} tone="warning" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mt-5">
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display font-700 text-ink-900">Performance Overview</h3>
              <p className="text-sm text-ink-500">Average performance by class</p>
            </div>
            <Badge tone="success" dot>+4.2% MoM</Badge>
          </div>
          <BarChart data={[
            { label: '10-A', value: 82, color: '#1bb1ad' },
            { label: '10-B', value: 76, color: '#337bff' },
            { label: '10-C', value: 88, color: '#1bb265' },
            { label: '9-A', value: 74, color: '#f9b425' },
            { label: '11-A', value: 79, color: '#1bb1ad' },
            { label: '12-A', value: 85, color: '#337bff' },
          ]} />
        </Card>
        <Card className="p-5">
          <h3 className="font-display font-700 text-ink-900 mb-1">Fee Collection</h3>
          <p className="text-sm text-ink-500 mb-4">Current term</p>
          <div className="flex items-center justify-center">
            <DonutChart
              segments={[
                { value: 86, color: '#1bb1ad' },
                { value: 14, color: '#e9edf5' },
              ]}
              centerLabel="86%" centerSub="Collected"
            />
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm"><span className="text-ink-500">Collected</span><span className="font-600 text-ink-900">₹4.2 Cr</span></div>
            <div className="flex items-center justify-between text-sm"><span className="text-ink-500">Pending</span><span className="font-600 text-ink-900">₹68 L</span></div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mt-5">
        <Card className="p-5">
          <h3 className="font-display font-700 text-ink-900 mb-4">Attendance %</h3>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-4xl font-800 text-ink-900">91%</span>
            <Badge tone="success">+1.5%</Badge>
          </div>
          <ProgressBar value={91} tone="brand" className="mt-4" />
          <p className="text-xs text-ink-400 mt-2">Across all schools this week</p>
        </Card>
        <Card className="p-5">
          <h3 className="font-display font-700 text-ink-900 mb-4">Average Performance</h3>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-4xl font-800 text-ink-900">78%</span>
            <Badge tone="success">+3.1%</Badge>
          </div>
          <ProgressBar value={78} tone="accent" className="mt-4" />
          <p className="text-xs text-ink-400 mt-2">Internal + exam aggregate</p>
        </Card>
        <Card className="p-5">
          <h3 className="font-display font-700 text-ink-900 mb-3">Pending Approvals</h3>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-warning-50">
              <span className="text-sm text-ink-700">Bhashyam Public School</span>
              <Badge tone="warning"><Clock className="w-3 h-3" /> Review</Badge>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-ink-50">
              <span className="text-sm text-ink-700">2 teacher verifications</span>
              <ChevronRight className="w-4 h-4 text-ink-400" />
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-ink-50">
              <span className="text-sm text-ink-700">5 parent KYC</span>
              <ChevronRight className="w-4 h-4 text-ink-400" />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-5 mt-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-700 text-ink-900">Recent Complaints</h3>
          <button className="text-sm text-brand-600 font-600 hover:text-brand-700">View all</button>
        </div>
        <div className="space-y-2">
          {complaints.slice(0, 4).map((c) => (
            <div key={c.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-ink-50">
              <div className="flex items-center gap-3 min-w-0">
                <span className="chip bg-ink-100 text-ink-600 shrink-0">{c.category}</span>
                <div className="min-w-0">
                  <p className="text-sm font-600 text-ink-900 truncate">{c.subject}</p>
                  <p className="text-xs text-ink-400">{c.raisedBy} · {c.date}</p>
                </div>
              </div>
              <StatusBadge status={c.status} />
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

function SchoolsTable() {
  return (
    <>
      <PageHeader title="Schools" subtitle="Manage registered schools" action={<button className="btn-primary text-sm"><Plus className="w-4 h-4" /> Add School</button>} />
      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-ink-100 flex items-center justify-between">
          <div className="relative w-64">
            <Search className="w-4 h-4 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input className="input pl-9 py-2 text-sm" placeholder="Search schools..." />
          </div>
          <Badge tone="neutral">{schools.length} schools</Badge>
        </div>
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead className="bg-ink-50 text-ink-500 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left font-600 px-4 py-3">School</th>
                <th className="text-left font-600 px-4 py-3">Code</th>
                <th className="text-left font-600 px-4 py-3">Board</th>
                <th className="text-left font-600 px-4 py-3">Students</th>
                <th className="text-left font-600 px-4 py-3">Rating</th>
                <th className="text-left font-600 px-4 py-3">Status</th>
                <th className="text-right font-600 px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {schools.map((s) => (
                <tr key={s.id} className="hover:bg-ink-50/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl ${s.logoColor} text-white font-700 text-xs flex items-center justify-center`}>{s.logoInitials}</div>
                      <div>
                        <div className="font-600 text-ink-900">{s.name}</div>
                        <div className="text-xs text-ink-400">{s.city}, {s.state}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-ink-600">{s.code}</td>
                  <td className="px-4 py-3 text-ink-600">{s.board}</td>
                  <td className="px-4 py-3 text-ink-600">{s.students.toLocaleString()}</td>
                  <td className="px-4 py-3 text-ink-600">{s.rating} ★</td>
                  <td className="px-4 py-3">
                    {s.status === 'approved' ? <Badge tone="success" dot>Approved</Badge> : <Badge tone="warning" dot>Pending</Badge>}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {s.status === 'pending' ? (
                      <div className="inline-flex gap-1">
                        <button className="btn-ghost p-2 text-success-600 hover:bg-success-50"><CheckCircle2 className="w-4 h-4" /></button>
                        <button className="btn-ghost p-2 text-danger-600 hover:bg-danger-50"><XCircle className="w-4 h-4" /></button>
                      </div>
                    ) : (
                      <button className="btn-ghost p-2"><MoreHorizontal className="w-4 h-4" /></button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

function TeachersTable() {
  return (
    <>
      <PageHeader title="Teachers" subtitle="Manage teaching staff" action={<button className="btn-primary text-sm"><Plus className="w-4 h-4" /> Add Teacher</button>} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {teachers.map((t) => (
          <Card key={t.id} className="p-5 card-hover">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar initials={t.initials} color={t.color} />
                <div>
                  <h3 className="font-700 text-ink-900">{t.name}</h3>
                  <p className="text-xs text-ink-400">{t.subject}</p>
                </div>
              </div>
              {t.status === 'active' ? <Badge tone="success" dot>Active</Badge> : t.status === 'on-leave' ? <Badge tone="warning" dot>On Leave</Badge> : <Badge tone="danger" dot>Review</Badge>}
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
              <div className="rounded-xl bg-ink-50 p-2.5"><div className="font-700 text-ink-900">{t.classesCompleted}</div><div className="text-[11px] text-ink-400">Classes done</div></div>
              <div className="rounded-xl bg-ink-50 p-2.5"><div className="font-700 text-ink-900">{t.attendance}%</div><div className="text-[11px] text-ink-400">Attendance</div></div>
              <div className="rounded-xl bg-ink-50 p-2.5"><div className="font-700 text-ink-900">{t.homeworkAssigned}</div><div className="text-[11px] text-ink-400">Homework</div></div>
              <div className="rounded-xl bg-ink-50 p-2.5"><div className="font-700 text-ink-900">{t.pending}</div><div className="text-[11px] text-ink-400">Pending</div></div>
            </div>
            <div className="flex flex-wrap gap-1 mt-3">
              {t.classes.map((c) => <span key={c} className="chip bg-ink-100 text-ink-600">{c}</span>)}
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

function StudentsTable() {
  return (
    <>
      <PageHeader title="Students" subtitle="Manage student admissions" action={<button className="btn-primary text-sm"><Plus className="w-4 h-4" /> Admit Student</button>} />
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead className="bg-ink-50 text-ink-500 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left font-600 px-4 py-3">Student</th>
                <th className="text-left font-600 px-4 py-3">Roll No</th>
                <th className="text-left font-600 px-4 py-3">Class</th>
                <th className="text-left font-600 px-4 py-3">Attendance</th>
                <th className="text-left font-600 px-4 py-3">CGPA</th>
                <th className="text-left font-600 px-4 py-3">Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {students.map((s) => (
                <tr key={s.id} className="hover:bg-ink-50/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar initials={s.initials} color={s.avatarColor} size="sm" />
                      <div><div className="font-600 text-ink-900">{s.name}</div><div className="text-xs text-ink-400">{s.branch}</div></div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-ink-600">{s.rollNo}</td>
                  <td className="px-4 py-3 text-ink-600">{s.className} · {s.section}</td>
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><ProgressBar value={s.attendance} tone={s.attendance > 85 ? 'success' : 'warning'} className="w-16" /><span className="text-ink-600">{s.attendance}%</span></div></td>
                  <td className="px-4 py-3 font-600 text-ink-900">{s.cgpa}</td>
                  <td className="px-4 py-3">
                    {s.riskLevel === 'Normal' ? <Badge tone="success" dot>Normal</Badge> : <Badge tone="danger" dot>At Risk</Badge>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, 'neutral' | 'warning' | 'accent' | 'success' | 'danger'> = {
    Submitted: 'neutral', 'Under Review': 'warning', 'In Progress': 'accent', Resolved: 'success', Closed: 'neutral',
  };
  return <Badge tone={map[status] || 'neutral'}>{status}</Badge>;
}

function Placeholder() {
  return (
    <Card className="p-10 text-center">
      <p className="font-600 text-ink-700">This module is part of the EduVision platform.</p>
      <p className="text-sm text-ink-400 mt-1">Detailed management views populate once academic data is configured.</p>
    </Card>
  );
}

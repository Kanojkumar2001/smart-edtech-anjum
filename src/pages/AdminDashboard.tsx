import { useState } from 'react';
import {
  LayoutDashboard, Users, GraduationCap, UserCog, BookOpen, Calendar, CreditCard, ShieldCheck, FileBarChart, Building2, Plus, Search, CheckCircle2, XCircle, Clock, MoreHorizontal, ChevronRight,
} from 'lucide-react';
import { DashboardShell, PageHeader, type NavItem } from '@/components/DashboardShell';
import { Card, StatTile, Badge, Avatar, ProgressBar } from '@/components/ui';
import { BarChart, DonutChart } from '@/components/charts';
import { useApp } from '@/context/AppContext';

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
  const data = useApp();

  return (
    <DashboardShell role="admin" items={items} active={active} onNavigate={setActive}>
      {active === 'dashboard' && <Overview data={data} onGo={setActive} />}
      {active === 'schools' && <SchoolsTable />}
      {active === 'teachers' && <TeachersTable />}
      {active === 'students' && <StudentsTable />}
      {active === 'parents' && <ParentsView />}
      {active === 'classes' && <ClassesView />}
      {active === 'timetable' && <TimetableView />}
      {active === 'fees' && <FeesView />}
      {active === 'roles' && <RolesView />}
      {active === 'reports' && <ReportsView />}
    </DashboardShell>
  );
}

function Overview({ data, onGo }: { data: ReturnType<typeof useApp>; onGo: (id: string) => void }) {
  const { schools, teachers, students, complaints } = data;
  const pending = schools.filter((s) => s.status === 'pending');
  const totalStudents = schools.reduce((n, s) => n + (s.students || 0), 0);
  const totalTeachers = schools.reduce((n, s) => n + (s.teachers || 0), 0);
  const avgAttendance = students.length ? Math.round(students.reduce((n, s) => n + s.attendance, 0) / students.length) : 0;
  const avgPerf = students.length ? Math.round(students.reduce((n, s) => n + s.cgpa * 10, 0) / students.length) : 0;

  return (
    <>
      <PageHeader title="Admin Dashboard" subtitle="Live platform overview" action={<button onClick={() => onGo('schools')} className="btn-primary text-sm"><Plus className="w-4 h-4" /> Manage Schools</button>} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatTile label="Total Schools" value={schools.length} sub={`${pending.length} pending approval`} icon={<Building2 className="w-4 h-4" />} tone="brand" />
        <StatTile label="Total Students" value={totalStudents.toLocaleString()} sub={`${students.length} detailed records`} icon={<GraduationCap className="w-4 h-4" />} tone="accent" />
        <StatTile label="Total Teachers" value={totalTeachers} sub={`${teachers.filter((t) => t.status === 'on-leave').length} on leave`} icon={<UserCog className="w-4 h-4" />} tone="success" />
        <StatTile label="Open complaints" value={complaints.filter((c) => c.status !== 'Resolved' && c.status !== 'Closed').length} sub="Requires follow-up" icon={<Users className="w-4 h-4" />} tone="warning" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mt-5">
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display font-700 text-ink-900">Performance Overview</h3>
              <p className="text-sm text-ink-500">Average CGPA mapped to percent</p>
            </div>
            <Badge tone="success" dot>Live data</Badge>
          </div>
          <BarChart data={students.map((s, i) => ({ label: s.name.split(' ')[0], value: Math.round(s.cgpa * 10), color: ['#1bb1ad', '#337bff', '#1bb265', '#f9b425'][i % 4] }))} />
        </Card>
        <Card className="p-5">
          <h3 className="font-display font-700 text-ink-900 mb-1">Fee Collection</h3>
          <p className="text-sm text-ink-500 mb-4">From student fee records</p>
          {(() => {
            const paid = students.reduce((n, s) => n + s.fee.paid, 0);
            const total = students.reduce((n, s) => n + s.fee.total, 0) || 1;
            const pct = Math.round((paid / total) * 100);
            return (
              <>
                <div className="flex items-center justify-center">
                  <DonutChart segments={[{ value: pct, color: '#1bb1ad' }, { value: 100 - pct, color: '#e9edf5' }]} centerLabel={`${pct}%`} centerSub="Collected" />
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm"><span className="text-ink-500">Collected</span><span className="font-600 text-ink-900">₹{paid.toLocaleString()}</span></div>
                  <div className="flex items-center justify-between text-sm"><span className="text-ink-500">Pending</span><span className="font-600 text-ink-900">₹{(total - paid).toLocaleString()}</span></div>
                </div>
              </>
            );
          })()}
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mt-5">
        <Card className="p-5">
          <h3 className="font-display font-700 text-ink-900 mb-4">Attendance %</h3>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-4xl font-800 text-ink-900">{avgAttendance}%</span>
          </div>
          <ProgressBar value={avgAttendance} tone="brand" className="mt-4" />
          <p className="text-xs text-ink-400 mt-2">Average of student records this term</p>
        </Card>
        <Card className="p-5">
          <h3 className="font-display font-700 text-ink-900 mb-4">Average Performance</h3>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-4xl font-800 text-ink-900">{avgPerf}%</span>
          </div>
          <ProgressBar value={avgPerf} tone="accent" className="mt-4" />
          <p className="text-xs text-ink-400 mt-2">Mapped from CGPA</p>
        </Card>
        <Card className="p-5">
          <h3 className="font-display font-700 text-ink-900 mb-3">Pending Approvals</h3>
          <div className="space-y-2.5">
            {pending.length === 0 && <p className="text-sm text-ink-400">No schools waiting for review.</p>}
            {pending.map((s) => (
              <button key={s.id} onClick={() => onGo('schools')} className="w-full flex items-center justify-between p-2.5 rounded-xl bg-warning-50">
                <span className="text-sm text-ink-700">{s.name}</span>
                <Badge tone="warning"><Clock className="w-3 h-3" /> Review</Badge>
              </button>
            ))}
            <button onClick={() => onGo('teachers')} className="w-full flex items-center justify-between p-2.5 rounded-xl bg-ink-50">
              <span className="text-sm text-ink-700">{teachers.filter((t) => t.status === 'review').length} teacher verifications</span>
              <ChevronRight className="w-4 h-4 text-ink-400" />
            </button>
          </div>
        </Card>
      </div>

      <Card className="p-5 mt-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-700 text-ink-900">Recent Complaints</h3>
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
  const { schools, approveSchool } = useApp();
  const [q, setQ] = useState('');
  const filtered = schools.filter((s) => s.name.toLowerCase().includes(q.toLowerCase()) || s.code.includes(q));

  return (
    <>
      <PageHeader title="Schools" subtitle="Approve and manage registered schools" />
      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-ink-100 flex items-center justify-between">
          <div className="relative w-64">
            <Search className="w-4 h-4 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input value={q} onChange={(e) => setQ(e.target.value)} className="input pl-9 py-2 text-sm" placeholder="Search schools..." />
          </div>
          <Badge tone="neutral">{filtered.length} schools</Badge>
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
              {filtered.map((s) => (
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
                        <button onClick={() => void approveSchool(s.id)} className="btn-ghost p-2 text-success-600 hover:bg-success-50" title="Approve"><CheckCircle2 className="w-4 h-4" /></button>
                        <button className="btn-ghost p-2 text-danger-600 hover:bg-danger-50" title="Keep pending"><XCircle className="w-4 h-4" /></button>
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
  const { teachers } = useApp();
  return (
    <>
      <PageHeader title="Teachers" subtitle="Staff records" />
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
  const { students } = useApp();
  return (
    <>
      <PageHeader title="Students" subtitle="Admissions and risk overview" />
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
                    {s.riskLevel === 'Normal' ? <Badge tone="success" dot>Normal</Badge> : <Badge tone="danger" dot>{s.riskLevel}</Badge>}
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

function ParentsView() {
  const { students } = useApp();
  return (
    <>
      <PageHeader title="Parents" subtitle="Guardians linked to student records" />
      <div className="grid sm:grid-cols-2 gap-4">
        {students.map((s) => (
          <Card key={s.id} className="p-5">
            <div className="font-700 text-ink-900">Parent of {s.name}</div>
            <p className="text-sm text-ink-500 mt-1">{s.className} · Roll {s.rollNo}</p>
            <p className="text-xs text-ink-400 mt-3">Fee due {s.fee.due} · ₹{(s.fee.total - s.fee.paid).toLocaleString()} remaining</p>
          </Card>
        ))}
      </div>
    </>
  );
}

function ClassesView() {
  const { students, teachers } = useApp();
  const classes = [...new Set(teachers.flatMap((t) => t.classes))];
  return (
    <>
      <PageHeader title="Classes & Sections" subtitle="Derived from roster data" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map((c) => (
          <Card key={c} className="p-5">
            <div className="font-700 text-ink-900">{c}</div>
            <p className="text-sm text-ink-500 mt-1">{teachers.filter((t) => t.classes.includes(c)).length} teachers · {students.length} students in school</p>
          </Card>
        ))}
      </div>
    </>
  );
}

function TimetableView() {
  const { timetable } = useApp();
  return (
    <>
      <PageHeader title="Timetable" subtitle="Weekly schedule" />
      <Card className="p-5">
        <div className="space-y-4">
          {timetable.map((d) => (
            <div key={d.day}>
              <div className="font-700 text-ink-900 mb-2">{d.day}</div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {d.periods.map((p) => (
                  <div key={`${d.day}-${p.time}`} className={`rounded-xl p-3 text-white ${p.color}`}>
                    <div className="text-xs opacity-80">{p.time}</div>
                    <div className="font-600 text-sm">{p.subject}</div>
                    <div className="text-xs opacity-80">{p.room}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

function FeesView() {
  const { students } = useApp();
  return (
    <>
      <PageHeader title="Fee Structure" subtitle="Per-student collections" />
      <Card className="p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ink-50 text-ink-500 text-xs uppercase tracking-wide">
            <tr>
              <th className="text-left font-600 px-4 py-3">Student</th>
              <th className="text-left font-600 px-4 py-3">Total</th>
              <th className="text-left font-600 px-4 py-3">Paid</th>
              <th className="text-left font-600 px-4 py-3">Due</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {students.map((s) => (
              <tr key={s.id}>
                <td className="px-4 py-3 font-600">{s.name}</td>
                <td className="px-4 py-3">₹{s.fee.total.toLocaleString()}</td>
                <td className="px-4 py-3 text-success-600">₹{s.fee.paid.toLocaleString()}</td>
                <td className="px-4 py-3">{s.fee.due}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
}

function RolesView() {
  return (
    <>
      <PageHeader title="User Roles" subtitle="Platform access model" />
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { r: 'Admin', d: 'Approve schools, manage staff and platform data.' },
          { r: 'Principal', d: 'School intelligence, complaints, and teacher monitoring.' },
          { r: 'Teacher', d: 'Attendance, marks, homework, and timetable.' },
          { r: 'Parent', d: 'Student 360°, fees, AI assistant, and teacher chat.' },
        ].map((x) => (
          <Card key={x.r} className="p-5">
            <div className="font-700 text-ink-900">{x.r}</div>
            <p className="text-sm text-ink-500 mt-1">{x.d}</p>
          </Card>
        ))}
      </div>
    </>
  );
}

function ReportsView() {
  const { students, teachers, complaints } = useApp();
  return (
    <>
      <PageHeader title="Reports" subtitle="Platform snapshot" />
      <div className="grid sm:grid-cols-3 gap-4">
        <StatTile label="Students" value={students.length} tone="brand" />
        <StatTile label="Teachers" value={teachers.length} tone="accent" />
        <StatTile label="Complaints" value={complaints.length} tone="warning" />
      </div>
    </>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, 'neutral' | 'warning' | 'accent' | 'success' | 'danger'> = {
    Submitted: 'neutral', 'Under Review': 'warning', 'In Progress': 'accent', Resolved: 'success', Closed: 'neutral',
  };
  return <Badge tone={map[status] || 'neutral'}>{status}</Badge>;
}

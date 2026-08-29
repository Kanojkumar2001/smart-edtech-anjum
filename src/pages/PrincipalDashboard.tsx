import { useState } from 'react';
import {
  LayoutDashboard, CalendarCheck, BarChart3, UserCog, CreditCard, MessageSquare, FileBarChart, TrendingUp, AlertTriangle, Award, GraduationCap, FileText,
} from 'lucide-react';
import { DashboardShell, PageHeader, type NavItem } from '@/components/DashboardShell';
import { Card, StatTile, Badge, Avatar, ProgressBar, SectionTitle } from '@/components/ui';
import { LineChart, BarChart, DonutChart, Legend } from '@/components/charts';
import { useApp } from '@/context/AppContext';
import type { Complaint, Student, Teacher } from '@/types';

const items: NavItem[] = [
  { id: 'dashboard', label: 'Intelligence Dashboard', icon: LayoutDashboard },
  { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
  { id: 'performance', label: 'Performance', icon: BarChart3 },
  { id: 'monitoring', label: 'Teacher Monitoring', icon: UserCog },
  { id: 'fees', label: 'Fees', icon: CreditCard },
  { id: 'complaints', label: 'Complaints', icon: MessageSquare, badge: 3 },
  { id: 'reports', label: 'Reports', icon: FileBarChart },
];

export function PrincipalDashboard() {
  const [active, setActive] = useState('dashboard');
  const { teachers, complaints, students } = useApp();
  return (
    <DashboardShell role="principal" items={items.map((it) => it.id === 'complaints' ? { ...it, badge: complaints.filter((c) => c.status !== 'Resolved' && c.status !== 'Closed').length } : it)} active={active} onNavigate={setActive}>
      {active === 'dashboard' && <Overview teachers={teachers} students={students} complaints={complaints} />}
      {active === 'attendance' && <Attendance students={students} />}
      {active === 'performance' && <Performance students={students} />}
      {active === 'monitoring' && <Monitoring teachers={teachers} />}
      {active === 'complaints' && <Complaints />}
      {active === 'fees' && <Fees students={students} />}
      {active === 'reports' && <Reports students={students} teachers={teachers} complaints={complaints} />}
    </DashboardShell>
  );
}

function Overview({ teachers, students, complaints }: { teachers: Teacher[]; students: Student[]; complaints: Complaint[] }) {
  const avgAtt = students.length ? Math.round(students.reduce((n, s) => n + s.attendance, 0) / students.length) : 0;
  const avgPerf = students.length ? Math.round(students.reduce((n, s) => n + s.cgpa * 10, 0) / students.length) : 0;
  const paid = students.reduce((n, s) => n + s.fee.paid, 0);
  const total = students.reduce((n, s) => n + s.fee.total, 0) || 1;
  const atRisk = students.filter((s) => s.riskLevel !== 'Normal').length;
  const top = students.filter((s) => s.cgpa * 10 >= 85).length;
  const open = complaints.filter((c) => c.status !== 'Resolved' && c.status !== 'Closed').length;
  return (
    <>
      <PageHeader title="Principal Dashboard" subtitle="School intelligence overview" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatTile label="Students" value={students.length} icon={<GraduationCap className="w-4 h-4" />} tone="brand" />
        <StatTile label="Teachers" value={teachers.length} icon={<UserCog className="w-4 h-4" />} tone="accent" />
        <StatTile label="Attendance" value={`${avgAtt}%`} icon={<CalendarCheck className="w-4 h-4" />} tone="success" />
        <StatTile label="Avg Performance" value={`${avgPerf}%`} icon={<TrendingUp className="w-4 h-4" />} tone="warning" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <StatTile label="Fee Collection" value={`${Math.round((paid / total) * 100)}%`} icon={<CreditCard className="w-4 h-4" />} tone="brand" />
        <StatTile label="At-Risk Students" value={atRisk} sub="Needs intervention" icon={<AlertTriangle className="w-4 h-4" />} tone="danger" />
        <StatTile label="Top Performing" value={top} sub="Above 85%" icon={<Award className="w-4 h-4" />} tone="success" />
        <StatTile label="Pending Complaints" value={open} icon={<MessageSquare className="w-4 h-4" />} tone="warning" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mt-5">
        <Card className="p-5 lg:col-span-2">
          <SectionTitle title="Attendance Trend" subtitle="Last 6 months" action={<Badge tone="success" dot>91% avg</Badge>} />
          <LineChart data={students[0]?.attendanceTrend || []} />
        </Card>
        <Card className="p-5">
          <SectionTitle title="Class Performance" />
          <BarChart data={[
            { label: '10-A', value: 82, color: '#1bb1ad' },
            { label: '10-B', value: 76, color: '#337bff' },
            { label: '10-C', value: 88, color: '#1bb265' },
            { label: '9-A', value: 74, color: '#f9b425' },
            { label: '12-A', value: 85, color: '#1bb1ad' },
          ]} />
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mt-5">
        <Card className="p-5">
          <SectionTitle title="Staff Attendance" subtitle="Today" />
          <div className="flex items-center justify-center mb-4">
            <DonutChart
              segments={[
                { value: 118, color: '#1bb1ad' },
                { value: 4, color: '#e64d50' },
                { value: 2, color: '#f9b425' },
                { value: 1, color: '#337bff' },
              ]}
              centerLabel="125" centerSub="Staff"
            />
          </div>
          <Legend items={[
            { label: 'Present', color: '#1bb1ad' },
            { label: 'Absent', color: '#e64d50' },
            { label: 'Leave', color: '#f9b425' },
            { label: 'Late', color: '#337bff' },
          ]} />
        </Card>
        <Card className="p-5">
          <SectionTitle title="At-Risk Students" subtitle="Require attention" />
          <div className="space-y-3">
            {students.map((s) => (
              <div key={s.id} className="flex items-center justify-between p-3 rounded-xl bg-ink-50">
                <div className="flex items-center gap-3">
                  <Avatar initials={s.initials} color={s.avatarColor} size="sm" />
                  <div><div className="text-sm font-600 text-ink-900">{s.name}</div><div className="text-xs text-ink-400">{s.className} · {s.section}</div></div>
                </div>
                <div className="text-right">
                  <div className="font-700 text-ink-900 text-sm">{s.riskScore}/100</div>
                  {s.riskLevel === 'Normal' ? <Badge tone="success" dot>Normal</Badge> : <Badge tone="danger" dot>At Risk</Badge>}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}

function Attendance({ students }: { students: Student[] }) {
  return (
    <>
      <PageHeader title="Attendance Analytics" subtitle="Class, section & student-wise breakdown" />
      <div className="grid lg:grid-cols-2 gap-5">
        <Card className="p-5">
          <SectionTitle title="Class-wise Attendance" />
          <div className="space-y-3">
            {[{ c: '10-A', v: 88 }, { c: '10-B', v: 82 }, { c: '10-C', v: 91 }, { c: '9-A', v: 79 }, { c: '11-A', v: 85 }, { c: '12-A', v: 90 }].map((r) => (
              <div key={r.c}>
                <div className="flex justify-between text-sm mb-1"><span className="font-500 text-ink-700">{r.c}</span><span className="font-600 text-ink-900">{r.v}%</span></div>
                <ProgressBar value={r.v} tone={r.v > 85 ? 'success' : 'warning'} />
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <SectionTitle title="Monthly Trend" />
          <LineChart data={students[0]?.attendanceTrend || []} color="#337bff" />
        </Card>
      </div>
    </>
  );
}

function Performance({ students }: { students: Student[] }) {
  return (
    <>
      <PageHeader title="Class Performance" subtitle="Aggregate performance across classes" />
      <Card className="p-5">
        <SectionTitle title="Performance by Class" />
        <BarChart height={180} data={students.map((s, i) => ({ label: s.name.split(' ')[0], value: Math.round(s.cgpa * 10), color: ['#1bb1ad', '#337bff', '#1bb265', '#f9b425'][i % 4] }))} />
      </Card>
    </>
  );
}

function Monitoring({ teachers }: { teachers: Teacher[] }) {
  return (
    <>
      <PageHeader title="Teacher Monitoring" subtitle="Activity tracking across teaching staff" />
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead className="bg-ink-50 text-ink-500 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left font-600 px-4 py-3">Teacher</th>
                <th className="text-left font-600 px-4 py-3">Subject</th>
                <th className="text-left font-600 px-4 py-3">Classes Done</th>
                <th className="text-left font-600 px-4 py-3">Homework</th>
                <th className="text-left font-600 px-4 py-3">Marks Entered</th>
                <th className="text-left font-600 px-4 py-3">Pending</th>
                <th className="text-left font-600 px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {teachers.map((t) => (
                <tr key={t.id} className="hover:bg-ink-50/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar initials={t.initials} color={t.color} size="sm" />
                      <span className="font-600 text-ink-900">{t.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink-600">{t.subject}</td>
                  <td className="px-4 py-3 text-ink-600">{t.classesCompleted}</td>
                  <td className="px-4 py-3 text-ink-600">{t.homeworkAssigned}</td>
                  <td className="px-4 py-3 text-ink-600">{t.marksEntered}</td>
                  <td className="px-4 py-3">{t.pending > 0 ? <Badge tone="warning">{t.pending}</Badge> : <Badge tone="success" dot>Clear</Badge>}</td>
                  <td className="px-4 py-3">{t.status === 'active' ? <Badge tone="success" dot>Active</Badge> : t.status === 'on-leave' ? <Badge tone="warning" dot>On Leave</Badge> : <Badge tone="danger" dot>Review</Badge>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

function Complaints() {
  const { complaints, updateComplaint } = useApp();
  const next: Record<string, Complaint['status']> = {
    Submitted: 'Under Review', 'Under Review': 'In Progress', 'In Progress': 'Resolved', Resolved: 'Closed', Closed: 'Submitted',
  };
  return (
    <>
      <PageHeader title="Complaints & Suggestions" subtitle="Track and update status" />
      <div className="space-y-3">
        {complaints.map((c) => (
          <Card key={c.id} className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-ink-100 text-ink-500 flex items-center justify-center"><FileText className="w-5 h-5" /></div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="chip bg-ink-100 text-ink-600">{c.category}</span>
                    <span className="text-xs text-ink-400">{c.date}</span>
                  </div>
                  <p className="font-600 text-ink-900 mt-1.5">{c.subject}</p>
                  <p className="text-xs text-ink-400 mt-0.5">{c.raisedBy}</p>
                </div>
              </div>
              <button onClick={() => void updateComplaint(c.id, next[c.status] || 'Under Review')} className="shrink-0">
                <StatusBadge status={c.status} />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

function Fees({ students }: { students: Student[] }) {
  const paid = students.reduce((n, s) => n + s.fee.paid, 0);
  const total = students.reduce((n, s) => n + s.fee.total, 0);
  return (
    <>
      <PageHeader title="Fees" subtitle="Collections from student records" />
      <div className="grid sm:grid-cols-2 gap-4 mb-5">
        <StatTile label="Collected" value={`₹${paid.toLocaleString()}`} tone="success" />
        <StatTile label="Outstanding" value={`₹${(total - paid).toLocaleString()}`} tone="warning" />
      </div>
      <Card className="p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ink-50 text-xs uppercase text-ink-500">
            <tr><th className="text-left px-4 py-3">Student</th><th className="text-left px-4 py-3">Paid</th><th className="text-left px-4 py-3">Due</th></tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {students.map((s) => (
              <tr key={s.id}><td className="px-4 py-3 font-600">{s.name}</td><td className="px-4 py-3">₹{s.fee.paid.toLocaleString()}</td><td className="px-4 py-3">{s.fee.due}</td></tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
}

function Reports({ students, teachers, complaints }: { students: Student[]; teachers: Teacher[]; complaints: Complaint[] }) {
  return (
    <>
      <PageHeader title="Reports" subtitle="Live snapshot" />
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


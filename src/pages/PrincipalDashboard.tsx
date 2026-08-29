import { useState } from 'react';
import {
  LayoutDashboard, CalendarCheck, BarChart3, UserCog, CreditCard, MessageSquare, FileBarChart, TrendingUp, AlertTriangle, Award, Users, GraduationCap, Clock, CheckCircle2, FileText,
} from 'lucide-react';
import { DashboardShell, PageHeader, type NavItem } from '@/components/DashboardShell';
import { Card, StatTile, Badge, Avatar, ProgressBar, SectionTitle } from '@/components/ui';
import { LineChart, BarChart, DonutChart, Legend } from '@/components/charts';
import { teachers, complaints, students } from '@/data';

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
  return (
    <DashboardShell role="principal" items={items} active={active} onNavigate={setActive}>
      {active === 'dashboard' && <Overview />}
      {active === 'attendance' && <Attendance />}
      {active === 'performance' && <Performance />}
      {active === 'monitoring' && <Monitoring />}
      {active === 'complaints' && <Complaints />}
      {(active === 'fees' || active === 'reports') && <Placeholder />}
    </DashboardShell>
  );
}

function Overview() {
  return (
    <>
      <PageHeader title="Principal Dashboard" subtitle="Kendriya Vidyalaya — intelligence overview" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatTile label="Students" value="2,450" icon={<GraduationCap className="w-4 h-4" />} tone="brand" />
        <StatTile label="Teachers" value="125" icon={<UserCog className="w-4 h-4" />} tone="accent" />
        <StatTile label="Attendance" value="91%" icon={<CalendarCheck className="w-4 h-4" />} tone="success" />
        <StatTile label="Avg Performance" value="78%" icon={<TrendingUp className="w-4 h-4" />} tone="warning" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <StatTile label="Fee Collection" value="86%" icon={<CreditCard className="w-4 h-4" />} tone="brand" />
        <StatTile label="At-Risk Students" value="42" sub="Needs intervention" icon={<AlertTriangle className="w-4 h-4" />} tone="danger" />
        <StatTile label="Top Performing" value="185" sub="Above 85%" icon={<Award className="w-4 h-4" />} tone="success" />
        <StatTile label="Pending Complaints" value="12" icon={<MessageSquare className="w-4 h-4" />} tone="warning" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mt-5">
        <Card className="p-5 lg:col-span-2">
          <SectionTitle title="Attendance Trend" subtitle="Last 6 months" action={<Badge tone="success" dot>91% avg</Badge>} />
          <LineChart data={students[0].attendanceTrend} />
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

function Attendance() {
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
          <LineChart data={students[0].attendanceTrend} color="#337bff" />
        </Card>
      </div>
    </>
  );
}

function Performance() {
  return (
    <>
      <PageHeader title="Class Performance" subtitle="Aggregate performance across classes" />
      <Card className="p-5">
        <SectionTitle title="Performance by Class" />
        <BarChart height={180} data={[
          { label: '10-A', value: 82, color: '#1bb1ad' },
          { label: '10-B', value: 76, color: '#337bff' },
          { label: '10-C', value: 88, color: '#1bb265' },
          { label: '9-A', value: 74, color: '#f9b425' },
          { label: '9-B', value: 71, color: '#e64d50' },
          { label: '11-A', value: 79, color: '#1bb1ad' },
          { label: '11-B', value: 83, color: '#337bff' },
          { label: '12-A', value: 85, color: '#1bb265' },
        ]} />
      </Card>
    </>
  );
}

function Monitoring() {
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
  return (
    <>
      <PageHeader title="Complaints & Suggestions" subtitle="Track and resolve issues" />
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
              <StatusBadge status={c.status} />
            </div>
          </Card>
        ))}
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

function Placeholder() {
  return (
    <Card className="p-10 text-center">
      <p className="font-600 text-ink-700">Detailed reports appear here.</p>
      <p className="text-sm text-ink-400 mt-1">Analytics and exports populate with academic data.</p>
    </Card>
  );
}

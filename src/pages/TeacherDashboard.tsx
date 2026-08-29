import { useState } from 'react';
import {
  LayoutDashboard, CalendarCheck, ClipboardList, BookOpen, FileText, Calendar, Users, MessageSquare, Sparkles, Plus, CheckCircle2, Clock, BrainCircuit, GraduationCap,
} from 'lucide-react';
import { DashboardShell, PageHeader, type NavItem } from '@/components/DashboardShell';
import { Card, StatTile, Badge, Avatar, ProgressBar, SectionTitle } from '@/components/ui';
import { BarChart } from '@/components/charts';
import { timetable, homework, students } from '@/data';

const items: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
  { id: 'marks', label: 'Marks', icon: ClipboardList },
  { id: 'homework', label: 'Homework', icon: BookOpen },
  { id: 'notes', label: 'Notes', icon: FileText },
  { id: 'timetable', label: 'Timetable', icon: Calendar },
  { id: 'students', label: 'Students', icon: Users },
  { id: 'messages', label: 'Parent Messages', icon: MessageSquare },
  { id: 'ai', label: 'AI Schedule', icon: Sparkles },
];

export function TeacherDashboard() {
  const [active, setActive] = useState('dashboard');
  return (
    <DashboardShell role="teacher" items={items} active={active} onNavigate={setActive}>
      {active === 'dashboard' && <Overview />}
      {active === 'attendance' && <Attendance />}
      {active === 'marks' && <Marks />}
      {active === 'homework' && <Homework />}
      {active === 'timetable' && <Timetable />}
      {active === 'ai' && <AISchedule />}
      {(active === 'notes' || active === 'students' || active === 'messages') && <Placeholder />}
    </DashboardShell>
  );
}

function Overview() {
  return (
    <>
      <PageHeader title="Teacher Dashboard" subtitle="Anita Rao · Mathematics" action={<button className="btn-primary text-sm"><Plus className="w-4 h-4" /> Assign Homework</button>} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatTile label="My Classes" value="3" sub="10-A, 10-B, 9-C" icon={<GraduationCap className="w-4 h-4" />} tone="brand" />
        <StatTile label="Today's Periods" value="4" sub="2 completed" icon={<Calendar className="w-4 h-4" />} tone="accent" />
        <StatTile label="Homework" value="38" sub="6 pending review" icon={<BookOpen className="w-4 h-4" />} tone="warning" />
        <StatTile label="Marks Entered" value="36" sub="2 pending" icon={<ClipboardList className="w-4 h-4" />} tone="success" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mt-5">
        <Card className="p-5 lg:col-span-2">
          <SectionTitle title="Today's Timetable" subtitle="Monday · 26 Aug" />
          <div className="space-y-2">
            {timetable[0].periods.map((p, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-ink-50">
                <div className={`w-1.5 h-10 rounded-full ${p.color}`} />
                <div className="flex-1">
                  <div className="font-600 text-ink-900 text-sm">{p.subject}</div>
                  <div className="text-xs text-ink-400">{p.teacher} · {p.room}</div>
                </div>
                <span className="font-mono text-sm text-ink-500">{p.time}</span>
                {i < 2 ? <Badge tone="success" dot>Done</Badge> : <Badge tone="warning" dot>Upcoming</Badge>}
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <SectionTitle title="Class Performance" subtitle="10-A Mathematics" />
          <BarChart data={[
            { label: 'Quiz 1', value: 72, color: '#1bb1ad' },
            { label: 'Quiz 2', value: 68, color: '#337bff' },
            { label: 'Mid', value: 74, color: '#1bb1ad' },
            { label: 'Asgn', value: 80, color: '#1bb265' },
            { label: 'Proj', value: 85, color: '#337bff' },
          ]} />
        </Card>
      </div>

      <Card className="p-5 mt-5">
        <SectionTitle title="AI Recommendation" action={<Badge tone="brand" dot>AI</Badge>} />
        <div className="p-4 rounded-2xl bg-gradient-to-br from-brand-50 to-accent-50 border border-brand-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center shrink-0"><BrainCircuit className="w-5 h-5" /></div>
            <div>
              <p className="text-sm text-ink-700 leading-relaxed">
                Class <b>10-A</b> scored lowest in <b>Trigonometry</b> (avg 58%). Schedule a revision session this week and assign targeted practice worksheets.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <button className="btn-primary text-xs px-3 py-2">Generate revision plan</button>
                <button className="btn-outline text-xs px-3 py-2">Create worksheet</button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

function Attendance() {
  const roster = ['Rahul Kumar', 'Ravi Sharma', 'Priya Nair', 'Karthik Reddy', 'Sneha Iyer', 'Arjun Das', 'Divya Menon', 'Vikram Rao'];
  const [present, setPresent] = useState<Record<string, boolean>>(Object.fromEntries(roster.map((n) => [n, true])));
  const count = Object.values(present).filter(Boolean).length;

  return (
    <>
      <PageHeader title="Mark Attendance" subtitle="10-A · Mathematics · Today" action={<button className="btn-primary text-sm"><CheckCircle2 className="w-4 h-4" /> Save Attendance</button>} />
      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-ink-500">{count}/{roster.length} present</span>
            <div className="flex gap-2">
              <button onClick={() => setPresent(Object.fromEntries(roster.map((n) => [n, true])))} className="btn-ghost text-xs px-3 py-1.5">Mark all present</button>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            {roster.map((n) => (
              <button
                key={n}
                onClick={() => setPresent((p) => ({ ...p, [n]: !p[n] }))}
                className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${present[n] ? 'border-success-200 bg-success-50' : 'border-danger-200 bg-danger-50'}`}
              >
                <Avatar initials={n.split(' ').map((x) => x[0]).join('')} color={present[n] ? 'bg-success-500' : 'bg-danger-500'} size="sm" />
                <span className="flex-1 text-left text-sm font-600 text-ink-900">{n}</span>
                <span className={`chip ${present[n] ? 'bg-success-100 text-success-700' : 'bg-danger-100 text-danger-700'}`}>{present[n] ? 'Present' : 'Absent'}</span>
              </button>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <SectionTitle title="Summary" />
          <div className="flex items-center justify-center my-4">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full -rotate-90">
                <circle cx="64" cy="64" r="56" fill="none" stroke="#e9edf5" strokeWidth="10" />
                <circle cx="64" cy="64" r="56" fill="none" stroke="#1bb1ad" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${(count / roster.length) * 2 * Math.PI * 56} ${2 * Math.PI * 56}`} className="transition-all duration-700" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-2xl font-800 text-ink-900">{Math.round((count / roster.length) * 100)}%</span>
                <span className="text-xs text-ink-400">Present</span>
              </div>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-ink-500">Present</span><span className="font-600 text-success-600">{count}</span></div>
            <div className="flex justify-between"><span className="text-ink-500">Absent</span><span className="font-600 text-danger-600">{roster.length - count}</span></div>
            <div className="flex justify-between"><span className="text-ink-500">Total</span><span className="font-600 text-ink-900">{roster.length}</span></div>
          </div>
        </Card>
      </div>
    </>
  );
}

function Marks() {
  return (
    <>
      <PageHeader title="Enter Marks" subtitle="10-A · Mathematics · Mid Semester" action={<button className="btn-primary text-sm"><CheckCircle2 className="w-4 h-4" /> Save Marks</button>} />
      <Card className="p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ink-50 text-ink-500 text-xs uppercase tracking-wide">
            <tr>
              <th className="text-left font-600 px-4 py-3">Student</th>
              <th className="text-left font-600 px-4 py-3">Internal</th>
              <th className="text-left font-600 px-4 py-3">Assignment</th>
              <th className="text-left font-600 px-4 py-3">Mid Exam</th>
              <th className="text-left font-600 px-4 py-3">Total</th>
              <th className="text-left font-600 px-4 py-3">Grade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {students.map((s) => {
              const internal = Math.round(s.subjects[0].current * 0.4);
              const assignment = Math.round(s.assignments * 0.2);
              const mid = Math.round(s.subjects[0].current * 0.4);
              const total = internal + assignment + mid;
              const grade = total >= 85 ? 'A' : total >= 70 ? 'B' : total >= 55 ? 'C' : 'D';
              return (
                <tr key={s.id} className="hover:bg-ink-50/50">
                  <td className="px-4 py-3"><div className="flex items-center gap-3"><Avatar initials={s.initials} color={s.avatarColor} size="sm" /><span className="font-600 text-ink-900">{s.name}</span></div></td>
                  <td className="px-4 py-3"><input defaultValue={internal} className="input w-16 py-1.5 text-center" /></td>
                  <td className="px-4 py-3"><input defaultValue={assignment} className="input w-16 py-1.5 text-center" /></td>
                  <td className="px-4 py-3"><input defaultValue={mid} className="input w-16 py-1.5 text-center" /></td>
                  <td className="px-4 py-3 font-700 text-ink-900">{total}</td>
                  <td className="px-4 py-3"><Badge tone={grade === 'A' ? 'success' : grade === 'B' ? 'brand' : grade === 'C' ? 'warning' : 'danger'}>{grade}</Badge></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </>
  );
}

function Homework() {
  return (
    <>
      <PageHeader title="Homework" subtitle="Assigned & submissions" action={<button className="btn-primary text-sm"><Plus className="w-4 h-4" /> Create Homework</button>} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {homework.map((h) => (
          <Card key={h.id} className="p-5 card-hover">
            <div className="flex items-start justify-between">
              <span className={`chip text-white ${h.color}`}>{h.subject}</span>
              {h.status === 'pending' ? <Badge tone="warning" dot>Pending</Badge> : h.status === 'submitted' ? <Badge tone="accent" dot>Submitted</Badge> : <Badge tone="success" dot>Evaluated</Badge>}
            </div>
            <h3 className="font-700 text-ink-900 mt-3">{h.title}</h3>
            <div className="flex items-center gap-1.5 text-xs text-ink-400 mt-2"><Clock className="w-3.5 h-3.5" /> Due {h.due}</div>
            <div className="flex gap-2 mt-4">
              <button className="btn-outline text-xs px-3 py-1.5 flex-1">View</button>
              <button className="btn-ghost text-xs px-3 py-1.5">Edit</button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

function Timetable() {
  return (
    <>
      <PageHeader title="Timetable" subtitle="Weekly schedule" />
      <Card className="p-0 overflow-x-auto scrollbar-thin">
        <div className="grid grid-cols-[80px_repeat(5,1fr)] min-w-[700px]">
          <div className="bg-ink-50 border-b border-r border-ink-100 p-3 text-xs font-600 text-ink-500">Time</div>
          {timetable.map((d) => <div key={d.day} className="bg-ink-50 border-b border-r border-ink-100 p-3 text-xs font-700 text-ink-700 text-center">{d.day}</div>)}
          {['9:00', '10:00', '11:15', '12:15'].map((time, ti) => (
            <div key={`row-${time}`} className="contents">
              <div className="border-b border-r border-ink-100 p-3 text-xs font-600 text-ink-500 font-mono">{time}</div>
              {timetable.map((d) => {
                const p = d.periods[ti];
                return (
                  <div key={`${d.day}-${time}`} className="border-b border-r border-ink-100 p-2">
                    {p && (
                      <div className={`rounded-xl p-2.5 ${p.color} text-white`}>
                        <div className="font-600 text-xs">{p.subject}</div>
                        <div className="text-[10px] text-white/80 mt-0.5">{p.room}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

function AISchedule() {
  return (
    <>
      <PageHeader title="AI Teaching Schedule" subtitle="Class 10-A · Mathematics" action={<Badge tone="brand" dot>AI Generated</Badge>} />
      <Card className="p-5">
        <SectionTitle title="5-Week Teaching Plan" subtitle="Based on syllabus & performance data" />
        <div className="space-y-3">
          {[
            { w: 'Week 1', topic: 'Algebra', focus: 'Foundations & practice', done: true, color: 'bg-success-500' },
            { w: 'Week 2', topic: 'Geometry', focus: 'Theorems & proofs', done: true, color: 'bg-success-500' },
            { w: 'Week 3', topic: 'Trigonometry', focus: 'Weak area — extra drills', done: false, color: 'bg-warning-500' },
            { w: 'Week 4', topic: 'Revision', focus: 'Full syllabus recap', done: false, color: 'bg-brand-500' },
            { w: 'Week 5', topic: 'Assessment', focus: 'Mock exam + analysis', done: false, color: 'bg-accent-500' },
          ].map((w) => (
            <div key={w.w} className="flex items-center gap-4 p-3 rounded-xl bg-ink-50">
              <div className={`w-2.5 h-2.5 rounded-full ${w.color}`} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-700 text-ink-900 text-sm">{w.w}</span>
                  {w.done && <CheckCircle2 className="w-4 h-4 text-success-500" />}
                </div>
                <div className="text-sm text-ink-600">{w.topic} — <span className="text-ink-400">{w.focus}</span></div>
              </div>
              <button className="btn-ghost text-xs px-3 py-1.5">View plan</button>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

function Placeholder() {
  return (
    <Card className="p-10 text-center">
      <p className="font-600 text-ink-700">This module is ready for data.</p>
      <p className="text-sm text-ink-400 mt-1">Content populates as you add notes, students, and messages.</p>
    </Card>
  );
}

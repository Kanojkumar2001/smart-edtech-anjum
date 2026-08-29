import { useState } from 'react';
import {
  LayoutDashboard, CalendarCheck, ClipboardList, BookOpen, Calendar, CreditCard, MessageSquare, Award, Briefcase, Sparkles, Send, Bot, User, AlertTriangle, CheckCircle2, FileText, GraduationCap, Target, IndianRupee, CalendarClock,
} from 'lucide-react';
import { DashboardShell, PageHeader, type NavItem } from '@/components/DashboardShell';
import { Card, StatTile, Badge, Avatar, ProgressBar, SectionTitle, RiskBadge } from '@/components/ui';
import { LineChart, SubjectBars, RadialGauge, DonutChart, Legend } from '@/components/charts';
import { students, initialChat, suggestedQuestions, timetable, homework } from '@/data';
import type { ChatMessage } from '@/types';
import { useNav } from '@/nav';

const items: NavItem[] = [
  { id: 'dashboard', label: 'Student Dashboard', icon: LayoutDashboard },
  { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
  { id: 'marks', label: 'Marks', icon: ClipboardList },
  { id: 'homework', label: 'Homework', icon: BookOpen },
  { id: 'timetable', label: 'Timetable', icon: Calendar },
  { id: 'fees', label: 'Fees', icon: CreditCard },
  { id: 'achievements', label: 'Achievements', icon: Award },
  { id: 'career', label: 'Career & AI', icon: Briefcase },
  { id: 'chatbot', label: 'AI Assistant', icon: Sparkles },
  { id: 'chat', label: 'Teacher Chat', icon: MessageSquare },
];

export function ParentDashboard() {
  const { activeStudentId, setActiveStudentId } = useNav();
  const [active, setActive] = useState('dashboard');
  const student = students.find((s) => s.id === activeStudentId) || students[0];

  return (
    <DashboardShell role="parent" items={items} active={active} onNavigate={setActive}>
      {active === 'dashboard' && <Student360 student={student} onSwitch={setActiveStudentId} />}
      {active === 'attendance' && <Attendance student={student} />}
      {active === 'marks' && <Marks student={student} />}
      {active === 'homework' && <Homework />}
      {active === 'timetable' && <Timetable />}
      {active === 'fees' && <Fees student={student} />}
      {active === 'achievements' && <Achievements student={student} />}
      {active === 'career' && <Career student={student} />}
      {active === 'chatbot' && <Chatbot student={student} />}
      {active === 'chat' && <TeacherChat />}
    </DashboardShell>
  );
}

function StudentSwitcher({ student, onSwitch }: { student: typeof students[0]; onSwitch: (id: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2 mb-5">
      {students.map((s) => (
        <button
          key={s.id}
          onClick={() => onSwitch(s.id)}
          className={`flex items-center gap-2.5 p-2 pr-4 rounded-2xl border-2 transition-all ${s.id === student.id ? 'border-brand-400 bg-brand-50' : 'border-ink-100 bg-white hover:border-ink-200'}`}
        >
          <Avatar initials={s.initials} color={s.avatarColor} size="sm" />
          <div className="text-left">
            <div className="text-sm font-600 text-ink-900">{s.name}</div>
            <div className="text-[11px] text-ink-400">{s.className} · {s.section}</div>
          </div>
        </button>
      ))}
    </div>
  );
}

function Student360({ student, onSwitch }: { student: typeof students[0]; onSwitch: (id: string) => void }) {
  return (
    <>
      <StudentSwitcher student={student} onSwitch={onSwitch} />
      <PageHeader title="Student Dashboard" subtitle={`${student.name} · Roll ${student.rollNo} · ${student.branch}`} />

      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatTile label="Attendance" value={`${student.attendance}%`} icon={<CalendarCheck className="w-4 h-4" />} tone={student.attendance > 85 ? 'success' : 'warning'} />
        <StatTile label="CGPA" value={student.cgpa} icon={<GraduationCap className="w-4 h-4" />} tone="brand" />
        <StatTile label="Assignments" value={`${student.assignments}%`} icon={<ClipboardList className="w-4 h-4" />} tone="accent" />
        <StatTile label="Projects" value={`${student.projects}%`} icon={<FileText className="w-4 h-4" />} tone="success" />
        <StatTile label="Participation" value={`${student.participation}%`} icon={<Award className="w-4 h-4" />} tone="warning" />
      </div>

      {/* AI Insight banner */}
      <Card className="p-5 mt-5 bg-gradient-to-br from-brand-50 via-white to-accent-50 border-brand-100">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 text-white flex items-center justify-center shrink-0"><Bot className="w-6 h-6" /></div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-display font-700 text-ink-900">AI Insight</span>
              <Badge tone="brand" dot>Updated today</Badge>
            </div>
            <p className="text-sm text-ink-700 leading-relaxed">
              {student.riskLevel === 'Normal'
                ? `${student.name} has improved Mathematics performance by 12% during the last two assessments. Keep up the consistent practice.`
                : `${student.name}'s Mathematics performance decreased from ${student.subjects[0].previous}% to ${student.subjects[0].current}%. Attendance at ${student.attendance}% and homework completion at ${student.assignments - 30}%.`}
            </p>
            <div className="mt-3 p-3 rounded-xl bg-white/70 border border-brand-100">
              <p className="text-xs font-600 text-brand-700 uppercase tracking-wide">Recommendation</p>
              <p className="text-sm text-ink-700 mt-1">
                {student.subjects[0].status === 'weak'
                  ? `Increase ${student.subjects[0].subject} practice by 45 minutes/day. Predicted score: ${student.subjects[0].predicted}%.`
                  : `Maintain current pace. Focus on ${student.subjects.find((s) => s.status === 'average')?.subject || 'revision'} for steady improvement.`}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-5 mt-5">
        <Card className="p-5 lg:col-span-2">
          <SectionTitle title="Attendance Trend" subtitle="Last 6 months" action={<Badge tone={student.attendance > 85 ? 'success' : 'warning'} dot>{student.attendance}%</Badge>} />
          <LineChart data={student.attendanceTrend} />
        </Card>
        <Card className="p-5">
          <SectionTitle title="Risk Prediction" />
          <div className="flex items-center justify-center my-2">
            <RadialGauge value={student.riskScore} label="Risk Score" tone={student.riskScore < 40 ? '#1bb265' : student.riskScore < 70 ? '#f9b425' : '#e64d50'} />
          </div>
          <div className="flex justify-center mb-3"><RiskBadge level={student.riskLevel} /></div>
          <div className="space-y-2">
            {student.riskFactors.map((r) => (
              <div key={r.label} className="flex items-center justify-between text-sm">
                <span className="text-ink-600">{r.label}</span>
                <Badge tone={r.level === 'low' ? 'success' : r.level === 'medium' ? 'warning' : 'danger'} dot>{r.level === 'low' ? 'Low' : r.level === 'medium' ? 'Medium' : 'High'}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mt-5">
        <Card className="p-5">
          <SectionTitle title="Subject Performance" subtitle="Current scores" />
          <SubjectBars subjects={student.subjects} />
        </Card>
        <Card className="p-5">
          <SectionTitle title="Performance Prediction" subtitle="Current → Predicted → Target" />
          <div className="space-y-3">
            {student.subjects.map((s) => (
              <div key={s.subject} className="p-3 rounded-xl bg-ink-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-600 text-ink-900">{s.subject}</span>
                  {s.trend === 'up' ? <Badge tone="success" dot>Improving</Badge> : s.trend === 'down' ? <Badge tone="danger" dot>Declining</Badge> : <Badge tone="neutral" dot>Stable</Badge>}
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div><div className="text-[10px] text-ink-400">Current</div><div className="font-700 text-ink-900">{s.current}%</div></div>
                  <div><div className="text-[10px] text-ink-400">Predicted</div><div className="font-700 text-brand-600">{s.predicted}%</div></div>
                  <div><div className="text-[10px] text-ink-400">Target</div><div className="font-700 text-ink-400">85%</div></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Personalized study plan */}
      <Card className="p-5 mt-5">
        <SectionTitle title="AI Personalized Study Plan" subtitle="Generated from weak subjects & upcoming exams" action={<Badge tone="brand" dot>AI</Badge>} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {student.studyPlan.map((d) => (
            <div key={d.day} className="rounded-2xl border border-ink-100 p-3">
              <div className="font-700 text-ink-900 text-sm mb-2">{d.day}</div>
              <div className="space-y-2">
                {d.slots.map((slot, i) => (
                  <div key={i} className={`p-2 rounded-lg ${slot.priority === 'high' ? 'bg-danger-50' : slot.priority === 'medium' ? 'bg-warning-50' : 'bg-brand-50'}`}>
                    <div className="text-[10px] text-ink-400 font-mono">{slot.time}</div>
                    <div className="text-xs font-600 text-ink-900">{slot.subject}</div>
                    <div className="text-[10px] text-ink-500">{slot.focus}</div>
                  </div>
                ))}
                {d.slots.length === 0 && <div className="text-xs text-ink-300 text-center py-2">Rest day</div>}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

function Attendance({ student }: { student: typeof students[0] }) {
  return (
    <>
      <PageHeader title="Attendance" subtitle={`${student.name} · ${student.className}`} />
      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="p-5"><StatTile label="Overall Attendance" value={`${student.attendance}%`} tone={student.attendance > 85 ? 'success' : 'warning'} /></Card>
        <Card className="p-5 lg:col-span-2">
          <SectionTitle title="Monthly Trend" />
          <LineChart data={student.attendanceTrend} color="#337bff" />
        </Card>
      </div>
      <Card className="p-5 mt-5">
        <SectionTitle title="Subject-wise Attendance" />
        <div className="space-y-3">
          {student.subjects.map((s) => {
            const v = Math.min(95, s.current + 20);
            return <div key={s.subject}><div className="flex justify-between text-sm mb-1"><span className="font-500 text-ink-700">{s.subject}</span><span className="font-600 text-ink-900">{v}%</span></div><ProgressBar value={v} tone={v > 85 ? 'success' : 'warning'} /></div>;
          })}
        </div>
      </Card>
    </>
  );
}

function Marks({ student }: { student: typeof students[0] }) {
  return (
    <>
      <PageHeader title="Academic Performance" subtitle={`${student.name} · Marks & grades`} />
      <Card className="p-5">
        <SectionTitle title="Subject Scores" />
        <SubjectBars subjects={student.subjects} />
      </Card>
      <Card className="p-5 mt-5">
        <SectionTitle title="Performance Prediction" subtitle="AI-predicted outcomes" action={<Badge tone="brand" dot>AI</Badge>} />
        <div className="space-y-3">
          {student.subjects.map((s) => (
            <div key={s.subject} className="p-4 rounded-xl bg-ink-50">
              <div className="flex items-center justify-between mb-2">
                <span className="font-600 text-ink-900">{s.subject}</span>
                {s.status === 'weak' ? <Badge tone="danger" dot>Weak</Badge> : s.status === 'average' ? <Badge tone="warning" dot>Average</Badge> : <Badge tone="success" dot>Strong</Badge>}
              </div>
              <div className="grid grid-cols-3 gap-3 text-center text-sm">
                <div><div className="text-[10px] text-ink-400">Previous</div><div className="font-700 text-ink-900">{s.previous}%</div></div>
                <div><div className="text-[10px] text-ink-400">Current</div><div className="font-700 text-ink-900">{s.current}%</div></div>
                <div><div className="text-[10px] text-ink-400">Predicted</div><div className="font-700 text-brand-600">{s.predicted}%</div></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

function Homework() {
  return (
    <>
      <PageHeader title="Homework" subtitle="Assignments & submissions" />
      <div className="space-y-3">
        {homework.map((h) => (
          <Card key={h.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`w-10 h-10 rounded-xl ${h.color} text-white flex items-center justify-center`}><BookOpen className="w-5 h-5" /></span>
                <div><div className="font-600 text-ink-900">{h.title}</div><div className="text-xs text-ink-400">{h.subject} · Due {h.due}</div></div>
              </div>
              {h.status === 'pending' ? <Badge tone="warning" dot>Pending</Badge> : h.status === 'submitted' ? <Badge tone="accent" dot>Submitted</Badge> : <Badge tone="success" dot>Evaluated</Badge>}
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
      <PageHeader title="Timetable" subtitle="Weekly class schedule" />
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
                    {p && <div className={`rounded-xl p-2.5 ${p.color} text-white`}><div className="font-600 text-xs">{p.subject}</div><div className="text-[10px] text-white/80 mt-0.5">{p.room}</div></div>}
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

function Fees({ student }: { student: typeof students[0] }) {
  const remaining = student.fee.total - student.fee.paid;
  const pct = Math.round((student.fee.paid / student.fee.total) * 100);
  return (
    <>
      <PageHeader title="Fee Management" subtitle={student.name} action={<button className="btn-primary text-sm"><IndianRupee className="w-4 h-4" /> Pay Now</button>} />
      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="p-6">
          <div className="flex items-center justify-center mb-4">
            <DonutChart segments={[{ value: pct, color: '#1bb1ad' }, { value: 100 - pct, color: '#e9edf5' }]} centerLabel={`${pct}%`} centerSub="Paid" />
          </div>
          <Legend items={[{ label: 'Paid', color: '#1bb1ad' }, { label: 'Remaining', color: '#e9edf5' }]} />
        </Card>
        <Card className="p-6 lg:col-span-2">
          <div className="grid grid-cols-2 gap-4">
            <div><div className="text-xs text-ink-400">Total Fee</div><div className="font-display text-2xl font-800 text-ink-900">₹{student.fee.total.toLocaleString()}</div></div>
            <div><div className="text-xs text-ink-400">Paid</div><div className="font-display text-2xl font-800 text-success-600">₹{student.fee.paid.toLocaleString()}</div></div>
            <div><div className="text-xs text-ink-400">Remaining</div><div className="font-display text-2xl font-800 text-danger-600">₹{remaining.toLocaleString()}</div></div>
            <div><div className="text-xs text-ink-400">Due Date</div><div className="font-display text-lg font-700 text-ink-900 flex items-center gap-1"><CalendarClock className="w-4 h-4 text-ink-400" />{student.fee.due}</div></div>
          </div>
          <div className="mt-5">
            <div className="flex justify-between text-sm mb-1"><span className="text-ink-500">Payment progress</span><span className="font-600 text-ink-900">{pct}%</span></div>
            <ProgressBar value={pct} tone="brand" />
          </div>
          <div className="mt-5 p-4 rounded-xl bg-warning-50 border border-warning-100 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warning-600 shrink-0 mt-0.5" />
            <div><div className="font-600 text-ink-900 text-sm">Fee due reminder</div><div className="text-sm text-ink-600">₹{remaining.toLocaleString()} remaining — due {student.fee.due}. Late fee applies after due date.</div></div>
          </div>
        </Card>
      </div>
      <Card className="p-5 mt-5">
        <SectionTitle title="Payment History" />
        <div className="space-y-2">
          {[{ d: '10 Jun 2026', a: 20000, m: 'Term 1' }, { d: '15 Jul 2026', a: 15000, m: 'Term 2' }].map((p) => (
            <div key={p.d} className="flex items-center justify-between p-3 rounded-xl bg-ink-50">
              <div className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-success-500" /><div><div className="text-sm font-600 text-ink-900">{p.m}</div><div className="text-xs text-ink-400">{p.d}</div></div></div>
              <span className="font-700 text-ink-900">₹{p.a.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

function Achievements({ student }: { student: typeof students[0] }) {
  return (
    <>
      <PageHeader title="Achievements" subtitle={`${student.name} · Awards & activities`} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {student.achievements.map((a, i) => (
          <Card key={i} className="p-5 card-hover">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-warning-400 to-warning-600 text-white flex items-center justify-center mb-3"><Award className="w-5 h-5" /></div>
            <h3 className="font-700 text-ink-900 text-sm">{a.title}</h3>
            <div className="flex items-center gap-2 mt-2"><Badge tone="warning">{a.type}</Badge><span className="text-xs text-ink-400">{a.date}</span></div>
          </Card>
        ))}
      </div>
      <Card className="p-5 mt-5">
        <SectionTitle title="Skills" subtitle="Assessed proficiency" />
        <div className="space-y-3">
          {student.skills.map((s) => (
            <div key={s.name}>
              <div className="flex justify-between text-sm mb-1"><span className="font-500 text-ink-700">{s.name}</span><span className="font-600 text-ink-900">{s.level}%</span></div>
              <ProgressBar value={s.level} tone={s.level > 80 ? 'success' : s.level > 60 ? 'brand' : 'warning'} />
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

function Career({ student }: { student: typeof students[0] }) {
  return (
    <>
      <PageHeader title="Career & AI Recommendations" subtitle={student.name} action={<Badge tone="brand" dot>AI</Badge>} />
      <Card className="p-5">
        <SectionTitle title="AI Career Recommendations" subtitle="Based on skills, projects & interests" />
        <div className="space-y-3">
          {student.careers.map((c, i) => (
            <div key={i} className="p-4 rounded-2xl bg-ink-50 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-500 text-white flex items-center justify-center font-700 text-lg shrink-0">{i + 1}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-700 text-ink-900">{c.role}</h3>
                  <Badge tone={c.match > 85 ? 'success' : 'brand'}>{c.match}% match</Badge>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">{c.tags.map((t) => <span key={t} className="chip bg-white text-ink-600 border border-ink-100">{t}</span>)}</div>
                <ProgressBar value={c.match} tone={c.match > 85 ? 'success' : 'brand'} className="mt-3" />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5 mt-5">
        <SectionTitle title="Career Roadmap" subtitle={`Goal: ${student.careers[0].role}`} action={<Target className="w-5 h-5 text-brand-500" />} />
        <div className="relative pl-6">
          <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-ink-100" />
          {student.roadmap.map((r, i) => (
            <div key={i} className="relative mb-6 last:mb-0">
              <div className={`absolute -left-[18px] top-1 w-3.5 h-3.5 rounded-full ring-4 ring-white ${r.done ? 'bg-success-500' : 'bg-ink-200'}`} />
              <div className={`p-4 rounded-2xl ${r.done ? 'bg-success-50 border border-success-100' : 'bg-white border border-ink-100'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-700 text-ink-900">{r.phase}</span>
                  {r.done ? <Badge tone="success" dot>Complete</Badge> : <Badge tone="neutral" dot>In progress</Badge>}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {r.items.map((it) => <span key={it} className={`chip ${r.done ? 'bg-success-100 text-success-700' : 'bg-ink-100 text-ink-600'}`}>{it}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5 mt-5">
        <SectionTitle title="Hackathon Recommendations" />
        <div className="grid sm:grid-cols-2 gap-3">
          {['Smart India Hackathon', 'AI/ML Hackathon', 'Healthcare AI Challenge', 'Computer Vision Competition'].map((h, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-accent-50 border border-accent-100">
              <CheckCircle2 className="w-5 h-5 text-accent-600 shrink-0" />
              <span className="text-sm font-600 text-ink-900">{h}</span>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

function Chatbot({ student }: { student: typeof students[0] }) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialChat);
  const [input, setInput] = useState('');

  const respond = (q: string): string => {
    const lower = q.toLowerCase();
    if (lower.includes('decrease') || lower.includes('why')) {
      return `The main decline is in ${student.subjects[0].subject} and ${student.subjects[1].subject}. ${student.subjects[0].subject} decreased from ${student.subjects[0].previous}% to ${student.subjects[0].current}%. Possible factors: lower homework completion, reduced attendance, and lower internal assessment scores.`;
    }
    if (lower.includes('study') || lower.includes('today')) {
      return `Based on upcoming exams and current performance, I recommend:\n1. ${student.subjects[0].subject} — 60 minutes (priority)\n2. ${student.subjects[1].subject} — 40 minutes\n3. ${student.subjects[2].subject} — 30 minutes`;
    }
    if (lower.includes('subject') || lower.includes('attention') || lower.includes('weak')) {
      return `${student.subjects[0].subject} needs the most attention (current: ${student.subjects[0].current}%). ${student.subjects[1].subject} is also below target. Focus on these two this week.`;
    }
    if (lower.includes('career')) {
      return `Based on ${student.name}'s profile, top career matches: ${student.careers.slice(0, 3).map((c) => c.role).join(', ')}.`;
    }
    return `I can help with ${student.name}'s performance, weak subjects, study plans, and career recommendations. Try asking about attendance, marks, or what to study today.`;
  };

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { id: `u${Date.now()}`, from: 'user', text, time: 'Now' };
    const aiMsg: ChatMessage = { id: `a${Date.now()}`, from: 'ai', text: respond(text), time: 'Now' };
    setMessages((m) => [...m, userMsg, aiMsg]);
    setInput('');
  };

  return (
    <>
      <PageHeader title="EduVision AI Assistant" subtitle={`Ask about ${student.name}'s performance`} action={<Badge tone="brand" dot>AI</Badge>} />
      <Card className="p-0 overflow-hidden flex flex-col" >
        <div className="p-4 bg-gradient-to-r from-brand-500 to-accent-500 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center"><Bot className="w-5 h-5" /></div>
            <div><div className="font-700">EduVision AI</div><div className="text-xs text-white/70">Always here to help</div></div>
          </div>
        </div>
        <div className="p-4 space-y-3 max-h-[420px] overflow-y-auto scrollbar-thin bg-ink-50/50">
          {messages.map((m) => (
            <div key={m.id} className={`flex gap-2.5 ${m.from === 'user' ? 'flex-row-reverse' : ''} animate-fade-in-fast`}>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${m.from === 'ai' ? 'bg-brand-500 text-white' : 'bg-ink-200 text-ink-600'}`}>
                {m.from === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>
              <div className={`max-w-[75%] p-3 rounded-2xl text-sm whitespace-pre-line ${m.from === 'ai' ? 'bg-white border border-ink-100 text-ink-700' : 'bg-brand-500 text-white'}`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-ink-100">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {suggestedQuestions.map((q) => (
              <button key={q} onClick={() => send(q)} className="chip bg-ink-100 text-ink-600 hover:bg-brand-50 hover:text-brand-700 transition-colors text-xs">{q}</button>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send(input)} placeholder="Ask EduVision AI..." className="input flex-1" />
            <button onClick={() => send(input)} className="btn-primary px-3"><Send className="w-4 h-4" /></button>
          </div>
        </div>
      </Card>
    </>
  );
}

function TeacherChat() {
  const [messages, setMessages] = useState<{ from: 'teacher' | 'parent'; text: string; time: string }[]>([
    { from: 'teacher', text: "Hello! Rahul is having difficulty understanding Mathematics.", time: '10:30 AM' },
    { from: 'parent', text: "I see. What can we do at home?", time: '10:32 AM' },
    { from: 'teacher', text: "I recommend revising Algebra. I'll also conduct a doubt session tomorrow at 3 PM.", time: '10:33 AM' },
  ]);
  const [input, setInput] = useState('');
  return (
    <>
      <PageHeader title="Parent-Teacher Chat" subtitle="Anita Rao · Mathematics" />
      <Card className="p-0 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-ink-100 flex items-center gap-3">
          <Avatar initials="AR" color="bg-brand-500" />
          <div><div className="font-700 text-ink-900">Anita Rao</div><div className="text-xs text-success-600 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-success-500" /> Online</div></div>
        </div>
        <div className="p-4 space-y-3 max-h-[420px] overflow-y-auto scrollbar-thin bg-ink-50/50">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === 'parent' ? 'justify-end' : 'justify-start'} animate-fade-in-fast`}>
              <div className={`max-w-[75%] p-3 rounded-2xl text-sm ${m.from === 'parent' ? 'bg-brand-500 text-white' : 'bg-white border border-ink-100 text-ink-700'}`}>
                {m.text}
                <div className={`text-[10px] mt-1 ${m.from === 'parent' ? 'text-white/60' : 'text-ink-400'}`}>{m.time}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-ink-100 flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (setMessages((m) => [...m, { from: 'parent', text: input, time: 'Now' }]), setInput(''))} placeholder="Type a message..." className="input flex-1" />
          <button onClick={() => { setMessages((m) => [...m, { from: 'parent', text: input, time: 'Now' }]); setInput(''); }} className="btn-primary px-3"><Send className="w-4 h-4" /></button>
        </div>
      </Card>
    </>
  );
}

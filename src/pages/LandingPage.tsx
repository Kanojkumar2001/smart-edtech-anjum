import { useState } from 'react';
import { Star, Users, GraduationCap, MapPin, ArrowRight, Plus, Search, ShieldCheck, BrainCircuit, LineChart, Sparkles, CheckCircle2, Clock } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Badge } from '@/components/ui';
import { useNav } from '@/nav';
import { schools } from '@/data';

export function LandingPage() {
  const { go, setActiveSchoolId } = useNav();
  const [query, setQuery] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  const filtered = schools.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase()) || s.board.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-ink-50">
      {/* Nav */}
      <header className="sticky top-0 z-40 glass border-b border-ink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center gap-1 text-sm">
            <a className="px-3 py-2 text-ink-600 hover:text-ink-900 font-500" href="#schools">Schools</a>
            <a className="px-3 py-2 text-ink-600 hover:text-ink-900 font-500" href="#features">Features</a>
            <a className="px-3 py-2 text-ink-600 hover:text-ink-900 font-500" href="#ai">AI Engine</a>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => go({ name: 'login', role: 'admin' })} className="btn-ghost text-sm hidden sm:inline-flex">Admin</button>
            <button onClick={() => go({ name: 'login', role: 'parent' })} className="btn-primary text-sm">Sign in</button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-mesh">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-20 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <Badge tone="brand" dot>AI-Powered Student Intelligence</Badge>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-800 text-ink-900 mt-4 leading-[1.05] text-balance">
              Smart Intelligence <span className="text-brand-500">Learning</span> & Performance Prediction
            </h1>
            <p className="text-lg text-ink-500 mt-5 max-w-xl leading-relaxed">
              EduVision connects school administration, principals, teachers, students, and parents on one platform — with AI that predicts performance, detects weak subjects, and personalizes learning.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <a href="#schools" className="btn-primary">
                Find Your School <ArrowRight className="w-4 h-4" />
              </a>
              <button onClick={() => setShowRegister(true)} className="btn-outline">
                <Plus className="w-4 h-4" /> Register School
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 text-sm text-ink-500">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-brand-500" /> Role-based access</span>
              <span className="flex items-center gap-1.5"><BrainCircuit className="w-4 h-4 text-brand-500" /> AI predictions</span>
              <span className="flex items-center gap-1.5"><LineChart className="w-4 h-4 text-brand-500" /> 360° analytics</span>
            </div>
          </div>

          {/* Hero card */}
          <div className="relative animate-scale-in">
            <div className="card p-6 max-w-md ml-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center"><Sparkles className="w-5 h-5" /></div>
                  <span className="font-display font-700 text-ink-900">AI Insight</span>
                </div>
                <Badge tone="warning" dot>Needs Attention</Badge>
              </div>
              <p className="text-sm text-ink-600 leading-relaxed">
                Rahul's Mathematics performance decreased from <b className="text-ink-900">72% to 54%</b>. Attendance at 82%, homework completion at 60%.
              </p>
              <div className="mt-4 p-3 rounded-xl bg-brand-50 border border-brand-100">
                <p className="text-xs font-600 text-brand-700 uppercase tracking-wide">Recommendation</p>
                <p className="text-sm text-ink-700 mt-1">Increase Mathematics practice by 45 minutes/day. Predicted score: <b>65–72%</b>.</p>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4">
                {[{ l: 'Predicted', v: '66%' }, { l: 'Risk', v: 'Medium' }, { l: 'Trend', v: 'Declining' }].map((s) => (
                  <div key={s.l} className="rounded-xl bg-ink-50 p-2.5 text-center">
                    <div className="font-display font-700 text-ink-900 text-sm">{s.v}</div>
                    <div className="text-[10px] text-ink-400">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -top-4 -left-4 card p-3 animate-float hidden sm:block">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-success-50 text-success-600 flex items-center justify-center"><CheckCircle2 className="w-4 h-4" /></div>
                <div>
                  <div className="text-xs font-600 text-ink-900">2,450 Students</div>
                  <div className="text-[10px] text-ink-400">Across 5 schools</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location + Schools */}
      <section id="schools" className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-brand-600 text-sm font-600">
              <MapPin className="w-4 h-4" /> Selected Location
            </div>
            <h2 className="font-display text-3xl font-800 text-ink-900 mt-1">Ongole, Andhra Pradesh</h2>
            <p className="text-ink-500 mt-1">Find your school and access role-based dashboards.</p>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-ink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search school or board..." className="input pl-10" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((s, i) => (
            <div
              key={s.id}
              className="card card-hover p-5 animate-slide-up cursor-pointer group"
              style={{ animationDelay: `${i * 60}ms` }}
              onClick={() => { setActiveSchoolId(s.id); go({ name: 'login', role: 'parent' }); }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl ${s.logoColor} text-white font-800 flex items-center justify-center`}>{s.logoInitials}</div>
                  <div>
                    <h3 className="font-display font-700 text-ink-900 leading-tight">{s.name}</h3>
                    <p className="text-xs text-ink-400 mt-0.5">{s.city} · {s.board}</p>
                  </div>
                </div>
                {s.status === 'pending' ? (
                  <Badge tone="warning"><Clock className="w-3 h-3" /> Pending</Badge>
                ) : (
                  <Badge tone="success" dot>Approved</Badge>
                )}
              </div>

              <div className="flex items-center gap-1 mt-4">
                <Star className="w-4 h-4 fill-warning-400 text-warning-400" />
                <span className="font-700 text-ink-900 text-sm">{s.rating}</span>
                <span className="text-xs text-ink-400">· {s.board}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                <div className="rounded-xl bg-ink-50 py-2">
                  <div className="font-700 text-ink-900 text-sm">{s.students.toLocaleString()}</div>
                  <div className="text-[10px] text-ink-400 flex items-center justify-center gap-1"><Users className="w-3 h-3" /> Students</div>
                </div>
                <div className="rounded-xl bg-ink-50 py-2">
                  <div className="font-700 text-ink-900 text-sm">{s.teachers}</div>
                  <div className="text-[10px] text-ink-400 flex items-center justify-center gap-1"><GraduationCap className="w-3 h-3" /> Teachers</div>
                </div>
                <div className="rounded-xl bg-ink-50 py-2">
                  <div className="font-700 text-ink-900 text-sm">{s.classes}</div>
                  <div className="text-[10px] text-ink-400">Classes</div>
                </div>
              </div>

              <button className="mt-4 w-full btn-outline group-hover:bg-brand-500 group-hover:text-white group-hover:border-brand-500 text-sm">
                View School <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}

          {/* Add School card */}
          <button
            onClick={() => setShowRegister(true)}
            className="card card-hover p-5 flex flex-col items-center justify-center gap-3 border-dashed border-2 border-ink-200 bg-ink-50/50 min-h-[220px] animate-slide-up"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center"><Plus className="w-6 h-6" /></div>
            <div>
              <h3 className="font-display font-700 text-ink-900">Add School</h3>
              <p className="text-xs text-ink-400 mt-1 text-center max-w-[180px]">Register a new school on EduVision</p>
            </div>
          </button>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-white border-y border-ink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge tone="accent">Platform Modules</Badge>
            <h2 className="font-display text-3xl font-800 text-ink-900 mt-3">One platform, every role</h2>
            <p className="text-ink-500 mt-2">From administration to AI-powered student intelligence — EduVision serves the whole school ecosystem.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: ShieldCheck, tone: 'bg-brand-50 text-brand-600', title: 'Admin', desc: 'Manage schools, teachers, admissions, classes, fees, roles & approvals.' },
              { icon: LineChart, tone: 'bg-accent-50 text-accent-600', title: 'Principal', desc: 'Intelligence dashboard with attendance, performance & teacher monitoring.' },
              { icon: GraduationCap, tone: 'bg-success-50 text-success-600', title: 'Teacher', desc: 'Attendance, marks, homework, notes, timetable & AI teaching schedule.' },
              { icon: Sparkles, tone: 'bg-warning-50 text-warning-600', title: 'Parent', desc: '360° student view, AI insights, career maps, chat, fees & PTM booking.' },
            ].map((f, i) => (
              <div key={i} className="card p-5 animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className={`w-11 h-11 rounded-2xl ${f.tone} flex items-center justify-center mb-4`}>
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-700 text-ink-900">{f.title}</h3>
                <p className="text-sm text-ink-500 mt-1.5 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Engine */}
      <section id="ai" className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <Badge tone="brand" dot>Intelligence Layer</Badge>
            <h2 className="font-display text-3xl font-800 text-ink-900 mt-3">AI that understands every student</h2>
            <p className="text-ink-500 mt-2 leading-relaxed">EduVision goes beyond school management. It analyzes marks, attendance, homework, and participation to predict outcomes and recommend personalized learning.</p>
            <div className="space-y-3 mt-6">
              {[
                { t: 'Performance Prediction', d: 'Expected scores with risk-level classification.' },
                { t: 'Weak Subject Detection', d: 'Identifies declining subjects with actionable reasons.' },
                { t: 'Personalized Study Plan', d: 'Daily schedules tuned to weak areas & upcoming exams.' },
                { t: 'Career Recommendation', d: 'Career paths, roadmap & hackathon matching.' },
                { t: 'AI Chatbot', d: 'Conversational assistant for parents and students.' },
              ].map((x, i) => (
                <div key={i} className="flex items-start gap-3 animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="w-7 h-7 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center shrink-0 mt-0.5"><CheckCircle2 className="w-4 h-4" /></div>
                  <div>
                    <div className="font-600 text-ink-900 text-sm">{x.t}</div>
                    <div className="text-sm text-ink-500">{x.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card p-6 animate-scale-in">
            <div className="flex items-center gap-2 mb-4">
              <BrainCircuit className="w-5 h-5 text-brand-500" />
              <span className="font-display font-700 text-ink-900">AI Risk Prediction</span>
            </div>
            <div className="space-y-3">
              {[
                { l: 'Academic Risk', v: 'Medium', c: 'bg-warning-500' },
                { l: 'Attendance Risk', v: 'Low', c: 'bg-success-500' },
                { l: 'Assignment Risk', v: 'High', c: 'bg-danger-500' },
              ].map((r) => (
                <div key={r.l} className="flex items-center justify-between p-3 rounded-xl bg-ink-50">
                  <span className="text-sm font-500 text-ink-700">{r.l}</span>
                  <span className={`chip ${r.c} text-white`}>{r.v}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 text-white">
              <div className="text-xs font-600 uppercase tracking-wide text-white/70">Risk Score</div>
              <div className="font-display text-3xl font-800 mt-1">72<span className="text-lg text-white/70">/100</span></div>
              <div className="text-sm text-white/80 mt-1">High — attendance declining, math marks declining</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink-950 text-ink-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Logo light />
            <p className="text-sm text-ink-400 mt-4 max-w-xs">Smart Intelligence Learning & Performance Prediction Platform.</p>
          </div>
          <div>
            <h4 className="font-600 text-white text-sm mb-3">Platform</h4>
            <ul className="space-y-2 text-sm text-ink-400">
              <li><a href="#schools" className="hover:text-white">Schools</a></li>
              <li><a href="#features" className="hover:text-white">Modules</a></li>
              <li><a href="#ai" className="hover:text-white">AI Engine</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-600 text-white text-sm mb-3">Roles</h4>
            <ul className="space-y-2 text-sm text-ink-400">
              <li><button onClick={() => go({ name: 'login', role: 'admin' })} className="hover:text-white">Admin</button></li>
              <li><button onClick={() => go({ name: 'login', role: 'principal' })} className="hover:text-white">Principal</button></li>
              <li><button onClick={() => go({ name: 'login', role: 'teacher' })} className="hover:text-white">Teacher</button></li>
              <li><button onClick={() => go({ name: 'login', role: 'parent' })} className="hover:text-white">Parent</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-600 text-white text-sm mb-3">Location</h4>
            <p className="text-sm text-ink-400">Ongole, Prakasam District, Andhra Pradesh, India</p>
          </div>
        </div>
        <div className="border-t border-ink-800 py-5 text-center text-xs text-ink-500">© 2026 EduVision. Smart Intelligence Learning Platform.</div>
      </footer>

      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </div>
  );
}

function RegisterModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in-fast">
      <div className="absolute inset-0 bg-ink-950/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative card p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto scrollbar-thin animate-scale-in">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display text-xl font-800 text-ink-900">Register School</h3>
            <p className="text-sm text-ink-500">Submit details for admin verification.</p>
          </div>
          <button onClick={onClose} className="btn-ghost px-2 py-2 text-ink-400 hover:text-ink-900">✕</button>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {['School Name', 'School Code', 'Address', 'City', 'District', 'State', 'Principal Name', 'Official Email', 'Phone Number', 'Board', 'Classes', 'Number of Students', 'Number of Teachers'].map((f) => (
            <div key={f} className={f === 'Address' ? 'sm:col-span-2' : ''}>
              <label className="text-xs font-600 text-ink-600 mb-1 block">{f}</label>
              <input className="input" placeholder={f} />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <label className="text-xs font-600 text-ink-600 mb-1 block">School Logo</label>
          <div className="rounded-xl border-2 border-dashed border-ink-200 p-6 text-center text-sm text-ink-400 hover:border-brand-400 hover:text-brand-600 cursor-pointer transition-colors">
            Click to upload logo
          </div>
        </div>
        <div className="flex items-center gap-2 mt-5">
          <button onClick={onClose} className="btn-primary flex-1">Submit for Verification</button>
          <button onClick={onClose} className="btn-outline">Cancel</button>
        </div>
      </div>
    </div>
  );
}

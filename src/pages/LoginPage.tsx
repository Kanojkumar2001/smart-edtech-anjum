import { useState } from 'react';
import { ArrowLeft, ShieldCheck, GraduationCap, LineChart, Sparkles, KeyRound, Mail, Lock, ArrowRight, CheckCircle2, AlertCircle, UserRound } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { useNav } from '@/nav';
import { useApp } from '@/context/AppContext';
import type { Role } from '@/types';
import { ApiError } from '@/lib/api';

const roles: { id: Role; label: string; desc: string; icon: typeof ShieldCheck; tone: string }[] = [
  { id: 'admin', label: 'Admin', desc: 'Platform & school administration', icon: ShieldCheck, tone: 'bg-brand-50 text-brand-600 border-brand-200' },
  { id: 'principal', label: 'Principal', desc: 'Intelligence dashboard', icon: LineChart, tone: 'bg-accent-50 text-accent-600 border-accent-200' },
  { id: 'teacher', label: 'Teacher', desc: 'Classes, marks & homework', icon: GraduationCap, tone: 'bg-success-50 text-success-600 border-success-200' },
  { id: 'parent', label: 'Parent', desc: '360° student view & AI', icon: Sparkles, tone: 'bg-warning-50 text-warning-600 border-warning-200' },
];

const demoEmail: Record<Role, string> = {
  admin: 'admin@eduvision.in',
  principal: 'principal@eduvision.in',
  teacher: 'teacher@eduvision.in',
  parent: 'parent@eduvision.in',
};

export function LoginPage() {
  const { route, go } = useNav();
  const { schools, login, dbStatus } = useApp();
  const role = (route.name === 'login' ? route.role : 'parent') as Role;
  const [mode] = useState<'signin'>('signin');
  const [step, setStep] = useState<'role' | 'creds'>('role');
  const [selectedRole, setSelectedRole] = useState<Role>(role);
  const [schoolCode, setSchoolCode] = useState('');
  const [email, setEmail] = useState(demoEmail[role]);
  const [password, setPassword] = useState('demo1234');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const matchedSchool = schools.find((s) => s.code === schoolCode);
  const isSignup = false;

  const submit = async () => {
    setError('');
    setBusy(true);
    try {
      await login(email, password, selectedRole, schoolCode);
      go({ name: 'dashboard', role: selectedRole });
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Unable to reach the server. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-ink-950 via-ink-900 to-brand-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="relative">
          <Logo light />
        </div>
        <div className="relative">
          <h2 className="font-display text-4xl font-800 leading-tight max-w-md text-balance">
            One platform for the <span className="text-brand-400">entire school ecosystem.</span>
          </h2>
          <p className="text-ink-300 mt-4 max-w-md">Sign in with your school code and role to access personalized dashboards.</p>
          <div className="grid grid-cols-2 gap-3 mt-8 max-w-md">
            {[
              { v: String(schools.reduce((n, s) => n + s.students, 0).toLocaleString()), l: 'Students' },
              { v: String(schools.reduce((n, s) => n + s.teachers, 0)), l: 'Teachers' },
              { v: String(schools.length), l: 'Schools' },
              { v: dbStatus === 'connected' ? 'Online' : 'Offline', l: 'Platform' },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur-sm">
                <div className="font-display text-2xl font-800">{s.v}</div>
                <div className="text-xs text-ink-400">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative text-xs text-ink-400">© 2026 EduVision · Smart Intelligence Learning</div>
      </div>

      <div className="flex flex-col">
        <div className="p-6 flex items-center justify-between">
          <button onClick={() => go({ name: 'landing' })} className="btn-ghost text-sm">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="lg:hidden"><Logo size="sm" /></div>
        </div>

        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            {step === 'role' ? (
              <div className="animate-fade-in">
                <h1 className="font-display text-3xl font-800 text-ink-900">Select your role</h1>
                <p className="text-ink-500 mt-2">Choose how you'll sign in to EduVision.</p>
                <div className="grid sm:grid-cols-2 gap-3 mt-6">
                  {roles.map((r) => {
                    const active = selectedRole === r.id;
                    return (
                      <button
                        key={r.id}
                        onClick={() => {
                          setSelectedRole(r.id);
                          setEmail(demoEmail[r.id]);
                        }}
                        className={`text-left p-4 rounded-2xl border-2 transition-all duration-200 ${active ? `${r.tone} scale-[1.02]` : 'border-ink-100 bg-white hover:border-ink-200'}`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${active ? 'bg-white/70' : r.tone}`}>
                          <r.icon className="w-5 h-5" />
                        </div>
                        <div className="font-700 text-ink-900">{r.label}</div>
                        <div className="text-xs text-ink-500 mt-0.5">{r.desc}</div>
                      </button>
                    );
                  })}
                </div>
                <button onClick={() => setStep('creds')} className="btn-primary w-full mt-6">
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="animate-fade-in">
                <button onClick={() => setStep('role')} className="btn-ghost text-sm mb-4 px-2">
                  <ArrowLeft className="w-4 h-4" /> Change role
                </button>
                <h1 className="font-display text-3xl font-800 text-ink-900">Sign in as {selectedRole}</h1>
                <p className="text-ink-500 mt-2">Enter your school code and credentials.</p>

                {dbStatus === 'offline' && (
                  <div className="mt-4 flex items-start gap-2 rounded-xl bg-danger-50 border border-danger-100 p-3 text-sm text-danger-700">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    The server is offline. Start the app with npm run dev and try again.
                  </div>
                )}

                <div className="space-y-4 mt-6">
                  <div>
                    <label className="text-xs font-600 text-ink-600 mb-1.5 block">School Code</label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-ink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        value={schoolCode}
                        onChange={(e) => setSchoolCode(e.target.value.replace(/\D/g, '').slice(0, 8))}
                        placeholder="8-digit code"
                        className="input pl-10 font-mono tracking-widest"
                      />
                    </div>
                    {matchedSchool && (
                      <div className="mt-2 flex items-center gap-2 text-xs text-success-700 animate-fade-in-fast">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {matchedSchool.name}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-600 text-ink-600 mb-1.5 block">Email</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-ink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input value={email} onChange={(e) => setEmail(e.target.value)} className="input pl-10" placeholder="you@school.edu" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-600 text-ink-600 mb-1.5 block">Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-ink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input pl-10" placeholder="••••••••" />
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-start gap-2 rounded-xl bg-danger-50 border border-danger-100 p-3 text-sm text-danger-700">
                      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" /> {error}
                    </div>
                  )}

                  <button disabled={busy} onClick={submit} className="btn-primary w-full">
                    {busy ? 'Signing in…' : 'Sign in'} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

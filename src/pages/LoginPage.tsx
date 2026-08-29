import { useState } from 'react';
import { ArrowLeft, ShieldCheck, GraduationCap, LineChart, Sparkles, KeyRound, Mail, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { useNav } from '@/nav';
import { schools } from '@/data';
import type { Role } from '@/types';

const roles: { id: Role; label: string; desc: string; icon: typeof ShieldCheck; tone: string }[] = [
  { id: 'admin', label: 'Admin', desc: 'Platform & school administration', icon: ShieldCheck, tone: 'bg-brand-50 text-brand-600 border-brand-200' },
  { id: 'principal', label: 'Principal', desc: 'Intelligence dashboard', icon: LineChart, tone: 'bg-accent-50 text-accent-600 border-accent-200' },
  { id: 'teacher', label: 'Teacher', desc: 'Classes, marks & homework', icon: GraduationCap, tone: 'bg-success-50 text-success-600 border-success-200' },
  { id: 'parent', label: 'Parent', desc: '360° student view & AI', icon: Sparkles, tone: 'bg-warning-50 text-warning-600 border-warning-200' },
];

export function LoginPage() {
  const { route, go } = useNav();
  const role = (route.name === 'login' ? route.role : 'parent') as Role;
  const [step, setStep] = useState<'role' | 'creds'>('role');
  const [selectedRole, setSelectedRole] = useState<Role>(role);
  const [schoolCode, setSchoolCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const matchedSchool = schools.find((s) => s.code === schoolCode);

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left brand panel */}
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
          <p className="text-ink-300 mt-4 max-w-md">Sign in with your school code and role to access personalized dashboards, AI insights, and real-time updates.</p>
          <div className="grid grid-cols-2 gap-3 mt-8 max-w-md">
            {[
              { v: '2,450', l: 'Students' },
              { v: '125', l: 'Teachers' },
              { v: '5', l: 'Schools' },
              { v: '91%', l: 'Avg Attendance' },
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

      {/* Right form panel */}
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
                        onClick={() => setSelectedRole(r.id)}
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
                    <p className="text-[11px] text-ink-400 mt-1.5">Demo: try code 72849163</p>
                  </div>

                  <div>
                    <label className="text-xs font-600 text-ink-600 mb-1.5 block">Email or Mobile</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-ink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input className="input pl-10" placeholder="you@school.edu" defaultValue={selectedRole === 'parent' ? 'parent@eduvision.in' : selectedRole === 'teacher' ? 'teacher@eduvision.in' : selectedRole === 'principal' ? 'principal@eduvision.in' : 'admin@eduvision.in'} />
                    </div>
                  </div>

                  {otpSent ? (
                    <div>
                      <label className="text-xs font-600 text-ink-600 mb-1.5 block">OTP</label>
                      <input className="input font-mono tracking-[0.5em] text-center" placeholder="••••" maxLength={4} />
                      <p className="text-[11px] text-ink-400 mt-1.5">Enter the 4-digit code sent to your device.</p>
                    </div>
                  ) : (
                    <div>
                      <label className="text-xs font-600 text-ink-600 mb-1.5 block">Password</label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-ink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input type="password" className="input pl-10" placeholder="••••••••" defaultValue="demo1234" />
                      </div>
                    </div>
                  )}

                  <button onClick={() => go({ name: 'dashboard', role: selectedRole })} className="btn-primary w-full">
                    {otpSent ? 'Verify & Sign in' : 'Sign in'} <ArrowRight className="w-4 h-4" />
                  </button>

                  <button onClick={() => setOtpSent((v) => !v)} className="w-full text-center text-sm text-brand-600 hover:text-brand-700 font-600">
                    {otpSent ? 'Use password instead' : 'Sign in with OTP instead'}
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

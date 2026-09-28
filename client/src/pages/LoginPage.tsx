import { useState } from "react";
import { ArrowRight, BriefcaseBusiness, Check, Eye, GraduationCap, LockKeyhole, Mail, Sparkles } from "lucide-react";
import CamaMark from "@/components/CamaMark";
import type { AppRole } from "@/contexts/SessionContext";
import { toast } from "sonner";

export default function LoginPage({ onComplete }: { onComplete: (role: AppRole) => void }) {
  const [role, setRole] = useState<AppRole>("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) { toast("Enter your email and password to continue."); return; }
    onComplete(role);
  };

  return <main className="cama-auth-page">
    <div className="auth-orbit orbit-one" /><div className="auth-orbit orbit-two" />
    <section className="auth-intro"><div className="auth-brand"><span className="brand-glyph"><CamaMark size={25} /></span><span><strong>CAMA</strong><small>CAREER ALIGNMENT ENGINE</small></span></div><div className="auth-hero-copy"><span className="auth-kicker"><Sparkles size={14} /> BUILT FOR YOUR NEXT MOVE</span><h1>Find the signal<br /><em>behind your potential.</em></h1><p>One intelligent workspace for students building their careers and mentors building their impact.</p><div className="auth-proof"><span><Check size={14} /> Skill intelligence</span><span><Check size={14} /> Human guidance</span><span><Check size={14} /> Career momentum</span></div></div><div className="auth-footnote">SIH26134 · CAREER ALIGNMENT & LABOUR-MARKET INTELLIGENCE</div></section>
    <section className="auth-panel"><div className="auth-panel-top"><span>WELCOME BACK</span><span className="auth-live-dot" /> Secure prototype access</div><h2>Sign in to CAMA</h2><p className="auth-sub">Choose your workspace before you continue.</p><div className="role-switch" role="tablist" aria-label="Choose workspace"><button className={role === "student" ? "active" : ""} onClick={() => setRole("student")}><GraduationCap size={18} /><span><b>Student</b><small>Learn · Build · Get ready</small></span></button><button className={role === "mentor" ? "active mentor" : ""} onClick={() => setRole("mentor")}><BriefcaseBusiness size={18} /><span><b>Mentor</b><small>Guide · Earn · Grow</small></span></button></div><form onSubmit={submit}><label htmlFor="cama-email"><Mail size={14} /> Email address</label><input id="cama-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder={role === "student" ? "you@college.edu" : "mentor@email.com"} autoComplete="email" /><label htmlFor="cama-password"><LockKeyhole size={14} /> Password</label><div className="auth-password"><input id="cama-password" type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" autoComplete="current-password" /><button type="button" onClick={() => setShowPassword((value) => !value)} aria-label="Show password"><Eye size={15} /></button></div><div className="auth-form-meta"><label className="remember"><input type="checkbox" defaultChecked /> <span>Remember me</span></label><button type="button" className="auth-link" onClick={() => toast("Password recovery will connect in the next integration pass.")}>Forgot password?</button></div><button className="auth-submit" type="submit">Continue as {role === "student" ? "Student" : "Mentor"} <ArrowRight size={17} /></button></form><button className="auth-demo" onClick={() => { setEmail(role === "student" ? "student@cama.demo" : "mentor@cama.demo"); setPassword("demo123"); }}>Use demo account <span>demo123</span></button><p className="auth-terms">By continuing, you agree to CAMA&apos;s prototype terms and privacy notice.</p></section>
  </main>;
}

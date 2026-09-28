/* CAMA student setup: keeps legacy profile values, then captures the richer SIH prototype context. */
import { useState } from "react";
import { ArrowLeft, ArrowRight, Compass } from "lucide-react";
import CamaMark from "./CamaMark";
import { useStudent, type StudentProfile } from "@/contexts/StudentContext";

const DEPARTMENTS = ["Computer Science & Engineering", "Information Technology", "Electronics & Communication", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering", "Artificial Intelligence & Data Science", "Other"];
const LEVELS = ["Beginner", "Intermediate", "Advanced", "Final-year / Placement ready"];
const LANGUAGES = ["English", "Tamil", "Hindi", "Telugu", "Malayalam", "Kannada", "English + Tamil", "Other"];
const CAREER_GOALS = ["Software Engineer", "AI/ML Engineer", "Data Scientist", "Cybersecurity Engineer", "Full Stack Developer", "Cloud Engineer", "Product Manager", "Other"];
const TARGET_COMPANIES = ["Google", "Microsoft", "Amazon", "TCS", "Infosys", "Accenture", "Deloitte", "Apple", "Meta"];
const TOTAL_STEPS = 6;

export default function Onboarding({ onComplete }: { onComplete: () => void }) {
  const { profile, setProfile } = useStudent();
  const [step, setStep] = useState(1);
  const [name, setName] = useState(profile?.name ?? "");
  const [department, setDepartment] = useState(profile?.department ?? "");
  const [departmentOther, setDepartmentOther] = useState("");
  const [learningLevel, setLearningLevel] = useState(profile?.learningLevel ?? "");
  const [preferredLanguage, setPreferredLanguage] = useState(profile?.preferredLanguage ?? "");
  const [languageOther, setLanguageOther] = useState("");
  const [careerGoal, setCareerGoal] = useState(profile?.careerGoal ?? "");
  const [careerGoalOther, setCareerGoalOther] = useState("");
  const [targetCompany, setTargetCompany] = useState(profile?.targetCompany ?? "");

  const resolvedDepartment = department === "Other" ? departmentOther.trim() : department;
  const resolvedLanguage = preferredLanguage === "Other" ? languageOther.trim() : preferredLanguage;
  const resolvedCareerGoal = careerGoal === "Other" ? careerGoalOther.trim() : careerGoal;
  const canAdvance = (step === 1 && name.trim()) || (step === 2 && resolvedDepartment) || (step === 3 && learningLevel) || (step === 4 && resolvedLanguage) || (step === 5 && resolvedCareerGoal) || (step === 6 && targetCompany.trim());

  const handleNext = () => {
    if (!canAdvance) return;
    if (step < TOTAL_STEPS) { setStep((value) => value + 1); return; }
    const nextProfile: StudentProfile = { name: name.trim(), department: resolvedDepartment, learningLevel, preferredLanguage: resolvedLanguage, careerGoal: resolvedCareerGoal, targetCompany: targetCompany.trim() };
    setProfile(nextProfile);
    onComplete();
  };
  const optionGrid = (options: string[], selected: string, onSelect: (value: string) => void) => <div className="onboarding-chip-grid">{options.map((option) => <button key={option} type="button" className={`onboarding-chip ${selected === option ? "selected" : ""}`} onClick={() => onSelect(option)}>{option}</button>)}</div>;

  return <div className="cama-onboarding"><div className="onboarding-card"><div className="onboarding-brand"><span className="brand-glyph"><CamaMark size={20} /></span><strong>CAMA</strong></div><div className="onboarding-eyebrow"><Compass size={13} /> {profile ? "UPDATE YOUR CAREER PROFILE" : "BUILD YOUR CAREER PROFILE"}</div><h1>{profile ? "Complete your profile" : "Welcome to CAMA"}</h1><p className="onboarding-sub">{profile ? "Your saved details are still here. Confirm or update them for better recommendations." : "Let&apos;s personalize your career intelligence journey."}</p><div className="onboarding-steps"><div className="onboarding-step-track"><div className="onboarding-step-fill" style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} /></div><span className="onboarding-step-count">0{step} / 0{TOTAL_STEPS}</span></div>
    {step === 1 && <div className="onboarding-field"><label htmlFor="student-name">Student name</label><input id="student-name" autoFocus value={name} onChange={(event) => setName(event.target.value)} onKeyDown={(event) => event.key === "Enter" && handleNext()} placeholder="Enter your full name" /></div>}
    {step === 2 && <div className="onboarding-field"><label>Department / stream</label>{optionGrid(DEPARTMENTS, department, setDepartment)}{department === "Other" && <input className="onboarding-extra-input" value={departmentOther} onChange={(event) => setDepartmentOther(event.target.value)} placeholder="Tell us your department" />}</div>}
    {step === 3 && <div className="onboarding-field"><label>What is your current learning level?</label>{optionGrid(LEVELS, learningLevel, setLearningLevel)}<p className="onboarding-helper">This helps CAMA tune your roadmap, practice difficulty, and mentor match.</p></div>}
    {step === 4 && <div className="onboarding-field"><label>Preferred learning language</label>{optionGrid(LANGUAGES, preferredLanguage, setPreferredLanguage)}{preferredLanguage === "Other" && <input className="onboarding-extra-input" value={languageOther} onChange={(event) => setLanguageOther(event.target.value)} placeholder="Tell us your preferred language" />}</div>}
    {step === 5 && <div className="onboarding-field"><label>What is your primary career goal?</label>{optionGrid(CAREER_GOALS, careerGoal, setCareerGoal)}{careerGoal === "Other" && <input className="onboarding-extra-input" value={careerGoalOther} onChange={(event) => setCareerGoalOther(event.target.value)} placeholder="Tell us your career goal" />}</div>}
    {step === 6 && <div className="onboarding-field"><label htmlFor="target-company">Dream company / target opportunity</label><input id="target-company" list="cama-target-companies" value={targetCompany} onChange={(event) => setTargetCompany(event.target.value)} onKeyDown={(event) => event.key === "Enter" && handleNext()} placeholder="Type or pick a company" /><datalist id="cama-target-companies">{TARGET_COMPANIES.map((company) => <option key={company} value={company} />)}</datalist><div className="onboarding-chip-grid onboarding-company-grid">{TARGET_COMPANIES.map((company) => <button key={company} type="button" className={`onboarding-chip ${targetCompany === company ? "selected" : ""}`} onClick={() => setTargetCompany(company)}>{company}</button>)}</div></div>}
    <div className="onboarding-nav"><button type="button" className="onboarding-back" onClick={() => setStep((value) => Math.max(1, value - 1))} disabled={step === 1}><ArrowLeft size={13} /> Back</button><button type="button" className="primary-button onboarding-next" onClick={handleNext} disabled={!canAdvance}>{step < TOTAL_STEPS ? "Continue" : "Save & enter CAMA"} <ArrowRight size={15} /></button></div>
  </div></div>;
}

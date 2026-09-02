/* CAMA Aurora style: a four-step "career assessment" onboarding card — glowing progress rail, chip-based selects, and a final "Build My Career Profile" call to action that hands the collected profile to StudentContext. */
import { useState } from "react";
import { ArrowLeft, ArrowRight, Compass } from "lucide-react";
import CamaMark from "./CamaMark";
import { useStudent, type StudentProfile } from "@/contexts/StudentContext";

const DEPARTMENTS = [
  "Computer Science & Engineering",
  "Information Technology",
  "Electronics & Communication",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Artificial Intelligence & Data Science",
  "Other",
];

const CAREER_GOALS = [
  "Software Engineer",
  "AI/ML Engineer",
  "Data Scientist",
  "Cybersecurity Engineer",
  "Full Stack Developer",
  "Cloud Engineer",
  "Product Manager",
  "Other",
];

const TARGET_COMPANIES = ["Google", "Microsoft", "Amazon", "TCS", "Infosys", "Accenture", "Deloitte", "Apple", "Meta"];

const TOTAL_STEPS = 4;

export default function Onboarding({ onComplete }: { onComplete: () => void }) {
  const { setProfile } = useStudent();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [departmentOther, setDepartmentOther] = useState("");
  const [careerGoal, setCareerGoal] = useState("");
  const [careerGoalOther, setCareerGoalOther] = useState("");
  const [targetCompany, setTargetCompany] = useState("");

  const resolvedDepartment = department === "Other" ? departmentOther.trim() : department;
  const resolvedCareerGoal = careerGoal === "Other" ? careerGoalOther.trim() : careerGoal;

  const canAdvance =
    (step === 1 && name.trim().length > 0) ||
    (step === 2 && resolvedDepartment.length > 0) ||
    (step === 3 && resolvedCareerGoal.length > 0) ||
    (step === 4 && targetCompany.trim().length > 0);

  const handleNext = () => {
    if (!canAdvance) return;
    if (step < TOTAL_STEPS) {
      setStep((value) => value + 1);
      return;
    }
    const profile: StudentProfile = {
      name: name.trim(),
      department: resolvedDepartment,
      careerGoal: resolvedCareerGoal,
      targetCompany: targetCompany.trim(),
    };
    setProfile(profile);
    onComplete();
  };

  const handleBack = () => setStep((value) => Math.max(1, value - 1));

  return (
    <div className="cama-onboarding">
      <div className="onboarding-card">
        <div className="onboarding-brand">
          <span className="brand-glyph">
            <CamaMark size={20} />
          </span>
          <strong>CAMA</strong>
        </div>

        <div className="onboarding-eyebrow">
          <Compass size={13} /> BUILD YOUR CAREER PROFILE
        </div>
        <h1>Welcome to CAMA</h1>
        <p className="onboarding-sub">Let&apos;s personalize your career intelligence journey.</p>

        <div className="onboarding-steps">
          <div className="onboarding-step-track">
            <div className="onboarding-step-fill" style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
          </div>
          <span className="onboarding-step-count">
            0{step} / 0{TOTAL_STEPS}
          </span>
        </div>

        {step === 1 && (
          <div className="onboarding-field">
            <label htmlFor="student-name">Student name</label>
            <input
              id="student-name"
              autoFocus
              value={name}
              onChange={(event) => setName(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && handleNext()}
              placeholder="Enter your full name"
            />
          </div>
        )}

        {step === 2 && (
          <div className="onboarding-field">
            <label>Department</label>
            <div className="onboarding-chip-grid">
              {DEPARTMENTS.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`onboarding-chip ${department === option ? "selected" : ""}`}
                  onClick={() => setDepartment(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            {department === "Other" && (
              <input
                style={{ marginTop: 12 }}
                value={departmentOther}
                onChange={(event) => setDepartmentOther(event.target.value)}
                placeholder="Tell us your department"
              />
            )}
          </div>
        )}

        {step === 3 && (
          <div className="onboarding-field">
            <label>What is your primary career goal?</label>
            <div className="onboarding-chip-grid">
              {CAREER_GOALS.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`onboarding-chip ${careerGoal === option ? "selected" : ""}`}
                  onClick={() => setCareerGoal(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            {careerGoal === "Other" && (
              <input
                style={{ marginTop: 12 }}
                value={careerGoalOther}
                onChange={(event) => setCareerGoalOther(event.target.value)}
                placeholder="Tell us your career goal"
              />
            )}
          </div>
        )}

        {step === 4 && (
          <div className="onboarding-field">
            <label htmlFor="target-company">Which company do you want to join?</label>
            <input
              id="target-company"
              list="cama-target-companies"
              value={targetCompany}
              onChange={(event) => setTargetCompany(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && handleNext()}
              placeholder="Type or pick a company"
            />
            <datalist id="cama-target-companies">
              {TARGET_COMPANIES.map((company) => (
                <option key={company} value={company} />
              ))}
            </datalist>
            <div className="onboarding-chip-grid" style={{ marginTop: 12 }}>
              {TARGET_COMPANIES.map((company) => (
                <button
                  key={company}
                  type="button"
                  className={`onboarding-chip ${targetCompany === company ? "selected" : ""}`}
                  onClick={() => setTargetCompany(company)}
                >
                  {company}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="onboarding-nav">
          <button type="button" className="onboarding-back" onClick={handleBack} disabled={step === 1}>
            <ArrowLeft size={13} style={{ marginRight: 6, verticalAlign: -2 }} />
            Back
          </button>
          <button type="button" className="primary-button onboarding-next" onClick={handleNext} disabled={!canAdvance}>
            {step < TOTAL_STEPS ? "Continue" : "Build My Career Profile"} <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

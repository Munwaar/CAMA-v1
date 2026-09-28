/* CAMA Aurora style: orchestrates the loading screen -> onboarding -> dashboard sequence. Onboarding is skipped on repeat visits once a profile is already saved locally. */
import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Onboarding from "@/components/Onboarding";
import { useStudent } from "@/contexts/StudentContext";
import { useSession, type AppRole } from "@/contexts/SessionContext";
import LoginPage from "@/pages/LoginPage";
import MentorHome from "@/pages/MentorHome";
import Home from "./Home";

type Phase = "loading" | "login" | "onboarding" | "dashboard";

export default function AppShell() {
  const { profile } = useStudent();
  const { role, signIn, signOut } = useSession();
  const [phase, setPhase] = useState<Phase>("loading");
  const hasCompleteStudentProfile = Boolean(profile?.name && profile.department && profile.learningLevel && profile.preferredLanguage && profile.careerGoal && profile.targetCompany);

  if (phase === "loading") {
    return <LoadingScreen onDone={() => setPhase(role === "mentor" || (role === "student" && hasCompleteStudentProfile) ? "dashboard" : role === "student" ? "onboarding" : "login")} />;
  }

  if (phase === "login") {
    return <LoginPage onComplete={(nextRole: AppRole) => { signIn(nextRole); setPhase(nextRole === "student" && !hasCompleteStudentProfile ? "onboarding" : "dashboard"); }} />;
  }

  if (phase === "onboarding") {
    return <Onboarding onComplete={() => setPhase("dashboard")} />;
  }

  if (role === "mentor") return <MentorHome onSwitchWorkspace={() => { signOut(); setPhase("login"); }} />;
  return <Home />;
}

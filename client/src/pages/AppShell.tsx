/* CAMA Aurora style: orchestrates the loading screen -> onboarding -> dashboard sequence. Onboarding is skipped on repeat visits once a profile is already saved locally. */
import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Onboarding from "@/components/Onboarding";
import { useStudent } from "@/contexts/StudentContext";
import Home from "./Home";

type Phase = "loading" | "onboarding" | "dashboard";

export default function AppShell() {
  const { profile } = useStudent();
  const [phase, setPhase] = useState<Phase>("loading");

  if (phase === "loading") {
    return <LoadingScreen onDone={() => setPhase(profile ? "dashboard" : "onboarding")} />;
  }

  if (phase === "onboarding") {
    return <Onboarding onComplete={() => setPhase("dashboard")} />;
  }

  return <Home />;
}

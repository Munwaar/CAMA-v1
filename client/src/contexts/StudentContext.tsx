/* CAMA Aurora style: lightweight context that carries the onboarding profile (name, department, career goal, target company) into the rest of the app so the dashboard can greet the student by name instead of a hardcoded default. */
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type StudentProfile = {
  name: string;
  department: string;
  careerGoal: string;
  targetCompany: string;
};

const STORAGE_KEY = "cama-student-profile";

export const DEFAULT_PROFILE: StudentProfile = {
  name: "Munwaar",
  department: "Computer Science & Engineering",
  careerGoal: "Software Engineer",
  targetCompany: "Google",
};

type StudentContextValue = {
  profile: StudentProfile | null;
  setProfile: (profile: StudentProfile) => void;
  clearProfile: () => void;
};

const StudentContext = createContext<StudentContextValue | undefined>(undefined);

function readStoredProfile(): StudentProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.name === "string") return parsed as StudentProfile;
    return null;
  } catch {
    return null;
  }
}

export function StudentProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<StudentProfile | null>(() => readStoredProfile());

  useEffect(() => {
    if (profile) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      } catch {
        /* ignore storage errors (private mode, quota, etc.) */
      }
    }
  }, [profile]);

  const value = useMemo<StudentContextValue>(
    () => ({
      profile,
      setProfile: (next) => setProfileState(next),
      clearProfile: () => {
        setProfileState(null);
        try {
          window.localStorage.removeItem(STORAGE_KEY);
        } catch {
          /* ignore */
        }
      },
    }),
    [profile],
  );

  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>;
}

export function useStudent(): StudentContextValue {
  const ctx = useContext(StudentContext);
  if (!ctx) throw new Error("useStudent must be used within a StudentProvider");
  return ctx;
}

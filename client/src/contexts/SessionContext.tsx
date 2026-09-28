import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type AppRole = "student" | "mentor";

type SessionContextValue = {
  role: AppRole | null;
  signIn: (role: AppRole) => void;
  signOut: () => void;
};

const STORAGE_KEY = "cama-active-role";

function readRole(): AppRole | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === "student" || value === "mentor" ? value : null;
}

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<AppRole | null>(() => readRole());
  const value = useMemo(() => ({
    role,
    signIn: (next: AppRole) => { setRole(next); window.localStorage.setItem(STORAGE_KEY, next); },
    signOut: () => { setRole(null); window.localStorage.removeItem(STORAGE_KEY); },
  }), [role]);
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) throw new Error("useSession must be used within SessionProvider");
  return context;
}

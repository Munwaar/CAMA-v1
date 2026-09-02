/* CAMA Aurora style: the app shell stays a premium blue/white futuristic surface. Loading -> onboarding -> dashboard is orchestrated by AppShell, gated by StudentProvider so a returning visitor's saved profile skips straight to the dashboard. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppShell from "@/pages/AppShell";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { StudentProvider } from "./contexts/StudentContext";
import { ThemeProvider } from "./contexts/ThemeContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={AppShell} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <StudentProvider>
          <TooltipProvider>
            <Toaster position="bottom-right" />
            <Router />
          </TooltipProvider>
        </StudentProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

/* Signal Atlas style: editorial information design, warm mineral surfaces, deep ink navigation, sparse signal-orange actions, and directional data storytelling. */
import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  BookOpen,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  Code2,
  Compass,
  Cpu,
  Database,
  FileText,
  Flame,
  Gauge,
  GitBranch,
  GraduationCap,
  Layers3,
  LineChart,
  ListChecks,
  Menu,
  Network,
  PanelLeftClose,
  PanelLeftOpen,
  Radar,
  Search,
  Send,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  Terminal,
  Trophy,
  UserRound,
  Video,
  Heart,
  Star,
  Timer,
  MessageCircle,
  Mic,
  RotateCcw,
  ChevronLeft,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import CamaMark from "@/components/CamaMark";
import { DEFAULT_PROFILE, useStudent, type StudentProfile } from "@/contexts/StudentContext";

type ViewKey =
  | "dashboard"
  | "path"
  | "futuresight"
  | "compass"
  | "dna"
  | "gap"
  | "industry"
  | "practice"
  | "projects"
  | "syllabus"
  | "mentors"
  | "placement"
  | "why"
  | "profile";

const viewLabels: Record<ViewKey, string> = {
  dashboard: "Dashboard",
  path: "My Path",
  futuresight: "Futuresight",
  compass: "Career Compass",
  dna: "Skill DNA",
  gap: "Gap Radar",
  industry: "Industry Intelligence",
  practice: "Practice",
  projects: "Projects",
  syllabus: "Syllabus",
  mentors: "Mentors",
  placement: "Placement Readiness",
  why: "Why CAMA?",
  profile: "Profile",
};

const navGroups: { label: string; items: { key: ViewKey; label: string; icon: LucideIcon }[] }[] = [
  {
    label: "Workspace",
    items: [
      { key: "dashboard", label: "Dashboard", icon: Gauge },
      { key: "path", label: "My Path", icon: GitBranch },
      { key: "futuresight", label: "Futuresight", icon: Compass },
      { key: "compass", label: "Career Compass", icon: Target },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { key: "dna", label: "Skill DNA", icon: Network },
      { key: "gap", label: "Gap Radar", icon: Radar },
      { key: "industry", label: "Industry Intelligence", icon: LineChart },
      { key: "practice", label: "Practice", icon: Code2 },
      { key: "projects", label: "Projects", icon: Layers3 },
    ],
  },
  {
    label: "Support",
    items: [
      { key: "syllabus", label: "Syllabus", icon: BookOpen },
      { key: "mentors", label: "Mentors", icon: GraduationCap },
      { key: "placement", label: "Placement Readiness", icon: BriefcaseBusiness },
      { key: "why", label: "Why CAMA?", icon: CircleHelp },
    ],
  },
];

const dnaSkills = [
  { label: "Java fundamentals", value: 78, tone: "orange" },
  { label: "Problem solving", value: 62, tone: "blue" },
  { label: "Backend potential", value: 81, tone: "moss" },
  { label: "DSA", value: 42, tone: "orange" },
  { label: "Industry alignment", value: 69, tone: "blue" },
];

const planItems = [
  { title: "DSA revision", meta: "30 min · Arrays", progress: 72, complete: false },
  { title: "Java practice", meta: "20 min · OOP recap", progress: 100, complete: true },
  { title: "Spring Boot primer", meta: "45 min · Next skill", progress: 18, complete: false },
];

const gapItems = [
  { skill: "Java", current: 80, required: 75, status: "aligned", note: "Above target" },
  { skill: "Spring Boot", current: 18, required: 72, status: "critical", note: "Largest gap" },
  { skill: "SQL", current: 38, required: 65, status: "important", note: "Build this next" },
  { skill: "REST APIs", current: 24, required: 58, status: "important", note: "Role essential" },
  { skill: "Docker", current: 10, required: 40, status: "recommended", note: "Emerging signal" },
];

function Sparkline({ color = "#e3643a" }: { color?: string }) {
  return (
    <svg viewBox="0 0 300 100" className="sparkline" role="img" aria-label="Career readiness trend from January to April">
      <defs>
        <linearGradient id="sparkFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.2" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 78 C32 73, 44 70, 71 68 S111 55, 136 60 S165 48, 192 43 S225 31, 252 29 S278 17, 300 11 L300 100 L0 100 Z" fill="url(#sparkFill)" />
      <path d="M0 78 C32 73, 44 70, 71 68 S111 55, 136 60 S165 48, 192 43 S225 31, 252 29 S278 17, 300 11" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
      {[0, 71, 136, 192, 252, 300].map((x, index) => {
        const ys = [78, 68, 60, 43, 29, 11];
        return <circle key={x} cx={x} cy={ys[index]} r="4" fill="var(--paper)" stroke={color} strokeWidth="3" />;
      })}
    </svg>
  );
}

function RadarPlot() {
  return (
    <svg viewBox="0 0 220 210" className="radar-plot" role="img" aria-label="Radar plot comparing current skills and industry requirements">
      <polygon points="110,14 185,67 156,160 64,160 35,67" fill="none" stroke="var(--line)" strokeWidth="1" />
      <polygon points="110,43 162,80 142,145 78,145 58,80" fill="none" stroke="var(--line)" strokeWidth="1" />
      <polygon points="110,72 139,93 127,130 93,130 81,93" fill="none" stroke="var(--line)" strokeWidth="1" />
      {["M110 14L110 176", "M185 67L35 67", "M156 160L64 160", "M35 67L156 160", "M185 67L64 160"].map((path) => <path key={path} d={path} stroke="var(--line)" strokeWidth="1" />)}
      <polygon points="110,50 151,82 137,127 85,123 69,83" fill="rgba(227,100,58,.14)" stroke="var(--orange)" strokeWidth="2" />
      <polygon points="110,31 171,76 149,146 70,149 49,79" fill="rgba(56,100,147,.12)" stroke="var(--cobalt)" strokeWidth="2" strokeDasharray="4 4" />
      <circle cx="110" cy="50" r="4" fill="var(--orange)" />
      <circle cx="110" cy="31" r="4" fill="var(--cobalt)" />
    </svg>
  );
}

function Heatmap() {
  const cells = useMemo(() => Array.from({ length: 91 }, (_, index) => ((index * 7 + index * index) % 5)), []);
  return (
    <div className="heatmap" aria-label="Learning activity over the last 13 weeks">
      {cells.map((level, index) => <span key={index} className={`heat-cell level-${level}`} title={`${level === 0 ? "No" : level * 18} minutes of learning`} />)}
    </div>
  );
}

function ProgressBar({ value, tone = "orange" }: { value: number; tone?: string }) {
  return <div className="progress-track" aria-label={`${value}%`}><span className={`progress-fill ${tone}`} style={{ width: `${value}%` }} /></div>;
}

function Pill({ children, tone = "neutral" }: { children: React.ReactNode; tone?: string }) {
  return <span className={`pill ${tone}`}>{children}</span>;
}

function SectionHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="section-heading">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, detail, tone }: { icon: LucideIcon; label: string; value: string; detail: string; tone: string }) {
  return (
    <div className={`metric-card ${tone}`}>
      <div className="metric-icon"><Icon size={16} /></div>
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}</div>
      <div className="metric-detail">{detail}</div>
    </div>
  );
}

function Dashboard({ go, student }: { go: (view: ViewKey) => void; student: StudentProfile }) {
  return (
    <div className="page-stack dashboard-view">
      <section className="dashboard-intro">
        <div>
          <div className="eyebrow"><span className="live-dot" /> DASHBOARD / 30 AUG 2026</div>
          <h1>Good morning, <em>{student.name}</em></h1>
          <p>Your path to becoming a <strong>{student.careerGoal}</strong> at <strong>{student.targetCompany}</strong> starts here. CAMA is watching the distance between what you know, what you want, and what the market is asking for next.</p>
        </div>
        <div className="intro-actions">
          <Button className="primary-button" onClick={() => go("path")}><Zap size={16} /> Start today&apos;s plan</Button>
          <button className="text-button" onClick={() => go("gap")}>Open Gap Radar <ArrowUpRight size={15} /></button>
        </div>
      </section>

      <section className="signal-hero">
        <div className="signal-hero-copy">
          <Pill tone="orange">NEXT SIGNAL / 01</Pill>
          <h2>Spring Boot is the missing link between your Java base and the role you picked.</h2>
          <p>One focused skill can move your backend readiness from <strong>45%</strong> toward the <strong>72%</strong> role benchmark.</p>
          <button className="arrow-link" onClick={() => go("futuresight")}>Explore the route <ArrowRight size={16} /></button>
        </div>
        <div className="signal-hero-art">
          <div className="art-stamp"><span>PATH</span><strong>03</strong><small>OF 08</small></div>
          <div className="art-caption">CAMA / SIGNAL ATLAS<br /><span>career alignment field notes</span></div>
        </div>
      </section>

      <section className="metric-grid">
        <MetricCard icon={Flame} label="Current streak" value="12 days" detail="+3 days this month" tone="orange" />
        <MetricCard icon={Target} label="Career goal" value={student.careerGoal} detail={`Target: ${student.targetCompany}`} tone="blue" />
        <MetricCard icon={BarChart3} label="Readiness" value="68%" detail="+7% since January" tone="moss" />
        <MetricCard icon={Clock3} label="Today&apos;s focus" value="DSA + Java" detail="1h 35m planned" tone="ink" />
      </section>

      <section className="dashboard-grid">
        <article className="atlas-card dna-card">
          <div className="card-topline"><div><div className="eyebrow">PROFILE / EVOLUTION</div><h3>Skill DNA</h3></div><div className="card-actions"><span className="card-coordinate">NODE 02 / 08</span><button className="icon-button" onClick={() => go("dna")} aria-label="Open Skill DNA"><ArrowUpRight size={17} /></button></div></div>
          <div className="dna-summary"><div className="dna-score">68<span>%</span></div><div><strong>Career readiness</strong><p>up 7 points since January</p></div></div>
          <Sparkline />
          <div className="chart-axis"><span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>NOW</span></div>
          <div className="mini-bars">{dnaSkills.slice(0, 4).map((item) => <div className="mini-bar-row" key={item.label}><span>{item.label}</span><strong>{item.value}%</strong><ProgressBar value={item.value} tone={item.tone} /></div>)}</div>
        </article>

        <article className="atlas-card radar-card">
          <div className="card-topline"><div><div className="eyebrow">ALIGNMENT / ROLE FIT</div><h3>Gap Radar</h3></div><div className="card-actions"><span className="card-coordinate">NODE 03 / 08</span><Pill tone="critical">3 open gaps</Pill></div></div>
          <div className="radar-wrap"><RadarPlot /><div className="radar-legend"><span><i className="legend-dot orange-dot" /> You</span><span><i className="legend-dot blue-dot" /> Role benchmark</span></div></div>
          <div className="radar-insight"><Sparkles size={15} /><span><strong>Biggest shift:</strong> Spring Boot is now the highest-leverage move.</span></div>
          <button className="card-link" onClick={() => go("gap")}>View all gaps <ArrowRight size={15} /></button>
        </article>

        <article className="atlas-card plan-card">
          <div className="card-topline"><div><div className="eyebrow">TODAY / ADAPTIVE PLAN</div><h3>Make one clear move</h3></div><div className="card-actions"><span className="card-coordinate">NODE 04 / 08</span><Pill tone="moss">32% complete</Pill></div></div>
          <div className="day-progress"><span>THU, 30 AUG</span><strong>1h 35m</strong></div>
          <div className="plan-list">{planItems.map((item) => <div className="plan-item" key={item.title}><div className={`plan-check ${item.complete ? "done" : ""}`}>{item.complete && <Check size={13} />}</div><div className="plan-copy"><strong>{item.title}</strong><span>{item.meta}</span><ProgressBar value={item.progress} tone={item.complete ? "moss" : "orange"} /></div><span className="plan-pct">{item.progress}%</span></div>)}</div>
          <button className="arrow-link" onClick={() => go("path")}>Open adaptive path <ArrowRight size={16} /></button>
        </article>

        <article className="atlas-card activity-card">
          <div className="card-topline"><div><div className="eyebrow">CONSISTENCY / LAST 13 WEEKS</div><h3>Learning activity</h3></div><div className="card-actions"><span className="card-coordinate">NODE 05 / 08</span><button className="icon-button" onClick={() => go("practice")} aria-label="Open Practice"><ArrowUpRight size={17} /></button></div></div>
          <div className="activity-stat"><strong>87%</strong><span>weekly consistency</span><Pill tone="moss">12 day streak</Pill></div>
          <Heatmap />
          <div className="heat-legend"><span>Less</span>{[0, 1, 2, 3, 4].map((level) => <i key={level} className={`heat-cell level-${level}`} />)}<span>More</span></div>
          <div className="activity-footer"><span>42 learning hours this month</span><ArrowUpRight size={14} /></div>
        </article>

        <article className="atlas-card industry-card">
          <div className="card-topline"><div><div className="eyebrow">DEMO LABOUR-MARKET DATA</div><h3>Industry updates</h3></div><div className="card-actions"><span className="card-coordinate">NODE 06 / 08</span><Pill tone="blue">Sample</Pill></div></div>
          <div className="industry-note"><div className="signal-marker">↑</div><div><strong>Docker demand is rising</strong><p>Across entry-level backend roles, Docker moved from “nice to have” to “preferred”.</p></div></div>
          <div className="industry-note"><div className="signal-marker moss-marker">→</div><div><strong>Java remains stable</strong><p>Core Java and SQL continue to anchor the role family you selected.</p></div></div>
          <button className="card-link" onClick={() => go("industry")}>Open intelligence dashboard <ArrowRight size={15} /></button>
        </article>

        <article className="next-skill-card" style={{ background: "linear-gradient(135deg, rgba(11,24,48,.98), rgba(34,64,76,.92))" }}>
          <div className="eyebrow">RECOMMENDED NEXT SKILL</div><div className="next-skill-index">04</div><h3>Spring Boot</h3><p>Build APIs that connect your Java foundations to production-ready backend work.</p><div className="skill-meta"><span><Clock3 size={14} /> 6–8 weeks</span><span><BarChart3 size={14} /> High demand</span></div><button className="light-arrow" onClick={() => go("path")}>Add to path <ArrowRight size={15} /></button>
        </article>
      </section>
    </div>
  );
}

function MyPath({ go }: { go: (view: ViewKey) => void }) {
  const phases = ["DSA fundamentals", "SQL foundations", "Spring Boot", "REST APIs", "Backend project", "Git + GitHub", "Docker basics", "Interview prep"];
  return <div className="page-stack"><SectionHeading eyebrow="MY PATH / ADAPTIVE ROUTE" title="A route that updates when the market moves." description="Your path balances college curriculum, target-role gaps, available time, and new demand signals." action={<Pill tone="orange">3 / 8 phases active</Pill>} />
    <section className="path-summary"><div className="path-progress"><div className="path-ring"><span>38</span><small>%</small></div><div><div className="eyebrow">JAVA BACKEND DEVELOPER</div><h3>Spring Boot is next.</h3><p>Complete one project milestone to unlock the role-specific API track.</p></div></div><div className="path-actions"><Button className="primary-button" onClick={() => go("gap")}><Radar size={16} /> Recheck my gaps</Button><button className="text-button" onClick={() => toast("Path saved to your local prototype session.")}>Save route <Check size={15} /></button></div></section>
    <section className="route-board"><div className="route-header"><span>PATH 03 / 08</span><span>UPDATED 2 HOURS AGO</span></div>{phases.map((phase, index) => <div className={`route-row ${index < 2 ? "complete" : index === 2 ? "current" : ""}`} key={phase}><div className="route-marker">{index < 2 ? <Check size={14} /> : index + 1}</div><div className="route-line" /><div className="route-copy"><div className="route-kicker">PHASE {String(index + 1).padStart(2, "0")}</div><h3>{phase}</h3><p>{index === 2 ? "Current focus · 6–8 weeks · high role leverage" : index < 2 ? "Foundational signal captured" : "Queued after the current milestone"}</p></div><div className="route-status">{index < 2 ? <Pill tone="moss">captured</Pill> : index === 2 ? <Pill tone="orange">in focus</Pill> : <Pill>queued</Pill>}</div></div>)}</section>
    <section className="update-banner"><div className="update-icon"><Bell size={18} /></div><div><div className="eyebrow">ADAPTIVE UPDATE / 30 AUG</div><h3>Industry demand analysis detected increasing importance of Docker.</h3><p>We added Docker Basics after your backend project phase. Your route is not locked; it responds to new evidence.</p></div><button className="arrow-link" onClick={() => go("industry")}>See the signal <ArrowRight size={15} /></button></section>
  </div>;
}

function Futuresight() {
  const [selectedBranch, setSelectedBranch] = useState("Backend development");
  const branches = [
    { label: "Backend development", skills: "SQL · Spring Boot · REST APIs", role: "Backend Developer", demand: "High", difficulty: "Intermediate" },
    { label: "Android development", skills: "Kotlin · Android SDK", role: "Android Developer", demand: "Growing", difficulty: "Intermediate" },
    { label: "Game development", skills: "Game programming · Engines", role: "Game Developer", demand: "Stable", difficulty: "Advanced" },
    { label: "Enterprise software", skills: "Microservices · Cloud", role: "Software Engineer", demand: "High", difficulty: "Advanced" },
  ];
  const chosen = branches.find((branch) => branch.label === selectedBranch) ?? branches[0];
  return <div className="page-stack"><SectionHeading eyebrow="FUTURESIGHT / CAREER SIMULATOR" title="See where a skill can take you." description="Select a branch from the Java route. CAMA translates a technology choice into a role, demand signal, and next build." action={<Pill tone="blue">JAVA / ROOT SKILL</Pill>} />
    <section className="future-grid"><div className="future-scene"><div className="future-scene-copy"><span className="future-coordinate">NODE 01 · JAVA FUNDAMENTALS</span><h3>One root. Four routes.</h3><p>Your foundation is not a label. It is a set of directions.</p></div></div><div className="skill-tree-card atlas-card"><div className="tree-root"><div className="tree-node root-node">JAVA</div><div className="tree-connector" /><div className="tree-node secondary-node">OOP + DSA</div></div><div className="branch-list">{branches.map((branch, index) => <button key={branch.label} className={`branch-button ${selectedBranch === branch.label ? "selected" : ""}`} onClick={() => setSelectedBranch(branch.label)}><span className="branch-number">0{index + 1}</span><span><strong>{branch.label}</strong><small>{branch.skills}</small></span><ChevronRight size={16} /></button>)}</div></div></section>
    <section className="role-detail atlas-card"><div className="role-detail-main"><div className="eyebrow">SELECTED DESTINATION / 03–08</div><h3>{chosen.role}</h3><p>From Java fundamentals into a production-oriented role with a clear project proof point.</p><div className="role-stats"><div><span>INDUSTRY DEMAND</span><strong>{chosen.demand}</strong></div><div><span>DIFFICULTY</span><strong>{chosen.difficulty}</strong></div><div><span>PATH CONFIDENCE</span><strong>87%</strong></div></div></div><div className="role-detail-side"><div className="eyebrow">REQUIRED NEXT</div><div className="requirement-list"><span><Check size={14} /> Java</span><span><Check size={14} /> Spring Boot</span><span><Check size={14} /> SQL</span><span><Check size={14} /> Git + Docker</span></div><Button className="primary-button" onClick={() => toast(`${chosen.role} added to your local CAMA route.`)}>Select this career <ArrowRight size={16} /></Button></div></section>
  </div>;
}

function CareerCompass({ go }: { go: (view: ViewKey) => void }) {
  const [selected, setSelected] = useState<string[]>(["Solving logical problems", "Programming"]);
  const toggle = (label: string) => setSelected((current) => current.includes(label) ? current.filter((item) => item !== label) : [...current, label]);
  const options = ["Solving logical problems", "Designing interfaces", "Analyzing data", "Building machines", "Creating games", "Understanding how things work"];
  return <div className="page-stack"><SectionHeading eyebrow="CAREER COMPASS / EXPLORATION MODE" title="Not sure yet? Start with what pulls you in." description="There is no wrong answer. We use your preferences as a starting signal, then show the route you can test." action={<Pill tone="moss">3 questions left</Pill>} />
    <section className="compass-layout"><div className="compass-form atlas-card"><div className="question-step"><span>01</span><div><div className="eyebrow">WHAT DO YOU ENJOY?</div><h3>Choose the work that feels like you.</h3></div></div><div className="option-grid">{options.map((option) => <button key={option} className={`choice-chip ${selected.includes(option) ? "selected" : ""}`} onClick={() => toggle(option)}>{selected.includes(option) && <Check size={14} />}{option}</button>)}</div><div className="question-step second"><span>02</span><div><div className="eyebrow">HOW DO YOU LIKE LEARNING?</div><h3>Pick a pace you can sustain.</h3></div></div><div className="option-grid compact">{["Slow and detailed", "Fast-paced", "Project-based", "Interview-focused"].map((option) => <button key={option} className={`choice-chip ${option === "Project-based" ? "selected" : ""}`}>{option === "Project-based" && <Check size={14} />}{option}</button>)}</div><div className="compass-footer"><span><Sparkles size={15} /> Based on your signals, we&apos;ll show role matches.</span><Button className="primary-button" onClick={() => toast("Career matches updated from your preferences.")}>Reveal matches <ArrowRight size={16} /></Button></div></div><aside className="matches-panel" style={{ background: "linear-gradient(150deg, rgba(11,24,48,.98), rgba(42,70,76,.95))" }}><div className="eyebrow">YOUR CAREER MATCHES</div><p className="match-intro">A first read of your signals, not a permanent label.</p>{[{ role: "Backend development", match: 87, note: "logic + programming" }, { role: "Data engineering", match: 76, note: "systems + analysis" }, { role: "AI engineering", match: 69, note: "research + building" }].map((item, index) => <button className="match-row" key={item.role} onClick={() => go("futuresight")}><span className="match-rank">0{index + 1}</span><span className="match-copy"><strong>{item.role}</strong><small>{item.note}</small></span><strong className="match-percent">{item.match}%</strong><ChevronRight size={15} /></button>)}<button className="light-arrow" onClick={() => go("futuresight")}>Explore with Futuresight <ArrowRight size={15} /></button></aside></section>
    <section className="department-strip"><div><div className="eyebrow">SCALABILITY / MULTI-DEPARTMENT SUPPORT</div><h3>CSE is the first route. The compass can widen.</h3></div><div className="department-path"><span>Mechanical</span><ArrowRight size={14} /><span>Automotive</span><ArrowRight size={14} /><span>CAD</span><ArrowRight size={14} /><span>Readiness</span></div></section>
  </div>;
}

function SkillDNA() {
  return <div className="page-stack"><SectionHeading eyebrow="SKILL DNA / LIVING PROFILE" title="Your career profile evolves as your skills evolve." description="These signals move when you learn, practice, build, and retain—not when you collect certificates." action={<Pill tone="orange">Last assessed today</Pill>} />
    <section className="dna-top-grid"><article className="atlas-card dna-score-card"><div className="eyebrow">CURRENT CAREER READINESS</div><div className="big-score">68<span>%</span></div><div className="score-delta"><ArrowUpRight size={14} /> 7 points since January</div><div className="dna-divider" /><div className="dna-copy"><strong>Backend potential is your strongest signal.</strong><p>DSA and APIs are the two areas with the clearest path to a stronger role fit.</p></div></article><article className="atlas-card dna-evolution-card"><div className="card-topline"><div><div className="eyebrow">EVOLUTION / JAN → NOW</div><h3>Readiness over time</h3></div><LineChart size={18} /></div><Sparkline color="#406f87" /><div className="evolution-labels"><span><strong>45%</strong> JAN</span><span><strong>53%</strong> FEB</span><span><strong>64%</strong> MAR</span><span><strong>72%</strong> APR</span></div></article></section>
    <section className="atlas-card detailed-skills"><div className="card-topline"><div><div className="eyebrow">SKILL SIGNALS / 06</div><h3>What your DNA is seeing</h3></div><button className="text-button" onClick={() => toast("Assessment flow is available in the next prototype pass.")}>Reassess profile <ArrowRight size={15} /></button></div><div className="skill-table">{dnaSkills.concat([{ label: "Frontend foundations", value: 71, tone: "blue" }]).map((item) => <div className="skill-table-row" key={item.label}><span className="skill-table-label">{item.label}</span><ProgressBar value={item.value} tone={item.tone} /><strong>{item.value}%</strong><span className={`skill-signal ${item.value >= 70 ? "good" : item.value >= 50 ? "watch" : "risk"}`}>{item.value >= 70 ? "strong" : item.value >= 50 ? "watch" : "needs work"}</span></div>)}</div></section>
  </div>;
}

function GapRadar({ go }: { go: (view: ViewKey) => void }) {
  return <div className="page-stack"><SectionHeading eyebrow="GAP RADAR / STUDENT VS INDUSTRY" title="See the distance before you spend the time." description="CAMA compares your current signals with the skills employers typically ask for in your selected role." action={<Pill tone="orange">JAVA BACKEND / DEMO</Pill>} />
    <section className="gap-overview"><article className="atlas-card gap-visual"><div className="card-topline"><div><div className="eyebrow">ROLE ALIGNMENT</div><h3>Benchmark comparison</h3></div><Radar size={19} /></div><RadarPlot /><div className="gap-visual-note"><span className="legend-dot orange-dot" /> Current signal <span className="legend-dot blue-dot" /> Industry benchmark</div></article><article className="atlas-card gap-action"><div className="eyebrow">RECOMMENDATION / 01</div><h3>Generate your adaptive path.</h3><p>We found one critical gap and three high-leverage additions. Turn them into a route with sequencing, practice, and project proof.</p><Button className="primary-button" onClick={() => go("path")}><Sparkles size={16} /> Generate adaptive path</Button><div className="gap-action-foot"><ShieldCheck size={15} /> Your curriculum remains part of the plan.</div></article></section>
    <section className="atlas-card gap-table-card"><div className="card-topline"><div><div className="eyebrow">OPEN SIGNALS / 05</div><h3>Where to focus next</h3></div><span className="table-note">Benchmarks are demo sample data</span></div><div className="gap-table"><div className="gap-table-header"><span>SKILL</span><span>YOU</span><span>ROLE NEEDS</span><span>STATUS</span><span>NEXT MOVE</span></div>{gapItems.map((item) => <div className="gap-table-row" key={item.skill}><strong>{item.skill}</strong><span>{item.current}%</span><div className="dual-bar"><i style={{ width: `${item.current}%` }} /><b style={{ width: `${item.required}%` }} /></div><Pill tone={item.status === "aligned" ? "moss" : item.status === "critical" ? "critical" : item.status === "important" ? "orange" : "blue"}>{item.status}</Pill><span className="next-move">{item.note} <ArrowUpRight size={13} /></span></div>)}</div></section>
  </div>;
}

function IndustryIntelligence() {
  const roles = [{ role: "Backend Developer", demand: "High", trend: "↑", color: "orange" }, { role: "Data Analyst", demand: "High", trend: "↑", color: "orange" }, { role: "AI Engineer", demand: "Growing", trend: "↑", color: "moss" }, { role: "Cybersecurity Analyst", demand: "Growing", trend: "↑", color: "moss" }];
  const skills = [{ label: "Java", value: 92 }, { label: "Python", value: 86 }, { label: "SQL", value: 83 }, { label: "Cloud", value: 74 }, { label: "Spring Boot", value: 71 }, { label: "Docker", value: 58 }];
  return <div className="page-stack"><SectionHeading eyebrow="INDUSTRY INTELLIGENCE / DEMO FEED" title="Read the signals behind the roles." description="A prototype view of the engine that will later connect job APIs, employer input, government datasets, and placement outcomes." action={<Pill tone="critical">DEMO LABOUR-MARKET DATA</Pill>} />
    <section className="intelligence-banner" style={{ background: "linear-gradient(90deg, rgba(11,24,48,.98), rgba(11,24,48,.83))" }}><div><div className="eyebrow">SIGNAL WINDOW / Q3 2026</div><h3>Backend work is moving from language fluency to delivery fluency.</h3><p>Spring Boot, SQL, REST APIs, and container basics appear together more often in the role family Munwaar selected.</p></div><div className="trend-badge"><ArrowUpRight size={17} /><strong>+18%</strong><span>backend tooling signal</span></div></section>
    <section className="intelligence-grid"><article className="atlas-card roles-card"><div className="card-topline"><div><div className="eyebrow">ROLE DEMAND / SAMPLE</div><h3>Top in-demand roles</h3></div><BriefcaseBusiness size={18} /></div>{roles.map((role) => <div className="role-demand-row" key={role.role}><span className="role-trend">{role.trend}</span><strong>{role.role}</strong><Pill tone={role.color}>{role.demand}</Pill></div>)}<div className="small-disclaimer">Directional sample only · not live hiring data</div></article><article className="atlas-card skills-card"><div className="card-topline"><div><div className="eyebrow">SKILL DEMAND / SAMPLE</div><h3>What employers ask for</h3></div><BarChart3 size={18} /></div>{skills.map((skill) => <div className="demand-bar-row" key={skill.label}><span>{skill.label}</span><ProgressBar value={skill.value} tone={skill.label === "Docker" ? "orange" : "blue"} /><strong>{skill.value}</strong></div>)}<div className="small-disclaimer">Signal strength is illustrative prototype data</div></article></section>
    <section className="signal-source-strip"><div className="eyebrow">FUTURE INPUTS</div><div className="source-list"><span><Database size={14} /> Job APIs</span><span><UserRound size={14} /> Employer surveys</span><span><GraduationCap size={14} /> Placement outcomes</span><span><FileText size={14} /> Government datasets</span></div></section>
  </div>;
}

function Practice() {
  const [started, setStarted] = useState(false);
  return <div className="page-stack"><SectionHeading eyebrow="PRACTICE / RETENTION LOOP" title="Practice what your memory is about to lose." description="CAMA keeps previously learned skills healthy while your adaptive path introduces new ones." action={<Pill tone="moss">12 day streak</Pill>} />
    <section className="practice-hero"><div><Pill tone="orange">TODAY&apos;S CHALLENGE</Pill><h3>Binary search, without the guesswork.</h3><p>You have not practiced search algorithms recently. Take 20 minutes to rebuild the pattern, then explain it back in your own words.</p><div className="challenge-meta"><span><Clock3 size={14} /> 20 minutes</span><span><BarChart3 size={14} /> Intermediate</span><span><Target size={14} /> Weak-area signal</span></div><Button className="primary-button" onClick={() => { setStarted(true); toast("Challenge started. Your local timer is ready."); }}>{started ? "Challenge in progress" : "Start challenge"} <ArrowRight size={16} /></Button></div><div className="challenge-glyph"><Terminal size={70} strokeWidth={1.2} /><span>01 / 03</span></div></section>
    <section className="practice-grid"><article className="atlas-card"><div className="card-topline"><div><div className="eyebrow">WEAK AREAS / CURRENT SIGNAL</div><h3>Where repetition helps</h3></div><Activity size={18} /></div>{[{ label: "Arrays", value: 80 }, { label: "Linked lists", value: 45 }, { label: "Trees", value: 20 }, { label: "Graphs", value: 32 }].map((item) => <div className="demand-bar-row" key={item.label}><span>{item.label}</span><ProgressBar value={item.value} tone={item.value < 40 ? "orange" : "blue"} /><strong>{item.value}%</strong></div>)}</article><article className="atlas-card skill-health-card"><div className="card-topline"><div><div className="eyebrow">SKILL HEALTH / LAST PRACTICED</div><h3>Keep the base alive</h3></div><ShieldCheck size={18} /></div>{[{ label: "Java", state: "Strong", when: "Yesterday", tone: "moss" }, { label: "DSA", state: "Needs practice", when: "5 days ago", tone: "orange" }, { label: "SQL", state: "At risk", when: "18 days ago", tone: "critical" }].map((item) => <div className="health-row" key={item.label}><div className={`health-indicator ${item.tone}`} /><div><strong>{item.label}</strong><span>Last practiced: {item.when}</span></div><Pill tone={item.tone}>{item.state}</Pill></div>)}</article></section>
  </div>;
}

function Projects() {
  const projects = [{ title: "Student Management System", stage: "Java beginner", skills: "OOP · Collections · File I/O", state: "Ready to start", tone: "blue" }, { title: "Task Management API", stage: "After Spring Boot", skills: "REST · SQL · Validation", state: "Next recommended", tone: "orange" }, { title: "E-commerce backend", stage: "After SQL + Spring Boot", skills: "Auth · Payments · Docker", state: "Locked by progress", tone: "neutral" }];
  return <div className="page-stack"><SectionHeading eyebrow="PROJECTS / PROOF OF WORK" title="Turn a skill into something you can show." description="Every build is chosen to increase Skill DNA, career readiness, and portfolio strength—not just completion count." action={<Pill tone="blue">3 route projects</Pill>} /><section className="project-grid">{projects.map((project, index) => <article className={`project-card ${index === 1 ? "featured" : ""}`} key={project.title}><div className="project-top"><span className="project-index">0{index + 1}</span><Pill tone={project.tone}>{project.state}</Pill></div><div className="project-art"><div className={`project-shape shape-${index + 1}`}><Code2 size={30} /></div></div><div className="eyebrow">{project.stage}</div><h3>{project.title}</h3><p>{project.skills}</p><button className="arrow-link" onClick={() => toast(`${project.title} added to your local project shortlist.`)}>View project brief <ArrowRight size={15} /></button></article>)}</section><section className="portfolio-note"><Trophy size={19} /><div><strong>Portfolio strength follows proof.</strong><p>A finished project becomes a stronger signal when you can explain the trade-offs, not just the technology list.</p></div><button className="text-button" onClick={() => toast("Project rubric preview opened.")}>See the rubric <ArrowRight size={15} /></button></section></div>;
}

function Syllabus() {
  const [question, setQuestion] = useState("");
  const [asked, setAsked] = useState(false);
  return <div className="page-stack"><SectionHeading eyebrow="SYLLABUS / CURRICULUM INTELLIGENCE" title="Keep college learning in the route." description="CAMA helps you balance curriculum requirements with the specialization you are building outside class." action={<Pill tone="moss">CSE / SEM 04</Pill>} /><section className="syllabus-layout"><article className="atlas-card syllabus-table-card"><div className="card-topline"><div><div className="eyebrow">SEMESTER SUBJECTS / 04</div><h3>What the curriculum is already teaching you</h3></div><button className="icon-button" onClick={() => toast("Syllabus upload is simulated in this prototype.")} aria-label="Upload syllabus"><FileText size={17} /></button></div><div className="syllabus-table"><div className="syllabus-head"><span>SUBJECT</span><span>CURRICULUM</span><span>CAREER RELEVANCE</span></div>{[{ subject: "Python", curriculum: "Required", relevance: "Medium" }, { subject: "Data Structures", curriculum: "Required", relevance: "High" }, { subject: "Operating Systems", curriculum: "Required", relevance: "High" }, { subject: "Computer Networks", curriculum: "Required", relevance: "High" }].map((item) => <div className="syllabus-row" key={item.subject}><strong>{item.subject}</strong><Pill tone="blue">{item.curriculum}</Pill><Pill tone={item.relevance === "High" ? "moss" : "orange"}>{item.relevance}</Pill></div>)}</div><div className="balance-card"><div className="balance-copy"><div className="eyebrow">RECOMMENDED BALANCE</div><h4>60% curriculum <span>+</span> 40% career skills</h4><p>Python is required for your semester. Your main specialization still points toward Java backend development.</p></div><div className="balance-bar"><i /><b /></div></div></article><aside className="tutor-panel" style={{ background: "linear-gradient(150deg, rgba(11,24,48,.98), rgba(42,70,76,.95))" }}><div className="eyebrow">ASK AI ABOUT THIS TOPIC</div><h3>Make a hard concept feel smaller.</h3><p>Try a question from today&apos;s class. This simulated tutor keeps the explanation connected to your route.</p><div className="tutor-suggestion" onClick={() => setQuestion("What is a stack?")}>“What is a stack?” <ArrowUpRight size={14} /></div><div className="tutor-input"><input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask about a topic..." aria-label="Ask AI about a topic" /><button onClick={() => setAsked(true)} aria-label="Send question"><Send size={16} /></button></div>{asked && <div className="tutor-answer"><span>SIMULATED RESPONSE</span><p>A stack is a last-in, first-out structure. Think of browser history or a pile of plates: the last item added is the first one you remove.</p></div>}</aside></section></div>;
}

function Mentors() {
  const [step, setStep] = useState(1);
  const [demoMode, setDemoMode] = useState(true);
  const [feedback, setFeedback] = useState(false);
  const [activeMentor, setActiveMentor] = useState(0);
  const [showMentorPopup, setShowMentorPopup] = useState(false);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const mentors = [
    { name: "Arun K.", role: "Java Backend Developer", match: 92, language: "Tamil + English", style: "Project-focused", availability: "Mon–Sat, 9:00 AM – 8:00 PM", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85" },
    { name: "Meera S.", role: "Data Engineer", match: 84, language: "English + Hindi", style: "Slow + Detailed", availability: "Tue–Sat, 10:00 AM – 6:00 PM", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=85" },
    { name: "Rohan P.", role: "Cloud & DevOps Mentor", match: 79, language: "English + Telugu", style: "Hands-on + Fast-paced", availability: "Wed–Sun, 7:00 PM – 10:00 PM", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85" },
  ];
  const mentor = mentors[activeMentor];
  const nextMentor = mentors[(activeMentor + 1) % mentors.length];
  const goStep = (next: number) => setStep(Math.min(6, Math.max(1, next)));
  const openMentor = (index = 0) => { setActiveMentor(index); setShowMentorPopup(true); };
  const moveMentor = (direction: number) => setActiveMentor((current) => (current + direction + mentors.length) % mentors.length);
  const handleSwipeStart = (event: React.PointerEvent<HTMLDivElement>) => setDragStart(event.clientX);
  const handleSwipeEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStart === null) return;
    const distance = event.clientX - dragStart;
    if (Math.abs(distance) > 45) moveMentor(distance < 0 ? 1 : -1);
    setDragStart(null);
  };
  const guide = () => { setFeedback(true); toast("Arun K. added to your mentor journey."); };
  return <div className="page-stack vibe-view">
    <section className="vibe-hero"><div><div className="eyebrow"><span className="live-dot" /> MENTORS / VIBE MATCHING</div><h1>Vibe Mentor <span>— Interactive Flow</span></h1><p>A seamless, slide-based experience built into your existing CAMA prototype.<br />Explore, preview, interact, and find the mentor who truly matches your vibe.</p></div><div className="vibe-status"><span>Integrated</span><i /><span>Interactive</span><i /><span>Seamless</span></div></section>
    <section className="vibe-steps">
      <article className={`vibe-step ${step === 1 ? "selected" : ""}`} onClick={() => goStep(1)}><div className="step-number">1</div><h3>Enter Vibe Mentor</h3><p>Click on Vibe Mentor from the sidebar.<br />You’ll land on the mentor discovery page.</p><div className="mini-discovery"><div className="mini-sidebar"><CamaMark size={15} /><b>CAMA</b><span>⌂ Home</span><span>◎ Skill DNA</span><span>◉ Gap Radar</span><span className="active">◉ Vibe Mentor</span></div><div className="mini-panel"><div className="mini-panel-title">Vibe Mentor <small>Find your perfect mentor match</small></div><div className="mini-search">⌕ Search mentors...</div><div className="mini-mentor mentor-photo-trigger" onClick={(e) => { e.stopPropagation(); openMentor(0); }}><img className="avatar-photo mentor-thumb" src={mentors[0].image} alt="Arun K." /><div><b>Arun K.</b><small>Java Backend Developer</small><em>◉ 92% Vibe Match</em></div><Heart size={13} /></div><div className="mini-tags"><span>Project-focused</span><span>Tamil + English</span></div><small>Experience: 3+ years<br />Next slot: Today, 4:00 PM</small><div><button onClick={(e) => { e.stopPropagation(); goStep(3); }}>Preview 10 min</button><button className="dark-mini" onClick={(e) => { e.stopPropagation(); goStep(2); }}>View Profile</button></div></div></div></article>
      <article className={`vibe-step ${step === 2 ? "selected" : ""}`} onClick={() => goStep(2)}><div className="step-number">2</div><h3>Mentor Profile</h3><p>View detailed information about the mentor<br />and why CAMA matched you.</p><div className="mini-profile"><div className="profile-top"><div className="avatar-photo arun">AK</div><div><b>Arun K.</b><small>Java Backend Developer</small><em>◉ 92% Vibe Match</em></div><X size={14} /></div><div className="mini-tags"><span>Project-focused</span><span>Tamil + English</span><span>Beginner-friendly</span></div><div className="mini-tabs">About&nbsp;&nbsp; Experience&nbsp;&nbsp; Projects&nbsp;&nbsp; Topics</div><div className="why-grid"><div><b>Why CAMA matched you?</b><span>✓ Project-based learning</span><span>✓ Tamil + English</span><span>✓ Beginner-friendly</span><span>✓ Similar learning pace</span></div><div><b>Experience</b><span>3+ years</span><b>Projects</b><span>E-commerce API · Task Manager</span></div></div><button onClick={(e) => { e.stopPropagation(); goStep(3); }}>Preview 10 min</button></div></article>
      <article className={`vibe-step wide ${step === 3 ? "selected" : ""}`} onClick={() => goStep(3)}><div className="step-number">3</div><h3>Live Mentor Preview (Interactive)</h3><p>Join a 5–10 minute live session. Ask questions, interact,<br />explore the mentor’s teaching style.</p><div className="live-card"><div className="live-header"><span><span className="live-dot" /> LIVE PREVIEW</span><span>◷ {demoMode ? "02:00" : "09:42"} remaining</span><X size={13} /></div><div className="live-body"><div className="video-frame"><div className="video-avatar arun">AK</div><b>Arun K.</b><small>Java Backend Developer</small><div className="video-controls"><Mic size={12} /><Video size={12} /><MessageCircle size={12} /></div></div><div className="code-frame"><span>Java</span><X size={12} /><code>@RestController<br />public class UserController {'{'}<br />&nbsp;&nbsp;@GetMapping("/users")<br />&nbsp;&nbsp;public ResponseEntity&lt;User&gt; getUser() {'{'}<br />&nbsp;&nbsp;&nbsp;&nbsp;return ResponseEntity.ok(user);<br />&nbsp;&nbsp;{'}'}<br />{'}'}</code></div><div className="ask-frame"><b>Ask a Doubt</b><span>What is an interface?</span><span>Why use REST APIs?</span><span>Can you explain this code?</span><button>Real-world example?</button></div></div><div className="chat-bar"><span><MessageCircle size={12} /> Chat</span><span>Notes</span><span>Code</span><span>Whiteboard</span><input placeholder="Type a message..." /><button onClick={(e) => { e.stopPropagation(); toast("Question sent to Arun."); }}><Send size={13} /></button></div></div></article>
      <article className={`vibe-step ${step === 4 ? "selected" : ""}`} onClick={() => goStep(4)}><div className="step-number">4</div><h3>Session End – Feedback</h3><p>After the preview, rate the mentor and<br />choose whether to Guide Me or Skip.</p><div className="feedback-card"><div className="feedback-close"><b>How was the vibe?</b><X size={13} /></div>{["Teaching style", "Communication", "Pace", "Language", "Interaction"].map((label) => <div className="rating-row" key={label}><span>{label}</span><span className="stars">★★★★<i>★</i></span></div>)}<div className="match-callout"><strong>✓</strong><div><b>92% Vibe Match</b><span>Arun K. remains a great match!</span></div></div><button onClick={(e) => { e.stopPropagation(); guide(); }}>Guide Me</button><button className="dark-mini" onClick={(e) => { e.stopPropagation(); goStep(5); }}>Skip</button></div></article>
      <article className={`vibe-step ${step === 5 ? "selected" : ""}`} onClick={() => goStep(5)}><div className="step-number">5</div><h3>Next Match <small>(If Skipped)</small></h3><p>If you skip, CAMA finds the next best mentor based<br />on your feedback and vibe profile.</p><div className="next-match"><div className="avatar-photo meera">MS</div><div><b>{nextMentor.name}</b><small>{nextMentor.role}</small><em>◉ {nextMentor.match}% Vibe Match</em><div className="mini-tags"><span>Slow + Detailed</span><span>English + Hindi</span></div><small>Experience: 2+ years<br />Next slot: Tomorrow, 11:00 AM</small></div><div className="match-reasons"><b>Why this match?</b><span>✓ Matches your learning pace</span><span>✓ Good language fit</span><span>✓ Strong data background</span></div></div><div className="next-match-actions"><button onClick={(e) => { e.stopPropagation(); goStep(3); }}>Preview 10 min</button><button className="dark-mini">View Profile</button></div></article>
      <article className={`vibe-step ${step === 6 ? "selected" : ""}`} onClick={() => goStep(6)}><div className="step-number">6</div><h3>Swipe Experience <small>(Mobile)</small></h3><p>On mobile, swipe right to preview or left to skip.<br />It’s fast, smooth, and intuitive.</p><div className="phone-preview"><div className="phone-notch" /><div className="phone-card"><div className="avatar-photo arun">AK</div><b>Arun K.</b><small>Java Backend Developer</small><em>◉ 92% Vibe Match</em><div className="mini-tags"><span>Project-focused</span><span>Tamil + English</span></div></div><div className="swipe-buttons"><button onClick={(e) => { e.stopPropagation(); goStep(5); }}><X size={22} /></button><button onClick={(e) => { e.stopPropagation(); goStep(3); }}><Check size={22} /></button></div></div><div className="swipe-labels"><span>← Swipe Left<br /><b>Skip</b></span><span>Swipe Right →<br /><b>Preview</b></span></div></article>
    </section>
    <section className="vibe-bottom"><article className="matching-card"><div className="eyebrow">HOW VIBE MATCH WORKS</div><h3>CAMA uses multiple factors to find your best match.</h3><div className="factor-layout"><div className="match-ring"><strong>92%</strong><span>Vibe Match</span></div><div className="factors">{[["Learning Style",90],["Language",75],["Pace",90],["Career Role",100],["Technical Interest",80],["Project Preference",75]].map(([label,value]) => <div key={label}><span>{label}</span><b>{value}%</b><i><em style={{ width: `${value}%` }} /></i></div>)}</div></div><div className="match-explanation"><Sparkles size={15} /><span><b>Why this match?</b><br />Arun’s teaching style, language, pace and project focus align well with your current goals and learning preferences.</span></div></article><aside className="demo-card"><div className="demo-pill">⚡ Demo Mode <button onClick={() => setDemoMode(!demoMode)} className={demoMode ? "on" : ""}><i /></button></div><p>Try the full experience with accelerated session time (10 min → 2 min).</p><b>Quick Actions</b><button onClick={() => setDemoMode(!demoMode)}><Timer size={14} /> {demoMode ? "Disable Demo Mode" : "Enable Demo Mode"}</button><button onClick={() => goStep(2)}><UserRound size={14} /> View Mentor Profile</button><button onClick={() => goStep(3)}><Video size={14} /> Start 10-min Preview</button><button onClick={() => goStep(5)}><RotateCcw size={14} /> See Next Match</button><div className="demo-art">Find your vibe. Build your future.</div></aside></section>
    {showMentorPopup && <div className="mentor-modal-backdrop" onClick={() => setShowMentorPopup(false)}><div className="mentor-modal" onClick={(e) => e.stopPropagation()} onPointerDown={handleSwipeStart} onPointerUp={handleSwipeEnd}><button className="mentor-modal-close" onClick={() => setShowMentorPopup(false)}><X size={17} /></button><div className="mentor-modal-counter">{activeMentor + 1} / {mentors.length}</div><img src={mentor.image} alt={`${mentor.name}, ${mentor.role}`} /><div className="mentor-modal-gradient" /><div className="mentor-modal-copy"><span className="modal-match">◉ {mentor.match}% Vibe Match</span><h2>{mentor.name}</h2><p>{mentor.role}</p><div className="modal-tags"><span>{mentor.style}</span><span>{mentor.language}</span></div><small>{mentor.availability}</small></div><button className="mentor-swipe left" onClick={() => moveMentor(-1)} aria-label="Previous mentor"><ChevronLeft size={22} /></button><button className="mentor-swipe right" onClick={() => moveMentor(1)} aria-label="Next mentor"><ChevronRight size={22} /></button><div className="mentor-modal-actions"><button className="secondary-button" onClick={() => moveMentor(1)}><X size={15} /> Skip</button><button className="primary-button" onClick={() => { setShowMentorPopup(false); goStep(2); }}><Heart size={15} /> View Profile</button></div><div className="swipe-hint">Swipe left or right to explore mentors</div></div></div>}
    {feedback && <div className="guide-confirm"><Check size={17} /> Arun K. is now your selected mentor. <button onClick={() => setFeedback(false)}><X size={14} /></button></div>}
    <div className="vibe-pagination"><button onClick={() => goStep(step - 1)}><ChevronLeft size={17} /></button><span>{step} / 6</span><button onClick={() => goStep(step + 1)}><ChevronRight size={17} /></button></div>
  </div>;
}



function UsersIcon() { return <UserRound size={14} />; }

function PlacementReadiness() {
  const scores = [{ label: "Technical skills", value: 75 }, { label: "DSA", value: 52 }, { label: "Projects", value: 60 }, { label: "Industry alignment", value: 72 }, { label: "Consistency", value: 85 }];
  return <div className="page-stack"><SectionHeading eyebrow="PLACEMENT READINESS / PREPARATION GUIDANCE" title="Know what to strengthen before you apply." description="This is a readiness signal, not a promise of placement. Use it to choose the next evidence to build." action={<Pill tone="orange">JAVA BACKEND / DEMO</Pill>} /><section className="readiness-grid"><article className="readiness-score atlas-card"><div className="eyebrow">PLACEMENT READINESS SCORE</div><div className="big-score">68<span>%</span></div><div className="readiness-meter"><div style={{ width: "68%" }} /></div><p>Readiness rises when technical skill, project proof, industry alignment, and consistency move together.</p><Pill tone="blue">Guidance, not guarantee</Pill></article><article className="atlas-card breakdown-card"><div className="card-topline"><div><div className="eyebrow">SIGNAL BREAKDOWN / 05</div><h3>What is moving the score</h3></div><BarChart3 size={18} /></div>{scores.map((score) => <div className="demand-bar-row" key={score.label}><span>{score.label}</span><ProgressBar value={score.value} tone={score.value < 60 ? "orange" : score.value >= 80 ? "moss" : "blue"} /><strong>{score.value}%</strong></div>)}</article></section><section className="company-prep atlas-card"><div><div className="eyebrow">TARGET COMPANY PREPARATION</div><h3>Prepare for a role, not a logo.</h3><p>Choose a company to organize role-specific preparation without claiming a guaranteed outcome.</p></div><div className="company-select"><span>Target company</span><button onClick={() => toast("Company selector is ready for integration.")}>Zoho <ChevronDown size={15} /></button></div><div className="prep-list">{["Programming fundamentals", "Problem solving", "DSA", "Projects", "Role-specific skills"].map((item, index) => <div key={item}><span className="prep-index">0{index + 1}</span><strong>{item}</strong><ArrowRight size={15} /></div>)}</div></section><section className="next-action-banner"><div className="signal-marker"><ArrowUpRight size={18} /></div><div><div className="eyebrow">NEXT BEST ACTION</div><h3>Complete one Spring Boot REST API project.</h3><p>One project can lift both your project proof and role alignment signals.</p></div><button className="light-arrow" onClick={() => toast("Task added to today's adaptive plan.")}>Add to today <ArrowRight size={15} /></button></section></div>;
}

function WhyCama() {
  const mappings = [{ req: "Continuous labour-market intelligence", solution: "Industry Intelligence Engine", feature: "Demand dashboard" }, { req: "Curriculum alignment", solution: "Curriculum Intelligence", feature: "Syllabus analysis" }, { req: "Skill gap identification", solution: "Gap Radar", feature: "Student vs industry comparison" }, { req: "Personalized training planning", solution: "Adaptive Path Engine", feature: "AI roadmap" }, { req: "Emerging job-market demands", solution: "Industry Trend Monitoring", feature: "Demand trends" }, { req: "Multi-level proficiency", solution: "Skill DNA", feature: "Beginner to advanced progress" }, { req: "Training effectiveness", solution: "Skill Health + Progress", feature: "Career readiness score" }];
  return <div className="page-stack"><SectionHeading eyebrow="WHY CAMA? / SIH26134 ALIGNMENT" title="From course completion to career alignment." description="CAMA is designed around the problem statement: skill development should keep pace with industry requirements and emerging demand." action={<Pill tone="critical">SIH26134</Pill>} /><section className="why-flow"><div className="flow-quote">“Your career should not be decided by random courses.”</div><div className="journey-line">{["Student", "Skill DNA", "Gap Radar", "Industry intelligence", "Adaptive path", "Practice + projects", "Readiness"].map((item, index) => <div className="journey-node" key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong>{index < 6 && <ArrowRight size={14} />}</div>)}</div></section><section className="alignment-table atlas-card"><div className="card-topline"><div><div className="eyebrow">REQUIREMENT → SOLUTION → PROTOTYPE</div><h3>How the pieces line up</h3></div><ShieldCheck size={18} /></div><div className="alignment-head"><span>SIH REQUIREMENT</span><span>CAMA SOLUTION</span><span>PROTOTYPE FEATURE</span></div>{mappings.map((item) => <div className="alignment-row" key={item.req}><strong>{item.req}</strong><span>{item.solution}</span><span><Pill tone="blue">{item.feature}</Pill></span></div>)}</section><section className="limitations"><div className="eyebrow">CURRENT LIMITATIONS / BE HONEST</div><h3>Today, this is a directional prototype.</h3><p>Figures shown here are mock labour-market data. Future implementation can connect real job data, employer surveys, placement outcomes, government datasets, and institutional data.</p><div className="future-inputs"><span>Real job data</span><span>Employer surveys</span><span>Placement data</span><span>Government datasets</span></div></section></div>;
}

function Profile({ student }: { student: StudentProfile }) {
  const initial = student.name.trim().slice(0, 1).toUpperCase() || "S";
  return <div className="page-stack"><SectionHeading eyebrow={`PROFILE / ${student.name.toUpperCase()}`} title="The person behind the signal." description="CAMA keeps your context visible so recommendations feel connected to your actual semester and direction." action={<Pill tone="moss">Active learner</Pill>} /><section className="profile-grid"><article className="profile-card atlas-card"><div className="profile-avatar">{initial}</div><div className="eyebrow">{student.department.toUpperCase()}</div><h3>{student.name}</h3><p>{student.careerGoal} · Target: {student.targetCompany}</p><div className="profile-meta"><span><GraduationCap size={15} /> {student.department}</span><span><Target size={15} /> Role confidence 87%</span><span><Flame size={15} /> 12 day learning streak</span></div><button className="secondary-button" onClick={() => toast("Profile editing is simulated in this prototype.")}>Edit profile <Settings2 size={15} /></button></article><article className="atlas-card context-card"><div className="eyebrow">CURRENT CONTEXT</div><div className="context-row"><span>Current skills</span><strong>Java · OOP · basic frontend</strong></div><div className="context-row"><span>Currently learning</span><strong>DSA</strong></div><div className="context-row"><span>Next major skill</span><strong className="orange-text">Spring Boot</strong></div><div className="context-row"><span>Study time</span><strong>1h 35m / day</strong></div><div className="context-note"><Sparkles size={15} /> Recommendations are shaped by this context.</div></article></section></div>;
}

export default function Home() {
  const { profile } = useStudent();
  const student = profile ?? DEFAULT_PROFILE;
  const initial = student.name.trim().slice(0, 1).toUpperCase() || "S";
  const [activeView, setActiveView] = useState<ViewKey>("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const go = (view: ViewKey) => { setActiveView(view); setMobileOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const renderView = () => {
    switch (activeView) {
      case "dashboard": return <Dashboard go={go} student={student} />;
      case "path": return <MyPath go={go} />;
      case "futuresight": return <Futuresight />;
      case "compass": return <CareerCompass go={go} />;
      case "dna": return <SkillDNA />;
      case "gap": return <GapRadar go={go} />;
      case "industry": return <IndustryIntelligence />;
      case "practice": return <Practice />;
      case "projects": return <Projects />;
      case "syllabus": return <Syllabus />;
      case "mentors": return <Mentors />;
      case "placement": return <PlacementReadiness />;
      case "why": return <WhyCama />;
      case "profile": return <Profile student={student} />;
      default: return <Dashboard go={go} student={student} />;
    }
  };

  return <div className={`cama-app ${sidebarCollapsed ? "rail-collapsed" : ""}`}>
    <button className={`mobile-scrim ${mobileOpen ? "visible" : ""}`} onClick={() => setMobileOpen(false)} aria-label="Close menu" />
    <aside className={`cama-sidebar ${mobileOpen ? "mobile-open" : ""}`}>
      <div className="sidebar-brand"><button className="brand-lockup" onClick={() => go("dashboard")}><span className="brand-glyph"><CamaMark size={22} /></span><span><strong className="brand-wordmark">CAMA</strong><small>career alignment</small></span></button><button className="collapse-button" onClick={() => setSidebarCollapsed((value) => !value)} aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}>{sidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}</button><button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><X size={19} /></button></div>
      <div className="sidebar-context"><div className="context-mark">{initial}</div><div><strong>{student.name}</strong><span>{student.department}</span></div><ChevronDown size={14} /></div>
      <nav className="sidebar-nav" aria-label="Primary navigation">{navGroups.map((group) => <div className="nav-group" key={group.label}><div className="nav-group-label">{group.label}</div>{group.items.map(({ key, label, icon: Icon }) => <button key={key} className={`nav-item ${activeView === key ? "active" : ""}`} onClick={() => go(key)} title={sidebarCollapsed ? label : undefined}><Icon size={17} /><span>{label}</span>{key === "gap" && <i className="nav-alert" />}</button>)}</div>)}</nav>
      <div className="sidebar-footer"><button className={`nav-item ${activeView === "profile" ? "active" : ""}`} onClick={() => go("profile")}><UserRound size={17} /><span>Profile</span></button><div className="sidebar-status"><span className="status-orb" /><span>Prototype session</span></div></div>
    </aside>
    <main className="cama-main">
      <header className="cama-topbar"><div className="topbar-left"><button className="mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu size={19} /></button><div className="breadcrumb"><span>CAMA</span><ChevronRight size={14} /><strong>{viewLabels[activeView]}</strong></div></div><div className="topbar-actions"><button className="search-trigger" onClick={() => toast("Search is ready for the next integration pass.")}><Search size={16} /><span>Search CAMA</span><kbd>⌘ K</kbd></button><Pill tone="critical"><span className="demo-dot" /> Demo data</Pill><button className="topbar-icon" onClick={() => toast("No new notifications in this prototype session.")} aria-label="Notifications"><Bell size={17} /></button><button className="topbar-avatar" onClick={() => go("profile")} aria-label="Open profile">{initial}</button></div></header>
      <div className="cama-content">{renderView()}</div>
      <footer className="cama-footer"><span>CAMA / CAREER ALIGNMENT & LABOUR-MARKET INTELLIGENCE</span><span>DEMO BUILD · SIH26134</span></footer>
    </main>
  </div>;
}

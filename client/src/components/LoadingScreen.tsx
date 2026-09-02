/* CAMA Aurora style: deep navy futuristic splash — glowing compass ring, pulsing wordmark, thin sweeping loading line, faint rising particles. Auto-advances after a short delay with a smooth fade/scale exit. */
import { useEffect, useMemo, useState } from "react";

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const holdTimer = setTimeout(() => setExiting(true), 1900);
    const doneTimer = setTimeout(() => onDone(), 2360);
    return () => {
      clearTimeout(holdTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => ({
        left: `${(index * 37) % 100}%`,
        delay: `${(index % 9) * 0.4}s`,
        duration: `${5 + (index % 5)}s`,
      })),
    [],
  );

  return (
    <div className={`cama-loading ${exiting ? "cama-loading-exit" : ""}`} role="status" aria-live="polite">
      <div className="loading-particles" aria-hidden="true">
        {particles.map((particle, index) => (
          <span
            key={index}
            className="loading-particle"
            style={{ left: particle.left, animationDelay: particle.delay, animationDuration: particle.duration }}
          />
        ))}
      </div>
      <div className="loading-ring" aria-hidden="true">
        <svg viewBox="0 0 84 84" fill="none">
          <circle cx="42" cy="42" r="36" stroke="rgba(224,236,255,.14)" strokeWidth="3" />
          <circle
            cx="42"
            cy="42"
            r="36"
            stroke="url(#loading-grad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="70 170"
          />
          <defs>
            <linearGradient id="loading-grad" x1="6" y1="6" x2="78" y2="78" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#7fb0f5" />
              <stop offset="0.6" stopColor="#2f6fed" />
              <stop offset="1" stopColor="#0ea5e9" />
            </linearGradient>
          </defs>
        </svg>
        <span className="loading-ring-glyph" />
      </div>
      <h1 className="loading-wordmark">CAMA</h1>
      <p className="loading-subtitle">AI-Powered Career &amp; Skill Intelligence</p>
      <div className="loading-bar-track">
        <span className="loading-bar-fill" />
      </div>
    </div>
  );
}

/* CAMA Aurora style: a compact orbit/compass glyph rendered as inline SVG so the brand mark never depends on an external image host and always matches the electric-blue glow palette. */
export default function CamaMark({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="cama-mark-grad" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7fb0f5" />
          <stop offset="0.55" stopColor="#2f6fed" />
          <stop offset="1" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="17.5" stroke="url(#cama-mark-grad)" strokeWidth="2" opacity="0.55" />
      <path d="M20 6 L26 18 L20 34 L14 18 Z" fill="url(#cama-mark-grad)" opacity="0.92" />
      <circle cx="20" cy="20" r="3.4" fill="#fff" />
    </svg>
  );
}

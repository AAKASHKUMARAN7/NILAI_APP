'use client';

// நிலை Logo — Equilateral triangle with center dot
// Triangle: Body, Mind, Action
// Center dot: The unmoving state of being
// Minimal, timeless, meditative

export default function NilaiLogo({ size = 60, color = 'currentColor' }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Equilateral Triangle — Body, Mind, Action */}
        <path
          d="M 30 6 L 7.4 45 L 52.6 45 Z"
          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeLinejoin="round"
        />
        {/* Center Dot — The unmoving state of being */}
        <circle cx="30" cy="32" r="3" fill={color} />
      </svg>
    </div>
  );
}

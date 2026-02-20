'use client';

// ARAM Logo — Elder's golden footprint + Child's ivory footprint
// Symbolizes the Constitution's promise to protect every generation

export default function AramLogo({ size = 60 }) {
  const scale = size / 60;

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4 * scale }}>
      <svg
        width={size}
        height={size * 1.1}
        viewBox="0 0 60 66"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Elder's Footprint (Gold) - Left, larger */}
        <g transform="translate(2, 2)">
          {/* Main sole */}
          <ellipse cx="16" cy="38" rx="12" ry="20" fill="#D4A017" opacity="0.9" />
          {/* Toes */}
          <circle cx="8" cy="14" r="4.5" fill="#D4A017" opacity="0.85" />
          <circle cx="15" cy="10" r="4" fill="#D4A017" opacity="0.85" />
          <circle cx="22" cy="12" r="3.5" fill="#D4A017" opacity="0.85" />
          <circle cx="27" cy="17" r="3" fill="#D4A017" opacity="0.85" />
          <circle cx="29" cy="24" r="2.5" fill="#D4A017" opacity="0.85" />
          {/* Inner arch highlight */}
          <ellipse cx="14" cy="36" rx="6" ry="12" fill="#F5D060" opacity="0.3" />
        </g>

        {/* Child's Footprint (Ivory) - Right, smaller */}
        <g transform="translate(32, 24)">
          {/* Main sole */}
          <ellipse cx="10" cy="24" rx="8" ry="14" fill="#FFFFF0" opacity="0.9" stroke="#D4A017" strokeWidth="0.5" />
          {/* Toes */}
          <circle cx="5" cy="8" r="3" fill="#FFFFF0" stroke="#D4A017" strokeWidth="0.5" />
          <circle cx="10" cy="5" r="2.8" fill="#FFFFF0" stroke="#D4A017" strokeWidth="0.5" />
          <circle cx="15" cy="7" r="2.5" fill="#FFFFF0" stroke="#D4A017" strokeWidth="0.5" />
          <circle cx="18" cy="11" r="2.2" fill="#FFFFF0" stroke="#D4A017" strokeWidth="0.5" />
          {/* Inner softness */}
          <ellipse cx="9" cy="23" rx="4" ry="8" fill="#FFF8DC" opacity="0.3" />
        </g>
      </svg>
    </div>
  );
}

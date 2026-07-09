export function HeroIllustration() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-lg">
      {/* Background card */}
      <div className="absolute inset-4 rounded-3xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white shadow-soft" />

      {/* Main illustration container */}
      <svg
        viewBox="0 0 500 500"
        className="relative z-10 h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Apartment buildings */}
        <rect x="60" y="200" width="80" height="180" rx="8" fill="#E5E7EB" />
        <rect x="70" y="220" width="20" height="16" rx="2" fill="#D1D5DB" />
        <rect x="100" y="220" width="20" height="16" rx="2" fill="#D1D5DB" />
        <rect x="70" y="250" width="20" height="16" rx="2" fill="#D1D5DB" />
        <rect x="100" y="250" width="20" height="16" rx="2" fill="#D1D5DB" />
        <rect x="70" y="280" width="20" height="16" rx="2" fill="#D1D5DB" />
        <rect x="100" y="280" width="20" height="16" rx="2" fill="#D1D5DB" />
        <rect x="70" y="310" width="20" height="16" rx="2" fill="#D1D5DB" />
        <rect x="100" y="310" width="20" height="16" rx="2" fill="#D1D5DB" />

        <rect x="160" y="160" width="90" height="220" rx="8" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1.5" />
        <rect x="172" y="180" width="22" height="18" rx="2" fill="#DBEAFE" />
        <rect x="204" y="180" width="22" height="18" rx="2" fill="#DBEAFE" />
        <rect x="172" y="215" width="22" height="18" rx="2" fill="#DBEAFE" />
        <rect x="204" y="215" width="22" height="18" rx="2" fill="#DBEAFE" />
        <rect x="172" y="250" width="22" height="18" rx="2" fill="#DBEAFE" />
        <rect x="204" y="250" width="22" height="18" rx="2" fill="#DBEAFE" />
        <rect x="172" y="285" width="22" height="18" rx="2" fill="#DBEAFE" />
        <rect x="204" y="285" width="22" height="18" rx="2" fill="#DBEAFE" />
        <rect x="172" y="320" width="22" height="18" rx="2" fill="#DBEAFE" />
        <rect x="204" y="320" width="22" height="18" rx="2" fill="#DBEAFE" />

        <rect x="270" y="180" width="75" height="200" rx="8" fill="#E5E7EB" />
        <rect x="280" y="200" width="18" height="14" rx="2" fill="#D1D5DB" />
        <rect x="306" y="200" width="18" height="14" rx="2" fill="#D1D5DB" />
        <rect x="280" y="228" width="18" height="14" rx="2" fill="#D1D5DB" />
        <rect x="306" y="228" width="18" height="14" rx="2" fill="#D1D5DB" />
        <rect x="280" y="256" width="18" height="14" rx="2" fill="#D1D5DB" />
        <rect x="306" y="256" width="18" height="14" rx="2" fill="#D1D5DB" />

        {/* Map pins */}
        <g transform="translate(340, 120)">
          <path d="M20 0C8.954 0 0 8.954 0 20c0 15 20 40 20 40s20-25 20-40C40 8.954 31.046 0 20 0z" fill="#2563EB" opacity="0.9" />
          <circle cx="20" cy="18" r="8" fill="white" />
        </g>
        <g transform="translate(100, 140)">
          <path d="M16 0C7.163 0 0 7.163 0 16c0 12 16 32 16 32s16-20 16-32C32 7.163 24.837 0 16 0z" fill="#111827" opacity="0.8" />
          <circle cx="16" cy="14" r="6" fill="white" />
        </g>

        {/* Property recommendation card */}
        <rect x="300" y="60" width="170" height="110" rx="12" fill="white" stroke="#E5E7EB" strokeWidth="1.5" />
        <rect x="312" y="72" width="60" height="45" rx="6" fill="#DBEAFE" />
        <rect x="380" y="76" width="70" height="8" rx="4" fill="#E5E7EB" />
        <rect x="380" y="90" width="50" height="6" rx="3" fill="#F3F4F6" />
        <rect x="312" y="126" width="40" height="14" rx="7" fill="#D1FAE5" />
        <text x="318" y="136" fill="#059669" fontSize="8" fontWeight="600">93% Match</text>
        <rect x="358" y="126" width="50" height="14" rx="7" fill="#F3F4F6" />
        <text x="364" y="136" fill="#6B7280" fontSize="7">₹1.2 Cr</text>

        {/* Analytics card */}
        <rect x="30" y="60" width="140" height="90" rx="12" fill="white" stroke="#E5E7EB" strokeWidth="1.5" />
        <text x="46" y="84" fill="#6B7280" fontSize="9" fontWeight="500">Property Analytics</text>
        <polyline points="46,130 66,118 86,122 106,100 126,108 146,90" stroke="#2563EB" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="146" cy="90" r="3" fill="#2563EB" />

        {/* AI Assistant avatar */}
        <circle cx="250" cy="100" r="36" fill="#111827" />
        <circle cx="250" cy="100" r="32" fill="#1F2937" />
        <text x="250" y="106" textAnchor="middle" fill="white" fontSize="16" fontWeight="700">AI</text>
        <circle cx="250" cy="148" r="6" fill="#10B981" stroke="white" strokeWidth="2" />

        {/* Voice waveform */}
        <g transform="translate(210, 155)">
          {[0, 8, 16, 24, 32].map((x, i) => (
            <rect
              key={i}
              x={x}
              y={10 - (i === 2 ? 8 : i === 1 || i === 3 ? 5 : 3)}
              width="4"
              height={i === 2 ? 16 : i === 1 || i === 3 ? 10 : 6}
              rx="2"
              fill="#2563EB"
              opacity={0.6 + i * 0.08}
            />
          ))}
        </g>

        {/* Customer figure */}
        <circle cx="180" cy="400" r="22" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1.5" />
        <circle cx="180" cy="393" r="10" fill="#D1D5DB" />
        <path d="M165 420 Q180 410 195 420 L195 440 L165 440 Z" fill="#D1D5DB" />

        {/* Chat bubble from AI */}
        <rect x="210" y="360" width="200" height="70" rx="16" fill="white" stroke="#E5E7EB" strokeWidth="1.5" />
        <rect x="224" y="376" width="120" height="8" rx="4" fill="#E5E7EB" />
        <rect x="224" y="392" width="160" height="6" rx="3" fill="#F3F4F6" />
        <rect x="224" y="406" width="100" height="6" rx="3" fill="#F3F4F6" />

        {/* Property card mini */}
        <rect x="360" y="340" width="120" height="90" rx="10" fill="white" stroke="#E5E7EB" strokeWidth="1.5" />
        <rect x="370" y="350" width="100" height="40" rx="6" fill="#E0E7FF" />
        <rect x="370" y="398" width="70" height="6" rx="3" fill="#E5E7EB" />
        <rect x="370" y="410" width="50" height="6" rx="3" fill="#F3F4F6" />
        <rect x="370" y="422" width="35" height="10" rx="5" fill="#DBEAFE" />

        {/* Connection lines */}
        <path d="M250 136 Q250 200 210 360" stroke="#E5E7EB" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
        <path d="M286 100 Q340 80 385 115" stroke="#E5E7EB" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
      </svg>

      {/* Floating badges */}
      <div className="absolute top-8 right-8 z-20 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-soft">
        🎯 Smart Match
      </div>
      <div className="absolute bottom-16 left-0 z-20 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-soft">
        📅 Site Visit
      </div>
    </div>
  );
}

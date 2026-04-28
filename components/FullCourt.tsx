"use client";

// Full-court SVG. viewBox 0 0 500 940. Two halves at 1 ft ≈ 10 px.
// Coordinates 0–100 (% of width / height) map via (x/100)*500, (y/100)*940.

export const FULL_COURT_WIDTH = 500;
export const FULL_COURT_HEIGHT = 940;
// Extra viewBox padding above/below baselines so OOB / inbounders fit fully.
const OOB_PAD = 22;

export function fullCoordToSvg(x: number, y: number) {
  return {
    cx: (x / 100) * FULL_COURT_WIDTH,
    cy: (y / 100) * FULL_COURT_HEIGHT,
  };
}

// Half-court geometry constants (mirrored for top half).
const BASKET_X = 250;
const BASKET_OFFSET = 50; // basket 5 ft from baseline
const BACKBOARD_OFFSET = 40;
const FT_LINE_OFFSET = 190; // 19 ft from baseline
const LANE_LEFT = 190;
const LANE_RIGHT = 310;
const FT_CIRCLE_R = 60;
const HOOP_R = 12;
const THREE_PT_R = 197;
const RESTRICTED_R = 40;

const BASELINE_TOP = 10;
const BASELINE_BOT = FULL_COURT_HEIGHT - 10;
const THREE_PT_DX = Math.sqrt(
  THREE_PT_R * THREE_PT_R - BASKET_OFFSET * BASKET_OFFSET,
);

function HalfCourtMarkings({ flip = false }: { flip?: boolean }) {
  const baseY = flip ? BASELINE_TOP : BASELINE_BOT;
  const dir = flip ? 1 : -1;

  const basketY = baseY + dir * BASKET_OFFSET;
  const backboardY = baseY + dir * BACKBOARD_OFFSET;
  const ftLineY = baseY + dir * FT_LINE_OFFSET;

  const paintTop = Math.min(baseY, ftLineY);
  const paintBot = Math.max(baseY, ftLineY);

  return (
    <g>
      {/* Lane / paint */}
      <rect
        x={LANE_LEFT}
        y={paintTop}
        width={LANE_RIGHT - LANE_LEFT}
        height={paintBot - paintTop}
        fill="#0d2918"
        stroke="#e6c98a"
        strokeWidth={2}
      />

      {/* Free-throw line */}
      <line
        x1={LANE_LEFT}
        y1={ftLineY}
        x2={LANE_RIGHT}
        y2={ftLineY}
        stroke="#e6c98a"
        strokeWidth={2}
      />

      {/* Free-throw circle */}
      <path
        d={`M ${LANE_LEFT} ${ftLineY} A ${FT_CIRCLE_R} ${FT_CIRCLE_R} 0 0 ${flip ? 0 : 1} ${LANE_RIGHT} ${ftLineY}`}
        fill="none"
        stroke="#e6c98a"
        strokeWidth={2}
      />
      <path
        d={`M ${LANE_LEFT} ${ftLineY} A ${FT_CIRCLE_R} ${FT_CIRCLE_R} 0 0 ${flip ? 1 : 0} ${LANE_RIGHT} ${ftLineY}`}
        fill="none"
        stroke="#e6c98a"
        strokeWidth={1.5}
        strokeDasharray="5 4"
      />

      {/* Backboard */}
      <line
        x1={BASKET_X - 30}
        y1={backboardY}
        x2={BASKET_X + 30}
        y2={backboardY}
        stroke="#e6c98a"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <line
        x1={BASKET_X}
        y1={backboardY}
        x2={BASKET_X}
        y2={basketY + dir * -HOOP_R}
        stroke="#a07a3f"
        strokeWidth={1.5}
      />

      {/* Hoop */}
      <circle
        cx={BASKET_X}
        cy={basketY}
        r={HOOP_R}
        fill="none"
        stroke="#ea5a1a"
        strokeWidth={2.5}
      />
      <circle cx={BASKET_X} cy={basketY} r={2.5} fill="#ea5a1a" />

      {/* 3-pt arc */}
      <path
        d={`M ${BASKET_X - THREE_PT_DX} ${baseY} A ${THREE_PT_R} ${THREE_PT_R} 0 0 ${flip ? 0 : 1} ${BASKET_X + THREE_PT_DX} ${baseY}`}
        fill="none"
        stroke="#e6c98a"
        strokeWidth={2}
      />

      {/* Restricted-area arc */}
      <path
        d={`M ${BASKET_X - RESTRICTED_R} ${basketY} A ${RESTRICTED_R} ${RESTRICTED_R} 0 0 ${flip ? 0 : 1} ${BASKET_X + RESTRICTED_R} ${basketY}`}
        fill="none"
        stroke="#e6c98a"
        strokeWidth={1.5}
        strokeDasharray="4 3"
      />

      {/* Lane block marks */}
      {[70, 110, 140, 170].map((d, i) => {
        const y = baseY + dir * d;
        const w = i === 0 ? 6 : 4;
        return (
          <g key={i}>
            <line
              x1={LANE_LEFT - w}
              y1={y}
              x2={LANE_LEFT}
              y2={y}
              stroke="#e6c98a"
              strokeWidth={2}
            />
            <line
              x1={LANE_RIGHT}
              y1={y}
              x2={LANE_RIGHT + w}
              y2={y}
              stroke="#e6c98a"
              strokeWidth={2}
            />
          </g>
        );
      })}
    </g>
  );
}

export default function FullCourt({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <svg
      viewBox={`0 ${-OOB_PAD} ${FULL_COURT_WIDTH} ${FULL_COURT_HEIGHT + OOB_PAD * 2}`}
      className="w-full h-full"
      style={{ background: "transparent" }}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="hardwood-full" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#241509" />
          <stop offset="50%" stopColor="#1c1108" />
          <stop offset="100%" stopColor="#241509" />
        </linearGradient>
      </defs>

      {/* Court surface — extends into OOB strips above/below baselines */}
      <rect
        x={0}
        y={-OOB_PAD}
        width={FULL_COURT_WIDTH}
        height={FULL_COURT_HEIGHT + OOB_PAD * 2}
        fill="url(#hardwood-full)"
        rx={8}
      />

      {/* Hardwood grain */}
      {Array.from({ length: 28 }).map((_, i) => (
        <line
          key={i}
          x1={0}
          y1={(i + 1) * 32}
          x2={FULL_COURT_WIDTH}
          y2={(i + 1) * 32}
          stroke="#0e0805"
          strokeWidth={1}
          opacity={0.7}
        />
      ))}

      {/* Boundary */}
      <rect
        x={10}
        y={10}
        width={FULL_COURT_WIDTH - 20}
        height={FULL_COURT_HEIGHT - 20}
        fill="none"
        stroke="#e6c98a"
        strokeWidth={2.5}
        rx={2}
      />

      {/* Half-court line */}
      <line
        x1={10}
        y1={FULL_COURT_HEIGHT / 2}
        x2={FULL_COURT_WIDTH - 10}
        y2={FULL_COURT_HEIGHT / 2}
        stroke="#e6c98a"
        strokeWidth={2}
      />

      {/* Center circle (6 ft outer, small inner) */}
      <circle
        cx={BASKET_X}
        cy={FULL_COURT_HEIGHT / 2}
        r={60}
        fill="none"
        stroke="#e6c98a"
        strokeWidth={2}
      />
      <circle
        cx={BASKET_X}
        cy={FULL_COURT_HEIGHT / 2}
        r={20}
        fill="none"
        stroke="#e6c98a"
        strokeWidth={1.5}
        strokeDasharray="4 3"
      />

      {/* Top (defense basket) and bottom (offense basket) */}
      <HalfCourtMarkings flip={true} />
      <HalfCourtMarkings flip={false} />

      {children}
    </svg>
  );
}

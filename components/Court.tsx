"use client";

// Half-court SVG. viewBox 0 0 500 470. Scale: 1 ft ≈ 10 px.
// Coordinate system: y=0 is top (half-court line), y=470 is baseline.
// Coordinates 0–100 (% of width / height) map via (x/100)*500, (y/100)*470.

export const COURT_WIDTH = 500;
export const COURT_HEIGHT = 470;
// Extra viewBox space below baseline for the OOB area (inbounders, ball-side baseline).
const OOB_PAD = 22;

// HS varsity geometry (NFHS):
// - Court is 50 ft wide × 47 ft (half).
// - Basket center is 5'3" from baseline (~52 px) — we use 50 px for clean numbers.
// - Backboard is 4 ft from baseline (40 px).
// - Free-throw line is 19 ft from baseline (190 px).
// - Lane is 12 ft wide (120 px).
// - 3-pt arc radius is 19'9" (≈ 197 px).
// - Restricted area is 4 ft from basket (40 px).

const BASELINE_Y = 460; // inner edge of court boundary
const BASKET_X = 250;
const BASKET_Y = 410; // 5 ft from baseline
const BACKBOARD_Y = 420; // 4 ft from baseline
const FT_LINE_Y = 270; // 19 ft from baseline
const LANE_LEFT = 190;
const LANE_RIGHT = 310;
const FT_CIRCLE_R = 60; // 6 ft
const HOOP_R = 12;
const THREE_PT_R = 197; // 19'9"
const RESTRICTED_R = 40; // 4 ft

export function coordToSvg(x: number, y: number) {
  return { cx: (x / 100) * COURT_WIDTH, cy: (y / 100) * COURT_HEIGHT };
}

// Compute where the 3-pt arc intersects the baseline so we can draw a clean arc.
// (BASKET_X ± dx, BASELINE_Y) where dx = sqrt(R² − (BASELINE_Y − BASKET_Y)²)
const THREE_PT_DX = Math.sqrt(
  THREE_PT_R * THREE_PT_R - (BASELINE_Y - BASKET_Y) * (BASELINE_Y - BASKET_Y),
);
const THREE_PT_LEFT_X = BASKET_X - THREE_PT_DX;
const THREE_PT_RIGHT_X = BASKET_X + THREE_PT_DX;

export default function Court({ children }: { children?: React.ReactNode }) {
  return (
    <svg
      viewBox={`0 0 ${COURT_WIDTH} ${COURT_HEIGHT + OOB_PAD}`}
      className="w-full h-full"
      style={{ background: "transparent" }}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="hardwood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#241509" />
          <stop offset="50%" stopColor="#1c1108" />
          <stop offset="100%" stopColor="#241509" />
        </linearGradient>
      </defs>

      {/* Court surface — extends into OOB strip below the baseline so inbounders fit */}
      <rect
        x={0}
        y={0}
        width={COURT_WIDTH}
        height={COURT_HEIGHT + OOB_PAD}
        fill="url(#hardwood)"
        rx={8}
      />

      {/* Hardwood grain */}
      {Array.from({ length: 14 }).map((_, i) => (
        <line
          key={i}
          x1={0}
          y1={(i + 1) * 32}
          x2={COURT_WIDTH}
          y2={(i + 1) * 32}
          stroke="#0e0805"
          strokeWidth={1}
          opacity={0.7}
        />
      ))}

      {/* Court boundary (sidelines + baseline) */}
      <rect
        x={10}
        y={10}
        width={COURT_WIDTH - 20}
        height={BASELINE_Y - 10}
        fill="none"
        stroke="#e6c98a"
        strokeWidth={2.5}
        rx={2}
      />

      {/* Half-court line */}
      <line
        x1={10}
        y1={10}
        x2={COURT_WIDTH - 10}
        y2={10}
        stroke="#e6c98a"
        strokeWidth={2.5}
      />

      {/* Half-circle at top (center circle, half visible) */}
      <path
        d={`M ${BASKET_X - 60} 10 A 60 60 0 0 0 ${BASKET_X + 60} 10`}
        fill="none"
        stroke="#e6c98a"
        strokeWidth={2}
        strokeDasharray="6 4"
      />

      {/* 3-point line — HS pure arc, with short straight segments to the baseline */}
      <line
        x1={THREE_PT_LEFT_X}
        y1={BASELINE_Y}
        x2={THREE_PT_LEFT_X}
        y2={BASELINE_Y}
        stroke="#e6c98a"
        strokeWidth={2}
      />
      <path
        d={`M ${THREE_PT_LEFT_X} ${BASELINE_Y} A ${THREE_PT_R} ${THREE_PT_R} 0 0 1 ${THREE_PT_RIGHT_X} ${BASELINE_Y}`}
        fill="none"
        stroke="#e6c98a"
        strokeWidth={2}
      />

      {/* Lane / Paint */}
      <rect
        x={LANE_LEFT}
        y={FT_LINE_Y}
        width={LANE_RIGHT - LANE_LEFT}
        height={BASELINE_Y - FT_LINE_Y}
        fill="#0d2918"
        stroke="#e6c98a"
        strokeWidth={2}
      />

      {/* Free-throw line */}
      <line
        x1={LANE_LEFT}
        y1={FT_LINE_Y}
        x2={LANE_RIGHT}
        y2={FT_LINE_Y}
        stroke="#e6c98a"
        strokeWidth={2}
      />

      {/* Free-throw circle (top half solid, bottom half dashed) */}
      <path
        d={`M ${LANE_LEFT} ${FT_LINE_Y} A ${FT_CIRCLE_R} ${FT_CIRCLE_R} 0 0 1 ${LANE_RIGHT} ${FT_LINE_Y}`}
        fill="none"
        stroke="#e6c98a"
        strokeWidth={2}
      />
      <path
        d={`M ${LANE_LEFT} ${FT_LINE_Y} A ${FT_CIRCLE_R} ${FT_CIRCLE_R} 0 0 0 ${LANE_RIGHT} ${FT_LINE_Y}`}
        fill="none"
        stroke="#e6c98a"
        strokeWidth={1.5}
        strokeDasharray="5 4"
      />

      {/* Lane block marks (NFHS spacing) */}
      {/* First low block: 7 ft from baseline (y = 390) */}
      {/* Then 11 ft (y = 350), 14 ft (y = 320), 17 ft (y = 290) */}
      {[
        { y: BASELINE_Y - 70, w: 6 },
        { y: BASELINE_Y - 110, w: 4 },
        { y: BASELINE_Y - 140, w: 4 },
        { y: BASELINE_Y - 170, w: 4 },
      ].map((block, i) => (
        <g key={i}>
          <line
            x1={LANE_LEFT - block.w}
            y1={block.y}
            x2={LANE_LEFT}
            y2={block.y}
            stroke="#e6c98a"
            strokeWidth={2}
          />
          <line
            x1={LANE_RIGHT}
            y1={block.y}
            x2={LANE_RIGHT + block.w}
            y2={block.y}
            stroke="#e6c98a"
            strokeWidth={2}
          />
        </g>
      ))}

      {/* Tick marks indicating low-block positions on the lane */}
      <line
        x1={LANE_LEFT}
        y1={BASELINE_Y - 70}
        x2={LANE_LEFT + 8}
        y2={BASELINE_Y - 70}
        stroke="#e6c98a"
        strokeWidth={2}
      />
      <line
        x1={LANE_RIGHT - 8}
        y1={BASELINE_Y - 70}
        x2={LANE_RIGHT}
        y2={BASELINE_Y - 70}
        stroke="#e6c98a"
        strokeWidth={2}
      />

      {/* Restricted-area arc (in front of basket) */}
      <path
        d={`M ${BASKET_X - RESTRICTED_R} ${BASKET_Y} A ${RESTRICTED_R} ${RESTRICTED_R} 0 0 1 ${BASKET_X + RESTRICTED_R} ${BASKET_Y}`}
        fill="none"
        stroke="#e6c98a"
        strokeWidth={1.5}
        strokeDasharray="4 3"
      />

      {/* Backboard */}
      <line
        x1={BASKET_X - 30}
        y1={BACKBOARD_Y}
        x2={BASKET_X + 30}
        y2={BACKBOARD_Y}
        stroke="#e6c98a"
        strokeWidth={3}
        strokeLinecap="round"
      />
      {/* Stanchion / connector to hoop */}
      <line
        x1={BASKET_X}
        y1={BACKBOARD_Y}
        x2={BASKET_X}
        y2={BASKET_Y - HOOP_R}
        stroke="#a07a3f"
        strokeWidth={1.5}
      />

      {/* Hoop */}
      <circle
        cx={BASKET_X}
        cy={BASKET_Y}
        r={HOOP_R}
        fill="none"
        stroke="#ea5a1a"
        strokeWidth={2.5}
      />
      <circle cx={BASKET_X} cy={BASKET_Y} r={2.5} fill="#ea5a1a" />

      {children}
    </svg>
  );
}

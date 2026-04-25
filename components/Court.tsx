"use client";

// Half-court SVG. viewBox 0 0 500 470.
// Basket center: (250, 432).  Baseline: y=460.  FT line: y=270.
// Paint: x [170, 330], y [270, 460] (16ft × 19ft).
// 3pt: NBA — 23'9" radius arc + 22ft corner straights.
// Player coordinates: 0-100 percentage of (500 × 470).

export const COURT_WIDTH = 500;
export const COURT_HEIGHT = 470;

export function coordToSvg(x: number, y: number) {
  return { cx: (x / 100) * COURT_WIDTH, cy: (y / 100) * COURT_HEIGHT };
}

// Geometry constants — exported so plays / animation can reference them
export const BASKET = { x: 250, y: 432 };
export const BASELINE_Y = 460;
export const FT_LINE_Y = 270;
export const PAINT_LEFT = 170;
export const PAINT_RIGHT = 330;
export const THREE_RADIUS = 235; // 23'9" ≈ 235 svg units
export const CORNER_3_X_LEFT = 30; // 22ft from basket center laterally
export const CORNER_3_X_RIGHT = 470;
// y where 3pt arc meets corner straight
export const CORNER_3_Y =
  BASKET.y - Math.sqrt(THREE_RADIUS ** 2 - (BASKET.x - CORNER_3_X_LEFT) ** 2);

const FLOOR = "#1f1208";
const FLOOR_GRAIN = "#2a1709";
const LINE = "#e8d4a4";
const LINE_DIM = "#a78b56";
const PAINT_FILL = "#0e2d1a";
const PAINT_FILL_DEEP = "#082015";
const RIM = "#ff6b1a";

export default function Court({ children }: { children?: React.ReactNode }) {
  return (
    <svg
      viewBox={`0 0 ${COURT_WIDTH} ${COURT_HEIGHT}`}
      className="w-full h-full"
      style={{ background: "transparent" }}
    >
      <defs>
        {/* Hardwood gradient */}
        <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#241509" />
          <stop offset="50%" stopColor="#1d1108" />
          <stop offset="100%" stopColor="#170d06" />
        </linearGradient>
        {/* Painted key gradient */}
        <linearGradient id="paintGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={PAINT_FILL} />
          <stop offset="100%" stopColor={PAINT_FILL_DEEP} />
        </linearGradient>
        {/* Rim glow */}
        <radialGradient id="rimGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor={RIM} stopOpacity="0.45" />
          <stop offset="60%" stopColor={RIM} stopOpacity="0.08" />
          <stop offset="100%" stopColor={RIM} stopOpacity="0" />
        </radialGradient>
        {/* Subtle vignette around the court */}
        <radialGradient id="vignette" cx="0.5" cy="0.55" r="0.7">
          <stop offset="60%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.35" />
        </radialGradient>
      </defs>

      {/* Court surface */}
      <rect
        x={0}
        y={0}
        width={COURT_WIDTH}
        height={COURT_HEIGHT}
        fill="url(#floorGrad)"
        rx={10}
      />

      {/* Hardwood grain — finer plank lines */}
      {Array.from({ length: 19 }).map((_, i) => (
        <line
          key={i}
          x1={0}
          y1={(i + 1) * 24}
          x2={COURT_WIDTH}
          y2={(i + 1) * 24}
          stroke={FLOOR_GRAIN}
          strokeWidth={1}
          opacity={0.55}
        />
      ))}

      {/* Vignette */}
      <rect
        x={0}
        y={0}
        width={COURT_WIDTH}
        height={COURT_HEIGHT}
        fill="url(#vignette)"
        pointerEvents="none"
      />

      {/* Court boundary */}
      <rect
        x={10}
        y={10}
        width={COURT_WIDTH - 20}
        height={COURT_HEIGHT - 20}
        fill="none"
        stroke={LINE}
        strokeWidth={2.5}
        rx={4}
      />

      {/* Half-court (top edge) — slightly thicker for emphasis */}
      <line
        x1={10}
        y1={10}
        x2={COURT_WIDTH - 10}
        y2={10}
        stroke={LINE}
        strokeWidth={2.5}
      />

      {/* Painted key */}
      <rect
        x={PAINT_LEFT}
        y={FT_LINE_Y}
        width={PAINT_RIGHT - PAINT_LEFT}
        height={BASELINE_Y - FT_LINE_Y}
        fill="url(#paintGrad)"
        stroke={LINE}
        strokeWidth={2}
      />

      {/* Free throw line */}
      <line
        x1={PAINT_LEFT}
        y1={FT_LINE_Y}
        x2={PAINT_RIGHT}
        y2={FT_LINE_Y}
        stroke={LINE}
        strokeWidth={2}
      />

      {/* Free throw circle — top half dashed (offense), bottom half solid */}
      <path
        d={`M ${PAINT_LEFT} ${FT_LINE_Y} A 80 80 0 0 1 ${PAINT_RIGHT} ${FT_LINE_Y}`}
        fill="none"
        stroke={LINE}
        strokeWidth={2}
        strokeDasharray="6 5"
      />
      <path
        d={`M ${PAINT_LEFT} ${FT_LINE_Y} A 80 80 0 0 0 ${PAINT_RIGHT} ${FT_LINE_Y}`}
        fill="none"
        stroke={LINE}
        strokeWidth={2}
      />

      {/* Restricted-area arc (4 ft) */}
      <path
        d={`M ${BASKET.x - 40} ${BASELINE_Y} A 40 40 0 0 1 ${BASKET.x + 40} ${BASELINE_Y}`}
        fill="none"
        stroke={LINE_DIM}
        strokeWidth={1.5}
        strokeDasharray="4 3"
      />

      {/* Lane hash marks (block + 3 above) — both sides */}
      {/* Block (4ft from baseline) */}
      <line x1={PAINT_LEFT - 8} y1={420} x2={PAINT_LEFT} y2={420} stroke={LINE} strokeWidth={3} />
      <line x1={PAINT_RIGHT} y1={420} x2={PAINT_RIGHT + 8} y2={420} stroke={LINE} strokeWidth={3} />
      {/* 2nd hash (7ft) — where mid-low screens get set */}
      <line x1={PAINT_LEFT - 6} y1={390} x2={PAINT_LEFT} y2={390} stroke={LINE} strokeWidth={2} />
      <line x1={PAINT_RIGHT} y1={390} x2={PAINT_RIGHT + 6} y2={390} stroke={LINE} strokeWidth={2} />
      {/* 3rd hash (10ft) */}
      <line x1={PAINT_LEFT - 6} y1={360} x2={PAINT_LEFT} y2={360} stroke={LINE} strokeWidth={2} />
      <line x1={PAINT_RIGHT} y1={360} x2={PAINT_RIGHT + 6} y2={360} stroke={LINE} strokeWidth={2} />
      {/* 4th hash (13ft) */}
      <line x1={PAINT_LEFT - 6} y1={330} x2={PAINT_LEFT} y2={330} stroke={LINE} strokeWidth={2} />
      <line x1={PAINT_RIGHT} y1={330} x2={PAINT_RIGHT + 6} y2={330} stroke={LINE} strokeWidth={2} />
      {/* Lane block notches inside */}
      <line x1={PAINT_LEFT} y1={418} x2={PAINT_LEFT} y2={422} stroke={LINE} strokeWidth={2} />
      <line x1={PAINT_RIGHT} y1={418} x2={PAINT_RIGHT} y2={422} stroke={LINE} strokeWidth={2} />

      {/* NBA 3-point line — corner straights + arc */}
      <line
        x1={CORNER_3_X_LEFT}
        y1={BASELINE_Y}
        x2={CORNER_3_X_LEFT}
        y2={CORNER_3_Y}
        stroke={LINE}
        strokeWidth={2}
      />
      <line
        x1={CORNER_3_X_RIGHT}
        y1={BASELINE_Y}
        x2={CORNER_3_X_RIGHT}
        y2={CORNER_3_Y}
        stroke={LINE}
        strokeWidth={2}
      />
      <path
        d={`M ${CORNER_3_X_LEFT} ${CORNER_3_Y} A ${THREE_RADIUS} ${THREE_RADIUS} 0 0 1 ${CORNER_3_X_RIGHT} ${CORNER_3_Y}`}
        fill="none"
        stroke={LINE}
        strokeWidth={2}
      />

      {/* Rim glow (subtle hot-spot) */}
      <circle cx={BASKET.x} cy={BASKET.y} r={48} fill="url(#rimGlow)" pointerEvents="none" />

      {/* Backboard */}
      <line
        x1={BASKET.x - 30}
        y1={BASKET.y + 10}
        x2={BASKET.x + 30}
        y2={BASKET.y + 10}
        stroke={LINE}
        strokeWidth={3.5}
        strokeLinecap="round"
      />

      {/* Rim */}
      <circle
        cx={BASKET.x}
        cy={BASKET.y}
        r={9}
        fill="none"
        stroke={RIM}
        strokeWidth={2.5}
      />
      {/* Net suggestion */}
      <line x1={BASKET.x - 7} y1={BASKET.y + 1} x2={BASKET.x + 7} y2={BASKET.y + 1} stroke={RIM} strokeWidth={1} opacity={0.5} />
      <line x1={BASKET.x - 5} y1={BASKET.y + 4} x2={BASKET.x + 5} y2={BASKET.y + 4} stroke={RIM} strokeWidth={1} opacity={0.4} />

      {/* Tip-off / center area at top — half of mid-court circle */}
      <path
        d="M 190 10 A 60 60 0 0 0 310 10"
        fill="none"
        stroke={LINE_DIM}
        strokeWidth={2}
        strokeDasharray="6 4"
      />

      {children}
    </svg>
  );
}

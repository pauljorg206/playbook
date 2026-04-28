"use client";

// Half-court SVG. viewBox 0 0 500 470 (+ OOB pad). Scale: 1 ft ≈ 10 px.
// HS varsity geometry (NFHS):
//   Court: 50 ft × 47 ft (half).
//   Basket center 5 ft from baseline (y=410).
//   Backboard 4 ft from baseline (y=420).
//   FT line 19 ft from baseline (y=270).
//   Lane 12 ft wide (x=190..310), 19 ft deep.
//   3-pt arc 19'9" radius (197 px).
// Player coordinates: 0–100 percent of (500 × 470).

export const COURT_WIDTH = 500;
export const COURT_HEIGHT = 470;
// Extra viewBox space below baseline so inbounders (y≈99) render fully.
const OOB_PAD = 22;

// Geometry constants — exported for plays / animation
export const BASELINE_Y = 460;
export const BASKET = { x: 250, y: 410 };
export const BACKBOARD_Y = 420;
export const FT_LINE_Y = 270;
export const PAINT_LEFT = 190;
export const PAINT_RIGHT = 310;
export const FT_CIRCLE_R = 60;
export const THREE_RADIUS = 197; // HS 19'9"
export const RESTRICTED_R = 40;
export const HOOP_R = 12;

// 3-pt line: corner straights from baseline up to where the arc has a
// vertical tangent (basket-y), then arc over the top. This gives a clean,
// recognizable basketball-court look while keeping the HS 19'9" radius.
export const CORNER_3_X_LEFT = BASKET.x - THREE_RADIUS; // 53
export const CORNER_3_X_RIGHT = BASKET.x + THREE_RADIUS; // 447
export const CORNER_3_TOP_Y = BASKET.y; // arc tangent is vertical here

// Color tokens
const LINE = "#e8d4a4";
const LINE_DIM = "#a78b56";
const PAINT_FILL = "#0e2d1a";
const PAINT_FILL_DEEP = "#082015";
const RIM = "#ff6b1a";
const FLOOR_GRAIN = "#2a1709";

export function coordToSvg(x: number, y: number) {
  return { cx: (x / 100) * COURT_WIDTH, cy: (y / 100) * COURT_HEIGHT };
}

export default function Court({ children }: { children?: React.ReactNode }) {
  return (
    <svg
      viewBox={`0 0 ${COURT_WIDTH} ${COURT_HEIGHT + OOB_PAD}`}
      className="w-full h-full"
      style={{ background: "transparent" }}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#241509" />
          <stop offset="50%" stopColor="#1d1108" />
          <stop offset="100%" stopColor="#170d06" />
        </linearGradient>
        <linearGradient id="paintGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={PAINT_FILL} />
          <stop offset="100%" stopColor={PAINT_FILL_DEEP} />
        </linearGradient>
        <radialGradient id="rimGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor={RIM} stopOpacity="0.45" />
          <stop offset="60%" stopColor={RIM} stopOpacity="0.08" />
          <stop offset="100%" stopColor={RIM} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="vignette" cx="0.5" cy="0.55" r="0.7">
          <stop offset="60%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.35" />
        </radialGradient>
      </defs>

      {/* Court surface — extends into OOB strip below baseline */}
      <rect
        x={0}
        y={0}
        width={COURT_WIDTH}
        height={COURT_HEIGHT + OOB_PAD}
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

      {/* Vignette over the playable area */}
      <rect
        x={0}
        y={0}
        width={COURT_WIDTH}
        height={COURT_HEIGHT}
        fill="url(#vignette)"
        pointerEvents="none"
      />

      {/* Court boundary (sidelines + baseline) */}
      <rect
        x={10}
        y={10}
        width={COURT_WIDTH - 20}
        height={BASELINE_Y - 10}
        fill="none"
        stroke={LINE}
        strokeWidth={2.5}
        rx={2}
      />

      {/* Half-court line (top edge) */}
      <line
        x1={10}
        y1={10}
        x2={COURT_WIDTH - 10}
        y2={10}
        stroke={LINE}
        strokeWidth={2.5}
      />

      {/* Center-circle half (top) */}
      <path
        d={`M ${BASKET.x - 60} 10 A 60 60 0 0 0 ${BASKET.x + 60} 10`}
        fill="none"
        stroke={LINE_DIM}
        strokeWidth={2}
        strokeDasharray="6 4"
      />

      {/* 3-pt line — corner straights + arc */}
      <line
        x1={CORNER_3_X_LEFT}
        y1={BASELINE_Y}
        x2={CORNER_3_X_LEFT}
        y2={CORNER_3_TOP_Y}
        stroke={LINE}
        strokeWidth={2}
      />
      <line
        x1={CORNER_3_X_RIGHT}
        y1={BASELINE_Y}
        x2={CORNER_3_X_RIGHT}
        y2={CORNER_3_TOP_Y}
        stroke={LINE}
        strokeWidth={2}
      />
      <path
        d={`M ${CORNER_3_X_LEFT} ${CORNER_3_TOP_Y} A ${THREE_RADIUS} ${THREE_RADIUS} 0 0 1 ${CORNER_3_X_RIGHT} ${CORNER_3_TOP_Y}`}
        fill="none"
        stroke={LINE}
        strokeWidth={2}
      />

      {/* Painted lane */}
      <rect
        x={PAINT_LEFT}
        y={FT_LINE_Y}
        width={PAINT_RIGHT - PAINT_LEFT}
        height={BASELINE_Y - FT_LINE_Y}
        fill="url(#paintGrad)"
        stroke={LINE}
        strokeWidth={2}
      />

      {/* Free-throw line */}
      <line
        x1={PAINT_LEFT}
        y1={FT_LINE_Y}
        x2={PAINT_RIGHT}
        y2={FT_LINE_Y}
        stroke={LINE}
        strokeWidth={2}
      />

      {/* Free-throw circle: top half dashed, bottom half solid */}
      <path
        d={`M ${PAINT_LEFT} ${FT_LINE_Y} A ${FT_CIRCLE_R} ${FT_CIRCLE_R} 0 0 1 ${PAINT_RIGHT} ${FT_LINE_Y}`}
        fill="none"
        stroke={LINE}
        strokeWidth={2}
      />
      <path
        d={`M ${PAINT_LEFT} ${FT_LINE_Y} A ${FT_CIRCLE_R} ${FT_CIRCLE_R} 0 0 0 ${PAINT_RIGHT} ${FT_LINE_Y}`}
        fill="none"
        stroke={LINE}
        strokeWidth={1.5}
        strokeDasharray="5 4"
      />

      {/* Lane hash marks (NFHS spacing): low block 7 ft, then 11/14/17 ft */}
      {[
        { y: BASELINE_Y - 70, w: 8, sw: 3 }, // first block — heavier
        { y: BASELINE_Y - 110, w: 6, sw: 2 },
        { y: BASELINE_Y - 140, w: 6, sw: 2 },
        { y: BASELINE_Y - 170, w: 6, sw: 2 },
      ].map((m, i) => (
        <g key={i}>
          <line
            x1={PAINT_LEFT - m.w}
            y1={m.y}
            x2={PAINT_LEFT}
            y2={m.y}
            stroke={LINE}
            strokeWidth={m.sw}
          />
          <line
            x1={PAINT_RIGHT}
            y1={m.y}
            x2={PAINT_RIGHT + m.w}
            y2={m.y}
            stroke={LINE}
            strokeWidth={m.sw}
          />
        </g>
      ))}
      {/* Inside-lane low-block notches */}
      <line
        x1={PAINT_LEFT}
        y1={BASELINE_Y - 72}
        x2={PAINT_LEFT}
        y2={BASELINE_Y - 68}
        stroke={LINE}
        strokeWidth={2}
      />
      <line
        x1={PAINT_RIGHT}
        y1={BASELINE_Y - 72}
        x2={PAINT_RIGHT}
        y2={BASELINE_Y - 68}
        stroke={LINE}
        strokeWidth={2}
      />

      {/* Restricted-area arc (4 ft from basket) */}
      <path
        d={`M ${BASKET.x - RESTRICTED_R} ${BASKET.y} A ${RESTRICTED_R} ${RESTRICTED_R} 0 0 1 ${BASKET.x + RESTRICTED_R} ${BASKET.y}`}
        fill="none"
        stroke={LINE_DIM}
        strokeWidth={1.5}
        strokeDasharray="4 3"
      />

      {/* Rim glow */}
      <circle
        cx={BASKET.x}
        cy={BASKET.y}
        r={42}
        fill="url(#rimGlow)"
        pointerEvents="none"
      />

      {/* Backboard */}
      <line
        x1={BASKET.x - 30}
        y1={BACKBOARD_Y}
        x2={BASKET.x + 30}
        y2={BACKBOARD_Y}
        stroke={LINE}
        strokeWidth={3.5}
        strokeLinecap="round"
      />
      {/* Stanchion */}
      <line
        x1={BASKET.x}
        y1={BACKBOARD_Y}
        x2={BASKET.x}
        y2={BASKET.y - HOOP_R}
        stroke={LINE_DIM}
        strokeWidth={1.5}
      />

      {/* Hoop */}
      <circle
        cx={BASKET.x}
        cy={BASKET.y}
        r={HOOP_R}
        fill="none"
        stroke={RIM}
        strokeWidth={2.5}
      />
      {/* Net suggestion */}
      <line
        x1={BASKET.x - 7}
        y1={BASKET.y + 4}
        x2={BASKET.x + 7}
        y2={BASKET.y + 4}
        stroke={RIM}
        strokeWidth={1}
        opacity={0.55}
      />
      <line
        x1={BASKET.x - 5}
        y1={BASKET.y + 7}
        x2={BASKET.x + 5}
        y2={BASKET.y + 7}
        stroke={RIM}
        strokeWidth={1}
        opacity={0.4}
      />

      {children}
    </svg>
  );
}

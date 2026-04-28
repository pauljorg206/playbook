"use client";

// Full-court SVG. viewBox 0 0 500 940 (+ OOB pad on both ends).
// Two HS halves at 1 ft ≈ 10 px. Coordinates 0–100 map via
// (x/100)*500, (y/100)*940.

export const FULL_COURT_WIDTH = 500;
export const FULL_COURT_HEIGHT = 940;
// Extra viewBox padding above/below baselines for OOB / inbounders.
const OOB_PAD = 22;

export function fullCoordToSvg(x: number, y: number) {
  return {
    cx: (x / 100) * FULL_COURT_WIDTH,
    cy: (y / 100) * FULL_COURT_HEIGHT,
  };
}

// Half-court geometry constants (HS varsity, mirrored for top half).
const BASKET_X = 250;
const BASKET_OFFSET = 50; // basket 5 ft from baseline
const BACKBOARD_OFFSET = 40;
const FT_LINE_OFFSET = 190; // 19 ft from baseline
const PAINT_LEFT = 190;
const PAINT_RIGHT = 310;
const FT_CIRCLE_R = 60;
const HOOP_R = 12;
const THREE_PT_R = 197;
const RESTRICTED_R = 40;

const BASELINE_TOP = 10;
const BASELINE_BOT = FULL_COURT_HEIGHT - 10;

// 3-pt line: corner straights from baseline up to basket-y (where the arc
// has a vertical tangent), then arc over the top.
const CORNER_3_X_LEFT = BASKET_X - THREE_PT_R; // 53
const CORNER_3_X_RIGHT = BASKET_X + THREE_PT_R; // 447

// Color tokens
const LINE = "#e8d4a4";
const LINE_DIM = "#a78b56";
const PAINT_FILL = "#0e2d1a";
const PAINT_FILL_DEEP = "#082015";
const RIM = "#ff6b1a";
const FLOOR_GRAIN = "#2a1709";

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
      {/* Painted lane */}
      <rect
        x={PAINT_LEFT}
        y={paintTop}
        width={PAINT_RIGHT - PAINT_LEFT}
        height={paintBot - paintTop}
        fill="url(#paintGrad)"
        stroke={LINE}
        strokeWidth={2}
      />

      {/* Free-throw line */}
      <line
        x1={PAINT_LEFT}
        y1={ftLineY}
        x2={PAINT_RIGHT}
        y2={ftLineY}
        stroke={LINE}
        strokeWidth={2}
      />

      {/* Free-throw circle */}
      <path
        d={`M ${PAINT_LEFT} ${ftLineY} A ${FT_CIRCLE_R} ${FT_CIRCLE_R} 0 0 ${flip ? 0 : 1} ${PAINT_RIGHT} ${ftLineY}`}
        fill="none"
        stroke={LINE}
        strokeWidth={2}
      />
      <path
        d={`M ${PAINT_LEFT} ${ftLineY} A ${FT_CIRCLE_R} ${FT_CIRCLE_R} 0 0 ${flip ? 1 : 0} ${PAINT_RIGHT} ${ftLineY}`}
        fill="none"
        stroke={LINE}
        strokeWidth={1.5}
        strokeDasharray="5 4"
      />

      {/* Backboard */}
      <line
        x1={BASKET_X - 30}
        y1={backboardY}
        x2={BASKET_X + 30}
        y2={backboardY}
        stroke={LINE}
        strokeWidth={3.5}
        strokeLinecap="round"
      />
      {/* Stanchion */}
      <line
        x1={BASKET_X}
        y1={backboardY}
        x2={BASKET_X}
        y2={basketY - dir * HOOP_R}
        stroke={LINE_DIM}
        strokeWidth={1.5}
      />

      {/* Rim glow */}
      <circle
        cx={BASKET_X}
        cy={basketY}
        r={42}
        fill="url(#rimGlow)"
        pointerEvents="none"
      />
      {/* Hoop */}
      <circle
        cx={BASKET_X}
        cy={basketY}
        r={HOOP_R}
        fill="none"
        stroke={RIM}
        strokeWidth={2.5}
      />
      {/* Net suggestion */}
      <line
        x1={BASKET_X - 7}
        y1={basketY + dir * -4}
        x2={BASKET_X + 7}
        y2={basketY + dir * -4}
        stroke={RIM}
        strokeWidth={1}
        opacity={0.55}
      />

      {/* 3-pt line — corner straights + arc */}
      <line
        x1={CORNER_3_X_LEFT}
        y1={baseY}
        x2={CORNER_3_X_LEFT}
        y2={basketY}
        stroke={LINE}
        strokeWidth={2}
      />
      <line
        x1={CORNER_3_X_RIGHT}
        y1={baseY}
        x2={CORNER_3_X_RIGHT}
        y2={basketY}
        stroke={LINE}
        strokeWidth={2}
      />
      <path
        d={`M ${CORNER_3_X_LEFT} ${basketY} A ${THREE_PT_R} ${THREE_PT_R} 0 0 ${flip ? 0 : 1} ${CORNER_3_X_RIGHT} ${basketY}`}
        fill="none"
        stroke={LINE}
        strokeWidth={2}
      />

      {/* Restricted-area arc */}
      <path
        d={`M ${BASKET_X - RESTRICTED_R} ${basketY} A ${RESTRICTED_R} ${RESTRICTED_R} 0 0 ${flip ? 0 : 1} ${BASKET_X + RESTRICTED_R} ${basketY}`}
        fill="none"
        stroke={LINE_DIM}
        strokeWidth={1.5}
        strokeDasharray="4 3"
      />

      {/* Lane hash marks */}
      {[70, 110, 140, 170].map((d, i) => {
        const y = baseY + dir * d;
        const w = i === 0 ? 8 : 6;
        const sw = i === 0 ? 3 : 2;
        return (
          <g key={i}>
            <line
              x1={PAINT_LEFT - w}
              y1={y}
              x2={PAINT_LEFT}
              y2={y}
              stroke={LINE}
              strokeWidth={sw}
            />
            <line
              x1={PAINT_RIGHT}
              y1={y}
              x2={PAINT_RIGHT + w}
              y2={y}
              stroke={LINE}
              strokeWidth={sw}
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
        <radialGradient id="vignetteFull" cx="0.5" cy="0.5" r="0.7">
          <stop offset="60%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.35" />
        </radialGradient>
      </defs>

      {/* Court surface — extends into OOB strips above/below */}
      <rect
        x={0}
        y={-OOB_PAD}
        width={FULL_COURT_WIDTH}
        height={FULL_COURT_HEIGHT + OOB_PAD * 2}
        fill="url(#floorGrad)"
        rx={10}
      />

      {/* Hardwood grain */}
      {Array.from({ length: 38 }).map((_, i) => (
        <line
          key={i}
          x1={0}
          y1={(i + 1) * 24}
          x2={FULL_COURT_WIDTH}
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
        width={FULL_COURT_WIDTH}
        height={FULL_COURT_HEIGHT}
        fill="url(#vignetteFull)"
        pointerEvents="none"
      />

      {/* Boundary */}
      <rect
        x={10}
        y={10}
        width={FULL_COURT_WIDTH - 20}
        height={FULL_COURT_HEIGHT - 20}
        fill="none"
        stroke={LINE}
        strokeWidth={2.5}
        rx={2}
      />

      {/* Half-court line */}
      <line
        x1={10}
        y1={FULL_COURT_HEIGHT / 2}
        x2={FULL_COURT_WIDTH - 10}
        y2={FULL_COURT_HEIGHT / 2}
        stroke={LINE}
        strokeWidth={2}
      />

      {/* Center circle */}
      <circle
        cx={BASKET_X}
        cy={FULL_COURT_HEIGHT / 2}
        r={60}
        fill="none"
        stroke={LINE}
        strokeWidth={2}
      />
      <circle
        cx={BASKET_X}
        cy={FULL_COURT_HEIGHT / 2}
        r={20}
        fill="none"
        stroke={LINE_DIM}
        strokeWidth={1.5}
        strokeDasharray="4 3"
      />

      <HalfCourtMarkings flip={true} />
      <HalfCourtMarkings flip={false} />

      {children}
    </svg>
  );
}

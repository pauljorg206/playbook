"use client";

// Full-court SVG. viewBox 0 0 500 940. Top basket near y=56, bottom near y=884.
// Coordinates map via (x/100)*500, (y/100)*940

export const FULL_COURT_WIDTH = 500;
export const FULL_COURT_HEIGHT = 940;

export function fullCoordToSvg(x: number, y: number) {
  return {
    cx: (x / 100) * FULL_COURT_WIDTH,
    cy: (y / 100) * FULL_COURT_HEIGHT,
  };
}

const LINE = "#e8d4a4";
const LINE_DIM = "#a78b56";
const PAINT_FILL = "#0e2d1a";
const PAINT_FILL_DEEP = "#082015";
const RIM = "#ff6b1a";
const FLOOR_GRAIN = "#2a1709";

const PAINT_HALF_WIDTH = 80;
const PAINT_LENGTH = 190;
const THREE_RADIUS = 235;

function HalfCourtMarkings({ flip = false }: { flip?: boolean }) {
  const baselineY = flip ? 10 : FULL_COURT_HEIGHT - 10;
  const basketY = flip ? 56 : FULL_COURT_HEIGHT - 56;
  const backboardY = flip ? 46 : FULL_COURT_HEIGHT - 46;
  const ftY = flip ? 10 + PAINT_LENGTH : FULL_COURT_HEIGHT - 10 - PAINT_LENGTH;
  const cornerInner = 30;
  const cornerOuter = 470;
  // y where 3pt arc meets straight (lateral 220 from 250)
  const cornerArcY = flip
    ? basketY + Math.sqrt(THREE_RADIUS ** 2 - 220 ** 2)
    : basketY - Math.sqrt(THREE_RADIUS ** 2 - 220 ** 2);

  const paintTop = Math.min(ftY, baselineY);
  const paintBottom = Math.max(ftY, baselineY);

  return (
    <g>
      {/* Paint */}
      <rect
        x={250 - PAINT_HALF_WIDTH}
        y={paintTop}
        width={PAINT_HALF_WIDTH * 2}
        height={paintBottom - paintTop}
        fill="url(#paintGrad)"
        stroke={LINE}
        strokeWidth={2}
      />
      {/* FT line */}
      <line
        x1={250 - PAINT_HALF_WIDTH}
        y1={ftY}
        x2={250 + PAINT_HALF_WIDTH}
        y2={ftY}
        stroke={LINE}
        strokeWidth={2}
      />
      {/* FT circle */}
      <path
        d={`M ${250 - PAINT_HALF_WIDTH} ${ftY} A 80 80 0 0 ${flip ? 1 : 0} ${250 + PAINT_HALF_WIDTH} ${ftY}`}
        fill="none"
        stroke={LINE}
        strokeWidth={2}
        strokeDasharray="6 5"
      />
      <path
        d={`M ${250 - PAINT_HALF_WIDTH} ${ftY} A 80 80 0 0 ${flip ? 0 : 1} ${250 + PAINT_HALF_WIDTH} ${ftY}`}
        fill="none"
        stroke={LINE}
        strokeWidth={2}
      />
      {/* Backboard */}
      <line
        x1={250 - 30}
        y1={backboardY}
        x2={250 + 30}
        y2={backboardY}
        stroke={LINE}
        strokeWidth={3.5}
        strokeLinecap="round"
      />
      {/* Rim glow */}
      <circle cx={250} cy={basketY} r={42} fill="url(#rimGlow)" pointerEvents="none" />
      {/* Rim */}
      <circle cx={250} cy={basketY} r={9} fill="none" stroke={RIM} strokeWidth={2.5} />
      {/* 3pt — corner straights + arc */}
      <line
        x1={cornerInner}
        y1={baselineY}
        x2={cornerInner}
        y2={cornerArcY}
        stroke={LINE}
        strokeWidth={2}
      />
      <line
        x1={cornerOuter}
        y1={baselineY}
        x2={cornerOuter}
        y2={cornerArcY}
        stroke={LINE}
        strokeWidth={2}
      />
      <path
        d={
          flip
            ? `M ${cornerInner} ${cornerArcY} A ${THREE_RADIUS} ${THREE_RADIUS} 0 0 0 ${cornerOuter} ${cornerArcY}`
            : `M ${cornerInner} ${cornerArcY} A ${THREE_RADIUS} ${THREE_RADIUS} 0 0 1 ${cornerOuter} ${cornerArcY}`
        }
        fill="none"
        stroke={LINE}
        strokeWidth={2}
      />
      {/* Restricted area */}
      <path
        d={
          flip
            ? `M ${250 - 40} ${baselineY} A 40 40 0 0 0 ${250 + 40} ${baselineY}`
            : `M ${250 - 40} ${baselineY} A 40 40 0 0 1 ${250 + 40} ${baselineY}`
        }
        fill="none"
        stroke={LINE_DIM}
        strokeWidth={1.5}
        strokeDasharray="4 3"
      />
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
      viewBox={`0 0 ${FULL_COURT_WIDTH} ${FULL_COURT_HEIGHT}`}
      className="w-full h-full"
      style={{ background: "transparent" }}
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

      {/* Floor */}
      <rect
        x={0}
        y={0}
        width={FULL_COURT_WIDTH}
        height={FULL_COURT_HEIGHT}
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
        rx={4}
      />

      {/* Half court line */}
      <line
        x1={10}
        y1={FULL_COURT_HEIGHT / 2}
        x2={FULL_COURT_WIDTH - 10}
        y2={FULL_COURT_HEIGHT / 2}
        stroke={LINE}
        strokeWidth={2}
      />

      {/* Center circles */}
      <circle
        cx={250}
        cy={FULL_COURT_HEIGHT / 2}
        r={60}
        fill="none"
        stroke={LINE}
        strokeWidth={2}
      />
      <circle
        cx={250}
        cy={FULL_COURT_HEIGHT / 2}
        r={20}
        fill="none"
        stroke={LINE_DIM}
        strokeWidth={2}
      />

      <HalfCourtMarkings flip={true} />
      <HalfCourtMarkings flip={false} />

      {children}
    </svg>
  );
}

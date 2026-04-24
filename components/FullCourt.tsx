"use client";

// Full-court SVG. viewBox 0 0 500 940. Top basket y≈56, bottom basket y≈884.
// Coordinates map via (x/100)*500, (y/100)*940

export const FULL_COURT_WIDTH = 500;
export const FULL_COURT_HEIGHT = 940;

export function fullCoordToSvg(x: number, y: number) {
  return {
    cx: (x / 100) * FULL_COURT_WIDTH,
    cy: (y / 100) * FULL_COURT_HEIGHT,
  };
}

function HalfCourtMarkings({ flip = false }: { flip?: boolean }) {
  const baseY = flip ? 10 : FULL_COURT_HEIGHT - 10;
  const dir = flip ? 1 : -1;

  const basketY = flip ? 56 : FULL_COURT_HEIGHT - 56;
  const backboardY = flip ? 46 : FULL_COURT_HEIGHT - 46;
  const ftLineY = flip ? 155 : FULL_COURT_HEIGHT - 155;
  const paintTopY = flip ? 155 : FULL_COURT_HEIGHT - 155;
  const paintBotY = flip ? 10 : FULL_COURT_HEIGHT - 10;

  return (
    <g>
      {/* Paint */}
      <rect
        x={182}
        y={Math.min(paintTopY, paintBotY)}
        width={136}
        height={Math.abs(paintTopY - paintBotY)}
        fill="#0f2a1a"
        stroke="#c8a96e"
        strokeWidth={2}
      />
      {/* FT line */}
      <line
        x1={182}
        y1={ftLineY}
        x2={318}
        y2={ftLineY}
        stroke="#c8a96e"
        strokeWidth={2}
      />
      {/* FT circle */}
      <path
        d={`M 182 ${ftLineY} A 68 68 0 0 ${flip ? 1 : 0} 318 ${ftLineY}`}
        fill="none"
        stroke="#c8a96e"
        strokeWidth={2}
        strokeDasharray="6 4"
      />
      <path
        d={`M 182 ${ftLineY} A 68 68 0 0 ${flip ? 0 : 1} 318 ${ftLineY}`}
        fill="none"
        stroke="#c8a96e"
        strokeWidth={2}
      />
      {/* Backboard */}
      <line
        x1={222}
        y1={backboardY}
        x2={278}
        y2={backboardY}
        stroke="#c8a96e"
        strokeWidth={3}
      />
      {/* Basket */}
      <circle
        cx={250}
        cy={basketY}
        r={14}
        fill="none"
        stroke="#e05a00"
        strokeWidth={2.5}
      />
      <circle cx={250} cy={basketY} r={3} fill="#e05a00" />
      {/* 3pt line */}
      <path
        d={
          flip
            ? `M 36 10 L 36 ${10 + 175} A 218 218 0 0 1 464 ${10 + 175} L 464 10`
            : `M 36 ${FULL_COURT_HEIGHT - 10} L 36 ${FULL_COURT_HEIGHT - 10 - 175} A 218 218 0 0 0 464 ${FULL_COURT_HEIGHT - 10 - 175} L 464 ${FULL_COURT_HEIGHT - 10}`
        }
        fill="none"
        stroke="#c8a96e"
        strokeWidth={2}
      />
      {/* Restricted area */}
      <path
        d={
          flip
            ? `M 218 10 A 40 40 0 0 1 282 10`
            : `M 218 ${FULL_COURT_HEIGHT - 10} A 40 40 0 0 0 282 ${FULL_COURT_HEIGHT - 10}`
        }
        fill="none"
        stroke="#c8a96e"
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
      {/* Court surface */}
      <rect
        x={0}
        y={0}
        width={FULL_COURT_WIDTH}
        height={FULL_COURT_HEIGHT}
        fill="#1a1008"
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
          stroke="#221508"
          strokeWidth={1}
        />
      ))}

      {/* Boundary */}
      <rect
        x={10}
        y={10}
        width={FULL_COURT_WIDTH - 20}
        height={FULL_COURT_HEIGHT - 20}
        fill="none"
        stroke="#c8a96e"
        strokeWidth={2.5}
        rx={4}
      />

      {/* Half court line */}
      <line
        x1={10}
        y1={FULL_COURT_HEIGHT / 2}
        x2={FULL_COURT_WIDTH - 10}
        y2={FULL_COURT_HEIGHT / 2}
        stroke="#c8a96e"
        strokeWidth={2}
      />

      {/* Center circle */}
      <circle
        cx={250}
        cy={FULL_COURT_HEIGHT / 2}
        r={60}
        fill="none"
        stroke="#c8a96e"
        strokeWidth={2}
      />
      <circle
        cx={250}
        cy={FULL_COURT_HEIGHT / 2}
        r={8}
        fill="none"
        stroke="#c8a96e"
        strokeWidth={2}
      />

      {/* Top half (defense basket, y goes down from 0) */}
      <HalfCourtMarkings flip={true} />

      {/* Bottom half (offense basket) */}
      <HalfCourtMarkings flip={false} />

      {children}
    </svg>
  );
}

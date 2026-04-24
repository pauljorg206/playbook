"use client";

// Half-court SVG. viewBox 0 0 500 470. Basket at bottom center.
// Court coordinates map to 0-100 percentage via (x/100)*500, (y/100)*470

export const COURT_WIDTH = 500;
export const COURT_HEIGHT = 470;

export function coordToSvg(x: number, y: number) {
  return { cx: (x / 100) * COURT_WIDTH, cy: (y / 100) * COURT_HEIGHT };
}

export default function Court({ children }: { children?: React.ReactNode }) {
  return (
    <svg
      viewBox={`0 0 ${COURT_WIDTH} ${COURT_HEIGHT}`}
      className="w-full h-full"
      style={{ background: "transparent" }}
    >
      {/* Court surface */}
      <rect
        x={0}
        y={0}
        width={COURT_WIDTH}
        height={COURT_HEIGHT}
        fill="#1a1008"
        rx={8}
      />

      {/* Hardwood grain lines */}
      {Array.from({ length: 14 }).map((_, i) => (
        <line
          key={i}
          x1={0}
          y1={(i + 1) * 32}
          x2={COURT_WIDTH}
          y2={(i + 1) * 32}
          stroke="#221508"
          strokeWidth={1}
        />
      ))}

      {/* Court boundary */}
      <rect
        x={10}
        y={10}
        width={COURT_WIDTH - 20}
        height={COURT_HEIGHT - 20}
        fill="none"
        stroke="#c8a96e"
        strokeWidth={2.5}
        rx={4}
      />

      {/* Half court line (top) */}
      <line
        x1={10}
        y1={10}
        x2={COURT_WIDTH - 10}
        y2={10}
        stroke="#c8a96e"
        strokeWidth={2.5}
      />

      {/* Key / Paint — rectangle from baseline */}
      {/* Lane: 16ft wide = 160/470 of court height... use pixel coords */}
      {/* Baseline at y=450, free throw line at y=295 */}
      <rect
        x={182}
        y={295}
        width={136}
        height={155}
        fill="#0f2a1a"
        stroke="#c8a96e"
        strokeWidth={2}
      />

      {/* Free throw line */}
      <line
        x1={182}
        y1={295}
        x2={318}
        y2={295}
        stroke="#c8a96e"
        strokeWidth={2}
      />

      {/* Free throw circle top half */}
      <path
        d="M 182 295 A 68 68 0 0 1 318 295"
        fill="none"
        stroke="#c8a96e"
        strokeWidth={2}
        strokeDasharray="6 4"
      />
      {/* Free throw circle bottom half (solid) */}
      <path
        d="M 182 295 A 68 68 0 0 0 318 295"
        fill="none"
        stroke="#c8a96e"
        strokeWidth={2}
      />

      {/* Restricted area arc */}
      <path
        d="M 218 450 A 40 40 0 0 1 282 450"
        fill="none"
        stroke="#c8a96e"
        strokeWidth={1.5}
        strokeDasharray="4 3"
      />

      {/* Backboard */}
      <line
        x1={222}
        y1={442}
        x2={278}
        y2={442}
        stroke="#c8a96e"
        strokeWidth={3}
      />

      {/* Basket */}
      <circle
        cx={250}
        cy={432}
        r={14}
        fill="none"
        stroke="#e05a00"
        strokeWidth={2.5}
      />
      <circle cx={250} cy={432} r={3} fill="#e05a00" />

      {/* Three-point line arc — HS style pure arc centered on basket */}
      <path
        d="M 34 460 A 218 218 0 0 0 466 460"
        fill="none"
        stroke="#c8a96e"
        strokeWidth={2}
      />

      {/* Elbow marks on free throw lane */}
      <line
        x1={182}
        y1={350}
        x2={162}
        y2={350}
        stroke="#c8a96e"
        strokeWidth={1.5}
      />
      <line
        x1={318}
        y1={350}
        x2={338}
        y2={350}
        stroke="#c8a96e"
        strokeWidth={1.5}
      />
      <line
        x1={182}
        y1={390}
        x2={162}
        y2={390}
        stroke="#c8a96e"
        strokeWidth={1.5}
      />
      <line
        x1={318}
        y1={390}
        x2={338}
        y2={390}
        stroke="#c8a96e"
        strokeWidth={1.5}
      />

      {/* Lane space marks (blocks) */}
      <line
        x1={182}
        y1={410}
        x2={182}
        y2={430}
        stroke="#c8a96e"
        strokeWidth={2}
      />
      <line
        x1={318}
        y1={410}
        x2={318}
        y2={430}
        stroke="#c8a96e"
        strokeWidth={2}
      />
      <line
        x1={205}
        y1={450}
        x2={205}
        y2={440}
        stroke="#c8a96e"
        strokeWidth={2}
      />
      <line
        x1={295}
        y1={450}
        x2={295}
        y2={440}
        stroke="#c8a96e"
        strokeWidth={2}
      />

      {/* Center circle at top (half of circle) */}
      <path
        d="M 174 10 A 76 76 0 0 0 326 10"
        fill="none"
        stroke="#c8a96e"
        strokeWidth={2}
        strokeDasharray="6 4"
      />

      {children}
    </svg>
  );
}

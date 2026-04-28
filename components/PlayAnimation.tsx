"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  PlayStep,
  MovementArrow,
  Screen,
  PlayerPosition,
} from "@/lib/types";
import { coordToSvg } from "./Court";
import { fullCoordToSvg } from "./FullCourt";
import Court from "./Court";
import FullCourt from "./FullCourt";

interface PlayAnimationProps {
  play: Play;
  stepIndex: number;
  progress: number; // 0-1 within the current step
  showGhosts?: boolean;
  roster?: Record<string, { name: string; number: string }>;
}

type CourtType = "half" | "full";

interface Pt {
  cx: number;
  cy: number;
}

const ROLE_COLORS: Record<
  string,
  { fill: string; stroke: string; text: string }
> = {
  offense: { fill: "#1e40af", stroke: "#7dd3fc", text: "#ffffff" },
  defense: { fill: "#b91c1c", stroke: "#fca5a5", text: "#ffffff" },
  inbounder: { fill: "#1e40af", stroke: "#7dd3fc", text: "#ffffff" },
};

function toSvg(x: number, y: number, courtType: CourtType): Pt {
  return courtType === "full" ? fullCoordToSvg(x, y) : coordToSvg(x, y);
}

// ─── Path math ────────────────────────────────────────────────────────
function pointOnArrow(
  arrow: MovementArrow,
  t: number,
  courtType: CourtType,
): Pt {
  const from = toSvg(arrow.fromX, arrow.fromY, courtType);
  const to = toSvg(arrow.toX, arrow.toY, courtType);
  const tt = Math.max(0, Math.min(1, t));
  if (
    arrow.curved &&
    arrow.controlX !== undefined &&
    arrow.controlY !== undefined
  ) {
    const ctrl = toSvg(arrow.controlX, arrow.controlY, courtType);
    const u = 1 - tt;
    return {
      cx: u * u * from.cx + 2 * u * tt * ctrl.cx + tt * tt * to.cx,
      cy: u * u * from.cy + 2 * u * tt * ctrl.cy + tt * tt * to.cy,
    };
  }
  return {
    cx: from.cx + (to.cx - from.cx) * tt,
    cy: from.cy + (to.cy - from.cy) * tt,
  };
}

function arrowPathString(arrow: MovementArrow, courtType: CourtType): string {
  const from = toSvg(arrow.fromX, arrow.fromY, courtType);
  const to = toSvg(arrow.toX, arrow.toY, courtType);
  if (
    arrow.curved &&
    arrow.controlX !== undefined &&
    arrow.controlY !== undefined
  ) {
    const ctrl = toSvg(arrow.controlX, arrow.controlY, courtType);
    return `M ${from.cx} ${from.cy} Q ${ctrl.cx} ${ctrl.cy} ${to.cx} ${to.cy}`;
  }
  return `M ${from.cx} ${from.cy} L ${to.cx} ${to.cy}`;
}

function arrowTangentAt(
  arrow: MovementArrow,
  t: number,
  courtType: CourtType,
): { dx: number; dy: number } {
  const from = toSvg(arrow.fromX, arrow.fromY, courtType);
  const to = toSvg(arrow.toX, arrow.toY, courtType);
  if (
    arrow.curved &&
    arrow.controlX !== undefined &&
    arrow.controlY !== undefined
  ) {
    const ctrl = toSvg(arrow.controlX, arrow.controlY, courtType);
    const u = 1 - t;
    return {
      dx: 2 * u * (ctrl.cx - from.cx) + 2 * t * (to.cx - ctrl.cx),
      dy: 2 * u * (ctrl.cy - from.cy) + 2 * t * (to.cy - ctrl.cy),
    };
  }
  return { dx: to.cx - from.cx, dy: to.cy - from.cy };
}

// Resolve a player's live position at (stepIndex, progress).
function resolvePlayerPosition(
  player: PlayerPosition,
  step: PlayStep,
  prevStep: PlayStep | undefined,
  progress: number,
  courtType: CourtType,
): Pt {
  // If there are movement arrows for this player, walk them sequentially.
  const arrows = step.movements.filter((m) => m.playerId === player.id);
  if (arrows.length > 0) {
    const segIndex = Math.min(
      arrows.length - 1,
      Math.floor(progress * arrows.length),
    );
    const segProgress = progress * arrows.length - segIndex;
    return pointOnArrow(arrows[segIndex], segProgress, courtType);
  }

  // Otherwise, lerp from previous step position to current step position.
  if (prevStep) {
    const prev = prevStep.players.find((p) => p.id === player.id);
    if (prev && (prev.x !== player.x || prev.y !== player.y)) {
      const from = toSvg(prev.x, prev.y, courtType);
      const to = toSvg(player.x, player.y, courtType);
      return {
        cx: from.cx + (to.cx - from.cx) * progress,
        cy: from.cy + (to.cy - from.cy) * progress,
      };
    }
  }

  return toSvg(player.x, player.y, courtType);
}

// ─── Visual building blocks ───────────────────────────────────────────

function ArrowTrace({
  arrow,
  courtType,
  visible,
  appearAt,
  endAt,
}: {
  arrow: MovementArrow;
  courtType: CourtType;
  visible: number; // 0-1: how much of the path is drawn
  appearAt: number; // 0-1: when arrow starts appearing
  endAt: number; // 0-1: when arrowhead fully revealed
}) {
  const path = arrowPathString(arrow, courtType);
  const isPass = arrow.type === "pass";
  const isDribble = arrow.type === "dribble";
  const isScreen = arrow.type === "screen";

  const stroke = isPass
    ? "#fbbf24"
    : isDribble
      ? "#4ade80"
      : isScreen
        ? "#fb923c"
        : "#7dd3fc";

  const dashArray = isPass ? "9 6" : isDribble ? "5 5" : undefined;
  const width = isPass ? 2.8 : 2.2;

  // Arrow head at the end of the curve, oriented along the tangent
  const tip = pointOnArrow(arrow, 1, courtType);
  const tan = arrowTangentAt(arrow, 1, courtType);
  const len = Math.hypot(tan.dx, tan.dy) || 1;
  const ux = tan.dx / len;
  const uy = tan.dy / len;
  const size = courtType === "full" ? 9 : 11;
  const base = { x: tip.cx - ux * size, y: tip.cy - uy * size };
  const perp = { x: -uy * size * 0.55, y: ux * size * 0.55 };
  const headPts = `${tip.cx},${tip.cy} ${base.x + perp.x},${base.y + perp.y} ${base.x - perp.x},${base.y - perp.y}`;

  const opacity = visible <= 0 ? 0 : Math.min(1, (visible - 0) * 1.5);

  return (
    <g style={{ opacity }}>
      <path
        d={path}
        fill="none"
        stroke={stroke}
        strokeWidth={width}
        strokeDasharray={dashArray}
        strokeLinecap="round"
        pathLength={1}
        strokeDashoffset={dashArray ? undefined : 1 - visible}
        style={{
          // For solid lines, animate via dashoffset trick (mask the path).
          // For dashed lines (pass/dribble), reveal by drawing length only.
          strokeDasharray: dashArray
            ? dashArray
            : `${visible} ${1 - visible + 0.0001}`,
        }}
      />
      {visible >= 0.95 && (
        <polygon
          points={headPts}
          fill={stroke}
          opacity={Math.min(1, (visible - 0.9) * 10)}
        />
      )}
      {/* Tiny labels — not drawn here, kept lean for performance */}
      {void appearAt}
      {void endAt}
    </g>
  );
}

function ScreenMark({
  screen,
  courtType,
  visible,
}: {
  screen: Screen;
  courtType: CourtType;
  visible: number;
}) {
  const { cx, cy } = toSvg(screen.x, screen.y, courtType);
  const rad = (screen.angle * Math.PI) / 180;
  const len = courtType === "full" ? 14 : 18;
  const px = Math.cos(rad + Math.PI / 2) * len;
  const py = Math.sin(rad + Math.PI / 2) * len;
  const opacity = Math.max(0, Math.min(1, (visible - 0.4) * 2.5));
  return (
    <g opacity={opacity}>
      {/* Glow halo */}
      <circle cx={cx} cy={cy} r={len + 2} fill="#fb923c" opacity={0.18} />
      {/* Screen wall */}
      <line
        x1={cx - px}
        y1={cy - py}
        x2={cx + px}
        y2={cy + py}
        stroke="#fb923c"
        strokeWidth={6}
        strokeLinecap="round"
      />
      {/* End caps so it reads as a wall */}
      <circle cx={cx - px} cy={cy - py} r={2.2} fill="#fed7aa" />
      <circle cx={cx + px} cy={cy + py} r={2.2} fill="#fed7aa" />
    </g>
  );
}

function PlayerChip({
  pos,
  player,
  courtType,
  ghost,
  rosterName,
  rosterNumber,
}: {
  pos: Pt;
  player: PlayerPosition;
  courtType: CourtType;
  ghost?: boolean;
  rosterName?: string;
  rosterNumber?: string;
}) {
  const colors = ROLE_COLORS[player.role] || ROLE_COLORS.offense;
  const radius = courtType === "full" ? 17 : 21;
  const fontSize = courtType === "full" ? 12 : 14;
  const label = rosterNumber || player.label;

  return (
    <g
      style={{
        opacity: ghost ? 0.22 : 1,
        transition: "opacity 200ms ease",
      }}
    >
      {/* Defender indicator: an X-style ring */}
      {player.role === "defense" && !ghost && (
        <circle
          cx={pos.cx}
          cy={pos.cy}
          r={radius + 3}
          fill="none"
          stroke={colors.stroke}
          strokeWidth={1.2}
          opacity={0.5}
          strokeDasharray="3 3"
        />
      )}
      {/* Soft shadow/halo */}
      {!ghost && (
        <circle
          cx={pos.cx}
          cy={pos.cy + 2}
          r={radius}
          fill="#000"
          opacity={0.25}
        />
      )}
      {/* Body */}
      <circle
        cx={pos.cx}
        cy={pos.cy}
        r={radius}
        fill={ghost ? "#293040" : colors.fill}
        stroke={ghost ? "#3b4152" : colors.stroke}
        strokeWidth={ghost ? 1 : 2.5}
      />
      {/* Inner gloss */}
      {!ghost && (
        <ellipse
          cx={pos.cx}
          cy={pos.cy - radius * 0.35}
          rx={radius * 0.65}
          ry={radius * 0.28}
          fill="#fff"
          opacity={0.18}
        />
      )}
      {/* Label */}
      <text
        x={pos.cx}
        y={pos.cy + fontSize * 0.36}
        textAnchor="middle"
        fontSize={fontSize}
        fontWeight={800}
        fill={ghost ? "#64748b" : colors.text}
        fontFamily="system-ui, sans-serif"
        style={{ userSelect: "none", pointerEvents: "none" }}
      >
        {label}
      </text>
      {rosterName && !ghost && (
        <text
          x={pos.cx}
          y={pos.cy + radius + 13}
          textAnchor="middle"
          fontSize={9}
          fontWeight={600}
          fill="#cbd5e1"
          fontFamily="system-ui, sans-serif"
          style={{ userSelect: "none", pointerEvents: "none" }}
        >
          {rosterName.split(" ")[0]}
        </text>
      )}
    </g>
  );
}

function Basketball({ pos, r = 8 }: { pos: Pt; r?: number }) {
  return (
    <g>
      {/* Glow */}
      <circle cx={pos.cx} cy={pos.cy} r={r + 4} fill="#fb923c" opacity={0.25} />
      {/* Ball body */}
      <circle
        cx={pos.cx}
        cy={pos.cy}
        r={r}
        fill="#f97316"
        stroke="#1a0a00"
        strokeWidth={1.2}
      />
      {/* Seams */}
      <line
        x1={pos.cx - r}
        y1={pos.cy}
        x2={pos.cx + r}
        y2={pos.cy}
        stroke="#1a0a00"
        strokeWidth={0.9}
      />
      <line
        x1={pos.cx}
        y1={pos.cy - r}
        x2={pos.cx}
        y2={pos.cy + r}
        stroke="#1a0a00"
        strokeWidth={0.9}
      />
      <path
        d={`M ${pos.cx - r * 0.85} ${pos.cy - r * 0.5} Q ${pos.cx} ${pos.cy} ${pos.cx + r * 0.85} ${pos.cy - r * 0.5}`}
        fill="none"
        stroke="#1a0a00"
        strokeWidth={0.7}
      />
      <path
        d={`M ${pos.cx - r * 0.85} ${pos.cy + r * 0.5} Q ${pos.cx} ${pos.cy} ${pos.cx + r * 0.85} ${pos.cy + r * 0.5}`}
        fill="none"
        stroke="#1a0a00"
        strokeWidth={0.7}
      />
      {/* Highlight */}
      <ellipse
        cx={pos.cx - r * 0.4}
        cy={pos.cy - r * 0.4}
        rx={r * 0.35}
        ry={r * 0.2}
        fill="#fff"
        opacity={0.4}
      />
    </g>
  );
}

// ─── Component ────────────────────────────────────────────────────────

export default function PlayAnimation({
  play,
  stepIndex,
  progress,
  showGhosts = true,
  roster,
}: PlayAnimationProps) {
  const step: PlayStep = play.steps[stepIndex];
  const prevStep: PlayStep | undefined = play.steps[stepIndex - 1];
  const courtType: CourtType = play.courtType;

  const CourtComponent = courtType === "full" ? FullCourt : Court;

  // Resolve every player's live position
  const livePositions = useMemo(() => {
    const m = new Map<string, Pt>();
    step.players.forEach((p) => {
      m.set(p.id, resolvePlayerPosition(p, step, prevStep, progress, courtType));
    });
    return m;
  }, [step, prevStep, progress, courtType]);

  // Find ball carrier in the current step
  const ballHolder = step.players.find((p) => p.hasBall);
  const prevBallHolder = prevStep?.players.find((p) => p.hasBall);
  const passArrow = step.movements.find((m) => m.type === "pass");

  // Compute the ball position. Two cases:
  //  • If a pass exists this step: ball travels along the pass arrow
  //    over progress 0.05 → 0.85 (so it lands a beat before the step ends).
  //  • Otherwise the ball stays glued to the ball-handler (their live pos)
  //    or, if the carrier just changed, lerp from old → new pos.
  const ballPos: Pt | null = (() => {
    if (passArrow) {
      const tt = Math.max(0, Math.min(1, (progress - 0.05) / 0.8));
      // pass arc — give it a small bezier hop for visual flair
      const from = toSvg(passArrow.fromX, passArrow.fromY, courtType);
      const to = toSvg(passArrow.toX, passArrow.toY, courtType);
      const mid = {
        cx: (from.cx + to.cx) / 2,
        cy: (from.cy + to.cy) / 2 - 18,
      };
      const u = 1 - tt;
      return {
        cx: u * u * from.cx + 2 * u * tt * mid.cx + tt * tt * to.cx,
        cy: u * u * from.cy + 2 * u * tt * mid.cy + tt * tt * to.cy,
      };
    }
    if (ballHolder) {
      const live = livePositions.get(ballHolder.id);
      if (live) {
        // Ball hugs the upper-right of the chip
        const r = courtType === "full" ? 17 : 21;
        return { cx: live.cx + r - 4, cy: live.cy - r + 4 };
      }
    }
    if (prevBallHolder) {
      const live = livePositions.get(prevBallHolder.id);
      if (live) {
        const r = courtType === "full" ? 17 : 21;
        return { cx: live.cx + r - 4, cy: live.cy - r + 4 };
      }
    }
    return null;
  })();

  return (
    <div className="w-full h-full relative">
      <CourtComponent>
        {/* Ghost players from previous step (faint, not animated) */}
        {showGhosts &&
          prevStep?.players.map((ghost) => {
            const p = toSvg(ghost.x, ghost.y, courtType);
            return (
              <PlayerChip
                key={`ghost-${ghost.id}`}
                pos={p}
                player={ghost}
                courtType={courtType}
                ghost
              />
            );
          })}

        {/* Movement arrows — trace as progress advances */}
        {step.movements.map((arrow, i) => {
          // Sequential per-player: figure out segment-window for visibility
          const sameOwner = step.movements.filter(
            (m) => m.playerId === arrow.playerId,
          );
          const idx = sameOwner.indexOf(arrow);
          const segCount = sameOwner.length;
          const segStart = idx / segCount;
          const segEnd = (idx + 1) / segCount;
          const local = (progress - segStart) / (segEnd - segStart);
          const visible = Math.max(0, Math.min(1, local));
          // Pass arrows: fade out after the ball lands so the floor stays clean
          const isPass = arrow.type === "pass";
          const fade =
            isPass && progress > 0.9 ? Math.max(0, 1 - (progress - 0.9) * 8) : 1;
          return (
            <g key={i} style={{ opacity: fade }}>
              <ArrowTrace
                arrow={arrow}
                courtType={courtType}
                visible={visible}
                appearAt={segStart}
                endAt={segEnd}
              />
            </g>
          );
        })}

        {/* Screens — appear as the screener arrives */}
        {step.screens?.map((screen, i) => (
          <ScreenMark
            key={i}
            screen={screen}
            courtType={courtType}
            visible={progress}
          />
        ))}

        {/* Ball-carrier ring (under chip) */}
        {ballHolder &&
          (() => {
            const live = livePositions.get(ballHolder.id);
            if (!live) return null;
            const r = courtType === "full" ? 17 : 21;
            return (
              <circle
                key={`ring-${ballHolder.id}`}
                cx={live.cx}
                cy={live.cy}
                r={r + 6}
                fill="none"
                stroke="#fb923c"
                strokeWidth={2}
                opacity={0.55}
              />
            );
          })()}

        {/* Players */}
        {step.players.map((player) => {
          const live = livePositions.get(player.id)!;
          const rosterEntry = roster?.[player.label];
          return (
            <PlayerChip
              key={player.id}
              pos={live}
              player={player}
              courtType={courtType}
              rosterName={rosterEntry?.name}
              rosterNumber={rosterEntry?.number}
            />
          );
        })}

        {/* Basketball — drawn last so it sits on top */}
        {ballPos && <Basketball pos={ballPos} r={courtType === "full" ? 7 : 9} />}
      </CourtComponent>

      {/* Live caption — large, fades between steps */}
      <AnimatePresence mode="wait">
        <motion.div
          key={stepIndex}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none absolute left-2 right-2 bottom-2 px-3 py-2 rounded-xl bg-black/55 backdrop-blur-sm border border-white/10"
        >
          <p className="text-white text-xs md:text-sm font-medium leading-snug">
            {step.description}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

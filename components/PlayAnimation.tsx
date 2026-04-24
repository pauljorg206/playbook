"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Play, PlayStep, MovementArrow, Screen } from "@/lib/types";
import { coordToSvg, COURT_WIDTH, COURT_HEIGHT } from "./Court";
import {
  fullCoordToSvg,
  FULL_COURT_WIDTH,
  FULL_COURT_HEIGHT,
} from "./FullCourt";
import Court from "./Court";
import FullCourt from "./FullCourt";
import Player from "./Player";

interface PlayAnimationProps {
  play: Play;
  stepIndex: number;
  showGhosts?: boolean;
  roster?: Record<string, { name: string; number: string }>;
}

function toSvg(x: number, y: number, courtType: "half" | "full") {
  return courtType === "full" ? fullCoordToSvg(x, y) : coordToSvg(x, y);
}

function buildPath(arrow: MovementArrow, courtType: "half" | "full"): string {
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

function arrowHeadPoints(
  arrow: MovementArrow,
  courtType: "half" | "full",
): string {
  const to = toSvg(arrow.toX, arrow.toY, courtType);
  let dx: number, dy: number;

  if (
    arrow.curved &&
    arrow.controlX !== undefined &&
    arrow.controlY !== undefined
  ) {
    const ctrl = toSvg(arrow.controlX, arrow.controlY, courtType);
    dx = to.cx - ctrl.cx;
    dy = to.cy - ctrl.cy;
  } else {
    const from = toSvg(arrow.fromX, arrow.fromY, courtType);
    dx = to.cx - from.cx;
    dy = to.cy - from.cy;
  }

  const len = Math.sqrt(dx * dx + dy * dy);
  if (len === 0) return "";
  const ux = dx / len;
  const uy = dy / len;
  const size = 11;
  const tip = { x: to.cx, y: to.cy };
  const base = { x: to.cx - ux * size, y: to.cy - uy * size };
  const perp = { x: -uy * (size * 0.45), y: ux * (size * 0.45) };
  return `${tip.x},${tip.y} ${base.x + perp.x},${base.y + perp.y} ${base.x - perp.x},${base.y - perp.y}`;
}

function Arrow({
  arrow,
  courtType,
}: {
  arrow: MovementArrow;
  courtType: "half" | "full";
}) {
  const path = buildPath(arrow, courtType);
  const head = arrowHeadPoints(arrow, courtType);
  const isPass = arrow.type === "pass";
  const isDribble = arrow.type === "dribble";

  const strokeColor =
    arrow.type === "pass"
      ? "#facc15"
      : arrow.type === "dribble"
        ? "#4ade80"
        : "#38bdf8";

  const dashArray = isPass ? "10 6" : isDribble ? "5 5" : undefined;

  return (
    <g>
      <motion.path
        d={path}
        fill="none"
        stroke={strokeColor}
        strokeWidth={isPass ? 2.5 : 2}
        strokeDasharray={dashArray}
        strokeLinecap="round"
        opacity={0.9}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.9 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
      />
      {head && (
        <motion.polygon
          points={head}
          fill={strokeColor}
          opacity={0.9}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.9, scale: 1 }}
          transition={{ delay: 0.65, duration: 0.2 }}
        />
      )}
    </g>
  );
}

function ScreenMark({
  screen,
  courtType,
}: {
  screen: Screen;
  courtType: "half" | "full";
}) {
  const { cx, cy } = toSvg(screen.x, screen.y, courtType);
  const rad = (screen.angle * Math.PI) / 180;
  const len = 18;
  const px = Math.cos(rad + Math.PI / 2) * len;
  const py = Math.sin(rad + Math.PI / 2) * len;

  return (
    <motion.line
      x1={cx - px}
      y1={cy - py}
      x2={cx + px}
      y2={cy + py}
      stroke="#fb923c"
      strokeWidth={5}
      strokeLinecap="round"
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{ delay: 0.3, duration: 0.25 }}
    />
  );
}

export default function PlayAnimation({
  play,
  stepIndex,
  showGhosts = true,
  roster,
}: PlayAnimationProps) {
  const step: PlayStep = play.steps[stepIndex];
  const prevStep: PlayStep | undefined = play.steps[stepIndex - 1];
  const courtType = play.courtType;

  const CourtComponent = courtType === "full" ? FullCourt : Court;

  return (
    <div className="w-full h-full relative">
      <CourtComponent>
        {/* Ghost players from previous step */}
        {showGhosts &&
          prevStep?.players.map((ghost) => (
            <Player
              key={`ghost-${ghost.id}`}
              player={ghost}
              ghost={true}
              courtType={courtType}
            />
          ))}

        {/* Movement arrows */}
        {step.movements.map((arrow, i) => (
          <Arrow key={i} arrow={arrow} courtType={courtType} />
        ))}

        {/* Screen marks */}
        {step.screens?.map((screen, i) => (
          <ScreenMark key={i} screen={screen} courtType={courtType} />
        ))}

        {/* Players — use layoutId for smooth cross-step animation */}
        {step.players.map((player) => {
          const rosterEntry = roster?.[player.label];
          return (
            <Player
              key={player.id}
              player={player}
              courtType={courtType}
              rosterName={rosterEntry?.name}
              rosterNumber={rosterEntry?.number}
            />
          );
        })}
      </CourtComponent>
    </div>
  );
}

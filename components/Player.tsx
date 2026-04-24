"use client";

import { motion } from "framer-motion";
import { PlayerPosition } from "@/lib/types";
import { coordToSvg } from "./Court";
import { fullCoordToSvg } from "./FullCourt";

interface PlayerProps {
  player: PlayerPosition;
  ghost?: boolean;
  courtType?: "half" | "full";
  rosterName?: string;
  rosterNumber?: string;
}

const ROLE_COLORS: Record<
  string,
  { fill: string; stroke: string; text: string }
> = {
  offense: { fill: "#1d4ed8", stroke: "#60a5fa", text: "#ffffff" },
  defense: { fill: "#b91c1c", stroke: "#f87171", text: "#ffffff" },
  inbounder: { fill: "#1d4ed8", stroke: "#60a5fa", text: "#ffffff" },
};

export default function Player({
  player,
  ghost = false,
  courtType = "half",
  rosterName,
  rosterNumber,
}: PlayerProps) {
  const { cx, cy } =
    courtType === "full"
      ? fullCoordToSvg(player.x, player.y)
      : coordToSvg(player.x, player.y);

  const colors = ROLE_COLORS[player.role] || ROLE_COLORS.offense;
  const radius = courtType === "full" ? 18 : 22;
  const fontSize = courtType === "full" ? 11 : 13;
  const displayLabel = rosterNumber || player.label;

  return (
    <motion.g
      initial={{ opacity: ghost ? 0.25 : 0, scale: 0.7 }}
      animate={{
        cx,
        cy,
        opacity: ghost ? 0.25 : 1,
        scale: 1,
      }}
      transition={{ type: "spring", stiffness: 180, damping: 22 }}
      style={{ originX: `${cx}px`, originY: `${cy}px` }}
    >
      {/* Glow ring for ball carrier */}
      {player.hasBall && !ghost && (
        <motion.circle
          cx={cx}
          cy={cy}
          r={radius + 8}
          fill="none"
          stroke="#f97316"
          strokeWidth={2.5}
          opacity={0.6}
          animate={{ r: [radius + 6, radius + 12, radius + 6] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
        />
      )}

      {/* Player circle */}
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill={ghost ? "#334155" : colors.fill}
        stroke={ghost ? "#475569" : colors.stroke}
        strokeWidth={ghost ? 1 : 2.5}
        opacity={ghost ? 0.35 : 1}
        style={{
          filter: ghost ? "none" : `drop-shadow(0 0 6px ${colors.stroke}60)`,
        }}
      />

      {/* Player number */}
      <text
        x={cx}
        y={cy + fontSize * 0.38}
        textAnchor="middle"
        fontSize={fontSize}
        fontWeight="700"
        fill={ghost ? "#64748b" : colors.text}
        fontFamily="system-ui, sans-serif"
        opacity={ghost ? 0.5 : 1}
        style={{ userSelect: "none", pointerEvents: "none" }}
      >
        {displayLabel}
      </text>

      {/* Ball dot */}
      {player.hasBall && !ghost && (
        <circle
          cx={cx + radius - 5}
          cy={cy - radius + 5}
          r={7}
          fill="#f97316"
          stroke="#fff"
          strokeWidth={1.5}
        />
      )}

      {/* Name label below (if roster name set) */}
      {rosterName && !ghost && (
        <text
          x={cx}
          y={cy + radius + 14}
          textAnchor="middle"
          fontSize={9}
          fontWeight="600"
          fill="#94a3b8"
          fontFamily="system-ui, sans-serif"
          style={{ userSelect: "none", pointerEvents: "none" }}
        >
          {rosterName.split(" ")[0]}
        </text>
      )}
    </motion.g>
  );
}

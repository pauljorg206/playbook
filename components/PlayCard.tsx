"use client";

import Link from "next/link";
import { Play } from "@/lib/types";
import { CATEGORIES } from "@/lib/categories";

interface PlayCardProps {
  play: Play;
  active?: boolean;
  compact?: boolean;
}

export default function PlayCard({
  play,
  active = false,
  compact = false,
}: PlayCardProps) {
  const category = CATEGORIES.find((c) => c.id === play.category);

  return (
    <Link
      href={`/plays/${play.category}/${play.id}`}
      className={`block rounded-2xl border transition-all duration-200 active:scale-[0.98] ${
        active
          ? "border-blue-500 bg-blue-950/60 shadow-lg shadow-blue-900/30"
          : "border-gray-800 bg-gray-900/60 hover:border-gray-600 hover:bg-gray-800/60"
      } ${compact ? "px-4 py-3" : "px-5 py-4"}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{category?.icon}</span>
            <span
              className={`text-xs font-semibold uppercase tracking-wider ${category?.color ?? "text-gray-400"}`}
            >
              {category?.label}
            </span>
          </div>
          <h3
            className={`font-bold text-white leading-tight ${compact ? "text-base" : "text-lg"}`}
          >
            {play.name}
          </h3>
          {!compact && (
            <p className="text-gray-400 text-sm mt-1 line-clamp-2 leading-snug">
              {play.description}
            </p>
          )}
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          <span
            className={`text-xs font-mono px-2 py-0.5 rounded-full ${
              play.courtType === "full"
                ? "bg-purple-900/60 text-purple-300"
                : "bg-gray-800 text-gray-400"
            }`}
          >
            {play.courtType === "full" ? "Full" : "Half"}
          </span>
          <span className="text-xs text-gray-500">
            {play.steps.length} steps
          </span>
        </div>
      </div>
    </Link>
  );
}

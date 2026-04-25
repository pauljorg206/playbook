"use client";

import { Play } from "@/lib/types";

interface PlayControlsProps {
  play: Play;
  stepIndex: number;
  /** 0-1 across the full play (steps + within-step progress) */
  totalProgress?: number;
  isPlaying: boolean;
  speed: number;
  loop: boolean;
  coachingMode?: boolean;
  onPrev: () => void;
  onNext: () => void;
  onPlayPause: () => void;
  onSpeedChange: (speed: number) => void;
  onLoopToggle: () => void;
  onCoachingMode?: () => void;
}

const SPEEDS = [0.5, 1, 1.5, 2];

export default function PlayControls({
  play,
  stepIndex,
  totalProgress,
  isPlaying,
  speed,
  loop,
  coachingMode = false,
  onPrev,
  onNext,
  onPlayPause,
  onSpeedChange,
  onLoopToggle,
  onCoachingMode,
}: PlayControlsProps) {
  const total = play.steps.length;
  const progressPct =
    totalProgress !== undefined
      ? Math.max(0, Math.min(1, totalProgress)) * 100
      : ((stepIndex + 1) / total) * 100;

  if (coachingMode) {
    return (
      <div className="flex flex-col gap-3 px-6 py-5 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800">
        <p className="text-gray-200 leading-snug font-medium text-xl">
          {play.steps[stepIndex].description}
        </p>
        <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-gray-400 font-mono text-lg tabular-nums">
            {stepIndex + 1} / {total}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onPrev}
              disabled={stepIndex === 0}
              className="px-7 py-3 rounded-xl font-bold text-lg bg-gray-800 hover:bg-gray-700 text-white disabled:opacity-30 transition-all active:scale-95"
            >
              ←
            </button>
            <button
              onClick={onPlayPause}
              className="px-10 py-3 rounded-xl font-bold text-xl bg-blue-600 hover:bg-blue-500 text-white transition-all active:scale-95"
            >
              {isPlaying ? "⏸" : "▶"}
            </button>
            <button
              onClick={onNext}
              disabled={stepIndex === total - 1}
              className="px-7 py-3 rounded-xl font-bold text-lg bg-gray-800 hover:bg-gray-700 text-white disabled:opacity-30 transition-all active:scale-95"
            >
              →
            </button>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={speed}
              onChange={(e) => onSpeedChange(Number(e.target.value))}
              className="bg-gray-800 border border-gray-700 text-gray-200 rounded-lg px-3 py-2 text-base cursor-pointer"
            >
              {SPEEDS.map((s) => (
                <option key={s} value={s}>
                  {s}x
                </option>
              ))}
            </select>
            <button
              onClick={onLoopToggle}
              className={`px-4 py-2 rounded-lg font-bold text-base transition-all ${loop ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400"}`}
            >
              ↺
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Normal mobile-first layout
  return (
    <div className="flex flex-col gap-2 px-3 py-3 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800">
      {/* Step description — compact, 2 lines max on mobile */}
      <p className="text-gray-200 leading-snug font-medium text-xs md:text-sm line-clamp-2">
        {play.steps[stepIndex].description}
      </p>

      {/* Progress bar + step counter inline */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <span className="text-gray-500 font-mono text-[10px] tabular-nums shrink-0">
          {stepIndex + 1}/{total}
        </span>
      </div>

      {/* Single compact controls row */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={onPrev}
          disabled={stepIndex === 0}
          className="flex-1 py-2.5 rounded-xl font-bold text-sm bg-gray-800 hover:bg-gray-700 text-white disabled:opacity-30 transition-all active:scale-95"
        >
          ← Prev
        </button>

        <button
          onClick={onPlayPause}
          className="flex-[1.4] py-2.5 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-500 text-white transition-all active:scale-95"
        >
          {isPlaying ? "⏸ Pause" : "▶ Play"}
        </button>

        <button
          onClick={onNext}
          disabled={stepIndex === total - 1}
          className="flex-1 py-2.5 rounded-xl font-bold text-sm bg-gray-800 hover:bg-gray-700 text-white disabled:opacity-30 transition-all active:scale-95"
        >
          Next →
        </button>

        {/* Speed — compact select */}
        <select
          value={speed}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
          className="bg-gray-800 border border-gray-700 text-gray-200 rounded-xl py-2.5 pl-2 pr-1 text-xs cursor-pointer shrink-0 font-bold"
        >
          {SPEEDS.map((s) => (
            <option key={s} value={s}>
              {s}x
            </option>
          ))}
        </select>

        {/* Loop */}
        <button
          onClick={onLoopToggle}
          title="Loop"
          className={`w-10 py-2.5 rounded-xl font-bold text-sm shrink-0 transition-all ${loop ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400"}`}
        >
          ↺
        </button>
      </div>
    </div>
  );
}

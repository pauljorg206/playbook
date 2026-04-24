"use client";

import { Play } from "@/lib/types";

interface PlayControlsProps {
  play: Play;
  stepIndex: number;
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
  const progress = ((stepIndex + 1) / total) * 100;

  return (
    <div
      className={`flex flex-col gap-3 ${coachingMode ? "px-6 py-5" : "px-4 py-4"} bg-gray-900/95 backdrop-blur-sm border-t border-gray-800`}
    >
      {/* Step description */}
      <p
        className={`text-gray-200 leading-snug font-medium ${coachingMode ? "text-xl" : "text-sm"}`}
      >
        {play.steps[stepIndex].description}
      </p>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Controls row */}
      <div className="flex items-center justify-between gap-3">
        {/* Step counter */}
        <span
          className={`text-gray-400 font-mono tabular-nums ${coachingMode ? "text-lg" : "text-xs"}`}
        >
          Step {stepIndex + 1} / {total}
        </span>

        {/* Main buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            disabled={stepIndex === 0}
            className={`rounded-xl font-bold transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed bg-gray-800 hover:bg-gray-700 text-white ${coachingMode ? "px-6 py-3 text-lg" : "px-4 py-2 text-sm"}`}
          >
            ← Prev
          </button>

          <button
            onClick={onPlayPause}
            className={`rounded-xl font-bold transition-all active:scale-95 bg-blue-600 hover:bg-blue-500 text-white ${coachingMode ? "px-8 py-3 text-xl" : "px-5 py-2 text-sm"}`}
          >
            {isPlaying ? "⏸ Pause" : "▶ Play"}
          </button>

          <button
            onClick={onNext}
            disabled={stepIndex === total - 1}
            className={`rounded-xl font-bold transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed bg-gray-800 hover:bg-gray-700 text-white ${coachingMode ? "px-6 py-3 text-lg" : "px-4 py-2 text-sm"}`}
          >
            Next →
          </button>
        </div>

        {/* Speed + loop */}
        <div className="flex items-center gap-2">
          <select
            value={speed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            className={`bg-gray-800 border border-gray-700 text-gray-200 rounded-lg cursor-pointer ${coachingMode ? "px-3 py-2 text-base" : "px-2 py-1.5 text-xs"}`}
          >
            {SPEEDS.map((s) => (
              <option key={s} value={s}>
                {s}x
              </option>
            ))}
          </select>

          <button
            onClick={onLoopToggle}
            title="Loop"
            className={`rounded-lg transition-all font-bold ${loop ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400 hover:text-white"} ${coachingMode ? "px-4 py-2 text-base" : "px-3 py-1.5 text-xs"}`}
          >
            ↺
          </button>

          {onCoachingMode && !coachingMode && (
            <button
              onClick={onCoachingMode}
              title="Coaching Mode"
              className="px-3 py-1.5 text-xs rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold transition-all"
            >
              📋 Coach
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

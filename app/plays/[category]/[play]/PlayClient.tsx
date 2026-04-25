"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Play, CategoryMeta } from "@/lib/types";
import PlayAnimation from "@/components/PlayAnimation";
import PlayControls from "@/components/PlayControls";
import DrawingOverlay from "@/components/DrawingOverlay";
import { COURT_WIDTH, COURT_HEIGHT } from "@/components/Court";
import { FULL_COURT_WIDTH, FULL_COURT_HEIGHT } from "@/components/FullCourt";
import { ALL_PLAYS } from "@/data/plays/index";
import PlayCard from "@/components/PlayCard";

interface PlayClientProps {
  play: Play;
  category?: CategoryMeta;
}

// Slower, cinematic step duration — the user wants slo-mo flow.
const BASE_STEP_MS = 3200;

export default function PlayClient({ play, category }: PlayClientProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0); // 0-1 within the current step
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [loop, setLoop] = useState(false);
  const [coachingMode, setCoachingMode] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);
  const [relatedOpen, setRelatedOpen] = useState(false);
  const [roster, setRoster] = useState<
    Record<string, { name: string; number: string }>
  >({});

  const rafRef = useRef<number | null>(null);
  const lastTickRef = useRef<number | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("playbook-roster");
      if (saved) setRoster(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    setStepIndex(0);
    setProgress(0);
    setIsPlaying(false);
    setDescExpanded(false);
  }, [play.id]);

  // ─── rAF timeline ──────────────────────────────────────────────────
  useEffect(() => {
    if (!isPlaying) {
      lastTickRef.current = null;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      return;
    }
    const tick = (now: number) => {
      const last = lastTickRef.current ?? now;
      const dt = now - last;
      lastTickRef.current = now;
      const stepMs = BASE_STEP_MS / speed;
      setProgress((prev) => {
        const next = prev + dt / stepMs;
        if (next >= 1) {
          // advance to next step (or stop / loop)
          setStepIndex((idx) => {
            if (idx + 1 < play.steps.length) return idx + 1;
            if (loop) return 0;
            // end of play
            setIsPlaying(false);
            return idx;
          });
          return 0;
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTickRef.current = null;
    };
  }, [isPlaying, speed, loop, play.steps.length]);

  // Snap progress to 1 when paused at a step we already navigated to via prev/next
  // (so the diagram shows the "after" frame)
  const goNext = useCallback(() => {
    setIsPlaying(false);
    setStepIndex((i) => {
      if (i < play.steps.length - 1) {
        setProgress(1);
        return i + 1;
      }
      return i;
    });
    setProgress(1);
  }, [play.steps.length]);

  const goPrev = useCallback(() => {
    setIsPlaying(false);
    setStepIndex((i) => Math.max(0, i - 1));
    setProgress(1);
  }, []);

  const onPlayPause = useCallback(() => {
    setIsPlaying((p) => {
      if (!p) {
        // when starting from the end, restart from step 0
        if (stepIndex >= play.steps.length - 1 && progress >= 1) {
          setStepIndex(0);
          setProgress(0);
        }
        // if at static "after" state of a step, restart it for the animation
        if (progress >= 1) setProgress(0);
      }
      return !p;
    });
  }, [stepIndex, progress, play.steps.length]);

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    try {
      await navigator.share({ title: play.name, text: play.description, url });
    } catch {
      try {
        await navigator.clipboard.writeText(url);
        alert("Link copied!");
      } catch {}
    }
  }, [play]);

  const courtW = play.courtType === "full" ? FULL_COURT_WIDTH : COURT_WIDTH;
  const courtH = play.courtType === "full" ? FULL_COURT_HEIGHT : COURT_HEIGHT;

  const relatedPlays = ALL_PLAYS.filter(
    (p) => p.category === play.category && p.id !== play.id,
  ).slice(0, 3);

  const totalProgress =
    (stepIndex + Math.min(1, progress)) / play.steps.length;

  // ─── Coaching mode ────────────────────────────────────────────────
  if (coachingMode) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 bg-black/90 shrink-0 gap-3">
          <div className="min-w-0">
            <div
              className={`text-xs font-bold uppercase tracking-widest ${category?.color ?? "text-gray-400"}`}
            >
              {category?.icon} {category?.label}
            </div>
            <h1 className="text-white font-black text-xl leading-tight truncate">
              {play.name}
            </h1>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => setDrawing((d) => !d)}
              className={`px-3 py-2 rounded-xl font-bold text-sm transition-colors ${drawing ? "bg-orange-600 text-white" : "bg-gray-800 text-gray-300"}`}
            >
              ✏️ Draw
            </button>
            <button
              onClick={() => {
                setCoachingMode(false);
                setDrawing(false);
              }}
              className="px-3 py-2 rounded-xl font-bold text-sm bg-gray-800 text-gray-300 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="flex-1 min-h-0 relative overflow-hidden bg-black">
          <div className="absolute inset-0 p-1 flex items-center justify-center">
            <div className="relative w-full h-full">
              <PlayAnimation
                play={play}
                stepIndex={stepIndex}
                progress={progress}
                showGhosts
                roster={roster}
              />
              {drawing && (
                <DrawingOverlay
                  width={courtW}
                  height={courtH}
                  onExit={() => setDrawing(false)}
                />
              )}
            </div>
          </div>
        </div>

        <div className="shrink-0">
          <PlayControls
            play={play}
            stepIndex={stepIndex}
            totalProgress={totalProgress}
            isPlaying={isPlaying}
            speed={speed}
            loop={loop}
            coachingMode
            onPrev={goPrev}
            onNext={goNext}
            onPlayPause={onPlayPause}
            onSpeedChange={setSpeed}
            onLoopToggle={() => setLoop((l) => !l)}
          />
        </div>
      </div>
    );
  }

  // ─── Normal mode ──────────────────────────────────────────────────
  return (
    <div className="flex flex-col pb-16 md:pb-0" style={{ height: "100dvh" }}>
      {/* ── Header ── */}
      <div className="shrink-0 px-3 pt-3 pb-2 border-b border-gray-800/60">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span
            className={`text-[10px] font-bold uppercase tracking-widest ${category?.color ?? "text-gray-400"}`}
          >
            {category?.icon} {category?.label}
          </span>
          <div className="flex gap-1.5 shrink-0">
            <button
              onClick={handleShare}
              className="px-2.5 py-1 text-[11px] bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg font-medium transition-colors"
            >
              🔗 Share
            </button>
            <button
              onClick={() => setCoachingMode(true)}
              className="px-2.5 py-1 text-[11px] bg-orange-700 hover:bg-orange-600 text-white rounded-lg font-bold transition-colors"
            >
              📋 Coach
            </button>
          </div>
        </div>

        <h1 className="text-lg md:text-2xl font-black text-white leading-tight">
          {play.name}
        </h1>

        <div className="mt-1">
          <p
            className={`text-gray-400 text-xs md:text-sm leading-snug ${descExpanded ? "" : "line-clamp-1 md:line-clamp-none"}`}
          >
            {play.description}
          </p>
          <button
            onClick={() => setDescExpanded((v) => !v)}
            className="text-[10px] text-blue-400 font-semibold mt-0.5 md:hidden"
          >
            {descExpanded ? "Less ↑" : "More ↓"}
          </button>
        </div>
      </div>

      {/* ── Court ── */}
      <div className="flex-1 min-h-0 relative bg-gray-950">
        <div className="absolute inset-0 p-2 flex items-center justify-center">
          <PlayAnimation
            play={play}
            stepIndex={stepIndex}
            progress={progress}
            showGhosts
            roster={roster}
          />
        </div>
      </div>

      {/* ── Controls ── */}
      <div className="shrink-0">
        <PlayControls
          play={play}
          stepIndex={stepIndex}
          totalProgress={totalProgress}
          isPlaying={isPlaying}
          speed={speed}
          loop={loop}
          onPrev={goPrev}
          onNext={goNext}
          onPlayPause={onPlayPause}
          onSpeedChange={setSpeed}
          onLoopToggle={() => setLoop((l) => !l)}
          onCoachingMode={() => setCoachingMode(true)}
        />
      </div>

      {/* ── Related ── */}
      {relatedPlays.length > 0 && (
        <div className="shrink-0 border-t border-gray-800/60">
          <button
            onClick={() => setRelatedOpen((v) => !v)}
            className="md:hidden w-full flex items-center justify-between px-3 py-2.5 text-xs font-bold text-gray-500 uppercase tracking-widest"
          >
            <span>More in {category?.label}</span>
            <span>{relatedOpen ? "▲" : "▼"}</span>
          </button>
          <div
            className={`px-3 pb-3 ${relatedOpen ? "block" : "hidden"} md:block`}
          >
            <p className="hidden md:block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 pt-3">
              More in {category?.label}
            </p>
            <div className="flex flex-col gap-1.5">
              {relatedPlays.map((p) => (
                <PlayCard key={p.id} play={p} compact />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

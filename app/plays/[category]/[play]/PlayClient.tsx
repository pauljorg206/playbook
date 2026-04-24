"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
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

export default function PlayClient({ play, category }: PlayClientProps) {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [loop, setLoop] = useState(false);
  const [coachingMode, setCoachingMode] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [roster, setRoster] = useState<
    Record<string, { name: string; number: string }>
  >({});
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Load roster from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("playbook-roster");
      if (saved) setRoster(JSON.parse(saved));
    } catch {}
  }, []);

  // Reset step when play changes
  useEffect(() => {
    setStepIndex(0);
    setIsPlaying(false);
  }, [play.id]);

  const goNext = useCallback(() => {
    setStepIndex((i) => {
      if (i < play.steps.length - 1) return i + 1;
      if (loop) return 0;
      setIsPlaying(false);
      return i;
    });
  }, [play.steps.length, loop]);

  const goPrev = useCallback(() => {
    setStepIndex((i) => Math.max(0, i - 1));
  }, []);

  // Auto-play timer
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!isPlaying) return;
    const delay = 1800 / speed;
    intervalRef.current = setInterval(goNext, delay);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, speed, goNext]);

  // Share
  const handleShare = useCallback(async () => {
    const url = window.location.href;
    try {
      await navigator.share({ title: play.name, text: play.description, url });
    } catch {
      await navigator.clipboard.writeText(url);
      alert("Link copied!");
    }
  }, [play]);

  const courtW = play.courtType === "full" ? FULL_COURT_WIDTH : COURT_WIDTH;
  const courtH = play.courtType === "full" ? FULL_COURT_HEIGHT : COURT_HEIGHT;

  const relatedPlays = ALL_PLAYS.filter(
    (p) => p.category === play.category && p.id !== play.id,
  ).slice(0, 3);

  if (coachingMode) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col">
        {/* Coaching header */}
        <div className="flex items-center justify-between px-6 py-4 bg-black/80 shrink-0">
          <div>
            <div
              className={`text-xs font-bold uppercase tracking-widest ${category?.color ?? "text-gray-400"}`}
            >
              {category?.icon} {category?.label}
            </div>
            <h1 className="text-white font-black text-2xl leading-tight">
              {play.name}
            </h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setDrawing((d) => !d)}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-colors ${drawing ? "bg-orange-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
            >
              ✏️ {drawing ? "Hide Draw" : "Draw"}
            </button>
            <button
              onClick={() => {
                setCoachingMode(false);
                setDrawing(false);
              }}
              className="px-4 py-2 rounded-xl font-bold text-sm bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
            >
              ✕ Exit
            </button>
          </div>
        </div>

        {/* Court — fills remaining space */}
        <div className="flex-1 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center p-2">
            <div
              className="relative w-full h-full max-h-full"
              style={{ aspectRatio: `${courtW}/${courtH}` }}
            >
              <PlayAnimation
                play={play}
                stepIndex={stepIndex}
                showGhosts={true}
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

        {/* Controls */}
        <div className="shrink-0">
          <PlayControls
            play={play}
            stepIndex={stepIndex}
            isPlaying={isPlaying}
            speed={speed}
            loop={loop}
            coachingMode={true}
            onPrev={goPrev}
            onNext={goNext}
            onPlayPause={() => setIsPlaying((p) => !p)}
            onSpeedChange={setSpeed}
            onLoopToggle={() => setLoop((l) => !l)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-6 pb-3 border-b border-gray-800/60">
        <div
          className={`text-xs font-bold uppercase tracking-widest mb-1 ${category?.color ?? "text-gray-400"}`}
        >
          {category?.icon} {category?.label}
        </div>
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-2xl md:text-3xl font-black text-white leading-tight">
            {play.name}
          </h1>
          <div className="flex gap-2 shrink-0 mt-0.5">
            <button
              onClick={handleShare}
              className="px-3 py-1.5 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg font-medium transition-colors"
            >
              🔗 Share
            </button>
            <button
              onClick={() => setCoachingMode(true)}
              className="px-3 py-1.5 text-xs bg-orange-700 hover:bg-orange-600 text-white rounded-lg font-bold transition-colors"
            >
              📋 Coach
            </button>
          </div>
        </div>
        <p className="text-gray-400 text-sm mt-1.5 leading-snug">
          {play.description}
        </p>
      </div>

      {/* Court */}
      <div className="flex-1 relative bg-gray-950 flex items-center justify-center p-3 min-h-0">
        <div
          className="relative w-full"
          style={{
            maxHeight: "calc(100vh - 340px)",
            aspectRatio: `${courtW}/${courtH}`,
          }}
        >
          <PlayAnimation
            play={play}
            stepIndex={stepIndex}
            showGhosts={true}
            roster={roster}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="shrink-0">
        <PlayControls
          play={play}
          stepIndex={stepIndex}
          isPlaying={isPlaying}
          speed={speed}
          loop={loop}
          onPrev={goPrev}
          onNext={goNext}
          onPlayPause={() => setIsPlaying((p) => !p)}
          onSpeedChange={setSpeed}
          onLoopToggle={() => setLoop((l) => !l)}
          onCoachingMode={() => setCoachingMode(true)}
        />
      </div>

      {/* Related plays */}
      {relatedPlays.length > 0 && (
        <div className="px-4 py-5 border-t border-gray-800/60">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
            More in {category?.label}
          </h3>
          <div className="flex flex-col gap-2">
            {relatedPlays.map((p) => (
              <PlayCard key={p.id} play={p} compact />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

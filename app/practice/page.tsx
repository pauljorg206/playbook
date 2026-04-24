"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ALL_PLAYS } from "@/data/plays/index";
import { CATEGORIES } from "@/lib/categories";
import { Play } from "@/lib/types";

export default function PracticePage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("playbook-practice");
      if (stored) setSelected(JSON.parse(stored));
    } catch {}
  }, []);

  const toggle = (id: string) => {
    setSelected((s) => {
      const next = s.includes(id) ? s.filter((x) => x !== id) : [...s, id];
      return next;
    });
    setSaved(false);
  };

  const save = () => {
    localStorage.setItem("playbook-practice", JSON.stringify(selected));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const moveUp = (idx: number) => {
    if (idx === 0) return;
    setSelected((s) => {
      const next = [...s];
      [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
      return next;
    });
  };

  const moveDown = (idx: number) => {
    setSelected((s) => {
      if (idx === s.length - 1) return s;
      const next = [...s];
      [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
      return next;
    });
  };

  const selectedPlays = selected
    .map((id) => ALL_PLAYS.find((p) => p.id === id))
    .filter(Boolean) as Play[];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-2">
          📋 Practice Plan
        </h1>
        <p className="text-gray-400 text-sm">
          Pick plays for today's practice. Reorder them, then step through
          during practice.
        </p>
      </div>

      {/* Practice queue */}
      {selectedPlays.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
            Today's Plan — {selectedPlays.length} plays
          </h2>
          <div className="flex flex-col gap-2 mb-4">
            {selectedPlays.map((play, idx) => {
              const cat = CATEGORIES.find((c) => c.id === play.category);
              const isActive = activeIdx === idx;
              return (
                <div
                  key={play.id}
                  className={`flex items-center gap-3 bg-gray-900 border rounded-2xl px-4 py-3 transition-all ${
                    isActive
                      ? "border-blue-500 bg-blue-950/40"
                      : "border-gray-800"
                  }`}
                >
                  <span className="text-gray-600 font-mono text-sm w-6 shrink-0 text-center">
                    {idx + 1}
                  </span>
                  <span className="text-lg">{cat?.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-bold text-sm truncate">
                      {play.name}
                    </div>
                    <div className={`text-xs ${cat?.color}`}>{cat?.label}</div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => moveUp(idx)}
                      disabled={idx === 0}
                      className="p-1.5 text-gray-500 hover:text-white disabled:opacity-20 transition-colors rounded-lg hover:bg-gray-800"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveDown(idx)}
                      disabled={idx === selectedPlays.length - 1}
                      className="p-1.5 text-gray-500 hover:text-white disabled:opacity-20 transition-colors rounded-lg hover:bg-gray-800"
                    >
                      ↓
                    </button>
                    <Link
                      href={`/plays/${play.category}/${play.id}`}
                      className="px-3 py-1.5 text-xs bg-blue-700 hover:bg-blue-600 text-white rounded-lg font-bold transition-colors"
                    >
                      Open
                    </Link>
                    <button
                      onClick={() => toggle(play.id)}
                      className="p-1.5 text-gray-500 hover:text-red-400 transition-colors rounded-lg hover:bg-gray-800"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-3">
            <button
              onClick={save}
              className={`flex-1 py-3 rounded-2xl font-black text-sm transition-all ${
                saved
                  ? "bg-green-600 text-white"
                  : "bg-blue-600 hover:bg-blue-500 text-white"
              }`}
            >
              {saved ? "✓ Saved!" : "Save Plan"}
            </button>
            <button
              onClick={() => setSelected([])}
              className="px-4 py-3 rounded-2xl font-bold text-sm bg-gray-800 hover:bg-gray-700 text-gray-400 transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>
      )}

      {/* Pick plays by category */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
          Add Plays
        </h2>
        {CATEGORIES.map((cat) => {
          const plays = ALL_PLAYS.filter((p) => p.category === cat.id);
          if (!plays.length) return null;
          return (
            <div key={cat.id} className="mb-6">
              <div
                className={`flex items-center gap-2 mb-2 text-sm font-bold ${cat.color}`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </div>
              <div className="flex flex-col gap-1.5">
                {plays.map((play) => {
                  const checked = selected.includes(play.id);
                  return (
                    <button
                      key={play.id}
                      onClick={() => toggle(play.id)}
                      className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl border transition-all ${
                        checked
                          ? "border-blue-500 bg-blue-950/30 text-white"
                          : "border-gray-800 bg-gray-900/50 text-gray-300 hover:border-gray-700"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                          checked
                            ? "bg-blue-600 border-blue-600"
                            : "border-gray-600"
                        }`}
                      >
                        {checked && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="font-semibold text-sm flex-1">
                        {play.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {play.steps.length} steps
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";

const POSITIONS = [
  { id: "1", label: "Point Guard", short: "PG" },
  { id: "2", label: "Shooting Guard", short: "SG" },
  { id: "3", label: "Small Forward", short: "SF" },
  { id: "4", label: "Power Forward", short: "PF" },
  { id: "5", label: "Center", short: "C" },
];

interface RosterEntry {
  name: string;
  number: string;
}

type Roster = Record<string, RosterEntry>;

export default function RosterPage() {
  const [roster, setRoster] = useState<Roster>({
    "1": { name: "", number: "1" },
    "2": { name: "", number: "2" },
    "3": { name: "", number: "3" },
    "4": { name: "", number: "4" },
    "5": { name: "", number: "5" },
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("playbook-roster");
      if (stored) setRoster(JSON.parse(stored));
    } catch {}
  }, []);

  const update = (id: string, field: keyof RosterEntry, value: string) => {
    setRoster((r) => ({ ...r, [id]: { ...r[id], [field]: value } }));
    setSaved(false);
  };

  const save = () => {
    localStorage.setItem("playbook-roster", JSON.stringify(roster));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const clear = () => {
    const empty: Roster = {};
    POSITIONS.forEach((p) => {
      empty[p.id] = { name: "", number: p.id };
    });
    setRoster(empty);
    localStorage.removeItem("playbook-roster");
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-2">👥 Roster</h1>
        <p className="text-gray-400 text-sm">
          Enter player names and numbers. They'll appear on the court in every
          play.
        </p>
      </div>

      <div className="flex flex-col gap-3 mb-8">
        {POSITIONS.map((pos) => (
          <div
            key={pos.id}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex items-center gap-4"
          >
            {/* Position badge */}
            <div className="flex flex-col items-center w-14 shrink-0">
              <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-900/40">
                {roster[pos.id]?.number || pos.id}
              </div>
              <span className="text-xs text-gray-500 font-bold mt-1">
                {pos.short}
              </span>
            </div>

            {/* Inputs */}
            <div className="flex-1 flex flex-col gap-2">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                {pos.label}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Player name"
                  value={roster[pos.id]?.name ?? ""}
                  onChange={(e) => update(pos.id, "name", e.target.value)}
                  className="flex-1 bg-gray-800 border border-gray-700 text-white placeholder-gray-600 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
                <input
                  type="text"
                  placeholder="#"
                  value={roster[pos.id]?.number ?? ""}
                  onChange={(e) =>
                    update(pos.id, "number", e.target.value.slice(0, 3))
                  }
                  className="w-16 bg-gray-800 border border-gray-700 text-white placeholder-gray-600 rounded-xl px-3 py-2 text-sm text-center font-bold focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={save}
          className={`flex-1 py-3.5 rounded-2xl font-black text-base transition-all ${
            saved
              ? "bg-green-600 text-white"
              : "bg-blue-600 hover:bg-blue-500 text-white active:scale-[0.98]"
          }`}
        >
          {saved ? "✓ Saved!" : "Save Roster"}
        </button>
        <button
          onClick={clear}
          className="px-5 py-3.5 rounded-2xl font-bold text-sm bg-gray-800 hover:bg-gray-700 text-gray-400 transition-colors"
        >
          Clear
        </button>
      </div>

      <p className="text-center text-gray-600 text-xs mt-4">
        Saved locally on this device
      </p>
    </div>
  );
}

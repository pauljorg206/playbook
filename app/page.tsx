import Link from "next/link";
import { ALL_PLAYS } from "@/data/plays/index";
import { CATEGORIES } from "@/lib/categories";
import PlayCard from "@/components/PlayCard";

export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
          🏀 Playbook
        </h1>
        <p className="text-gray-400 text-lg max-w-xl">
          Animated plays for coaches and players. Tap any play to watch it come
          alive — step by step.
        </p>
        <div className="mt-5 flex flex-wrap gap-3 justify-center md:justify-start">
          <Link
            href="/practice"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors text-sm"
          >
            📋 Build Practice Plan
          </Link>
          <Link
            href="/roster"
            className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl transition-colors text-sm"
          >
            👥 Set Roster
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-10">
        {[
          { label: "Plays", value: ALL_PLAYS.length },
          { label: "Categories", value: CATEGORIES.length },
          {
            label: "Animated Steps",
            value: ALL_PLAYS.reduce((a, p) => a + p.steps.length, 0),
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-gray-900 rounded-2xl p-4 text-center border border-gray-800"
          >
            <div className="text-3xl font-black text-white">{stat.value}</div>
            <div className="text-xs text-gray-500 font-medium mt-0.5">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Plays by category */}
      {CATEGORIES.map((cat) => {
        const plays = ALL_PLAYS.filter((p) => p.category === cat.id);
        if (!plays.length) return null;
        return (
          <section key={cat.id} className="mb-10">
            <div className={`flex items-center gap-2 mb-4 ${cat.color}`}>
              <span className="text-2xl">{cat.icon}</span>
              <h2 className="text-xl font-black uppercase tracking-wide">
                {cat.label}
              </h2>
            </div>
            <div className="flex flex-col gap-3">
              {plays.map((play) => (
                <PlayCard key={play.id} play={play} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

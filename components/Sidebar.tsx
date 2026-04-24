"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORIES } from "@/lib/categories";
import { ALL_PLAYS } from "@/data/plays/index";

const NAV = [
  { href: "/", label: "All Plays", icon: "🏀" },
  { href: "/practice", label: "Practice", icon: "📋" },
  { href: "/roster", label: "Roster", icon: "👥" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-72 bg-gray-950 border-r border-gray-800 h-screen overflow-y-auto shrink-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-800">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-3xl">🏀</span>
          <div>
            <div className="text-white font-black text-xl tracking-tight">
              PLAYBOOK
            </div>
            <div className="text-gray-500 text-xs font-medium">
              Youth Basketball
            </div>
          </div>
        </Link>
      </div>

      {/* Top nav */}
      <nav className="px-3 py-3 border-b border-gray-800">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              pathname === item.href
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Categories */}
      <div className="flex-1 overflow-y-auto py-2">
        {CATEGORIES.map((cat) => {
          const plays = ALL_PLAYS.filter((p) => p.category === cat.id);
          if (!plays.length) return null;
          const isActive = pathname.includes(`/plays/${cat.id}`);

          return (
            <div key={cat.id} className="mb-1">
              <div
                className={`flex items-center gap-2 px-6 py-2 text-xs font-bold uppercase tracking-widest ${cat.color}`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </div>
              {plays.map((play) => {
                const active =
                  pathname === `/plays/${play.category}/${play.id}`;
                return (
                  <Link
                    key={play.id}
                    href={`/plays/${play.category}/${play.id}`}
                    className={`flex items-center justify-between px-6 py-2.5 text-sm transition-colors ${
                      active
                        ? "bg-blue-900/40 text-white font-semibold border-r-2 border-blue-500"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                    }`}
                  >
                    <span className="truncate">{play.name}</span>
                    <span className="text-xs text-gray-600 ml-2 shrink-0">
                      {play.steps.length}s
                    </span>
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>
    </aside>
  );
}

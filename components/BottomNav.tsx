"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORIES } from "@/lib/categories";

const TABS = [
  { href: "/", label: "Plays", icon: "🏀" },
  { href: "/practice", label: "Practice", icon: "📋" },
  { href: "/roster", label: "Roster", icon: "👥" },
];

export default function BottomNav() {
  const pathname = usePathname();

  // On a play page, show category tabs instead
  const isPlayPage = pathname.startsWith("/plays/");

  if (isPlayPage) {
    return (
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-gray-950/95 backdrop-blur-sm border-t border-gray-800">
        <div className="flex overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat) => {
            const active = pathname.includes(`/plays/${cat.id}`);
            return (
              <Link
                key={cat.id}
                href={`/plays/${cat.id}`}
                className={`flex flex-col items-center gap-0.5 px-3 py-2.5 min-w-[72px] text-center transition-colors shrink-0 ${
                  active
                    ? "text-white border-t-2 border-blue-500"
                    : "text-gray-500"
                }`}
              >
                <span className="text-xl leading-none">{cat.icon}</span>
                <span className="text-[10px] font-semibold leading-tight truncate w-full text-center">
                  {cat.label.split(" ")[0]}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    );
  }

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-gray-950/95 backdrop-blur-sm border-t border-gray-800">
      <div className="flex">
        {TABS.map((tab) => {
          const active =
            tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center gap-1 flex-1 py-3 text-center transition-colors ${
                active
                  ? "text-white border-t-2 border-blue-500"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <span className="text-2xl leading-none">{tab.icon}</span>
              <span className="text-[11px] font-semibold">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

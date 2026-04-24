import { CategoryMeta } from "./types";

export const CATEGORIES: CategoryMeta[] = [
  { id: "offense", label: "Offense", icon: "⚡", color: "text-blue-400" },
  {
    id: "out-of-bounds",
    label: "Out of Bounds",
    icon: "🏀",
    color: "text-cyan-400",
  },
  {
    id: "zone-offense",
    label: "Zone Offense",
    icon: "🎯",
    color: "text-purple-400",
  },
  { id: "defense", label: "Defense", icon: "🛡️", color: "text-red-400" },
  {
    id: "press",
    label: "Full Court Press",
    icon: "🔥",
    color: "text-orange-400",
  },
  {
    id: "press-breaker",
    label: "Press Breakers",
    icon: "💨",
    color: "text-green-400",
  },
];

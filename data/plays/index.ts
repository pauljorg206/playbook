import { Play } from "@/lib/types";
import pickThePicker from "./pick-the-picker";
import oneFourHigh from "./one-four-high";
import zoneOffense23 from "./zone-offense-23";
import zoneOffense131 from "./zone-offense-131";
import zone23 from "./zone-23";
import zone131 from "./zone-131";
import press131 from "./press-131";
import press1211 from "./press-1211";
import pressBreak131 from "./press-break-131";
import pressBreak1211 from "./press-break-1211";

export const ALL_PLAYS: Play[] = [
  oneFourHigh,
  pickThePicker,
  zoneOffense23,
  zoneOffense131,
  zone23,
  zone131,
  press131,
  press1211,
  pressBreak131,
  pressBreak1211,
];

export function getPlay(id: string): Play | undefined {
  return ALL_PLAYS.find((p) => p.id === id);
}

export function getPlaysByCategory(category: string): Play[] {
  return ALL_PLAYS.filter((p) => p.category === category);
}

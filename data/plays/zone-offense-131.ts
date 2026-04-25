import { Play } from "@/lib/types";

const play: Play = {
  id: "zone-offense-131",
  name: "Zone Offense vs 1-3-1",
  shortName: "vs 1-3-1 Zone",
  category: "zone-offense",
  description:
    "Attack the 1-3-1 zone by targeting its weak spots: the corners, the wings, and the high post gap. Drive and kick, skip passes, and middle flashes.",
  courtType: "half",
  steps: [
    {
      description:
        "Formation vs 1-3-1. PG (1) at top. Wings (2) and (3) wide. Post (5) at high post — the gap between the point and wing defenders. Post (4) at the weak-side corner.",
      players: [
        { id: "p1", x: 50, y: 47, label: "1", role: "offense", hasBall: true },
        { id: "p2", x: 18, y: 60, label: "2", role: "offense" },
        { id: "p3", x: 82, y: 60, label: "3", role: "offense" },
        { id: "p4", x: 82, y: 83, label: "4", role: "offense" },
        { id: "p5", x: 50, y: 57, label: "5", role: "offense" },
        { id: "d1", x: 50, y: 38, label: "D1", role: "defense" },
        { id: "d2", x: 25, y: 57, label: "D2", role: "defense" },
        { id: "d3", x: 75, y: 57, label: "D3", role: "defense" },
        { id: "d4", x: 50, y: 63, label: "D4", role: "defense" },
        { id: "d5", x: 50, y: 85, label: "D5", role: "defense" },
      ],
      movements: [],
    },
    {
      description:
        "Step 1: Flash to high post! PG (1) passes to high post (5) in the gap. The 1-3-1 has no one to guard the high post — this is the seam. Both wings (2) and (3) spot up on the wings.",
      players: [
        { id: "p1", x: 50, y: 47, label: "1", role: "offense", hasBall: true },
        { id: "p2", x: 18, y: 60, label: "2", role: "offense" },
        { id: "p3", x: 82, y: 60, label: "3", role: "offense" },
        { id: "p4", x: 82, y: 83, label: "4", role: "offense" },
        { id: "p5", x: 50, y: 57, label: "5", role: "offense" },
        { id: "d1", x: 50, y: 38, label: "D1", role: "defense" },
        { id: "d2", x: 25, y: 57, label: "D2", role: "defense" },
        { id: "d3", x: 75, y: 57, label: "D3", role: "defense" },
        { id: "d4", x: 50, y: 63, label: "D4", role: "defense" },
        { id: "d5", x: 50, y: 85, label: "D5", role: "defense" },
      ],
      movements: [
        {
          playerId: "p1",
          fromX: 50,
          fromY: 45,
          toX: 50,
          toY: 57,
          type: "pass",
        },
      ],
    },
    {
      description:
        "Step 2: High post (5) catches in the gap. Drive and kick! 5 drives to the basket forcing the zone to collapse. Kick out to open wing (2) or (3) for a three.",
      players: [
        { id: "p1", x: 50, y: 47, label: "1", role: "offense" },
        { id: "p2", x: 18, y: 60, label: "2", role: "offense" },
        { id: "p3", x: 82, y: 60, label: "3", role: "offense" },
        { id: "p4", x: 82, y: 83, label: "4", role: "offense" },
        { id: "p5", x: 50, y: 57, label: "5", role: "offense", hasBall: true },
        { id: "d1", x: 50, y: 38, label: "D1", role: "defense" },
        { id: "d2", x: 25, y: 57, label: "D2", role: "defense" },
        { id: "d3", x: 75, y: 57, label: "D3", role: "defense" },
        { id: "d4", x: 50, y: 63, label: "D4", role: "defense" },
        { id: "d5", x: 50, y: 85, label: "D5", role: "defense" },
      ],
      movements: [
        {
          playerId: "p5",
          fromX: 50,
          fromY: 57,
          toX: 50,
          toY: 73,
          type: "dribble",
          curved: false,
        },
        {
          playerId: "p5",
          fromX: 50,
          fromY: 73,
          toX: 18,
          toY: 60,
          type: "pass",
          curved: false,
        },
      ],
    },
    {
      description:
        "Step 3: Skip pass to the corner! Wing (2) receives, then skips across to the weak-side corner (4). The baseline defender (D5) can't guard both the low block and the corner.",
      players: [
        { id: "p1", x: 50, y: 47, label: "1", role: "offense" },
        { id: "p2", x: 18, y: 60, label: "2", role: "offense", hasBall: true },
        { id: "p3", x: 82, y: 60, label: "3", role: "offense" },
        { id: "p4", x: 82, y: 83, label: "4", role: "offense" },
        { id: "p5", x: 50, y: 73, label: "5", role: "offense" },
        { id: "d1", x: 30, y: 48, label: "D1", role: "defense" },
        { id: "d2", x: 20, y: 60, label: "D2", role: "defense" },
        { id: "d3", x: 65, y: 57, label: "D3", role: "defense" },
        { id: "d4", x: 50, y: 70, label: "D4", role: "defense" },
        { id: "d5", x: 55, y: 83, label: "D5", role: "defense" },
      ],
      movements: [
        {
          playerId: "p2",
          fromX: 18,
          fromY: 60,
          toX: 82,
          toY: 83,
          type: "pass",
          curved: true,
          controlX: 50,
          controlY: 48,
        },
      ],
    },
    {
      description:
        "Step 4: Ball reversal to reset. Corner (4) passes back out to PG (1). Wings sprint to the opposite side. Reset and attack the other weak spot — run it again!",
      players: [
        { id: "p1", x: 50, y: 47, label: "1", role: "offense" },
        { id: "p2", x: 18, y: 60, label: "2", role: "offense" },
        { id: "p3", x: 82, y: 60, label: "3", role: "offense" },
        { id: "p4", x: 82, y: 83, label: "4", role: "offense", hasBall: true },
        { id: "p5", x: 50, y: 73, label: "5", role: "offense" },
        { id: "d1", x: 50, y: 38, label: "D1", role: "defense" },
        { id: "d2", x: 25, y: 57, label: "D2", role: "defense" },
        { id: "d3", x: 75, y: 57, label: "D3", role: "defense" },
        { id: "d4", x: 50, y: 63, label: "D4", role: "defense" },
        { id: "d5", x: 78, y: 83, label: "D5", role: "defense" },
      ],
      movements: [
        {
          playerId: "p4",
          fromX: 82,
          fromY: 83,
          toX: 50,
          toY: 45,
          type: "pass",
          curved: false,
        },
        {
          playerId: "p3",
          fromX: 82,
          fromY: 60,
          toX: 18,
          toY: 83,
          type: "cut",
          curved: false,
        },
        {
          playerId: "p2",
          fromX: 18,
          fromY: 60,
          toX: 18,
          toY: 55,
          type: "cut",
          curved: false,
        },
      ],
    },
  ],
};

export default play;

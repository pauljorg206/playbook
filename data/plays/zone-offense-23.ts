import { Play } from "@/lib/types";

// Court reference (HS varsity, half-court, 1ft = 10px scale):
// - Top of key: (50, 47)
// - High post / FT line center: (50, 57)
// - Wings (3pt extended, FT line height): (15, 64) / (85, 64)
// - Short corner: (12, 90) / (88, 90)
// - Low blocks: (38, 87) / (62, 87)

const play: Play = {
  id: "zone-offense-23",
  name: "Zone Offense vs 2-3",
  shortName: "vs 2-3 Zone",
  category: "zone-offense",
  description:
    "Attack the 2-3 zone with overload, skip passes, high-low action, and the short corner — the soft spot under a 2-3.",
  courtType: "half",
  steps: [
    {
      description:
        "1-3-1 overload set. PG (1) at the top. Wing (2) on the strong side. High post (5) at the FT line. Wing (3) on the weak side. Post (4) in the short corner — the gap under the 2-3.",
      players: [
        { id: "p1", x: 50, y: 47, label: "1", role: "offense", hasBall: true },
        { id: "p2", x: 15, y: 64, label: "2", role: "offense" },
        { id: "p3", x: 85, y: 64, label: "3", role: "offense" },
        { id: "p4", x: 12, y: 90, label: "4", role: "offense" },
        { id: "p5", x: 50, y: 57, label: "5", role: "offense" },
        { id: "d1", x: 38, y: 50, label: "D1", role: "defense" },
        { id: "d2", x: 62, y: 50, label: "D2", role: "defense" },
        { id: "d3", x: 22, y: 78, label: "D3", role: "defense" },
        { id: "d4", x: 50, y: 82, label: "D4", role: "defense" },
        { id: "d5", x: 78, y: 78, label: "D5", role: "defense" },
      ],
      movements: [],
    },
    {
      description:
        "Step 1: PG (1) passes to strong-side wing (2). The zone shifts left. High post (5) flashes ball-side to split the seam between the two top defenders.",
      players: [
        { id: "p1", x: 50, y: 47, label: "1", role: "offense" },
        { id: "p2", x: 15, y: 64, label: "2", role: "offense", hasBall: true },
        { id: "p3", x: 85, y: 64, label: "3", role: "offense" },
        { id: "p4", x: 12, y: 90, label: "4", role: "offense" },
        { id: "p5", x: 38, y: 57, label: "5", role: "offense" },
        { id: "d1", x: 30, y: 55, label: "D1", role: "defense" },
        { id: "d2", x: 55, y: 50, label: "D2", role: "defense" },
        { id: "d3", x: 20, y: 75, label: "D3", role: "defense" },
        { id: "d4", x: 45, y: 82, label: "D4", role: "defense" },
        { id: "d5", x: 78, y: 78, label: "D5", role: "defense" },
      ],
      movements: [
        {
          playerId: "p1",
          fromX: 50,
          fromY: 47,
          toX: 15,
          toY: 64,
          type: "pass",
        },
        {
          playerId: "p5",
          fromX: 50,
          fromY: 57,
          toX: 38,
          toY: 57,
          type: "cut",
          curved: false,
        },
      ],
    },
    {
      description:
        "Step 2: Short-corner attack. (2) drops the ball to the short corner (4). Now D3 is in conflict — guard (4) or recover to (2)? (5) seals D4 for the high-low.",
      players: [
        { id: "p1", x: 50, y: 47, label: "1", role: "offense" },
        { id: "p2", x: 15, y: 64, label: "2", role: "offense", hasBall: true },
        { id: "p3", x: 85, y: 64, label: "3", role: "offense" },
        { id: "p4", x: 12, y: 90, label: "4", role: "offense" },
        { id: "p5", x: 38, y: 57, label: "5", role: "offense" },
        { id: "d1", x: 30, y: 55, label: "D1", role: "defense" },
        { id: "d2", x: 55, y: 50, label: "D2", role: "defense" },
        { id: "d3", x: 18, y: 80, label: "D3", role: "defense" },
        { id: "d4", x: 50, y: 80, label: "D4", role: "defense" },
        { id: "d5", x: 78, y: 78, label: "D5", role: "defense" },
      ],
      movements: [
        {
          playerId: "p2",
          fromX: 15,
          fromY: 64,
          toX: 12,
          toY: 90,
          type: "pass",
        },
      ],
    },
    {
      description:
        "Step 3: Skip pass! Zone collapses on the short corner — (4) skips it across to weak-side wing (3). Zone can't recover — open three.",
      players: [
        { id: "p1", x: 50, y: 47, label: "1", role: "offense" },
        { id: "p2", x: 15, y: 64, label: "2", role: "offense" },
        { id: "p3", x: 85, y: 64, label: "3", role: "offense" },
        { id: "p4", x: 12, y: 90, label: "4", role: "offense", hasBall: true },
        { id: "p5", x: 38, y: 57, label: "5", role: "offense" },
        { id: "d1", x: 30, y: 55, label: "D1", role: "defense" },
        { id: "d2", x: 38, y: 60, label: "D2", role: "defense" },
        { id: "d3", x: 18, y: 80, label: "D3", role: "defense" },
        { id: "d4", x: 38, y: 80, label: "D4", role: "defense" },
        { id: "d5", x: 78, y: 78, label: "D5", role: "defense" },
      ],
      movements: [
        {
          playerId: "p4",
          fromX: 12,
          fromY: 90,
          toX: 85,
          toY: 64,
          type: "pass",
          curved: true,
          controlX: 50,
          controlY: 50,
        },
      ],
    },
    {
      description:
        "Step 4: High-low action. (3) feeds high post (5) at the elbow; (5) reads the seal and drops it to (4) posting up at the block. 2-on-1 inside.",
      players: [
        { id: "p1", x: 50, y: 47, label: "1", role: "offense" },
        { id: "p2", x: 15, y: 64, label: "2", role: "offense" },
        { id: "p3", x: 85, y: 64, label: "3", role: "offense", hasBall: true },
        { id: "p4", x: 62, y: 87, label: "4", role: "offense" },
        { id: "p5", x: 62, y: 57, label: "5", role: "offense" },
        { id: "d1", x: 62, y: 50, label: "D1", role: "defense" },
        { id: "d2", x: 38, y: 50, label: "D2", role: "defense" },
        { id: "d3", x: 22, y: 78, label: "D3", role: "defense" },
        { id: "d4", x: 50, y: 82, label: "D4", role: "defense" },
        { id: "d5", x: 78, y: 78, label: "D5", role: "defense" },
      ],
      movements: [
        {
          playerId: "p3",
          fromX: 85,
          fromY: 64,
          toX: 62,
          toY: 57,
          type: "pass",
        },
        {
          playerId: "p5",
          fromX: 62,
          fromY: 57,
          toX: 62,
          toY: 87,
          type: "pass",
        },
      ],
    },
  ],
};

export default play;

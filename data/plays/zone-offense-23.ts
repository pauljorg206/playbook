import { Play } from "@/lib/types";

const play: Play = {
  id: "zone-offense-23",
  name: "Zone Offense vs 2-3",
  shortName: "vs 2-3 Zone",
  category: "zone-offense",
  description:
    "Attack the 2-3 zone using overload, skip passes, high-low action, and the short corner — the softest spot in the 2-3.",
  courtType: "half",
  steps: [
    {
      description:
        "Set up in a 1-3-1 overload. PG (1) at the top. Wing (2) on the strong side. Post (5) at the high post. Wing (3) at the weak side. Post (4) in the short corner — the gap under the 2-3 zone.",
      players: [
        { id: "p1", x: 50, y: 45, label: "1", role: "offense", hasBall: true },
        { id: "p2", x: 20, y: 60, label: "2", role: "offense" },
        { id: "p3", x: 80, y: 60, label: "3", role: "offense" },
        { id: "p4", x: 10, y: 89, label: "4", role: "offense" },
        { id: "p5", x: 50, y: 60, label: "5", role: "offense" },
        { id: "d1", x: 35, y: 42, label: "D1", role: "defense" },
        { id: "d2", x: 65, y: 42, label: "D2", role: "defense" },
        { id: "d3", x: 22, y: 75, label: "D3", role: "defense" },
        { id: "d4", x: 50, y: 80, label: "D4", role: "defense" },
        { id: "d5", x: 78, y: 75, label: "D5", role: "defense" },
      ],
      movements: [],
    },
    {
      description:
        "Step 1: PG (1) passes to strong-side wing (2). The zone shifts left. High post (5) flashes to the ball-side elbow, splitting the seam between the two top defenders.",
      players: [
        { id: "p1", x: 50, y: 45, label: "1", role: "offense" },
        { id: "p2", x: 20, y: 60, label: "2", role: "offense", hasBall: true },
        { id: "p3", x: 80, y: 60, label: "3", role: "offense" },
        { id: "p4", x: 10, y: 89, label: "4", role: "offense" },
        { id: "p5", x: 50, y: 60, label: "5", role: "offense" },
        { id: "d1", x: 28, y: 50, label: "D1", role: "defense" },
        { id: "d2", x: 55, y: 42, label: "D2", role: "defense" },
        { id: "d3", x: 20, y: 72, label: "D3", role: "defense" },
        { id: "d4", x: 50, y: 80, label: "D4", role: "defense" },
        { id: "d5", x: 78, y: 75, label: "D5", role: "defense" },
      ],
      movements: [
        {
          playerId: "p1",
          fromX: 50,
          fromY: 45,
          toX: 20,
          toY: 60,
          type: "pass",
        },
        {
          playerId: "p5",
          fromX: 50,
          fromY: 60,
          toX: 36,
          toY: 63,
          type: "cut",
          curved: false,
        },
      ],
    },
    {
      description:
        "Step 2: Short corner attack! Wing (2) passes down to short corner (4). Defender D3 must choose — guard 4 or guard 2. Post (5) seals the middle defender for a high-low pass.",
      players: [
        { id: "p1", x: 50, y: 45, label: "1", role: "offense" },
        { id: "p2", x: 20, y: 60, label: "2", role: "offense", hasBall: true },
        { id: "p3", x: 80, y: 60, label: "3", role: "offense" },
        { id: "p4", x: 10, y: 89, label: "4", role: "offense" },
        { id: "p5", x: 36, y: 63, label: "5", role: "offense" },
        { id: "d1", x: 28, y: 50, label: "D1", role: "defense" },
        { id: "d2", x: 55, y: 42, label: "D2", role: "defense" },
        { id: "d3", x: 20, y: 72, label: "D3", role: "defense" },
        { id: "d4", x: 50, y: 80, label: "D4", role: "defense" },
        { id: "d5", x: 78, y: 75, label: "D5", role: "defense" },
      ],
      movements: [
        {
          playerId: "p2",
          fromX: 20,
          fromY: 60,
          toX: 10,
          toY: 89,
          type: "pass",
        },
      ],
    },
    {
      description:
        "Step 3: Skip pass! If the zone collapses on the short corner, (4) or (2) makes a long skip pass across to the weak-side wing (3). Zone can't recover — open three!",
      players: [
        { id: "p1", x: 50, y: 45, label: "1", role: "offense" },
        { id: "p2", x: 20, y: 60, label: "2", role: "offense" },
        { id: "p3", x: 80, y: 60, label: "3", role: "offense" },
        { id: "p4", x: 10, y: 89, label: "4", role: "offense", hasBall: true },
        { id: "p5", x: 36, y: 63, label: "5", role: "offense" },
        { id: "d1", x: 28, y: 50, label: "D1", role: "defense" },
        { id: "d2", x: 38, y: 55, label: "D2", role: "defense" },
        { id: "d3", x: 22, y: 75, label: "D3", role: "defense" },
        { id: "d4", x: 36, y: 80, label: "D4", role: "defense" },
        { id: "d5", x: 78, y: 75, label: "D5", role: "defense" },
      ],
      movements: [
        {
          playerId: "p4",
          fromX: 10,
          fromY: 89,
          toX: 80,
          toY: 60,
          type: "pass",
          curved: true,
          controlX: 50,
          controlY: 52,
        },
      ],
    },
    {
      description:
        "Step 4: High-low action. Ball at weak side (3). High post (5) is at the elbow — open in the gap. Pass to 5. Then 5 looks high-low to (4) posting up at the block. 2-on-1 inside!",
      players: [
        { id: "p1", x: 50, y: 45, label: "1", role: "offense" },
        { id: "p2", x: 20, y: 60, label: "2", role: "offense" },
        { id: "p3", x: 80, y: 60, label: "3", role: "offense", hasBall: true },
        { id: "p4", x: 60, y: 80, label: "4", role: "offense" },
        { id: "p5", x: 64, y: 63, label: "5", role: "offense" },
        { id: "d1", x: 65, y: 42, label: "D1", role: "defense" },
        { id: "d2", x: 38, y: 42, label: "D2", role: "defense" },
        { id: "d3", x: 22, y: 75, label: "D3", role: "defense" },
        { id: "d4", x: 50, y: 80, label: "D4", role: "defense" },
        { id: "d5", x: 78, y: 75, label: "D5", role: "defense" },
      ],
      movements: [
        {
          playerId: "p3",
          fromX: 80,
          fromY: 60,
          toX: 64,
          toY: 63,
          type: "pass",
        },
        {
          playerId: "p5",
          fromX: 64,
          fromY: 63,
          toX: 60,
          toY: 80,
          type: "pass",
        },
      ],
    },
  ],
};

export default play;

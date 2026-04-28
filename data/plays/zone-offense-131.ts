import { Play } from "@/lib/types";

// Court reference (HS varsity, half-court, 1ft = 10px scale):
// - Top of key: (50, 47)
// - High post (FT line): (50, 57)
// - Wings (3pt extended): (15, 64) / (85, 64)
// - Corner 3: (10, 92) / (90, 92)
// - Low blocks: (38, 87) / (62, 87)

const play: Play = {
  id: "zone-offense-131",
  name: "Zone Offense vs 1-3-1",
  shortName: "vs 1-3-1 Zone",
  category: "zone-offense",
  description:
    "Attack the 1-3-1 by hitting its weak spots: the corners, the wings, and the high-post gap. Drive-and-kick, skip passes, and middle flashes.",
  courtType: "half",
  steps: [
    {
      description:
        "Formation vs 1-3-1. PG (1) at the top. Wings (2, 3) wide outside the arc. Post (5) at the high-post gap between the point and wing defenders. Post (4) in the weak-side corner.",
      players: [
        { id: "p1", x: 50, y: 47, label: "1", role: "offense", hasBall: true },
        { id: "p2", x: 15, y: 64, label: "2", role: "offense" },
        { id: "p3", x: 85, y: 64, label: "3", role: "offense" },
        { id: "p4", x: 90, y: 92, label: "4", role: "offense" },
        { id: "p5", x: 50, y: 57, label: "5", role: "offense" },
        { id: "d1", x: 50, y: 40, label: "D1", role: "defense" },
        { id: "d2", x: 25, y: 60, label: "D2", role: "defense" },
        { id: "d3", x: 75, y: 60, label: "D3", role: "defense" },
        { id: "d4", x: 50, y: 65, label: "D4", role: "defense" },
        { id: "d5", x: 50, y: 87, label: "D5", role: "defense" },
      ],
      movements: [],
    },
    {
      description:
        "Step 1: Flash to the high post! PG (1) hits (5) in the gap. The 1-3-1 has no one assigned to the high post — it's a seam. Wings (2, 3) hold their spots.",
      players: [
        { id: "p1", x: 50, y: 47, label: "1", role: "offense", hasBall: true },
        { id: "p2", x: 15, y: 64, label: "2", role: "offense" },
        { id: "p3", x: 85, y: 64, label: "3", role: "offense" },
        { id: "p4", x: 90, y: 92, label: "4", role: "offense" },
        { id: "p5", x: 50, y: 57, label: "5", role: "offense" },
        { id: "d1", x: 50, y: 40, label: "D1", role: "defense" },
        { id: "d2", x: 25, y: 60, label: "D2", role: "defense" },
        { id: "d3", x: 75, y: 60, label: "D3", role: "defense" },
        { id: "d4", x: 50, y: 65, label: "D4", role: "defense" },
        { id: "d5", x: 50, y: 87, label: "D5", role: "defense" },
      ],
      movements: [
        {
          playerId: "p1",
          fromX: 50,
          fromY: 47,
          toX: 50,
          toY: 57,
          type: "pass",
        },
      ],
    },
    {
      description:
        "Step 2: (5) catches in the gap and faces up. Drive-and-kick! 5 puts it on the deck and forces the zone to collapse, then kicks to (2) or (3) for an open three.",
      players: [
        { id: "p1", x: 50, y: 47, label: "1", role: "offense" },
        { id: "p2", x: 15, y: 64, label: "2", role: "offense" },
        { id: "p3", x: 85, y: 64, label: "3", role: "offense" },
        { id: "p4", x: 90, y: 92, label: "4", role: "offense" },
        { id: "p5", x: 50, y: 57, label: "5", role: "offense", hasBall: true },
        { id: "d1", x: 50, y: 40, label: "D1", role: "defense" },
        { id: "d2", x: 25, y: 60, label: "D2", role: "defense" },
        { id: "d3", x: 75, y: 60, label: "D3", role: "defense" },
        { id: "d4", x: 50, y: 65, label: "D4", role: "defense" },
        { id: "d5", x: 50, y: 87, label: "D5", role: "defense" },
      ],
      movements: [
        {
          playerId: "p5",
          fromX: 50,
          fromY: 57,
          toX: 50,
          toY: 75,
          type: "dribble",
          curved: false,
        },
        {
          playerId: "p5",
          fromX: 50,
          fromY: 75,
          toX: 15,
          toY: 64,
          type: "pass",
          curved: false,
        },
      ],
    },
    {
      description:
        "Step 3: Skip pass to the corner! Wing (2) catches, then skips it across to the weak-side corner (4). The baseline defender (D5) can't cover both the block and the corner.",
      players: [
        { id: "p1", x: 50, y: 47, label: "1", role: "offense" },
        { id: "p2", x: 15, y: 64, label: "2", role: "offense", hasBall: true },
        { id: "p3", x: 85, y: 64, label: "3", role: "offense" },
        { id: "p4", x: 90, y: 92, label: "4", role: "offense" },
        { id: "p5", x: 50, y: 75, label: "5", role: "offense" },
        { id: "d1", x: 35, y: 50, label: "D1", role: "defense" },
        { id: "d2", x: 20, y: 60, label: "D2", role: "defense" },
        { id: "d3", x: 65, y: 60, label: "D3", role: "defense" },
        { id: "d4", x: 50, y: 70, label: "D4", role: "defense" },
        { id: "d5", x: 60, y: 87, label: "D5", role: "defense" },
      ],
      movements: [
        {
          playerId: "p2",
          fromX: 15,
          fromY: 64,
          toX: 90,
          toY: 92,
          type: "pass",
          curved: true,
          controlX: 50,
          controlY: 50,
        },
      ],
    },
    {
      description:
        "Step 4: Reset. Corner (4) kicks back to PG (1) at the top. Wings rotate to opposite sides, attack the other weak spot — run it again on the other side.",
      players: [
        { id: "p1", x: 50, y: 47, label: "1", role: "offense" },
        { id: "p2", x: 85, y: 64, label: "2", role: "offense" },
        { id: "p3", x: 15, y: 64, label: "3", role: "offense" },
        { id: "p4", x: 90, y: 92, label: "4", role: "offense", hasBall: true },
        { id: "p5", x: 50, y: 57, label: "5", role: "offense" },
        { id: "d1", x: 50, y: 40, label: "D1", role: "defense" },
        { id: "d2", x: 25, y: 60, label: "D2", role: "defense" },
        { id: "d3", x: 75, y: 60, label: "D3", role: "defense" },
        { id: "d4", x: 50, y: 65, label: "D4", role: "defense" },
        { id: "d5", x: 75, y: 87, label: "D5", role: "defense" },
      ],
      movements: [
        {
          playerId: "p4",
          fromX: 90,
          fromY: 92,
          toX: 50,
          toY: 47,
          type: "pass",
          curved: true,
          controlX: 75,
          controlY: 60,
        },
        {
          playerId: "p3",
          fromX: 85,
          fromY: 64,
          toX: 15,
          toY: 64,
          type: "cut",
          curved: false,
        },
        {
          playerId: "p2",
          fromX: 15,
          fromY: 64,
          toX: 85,
          toY: 64,
          type: "cut",
          curved: false,
        },
      ],
    },
  ],
};

export default play;

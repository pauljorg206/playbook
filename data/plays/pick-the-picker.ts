import { Play } from "@/lib/types";

// Court reference (HS varsity, half-court, 1ft = 10px scale):
// - Inbounder on baseline: y = 99
// - Low blocks: (38, 87) / (62, 87)
// - Elbows: (38, 57) / (62, 57)
// - High post (FT line center): (50, 57)
// - Wing 3pt left/right: (15, 64) / (85, 64)
// - Top of key: (50, 47)

const play: Play = {
  id: "pick-the-picker",
  name: "Pick the Picker",
  shortName: "Pick the Picker",
  category: "out-of-bounds",
  description:
    "Baseline box BLOB. (5) screens up for (3) on the wing. Then (2) and (4) double-screen for (5) — the picker becomes the cutter.",
  courtType: "half",
  steps: [
    {
      description:
        "Box set. (1) inbounder out of bounds on the left side of the lane. Posts (4, 5) on the low blocks. Wings (2, 3) at the elbows.",
      players: [
        {
          id: "p1",
          x: 30,
          y: 99,
          label: "1",
          role: "inbounder",
          hasBall: true,
        },
        { id: "p2", x: 38, y: 57, label: "2", role: "offense" },
        { id: "p3", x: 62, y: 57, label: "3", role: "offense" },
        { id: "p4", x: 38, y: 87, label: "4", role: "offense" },
        { id: "p5", x: 62, y: 87, label: "5", role: "offense" },
      ],
      movements: [],
    },
    {
      description:
        "Step 1: (5) screens UP for wing (3). 5 climbs from the right block to set a back-screen on 3's defender. 3 cuts hard to the right wing for the inbound pass.",
      players: [
        {
          id: "p1",
          x: 30,
          y: 99,
          label: "1",
          role: "inbounder",
          hasBall: true,
        },
        { id: "p2", x: 38, y: 57, label: "2", role: "offense" },
        { id: "p3", x: 62, y: 57, label: "3", role: "offense" },
        { id: "p4", x: 38, y: 87, label: "4", role: "offense" },
        { id: "p5", x: 62, y: 87, label: "5", role: "offense" },
      ],
      movements: [
        {
          playerId: "p5",
          fromX: 62,
          fromY: 87,
          toX: 64,
          toY: 64,
          type: "screen",
          curved: false,
        },
        {
          playerId: "p3",
          fromX: 62,
          fromY: 57,
          toX: 86,
          toY: 70,
          type: "cut",
          curved: true,
          controlX: 78,
          controlY: 56,
        },
      ],
      screens: [{ screenerId: "p5", x: 64, y: 64, angle: 90 }],
    },
    {
      description:
        "Step 2: 'Pick the Picker' — (2) and (4) form a double-screen at the left elbow for (5), the original screener. 5 curls off the double-stagger and pops to the ball-side elbow for a catch-and-shoot.",
      players: [
        {
          id: "p1",
          x: 30,
          y: 99,
          label: "1",
          role: "inbounder",
          hasBall: true,
        },
        { id: "p2", x: 38, y: 57, label: "2", role: "offense" },
        { id: "p3", x: 86, y: 70, label: "3", role: "offense" },
        { id: "p4", x: 38, y: 87, label: "4", role: "offense" },
        { id: "p5", x: 64, y: 64, label: "5", role: "offense" },
      ],
      movements: [
        {
          playerId: "p2",
          fromX: 38,
          fromY: 57,
          toX: 44,
          toY: 70,
          type: "cut",
          curved: false,
        },
        {
          playerId: "p4",
          fromX: 38,
          fromY: 87,
          toX: 44,
          toY: 78,
          type: "cut",
          curved: false,
        },
        {
          playerId: "p5",
          fromX: 64,
          fromY: 64,
          toX: 38,
          toY: 50,
          type: "cut",
          curved: true,
          controlX: 50,
          controlY: 60,
        },
      ],
      screens: [
        { screenerId: "p2", x: 44, y: 70, angle: 90 },
        { screenerId: "p4", x: 44, y: 78, angle: 90 },
      ],
    },
    {
      description:
        "Step 3 — Read & inbound. 1st look: 3 open at the right wing. 2nd look: 5 popping to the ball-side elbow off the double-stagger. 3rd look: 2 or 4 step out as safety release.",
      players: [
        {
          id: "p1",
          x: 30,
          y: 99,
          label: "1",
          role: "inbounder",
          hasBall: true,
        },
        { id: "p2", x: 44, y: 70, label: "2", role: "offense" },
        { id: "p3", x: 86, y: 70, label: "3", role: "offense" },
        { id: "p4", x: 44, y: 78, label: "4", role: "offense" },
        { id: "p5", x: 38, y: 50, label: "5", role: "offense" },
      ],
      movements: [
        {
          playerId: "p1",
          fromX: 30,
          fromY: 99,
          toX: 86,
          toY: 70,
          type: "pass",
          curved: true,
          controlX: 60,
          controlY: 92,
        },
        {
          playerId: "p1",
          fromX: 30,
          fromY: 99,
          toX: 38,
          toY: 50,
          type: "pass",
          curved: false,
        },
      ],
    },
  ],
};

export default play;

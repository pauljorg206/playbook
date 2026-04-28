import { Play } from "@/lib/types";

// Court reference (HS varsity, half-court, 1ft = 10px scale):
// - Top of key: (50, 47)
// - Elbows / high post: (38, 57) / (50, 57) / (62, 57)
// - Wings outside 3pt: (15, 64) / (85, 64)
// - Low blocks: (38, 87) / (62, 87)
// - Mid post: (38, 78) / (62, 78)
// - Short corner: (12, 90) / (88, 90)

const play: Play = {
  id: "one-four-high",
  name: "1-4 High Motion",
  shortName: "1-4 High",
  category: "offense",
  description:
    "Half-court motion from a 1-4 high set. UCLA cut off the ball-side elbow, ball-side pick-and-roll, and a weak-side stagger that springs the PG for a catch-and-shoot three.",
  courtType: "half",
  steps: [
    {
      description:
        "Formation. PG (1) at top of the key, just inside the arc. Wings (2, 3) on the wings outside the 3-pt line. Posts (4, 5) at the elbows. Spaced and even.",
      players: [
        { id: "p1", x: 50, y: 47, label: "1", role: "offense", hasBall: true },
        { id: "p2", x: 15, y: 64, label: "2", role: "offense" },
        { id: "p3", x: 85, y: 64, label: "3", role: "offense" },
        { id: "p4", x: 38, y: 57, label: "4", role: "offense" },
        { id: "p5", x: 62, y: 57, label: "5", role: "offense" },
      ],
      movements: [],
    },
    {
      description:
        "Step 1: PG (1) passes to the left wing (2) — entry pass. Ball is on the strong side.",
      players: [
        { id: "p1", x: 50, y: 47, label: "1", role: "offense", hasBall: true },
        { id: "p2", x: 15, y: 64, label: "2", role: "offense" },
        { id: "p3", x: 85, y: 64, label: "3", role: "offense" },
        { id: "p4", x: 38, y: 57, label: "4", role: "offense" },
        { id: "p5", x: 62, y: 57, label: "5", role: "offense" },
      ],
      movements: [
        {
          playerId: "p1",
          fromX: 50,
          fromY: 47,
          toX: 15,
          toY: 64,
          type: "pass",
          curved: false,
        },
      ],
    },
    {
      description:
        "Step 2: UCLA cut. PG (1) cuts hard off the ball-side elbow (4) all the way down past the first low block. 2 looks for the layup pass on the cut.",
      players: [
        { id: "p1", x: 50, y: 47, label: "1", role: "offense" },
        { id: "p2", x: 15, y: 64, label: "2", role: "offense", hasBall: true },
        { id: "p3", x: 85, y: 64, label: "3", role: "offense" },
        { id: "p4", x: 38, y: 57, label: "4", role: "offense" },
        { id: "p5", x: 62, y: 57, label: "5", role: "offense" },
      ],
      movements: [
        {
          playerId: "p1",
          fromX: 50,
          fromY: 47,
          toX: 38,
          toY: 92,
          type: "cut",
          curved: true,
          controlX: 34,
          controlY: 65,
        },
        {
          playerId: "p2",
          fromX: 15,
          fromY: 64,
          toX: 38,
          toY: 92,
          type: "pass",
          curved: false,
        },
      ],
      screens: [{ screenerId: "p4", x: 38, y: 60, angle: 90 }],
    },
    {
      description:
        "Step 3: Ball-side pick-and-roll. Post (4) flares out to the left wing and sets a ball-screen for (2). Pick & roll — 4 rolls hard down the lane, 2 attacks middle.",
      players: [
        { id: "p1", x: 38, y: 92, label: "1", role: "offense" },
        { id: "p2", x: 15, y: 64, label: "2", role: "offense", hasBall: true },
        { id: "p3", x: 85, y: 64, label: "3", role: "offense" },
        { id: "p4", x: 38, y: 57, label: "4", role: "offense" },
        { id: "p5", x: 62, y: 57, label: "5", role: "offense" },
      ],
      movements: [
        {
          playerId: "p4",
          fromX: 38,
          fromY: 57,
          toX: 22,
          toY: 64,
          type: "screen",
          curved: false,
        },
        {
          playerId: "p4",
          fromX: 22,
          fromY: 64,
          toX: 45,
          toY: 87,
          type: "cut",
          curved: true,
          controlX: 28,
          controlY: 82,
        },
        {
          playerId: "p2",
          fromX: 15,
          fromY: 64,
          toX: 35,
          toY: 60,
          type: "dribble",
          curved: true,
          controlX: 22,
          controlY: 58,
        },
      ],
      screens: [{ screenerId: "p4", x: 22, y: 64, angle: 0 }],
    },
    {
      description:
        "Step 4: Weak-side staggered screen for the PG. (5) sets the first screen at the right elbow extended; (3) sets the second screen at the right wing. 1 curls baseline-to-top off the stagger.",
      players: [
        { id: "p1", x: 38, y: 92, label: "1", role: "offense" },
        { id: "p2", x: 35, y: 60, label: "2", role: "offense", hasBall: true },
        { id: "p3", x: 85, y: 64, label: "3", role: "offense" },
        { id: "p4", x: 45, y: 87, label: "4", role: "offense" },
        { id: "p5", x: 62, y: 57, label: "5", role: "offense" },
      ],
      movements: [
        {
          playerId: "p5",
          fromX: 62,
          fromY: 57,
          toX: 65,
          toY: 70,
          type: "screen",
          curved: false,
        },
        {
          playerId: "p3",
          fromX: 85,
          fromY: 64,
          toX: 75,
          toY: 55,
          type: "screen",
          curved: false,
        },
        {
          playerId: "p1",
          fromX: 38,
          fromY: 92,
          toX: 50,
          toY: 47,
          type: "cut",
          curved: true,
          controlX: 80,
          controlY: 75,
        },
      ],
      screens: [
        { screenerId: "p5", x: 65, y: 70, angle: 90 },
        { screenerId: "p3", x: 75, y: 55, angle: 90 },
      ],
    },
    {
      description:
        "Step 5: PG (1) catches at the top of the key. (2) skips the ball back to 1 — kick-out three off the stagger!",
      players: [
        { id: "p1", x: 50, y: 47, label: "1", role: "offense" },
        { id: "p2", x: 35, y: 60, label: "2", role: "offense", hasBall: true },
        { id: "p3", x: 75, y: 55, label: "3", role: "offense" },
        { id: "p4", x: 45, y: 87, label: "4", role: "offense" },
        { id: "p5", x: 65, y: 70, label: "5", role: "offense" },
      ],
      movements: [
        {
          playerId: "p2",
          fromX: 35,
          fromY: 60,
          toX: 50,
          toY: 47,
          type: "pass",
          curved: false,
        },
      ],
    },
    {
      description:
        "Step 6: Reset / continuity. (3) clears back to the right wing. (5) drops to the short corner. (4) seals the left block. Ball is back at the top — re-run the action or feed inside.",
      players: [
        { id: "p1", x: 50, y: 47, label: "1", role: "offense", hasBall: true },
        { id: "p2", x: 35, y: 60, label: "2", role: "offense" },
        { id: "p3", x: 85, y: 64, label: "3", role: "offense" },
        { id: "p4", x: 38, y: 87, label: "4", role: "offense" },
        { id: "p5", x: 88, y: 90, label: "5", role: "offense" },
      ],
      movements: [
        {
          playerId: "p3",
          fromX: 75,
          fromY: 55,
          toX: 85,
          toY: 64,
          type: "cut",
          curved: false,
        },
        {
          playerId: "p5",
          fromX: 65,
          fromY: 70,
          toX: 88,
          toY: 90,
          type: "cut",
          curved: false,
        },
        {
          playerId: "p4",
          fromX: 45,
          fromY: 87,
          toX: 38,
          toY: 87,
          type: "cut",
          curved: false,
        },
      ],
    },
  ],
};

export default play;

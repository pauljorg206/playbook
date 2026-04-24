import { Play } from "@/lib/types";

const play: Play = {
  id: "one-four-high",
  name: "1-4 High Motion",
  shortName: "1-4 High",
  category: "offense",
  description:
    "Half-court motion offense starting in a 1-4 high set. Features a PG cut off the elbow, pick and roll, and staggered screen action for a kick-out three.",
  courtType: "half",
  steps: [
    {
      description:
        "Formation: PG (1) at top of key. Wings (2) and (3) at the wings. Posts (4) and (5) at the elbows. Spread and spaced.",
      players: [
        { id: "p1", x: 50, y: 35, label: "1", role: "offense", hasBall: true },
        { id: "p2", x: 18, y: 60, label: "2", role: "offense" },
        { id: "p3", x: 82, y: 60, label: "3", role: "offense" },
        { id: "p4", x: 36, y: 63, label: "4", role: "offense" },
        { id: "p5", x: 64, y: 63, label: "5", role: "offense" },
      ],
      movements: [],
    },
    {
      description:
        "Step 1: PG (1) passes to the wing (2). Ball goes to the left wing.",
      players: [
        { id: "p1", x: 50, y: 35, label: "1", role: "offense", hasBall: true },
        { id: "p2", x: 18, y: 60, label: "2", role: "offense" },
        { id: "p3", x: 82, y: 60, label: "3", role: "offense" },
        { id: "p4", x: 36, y: 63, label: "4", role: "offense" },
        { id: "p5", x: 64, y: 63, label: "5", role: "offense" },
      ],
      movements: [
        {
          playerId: "p1",
          fromX: 50,
          fromY: 35,
          toX: 18,
          toY: 60,
          type: "pass",
          curved: false,
        },
      ],
    },
    {
      description:
        "Step 2: PG (1) cuts hard through the lane, rubbing off the ball-side elbow (4). Player 2 looks for the quick layup pass to 1 cutting.",
      players: [
        { id: "p1", x: 50, y: 35, label: "1", role: "offense" },
        { id: "p2", x: 18, y: 60, label: "2", role: "offense", hasBall: true },
        { id: "p3", x: 82, y: 60, label: "3", role: "offense" },
        { id: "p4", x: 36, y: 63, label: "4", role: "offense" },
        { id: "p5", x: 64, y: 63, label: "5", role: "offense" },
      ],
      movements: [
        {
          playerId: "p1",
          fromX: 50,
          fromY: 35,
          toX: 40,
          toY: 78,
          type: "cut",
          curved: true,
          controlX: 36,
          controlY: 60,
        },
        {
          playerId: "p2",
          fromX: 18,
          fromY: 60,
          toX: 40,
          toY: 78,
          type: "pass",
          curved: false,
        },
      ],
      screens: [{ screenerId: "p4", x: 36, y: 66, angle: 45 }],
    },
    {
      description:
        "Step 3: If no layup, Player 4 comes down and sets a ball screen for 2. Pick and roll — 4 rolls hard to the basket, 2 drives or pulls up.",
      players: [
        { id: "p1", x: 40, y: 78, label: "1", role: "offense" },
        { id: "p2", x: 18, y: 60, label: "2", role: "offense", hasBall: true },
        { id: "p3", x: 82, y: 60, label: "3", role: "offense" },
        { id: "p4", x: 36, y: 63, label: "4", role: "offense" },
        { id: "p5", x: 64, y: 63, label: "5", role: "offense" },
      ],
      movements: [
        {
          playerId: "p4",
          fromX: 36,
          fromY: 63,
          toX: 25,
          toY: 68,
          type: "screen",
          curved: false,
        },
        {
          playerId: "p4",
          fromX: 25,
          fromY: 68,
          toX: 42,
          toY: 80,
          type: "cut",
          curved: true,
          controlX: 30,
          controlY: 78,
        },
        {
          playerId: "p2",
          fromX: 18,
          fromY: 60,
          toX: 35,
          toY: 65,
          type: "dribble",
          curved: false,
        },
      ],
      screens: [{ screenerId: "p4", x: 25, y: 68, angle: 90 }],
    },
    {
      description:
        "Step 4: Meanwhile, PG (1) continues through the lane and curls around a staggered screen from 5 (weak-side elbow) then 3 (weak-side wing). Stagger screen action on the weak side.",
      players: [
        { id: "p1", x: 40, y: 78, label: "1", role: "offense" },
        { id: "p2", x: 35, y: 65, label: "2", role: "offense", hasBall: true },
        { id: "p3", x: 82, y: 60, label: "3", role: "offense" },
        { id: "p4", x: 42, y: 80, label: "4", role: "offense" },
        { id: "p5", x: 64, y: 63, label: "5", role: "offense" },
      ],
      movements: [
        {
          playerId: "p1",
          fromX: 40,
          fromY: 78,
          toX: 50,
          toY: 35,
          type: "cut",
          curved: true,
          controlX: 62,
          controlY: 65,
        },
      ],
      screens: [
        { screenerId: "p5", x: 64, y: 66, angle: 45 },
        { screenerId: "p3", x: 75, y: 58, angle: 135 },
      ],
    },
    {
      description:
        "Step 5: PG (1) pops to the top of the key for a three-pointer off the staggered screen. Player 2 swings the ball — kick-out pass to 1 for the three!",
      players: [
        { id: "p1", x: 50, y: 35, label: "1", role: "offense" },
        { id: "p2", x: 35, y: 65, label: "2", role: "offense", hasBall: true },
        { id: "p3", x: 75, y: 58, label: "3", role: "offense" },
        { id: "p4", x: 42, y: 80, label: "4", role: "offense" },
        { id: "p5", x: 64, y: 63, label: "5", role: "offense" },
      ],
      movements: [
        {
          playerId: "p2",
          fromX: 35,
          fromY: 65,
          toX: 50,
          toY: 35,
          type: "pass",
          curved: false,
        },
      ],
    },
    {
      description:
        "Step 6: Weak-side wing (3) pops out to the wing. Post (5) slides to the short corner. Ball reversal options — feed inside to 4 or 5, or reset to run again.",
      players: [
        { id: "p1", x: 50, y: 35, label: "1", role: "offense", hasBall: true },
        { id: "p2", x: 35, y: 65, label: "2", role: "offense" },
        { id: "p3", x: 82, y: 60, label: "3", role: "offense" },
        { id: "p4", x: 42, y: 80, label: "4", role: "offense" },
        { id: "p5", x: 68, y: 78, label: "5", role: "offense" },
      ],
      movements: [
        {
          playerId: "p3",
          fromX: 75,
          fromY: 58,
          toX: 82,
          toY: 60,
          type: "cut",
          curved: false,
        },
        {
          playerId: "p5",
          fromX: 64,
          fromY: 63,
          toX: 68,
          toY: 78,
          type: "cut",
          curved: false,
        },
        {
          playerId: "p1",
          fromX: 50,
          fromY: 35,
          toX: 82,
          toY: 60,
          type: "pass",
          curved: false,
        },
      ],
    },
  ],
};

export default play;

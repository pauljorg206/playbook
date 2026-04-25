import { Play } from "@/lib/types";

// ── 1-4 High Motion ─────────────────────────────────────────────────────
// Coordinate notes (0-100 of the new NBA-styled court):
//   Basket center: (50, 92).  3pt arc top at (50, ~42).
//   Free-throw line extended: y ≈ 56.  Elbows: (38, 56) / (62, 56).
//   Wings just outside arc at FT extended: (15, 56) / (85, 56).
//   Top of key (inside the arc): y ≈ 47.
//   Ball-side block: (34, 89).  Weak-side block: (66, 89).
//   Second hash up from block: y ≈ 83.

const play: Play = {
  id: "one-four-high",
  name: "1-4 High Motion",
  shortName: "1-4 High",
  category: "offense",
  description:
    "Half-court motion offense from a 1-4 high set. PG cuts off an elbow screen all the way to the block, the post lifts into a ball screen, and the cutter curls back up off a stagger for an open three.",
  courtType: "half",
  steps: [
    // ── Formation ──
    {
      description:
        "Formation. PG (1) at the top of the key just inside the arc. The four bigs/wings line up on the foul-line extended: wings (2, 3) just outside the arc, posts (4, 5) at the elbows. Spaced and even.",
      players: [
        { id: "p1", x: 50, y: 47, label: "1", role: "offense", hasBall: true },
        { id: "p2", x: 15, y: 56, label: "2", role: "offense" },
        { id: "p4", x: 38, y: 56, label: "4", role: "offense" },
        { id: "p5", x: 62, y: 56, label: "5", role: "offense" },
        { id: "p3", x: 85, y: 56, label: "3", role: "offense" },
      ],
      movements: [],
    },

    // ── 1: Pass to the wing ──
    {
      description:
        "Pass to the wing. PG (1) hits 2 on the left. Ball entry — everyone hold, eyes on the cutter coming.",
      players: [
        { id: "p1", x: 50, y: 47, label: "1", role: "offense" },
        { id: "p2", x: 15, y: 56, label: "2", role: "offense", hasBall: true },
        { id: "p4", x: 38, y: 56, label: "4", role: "offense" },
        { id: "p5", x: 62, y: 56, label: "5", role: "offense" },
        { id: "p3", x: 85, y: 56, label: "3", role: "offense" },
      ],
      movements: [
        {
          playerId: "p1",
          fromX: 50,
          fromY: 47,
          toX: 15,
          toY: 56,
          type: "pass",
          curved: false,
        },
      ],
    },

    // ── 2: PG rubs the elbow and cuts to the block ──
    {
      description:
        "PG cuts hard. (1) rubs shoulders with (4) at the elbow and cuts ALL the way to the ball-side block — looking for a quick layup feed from (2). Post (4) holds the screen.",
      players: [
        { id: "p1", x: 34, y: 89, label: "1", role: "offense" },
        { id: "p2", x: 15, y: 56, label: "2", role: "offense", hasBall: true },
        { id: "p4", x: 38, y: 56, label: "4", role: "offense" },
        { id: "p5", x: 62, y: 56, label: "5", role: "offense" },
        { id: "p3", x: 85, y: 56, label: "3", role: "offense" },
      ],
      movements: [
        {
          playerId: "p1",
          fromX: 50,
          fromY: 47,
          toX: 34,
          toY: 89,
          type: "cut",
          curved: true,
          controlX: 42,
          controlY: 60,
        },
      ],
      screens: [{ screenerId: "p4", x: 38, y: 56, angle: 75 }],
    },

    // ── 3: Big lifts into a ball screen, PG clears to the corner ──
    {
      description:
        "Ball screen. (4) lifts into a high ball screen for (2). (2) attacks downhill — read the defense. (4) rolls hard to the rim. (1) clears to the ball-side short corner so the lane stays open.",
      players: [
        { id: "p1", x: 12, y: 92, label: "1", role: "offense" },
        { id: "p2", x: 15, y: 56, label: "2", role: "offense", hasBall: true },
        { id: "p4", x: 24, y: 60, label: "4", role: "offense" },
        { id: "p5", x: 62, y: 56, label: "5", role: "offense" },
        { id: "p3", x: 85, y: 56, label: "3", role: "offense" },
      ],
      movements: [
        // (4) up from elbow to set the on-ball screen
        {
          playerId: "p4",
          fromX: 38,
          fromY: 56,
          toX: 24,
          toY: 60,
          type: "screen",
          curved: false,
        },
        // (2) dribbles off the screen toward the middle
        {
          playerId: "p2",
          fromX: 15,
          fromY: 56,
          toX: 35,
          toY: 65,
          type: "dribble",
          curved: true,
          controlX: 22,
          controlY: 62,
        },
        // (1) drifts to short corner to space
        {
          playerId: "p1",
          fromX: 34,
          fromY: 89,
          toX: 12,
          toY: 92,
          type: "cut",
          curved: false,
        },
      ],
      screens: [{ screenerId: "p4", x: 24, y: 60, angle: 90 }],
    },

    // ── 4: (4) rolls; (5) and (3) set a stagger for (1) curling weak-side ──
    {
      description:
        "Stagger on the weak side. (4) rolls to the rim. (5) drops to the second hash above the weak-side block; (3) lifts to the elbow extended. (1) sprints baseline and curls up off the stagger.",
      players: [
        { id: "p1", x: 50, y: 47, label: "1", role: "offense" },
        { id: "p2", x: 35, y: 65, label: "2", role: "offense", hasBall: true },
        { id: "p4", x: 40, y: 87, label: "4", role: "offense" },
        { id: "p5", x: 66, y: 83, label: "5", role: "offense" },
        { id: "p3", x: 78, y: 64, label: "3", role: "offense" },
      ],
      movements: [
        // (4) rolls to the rim
        {
          playerId: "p4",
          fromX: 24,
          fromY: 60,
          toX: 40,
          toY: 87,
          type: "cut",
          curved: true,
          controlX: 30,
          controlY: 78,
        },
        // (5) sets first stagger at the second hash
        {
          playerId: "p5",
          fromX: 62,
          fromY: 56,
          toX: 66,
          toY: 83,
          type: "screen",
          curved: false,
        },
        // (3) lifts to second stagger
        {
          playerId: "p3",
          fromX: 85,
          fromY: 56,
          toX: 78,
          toY: 64,
          type: "screen",
          curved: false,
        },
        // (1) curls baseline → top of key
        {
          playerId: "p1",
          fromX: 12,
          fromY: 92,
          toX: 50,
          toY: 47,
          type: "cut",
          curved: true,
          controlX: 75,
          controlY: 78,
        },
      ],
      screens: [
        { screenerId: "p5", x: 66, y: 83, angle: 30 },
        { screenerId: "p3", x: 78, y: 64, angle: 130 },
      ],
    },

    // ── 5: Kick-out to the top — clean look at three ──
    {
      description:
        "Kick-out three. (2) swings the ball to (1) popping out at the top of the key — clean catch-and-shoot off the stagger.",
      players: [
        { id: "p1", x: 50, y: 47, label: "1", role: "offense", hasBall: true },
        { id: "p2", x: 35, y: 65, label: "2", role: "offense" },
        { id: "p4", x: 40, y: 87, label: "4", role: "offense" },
        { id: "p5", x: 66, y: 83, label: "5", role: "offense" },
        { id: "p3", x: 78, y: 64, label: "3", role: "offense" },
      ],
      movements: [
        {
          playerId: "p2",
          fromX: 35,
          fromY: 65,
          toX: 50,
          toY: 47,
          type: "pass",
          curved: false,
        },
      ],
    },

    // ── 6: Reset / continuity options ──
    {
      description:
        "Reset & continuity. If no shot: (3) pops back to the wing, (5) slides to the short corner, (4) seals on the block. Reverse the ball or feed inside — then run it again.",
      players: [
        { id: "p1", x: 50, y: 47, label: "1", role: "offense", hasBall: true },
        { id: "p2", x: 35, y: 65, label: "2", role: "offense" },
        { id: "p4", x: 38, y: 87, label: "4", role: "offense" },
        { id: "p5", x: 75, y: 92, label: "5", role: "offense" },
        { id: "p3", x: 85, y: 56, label: "3", role: "offense" },
      ],
      movements: [
        {
          playerId: "p3",
          fromX: 78,
          fromY: 64,
          toX: 85,
          toY: 56,
          type: "cut",
          curved: false,
        },
        {
          playerId: "p5",
          fromX: 66,
          fromY: 83,
          toX: 75,
          toY: 92,
          type: "cut",
          curved: false,
        },
        {
          playerId: "p1",
          fromX: 50,
          fromY: 47,
          toX: 85,
          toY: 56,
          type: "pass",
          curved: false,
        },
      ],
    },
  ],
};

export default play;

import { Play } from "@/lib/types";

// Box set BLOB: posts on the low blocks, wings at the elbows. Inbounder on the
// left side of the lane, just out of bounds.
//
// Coord notes (new NBA geometry):
//   Low blocks:  (34, 87) / (66, 87)    Elbows: (38, 56) / (62, 56)
//   Second hash above block (screen): y≈83. First hash above: y≈70.

const play: Play = {
  id: "pick-the-picker",
  name: "Pick the Picker",
  shortName: "Pick the Picker",
  category: "out-of-bounds",
  description:
    "Baseline out-of-bounds box set. (5) screens up for (3) on the wing. Then (2) and (4) pick the picker — double-screen for (5) curling to the elbow. Multiple looks built in.",
  courtType: "half",
  steps: [
    // Formation
    {
      description:
        "Box set. (1) inbounder out of bounds on the left side of the lane. Posts (4, 5) on the low blocks. Wings (2, 3) at the elbows.",
      players: [
        { id: "p1", x: 30, y: 99, label: "1", role: "inbounder", hasBall: true },
        { id: "p2", x: 38, y: 56, label: "2", role: "offense" },
        { id: "p3", x: 62, y: 56, label: "3", role: "offense" },
        { id: "p4", x: 34, y: 87, label: "4", role: "offense" },
        { id: "p5", x: 66, y: 87, label: "5", role: "offense" },
      ],
      movements: [],
    },

    // 1: 5 screens up for 3
    {
      description:
        "First action. (5) flashes up to the second hash and screens up for (3). (3) reads the screen and sprints to the right wing for the inbound.",
      players: [
        { id: "p1", x: 30, y: 99, label: "1", role: "inbounder", hasBall: true },
        { id: "p2", x: 38, y: 56, label: "2", role: "offense" },
        { id: "p3", x: 85, y: 65, label: "3", role: "offense" },
        { id: "p4", x: 34, y: 87, label: "4", role: "offense" },
        { id: "p5", x: 66, y: 70, label: "5", role: "offense" },
      ],
      movements: [
        {
          playerId: "p5",
          fromX: 66,
          fromY: 87,
          toX: 66,
          toY: 70,
          type: "screen",
          curved: false,
        },
        {
          playerId: "p3",
          fromX: 62,
          fromY: 56,
          toX: 85,
          toY: 65,
          type: "cut",
          curved: true,
          controlX: 78,
          controlY: 58,
        },
      ],
      screens: [{ screenerId: "p5", x: 66, y: 70, angle: 0 }],
    },

    // 2: 2 and 4 pick the picker — double screen for 5
    {
      description:
        "Pick the picker. (2) sprints down from the elbow and (4) lifts from the block — they form a double screen on the nail. (5) — the original screener — curls hard around them to the middle of the floor.",
      players: [
        { id: "p1", x: 30, y: 99, label: "1", role: "inbounder", hasBall: true },
        { id: "p2", x: 46, y: 70, label: "2", role: "offense" },
        { id: "p3", x: 85, y: 65, label: "3", role: "offense" },
        { id: "p4", x: 54, y: 70, label: "4", role: "offense" },
        { id: "p5", x: 50, y: 56, label: "5", role: "offense" },
      ],
      movements: [
        {
          playerId: "p2",
          fromX: 38,
          fromY: 56,
          toX: 46,
          toY: 70,
          type: "screen",
          curved: false,
        },
        {
          playerId: "p4",
          fromX: 34,
          fromY: 87,
          toX: 54,
          toY: 70,
          type: "screen",
          curved: false,
        },
        {
          playerId: "p5",
          fromX: 66,
          fromY: 70,
          toX: 50,
          toY: 56,
          type: "cut",
          curved: true,
          controlX: 58,
          controlY: 60,
        },
      ],
      screens: [
        { screenerId: "p2", x: 46, y: 70, angle: 90 },
        { screenerId: "p4", x: 54, y: 70, angle: 90 },
      ],
    },

    // 3: read & inbound
    {
      description:
        "Read the defense. 1st look: (3) on the right wing off the up-screen. 2nd look: (5) at the elbow off the double. 3rd look: (4) or (2) slip after setting the screen. Pick the open one and inbound.",
      players: [
        { id: "p1", x: 30, y: 99, label: "1", role: "inbounder", hasBall: true },
        { id: "p2", x: 46, y: 70, label: "2", role: "offense" },
        { id: "p3", x: 85, y: 65, label: "3", role: "offense" },
        { id: "p4", x: 54, y: 70, label: "4", role: "offense" },
        { id: "p5", x: 50, y: 56, label: "5", role: "offense" },
      ],
      movements: [
        {
          playerId: "p1",
          fromX: 30,
          fromY: 99,
          toX: 50,
          toY: 56,
          type: "pass",
          curved: false,
        },
      ],
    },
  ],
};

export default play;

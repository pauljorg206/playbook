import { Play } from "@/lib/types";

const play: Play = {
  id: "pick-the-picker",
  name: "Pick the Picker",
  shortName: "Pick the Picker",
  category: "out-of-bounds",
  description:
    "Baseline out of bounds box set. Posts (4, 5) on the low blocks. Wings (2, 3) at the elbows. 5 screens up for 3, then 2 and 4 pick the picker (double screen for 5).",
  courtType: "half",
  steps: [
    {
      description:
        "Box set formation. Player 1 (inbounder) is out of bounds on the left side of the key. Posts 4 and 5 on the low blocks. Wings 2 and 3 at the elbows.",
      players: [
        {
          id: "p1",
          x: 30,
          y: 97,
          label: "1",
          role: "inbounder",
          hasBall: true,
        },
        { id: "p2", x: 36, y: 63, label: "2", role: "offense" },
        { id: "p3", x: 64, y: 63, label: "3", role: "offense" },
        { id: "p4", x: 38, y: 80, label: "4", role: "offense" },
        { id: "p5", x: 62, y: 80, label: "5", role: "offense" },
      ],
      movements: [],
    },
    {
      description:
        "Step 1: Post (5) screens UP for wing (3). 5 moves from the right low block up to set a screen on 3's defender. Player 3 uses the screen and cuts hard toward the right wing for the inbound pass.",
      players: [
        {
          id: "p1",
          x: 30,
          y: 97,
          label: "1",
          role: "inbounder",
          hasBall: true,
        },
        { id: "p2", x: 36, y: 63, label: "2", role: "offense" },
        { id: "p3", x: 64, y: 63, label: "3", role: "offense" },
        { id: "p4", x: 38, y: 80, label: "4", role: "offense" },
        { id: "p5", x: 62, y: 80, label: "5", role: "offense" },
      ],
      movements: [
        {
          playerId: "p5",
          fromX: 62,
          fromY: 80,
          toX: 62,
          toY: 67,
          type: "screen",
          curved: false,
        },
        {
          playerId: "p3",
          fromX: 64,
          fromY: 63,
          toX: 82,
          toY: 68,
          type: "cut",
          curved: true,
          controlX: 75,
          controlY: 60,
        },
      ],
      screens: [{ screenerId: "p5", x: 62, y: 67, angle: 0 }],
    },
    {
      description:
        "Step 2: 'Pick the Picker' — 2 and 4 set a double screen for 5 (the original screener). 5 uses the double screen and pops to the ball-side elbow or mid-range area for a catch and shoot.",
      players: [
        {
          id: "p1",
          x: 30,
          y: 97,
          label: "1",
          role: "inbounder",
          hasBall: true,
        },
        { id: "p2", x: 36, y: 63, label: "2", role: "offense" },
        { id: "p3", x: 82, y: 68, label: "3", role: "offense" },
        { id: "p4", x: 38, y: 80, label: "4", role: "offense" },
        { id: "p5", x: 62, y: 67, label: "5", role: "offense" },
      ],
      movements: [
        {
          playerId: "p2",
          fromX: 36,
          fromY: 63,
          toX: 46,
          toY: 73,
          type: "cut",
          curved: false,
        },
        {
          playerId: "p4",
          fromX: 38,
          fromY: 80,
          toX: 52,
          toY: 73,
          type: "cut",
          curved: false,
        },
        {
          playerId: "p5",
          fromX: 62,
          fromY: 67,
          toX: 45,
          toY: 55,
          type: "cut",
          curved: true,
          controlX: 55,
          controlY: 58,
        },
      ],
      screens: [
        { screenerId: "p2", x: 46, y: 73, angle: 90 },
        { screenerId: "p4", x: 52, y: 73, angle: 90 },
      ],
    },
    {
      description:
        "Step 3 — Options: 1st choice: 3 open at the right wing off the first screen. 2nd choice: 5 open at the elbow off the double screen. 3rd choice: kick to 2 or 4 who step out after setting their screens.",
      players: [
        {
          id: "p1",
          x: 30,
          y: 97,
          label: "1",
          role: "inbounder",
          hasBall: true,
        },
        { id: "p2", x: 46, y: 73, label: "2", role: "offense" },
        { id: "p3", x: 82, y: 68, label: "3", role: "offense" },
        { id: "p4", x: 52, y: 73, label: "4", role: "offense" },
        { id: "p5", x: 45, y: 55, label: "5", role: "offense" },
      ],
      movements: [
        {
          playerId: "p1",
          fromX: 30,
          fromY: 97,
          toX: 82,
          toY: 68,
          type: "pass",
          curved: false,
        },
        {
          playerId: "p1",
          fromX: 30,
          fromY: 97,
          toX: 45,
          toY: 55,
          type: "pass",
          curved: false,
        },
      ],
    },
  ],
};

export default play;

import { Play } from "@/lib/types";

const play: Play = {
  id: "pick-the-picker",
  name: "Pick the Picker",
  shortName: "Pick the Picker",
  category: "out-of-bounds",
  description:
    "Baseline out of bounds box set. Uses a back-screen followed by a pick-the-picker action to free up multiple scoring options.",
  courtType: "half",
  steps: [
    {
      description:
        "Box set formation. Player 1 (inbounder) is out of bounds. Players 2 and 3 on low blocks, Players 4 and 5 at the elbows.",
      players: [
        {
          id: "p1",
          x: 50,
          y: 97,
          label: "1",
          role: "inbounder",
          hasBall: true,
        },
        { id: "p2", x: 40, y: 80, label: "2", role: "offense" },
        { id: "p3", x: 60, y: 80, label: "3", role: "offense" },
        { id: "p4", x: 37, y: 63, label: "4", role: "offense" },
        { id: "p5", x: 63, y: 63, label: "5", role: "offense" },
      ],
      movements: [],
    },
    {
      description:
        "Step 1: Ball-side high post (4) screens UP for ball-side low block (2). Player 2 cuts hard off the screen toward the ball-side wing/corner.",
      players: [
        {
          id: "p1",
          x: 50,
          y: 97,
          label: "1",
          role: "inbounder",
          hasBall: true,
        },
        { id: "p2", x: 40, y: 80, label: "2", role: "offense" },
        { id: "p3", x: 60, y: 80, label: "3", role: "offense" },
        { id: "p4", x: 37, y: 63, label: "4", role: "offense" },
        { id: "p5", x: 63, y: 63, label: "5", role: "offense" },
      ],
      movements: [
        {
          playerId: "p2",
          fromX: 40,
          fromY: 80,
          toX: 18,
          toY: 68,
          type: "cut",
          curved: true,
          controlX: 30,
          controlY: 62,
        },
      ],
      screens: [{ screenerId: "p4", x: 37, y: 70, angle: 0 }],
    },
    {
      description:
        "Step 2: 'Pick the Picker' — Weak-side low block (3) cuts diagonally UP to set a screen for Player 4 (the original screener). Player 2 is open at the wing.",
      players: [
        {
          id: "p1",
          x: 50,
          y: 97,
          label: "1",
          role: "inbounder",
          hasBall: true,
        },
        { id: "p2", x: 18, y: 68, label: "2", role: "offense" },
        { id: "p3", x: 60, y: 80, label: "3", role: "offense" },
        { id: "p4", x: 37, y: 63, label: "4", role: "offense" },
        { id: "p5", x: 63, y: 63, label: "5", role: "offense" },
      ],
      movements: [
        {
          playerId: "p3",
          fromX: 60,
          fromY: 80,
          toX: 42,
          toY: 68,
          type: "cut",
          curved: true,
          controlX: 55,
          controlY: 68,
        },
      ],
      screens: [{ screenerId: "p3", x: 42, y: 68, angle: 90 }],
    },
    {
      description:
        "Step 3: Player 4 uses Player 3's screen and cuts hard to the basket (or pops to the free throw line). Player 5 pops to the weak-side corner as a safety outlet.",
      players: [
        {
          id: "p1",
          x: 50,
          y: 97,
          label: "1",
          role: "inbounder",
          hasBall: true,
        },
        { id: "p2", x: 18, y: 68, label: "2", role: "offense" },
        { id: "p3", x: 42, y: 68, label: "3", role: "offense" },
        { id: "p4", x: 37, y: 63, label: "4", role: "offense" },
        { id: "p5", x: 63, y: 63, label: "5", role: "offense" },
      ],
      movements: [
        {
          playerId: "p4",
          fromX: 37,
          fromY: 63,
          toX: 50,
          toY: 80,
          type: "cut",
          curved: true,
          controlX: 38,
          controlY: 75,
        },
        {
          playerId: "p5",
          fromX: 63,
          fromY: 63,
          toX: 82,
          toY: 80,
          type: "cut",
          curved: false,
        },
      ],
    },
    {
      description:
        "Step 4 — Options: 1st choice: pass to 2 on the wing. 2nd choice: pass to 4 cutting to the basket. 3rd choice: outlet to 5 in the corner. Player 1 can also step in after inbounding.",
      players: [
        {
          id: "p1",
          x: 50,
          y: 97,
          label: "1",
          role: "inbounder",
          hasBall: true,
        },
        { id: "p2", x: 18, y: 68, label: "2", role: "offense" },
        { id: "p3", x: 42, y: 68, label: "3", role: "offense" },
        { id: "p4", x: 50, y: 80, label: "4", role: "offense" },
        { id: "p5", x: 82, y: 80, label: "5", role: "offense" },
      ],
      movements: [
        {
          playerId: "p1",
          fromX: 50,
          fromY: 97,
          toX: 18,
          toY: 68,
          type: "pass",
          curved: false,
        },
        {
          playerId: "p1",
          fromX: 50,
          fromY: 97,
          toX: 50,
          toY: 80,
          type: "pass",
          curved: false,
        },
        {
          playerId: "p1",
          fromX: 50,
          fromY: 97,
          toX: 82,
          toY: 80,
          type: "pass",
          curved: false,
        },
      ],
    },
  ],
};

export default play;

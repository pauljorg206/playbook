import { Play } from "@/lib/types";

const play: Play = {
  id: "zone-131",
  name: "1-3-1 Half Court Zone",
  shortName: "1-3-1 Zone",
  category: "defense",
  description:
    "Aggressive trapping zone. One point pressures the ball, three across the middle, one roaming the baseline. Corners are death traps — force offense there and trap hard.",
  courtType: "half",
  steps: [
    {
      description:
        "Base 1-3-1 alignment. D1 (point) at the top pressuring the ball. D2 and D3 on the wings at the free throw line extended. D4 at the high post/middle. D5 roams the baseline.",
      players: [
        { id: "d1", x: 50, y: 40, label: "D1", role: "defense" },
        { id: "d2", x: 22, y: 58, label: "D2", role: "defense" },
        { id: "d3", x: 78, y: 58, label: "D3", role: "defense" },
        { id: "d4", x: 50, y: 62, label: "D4", role: "defense" },
        { id: "d5", x: 50, y: 83, label: "D5", role: "defense" },
        { id: "p1", x: 50, y: 44, label: "1", role: "offense", hasBall: true },
        { id: "p2", x: 18, y: 60, label: "2", role: "offense" },
        { id: "p3", x: 82, y: 60, label: "3", role: "offense" },
        { id: "p4", x: 36, y: 78, label: "4", role: "offense" },
        { id: "p5", x: 64, y: 78, label: "5", role: "offense" },
      ],
      movements: [],
    },
    {
      description:
        "Ball goes to the wing. D2 closes out and traps WITH D1 on the ball-side wing. Two defenders on one ball handler! D4 slides to cut off the pass back to the middle. D5 slides to the ball-side corner.",
      players: [
        { id: "d1", x: 50, y: 40, label: "D1", role: "defense" },
        { id: "d2", x: 22, y: 58, label: "D2", role: "defense" },
        { id: "d3", x: 78, y: 58, label: "D3", role: "defense" },
        { id: "d4", x: 50, y: 62, label: "D4", role: "defense" },
        { id: "d5", x: 50, y: 83, label: "D5", role: "defense" },
        { id: "p1", x: 50, y: 44, label: "1", role: "offense" },
        { id: "p2", x: 18, y: 60, label: "2", role: "offense", hasBall: true },
        { id: "p3", x: 82, y: 60, label: "3", role: "offense" },
        { id: "p4", x: 36, y: 78, label: "4", role: "offense" },
        { id: "p5", x: 64, y: 78, label: "5", role: "offense" },
      ],
      movements: [
        {
          playerId: "d1",
          fromX: 50,
          fromY: 40,
          toX: 26,
          toY: 55,
          type: "cut",
          curved: false,
        },
        {
          playerId: "d4",
          fromX: 50,
          fromY: 62,
          toX: 38,
          toY: 60,
          type: "cut",
          curved: false,
        },
        {
          playerId: "d5",
          fromX: 50,
          fromY: 83,
          toX: 18,
          toY: 83,
          type: "cut",
          curved: false,
        },
      ],
    },
    {
      description:
        "CORNER TRAP — the best part of the 1-3-1! Ball enters the corner. D5 rushes up to trap with D2. The ball handler is trapped in the corner — nowhere to go! D4 intercepts the pass lane to the wing. D3 covers the middle.",
      players: [
        { id: "d1", x: 26, y: 55, label: "D1", role: "defense" },
        { id: "d2", x: 22, y: 58, label: "D2", role: "defense" },
        { id: "d3", x: 65, y: 58, label: "D3", role: "defense" },
        { id: "d4", x: 38, y: 60, label: "D4", role: "defense" },
        { id: "d5", x: 18, y: 83, label: "D5", role: "defense" },
        { id: "p1", x: 50, y: 44, label: "1", role: "offense" },
        { id: "p2", x: 18, y: 60, label: "2", role: "offense" },
        { id: "p3", x: 82, y: 60, label: "3", role: "offense" },
        { id: "p4", x: 8, y: 85, label: "4", role: "offense", hasBall: true },
        { id: "p5", x: 64, y: 78, label: "5", role: "offense" },
      ],
      movements: [
        {
          playerId: "d2",
          fromX: 22,
          fromY: 58,
          toX: 12,
          toY: 78,
          type: "cut",
          curved: false,
        },
        {
          playerId: "d5",
          fromX: 18,
          fromY: 83,
          toX: 12,
          toY: 83,
          type: "cut",
          curved: false,
        },
        {
          playerId: "d4",
          fromX: 38,
          fromY: 60,
          toX: 30,
          toY: 68,
          type: "cut",
          curved: false,
        },
        {
          playerId: "d3",
          fromX: 65,
          fromY: 58,
          toX: 55,
          toY: 62,
          type: "cut",
          curved: false,
        },
      ],
    },
    {
      description:
        "Recovery when press is broken. If offense escapes the trap, everyone sprints back. D1 becomes the safety. D2, D3 get back to wing positions. D4 protects the paint. Do NOT give up a layup — get back fast!",
      players: [
        { id: "d1", x: 50, y: 55, label: "D1", role: "defense" },
        { id: "d2", x: 22, y: 62, label: "D2", role: "defense" },
        { id: "d3", x: 78, y: 62, label: "D3", role: "defense" },
        { id: "d4", x: 50, y: 68, label: "D4", role: "defense" },
        { id: "d5", x: 50, y: 83, label: "D5", role: "defense" },
        { id: "p1", x: 50, y: 44, label: "1", role: "offense", hasBall: true },
        { id: "p2", x: 18, y: 60, label: "2", role: "offense" },
        { id: "p3", x: 82, y: 60, label: "3", role: "offense" },
        { id: "p4", x: 36, y: 78, label: "4", role: "offense" },
        { id: "p5", x: 64, y: 78, label: "5", role: "offense" },
      ],
      movements: [],
    },
  ],
};

export default play;

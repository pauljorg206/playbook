import { Play } from "@/lib/types";

const play: Play = {
  id: "zone-131",
  name: "1-3-1 Half Court Zone",
  shortName: "1-3-1 Zone",
  category: "defense",
  description:
    "Aggressive trapping zone. Point pressures the ball, three across the middle, one roams the baseline. Force corners and trap hard.",
  courtType: "half",
  steps: [
    {
      description:
        "Base 1-3-1 alignment. D1 (point) up top pressuring the ball. D2, D3 on the wings at FT-line extended. D4 at the middle. D5 roams the baseline.",
      players: [
        { id: "d1", x: 50, y: 42, label: "D1", role: "defense" },
        { id: "d2", x: 25, y: 60, label: "D2", role: "defense" },
        { id: "d3", x: 75, y: 60, label: "D3", role: "defense" },
        { id: "d4", x: 50, y: 65, label: "D4", role: "defense" },
        { id: "d5", x: 50, y: 87, label: "D5", role: "defense" },
        { id: "p1", x: 50, y: 47, label: "1", role: "offense", hasBall: true },
        { id: "p2", x: 15, y: 64, label: "2", role: "offense" },
        { id: "p3", x: 85, y: 64, label: "3", role: "offense" },
        { id: "p4", x: 38, y: 80, label: "4", role: "offense" },
        { id: "p5", x: 62, y: 80, label: "5", role: "offense" },
      ],
      movements: [],
    },
    {
      description:
        "Ball goes to the wing. D2 closes out — and D1 trails to TRAP with D2 on the ball-side wing. Two on the ball! D4 splits the gap to the middle. D5 slides ball-side along the baseline.",
      players: [
        { id: "d1", x: 50, y: 42, label: "D1", role: "defense" },
        { id: "d2", x: 25, y: 60, label: "D2", role: "defense" },
        { id: "d3", x: 75, y: 60, label: "D3", role: "defense" },
        { id: "d4", x: 50, y: 65, label: "D4", role: "defense" },
        { id: "d5", x: 50, y: 87, label: "D5", role: "defense" },
        { id: "p1", x: 50, y: 47, label: "1", role: "offense" },
        { id: "p2", x: 15, y: 64, label: "2", role: "offense", hasBall: true },
        { id: "p3", x: 85, y: 64, label: "3", role: "offense" },
        { id: "p4", x: 38, y: 80, label: "4", role: "offense" },
        { id: "p5", x: 62, y: 80, label: "5", role: "offense" },
      ],
      movements: [
        {
          playerId: "d1",
          fromX: 50,
          fromY: 42,
          toX: 22,
          toY: 58,
          type: "cut",
          curved: false,
        },
        {
          playerId: "d4",
          fromX: 50,
          fromY: 65,
          toX: 38,
          toY: 65,
          type: "cut",
          curved: false,
        },
        {
          playerId: "d5",
          fromX: 50,
          fromY: 87,
          toX: 18,
          toY: 87,
          type: "cut",
          curved: false,
        },
      ],
    },
    {
      description:
        "Corner trap — the heart of the 1-3-1. Ball goes to the corner. D5 sprints up to trap with D2. Ball handler is stuck in the corner. D4 reads the wing pass; D3 rotates to the middle.",
      players: [
        { id: "d1", x: 22, y: 58, label: "D1", role: "defense" },
        { id: "d2", x: 14, y: 80, label: "D2", role: "defense" },
        { id: "d3", x: 55, y: 60, label: "D3", role: "defense" },
        { id: "d4", x: 32, y: 70, label: "D4", role: "defense" },
        { id: "d5", x: 14, y: 88, label: "D5", role: "defense" },
        { id: "p1", x: 50, y: 47, label: "1", role: "offense" },
        { id: "p2", x: 15, y: 64, label: "2", role: "offense" },
        { id: "p3", x: 85, y: 64, label: "3", role: "offense" },
        { id: "p4", x: 10, y: 92, label: "4", role: "offense", hasBall: true },
        { id: "p5", x: 62, y: 80, label: "5", role: "offense" },
      ],
      movements: [
        {
          playerId: "d2",
          fromX: 25,
          fromY: 60,
          toX: 14,
          toY: 80,
          type: "cut",
          curved: false,
        },
        {
          playerId: "d5",
          fromX: 18,
          fromY: 87,
          toX: 14,
          toY: 88,
          type: "cut",
          curved: false,
        },
        {
          playerId: "d4",
          fromX: 38,
          fromY: 65,
          toX: 32,
          toY: 70,
          type: "cut",
          curved: false,
        },
        {
          playerId: "d3",
          fromX: 75,
          fromY: 60,
          toX: 55,
          toY: 60,
          type: "cut",
          curved: false,
        },
      ],
    },
    {
      description:
        "Recovery if the trap breaks. Sprint back. D1 becomes the safety. D2, D3 reset to the wings. D4 protects the paint. Do NOT give up a layup — get back fast.",
      players: [
        { id: "d1", x: 50, y: 55, label: "D1", role: "defense" },
        { id: "d2", x: 25, y: 65, label: "D2", role: "defense" },
        { id: "d3", x: 75, y: 65, label: "D3", role: "defense" },
        { id: "d4", x: 50, y: 72, label: "D4", role: "defense" },
        { id: "d5", x: 50, y: 87, label: "D5", role: "defense" },
        { id: "p1", x: 50, y: 47, label: "1", role: "offense", hasBall: true },
        { id: "p2", x: 15, y: 64, label: "2", role: "offense" },
        { id: "p3", x: 85, y: 64, label: "3", role: "offense" },
        { id: "p4", x: 38, y: 80, label: "4", role: "offense" },
        { id: "p5", x: 62, y: 80, label: "5", role: "offense" },
      ],
      movements: [],
    },
  ],
};

export default play;

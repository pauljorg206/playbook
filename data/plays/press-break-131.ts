import { Play } from "@/lib/types";

const play: Play = {
  id: "press-break-131",
  name: "Press Breaker vs 1-3-1",
  shortName: "Break 1-3-1",
  category: "press-breaker",
  description:
    "Attack the 1-3-1 press by flooding the middle — their weakest spot. Short sideline passes, middle flashes, and quick ball movement up the floor.",
  courtType: "full",
  steps: [
    {
      description:
        "Set up to break the 1-3-1. Player 1 inbounds. Players 2 and 3 line up on opposite sidelines in the backcourt. Player 4 in the middle of the floor. Player 5 is already past half court as a safety outlet.",
      players: [
        {
          id: "p1",
          x: 50,
          y: 99,
          label: "1",
          role: "inbounder",
          hasBall: true,
        },
        { id: "p2", x: 12, y: 82, label: "2", role: "offense" },
        { id: "p3", x: 88, y: 82, label: "3", role: "offense" },
        { id: "p4", x: 50, y: 72, label: "4", role: "offense" },
        { id: "p5", x: 50, y: 42, label: "5", role: "offense" },
        { id: "d1", x: 50, y: 90, label: "D1", role: "defense" },
        { id: "d2", x: 25, y: 70, label: "D2", role: "defense" },
        { id: "d3", x: 75, y: 70, label: "D3", role: "defense" },
        { id: "d4", x: 50, y: 50, label: "D4", role: "defense" },
        { id: "d5", x: 50, y: 20, label: "D5", role: "defense" },
      ],
      movements: [],
    },
    {
      description:
        "Inbound to the sideline. Player 1 inbounds to 2 on the ball-side sideline. Player 4 immediately flashes to the middle — the gap in the 1-3-1. This is their weakness!",
      players: [
        {
          id: "p1",
          x: 50,
          y: 99,
          label: "1",
          role: "inbounder",
          hasBall: true,
        },
        { id: "p2", x: 12, y: 82, label: "2", role: "offense" },
        { id: "p3", x: 88, y: 82, label: "3", role: "offense" },
        { id: "p4", x: 50, y: 72, label: "4", role: "offense" },
        { id: "p5", x: 50, y: 42, label: "5", role: "offense" },
        { id: "d1", x: 50, y: 90, label: "D1", role: "defense" },
        { id: "d2", x: 25, y: 70, label: "D2", role: "defense" },
        { id: "d3", x: 75, y: 70, label: "D3", role: "defense" },
        { id: "d4", x: 50, y: 50, label: "D4", role: "defense" },
        { id: "d5", x: 50, y: 20, label: "D5", role: "defense" },
      ],
      movements: [
        {
          playerId: "p1",
          fromX: 50,
          fromY: 97,
          toX: 12,
          toY: 82,
          type: "pass",
        },
        {
          playerId: "p4",
          fromX: 50,
          fromY: 72,
          toX: 30,
          toY: 78,
          type: "cut",
          curved: false,
        },
      ],
    },
    {
      description:
        "Middle attack! Player 2 passes to 4 in the middle — the gap nobody is guarding. Player 4 catches in space with room to dribble. Player 3 sprints up the far sideline. Player 5 flashes toward the ball.",
      players: [
        { id: "p1", x: 50, y: 99, label: "1", role: "inbounder" },
        { id: "p2", x: 12, y: 82, label: "2", role: "offense", hasBall: true },
        { id: "p3", x: 88, y: 75, label: "3", role: "offense" },
        { id: "p4", x: 30, y: 78, label: "4", role: "offense" },
        { id: "p5", x: 50, y: 52, label: "5", role: "offense" },
        { id: "d1", x: 15, y: 82, label: "D1", role: "defense" },
        { id: "d2", x: 25, y: 70, label: "D2", role: "defense" },
        { id: "d3", x: 75, y: 70, label: "D3", role: "defense" },
        { id: "d4", x: 50, y: 50, label: "D4", role: "defense" },
        { id: "d5", x: 50, y: 20, label: "D5", role: "defense" },
      ],
      movements: [
        {
          playerId: "p2",
          fromX: 12,
          fromY: 82,
          toX: 30,
          toY: 78,
          type: "pass",
        },
        {
          playerId: "p3",
          fromX: 88,
          fromY: 82,
          toX: 88,
          toY: 68,
          type: "cut",
          curved: false,
        },
        {
          playerId: "p5",
          fromX: 50,
          fromY: 42,
          toX: 50,
          toY: 52,
          type: "cut",
          curved: false,
        },
      ],
    },
    {
      description:
        "Advance past half court! Player 4 dribbles hard up the middle or passes ahead to 5. Player 3 is wide open on the far sideline as a reversal option. Player 1 trails for safety.",
      players: [
        { id: "p1", x: 50, y: 85, label: "1", role: "offense" },
        { id: "p2", x: 15, y: 68, label: "2", role: "offense" },
        { id: "p3", x: 88, y: 58, label: "3", role: "offense" },
        { id: "p4", x: 35, y: 65, label: "4", role: "offense", hasBall: true },
        { id: "p5", x: 55, y: 48, label: "5", role: "offense" },
        { id: "d1", x: 20, y: 72, label: "D1", role: "defense" },
        { id: "d2", x: 30, y: 60, label: "D2", role: "defense" },
        { id: "d3", x: 75, y: 60, label: "D3", role: "defense" },
        { id: "d4", x: 50, y: 50, label: "D4", role: "defense" },
        { id: "d5", x: 50, y: 20, label: "D5", role: "defense" },
      ],
      movements: [
        {
          playerId: "p4",
          fromX: 30,
          fromY: 78,
          toX: 35,
          toY: 65,
          type: "dribble",
          curved: false,
        },
        {
          playerId: "p4",
          fromX: 35,
          fromY: 65,
          toX: 55,
          toY: 48,
          type: "pass",
        },
      ],
    },
    {
      description:
        "Attack! Ball past half court. Fill the lanes — 2 on the left, 3 on the right, 5 with the ball in the middle. 3-on-2 fast break or slow it down and run your half-court offense. YOU BEAT THE PRESS!",
      players: [
        { id: "p1", x: 50, y: 68, label: "1", role: "offense" },
        { id: "p2", x: 15, y: 48, label: "2", role: "offense" },
        { id: "p3", x: 85, y: 48, label: "3", role: "offense" },
        { id: "p4", x: 35, y: 55, label: "4", role: "offense" },
        { id: "p5", x: 50, y: 42, label: "5", role: "offense", hasBall: true },
        { id: "d4", x: 50, y: 40, label: "D4", role: "defense" },
        { id: "d5", x: 50, y: 18, label: "D5", role: "defense" },
      ],
      movements: [],
    },
  ],
};

export default play;

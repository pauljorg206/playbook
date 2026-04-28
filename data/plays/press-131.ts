import { Play } from "@/lib/types";

const play: Play = {
  id: "press-131",
  name: "1-3-1 Full Court Press",
  shortName: "1-3-1 Press",
  category: "press",
  description:
    "Full court 1-3-1 press. One defender pressures the inbound, three trap across the middle, one deep safety. Force sidelines and trap at half court.",
  courtType: "full",
  steps: [
    {
      description:
        "Set up after a made basket. D1 pressures the inbounder at baseline. D2 and D3 line up at the free throw line extended, straddling the middle. D4 at center court. D5 is the deep safety near our basket.",
      players: [
        { id: "d1", x: 50, y: 92, label: "D1", role: "defense" },
        { id: "d2", x: 25, y: 72, label: "D2", role: "defense" },
        { id: "d3", x: 75, y: 72, label: "D3", role: "defense" },
        { id: "d4", x: 50, y: 52, label: "D4", role: "defense" },
        { id: "d5", x: 50, y: 18, label: "D5", role: "defense" },
        {
          id: "p1",
          x: 50,
          y: 99,
          label: "1",
          role: "inbounder",
          hasBall: true,
        },
        { id: "p2", x: 20, y: 85, label: "2", role: "offense" },
        { id: "p3", x: 80, y: 85, label: "3", role: "offense" },
        { id: "p4", x: 35, y: 65, label: "4", role: "offense" },
        { id: "p5", x: 65, y: 65, label: "5", role: "offense" },
      ],
      movements: [],
    },
    {
      description:
        "D1 forces the inbound to the sideline. As the ball is caught, D2 (or D3) immediately runs to trap with D1 on the sideline. The ball handler is pinched — sideline is their worst enemy!",
      players: [
        { id: "d1", x: 50, y: 92, label: "D1", role: "defense" },
        { id: "d2", x: 25, y: 72, label: "D2", role: "defense" },
        { id: "d3", x: 75, y: 72, label: "D3", role: "defense" },
        { id: "d4", x: 50, y: 52, label: "D4", role: "defense" },
        { id: "d5", x: 50, y: 18, label: "D5", role: "defense" },
        { id: "p1", x: 50, y: 99, label: "1", role: "inbounder" },
        { id: "p2", x: 15, y: 85, label: "2", role: "offense", hasBall: true },
        { id: "p3", x: 80, y: 85, label: "3", role: "offense" },
        { id: "p4", x: 35, y: 65, label: "4", role: "offense" },
        { id: "p5", x: 65, y: 65, label: "5", role: "offense" },
      ],
      movements: [
        {
          playerId: "d1",
          fromX: 50,
          fromY: 92,
          toX: 20,
          toY: 85,
          type: "cut",
          curved: false,
        },
        {
          playerId: "d2",
          fromX: 25,
          fromY: 72,
          toX: 12,
          toY: 85,
          type: "cut",
          curved: false,
        },
      ],
    },
    {
      description:
        "Half court trap! If offense dribbles up the sideline, D2 and D4 set the trap at half court — the most dangerous spot. D3 rotates to the middle to intercept passes. D1 drops to intercept diagonal passes. D5 stays home.",
      players: [
        { id: "d1", x: 25, y: 75, label: "D1", role: "defense" },
        { id: "d2", x: 12, y: 52, label: "D2", role: "defense" },
        { id: "d3", x: 55, y: 55, label: "D3", role: "defense" },
        { id: "d4", x: 12, y: 46, label: "D4", role: "defense" },
        { id: "d5", x: 50, y: 20, label: "D5", role: "defense" },
        { id: "p1", x: 50, y: 99, label: "1", role: "inbounder" },
        { id: "p2", x: 12, y: 55, label: "2", role: "offense", hasBall: true },
        { id: "p3", x: 80, y: 75, label: "3", role: "offense" },
        { id: "p4", x: 40, y: 55, label: "4", role: "offense" },
        { id: "p5", x: 60, y: 35, label: "5", role: "offense" },
      ],
      movements: [
        {
          playerId: "d2",
          fromX: 12,
          fromY: 85,
          toX: 12,
          toY: 52,
          type: "cut",
          curved: false,
        },
        {
          playerId: "d4",
          fromX: 50,
          fromY: 52,
          toX: 12,
          toY: 46,
          type: "cut",
          curved: false,
        },
        {
          playerId: "d3",
          fromX: 75,
          fromY: 72,
          toX: 55,
          toY: 55,
          type: "cut",
          curved: false,
        },
        {
          playerId: "d1",
          fromX: 20,
          fromY: 85,
          toX: 25,
          toY: 75,
          type: "cut",
          curved: false,
        },
      ],
    },
    {
      description:
        "If the press is broken — sprint back! D1 and D2 bust back to the paint. D5 stays between the ball and the basket. Transition to your half-court 1-3-1 defense. No layups!",
      players: [
        { id: "d1", x: 25, y: 38, label: "D1", role: "defense" },
        { id: "d2", x: 22, y: 28, label: "D2", role: "defense" },
        { id: "d3", x: 75, y: 38, label: "D3", role: "defense" },
        { id: "d4", x: 50, y: 32, label: "D4", role: "defense" },
        { id: "d5", x: 50, y: 15, label: "D5", role: "defense" },
        { id: "p1", x: 50, y: 99, label: "1", role: "offense" },
        { id: "p2", x: 50, y: 48, label: "2", role: "offense", hasBall: true },
        { id: "p3", x: 80, y: 60, label: "3", role: "offense" },
        { id: "p4", x: 30, y: 40, label: "4", role: "offense" },
        { id: "p5", x: 70, y: 35, label: "5", role: "offense" },
      ],
      movements: [],
    },
  ],
};

export default play;

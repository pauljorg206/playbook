import { Play } from "@/lib/types";

const play: Play = {
  id: "press-break-1211",
  name: "Press Breaker vs Diamond",
  shortName: "Break Diamond",
  category: "press-breaker",
  description:
    "Beat the 1-2-1-1 diamond press by spreading wide, attacking the seams, and using quick skip passes to outrun the traps.",
  courtType: "full",
  steps: [
    {
      description:
        "Set wide against the diamond. Players 2 and 3 spread to opposite sidelines — as wide as possible. Player 4 in the middle at half court. Player 5 deep as a safety outlet. Player 1 inbounds.",
      players: [
        {
          id: "p1",
          x: 50,
          y: 97,
          label: "1",
          role: "inbounder",
          hasBall: true,
        },
        { id: "p2", x: 5, y: 80, label: "2", role: "offense" },
        { id: "p3", x: 95, y: 80, label: "3", role: "offense" },
        { id: "p4", x: 50, y: 55, label: "4", role: "offense" },
        { id: "p5", x: 50, y: 35, label: "5", role: "offense" },
        { id: "d1", x: 50, y: 78, label: "D1", role: "defense" },
        { id: "d2", x: 18, y: 55, label: "D2", role: "defense" },
        { id: "d3", x: 82, y: 55, label: "D3", role: "defense" },
        { id: "d4", x: 50, y: 40, label: "D4", role: "defense" },
        { id: "d5", x: 50, y: 15, label: "D5", role: "defense" },
      ],
      movements: [],
    },
    {
      description:
        "Inbound to the widest player. Player 1 passes to 2 or 3 on the sideline — whoever is more open. The key is catching it WIDE so the diamond has to stretch to cover. Player 4 flashes toward the ball as the secondary outlet.",
      players: [
        {
          id: "p1",
          x: 50,
          y: 97,
          label: "1",
          role: "inbounder",
          hasBall: true,
        },
        { id: "p2", x: 5, y: 80, label: "2", role: "offense" },
        { id: "p3", x: 95, y: 80, label: "3", role: "offense" },
        { id: "p4", x: 50, y: 55, label: "4", role: "offense" },
        { id: "p5", x: 50, y: 35, label: "5", role: "offense" },
        { id: "d1", x: 50, y: 78, label: "D1", role: "defense" },
        { id: "d2", x: 18, y: 55, label: "D2", role: "defense" },
        { id: "d3", x: 82, y: 55, label: "D3", role: "defense" },
        { id: "d4", x: 50, y: 40, label: "D4", role: "defense" },
        { id: "d5", x: 50, y: 15, label: "D5", role: "defense" },
      ],
      movements: [
        { playerId: "p1", fromX: 50, fromY: 97, toX: 5, toY: 80, type: "pass" },
        {
          playerId: "p4",
          fromX: 50,
          fromY: 55,
          toX: 25,
          toY: 70,
          type: "cut",
          curved: false,
        },
      ],
    },
    {
      description:
        "Skip pass! Player 2 fakes the dribble then immediately skips a long pass over the diamond to Player 3 on the far sideline. The diamond CANNOT cover both wings — one is always open. Move the ball faster than they can move their feet!",
      players: [
        { id: "p1", x: 50, y: 90, label: "1", role: "offense" },
        { id: "p2", x: 5, y: 80, label: "2", role: "offense", hasBall: true },
        { id: "p3", x: 95, y: 80, label: "3", role: "offense" },
        { id: "p4", x: 25, y: 70, label: "4", role: "offense" },
        { id: "p5", x: 50, y: 35, label: "5", role: "offense" },
        { id: "d1", x: 10, y: 80, label: "D1", role: "defense" },
        { id: "d2", x: 10, y: 72, label: "D2", role: "defense" },
        { id: "d3", x: 82, y: 65, label: "D3", role: "defense" },
        { id: "d4", x: 50, y: 40, label: "D4", role: "defense" },
        { id: "d5", x: 50, y: 15, label: "D5", role: "defense" },
      ],
      movements: [
        {
          playerId: "p2",
          fromX: 5,
          fromY: 80,
          toX: 95,
          toY: 80,
          type: "pass",
          curved: true,
          controlX: 50,
          controlY: 65,
        },
      ],
    },
    {
      description:
        "Attack the seam! Player 3 catches wide and immediately looks to player 4 cutting up the middle seam — between D3 and D4. The seam is the gap between the wing and middle defenders. One pass, two dribbles, layup!",
      players: [
        { id: "p1", x: 50, y: 85, label: "1", role: "offense" },
        { id: "p2", x: 8, y: 72, label: "2", role: "offense" },
        { id: "p3", x: 95, y: 80, label: "3", role: "offense", hasBall: true },
        { id: "p4", x: 65, y: 60, label: "4", role: "offense" },
        { id: "p5", x: 50, y: 35, label: "5", role: "offense" },
        { id: "d1", x: 25, y: 75, label: "D1", role: "defense" },
        { id: "d2", x: 15, y: 65, label: "D2", role: "defense" },
        { id: "d3", x: 82, y: 65, label: "D3", role: "defense" },
        { id: "d4", x: 50, y: 45, label: "D4", role: "defense" },
        { id: "d5", x: 50, y: 15, label: "D5", role: "defense" },
      ],
      movements: [
        {
          playerId: "p4",
          fromX: 25,
          fromY: 70,
          toX: 65,
          toY: 60,
          type: "cut",
          curved: true,
          controlX: 50,
          controlY: 62,
        },
        {
          playerId: "p3",
          fromX: 95,
          fromY: 80,
          toX: 65,
          toY: 60,
          type: "pass",
        },
      ],
    },
    {
      description:
        "Beat it! Player 4 in the middle with speed. Players 2 and 3 fill the lanes wide. Player 5 is the outlet ahead. 4 passes ahead to 5 or attacks the basket — 3-on-2 advantage. YOU BROKE THE DIAMOND!",
      players: [
        { id: "p1", x: 50, y: 75, label: "1", role: "offense" },
        { id: "p2", x: 12, y: 48, label: "2", role: "offense" },
        { id: "p3", x: 88, y: 48, label: "3", role: "offense" },
        { id: "p4", x: 50, y: 48, label: "4", role: "offense", hasBall: true },
        { id: "p5", x: 50, y: 30, label: "5", role: "offense" },
        { id: "d4", x: 50, y: 38, label: "D4", role: "defense" },
        { id: "d5", x: 50, y: 15, label: "D5", role: "defense" },
      ],
      movements: [
        {
          playerId: "p4",
          fromX: 65,
          fromY: 60,
          toX: 50,
          toY: 48,
          type: "dribble",
          curved: false,
        },
        {
          playerId: "p4",
          fromX: 50,
          fromY: 48,
          toX: 50,
          toY: 30,
          type: "pass",
        },
      ],
    },
  ],
};

export default play;

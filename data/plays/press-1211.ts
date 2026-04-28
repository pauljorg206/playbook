import { Play } from "@/lib/types";

const play: Play = {
  id: "press-1211",
  name: "1-2-1-1 Diamond Press",
  shortName: "Diamond Press",
  category: "press",
  description:
    "Aggressive diamond press. Force sideline, trap with two, rotate to intercept. The diamond shape creates constant trapping angles and confusion.",
  courtType: "full",
  steps: [
    {
      description:
        "Diamond alignment after a made basket. D1 (point) at our free throw line — first line of pressure. D2 and D3 at the wings near half court. D4 in the middle between wings and safety. D5 (safety) guards our basket.",
      players: [
        { id: "d1", x: 50, y: 78, label: "D1", role: "defense" },
        { id: "d2", x: 18, y: 55, label: "D2", role: "defense" },
        { id: "d3", x: 82, y: 55, label: "D3", role: "defense" },
        { id: "d4", x: 50, y: 40, label: "D4", role: "defense" },
        { id: "d5", x: 50, y: 15, label: "D5", role: "defense" },
        {
          id: "p1",
          x: 50,
          y: 99,
          label: "1",
          role: "inbounder",
          hasBall: true,
        },
        { id: "p2", x: 18, y: 88, label: "2", role: "offense" },
        { id: "p3", x: 82, y: 88, label: "3", role: "offense" },
        { id: "p4", x: 30, y: 68, label: "4", role: "offense" },
        { id: "p5", x: 70, y: 68, label: "5", role: "offense" },
      ],
      movements: [],
    },
    {
      description:
        "Force the sideline! D1 jumps at the receiver as soon as they catch, forcing them toward the sideline. D2 (or D3) sprints to form the first trap on the sideline in the backcourt.",
      players: [
        { id: "d1", x: 50, y: 78, label: "D1", role: "defense" },
        { id: "d2", x: 18, y: 55, label: "D2", role: "defense" },
        { id: "d3", x: 82, y: 55, label: "D3", role: "defense" },
        { id: "d4", x: 50, y: 40, label: "D4", role: "defense" },
        { id: "d5", x: 50, y: 15, label: "D5", role: "defense" },
        { id: "p1", x: 50, y: 99, label: "1", role: "inbounder" },
        { id: "p2", x: 10, y: 82, label: "2", role: "offense", hasBall: true },
        { id: "p3", x: 82, y: 88, label: "3", role: "offense" },
        { id: "p4", x: 30, y: 68, label: "4", role: "offense" },
        { id: "p5", x: 70, y: 68, label: "5", role: "offense" },
      ],
      movements: [
        {
          playerId: "d1",
          fromX: 50,
          fromY: 78,
          toX: 15,
          toY: 82,
          type: "cut",
          curved: false,
        },
        {
          playerId: "d2",
          fromX: 18,
          fromY: 55,
          toX: 8,
          toY: 78,
          type: "cut",
          curved: false,
        },
      ],
    },
    {
      description:
        "Trap sprung! D1 and D2 trap the ball handler on the sideline. D3 rotates to the middle to deny the escape pass. D4 slides to the far sideline to deny the long skip. D5 stays home protecting the basket.",
      players: [
        { id: "d1", x: 15, y: 82, label: "D1", role: "defense" },
        { id: "d2", x: 8, y: 78, label: "D2", role: "defense" },
        { id: "d3", x: 50, y: 68, label: "D3", role: "defense" },
        { id: "d4", x: 78, y: 55, label: "D4", role: "defense" },
        { id: "d5", x: 50, y: 15, label: "D5", role: "defense" },
        { id: "p1", x: 50, y: 99, label: "1", role: "inbounder" },
        { id: "p2", x: 10, y: 82, label: "2", role: "offense", hasBall: true },
        { id: "p3", x: 82, y: 88, label: "3", role: "offense" },
        { id: "p4", x: 38, y: 68, label: "4", role: "offense" },
        { id: "p5", x: 70, y: 55, label: "5", role: "offense" },
      ],
      movements: [],
    },
    {
      description:
        "Half court second trap. If offense escapes to half court — D3 and D4 set another trap at the half-court sideline. The diamond rotates. D5 stays home. D1 and D2 recover to intercept passes into the middle.",
      players: [
        { id: "d1", x: 30, y: 58, label: "D1", role: "defense" },
        { id: "d2", x: 22, y: 48, label: "D2", role: "defense" },
        { id: "d3", x: 10, y: 50, label: "D3", role: "defense" },
        { id: "d4", x: 10, y: 42, label: "D4", role: "defense" },
        { id: "d5", x: 50, y: 15, label: "D5", role: "defense" },
        { id: "p1", x: 50, y: 99, label: "1", role: "inbounder" },
        { id: "p2", x: 10, y: 50, label: "2", role: "offense", hasBall: true },
        { id: "p3", x: 82, y: 70, label: "3", role: "offense" },
        { id: "p4", x: 38, y: 50, label: "4", role: "offense" },
        { id: "p5", x: 65, y: 38, label: "5", role: "offense" },
      ],
      movements: [
        {
          playerId: "d3",
          fromX: 50,
          fromY: 68,
          toX: 10,
          toY: 50,
          type: "cut",
          curved: false,
        },
        {
          playerId: "d4",
          fromX: 78,
          fromY: 55,
          toX: 10,
          toY: 42,
          type: "cut",
          curved: false,
        },
        {
          playerId: "d1",
          fromX: 15,
          fromY: 82,
          toX: 30,
          toY: 58,
          type: "cut",
          curved: false,
        },
        {
          playerId: "d2",
          fromX: 8,
          fromY: 78,
          toX: 22,
          toY: 48,
          type: "cut",
          curved: false,
        },
      ],
    },
    {
      description:
        "Press broken — get back! All five sprint to their half-court positions. D5 stays between the ball and the basket at all times. Don't give up easy points — hustle back!",
      players: [
        { id: "d1", x: 35, y: 30, label: "D1", role: "defense" },
        { id: "d2", x: 22, y: 22, label: "D2", role: "defense" },
        { id: "d3", x: 65, y: 30, label: "D3", role: "defense" },
        { id: "d4", x: 50, y: 25, label: "D4", role: "defense" },
        { id: "d5", x: 50, y: 12, label: "D5", role: "defense" },
        { id: "p2", x: 50, y: 45, label: "2", role: "offense", hasBall: true },
        { id: "p3", x: 82, y: 55, label: "3", role: "offense" },
        { id: "p4", x: 30, y: 38, label: "4", role: "offense" },
        { id: "p5", x: 70, y: 35, label: "5", role: "offense" },
      ],
      movements: [],
    },
  ],
};

export default play;

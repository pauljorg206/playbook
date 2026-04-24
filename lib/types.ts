export type PlayerRole = "offense" | "defense" | "inbounder";
export type PositionLabel =
  | "PG"
  | "SG"
  | "SF"
  | "PF"
  | "C"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5";

export interface PlayerPosition {
  id: string;
  x: number; // 0-100 percentage of court width
  y: number; // 0-100 percentage of court height
  label: PositionLabel | string;
  role: PlayerRole;
  hasBall?: boolean;
}

export interface MovementArrow {
  playerId: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  type: "cut" | "pass" | "screen" | "dribble";
  curved?: boolean;
  controlX?: number; // bezier control point
  controlY?: number;
}

export interface Screen {
  screenerId: string;
  x: number;
  y: number;
  angle: number; // degrees, perpendicular to movement
}

export interface PlayStep {
  description: string;
  players: PlayerPosition[];
  movements: MovementArrow[];
  screens?: Screen[];
  ballPosition?: { x: number; y: number };
}

export type CourtType = "half" | "full";

export interface Play {
  id: string;
  name: string;
  shortName: string;
  category: PlayCategory;
  description: string;
  courtType: CourtType;
  steps: PlayStep[];
  tags?: string[];
}

export type PlayCategory =
  | "offense"
  | "out-of-bounds"
  | "zone-offense"
  | "defense"
  | "press"
  | "press-breaker";

export interface CategoryMeta {
  id: PlayCategory;
  label: string;
  icon: string;
  color: string;
}

export interface RosterPlayer {
  positionId: string; // "1" through "5"
  name: string;
  number: string;
}

export interface PracticeSession {
  date: string;
  playIds: string[];
}

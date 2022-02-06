export interface PositionInfo {
  posX: number;
  posY: number;
  timestamp: number;
  posXChange: number;
  posYChange: number;
  timeElapsed: number;
}

export interface ScrollInfo {
  scrollX: number | undefined;
  scrollY: number | undefined;
  timestamp: number;
  scrollXChange: number | undefined;
  scrollYChange: number | undefined;
  scrollHeight: number;
  scrollWidth: number;
  timeElapsed: number;
}

export interface SizeInfo {
  width: number;
  height: number;
}

export interface IntentInfo {
  mouseInfo: PositionInfo | undefined;
  windowInfo: SizeInfo | undefined;
  scrollInfo: ScrollInfo | undefined;
  position: number; // -1 left, 0 middle, 1 right
}

export enum ComponentLocation {
  BELOW = 1,
  LEFT = 2,
  BELOW_LEFT = 3,
  ABOVE = 4,
  INSIDE = 5,
  ABOVE_LEFT = 6,
  RIGHT = 7,
  BELOW_RIGHT = 8,
  ABOVE_RIGHT = 11
}

export enum MouseMovementDirection {
  SOUTH = 1,
  WEST = 2,
  SOUTH_WEST = 3,
  NORTH = 4,
  INSIDE = 5,
  NORTH_WEST = 6,
  EAST = 7,
  SOUTH_EAST = 8,
  NORTH_EAST = 11
}

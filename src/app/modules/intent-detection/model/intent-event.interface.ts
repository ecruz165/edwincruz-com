export interface PositionInfo {
  posX: number;
  posY: number;
  timestamp: number;
  posXChange: number;
  posYChange: number;
  timeElapsed: number;
}
export interface ScrollInfo {
  scrollX: number|undefined;
  scrollY: number|undefined;
  timestamp: number;
  scrollXChange: number|undefined;
  scrollYChange: number|undefined;
  scrollHeight: number;
  scrollWidth: number;
  timeElapsed: number;
}

export interface SizeInfo {
  width: number;
  height: number;
}

export interface IntentInfo {
  mouseInfo: PositionInfo| undefined;
  windowInfo: SizeInfo| undefined;
  position: number; // -1 left, 0 middle, 1 right
}

export interface IWindowDimensions {
  width: number;
  height: number;
}

export interface IWindowPosition {
  x: number;
  y: number;
}

export interface IMetadata {
  windowDimensions: IWindowDimensions;
  windowPosition: IWindowPosition;
}

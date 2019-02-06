export class MoveableObject {
  name: string;
  url: string;
  type: string;
  width: number;
  height: number;
}

export class Result {
  objects: Array<MoveableObject>;
  backgrounds: Array<MoveableObject>;
}

export class MoveableObjectProperties {
  id: string;
  name: string;
  url: string;
  type: string;
  width: number;
  height: number;
  position: Coordinates;
  rotation: number
}

export class Coordinates {
  x: string; // e.g. '100px'
  y: string
}
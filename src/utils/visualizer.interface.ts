export interface Material {
  id: string;
  materialPreview?: string;
  layers?: Layers;
  points?: string[];
  name?: string;
}

export interface Layers {
  [x: string]: string;
}

export interface PointsInterface {
  id: string;
  data: {
    coordX: number;
    coordY: number;
    name: string;
  };
}

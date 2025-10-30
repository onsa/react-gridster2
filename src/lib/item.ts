export interface Item {
  id: string | number;
  x: number;
  y: number;
  cols: number;
  rows: number;
  minCols?: number;
  minRows?: number;
  maxCols?: number;
  maxRows?: number;
  content: React.ReactNode;
}


export interface DataRangeResponse {
  data: DataRange[];
}

interface DataRange {
  t: string;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
}